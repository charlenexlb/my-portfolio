// Draws hand-drawn underlines ([data-scribble], see Scribble.astro) once they come into view.
// Without this script, or with reduced motion, the line is simply shown fully drawn.
if (!window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
  const observer = new IntersectionObserver(
    (entries) => {
      for (const entry of entries) {
        if (!entry.isIntersecting) continue;
        observer.unobserve(entry.target);
        // A short pause first, so the line draws after the text is there
        setTimeout(() => entry.target.classList.add("is-drawn"), 400);
      }
    },
    { rootMargin: "0px 0px -15% 0px" },
  );

  for (const el of document.querySelectorAll<SVGElement>("[data-scribble]")) {
    el.classList.add("scribble-pending");
    observer.observe(el);
  }
}
