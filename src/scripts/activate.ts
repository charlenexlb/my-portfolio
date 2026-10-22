// Marks the [data-activate] element nearest the middle of the screen with data-active, so it can
// show its "hover" look while you scroll. Phones have no hover, so this is how the experience cards'
// logos and timeline dots get their colour there. Styled with group-data-active: in index.astro.
const items = document.querySelectorAll<HTMLElement>("[data-activate]");

if (items.length) {
  // Only a thin band across the middle of the screen counts, so one card is active at a time
  const observer = new IntersectionObserver(
    (entries) => {
      for (const entry of entries) entry.target.toggleAttribute("data-active", entry.isIntersecting);
    },
    { rootMargin: "-45% 0px -45% 0px" },
  );
  items.forEach((item) => observer.observe(item));
}

export {}; // makes this file a module, so its names don't clash with other scripts
