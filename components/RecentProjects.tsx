"use client";

import { FaLocationArrow } from "react-icons/fa6";

import { projects } from "@/data";
import { PinContainer } from "./ui/Pin";

const RecentProjects = () => {
  return (
    <section id="projects" className="py-20">
      <h2 className="heading">
        Selected <span className="text-purple">work</span>
      </h2>
      <div className="flex flex-wrap items-center justify-center p-4 gap-16 mt-10">
        {projects.map((item) => (
          <div
            className="lg:min-h-[32.5rem] h-[25rem] flex items-center justify-center sm:w-96 w-[80vw]"
            key={item.id}
          >
            <PinContainer title={item.linkLabel} href={item.link}>
              <div className="relative flex items-center justify-center sm:w-96 w-[80vw] overflow-hidden h-[20vh] lg:h-[30vh] mb-10">
                <div
                  className="relative w-full h-full overflow-hidden lg:rounded-3xl flex items-center justify-center"
                  style={{ backgroundColor: "#13162D" }}
                >
                  {item.img ? (
                    // eslint-disable-next-line @next/next/no-img-element
                    <img
                      src={item.img}
                      alt={`${item.title} interface`}
                      className="w-full h-full object-cover"
                    />
                  ) : (
                    <span className="text-4xl md:text-5xl font-bold text-white/10 select-none">
                      {item.title}
                    </span>
                  )}
                </div>
              </div>

              <h3 className="font-bold lg:text-2xl md:text-xl text-base line-clamp-1">
                {item.title}
              </h3>

              <p
                className="lg:text-base lg:font-normal font-light text-sm line-clamp-3"
                style={{
                  color: "#BEC1DD",
                  margin: "1vh 0",
                }}
              >
                {item.des}
              </p>

              <div className="flex items-center justify-between mt-7 mb-3 gap-4">
                <ul className="flex flex-wrap items-center gap-2">
                  {item.stack.map((tech) => (
                    <li
                      key={tech}
                      className="border border-white/[.2] rounded-full bg-black/40 px-2.5 py-1 text-[11px] leading-none text-white-200"
                    >
                      {tech}
                    </li>
                  ))}
                </ul>

                <span className="flex items-center shrink-0">
                  <span className="lg:text-sm md:text-xs text-sm text-purple">
                    View
                  </span>
                  <FaLocationArrow className="ms-2" color="#CBACF9" />
                </span>
              </div>
            </PinContainer>
          </div>
        ))}
      </div>
    </section>
  );
};

export default RecentProjects;
