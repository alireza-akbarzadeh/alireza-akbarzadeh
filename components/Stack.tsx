import { stackGroups } from "@/data";
import Reveal from "./ui/Reveal";

const Stack = () => {
  return (
    <section id="stack" className="py-20">
      <Reveal>
        <h2 className="heading">
          What I <span className="text-purple">work with</span>
        </h2>
      </Reveal>

      <Reveal stagger className="mt-14 grid gap-6 md:grid-cols-2">
        {stackGroups.map((group) => (
          <article
            key={group.id}
            className="rounded-2xl border border-white/[0.08] bg-black-200/40 p-6 md:p-8"
          >
            <div className="flex flex-wrap items-baseline justify-between gap-2">
              <h3 className="text-lg font-semibold text-white">
                {group.label}
              </h3>
              <p className="text-xs text-white-200/70">{group.note}</p>
            </div>

            <ul className="mt-5 flex flex-wrap gap-2">
              {group.items.map((item) => (
                <li
                  key={item}
                  className="rounded-full border border-white/[0.12] bg-black-100 px-3 py-1.5 text-xs text-white-200"
                >
                  {item}
                </li>
              ))}
            </ul>
          </article>
        ))}
      </Reveal>
    </section>
  );
};

export default Stack;
