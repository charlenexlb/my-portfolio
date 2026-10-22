import Lenis from "lenis";
import "lenis/dist/lenis.css";

// Always open at the top: don't restore the old scroll position on reload,
// and drop a "#contact" left in the address bar by clicking a header link
history.scrollRestoration = "manual";
if (location.hash) history.replaceState(null, "", location.pathname + location.search);
window.scrollTo(0, 0);

// Smooth scrolling. Skipped (undefined) for people who've asked their OS for less motion.
// Exported so other scripts can pause it, e.g. while the lightbox is open.
export const lenis = window.matchMedia("(prefers-reduced-motion: reduce)").matches
  ? undefined
  : new Lenis({
      autoRaf: true,
      // Smooth-scroll "#about"-style links. Sections are full-screen with their content
      // centered, so they line up with the top of the viewport, under the sticky header.
      anchors: true,
    });
