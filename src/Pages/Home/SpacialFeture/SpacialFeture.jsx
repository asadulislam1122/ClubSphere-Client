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
    color: "from-blue-500 to-cyan-400",
  },
  {
    icon: <FaDatabase />,
    title: "Smart Data Handling",
    desc: "Secure and optimized MERN stack structure with clean automated club & event processing.",
    color: "from-emerald-500 to-teal-400",
  },
  {
    icon: <FaShieldAlt />,
    title: "Advanced Security",
    desc: "Role-based access, JWT protection, and encrypted environment variables ensure platform safety.",
    color: "from-red-500 to-orange-400",
  },
  {
    icon: <FaPalette />,
    title: "Modern UI/UX",
    desc: "Fully responsive, clean, and recruiter-friendly design using TailwindCSS & Framer Motion.",
    color: "from-purple-500 to-pink-400",
  },
  {
    icon: <FaUsersCog />,
    title: "Smart Role Control",
    desc: "Admins promote/demote managers with AI-assisted suggestions for best user handling.",
    color: "from-amber-500 to-yellow-400",
  },
  {
    icon: <FaSyncAlt />,
    title: "Auto Updates",
    desc: "Real-time updates using TanStack Query—no refresh needed.",
    color: "from-indigo-500 to-blue-400",
  },
  {
    icon: <FaBook />,
    title: "Detailed Docs",
    desc: "In-project documentation helps understand structure, features, and logic effortlessly.",
    color: "from-green-500 to-emerald-400",
  },
  {
    icon: <FaHandsHelping />,
    title: "Excellent Support",
    desc: "Reliable workflow, error-free logic, and structured clean code for long-term maintainability.",
    color: "from-rose-500 to-pink-400",
  },
];

