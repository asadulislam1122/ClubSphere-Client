import React from "react";
import { motion } from "framer-motion";

const OurFeture = () => {
  const techs = [
    { imgSrc: "https://i.ibb.co.com/4Z2NCz1x/1051277.png", title: "HTML" },
    {
      imgSrc:
        "https://i.ibb.co.com/wNjjrZCd/css-3-logo-png-seeklogo-426083.png",
      title: "CSS",
    },
    {
      imgSrc:
        "https://i.ibb.co.com/Mk7BPgsC/javascript-logo-javascript-icon-transparent-free-png.webp",
      title: "JavaScript",
    },
    { imgSrc: "https://i.ibb.co.com/nNJbrFJp/images-2.png", title: "React" },
    { imgSrc: "https://i.ibb.co.com/kv9NPKr/images-3.png", title: "MongoDB" },
    {
      imgSrc: "https://i.ibb.co.com/0yctTYz9/channels4-profile.jpg",
      title: "Firebase",
    },
    {
      imgSrc: "https://i.ibb.co.com/BVh3VdRn/tailwindcss.jpg",
      title: "Tailwind",
    },
    {
      imgSrc: "https://i.ibb.co.com/WWKddjXw/images-28.jpg",
      title: "Daisy UI",
    },
  ];

  return (
    <div className="max-w-6xl mx-auto py-16 px-6">
      {/* Header Section */}
      <motion.div
        initial={{ opacity: 0, y: -20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        className="text-center mb-12"
      >
        <h2 className="text-3xl md:text-5xl font-black text-slate-900 dark:text-white">
          Our Tech <span className="text-emerald-500">Stack</span> 🛠️
        </h2>
        <div className="h-1.5 w-20 bg-emerald-500 mx-auto mt-4 rounded-full"></div>
      </motion.div>

      {/* Static Grid Layout */}
      <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-6 lg:gap-8">
        {techs.map((tech, index) => (
          <FeatureCard key={index} index={index} {...tech} />
        ))}
      </div>
    </div>
  );
};

const FeatureCard = ({ imgSrc, title, index }) => {
  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.9 }}
      whileInView={{ opacity: 1, scale: 1 }}
      viewport={{ once: true }}
      transition={{ duration: 0.3, delay: index * 0.1 }}
      whileHover={{
        y: -5,
        transition: { duration: 0.2 },
      }}
      className="group relative bg-white dark:bg-slate-900/40 backdrop-blur-md p-8 rounded-[2rem] shadow-sm hover:shadow-2xl hover:shadow-emerald-500/10 border border-slate-100 dark:border-white/5 hover:border-emerald-500 transition-all cursor-pointer flex flex-col items-center justify-center overflow-hidden"
    >
      {/* Background Decorative Gradient */}
      <div className="absolute -right-4 -top-4 w-20 h-20 bg-emerald-500/5 rounded-full blur-2xl group-hover:bg-emerald-500/10 transition-colors" />

      {/* Image Wrapper */}
      <div className="w-16 h-16 md:w-20 md:h-20 mb-4 relative z-10 transform group-hover:scale-110 transition-transform duration-500">
        <img
          src={imgSrc}
          alt={title}
          className="w-full h-full object-contain filter drop-shadow-sm group-hover:drop-shadow-lg"
          loading="lazy"
        />
      </div>

      {/* Title */}
      <p className="text-lg font-bold text-slate-700 dark:text-slate-300 group-hover:text-emerald-500 transition-colors mt-2">
        {title}
      </p>

      {/* Bottom Indicator */}
      <div className="absolute bottom-0 left-0 w-0 h-1 bg-emerald-500 group-hover:w-full transition-all duration-500" />
    </motion.div>
  );
};

export default OurFeture;

// import React from "react";
// import Marquee from "react-fast-marquee";

// const OurFeture = () => {
//   return (
//     <div className="max-w-6xl mx-auto py-12 px-4 sm:px-6 lg:px-8">
//       <h2 className="text-3xl font-extrabold text-gray-900 text-center mb-10">
//         <span className="text-blue-600">Our Tech</span>{" "}
//         <span className="text-green-500">Stack</span> 🛠️
//       </h2>

//       <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-6 lg:gap-8">
//         <FeatureCard
//           imgSrc="https://i.ibb.co.com/4Z2NCz1x/1051277.png"
//           title="HTML"
//         />
//         <FeatureCard
//           imgSrc="https://i.ibb.co.com/wNjjrZCd/css-3-logo-png-seeklogo-426083.png"
//           title="CSS"
//         />
//         <FeatureCard
//           imgSrc="https://i.ibb.co.com/Mk7BPgsC/javascript-logo-javascript-icon-transparent-free-png.webp"
//           title="JavaScript"
//         />
//         <FeatureCard
//           imgSrc="https://i.ibb.co.com/nNJbrFJp/images-2.png"
//           title="React"
//         />

//         <FeatureCard
//           imgSrc="https://i.ibb.co.com/kv9NPKr/images-3.png"
//           title="MongoDB"
//         />
//         <FeatureCard
//           imgSrc="https://i.ibb.co.com/0yctTYz9/channels4-profile.jpg"
//           title="Firebase"
//         />
//         <FeatureCard
//           imgSrc="https://i.ibb.co.com/BVh3VdRn/tailwindcss.jpg"
//           title="Tailwind CSS"
//         />
//         <FeatureCard
//           imgSrc="https://i.ibb.co.com/WWKddjXw/images-28.jpg"
//           title="Daisy UI"
//         />
//       </div>
//     </div>
//   );
// };

// const FeatureCard = ({ imgSrc, title }) => {
//   return (
//     <div
//       className="bg-white p-6 rounded-xl shadow-lg border border-gray-100 flex flex-col items-center justify-center
//                     transition-all duration-300 ease-in-out cursor-pointer
//                     hover:scale-[1.03] hover:shadow-2xl hover:border-blue-500"
//     >
//       <div className="w-16 h-16 md:w-20 md:h-20 mb-4 flex items-center justify-center">
//         <img
//           src={imgSrc}
//           alt={title}
//           className="w-full h-full object-contain"
//           loading="lazy"
//         />
//       </div>

//       <p className="text-lg font-semibold text-gray-800 mt-2">{title}</p>
//     </div>
//   );
// };

// export default OurFeture;
