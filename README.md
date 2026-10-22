# Charlene Bakker — Portfolio

My personal portfolio: a single-page site with my experience, projects, and creative work (travel edits and drawings).

Built with [Astro](https://astro.build), [Tailwind CSS](https://tailwindcss.com) v4 and [Lenis](https://lenis.darkroom.engineering) for smooth scrolling. No UI framework; the interactive bits are small TypeScript scripts.

## Getting started

Requires Node 22.22 or newer. The repo pins Node 24 in `.nvmrc`:

```sh
nvm use          # switch to the Node version in .nvmrc
npm install
npm run dev      # http://localhost:4321
```

| Command | What it does |
| :-- | :-- |
| `npm run dev` | Dev server at `localhost:4321` (or `npx astro dev --background`, then `astro dev stop` / `status` / `logs`) |
| `npm run build` | Production build to `./dist/` |
| `npm run preview` | Serve the production build locally |
| `npx astro check` | Type-check all `.astro` and `.ts` files |

## Project structure

```text
public/              Served as-is: favicons, og.png (link preview), company logos, travel videos
src/
├── assets/          Images Astro optimises (WebP, several sizes): photos, drawings, video posters, project shots
├── components/      Header, Section, Cursor, Scribble (pencil underline), SocialLinks, CarouselButtons
├── data/            All the content, so the page itself rarely needs editing (see below)
├── icons/           SVG icons for the social links
├── layouts/         Layout.astro: <head>, link-preview tags, header, footer, global scripts
├── lib/images.ts    Looks up images in src/assets by path, for use in data files
├── pages/           index.astro: the one page, section by section
├── scripts/         Client-side behaviour (one file per feature)
└── styles/          global.css: colours, fonts, shadows, glass buttons, animation styles
media-originals/     Full-size originals of the videos and drawings (git-ignored, not published)
```

## Editing content

Most changes happen in `src/data/`; each file has comments explaining its fields.

| File | Contents |
| :-- | :-- |
| `site.ts` | Name, page title, description, email, header and About photos, social profile links |
| `experience.ts` | Roles, newest first, with logo and brand colour |
| `projects.ts` | Project cards: title, label, description, image or video, tags, GitHub/demo links |
| `creative.ts` | Travel edits (videos) and drawings for the "Beyond code" section |
| `socials.ts` | Which icons the footer shows and their hover colours |

The intro's polaroid cards are the `heroCards` list at the top of `src/pages/index.astro`.

## Adding images and videos

**Images** (photos, drawings, video posters, project screenshots) go in `src/assets/`, not `public/`, so Astro can resize them and convert them to WebP. Refer to them in the data files by their path inside `src/assets`, e.g. `"/drawings/drawing1.jpg"`. A wrong path stops the build with a clear error.

**Videos** go in `public/travel/`. Keep them web-sized; GitHub rejects files over 100 MB:

```sh
# Full video: H.264 MP4, 1080p on the short side, starts playing before it has fully loaded
ffmpeg -i original.mov -vf "scale='if(gt(iw,ih),-2,1080)':'if(gt(iw,ih),1080,-2)'" \
  -c:v libx264 -preset slow -crf 26 -pix_fmt yuv420p -c:a aac -b:a 128k \
  -movflags +faststart public/travel/name.mp4

# Hover preview: 6 silent seconds at 540p (a few hundred KB)
ffmpeg -ss 10 -t 6 -i public/travel/name.mp4 -vf "scale='if(gt(iw,ih),-2,540)':'if(gt(iw,ih),540,-2)'" \
  -an -c:v libx264 -preset slow -crf 30 -pix_fmt yuv420p -movflags +faststart public/travel/name-preview.mp4
```

Then add `video`, `preview` and `poster` to the entry in `creative.ts`. Keep the full-size original in `media-originals/`.

## Look and feel

- **Colours:** `--color-brand` at the top of `src/styles/global.css` re-colours the whole site, including shadows. Earlier options are listed in a comment there.
- **Fonts:** Instrument Serif for display text (`font-serif`) and Inter for body text (`font-sans`, the default), set up in `astro.config.mjs`.
- **Section style:** `<Section tone="color">` gives a section the brand-colour background with white text. The default is white with the big title word in the brand colour. Start a section with something solid (a card or pill), since the big title word tucks behind the first block.
- **Reusable attributes:**
  - `data-reveal`: fades the element in when scrolled into view.
  - `data-magnetic`: the element leans toward the cursor on hover.
  - `data-cursor="Word"`: the cursor shows that word over the element.
  - `<Scribble>word</Scribble>`: a pencil underline that draws itself.

### Scripts (`src/scripts/`)

| Script | Feature |
| :-- | :-- |
| `smooth-scroll.ts` | Lenis smooth scrolling; always opens at the top of the page |
| `scenes.ts` | Scroll-linked effects: sections recede, title words slide, scroll-speed lean, rotating header photo |
| `header.ts` | Header shrinks on scroll; nav highlights the current section |
| `reveal.ts` | Fade-in on scroll |
| `scribble.ts` | Draws the pencil underlines |
| `cursor.ts` | Custom cursor with speed-sensitive brush trail, labels and magnetic buttons |
| `hero-cards.ts` | Mouse parallax for the intro's polaroid cards |
| `carousel.ts` | Arrow buttons for the horizontal carousels |
| `lightbox.ts` | Full-size viewer for videos and drawings; plays hover previews |

All motion respects the visitor's "reduce motion" setting, and the custom cursor only appears with a mouse or trackpad. If a script fails to load, the content still shows; nothing is hidden waiting for JavaScript.

## Deploying

Any static host works (Netlify, Vercel, GitHub Pages, …): build with `npm run build` and serve `dist/`.

Before going live, set your domain in `astro.config.mjs`:

```js
export default defineConfig({
  site: "https://your-domain.com",
  // ...
});
```

Link previews (LinkedIn, WhatsApp, Slack) need full URLs, and Astro builds them from `site`. The preview image is `public/og.png` (1200×630).
