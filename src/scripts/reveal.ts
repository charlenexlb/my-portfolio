// Fade-in on scroll for anything marked [data-reveal] (headings, cards). Styles are in global.css.
//
// Only elements that start off-screen are hidden, and only by this script — so if it
// never runs, or for anything already visible on load, content simply shows as normal.
const prefersReducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

if (!prefersReducedMotion && "IntersectionObserver" in window) {
  const waiting = new Set<HTMLElement>();

  const reveal = (el: HTMLElement, delay = 0) => {
    if (!waiting.delete(el)) return;
    observer.unobserve(el);

    // Once faded in, drop the reveal styles so the element's own hover transitions apply again
    el.addEventListener("transitionend", function done(e) {
      if (e.target !== el || e.propertyName !== "opacity") return;
      el.classList.remove("reveal", "is-revealed");
      el.style.removeProperty("--reveal-delay");
      el.removeEventListener("transitionend", done);
    });

    el.style.setProperty("--reveal-delay", `${delay}ms`);
    el.classList.add("is-revealed");
  };

  const observer = new IntersectionObserver(
    (entries) => {
      // Elements that appear together (e.g. a row of cards) fade in one after another
      entries
        .filter((entry) => entry.isIntersecting)
        .forEach((entry, i) => reveal(entry.target as HTMLElement, Math.min(i, 4) * 100));
    },
    // Start once an element is a little way into the screen, not right at the edge
    { rootMargin: "0px 0px -10% 0px" },
  );

  // A fast jump (e.g. clicking "Get in touch") can skip right past an element without it ever
  // counting as on screen. Reveal anything already scrolled past, so nothing above stays hidden.
  let queued = false;
  const revealPassed = () => {
    queued = false;
    for (const el of waiting) if (el.getBoundingClientRect().bottom < 0) reveal(el);
    if (!waiting.size) window.removeEventListener("scroll", onScroll);
  };
  const onScroll = () => {
    if (!queued) requestAnimationFrame(revealPassed);
    queued = true;
  };

  for (const el of document.querySelectorAll<HTMLElement>("[data-reveal]")) {
    const { top, left } = el.getBoundingClientRect();
    if (top < window.innerHeight && left < window.innerWidth) continue; // already visible

    el.classList.add("reveal");
    waiting.add(el);
    observer.observe(el);
  }

  if (waiting.size) window.addEventListener("scroll", onScroll, { passive: true });
}
