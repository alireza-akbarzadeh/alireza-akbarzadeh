import React from "react";
import { motion } from "framer-motion";

import { styles } from "../styles";
import { SectionWrapper } from "../hoc";
import { fadeIn, textVariant } from "../utils/motion";
import { certificate } from "../constants";
import { verified } from "../assets";

const Certificate = ({
  name,
  issued,
  credentialId,
  company,
  image,
  index,
  link,
  verify,
}) => (
  <motion.div
    variants={fadeIn("", "spring", index * 0.5, 0.75)}
    className="bg-black-200 p-1 rounded-3xl xs:w-[320px] w-full"
  >
    <a href={link} target="_blank" className="cursor-pointer">
      <img
        src={image}
        alt={`feedback_by-${name}`}
        className="w-full rounded-md object-cover"
      />
    </a>
    <div className="mt-1">
      <div className="mt-7 flex justify-between items-center gap-1">
        <div className="flex-1 flex flex-col gap-2">
          <p className="text-secondary font-medium text-[16px]">
            {credentialId}
          </p>
          <p className="mt-1 text-white text-[15px]">{name}</p>
          <p className="text-white font-medium text-[16px]">
            <span className="blue-text-gradient">@</span>
            <span className="ml-1">{company}</span>
          </p>

          <a href={verify} target="_blank" className="flex items-center gap-1">
            <img
              src={verified}
              alt="verified"
              className="w-5 h-5 object-contain"
            />
            <p className="text-white font-medium text-[16px]">Verify</p>
          </a>
          <p className="text-secondary font-medium text-[16px]">
            Issued : {issued}
          </p>
        </div>
      </div>
    </div>
  </motion.div>
);

const Feedbacks = () => {
  return (
    <div className={`mt-12 bg-black-100 rounded-[20px]`}>
      <div
        className={`bg-tertiary rounded-2xl ${styles.padding} min-h-[300px]`}
      >
        <motion.div variants={textVariant()}>
          <p className={styles.sectionSubText}>Licenses & certifications</p>
          <h2 className={styles.sectionHeadText}>Achievement</h2>
        </motion.div>
      </div>
      <div className={`-mt-20 pb-14 ${styles.paddingX} flex flex-wrap gap-7`}>
        {certificate.map((value, index) => (
          <Certificate key={value.name} index={index} {...value} />
        ))}
      </div>
    </div>
  );
};

export default SectionWrapper(Feedbacks, "");
