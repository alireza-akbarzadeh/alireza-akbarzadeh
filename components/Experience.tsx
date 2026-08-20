import { workExperience } from "@/data";
import { cn } from "@/lib/utils";
import TrajectoryGraphic from "./graphics/TrajectoryGraphic";
import Reveal from "./ui/Reveal";
import ScrollSpine from "./ui/ScrollSpine";
import Section from "./ui/Section";

/**
 * A timeline rather than cards: roles are sequential, and a spine communicates
 * that ordering for free. This also replaced a decorative animated-border card
 * whose duration was seeded with Math.random() during render — a hydration
 * mismatch waiting to happen, since server and client produced different values.
 *
 * The hairline spine now has an accent line drawn over it that fills with scroll
 * position (ScrollSpine). It sits outside the `Reveal` deliberately: `Reveal`
 * with `stagger` animates its direct children, and a progress indicator that
 * faded in alongside the roles would be animating twice, by two different
 * mechanisms, in two different directions.
 */
const Experience = () => (
  <Section id="experience" eyebrow="Experience" title="Where I've done the work">
    <TrajectoryGraphic className="mb-10 ml-auto block h-auto w-40 sm:w-48" />

    <div className="relative">
      <ScrollSpine className="h-full" />

      <Reveal stagger as="ol" className="border-l border-hairline">
        {workExperience.map((role) => {
          const isCurrent = role.period.includes("Present");
          return (
            <li
              key={role.id}
              className="relative grid gap-x-10 gap-y-3 pb-14 pl-8 last:pb-0 md:grid-cols-[11rem_minmax(0,1fr)] md:pl-12"
            >
              <span
                aria-hidden="true"
                className={cn(
                  "absolute left-0 top-2 h-2 w-2 -translate-x-1/2 rounded-full ring-4 ring-canvas",
                  isCurrent ? "bg-accent-brand" : "bg-faint"
                )}
              />

              <p className="font-mono text-mono-eyebrow uppercase tracking-widest text-mute md:pt-1">
                {role.period}
              </p>

              <div>
                <h3 className="text-heading-md text-ink">
                  {role.title}
                  <span className="font-normal text-mute"> · {role.company}</span>
                </h3>
                <p className="mt-3 max-w-2xl text-body-md leading-relaxed text-body">
                  {role.desc}
                </p>
              </div>
            </li>
          );
        })}
      </Reveal>
    </div>
  </Section>
);

export default Experience;
