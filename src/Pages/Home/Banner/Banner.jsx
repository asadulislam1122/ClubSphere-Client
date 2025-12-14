import { Link } from "react-router";
import bannerBg from "../../../assets/desktop-wallpaper-understanding-the-logistics-of-importing-and-exporting-goods-for-your-business-import-export.jpg";
import { motion } from "framer-motion";

const Banner = () => {
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: { staggerChildren: 0.3 },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.6, ease: "easeOut" },
    },
  };

  const headlineVariants = {
    hidden: { opacity: 0, x: -50 },
    visible: {
      opacity: 1,
      x: 0,
      transition: { duration: 0.8, ease: "easeOut" },
    },
  };

  const buttonVariants = {
    hidden: { opacity: 0, scale: 0.8 },
    visible: {
      opacity: 1,
      scale: 1,
      transition: { duration: 0.5, ease: "easeOut", delay: 1.5 },
    },
  };

  return (
    <div className="relative h-screen bg-gray-900 overflow-hidden z-0">
      {/* Background image layer */}
      <div
        className="absolute inset-0 bg-cover bg-center transition-opacity duration-700 z-0"
        style={{
          backgroundImage: `url(${bannerBg || "/placeholder-ship.jpg"})`,
        }}
      >
        <div className="absolute inset-0 bg-black opacity-60 z-0"></div>
      </div>

      {/* Main content */}
      <motion.div
        className="relative z-10 flex flex-col items-center justify-center h-full text-white text-center px-4"
        variants={containerVariants}
        initial="hidden"
        animate="visible"
      >
        <motion.p
          className="text-sm tracking-widest uppercase font-medium mb-4"
          variants={itemVariants}
        >
          WELCOME TO OUR COMMUNITY
        </motion.p>

        <motion.h1
          className="text-4xl md:text-6xl font-extrabold mb-6 max-w-4xl leading-tight"
          variants={headlineVariants}
        >
          THE ULTIMATE <span className="text-red-600">CLUB EXPERIENCE</span>
        </motion.h1>

        <motion.p
          className="text-base md:text-lg max-w-3xl mb-10 font-light text-gray-200"
          variants={itemVariants}
        >
          Join our club to explore events, connect with members, build skills,
          and enjoy a vibrant community where everyone grows together.
        </motion.p>

        <Link to={"all-club"}>
          {" "}
          <motion.button
            className="bg-pink-500 hover:bg-pink-600 text-white font-semibold px-6 py-3 sm:py-4 rounded-lg transition w-full sm:w-auto"
            variants={buttonVariants}
          >
            JOIN THE CLUB
          </motion.button>
        </Link>
      </motion.div>
    </div>
  );
};

export default Banner;
