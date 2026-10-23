# Charlene Bakker — Portfolio

My personal portfolio website: who I am, my experience, my projects, and the things I make outside of coding (travel videos and drawings).

**Live at [charlenebakker.com](https://charlenebakker.com)**

Built with [Astro](https://astro.build) and [Tailwind CSS](https://tailwindcss.com), with smooth scrolling by [Lenis](https://lenis.darkroom.engineering).

## Running it locally

You need [Node.js](https://nodejs.org) (version 22 or newer).

```sh
npm install      # install everything once
npm run dev      # start the site at http://localhost:4321
```

To build the finished site, run `npm run build`. The result ends up in the `dist/` folder.

## Changing the content

Almost all text and links live in `src/data/`, so you rarely need to touch the page itself:

- `site.ts`: name, email, photos and social links
- `experience.ts`: work experience
- `projects.ts`: project cards
- `creative.ts`: travel videos and drawings

Each file has short comments explaining what to fill in.

## Adding images and videos

- **Images** go in `src/assets/`. Astro automatically makes them smaller and faster to load.
- **Videos** go in `public/travel/`. Keep each one under about 25 MB so the site stays fast.

Then add them to the matching file in `src/data/`.

## Changing the look

- **Colour:** change `--color-brand` at the top of `src/styles/global.css`. It updates the whole site.
- **Fonts:** set in `astro.config.mjs`. The site uses Instrument Serif for headings and Inter for text.

## Publishing

The site is static, so any host works. With [Vercel](https://vercel.com), import this repository once and every push to `main` goes live automatically.

The web address is set as `site` in `astro.config.mjs`, which link previews on LinkedIn and other apps need. Update it there if the domain ever changes.
