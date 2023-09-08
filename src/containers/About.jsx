import { Tilt } from "react-tilt";
import { motion } from "framer-motion";

import { styles } from "../styles";
import { services } from "../constants";
import { SectionWrapper } from "../hoc";
import { fadeIn, textVariant } from "../utils/motion";

const ServiceCard = ({ index, title, icon }) => (
  <Tilt className="xs:w-[250px] w-full">
    <motion.div
      variants={fadeIn("right", "spring", index * 0.5, 0.75)}
      className="w-full green-pink-gradient p-[1px] rounded-[20px] shadow-card"
    >
      <div
        options={{
          max: 45,
          scale: 1,
          speed: 450,
        }}
        className="bg-tertiary rounded-[20px] py-5 px-12 min-h-[280px] flex justify-evenly items-center flex-col"
      >
        <img
          src={icon}
          alt="web-development"
          className="w-16 h-16 object-contain"
        />

        <h3 className="text-white text-[20px] font-bold text-center">
          {title}
        </h3>
      </div>
    </motion.div>
  </Tilt>
);

const About = () => {
  return (
    <>
      <motion.div variants={textVariant()}>
        <p className={styles.sectionSubText}>Introduction</p>
        <h2 className={styles.sectionHeadText}>Overview.</h2>
      </motion.div>

      <motion.p
        variants={fadeIn("", "", 0.1, 1)}
        className="mt-4 text-secondary text-[17px] max-w-3xl leading-[30px] space-y-2"
      >
        <p>
          🚀 As an experienced front-end engineer, I'm on a mission to create
          captivating websites that blend stunning visuals with exceptional
          functionality, ensuring users have memorable experiences. With over +6
          years of expertise in web application development, I'm well-versed in
          React, Next.js, JavaScript, and other cutting-edge technologies.
        </p>
        <p>
          💼 One of my standout achievements involved collaborating with a
          dynamic team to craft a responsive e-commerce platform for Glorang.
          Leveraging Next.js for server-side rendering, styling with
          material-ui, and seamlessly integrating Stripe for payments, we
          witnessed a remarkable 50% surge in online sales within just one
          month. This achievement resonated positively with both customers and
          stakeholders, underscoring our website's pivotal role in elevating the
          brand's online presence.
        </p>
        <p>
          🤝 Thriving in collaborative environments, I excel at leveraging my
          skills to contribute effectively and efficiently to project success.
          My unwavering motivation drives me to continuously learn and embrace
          new challenges, fueling my professional growth. Guided by user-centric
          design principles, I'm committed to delivering websites that not only
          meet but exceed expectations, leaving an indelible impression on
          users. Let's create digital experiences that inspire and engage!"
        </p>
      </motion.p>
      <div className="mt-20 flex flex-wrap gap-10">
        {services.map((service, index) => (
          <ServiceCard key={service.title} index={index} {...service} />
        ))}
      </div>
    </>
  );
};

export default SectionWrapper(About, "about");
