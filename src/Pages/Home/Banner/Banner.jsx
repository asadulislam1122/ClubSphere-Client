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
    // h-[100dvh] মোবাইল ব্রাউজারের অ্যাড্রেস বারের ঝামেলা দূর করে
    <div className="relative h-screen min-h-[500px] lg:h-screen bg-gray-900 overflow-hidden z-0">
      {/* Background image layer */}
      <div
        className="absolute inset-0 bg-cover bg-center transition-opacity duration-700 z-0"
        style={{
          backgroundImage: `url(${bannerBg || "/placeholder-ship.jpg"})`,
        }}
      >
        <div className="absolute inset-0 bg-black/60 z-0"></div>
      </div>

      {/* Main content */}
      <motion.div
        className="relative z-10 flex flex-col items-center justify-center h-full text-white text-center px-6" // প্যাডিং একটু বাড়ানো হয়েছে
        variants={containerVariants}
        initial="hidden"
        animate="visible"
      >
        <motion.p
          className="text-xs md:text-sm tracking-widest uppercase font-medium mb-4"
          variants={itemVariants}
        >
          WELCOME TO OUR COMMUNITY
        </motion.p>

        <motion.h1
          // মোবাইলের জন্য text-3xl বা text-4xl রাখা ভালো
          className="text-3xl sm:text-4xl md:text-6xl font-extrabold mb-6 max-w-4xl leading-[1.1]"
          variants={headlineVariants}
        >
          THE ULTIMATE <span className="text-red-600">CLUB EXPERIENCE</span>
        </motion.h1>

        <motion.p
          className="text-sm md:text-lg max-w-2xl mb-10 font-light text-gray-200"
          variants={itemVariants}
        >
          Join our club to explore events, connect with members, build skills,
          and enjoy a vibrant community where everyone grows together.
        </motion.p>

        <Link to={"all-club"} className="w-full sm:w-auto flex justify-center">
          <motion.button
            className="bg-pink-500 hover:bg-pink-600 text-white font-semibold px-8 py-3.5 rounded-lg transition-all duration-300 w-full sm:w-64"
            variants={buttonVariants}
            whileTap={{ scale: 0.95 }} // মোবাইলে ক্লিক করার সময় একটা ছোট ইফেক্ট
          >
            JOIN THE CLUB
          </motion.button>
        </Link>
      </motion.div>
    </div>
  );
};

export default Banner;
