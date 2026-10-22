import { lenis } from "./smooth-scroll";

// Scroll-linked transitions between sections, updated on every Lenis scroll frame:
//   [data-scene]    as a section scrolls away it recedes: drifts up, shrinks a little and fades
//   [data-marquee]  the giant outlined word behind each title slides sideways as you pass
//   while scrolling fast, sections lean slightly with the scroll speed, then straighten
//   [data-header-photo]  the photo in the header turns with the scroll position
// Only transform and opacity change, so if this never runs everything simply stays still.
// `lenis` is undefined for people who prefer less motion, so none of this runs for them.
if (lenis) {
  const scroller = lenis;
  const scenes = Array.from(document.querySelectorAll<HTMLElement>("[data-scene]"));
  const marquees = Array.from(document.querySelectorAll<HTMLElement>("[data-marquee]"));
  const headerPhoto = document.querySelector<HTMLElement>("[data-header-photo]");
  const PHOTO_TURN = 0.05; // degrees per pixel scrolled: one full turn every 7200px
  const clamp = (v: number, min = 0, max = 1) => Math.min(max, Math.max(min, v));

  const update = () => {
    const vh = window.innerHeight;
    const scrollY = scroller.scroll;
    // Lenis' velocity eases to 0 as scrolling stops, so the lean settles back by itself
    const lean = clamp(scroller.velocity * 0.05, -2, 2);

    for (const el of scenes) {
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
      const section = el.parentElement!;
      const top = section.offsetTop - scrollY;
      // 0 when the section enters at the bottom, 1 when it leaves at the top
      const progress = clamp((vh - top) / (vh + section.offsetHeight));
      el.style.transform = `translateX(${(0.5 - progress) * 50}vw)`;
    }
  };

  scroller.on("scroll", update);
  window.addEventListener("resize", update);
  update();
}
