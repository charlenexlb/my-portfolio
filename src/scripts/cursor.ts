// Custom cursor (markup and states in Cursor.astro). Only for a mouse or trackpad; touch
// devices keep the normal cursor. With "reduce motion" on there's no trail, no easing and no
// magnetic pull.
const root = document.querySelector<HTMLElement>("[data-cursor-root]");
const canvas = root?.querySelector<HTMLCanvasElement>("[data-cursor-trail]");
const ring = root?.querySelector<HTMLElement>("[data-cursor-ring]");
const dot = root?.querySelector<HTMLElement>("[data-cursor-dot]");
const text = root?.querySelector<HTMLElement>("[data-cursor-text]");
const ctx = canvas?.getContext("2d");

const finePointer = window.matchMedia("(hover: hover) and (pointer: fine)").matches;
const reducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

if (root && canvas && ctx && ring && dot && text && finePointer) {
  root.classList.remove("hidden");

  const TRAIL_LIFE = 500; // ms each point of the brush trail stays visible
  const BRUSH_MIN = 1.5; // stroke width (px) when moving slowly: a thin pencil line
  const BRUSH_MAX = 10; // stroke width (px) when moving fast: a thick, inky stroke
  const brandColor = getComputedStyle(root).getPropertyValue("--color-brand").trim() || "#c2562f";
  let trailColor = brandColor;
  // w: stroke width at that point, from how fast the pointer was moving
  const points: { x: number; y: number; t: number; w: number }[] = [];

  const mouse = { x: 0, y: 0 };
  let magnet: HTMLElement | null = null; // magnetic button under the pointer
  const ringPos = { x: 0, y: 0 };
  const ease = reducedMotion ? 1 : 0.25; // 1 = ring sticks to the pointer
  let started = false;

  // The stroke is first drawn solid on this hidden canvas, then copied to the visible one at a
  // single transparency. Drawing it semi-transparent directly would darken every spot where two
  // segments overlap, leaving dots along the line.
  const ink = document.createElement("canvas");
  const inkCtx = ink.getContext("2d")!;

  // Sharp lines on high-density (Retina) screens
  const resize = () => {
    const dpr = window.devicePixelRatio || 1;
    for (const [c, c2d] of [[canvas, ctx], [ink, inkCtx]] as const) {
      c.width = window.innerWidth * dpr;
      c.height = window.innerHeight * dpr;
      c2d.setTransform(dpr, 0, 0, dpr, 0, 0);
    }
  };
  resize();
  window.addEventListener("resize", resize);

  // Draws the trail as short curved segments, like a brush stroke: thick where the pointer moved
  // fast, thin where it moved slowly, and each part tapers away to nothing as it gets older
  let canvasDirty = false;
  const drawTrail = (now: number) => {
    while (points.length && now - points[0].t > TRAIL_LIFE) points.shift();
    // Nothing to draw and nothing left on screen: skip the full-screen clear while idle
    if (!points.length && !canvasDirty) return;
    const w = window.innerWidth, h = window.innerHeight;
    inkCtx.clearRect(0, 0, w, h);
    ctx.clearRect(0, 0, w, h);
    canvasDirty = points.length > 2;
    inkCtx.strokeStyle = trailColor;
    inkCtx.lineCap = "round";
    inkCtx.lineJoin = "round";
    for (let i = 1; i < points.length - 1; i++) {
      const life = 1 - (now - points[i].t) / TRAIL_LIFE; // 1 = brand new, 0 = about to vanish
      const prev = points[i - 1], cur = points[i], next = points[i + 1];
      inkCtx.lineWidth = cur.w * life;
      inkCtx.beginPath();
      inkCtx.moveTo((prev.x + cur.x) / 2, (prev.y + cur.y) / 2);
      inkCtx.quadraticCurveTo(cur.x, cur.y, (cur.x + next.x) / 2, (cur.y + next.y) / 2);
      inkCtx.stroke();
    }
    ctx.globalAlpha = 0.75;
    ctx.drawImage(ink, 0, 0, w, h);
    ctx.globalAlpha = 1;
  };

  const tick = () => {
    // performance.now(), the same clock the trail points are stamped with
    const now = performance.now();
    // Over a magnetic button the ring is drawn most of the way toward its centre
    let targetX = mouse.x, targetY = mouse.y;
    if (magnet) {
      const r = magnet.getBoundingClientRect();
      targetX += (r.left + r.width / 2 - mouse.x) * 0.6;
      targetY += (r.top + r.height / 2 - mouse.y) * 0.6;
    }
    ringPos.x += (targetX - ringPos.x) * ease;
    ringPos.y += (targetY - ringPos.y) * ease;
    ring.style.transform = `translate3d(${ringPos.x}px, ${ringPos.y}px, 0)`;
    if (!reducedMotion) drawTrail(now);
    requestAnimationFrame(tick);
  };

  window.addEventListener(
    "pointermove",
    (e) => {
      mouse.x = e.clientX;
      mouse.y = e.clientY;
      dot.style.transform = `translate3d(${mouse.x}px, ${mouse.y}px, 0)`;
      // Speed since the last point (px per ms) sets the stroke width, eased so it swells and
      // thins smoothly instead of jumping
      const now = performance.now();
      const last = points[points.length - 1];
      const speed = last ? Math.hypot(mouse.x - last.x, mouse.y - last.y) / Math.max(now - last.t, 1) : 0;
      const target = BRUSH_MIN + Math.min(speed / 3, 1) * (BRUSH_MAX - BRUSH_MIN);
      const w = last ? last.w + (target - last.w) * 0.35 : BRUSH_MIN;
      points.push({ x: mouse.x, y: mouse.y, t: now, w });
      if (!started) {
        // Swap in the custom cursor on the first move, so there's never a moment with no cursor.
        // Start the ring at the pointer instead of flying in from the corner.
        started = true;
        document.documentElement.classList.add("has-custom-cursor"); // hides the normal cursor (global.css)
        ringPos.x = mouse.x;
        ringPos.y = mouse.y;
        requestAnimationFrame(tick);
      }
      root.toggleAttribute("data-visible", true);
    },
    { passive: true },
  );

  // Hide when the pointer leaves the window (relatedTarget is null then). Safari can fire
  // pointerleave on <html> while still over the page, so that event isn't used here.
  document.addEventListener("mouseout", (e) => {
    if (!e.relatedTarget) root.removeAttribute("data-visible");
  });
  window.addEventListener("pointerdown", () => root.toggleAttribute("data-down", true));
  window.addEventListener("pointerup", () => root.removeAttribute("data-down"));

  // React to what's under the pointer
  document.addEventListener("pointerover", (e) => {
    const target = e.target as Element;
    const labelled = target.closest<HTMLElement>("[data-cursor]:not(:disabled)");
    const interactive = target.closest("a, button:not(:disabled), [role='button']");

    if (labelled?.dataset.cursor) text.textContent = labelled.dataset.cursor;
    root.toggleAttribute("data-label", !!labelled?.dataset.cursor);
    root.toggleAttribute("data-hover", !!interactive && !labelled);

    // Over a coloured section the cursor and its trail turn white, so they don't disappear
    const onColor = !!target.closest('[data-tone="color"]');
    root.toggleAttribute("data-on-color", onColor);
    trailColor = onColor ? "#ffffff" : brandColor;
  });

  // Magnetic buttons ([data-magnetic]): while hovered they lean toward the pointer (up to a
  // third of the distance from their centre) and spring back when it leaves. The element's
  // own CSS transition makes both movements smooth.
  if (!reducedMotion) {
    const pull = new WeakMap<HTMLElement, { x: number; y: number }>();

    for (const el of document.querySelectorAll<HTMLElement>("[data-magnetic]")) {
      el.addEventListener("pointermove", (e) => {
        magnet = el;
        const r = el.getBoundingClientRect();
        const current = pull.get(el) ?? { x: 0, y: 0 };
        // Centre without the current pull, so the button doesn't chase its own movement
        const cx = r.left + r.width / 2 - current.x;
        const cy = r.top + r.height / 2 - current.y;
        const next = { x: (e.clientX - cx) * 0.3, y: (e.clientY - cy) * 0.3 };
        pull.set(el, next);
        el.style.transform = `translate(${next.x}px, ${next.y}px)`;
      });
      el.addEventListener("pointerleave", () => {
        magnet = null;
        pull.delete(el);
        el.style.transform = "";
      });
    }
  }
}
