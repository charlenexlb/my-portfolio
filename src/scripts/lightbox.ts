import { lenis } from "./smooth-scroll";

// Opens videos ([data-lightbox-video]) and images ([data-lightbox-image]) full-size
// in the <dialog data-lightbox>. Videos play there with sound and controls.
const dialog = document.querySelector<HTMLDialogElement>("[data-lightbox]");
const content = dialog?.querySelector<HTMLElement>("[data-lightbox-content]");

if (dialog && content) {
  const mediaClass = "max-h-[85dvh] max-w-[90vw] rounded-xl object-contain";

  const open = (media: HTMLElement) => {
    // Stop any hover preview behind the lightbox, so only one video plays at a time
    document.querySelectorAll<HTMLVideoElement>("[data-lightbox-video] video").forEach((v) => v.pause());
    content.replaceChildren(media);
    dialog.showModal();
    lenis?.stop(); // keep the page behind from scrolling
  };

  dialog.addEventListener("close", () => {
    content.replaceChildren(); // also stops a playing video
    lenis?.start();
  });

  // A click on the dark backdrop lands on the <dialog> itself
  dialog.addEventListener("click", (e) => {
    if (e.target === dialog) dialog.close();
  });
  dialog.querySelector("[data-lightbox-close]")?.addEventListener("click", () => dialog.close());

  for (const trigger of document.querySelectorAll<HTMLElement>("[data-lightbox-video]")) {
    trigger.addEventListener("click", () => {
      const video = document.createElement("video");
      video.src = trigger.dataset.lightboxVideo!;
      video.controls = true;
      video.autoplay = true;
      video.playsInline = true;
      // Show the tile's still while the full video loads
      video.poster = trigger.querySelector("video")?.poster ?? "";
      video.className = mediaClass;
      open(video);
    });
  }

  for (const trigger of document.querySelectorAll<HTMLElement>("[data-lightbox-image]")) {
    trigger.addEventListener("click", () => {
      const img = document.createElement("img");
      img.src = trigger.dataset.lightboxImage!;
      img.alt = trigger.dataset.lightboxTitle ?? "";
      img.className = mediaClass;
      open(img);
    });
  }
}

// Silent preview of travel edits while hovering (not for people who prefer less motion)
if (!window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
  for (const trigger of document.querySelectorAll<HTMLElement>("[data-lightbox-video]")) {
    const preview = trigger.querySelector("video");
    if (!preview) continue;
    trigger.addEventListener("mouseenter", () => preview.play().catch(() => {}));
    trigger.addEventListener("mouseleave", () => preview.pause());
  }
}
