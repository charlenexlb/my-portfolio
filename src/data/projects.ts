// Your projects, in the order they appear — edit these and the Projects section updates.
// Replace the [bracketed] placeholders with your own details.
//
// label:   optional small tag above the title, e.g. "Bachelor end project".
// image:   optional screenshot in /src/assets (e.g. "/projects/bep.png"); Astro optimises it.
// video:   optional short clip in /public (e.g. "/projects/bep.mp4"). Plays muted on a loop while
//          the card is on screen. With a video, image becomes its poster (the still shown before
//          it plays). Without either, the card shows a plain placeholder.
// github / demo: optional links. Leave one out and its button disappears.
type Project = {
  title: string;
  label?: string;
  description: string;
  image?: string;
  video?: string;
  tags: string[];
  github?: string;
  demo?: string;
};

export const projects: Project[] = [
  {
    title: "Evaluating RAG in Dutch Primary Care: A Benchmark over NHG Guidelines",
    label: "Bachelor Thesis",
    description: "",
    image: "/projects/bep.jpg",
    tags: ["RAG", "Benchmarking", "QA", "LLM", "Python"],
    github: "https://github.com/Nuffs/RP_NHG_2026",
    demo: "https://[demo-link]",
  },
  {
    title: "SuperRED Project",
    label: "University Course Project",
    image: "/projects/superred.jpg",
    description: "A project for a course at TU Delft, where we developed an application to facilitate self-regulated learning for university students.",
    tags: ["Bootstrap", "Django", "Javascript", "Python"],
  },
  {
    title: "This portfolio",
    label: "Side project",
    image: "/projects/portfolio.png",
    description: "The site you’re looking at right now! Built to showcase my work and experience, and to experiment with new web technologies.",
    tags: ["Astro", "Tailwind CSS", "Lenis", "TypeScript"],
    github: "https://github.com/charlenexlb/my-portfolio",
  },
];
