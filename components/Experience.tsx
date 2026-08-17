import React from "react";

import { workExperience } from "@/data";
import { Button } from "./ui/MovingBorders";

const Experience = () => {
  return (
    <section id="experience" className="py-20 w-full">
      <h2 className="heading">
        Work <span className="text-purple">experience</span>
      </h2>

      <div className="w-full mt-12 grid lg:grid-cols-2 grid-cols-1 gap-10">
        {workExperience.map((card) => (
          <Button
            key={card.id}
            duration={Math.floor(Math.random() * 10000) + 10000}
            borderRadius="1.75rem"
            style={{
              background: "rgb(4,7,29)",
              backgroundColor:
                "linear-gradient(90deg, rgba(4,7,29,1) 0%, rgba(12,14,35,1) 100%)",
              borderRadius: `calc(1.75rem* 0.96)`,
            }}
            className="flex-1 text-black dark:text-white border-neutral-200 dark:border-slate-800"
          >
            <div className="flex flex-col p-3 py-6 md:p-5 lg:p-10 gap-2 text-start">
              <p className="text-xs uppercase tracking-widest text-purple">
                {card.period}
              </p>
              <h3 className="text-xl md:text-2xl font-bold">
                {card.title}
                <span className="text-white-200 font-normal">
                  {" "}
                  — {card.company}
                </span>
              </h3>
              <p className="text-white-100 mt-2 text-sm md:text-base leading-relaxed">
                {card.desc}
              </p>
            </div>
          </Button>
        ))}
      </div>
    </section>
  );
};

export default Experience;
