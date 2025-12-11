import React from "react";
import { motion } from "framer-motion";
import { Link } from "react-router";

const NewsLetter = () => {
  return (
    <section
      className="relative bg-cover bg-center bg-no-repeat py-12 sm:py-16 px-4 sm:px-6 lg:px-8 rounded-2xl overflow-hidden mb-10 mx-3 sm:mx-6"
      style={{
        backgroundImage:
          "url('https://i.ibb.co.com/sJ1JzrHG/pngtree-illustrated-3d-envelope-wings-in-flight-a-symbol-of-incoming-mail-image-3647926.jpg')",
      }}
    >
      <div className="absolute inset-0 bg-black/60 rounded-2xl"></div>

      <motion.div
        className="relative z-10 text-center text-white max-w-3xl mx-auto flex flex-col items-center px-2"
        initial={{ opacity: 0, y: 40 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8, ease: "easeOut" }}
      >
        <motion.h2
          className="text-2xl sm:text-3xl md:text-5xl font-extrabold mb-4 leading-tight"
          initial={{ scale: 0.9 }}
          whileInView={{ scale: 1 }}
          transition={{ duration: 0.5 }}
        >
          Master Import & <span className="text-red-600">Export in React</span>
        </motion.h2>

        <motion.p
          className="text-base sm:text-lg text-white/90 mb-8 max-w-2xl px-2"
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          transition={{ delay: 0.2, duration: 0.8 }}
        >
          Learn how to structure, organize, and optimize your React components
          using clean import and export patterns. Understand named exports,
          default exports, and modular design for scalable front-end
          development.
        </motion.p>

        <motion.form
          className="flex flex-col sm:flex-row gap-3 justify-center w-full max-w-md mx-auto"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4, duration: 0.8 }}
        >
          <input
            type="email"
            placeholder="Enter your email"
            className="p-3 sm:p-4 rounded-lg text-white border border-white/30 w-full sm:flex-1 bg-transparent placeholder-white/70 focus:outline-none focus:ring-2 focus:ring-pink-400"
          />
          <button
            type="submit"
            className="bg-pink-500 hover:bg-pink-600 text-white font-semibold px-6 py-3 sm:py-4 rounded-lg transition w-full sm:w-auto"
          >
            Learn More About Imports
          </button>
        </motion.form>

        {/* About Button */}
        <Link>
          <motion.button
            className="mt-6 bg-white text-pink-600 font-bold px-8 py-3 rounded-xl hover:bg-gray-100 shadow-md transition"
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            About
          </motion.button>
        </Link>
      </motion.div>
    </section>
  );
};

export default NewsLetter;
