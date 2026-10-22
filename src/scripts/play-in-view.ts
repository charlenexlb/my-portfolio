// Videos marked [data-play-in-view] (project cards) play muted while on screen and pause when
// scrolled away, instead of autoplaying on page load. Until then only the poster and the video's
// metadata load. With "reduce motion" on they don't start by themselves.
const videos = document.querySelectorAll<HTMLVideoElement>("video[data-play-in-view]");
const reducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

if (videos.length && !reducedMotion) {
  const observer = new IntersectionObserver(
    (entries) => {
      for (const entry of entries) {
        const video = entry.target as HTMLVideoElement;
        if (entry.isIntersecting) video.play().catch(() => {});
        else video.pause();
      }
    },
    { threshold: 0.4 },
  );
  videos.forEach((video) => observer.observe(video));
}

export {}; // makes this file a module, so its names don't clash with other scripts
