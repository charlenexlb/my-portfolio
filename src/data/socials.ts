import { site } from "./site";
import LinkedInIcon from "../icons/linkedin.svg";
import GitHubIcon from "../icons/github.svg";
import InstagramIcon from "../icons/instagram.svg";
import MailIcon from "../icons/mail.svg";

// Every way to reach you, shown as icons in the footer (via SocialLinks).
// color: the icon button fills with this on hover.
export const socials = {
  linkedin: { label: "LinkedIn", url: site.linkedin, Icon: LinkedInIcon, color: "#0A66C2" },
  github: { label: "GitHub", url: site.github, Icon: GitHubIcon, color: "#181717" },
  instagram: { label: "Instagram", url: site.instagram, Icon: InstagramIcon, color: "#E4405F" },
  email: { label: "Email", url: `mailto:${site.email}`, Icon: MailIcon, color: "var(--color-brand)" },
};

export type SocialKey = keyof typeof socials;
