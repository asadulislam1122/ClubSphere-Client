import React, { useEffect, useRef } from "react";
import { FaCheck, FaCalendarAlt, FaClock } from "react-icons/fa";
import { motion, useInView } from "framer-motion";
import gsap from "gsap";

const ClubInfoSection = ({
  images = [
    "https://i.ibb.co.com/5h2qhYVx/istockphoto-476545960-612x612.jpg",
    "https://res.cloudinary.com/df0y57pzs/image/upload/v1768065883/dj-spinning-mixing-scratching-track-controls-dj-s-deck-strobe-dj-music-club-life-concept_kgk8ab.jpg",
    "https://res.cloudinary.com/df0y57pzs/image/upload/v1768066395/medium-shot-man-wearing-vr-glasses_rt4al2.jpg",
    "https://res.cloudinary.com/df0y57pzs/image/upload/v1768066107/epic-gaming-setup_wtlk41.jpg",
  ],
}) => {
  const containerRef = useRef(null);
  const imageRefs = useRef([]);

  // GSAP Parallax Effect on Mouse Move
  useEffect(() => {
    const handleMouseMove = (e) => {
      const { clientX, clientY } = e;
      const xPos = (clientX / window.innerWidth - 0.5) * 20;
      const yPos = (clientY / window.innerHeight - 0.5) * 20;

      gsap.to(imageRefs.current, {
        x: (i) => xPos * (i % 2 === 0 ? 1 : -1),
        y: (i) => yPos * (i < 2 ? 1 : -1),
        duration: 2,
        ease: "power2.out",
      });
    };

    window.addEventListener("mousemove", handleMouseMove);
    return () => window.removeEventListener("mousemove", handleMouseMove);
  }, []);

  return (
    <section
      ref={containerRef}
      className="relative min-h-screen flex items-center justify-center py-20 px-6 overflow-hidden bg-slate-50 dark:bg-slate-950 transition-colors duration-500"
    >
      {/* Background Decorative Elements */}
      <div className="absolute top-0 left-0 w-72 h-72 bg-green-400/20 blur-[120px] rounded-full" />
      <div className="absolute bottom-0 right-0 w-96 h-96 bg-emerald-600/10 blur-[150px] rounded-full" />

      <div className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-2 gap-16 items-center z-10">
        {/* Left: Animated Image Grid */}
        <div className="grid grid-cols-2 gap-4 relative">
          {images.map((img, index) => (
            <motion.div
              key={index}
              ref={(el) => (imageRefs.current[index] = el)}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8, delay: index * 0.2 }}
              className={`relative group overflow-hidden rounded-2xl aspect-square shadow-2xl border border-white/20 dark:border-white/5
                ${index === 1 ? "mt-8" : index === 2 ? "-mt-8" : ""}`}
            >
              <img
                src={img}
                alt="Club activity"
                className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
            </motion.div>
          ))}
        </div>

        {/* Right: Glassmorphism Content Card */}
        <motion.div
          initial={{ opacity: 0, x: 50 }}
          whileInView={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.8, ease: "easeOut" }}
          className="p-8 md:p-12 rounded-3xl border border-white/40 dark:border-white/10 bg-white/60 dark:bg-white/5 backdrop-blur-xl shadow-[0_8px_32px_0_rgba(31,38,135,0.07)]"
        >
          <motion.span
            className="inline-block px-4 py-1.5 mb-4 text-xs font-bold tracking-widest uppercase text-emerald-600 dark:text-emerald-400 bg-emerald-100 dark:bg-emerald-900/30 rounded-full"
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
          >
            New Era of Excellence
          </motion.span>

          <h2 className="text-4xl md:text-5xl font-extrabold text-slate-900 dark:text-white mb-4 leading-tight">
            New Day with <br />
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-emerald-600 to-green-400">
              New Goals
            </span>
          </h2>

          <p className="text-lg text-slate-600 dark:text-slate-300 mb-8 font-medium italic">
            at Sierra del Rio Golf Course
          </p>

          <div className="space-y-4 mb-10">
            {[
              "Course improvements & landscaping",
              "Professional level of customer service",
              "Vibrant energy at every level",
            ].map((text, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, x: -20 }}
                whileInView={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.5 + i * 0.1 }}
                className="flex items-center gap-4 text-slate-700 dark:text-slate-200"
              >
                <div className="flex-shrink-0 w-6 h-6 rounded-full bg-emerald-500/20 flex items-center justify-center">
                  <FaCheck className="text-emerald-500 text-xs" />
                </div>
                <span className="text-base font-medium">{text}</span>
              </motion.div>
            ))}
          </div>

          {/* Info Boxes */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 border-t border-slate-200 dark:border-white/10 pt-8">
            <div className="flex gap-3">
              <FaClock className="text-emerald-500 mt-1" />
              <div>
                <p className="text-xs uppercase tracking-wider text-slate-400 font-bold">
                  Hours
                </p>
                <p className="text-sm dark:text-white font-semibold">
                  11 AM – 9 PM
                </p>
              </div>
            </div>
            <div className="flex gap-3">
              <FaCalendarAlt className="text-emerald-500 mt-1" />
              <div>
                <p className="text-xs uppercase tracking-wider text-slate-400 font-bold">
                  Closed
                </p>
                <p className="text-sm dark:text-white font-semibold">
                  Every Tuesday
                </p>
              </div>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default ClubInfoSection;