const SpacialFeture = () => {
  return (
    <div className="py-24 px-6 relative overflow-hidden transition-colors duration-500">
      {/* Decorative Background Elements */}
      <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-emerald-500/5 blur-[120px] rounded-full -z-10" />
      <div className="absolute bottom-0 left-0 w-[500px] h-[500px] bg-blue-500/5 blur-[120px] rounded-full -z-10" />

      <div className="max-w-7xl mx-auto">
        <header className="text-center mb-20">
          <motion.span
            initial={{ opacity: 0, y: 10 }}
            whileInView={{ opacity: 1, y: 0 }}
            className="text-emerald-500 font-bold tracking-[0.3em] text-xs uppercase bg-emerald-500/10 px-4 py-2 rounded-full"
          >
            Special Features
          </motion.span>

          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            className="text-4xl md:text-6xl font-black text-slate-900 dark:text-white mt-6"
          >
            Capabilities That <br />
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-emerald-500 to-blue-600">
              Never Stop Evolving
            </span>
          </motion.h2>
        </header>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {features.map((item, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, scale: 0.9 }}
              whileInView={{ opacity: 1, scale: 1 }}
              whileHover={{ y: -8 }}
              transition={{ delay: i * 0.05, duration: 0.4 }}
              viewport={{ once: true }}
              className="group relative p-8 rounded-[2.5rem] bg-white dark:bg-slate-900/40 border border-slate-100 dark:border-white/5 hover:border-emerald-500/30 transition-all duration-500 shadow-xl shadow-slate-200/50 dark:shadow-none"
            >
              {/* Icon with Dynamic Gradient Background */}
              <div
                className={`w-14 h-14 rounded-2xl flex items-center justify-center text-2xl mb-6 bg-gradient-to-br ${item.color} text-white shadow-lg shadow-emerald-500/20 group-hover:rotate-[360deg] transition-transform duration-700`}
              >
                {item.icon}
              </div>

              <h4 className="text-xl font-bold text-slate-800 dark:text-slate-100 mb-3 group-hover:text-emerald-500 transition-colors">
                {item.title}
              </h4>

              <p className="text-slate-600 dark:text-slate-400 text-sm leading-relaxed">
                {item.desc}
              </p>

              {/* Decorative Corner Glow */}
              <div className="absolute -bottom-2 -right-2 w-20 h-20 bg-emerald-500/10 blur-2xl opacity-0 group-hover:opacity-100 transition-opacity" />
            </motion.div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default SpacialFeture;

// no used code below

// import { motion } from "framer-motion";
// import {
//   FaRobot,
//   FaDatabase,
//   FaShieldAlt,
//   FaPalette,
//   FaUsersCog,
//   FaSyncAlt,
//   FaBook,
//   FaHandsHelping,
// } from "react-icons/fa";

// const features = [
//   {
//     icon: <FaRobot />,
//     title: "AI-Powered Insights",
//     desc: "Automatically analyze club activity, events, and member data using AI-based insights.",
//   },
//   {
//     icon: <FaDatabase />,
//     title: "Smart Data Handling",
//     desc: "Secure and optimized MERN stack structure with clean automated club & event processing.",
//   },
//   {
//     icon: <FaShieldAlt />,
//     title: "Advanced Security",
//     desc: "Role-based access, JWT protection, and encrypted environment variables ensure platform safety.",
//   },
//   {
//     icon: <FaPalette />,
//     title: "Modern UI/UX",
//     desc: "Fully responsive, clean, and recruiter-friendly design using TailwindCSS & Framer Motion.",
//   },
//   {
//     icon: <FaUsersCog />,
//     title: "Smart Role Control",
//     desc: "Admins promote/demote managers with AI-assisted suggestions for best user handling.",
//   },
//   {
//     icon: <FaSyncAlt />,
//     title: "Auto Updates",
//     desc: "Real-time updates using TanStack Query—no refresh needed.",
//   },
//   {
//     icon: <FaBook />,
//     title: "Detailed Docs",
//     desc: "In-project documentation helps understand structure, features, and logic effortlessly.",
//   },
//   {
//     icon: <FaHandsHelping />,
//     title: "Excellent Support",
//     desc: "Reliable workflow, error-free logic, and structured clean code for long-term maintainability.",
//   },
// ];

// const SpacialFeture = () => {
//   return (
//     <div className="py-16 bg-gray-50">
//       <motion.h2
//         initial={{ opacity: 0, y: -20 }}
//         whileInView={{ opacity: 1, y: 0 }}
//         transition={{ duration: 0.6 }}
//         viewport={{ once: true }}
//         className="text-center text-sm font-semibold tracking-widest text-gray-500"
//       >
//         SPECIAL FEATURES
//       </motion.h2>

//       <motion.h3
//         initial={{ opacity: 0, y: -10 }}
//         whileInView={{ opacity: 1, y: 0 }}
//         transition={{ duration: 0.7 }}
//         viewport={{ once: true }}
//         className="text-center text-4xl md:text-5xl font-extrabold text-gray-800 mt-2"
//       >
//         FEATURES NEVER STOP
//       </motion.h3>

//       <div className="mt-14 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-3 gap-10 px-6 lg:px-20">
//         {features.map((item, i) => (
//           <motion.div
//             key={i}
//             initial={{ opacity: 0, y: 30 }}
//             whileInView={{ opacity: 1, y: 0 }}
//             transition={{ delay: i * 0.05, duration: 0.5 }}
//             viewport={{ once: true }}
//             whileHover={{ scale: 1.05, translateY: -6 }}
//             className="bg-white p-7 rounded-xl shadow-md hover:shadow-xl transition cursor-pointer group"
//           >
//             <div className="text-4xl text-green-600 mb-4 group-hover:rotate-6 transition">
//               {item.icon}
//             </div>

//             <h4 className="text-lg font-bold text-gray-800">{item.title}</h4>
//             <p className="text-gray-600 mt-2 text-sm leading-relaxed">
//               {item.desc}
//             </p>
//           </motion.div>
//         ))}
//       </div>
//     </div>
//   );
// };

// export default SpacialFeture;
