// Your creative work for the "Beyond code" section — edit these and the section updates.
// Videos go in /public/travel/; images (drawings, video posters) in /src/assets/drawings/ and
// /src/assets/travel/, so Astro can optimise them. Point to them here by path, e.g. "/drawings/x.jpg".
// Full-size originals are kept in /media-originals (not published); compress new ones before adding.
// Entries without a file show a grey placeholder, so you can see the layout first.

// video:  e.g. "/travel/japan.mp4". Previews silently on hover; opens with sound when clicked.
//         Keep files small for a fast site: ~30–60s, 1080p, H.264 .mp4 (a few MB each).
// poster: optional still shown before the video loads, e.g. "/travel/japan.jpg" (in src/assets).
// preview: optional short, small, silent clip played on hover, e.g. "/travel/japan-preview.mp4"
//          (~6s, 540p, a few hundred KB). Keeps hovering light; the full video only loads
//          when opened. Made with: ffmpeg -ss 10 -t 6 -i japan.mp4 -vf scale=-2:540 -an
//          -crf 30 -movflags +faststart japan-preview.mp4
type TravelEdit = {
  title: string;
  place?: string;
  video?: string;
  preview?: string;
  poster?: string;
};

// image:  e.g. "/drawings/portrait.jpg" (in src/assets). Any proportions; the grid adapts.
// medium: optional, e.g. "Watercolour" or "Digital, Procreate".
type Drawing = {
  title: string;
  medium?: string;
  image?: string;
};

export const travelEdits: TravelEdit[] = [
  { title: "Calanque D'En-Vau Hike", place: "Cassis, France", video: "/travel/calanque.mp4", preview: "/travel/calanque-preview.mp4", poster: "/travel/calanque.jpg" },
  { title: "Swiss Summer", place: "Switzerland", video: "/travel/swiss-summer.mp4", preview: "/travel/swiss-summer-preview.mp4", poster: "/travel/swiss-summer.jpg" },
  { title: "Our china trip", place: "China", video: "/travel/china-trip.mp4", preview: "/travel/china-trip-preview.mp4", poster: "/travel/china-trip.jpg" },
  { title: "Vietnam.", place: "Vietnam", video: "/travel/vietnam.mp4", preview: "/travel/vietnam-preview.mp4", poster: "/travel/vietnam.jpg" },
];

export const drawings: Drawing[] = [
  { title: "Pencil on paper, 2023", image: "/drawings/drawing1.jpg" },
  { title: "Pencil on paper, 2023", image: "/drawings/drawing3.jpg" },
  { title: "Pencil on paper, 2024", image: "/drawings/drawing4.jpg" },
];
