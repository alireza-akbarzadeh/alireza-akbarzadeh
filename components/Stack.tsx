import { Cpu, Layers, ShieldCheck, Zap } from "lucide-react";
import type { LucideIcon } from "lucide-react";

import { stackGroups } from "@/data";
import Reveal from "./ui/Reveal";
import Section from "./ui/Section";
import Tag from "./ui/Tag";

/**
 * One glyph per group, keyed to id rather than label so a copy edit to
 * `group.label` can't silently break the lookup.
 */
const GROUP_ICONS: Record<number, LucideIcon> = {
  1: Zap,
  2: Layers,
  3: ShieldCheck,
  4: Cpu,
};

/**
 * Grouped by how I actually use each tool — not a wall of logos. The group note
 * is the honest part: "shipped production code in all of these" says something
 * a logo grid cannot.
 */
const Stack = () => (
  <Section
    id="stack"
    eyebrow="Stack"
    title="What I work with, and how often"
    lede="Grouped by real usage rather than by category, so the list says something about depth instead of breadth."
  >
    <Reveal stagger className="grid gap-5 md:grid-cols-2">
      {stackGroups.map((group) => {
        const Icon = GROUP_ICONS[group.id];
        return (
        <article
          key={group.id}
          className="rounded-card border border-hairline bg-canvas-elevated p-6 md:p-8"
        >
          <div className="flex flex-wrap items-baseline justify-between gap-x-4 gap-y-1">
            <h3 className="flex items-center gap-2 text-heading-md text-ink">
              <Icon aria-hidden="true" className="h-4 w-4 text-faint" />
              {group.label}
            </h3>
            <p className="text-body-sm text-mute">{group.note}</p>
          </div>

          <ul className="mt-6 flex flex-wrap gap-2">
            {group.items.map((item) => (
              <Tag key={item}>{item}</Tag>
            ))}
          </ul>
        </article>
        );
      })}
    </Reveal>
  </Section>
);

export default Stack;
