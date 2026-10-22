// Your work experience, newest first — edit these and the Experience section updates.
// Replace the [bracketed] placeholders with your own details.
//
// logo:  optional image in /public (e.g. "/logos/ubs.svg"). Shown grey, in color on hover.
//        Without one, the card shows the company's initials instead.
// color: the company's brand color, used for the initials tile on hover.
type Job = {
  role: string;
  company: string;
  city?: string;
  period: string;
  logo?: string;
  color: string;
  points: string[];
};

export const experience: Job[] = [
  {
    role: "Graduate Trainee Software Engineer",
    company: "UBS",
    city: "Zurich, Switzerland",
    period: "2026 – present",
    logo: "/logos/ubs.svg",
    color: "#E60000",
    points: [
      "Working in the Documents Creation and Distribution team, focusing on developing and maintaining software solutions for document generation and distribution processes.",
    ],
  },
  {
    role: "Software Engineering Summer Intern",
    company: "UBS",
    city: "Zurich, Switzerland",
    period: "Summer 2025",
    logo: "/logos/ubs.svg",
    color: "#E60000",
    points: [
      "Developed a full-stack application to generate customized test data using GPT-4.1, supporting the team in improving testing efficiency.",
      "Gained experience in AI integration, full-stack development, and collaborative software engineering practices.",
    ],
  },
  {
    role: "Software Engineering Summer Intern",
    company: "Booking.com",
    city: "Amsterdam, Netherlands",
    period: "Summer 2024",
    logo: "/logos/booking.svg",
    color: "#003A9A",
    points: [
      "Worked on a project alongside a team in FinTech, learning about code scalability, design patterns and different technologies.",
      "Gained experience in full-stack development, agile methodologies, and new technologies.",
    ],
  },
];
