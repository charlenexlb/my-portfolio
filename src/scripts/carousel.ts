// Arrow buttons for horizontal card carousels ([data-carousel]).
// Each click moves one card; buttons are disabled at the start and end,
// and hidden entirely when all cards fit on screen.
for (const carousel of document.querySelectorAll<HTMLElement>("[data-carousel]")) {
  const track = carousel.querySelector<HTMLElement>("[data-carousel-track]");
  const buttons = carousel.querySelector<HTMLElement>("[data-carousel-buttons]");
  const prev = carousel.querySelector<HTMLButtonElement>("[data-carousel-prev]");
  const next = carousel.querySelector<HTMLButtonElement>("[data-carousel-next]");
  if (!track || !prev || !next) continue;

  const step = () => {
    const card = track.firstElementChild as HTMLElement | null;
    const gap = parseFloat(getComputedStyle(track).columnGap) || 0;
    return (card?.offsetWidth ?? track.clientWidth) + gap;
  };

  const update = () => {
    prev.disabled = track.scrollLeft <= 1;
    next.disabled = track.scrollLeft + track.clientWidth >= track.scrollWidth - 1;
    if (buttons) buttons.hidden = prev.disabled && next.disabled;
  };

  prev.addEventListener("click", () => track.scrollBy({ left: -step() }));
  next.addEventListener("click", () => track.scrollBy({ left: step() }));
  track.addEventListener("scroll", update, { passive: true });
  window.addEventListener("resize", update);
  update();
}
