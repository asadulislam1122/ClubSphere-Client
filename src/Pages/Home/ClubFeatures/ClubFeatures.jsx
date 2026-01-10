// import { FaCalendarAlt, FaEnvelope, FaGolfBall, FaClock } from "react-icons/fa";
import { motion } from "framer-motion";
import { FaCalendarAlt, FaClock, FaEnvelope, FaGolfBall } from "react-icons/fa";

const ClubFeatures = () => {
  const features = [
    {
      icon: <FaCalendarAlt />,
      title: "Schedule an Event",
      description: "We'll make it memorable.",
      color: "from-blue-500 to-cyan-400",
    },
    {
      icon: <FaEnvelope />,
      title: "Stay in Touch",
      description: "Receive special announcements & offers.",
      color: "from-emerald-500 to-green-400",
    },
    {
      icon: <FaGolfBall />,
      title: "Schedule a Tournament",
      description: "We host amazing golf tournaments.",
      color: "from-orange-500 to-amber-400",
    },
    {
      icon: <FaClock />,
      title: "Book a Tee Time",
      description: "It only takes a minute.",
      color: "from-purple-500 to-pink-400",
    },
  ];

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 py-12">
      {features.map((feature, index) => (
        <motion.div
          key={index}
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          whileHover={{ y: -10 }} // Hover করলে সামান্য উপরে উঠবে
          transition={{ duration: 0.5, delay: index * 0.1 }}
          className="group relative p-8 rounded-3xl border border-slate-200 dark:border-white/10 bg-white dark:bg-white/5 backdrop-blur-md shadow-sm hover:shadow-2xl hover:shadow-emerald-500/10 transition-all duration-300"
        >
          {/* Background Gradient Blob on Hover */}
          <div className="absolute inset-0 bg-gradient-to-br from-emerald-500/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity rounded-3xl" />

          {/* Icon Container */}
          <div
            className={`inline-flex items-center justify-center w-14 h-14 rounded-2xl mb-6 text-2xl transition-transform duration-500 group-hover:rotate-[360deg] shadow-lg
            bg-emerald-50 dark:bg-emerald-500/10 text-emerald-600 dark:text-emerald-400 border border-emerald-100 dark:border-emerald-500/20`}
          >
            {feature.icon}
          </div>

          {/* Text Content */}
          <h3 className="text-xl font-bold text-slate-800 dark:text-white mb-3 group-hover:text-emerald-600 dark:group-hover:text-emerald-400 transition-colors">
            {feature.title}
          </h3>

          <p className="text-slate-600 dark:text-slate-400 text-sm leading-relaxed">
            {feature.description}
          </p>

          {/* Subtle Bottom Line Decor */}
          <div className="mt-6 w-10 h-1 bg-emerald-500/20 group-hover:w-full group-hover:bg-emerald-500 transition-all duration-500 rounded-full" />
        </motion.div>
      ))}
    </div>
  );
};

export default ClubFeatures;
