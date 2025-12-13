import { motion } from "framer-motion";
import {
  FaRobot,
  FaDatabase,
  FaShieldAlt,
  FaPalette,
  FaUsersCog,
  FaSyncAlt,
  FaBook,
  FaHandsHelping,
} from "react-icons/fa";

const features = [
  {
    icon: <FaRobot />,
    title: "AI-Powered Insights",
    desc: "Automatically analyze club activity, events, and member data using AI-based insights.",
  },
  {
    icon: <FaDatabase />,
    title: "Smart Data Handling",
    desc: "Secure and optimized MERN stack structure with clean automated club & event processing.",
  },
  {
    icon: <FaShieldAlt />,
    title: "Advanced Security",
    desc: "Role-based access, JWT protection, and encrypted environment variables ensure platform safety.",
  },
  {
    icon: <FaPalette />,
    title: "Modern UI/UX",
    desc: "Fully responsive, clean, and recruiter-friendly design using TailwindCSS & Framer Motion.",
  },
  {
    icon: <FaUsersCog />,
    title: "Smart Role Control",
    desc: "Admins promote/demote managers with AI-assisted suggestions for best user handling.",
  },
  {
    icon: <FaSyncAlt />,
    title: "Auto Updates",
    desc: "Real-time updates using TanStack Query—no refresh needed.",
  },
  {
    icon: <FaBook />,
    title: "Detailed Docs",
    desc: "In-project documentation helps understand structure, features, and logic effortlessly.",
  },
  {
    icon: <FaHandsHelping />,
    title: "Excellent Support",
    desc: "Reliable workflow, error-free logic, and structured clean code for long-term maintainability.",
  },
];

const SpacialFeture = () => {
  return (
    <div className="py-16 bg-gray-50">
      <motion.h2
        initial={{ opacity: 0, y: -20 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        viewport={{ once: true }}
        className="text-center text-sm font-semibold tracking-widest text-gray-500"
      >
        SPECIAL FEATURES
      </motion.h2>

      <motion.h3
        initial={{ opacity: 0, y: -10 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.7 }}
        viewport={{ once: true }}
        className="text-center text-4xl md:text-5xl font-extrabold text-gray-800 mt-2"
      >
        FEATURES NEVER STOP
      </motion.h3>

      <div className="mt-14 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-10 px-6 lg:px-20">
        {features.map((item, i) => (
          <motion.div
            key={i}
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ delay: i * 0.05, duration: 0.5 }}
            viewport={{ once: true }}
            whileHover={{ scale: 1.05, translateY: -6 }}
            className="bg-white p-7 rounded-xl shadow-md hover:shadow-xl transition cursor-pointer group"
          >
            <div className="text-4xl text-green-600 mb-4 group-hover:rotate-6 transition">
              {item.icon}
            </div>

            <h4 className="text-lg font-bold text-gray-800">{item.title}</h4>
            <p className="text-gray-600 mt-2 text-sm leading-relaxed">
              {item.desc}
            </p>
          </motion.div>
        ))}
      </div>
    </div>
  );
};

export default SpacialFeture;
