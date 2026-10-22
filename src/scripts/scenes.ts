import { lenis } from "./smooth-scroll";

// Scroll-linked transitions between sections, updated on every Lenis scroll frame:
//   [data-scene]    as a section scrolls away it recedes: drifts up, shrinks a little and fades
//   [data-marquee]  the giant title words slide sideways (fallback only; normally done in CSS)
//   while scrolling fast, sections lean slightly with the scroll speed, then straighten
//   [data-header-photo]  the photo in the header turns with the scroll position
// Only transform and opacity change, so if this never runs everything simply stays still.
// `lenis` is undefined for people who prefer less motion, so none of this runs for them.
if (lenis) {
  const scroller = lenis;
  const scenes = Array.from(document.querySelectorAll<HTMLElement>("[data-scene]"));
  // Title words are animated in CSS where possible (smoother, see global.css). This script moves any
  // word that CSS animation isn't actually running on: an older browser, or an outdated stylesheet.
  // Not on touch screens, though: a script can't keep up with phone scrolling, so there the words
  // stay still rather than slide jerkily.
  const fineMotion = window.matchMedia("(pointer: fine)").matches;
  const marquees = fineMotion
    ? Array.from(document.querySelectorAll<HTMLElement>("[data-marquee]")).filter(
        (el) => getComputedStyle(el).animationName !== "marquee-slide",
      )
    : [];
  const headerPhoto = document.querySelector<HTMLElement>("[data-header-photo]");
  const PHOTO_TURN = 0.05; // degrees per pixel scrolled: one full turn every 7200px
  const clamp = (v: number, min = 0, max = 1) => Math.min(max, Math.max(min, v));
  // No lean and no receding on touch screens (fineMotion above): finger flicks are fast and jerky,
  // which made whole sections tilt and pulse in size. The header photo still turns.

  const update = () => {
    const vh = window.innerHeight;
    const scrollY = scroller.scroll;
    // Lenis' velocity eases to 0 as scrolling stops, so the lean settles back by itself
    const lean = fineMotion ? clamp(scroller.velocity * 0.05, -2, 2) : 0;

    for (const el of fineMotion ? scenes : []) {
      // Measured from layout (offsetTop), not getBoundingClientRect, so our own
      // transforms don't feed back into the next frame's numbers
      const bottom = el.offsetTop + el.offsetHeight - scrollY;
      // 0 while the section's end is still in the lower 60% of the screen, 1 once it's gone
      const away = clamp((vh * 0.6 - bottom) / (vh * 0.6));
      el.style.transform = `translateY(${away * -60}px) scale(${1 - away * 0.08}) skewY(${lean}deg)`;
      el.style.opacity = String(1 - away * 0.8);
    }

    // Clockwise going down, back again going up
    if (headerPhoto) headerPhoto.style.transform = `rotate(${scrollY * PHOTO_TURN}deg)`;

    for (const el of marquees) {
      // Same path as the CSS version: 0 as the word enters at the bottom, 1 once its centre
      // reaches the middle of the screen, where it then stays
      const top = el.parentElement!.offsetTop + el.offsetTop - scrollY;
      const progress = clamp((vh - top) / (vh / 2 + el.offsetHeight / 2));
      el.style.transform = `translateX(${(1 - progress) * 25}vw)`;
    }
  };

  scroller.on("scroll", update);
  window.addEventListener("resize", update);
  update();
}
