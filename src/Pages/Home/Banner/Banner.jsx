// import { Link } from "react-router";
// import bannerBg from "../../../assets/desktop-wallpaper-understanding-the-logistics-of-importing-and-exporting-goods-for-your-business-import-export.jpg";
// import { motion } from "framer-motion";

// const Banner = () => {
//   const containerVariants = {
//     hidden: { opacity: 0 },
//     visible: {
//       opacity: 1,
//       transition: { staggerChildren: 0.3 },
//     },
//   };

//   const itemVariants = {
//     hidden: { opacity: 0, y: 20 },
//     visible: {
//       opacity: 1,
//       y: 0,
//       transition: { duration: 0.6, ease: "easeOut" },
//     },
//   };

//   const headlineVariants = {
//     hidden: { opacity: 0, x: -50 },
//     visible: {
//       opacity: 1,
//       x: 0,
//       transition: { duration: 0.8, ease: "easeOut" },
//     },
//   };

//   const buttonVariants = {
//     hidden: { opacity: 0, scale: 0.8 },
//     visible: {
//       opacity: 1,
//       scale: 1,
//       transition: { duration: 0.5, ease: "easeOut", delay: 1.5 },
//     },
//   };

//   return (
//     // h-[100dvh] মোবাইল ব্রাউজারের অ্যাড্রেস বারের ঝামেলা দূর করে
//     <div className="relative h-screen min-h-[500px] lg:h-screen bg-gray-900 overflow-hidden z-0">
//       {/* Background image layer */}
//       <div
//         className="absolute inset-0 bg-cover bg-center transition-opacity duration-700 z-0"
//         style={{
//           backgroundImage: `url(${bannerBg || "/placeholder-ship.jpg"})`,
//         }}
//       >
//         <div className="absolute inset-0 bg-black/60 z-0"></div>
//       </div>

//       {/* Main content */}
//       <motion.div
//         className="relative z-10 flex flex-col items-center justify-center h-full text-white text-center px-6" // প্যাডিং একটু বাড়ানো হয়েছে
//         variants={containerVariants}
//         initial="hidden"
//         animate="visible"
//       >
//         <motion.p
//           className="text-xs md:text-sm tracking-widest uppercase font-medium mb-4"
//           variants={itemVariants}
//         >
//           WELCOME TO OUR COMMUNITY
//         </motion.p>

//         <motion.h1
//           // মোবাইলের জন্য text-3xl বা text-4xl রাখা ভালো
//           className="text-3xl sm:text-4xl md:text-6xl font-extrabold mb-6 max-w-4xl leading-[1.1]"
//           variants={headlineVariants}
//         >
//           THE ULTIMATE <span className="text-red-600">CLUB EXPERIENCE</span>
//         </motion.h1>

//         <motion.p
//           className="text-sm md:text-lg max-w-2xl mb-10 font-light text-gray-200"
//           variants={itemVariants}
//         >
//           Join our club to explore events, connect with members, build skills,
//           and enjoy a vibrant community where everyone grows together.
//         </motion.p>

//         <Link to={"all-club"} className="w-full sm:w-auto flex justify-center">
//           <motion.button
//             className="bg-pink-500 hover:bg-pink-600 text-white font-semibold px-8 py-3.5 rounded-lg transition-all duration-300 w-full sm:w-64"
//             variants={buttonVariants}
//             whileTap={{ scale: 0.95 }} // মোবাইলে ক্লিক করার সময় একটা ছোট ইফেক্ট
//           >
//             JOIN THE CLUB
//           </motion.button>
//         </Link>
//       </motion.div>
//     </div>
//   );
// };

// export default Banner;

import { Link } from "react-router-dom";
import { motion } from "framer-motion";

const Banner = () => {
  const container = {
    hidden: {},
    visible: {
      transition: {
        staggerChildren: 0.22,
        delayChildren: 0.3,
      },
    },
  };

  const fadeInUp = {
    hidden: { opacity: 0, y: 40, scale: 0.96, filter: "blur(10px)" },
    visible: {
      opacity: 1,
      y: 0,
      scale: 1,
      filter: "blur(0px)",
      transition: {
        duration: 1.1,
        ease: [0.16, 1, 0.3, 1],
      },
    },
  };

  return (
    <div className="relative h-[90dvh] md:h-screen w-full bg-[#050505] overflow-hidden flex items-center justify-center">
      {/* glowing background */}
      <div className="absolute inset-0 z-0">
        <div className="absolute top-1/4 -left-20 w-80 h-80 bg-pink-600/30 rounded-full blur-[120px] animate-pulse" />
        <div className="absolute bottom-1/4 -right-20 w-96 h-96 bg-blue-600/10 rounded-full blur-[150px]" />
        <div
          className="absolute inset-0 opacity-[0.05]"
          style={{
            backgroundImage:
              "linear-gradient(#fff 1px, transparent 1px), linear-gradient(90deg, #fff 1px, transparent 1px)",
            backgroundSize: "50px 50px",
          }}
        />
      </div>

      {/* content */}
      <motion.div
        variants={container}
        initial="hidden"
        animate="visible"
        className="relative z-10 w-full max-w-4xl px-6 text-center"
      >
        <motion.div
          variants={fadeInUp}
          className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-white/5 border border-white/10 backdrop-blur-xl mb-6"
        >
          <span className="relative flex h-2 w-2">
            <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-pink-400 opacity-75" />
            <span className="relative inline-flex rounded-full h-2 w-2 bg-pink-500" />
          </span>
          <span className="text-gray-300 text-[10px] md:text-xs font-bold tracking-[0.3em] uppercase">
            WELCOME TO OUR COMMUNITY
          </span>
        </motion.div>

        <motion.h1
          variants={fadeInUp}
          className="text-4xl md:text-6xl lg:text-7xl font-black text-white mb-6"
        >
          THE ULTIMATE <br />
          <span className="text-transparent bg-clip-text bg-gradient-to-r from-pink-500 via-rose-400 to-amber-200">
            CLUB EXPERIENCE
          </span>
        </motion.h1>

        <motion.p
          variants={fadeInUp}
          className="text-gray-400 max-w-xl mx-auto mb-10"
        >
          Join our club to explore events, connect with members, build skills,
          and enjoy a vibrant community.
        </motion.p>

        <motion.div
          variants={fadeInUp}
          className="flex flex-col sm:flex-row gap-5 justify-center"
        >
          <Link to="/all-club">
            <motion.button
              whileHover={{ scale: 1.04, y: -3 }}
              whileTap={{ scale: 0.96 }}
              className="px-10 cursor-pointer py-4 bg-pink-600 hover:bg-pink-700 text-white font-bold rounded-2xl shadow-lg hover:shadow-pink-600/50 transition"
            >
              Join The Club
            </motion.button>
          </Link>

          <Link to="/all-events">
            <motion.button
              whileHover={{ scale: 1.04, y: -3 }}
              whileTap={{ scale: 0.96 }}
              className="px-10 cursor-pointer py-4 bg-white/5 hover:bg-white/10 text-white font-bold rounded-2xl border border-white/10 backdrop-blur-md transition"
            >
              View Events
            </motion.button>
          </Link>
        </motion.div>
      </motion.div>
    </div>
  );
};

export default Banner;
