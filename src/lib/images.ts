import type { ImageMetadata } from "astro";

// Every image in src/assets, so data files can refer to one by path ("/drawings/drawing1.jpg")
// and Astro's <Image> / getImage() can resize and convert it (WebP, several sizes) at build time.
const images = import.meta.glob<{ default: ImageMetadata }>("/src/assets/**/*.{jpg,jpeg,png,webp,JPG,JPEG,PNG}", {
  eager: true,
});

// Like asset(), but returns undefined instead of failing when the image isn't there yet
export function findAsset(path: string | undefined): ImageMetadata | undefined {
  return path ? images[`/src/assets${path}`]?.default : undefined;
}

export function asset(path: string): ImageMetadata {
  const found = images[`/src/assets${path}`];
  if (!found) throw new Error(`Image not found: src/assets${path} (check the path in your data file)`);
  return found.default;
}
