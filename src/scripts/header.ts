// Header behaviour: shrink + soft background once you scroll, and mark the nav link
// for the section you're currently in (styled via aria-current in Header.astro).
const header = document.querySelector<HTMLElement>("[data-header]");

if (header) {
  let queued = false;
  const update = () => {
    queued = false;
    header.toggleAttribute("data-scrolled", window.scrollY > 24);
  };
  window.addEventListener(
    "scroll",
    () => {
      if (!queued) requestAnimationFrame(update);
      queued = true;
    },
    { passive: true },
  );
  update();
}

const links = new Map(
  Array.from(document.querySelectorAll<HTMLAnchorElement>("[data-nav-link]")).map((a) => [a.hash.slice(1), a]),
);

// A section counts as "current" when it crosses the middle of the screen
const observer = new IntersectionObserver(
  (entries) => {
    for (const entry of entries) {
      if (!entry.isIntersecting) continue;
      for (const [id, link] of links) {
        if (id === entry.target.id) link.setAttribute("aria-current", "true");
        else link.removeAttribute("aria-current");
      }
    }
  },
  { rootMargin: "-50% 0px -50% 0px" },
);

// Observe every section, so the indicator also clears in the intro and Contact
for (const section of document.querySelectorAll<HTMLElement>("main > section[id]")) observer.observe(section);
