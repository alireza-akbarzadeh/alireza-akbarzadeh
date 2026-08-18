import { Github, Linkedin, Twitter } from "lucide-react";
import type { LucideIcon } from "lucide-react";

import { socialMedia } from "@/data";
import { button } from "./ui/Button";

/**
 * Icons come from lucide (already a dependency) rather than the previous
 * white-filled SVG files: they inherit currentColor, so they stay legible in
 * both themes and cost three fewer network requests.
 */
const ICONS: Record<string, LucideIcon> = {
  github: Github,
  x: Twitter,
  linkedin: Linkedin,
};

const Footer = () => (
  <footer className="border-t border-hairline py-10">
    <div className="flex flex-col-reverse items-center justify-between gap-6 sm:flex-row">
      <p className="text-body-sm text-mute">
        © {new Date().getFullYear()} Alireza Akbarzadeh
      </p>

      <ul className="flex items-center gap-2">
        {socialMedia.map((social) => {
          const Icon = ICONS[social.icon];
          return (
            <li key={social.id}>
              <a
                href={social.href}
                target="_blank"
                rel="noopener noreferrer"
                aria-label={`${social.label} (opens in a new tab)`}
                className={button({
                  variant: "chrome",
                  shape: "square",
                  size: "icon",
                })}
              >
                <Icon aria-hidden="true" className="h-4 w-4" />
              </a>
            </li>
          );
        })}
      </ul>
    </div>
  </footer>
);

export default Footer;
