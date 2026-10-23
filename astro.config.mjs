// @ts-check
import { defineConfig, fontProviders } from 'astro/config';

import tailwindcss from '@tailwindcss/vite';

// https://astro.build/config
export default defineConfig({
  // The live address. Used for full links in link previews (LinkedIn, WhatsApp, …)
  site: 'https://charlenebakker.com',
  fonts: [
    // Display font: big headline, section words, card titles, your name (Tailwind: font-serif)
    {
      provider: fontProviders.fontsource(),
      name: 'Instrument Serif',
      cssVariable: '--font-instrument-serif',
      weights: ['400'], // the only weight it comes in
      styles: ['normal', 'italic'],
      fallbacks: ['Georgia', 'serif'],
    },
    // Body font: paragraphs, labels, buttons, navigation (Tailwind: font-sans, the default)
    {
      provider: fontProviders.fontsource(),
      name: 'Inter',
      cssVariable: '--font-inter',
      weights: ['400', '500', '600'],
      styles: ['normal'],
      fallbacks: ['system-ui', 'sans-serif'],
    },
  ],
  vite: {
    plugins: [tailwindcss()]
  }
});
