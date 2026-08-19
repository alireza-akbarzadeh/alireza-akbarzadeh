import { IconBrandGithub, IconBrandLinkedin, IconBrandX } from "@tabler/icons-react";
import type { TablerIcon } from "@tabler/icons-react";

import Link from "next/link";

import { socialMedia } from "@/data";
import { button } from "./ui/Button";

/**
 * Brand icons come from @tabler/icons-react rather than lucide-react: lucide
 * dropped all company/brand logos (trademark scope), so there's no Github,
 * Linkedin or Twitter/X export left on lucide-react >=1. Tabler still ships
 * them, and they inherit currentColor the same way.
 */
const ICONS: Record<string, TablerIcon> = {
  github: IconBrandGithub,
  x: IconBrandX,
  linkedin: IconBrandLinkedin,
};

const Footer = () => (
  <footer className="border-t border-hairline py-10">
    <div className="flex flex-col-reverse items-center justify-between gap-6 sm:flex-row">
      <div className="flex flex-wrap items-center gap-x-5 gap-y-2">
        <p className="text-body-sm text-mute">
          © {new Date().getFullYear()} Alireza Akbarzadeh
        </p>
        <Link
          href="/resume"
          className="rounded-button text-body-sm text-mute underline decoration-hairline underline-offset-4 transition-colors hover:text-accent-brand focus-visible:outline-hidden focus-visible:ring-2 focus-visible:ring-accent-brand focus-visible:ring-offset-2 focus-visible:ring-offset-canvas"
        >
          Résumé
        </Link>
      </div>

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
