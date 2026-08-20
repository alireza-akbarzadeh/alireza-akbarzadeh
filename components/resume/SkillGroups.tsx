import type { ResumeSkillGroup } from "@/data/resume";
import { techLogo } from "@/lib/techLogos";

/**
 * Core technical skills.
 *
 * On screen each group is a card of logo chips — the same marks the stack
 * section uses, so the CV and the site read as one product, and a recruiter
 * skimming for "does he know React" finds a React logo instead of the eleventh
 * comma in a sentence.
 *
 * On paper the chips are replaced by the original comma-separated string.
 * That is not a fallback for missing colour, it is the correct format for the
 * medium: the PDF this page prints is what gets uploaded to an applicant
 * tracking system, and a parser wants "React, Next.js, Vue 3" — a run of
 * styled spans it has to re-join is a worse input than the sentence the data
 * already holds.
 *
 * Splitting only outside parentheses matters here: "Next.js (App Router, RSC,
 * SSR/SSG, streaming, caching)" is one skill with four commas inside it, and a
 * naive split turns it into five fragments, three of which are not
 * technologies.
 *
 * Semicolons separate too. The AI Engineering group is punctuated "Claude / LLM
 * APIs in product features; AI-assisted development workflows" — comma-only
 * splitting left that whole sentence as a single chip three lines tall.
 */
const splitSkills = (items: string): string[] => {
  const out: string[] = [];
  let depth = 0;
  let current = "";

  for (const char of items) {
    if (char === "(") depth++;
    if (char === ")") depth--;
    if ((char === "," || char === ";") && depth === 0) {
      out.push(current.trim());
      current = "";
      continue;
    }
    current += char;
  }
  if (current.trim()) out.push(current.trim());

  return out;
};

export const SkillGroups = ({ groups }: { groups: ResumeSkillGroup[] }) => (
  <dl className="grid gap-3 sm:grid-cols-2 print:block print:space-y-1.5">
    {groups.map((group) => (
      <div
        key={group.label}
        className="rounded-card border border-hairline bg-canvas-elevated p-4 print:break-inside-avoid print:rounded-none print:border-0 print:bg-transparent print:p-0"
      >
        <dt className="font-mono text-mono-eyebrow uppercase tracking-widest text-mute print:inline print:text-[9pt] print:font-medium print:normal-case print:tracking-normal print:text-ink">
          {group.label}
          <span className="hidden print:inline">: </span>
        </dt>

        {/* Screen: one chip per skill. */}
        <dd className="mt-3 print:hidden">
          <ul className="flex flex-wrap gap-1.5">
            {splitSkills(group.items).map((skill) => {
              const { Icon, tint, concept } = techLogo(skill);
              return (
                <li
                  key={skill}
                  style={{ "--tint": tint } as React.CSSProperties}
                  className="flex items-center gap-1.5 rounded-pill border border-[color-mix(in_oklab,var(--tint)_22%,var(--color-hairline))] bg-[color-mix(in_oklab,var(--tint)_7%,transparent)] py-1 pl-2 pr-2.5"
                >
                  <Icon
                    aria-hidden="true"
                    stroke={1.7}
                    className={
                      concept
                        ? "h-3.5 w-3.5 shrink-0 text-[color-mix(in_oklab,var(--tint)_55%,var(--color-faint))]"
                        : "h-3.5 w-3.5 shrink-0 text-(--tint)"
                    }
                  />
                  <span className="font-mono text-body-sm leading-none text-body">
                    {skill}
                  </span>
                </li>
              );
            })}
          </ul>
        </dd>

        {/* Print / ATS: the sentence, exactly as authored. */}
        <dd className="hidden print:inline print:text-[9pt] print:text-body">
          {group.items}
        </dd>
      </div>
    ))}
  </dl>
);

export default SkillGroups;
