import {
  mobile,
  backend,
  creator,
  web,
  javascript,
  typescript,
  html,
  css,
  reactjs,
  redux,
  tailwind,
  nodejs,
  mongodb,
  git,
  figma,
  docker,
  meta,
  starbucks,
  tesla,
  shopify,
  carrent,
  jobit,
  tripguide,
  threejs,
} from "../assets";

export const navLinks = [
  {
    id: "about",
    title: "About",
  },
  {
    id: "work",
    title: "Work",
  },
  {
    id: "contact",
    title: "Contact",
  },
];

const services = [
  {
    title: "Web Developer",
    icon: web,
  },
  {
    title: "React Native Developer",
    icon: mobile,
  },
  {
    title: "Backend Developer",
    icon: backend,
  },
  {
    title: "UI | UX Designer",
    icon: creator,
  },
];

const technologies = [
  {
    name: "HTML 5",
    icon: html,
  },
  {
    name: "CSS 3",
    icon: css,
  },
  {
    name: "JavaScript",
    icon: javascript,
  },
  {
    name: "TypeScript",
    icon: typescript,
  },
  {
    name: "React JS",
    icon: reactjs,
  },
  {
    name: "Redux Toolkit",
    icon: redux,
  },
  {
    name: "Tailwind CSS",
    icon: tailwind,
  },
  {
    name: "Node JS",
    icon: nodejs,
  },
  {
    name: "MongoDB",
    icon: mongodb,
  },
  {
    name: "Three JS",
    icon: threejs,
  },
  {
    name: "git",
    icon: git,
  },
  {
    name: "figma",
    icon: figma,
  },
  {
    name: "docker",
    icon: docker,
  },
];

const experiences = [
  {
    title: "Senior Frontend Developer",
    company_name: "Hasti Innovative Trading (HIT)",
    icon: starbucks,
    iconBg: "#383E56",
    date: "Aug 2022 - Pre",
    location: "IRAN | Tehran",
    points: [
      "Developing and maintaining web applications using React.js and other related technologies.",
      "Collaborating with cross-functional teams including designers, product managers, and other developers to create high-quality products.",
      "Implementing responsive design and ensuring cross-browser compatibility.",
      "Performs code reviews of other team members' work and recommends changes to improve code quality Work hand-in-hand with Design and Development groups to create shared standards and applications from mock-ups in figma, Illustrator, and Photoshop",
      "Professional in HTML and CSS/SASS and JAVASCRIPT/REACT/NEXT Support planning and testing features Profiling and optimization of existing features",
      "Working with business stakeholders and project managers to manage timelines and client expectations",
    ],
  },
  {
    title: "React  Developer",
    company_name: "Digialpha",
    icon: tesla,
    iconBg: "#E6DEDD",
    date: "Jul 2021 - May 2022",
    location: "IRAN | Tehran",
    points: [
      "Developed and maintained several web applications using React, Redux, Node.js, and other related technologies.",
      "Worked closely with product managers, designers, and other developers to deliver high-quality products that met customer requirements.",
      "Led a team of junior developers, providing mentorship and guidance on best practices for React development.",
      "Participating in code reviews and providing constructive feedback to other developers.",
      "Developed reusable components and libraries to improve development",
    ],
  },
  {
    title: "Full Stack Developer",
    company_name: "Chatrata",
    icon: shopify,
    location: "IRAN | Tehran",
    iconBg: "#383E56",
    date: "Feb 2020 - Apr 2021",
    points: [
      "Beginner-level knowledge of C# and some Framework .net mvc Work with different development and QA teams to code HTML/CSS/JAVASCRIPT/JQUERY mockups, test, and verify projects through the development process",
      "Prior experience with one of the following frameworks: Next.js or ASP.Net MVC 5",
      "Research, develop and propose new technologies to improve or benefit the system architecture Providing post-launch support for defect and problem resolution",
      "Assisting in back-end integration",
      "Helping with feature design sessions",
    ],
  },
];

const testimonials = [
  {
    testimonial:
      "I thought it was impossible to make a website as beautiful as our product, but Rick proved me wrong.",
    name: "Sara Lee",
    designation: "CFO",
    company: "Acme Co",
    image: "https://randomuser.me/api/portraits/women/4.jpg",
  },
  {
    testimonial:
      "I've never met a web developer who truly cares about their clients' success like Rick does.",
    name: "Chris Brown",
    designation: "COO",
    company: "DEF Corp",
    image: "https://randomuser.me/api/portraits/men/5.jpg",
  },
  {
    testimonial:
      "After Rick optimized our website, our traffic increased by 50%. We can't thank them enough!",
    name: "Lisa Wang",
    designation: "CTO",
    company: "456 Enterprises",
    image: "https://randomuser.me/api/portraits/women/6.jpg",
  },
];

const certificate = [
  {
    name: "Advance React",
    issued: "may 2022",
    credentialId: "",
    company: "Coursera",
    image: "/certificate/Advance-React.png",
    link: "https://www.coursera.org/account/accomplishments/certificate/B72RTFCL9Y5E",
    verify:
      "https://www.coursera.org/account/accomplishments/verify/B72RTFCL9Y5E",
  },
  {
    name: "React Native",
    issued: "may 2022",
    credentialId: "",
    company: "Coursera",
    image: "/certificate/Native.png",
    link: "https://www.coursera.org/account/accomplishments/certificate/MPDH3LAWQFXC",
    verify:
      "https://www.coursera.org/account/accomplishments/verify/MPDH3LAWQFXC",
  },
  {
    name: "Html and Css in Depth",
    credentialId: "",
    issued: "may 2022",
    company: "Coursera",
    image: "/certificate/HtmlAndCss.png",
    link: "https://www.coursera.org/account/accomplishments/certificate/PUP96LAWTSTL",
    verify:
      "https://www.coursera.org/account/accomplishments/verify/PUP96LAWTSTL",
  },
];

const projects = [
  {
    name: "Car Rent",
    description:
      "Web-based platform that allows users to search, book, and manage car rentals from various providers, providing a convenient and efficient solution for transportation needs.",
    tags: [
      {
        name: "react",
        color: "blue-text-gradient",
      },
      {
        name: "mongodb",
        color: "green-text-gradient",
      },
      {
        name: "tailwind",
        color: "pink-text-gradient",
      },
    ],
    image: carrent,
    source_code_link: "https://github.com/",
  },
  {
    name: "Job IT",
    description:
      "Web application that enables users to search for job openings, view estimated salary ranges for positions, and locate available jobs based on their current location.",
    tags: [
      {
        name: "react",
        color: "blue-text-gradient",
      },
      {
        name: "restapi",
        color: "green-text-gradient",
      },
      {
        name: "scss",
        color: "pink-text-gradient",
      },
    ],
    image: jobit,
    source_code_link: "https://github.com/",
  },
  {
    name: "Trip Guide",
    description:
      "A comprehensive travel booking platform that allows users to book flights, hotels, and rental cars, and offers curated recommendations for popular destinations.",
    tags: [
      {
        name: "nextjs",
        color: "blue-text-gradient",
      },
      {
        name: "supabase",
        color: "green-text-gradient",
      },
      {
        name: "css",
        color: "pink-text-gradient",
      },
    ],
    image: tripguide,
    source_code_link: "https://github.com/",
  },
];

export {
  services,
  technologies,
  experiences,
  testimonials,
  projects,
  certificate,
};
