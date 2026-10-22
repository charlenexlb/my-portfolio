import photo from "../assets/profile.jpg";

// Your personal details — edit these and they update everywhere on the site.
export const site = {
  name: "Charlene Bakker",
  title: "Charlene Bakker — Portfolio",
  // Shown under the title in search results and link previews (LinkedIn etc.)
  description:
    "Software engineer and TU Delft graduate, working across backend and UI/UX, from the system behind a product to the people who use it.",
  email: "bakkercharlene@gmail.com",
  // Your photo, in src/assets (Astro resizes it). To change it, replace that file or the import above.
  photo,
  // The bigger photo in the About section, in src/assets. Shows a placeholder until the file exists.
  aboutPhoto: "/about.jpg",
  // Your profile links, shown as icons in the Contact section and footer.
  linkedin: "https://www.linkedin.com/in/charlenebakker/",
  github: "https://github.com/charlenexlb",
  instagram: "https://www.instagram.com/charlenexlb_/",
};
