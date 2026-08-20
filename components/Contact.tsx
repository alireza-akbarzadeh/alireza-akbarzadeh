import { contactEmail } from "@/data";
import Reveal from "./ui/Reveal";
import { button } from "./ui/Button";

/**
 * The one centred band on the page. Every other section is left-aligned, so
 * centring here reads as punctuation — the close of the argument — rather than
 * as a default.
 */
const Contact = () => (
  <section id="contact" className="scroll-mt-24 border-t border-hairline py-24 md:py-32">
    <Reveal className="mx-auto flex max-w-2xl flex-col items-center text-center">
      <p className="text-mono-eyebrow font-mono uppercase tracking-widest text-mute">
        Contact
      </p>

      <h2 className="mt-5 text-3xl font-semibold tracking-tight text-ink md:text-heading-lg">
        Looking for a senior frontend engineer who thinks in systems?
      </h2>

      <p className="mt-5 text-body-lg leading-relaxed text-body">
        I&apos;m open to senior frontend roles, remote — the kind where I own
        architecture, not just tickets. If you&apos;re building a frontend
        platform that needs stronger structure, performance or engineering
        standards, let&apos;s talk.
      </p>

      <a
        href={`mailto:${contactEmail}`}
        className={`${button({ variant: "primary", shape: "pill" })} mt-10`}
      >
        Get in touch
      </a>

      <a
        href={`mailto:${contactEmail}`}
        className="mt-5 rounded-button font-mono text-body-sm text-mute underline decoration-hairline underline-offset-4 transition-colors hover:text-accent-brand focus-visible:outline-hidden focus-visible:ring-2 focus-visible:ring-accent-brand focus-visible:ring-offset-2 focus-visible:ring-offset-canvas"
      >
        {contactEmail}
      </a>
    </Reveal>
  </section>
);

export default Contact;
