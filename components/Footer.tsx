import Image from "next/image";
import { FaLocationArrow } from "react-icons/fa6";

import { contactEmail, socialMedia } from "@/data";
import MagicButton from "./MagicButton";

const Footer = () => {
  return (
    <footer className="w-full pt-20 pb-10" id="contact">
      {/* background grid */}
      <div
        className="w-full absolute left-0 -bottom-72 min-h-96"
        aria-hidden="true"
      >
        <Image
          src="/footer-grid.svg"
          alt=""
          fill
          className="object-cover opacity-50"
        />
      </div>

      <div className="flex flex-col items-center relative z-10">
        <h2 className="heading lg:max-w-[45vw]">
          Looking for a senior frontend engineer who thinks in{" "}
          <span className="text-purple">systems</span>?
        </h2>
        <p className="text-white-200 md:mt-10 my-5 text-center max-w-2xl">
          I&apos;m open to senior frontend roles, remote. If you&apos;re hiring
          for frontend architecture, design systems or performance work,
          I&apos;d like to hear about it.
        </p>
        <a href={`mailto:${contactEmail}`}>
          <MagicButton
            title="Get in touch"
            icon={<FaLocationArrow />}
            position="right"
          />
        </a>
      </div>

      <div className="flex mt-16 md:flex-row flex-col justify-between items-center gap-6 relative z-10">
        <p className="md:text-base text-sm md:font-normal font-light">
          © {new Date().getFullYear()} Alireza Akbarzadeh
        </p>

        <ul className="flex items-center md:gap-3 gap-6">
          {socialMedia.map((info) => (
            <li key={info.id}>
              <a
                href={info.href}
                target="_blank"
                rel="noopener noreferrer"
                aria-label={info.label}
                title={info.label}
                className="w-10 h-10 flex justify-center items-center backdrop-filter backdrop-blur-lg saturate-180 bg-opacity-75 bg-black-200 rounded-lg border border-black-300 transition-colors hover:border-purple focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-purple"
              >
                <Image src={info.img} alt="" width={20} height={20} />
              </a>
            </li>
          ))}
        </ul>
      </div>
    </footer>
  );
};

export default Footer;
