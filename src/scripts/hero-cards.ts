// The polaroid cards around the intro headline ([data-hero-card]) drift with the mouse, each by
// its own depth (data-depth), so they feel layered. Their CSS transition makes the drift smooth.
// Skipped on touch screens and for people who prefer less motion; the cards then just sit still.
const cards = document.querySelectorAll<HTMLElement>("[data-hero-card]");
const finePointer = window.matchMedia("(hover: hover) and (pointer: fine)").matches;
const reducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

if (cards.length && finePointer && !reducedMotion) {
  const mouse = { x: 0, y: 0 };
  let queued = false;

  const update = () => {
    queued = false;
    // Offset from the centre of the screen, scaled by each card's depth
    const dx = mouse.x - window.innerWidth / 2;
    const dy = mouse.y - window.innerHeight / 2;
    for (const card of cards) {
      const depth = parseFloat(card.dataset.depth ?? "0");
      card.style.transform = `translate(${dx * depth}px, ${dy * depth}px)`;
    }
  };

  window.addEventListener(
    "pointermove",
    (e) => {
      mouse.x = e.clientX;
      mouse.y = e.clientY;
      if (!queued) requestAnimationFrame(update);
      queued = true;
    },
    { passive: true },
  );
}

export {}; // makes this file a module, so its names don't clash with other scripts
