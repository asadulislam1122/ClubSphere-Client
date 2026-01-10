import { useQuery } from "@tanstack/react-query";
import React from "react";
import useAxiosSecure from "../../Hooks/useAxiosSecure";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import {
  FaMapMarkerAlt,
  FaDollarSign,
  FaArrowRight,
  FaShapes,
  FaCrown,
} from "react-icons/fa";

const HomeClub = () => {
  const axiosSecure = useAxiosSecure();

  const { data: clubs = [], isLoading } = useQuery({
    queryKey: ["clubs", 8],
    queryFn: async () => {
      const res = await axiosSecure.get("/club?limit=8");
      return res.data;
    },
  });

  if (isLoading)
    return (
      <div className="flex justify-center items-center h-64">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-emerald-500"></div>
      </div>
    );

  return (
    <div className="py-12 px-4 transition-colors duration-500">
      {/* Section Header */}
      <div className="max-w-[1400px] mx-auto mb-16 flex flex-col md:flex-row md:items-end justify-between gap-6">
        <motion.div
          initial={{ opacity: 0, x: -30 }}
          whileInView={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.6 }}
        >
          <div className="flex items-center gap-2 mb-3">
            <span className="h-[2px] w-10 bg-emerald-500 rounded-full"></span>
            <span className="text-emerald-600 dark:text-emerald-400 font-bold tracking-widest uppercase text-xs">
              Premium Community
            </span>
          </div>
          <h2 className="text-4xl md:text-5xl font-black text-slate-900 dark:text-white leading-tight">
            Explore Our <br />
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-emerald-600 to-green-400">
              Top Tier Clubs
            </span>
          </h2>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, x: 30 }}
          whileInView={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.6 }}
        >
          <Link
            to="/all-clubs"
            className="group flex items-center gap-3 text-slate-600 dark:text-slate-400 font-bold hover:text-emerald-600 dark:hover:text-emerald-400 transition-all text-lg"
          >
            View Full Directory
            <div className="p-2 rounded-full bg-emerald-100 dark:bg-emerald-900/30 group-hover:translate-x-2 transition-transform">
              <FaArrowRight className="text-sm text-emerald-600" />
            </div>
          </Link>
        </motion.div>
      </div>

      {/* Modern Grid */}
      <div className="max-w-[1400px] mx-auto grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8">
        {clubs.map((club, index) => (
          <motion.div
            key={club._id}
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: index * 0.1 }}
            viewport={{ once: true }}
            className="group relative bg-white dark:bg-slate-900/50 backdrop-blur-sm rounded-[2.5rem] p-4 shadow-xl shadow-slate-200/50 dark:shadow-none border border-slate-100 dark:border-white/5 hover:border-emerald-500/30 transition-all duration-500"
          >
            {/* Image Container */}
            <div className="relative h-56 w-full overflow-hidden rounded-[2rem] z-0">
              <img
                src={club.bannerImage}
                alt={club.clubName}
                className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-1000"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />

              {/* Floating Badge */}
              <div className="absolute top-4 left-4 flex items-center gap-1.5 bg-white/90 dark:bg-slate-900/90 backdrop-blur-md px-4 py-1.5 rounded-full shadow-lg">
                <FaCrown className="text-amber-500 text-[10px]" />
                <span className="text-[10px] text-slate-800 dark:text-white font-bold uppercase tracking-wider">
                  {club.category || "Exclusive"}
                </span>
              </div>
            </div>

            {/* Content Section */}
            <div className="px-2 pt-6 pb-2">
              <h3 className="text-xl font-extrabold text-slate-800 dark:text-slate-100 line-clamp-1 group-hover:text-emerald-600 transition-colors">
                {club.clubName}
              </h3>

              <div className="flex items-center justify-between mt-5 bg-slate-50 dark:bg-white/5 p-4 rounded-[1.5rem] border border-slate-100 dark:border-white/5">
                <div className="flex flex-col">
                  <span className="text-[10px] uppercase font-bold text-slate-400">
                    Location
                  </span>
                  <div className="text-xs font-bold text-slate-600 dark:text-slate-300 flex items-center gap-1.5 mt-0.5">
                    <FaMapMarkerAlt className="text-emerald-500" />{" "}
                    {club.location}
                  </div>
                </div>
                <div className="flex flex-col items-end">
                  <span className="text-[10px] uppercase font-bold text-slate-400">
                    Starting
                  </span>
                  <div className="text-base font-black text-slate-900 dark:text-white flex items-center">
                    <FaDollarSign className="text-emerald-500 text-xs" />
                    {club.membershipFee}
                  </div>
                </div>
              </div>

              <Link
                to={`/club/${club._id}`}
                className="mt-6 flex items-center justify-center gap-3 w-full bg-slate-900 dark:bg-emerald-600 dark:hover:bg-emerald-500 text-white py-4 rounded-2xl hover:bg-emerald-600 transition-all duration-300 text-sm font-bold shadow-lg shadow-slate-200 dark:shadow-emerald-900/20"
              >
                Join the Club{" "}
                <FaArrowRight className="text-xs group-hover:translate-x-1 transition-transform" />
              </Link>
            </div>
          </motion.div>
        ))}
      </div>

      {/* Discover More Button */}
      <motion.div
        className="mt-20 text-center"
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
      >
        <Link
          to="/all-club"
          className="relative inline-flex items-center gap-3 px-10 py-5 overflow-hidden font-bold text-slate-700 dark:text-white transition-all bg-white dark:bg-white/5 rounded-full hover:bg-emerald-600 group border border-pink-200 dark:border-white/10"
        >
          <span className="absolute w-0 h-0 transition-all duration-500 ease-out bg-emerald-500 rounded-full group-hover:w-full group-hover:h-56 opacity-10"></span>
          <span className="relative flex items-center gap-2">
            Browse All Active Communities{" "}
            <FaShapes className="text-emerald-500 group-hover:rotate-12 transition-transform" />
          </span>
        </Link>
      </motion.div>
    </div>
  );
};

export default HomeClub;

// no use

// import { useQuery } from "@tanstack/react-query";
// import React from "react";
// import useAxiosSecure from "../../Hooks/useAxiosSecure";
// import { Link } from "react-router-dom";
// import {
//   FaMapMarkerAlt,
//   FaDollarSign,
//   FaArrowRight,
//   FaShapes,
// } from "react-icons/fa";

// const HomeClub = () => {
//   const axiosSecure = useAxiosSecure();

//   const { data: clubs = [], isLoading } = useQuery({
//     queryKey: ["clubs", 8],
//     queryFn: async () => {
//       const res = await axiosSecure.get("/club?limit=8");
//       return res.data;
//     },
//   });

//   if (isLoading)
//     return (
//       <div className="text-center py-20 animate-pulse text-xl">
//         Loading Featured Clubs...
//       </div>
//     );

//   return (
//     <div className="bg-[#f8fafc] py-16 px-4 md:px-10">
//       {/* Section Header */}
//       <div className="max-w-[1400px] mx-auto mb-12 flex flex-col md:flex-row md:items-end justify-between gap-4">
//         <div>
//           <span className="text-blue-600 font-bold tracking-widest uppercase text-xs bg-blue-50 px-3 py-1 rounded-full">
//             Featured
//           </span>
//           <h2 className="text-4xl font-black text-slate-900 mt-2">
//             Explore Our <span className="text-blue-600">Top Clubs</span>
//           </h2>
//         </div>
//         <Link
//           to="/all-clubs"
//           className="text-blue-600 font-bold flex items-center gap-2 hover:underline"
//         >
//           View All Community <FaArrowRight className="text-sm" />
//         </Link>
//       </div>

//       {/* 4-Column Grid for Home */}
//       <div className="max-w-[1400px] mx-auto grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8">
//         {clubs.map((club) => (
//           <div
//             key={club._id}
//             className="group bg-white rounded-[2rem] p-3 shadow-sm hover:shadow-xl transition-all duration-500 border border-slate-100"
//           >
//             {/* Image Section */}
//             <div className="relative h-44 w-full overflow-hidden rounded-[1.5rem]">
//               <img
//                 src={club.bannerImage}
//                 alt=""
//                 className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700"
//               />
//               <div className="absolute top-3 left-3 bg-white/20 backdrop-blur-md px-3 py-1 rounded-lg text-[10px] text-white font-bold uppercase">
//                 {club.category}
//               </div>
//             </div>

//             {/* Content Section */}
//             <div className="p-3">
//               <h3 className="text-lg font-bold text-slate-800 line-clamp-1 mt-2">
//                 {club.clubName}
//               </h3>

//               <div className="flex items-center justify-between mt-4 bg-slate-50 p-3 rounded-2xl">
//                 <div className="text-xs font-bold text-slate-600 flex items-center gap-1">
//                   <FaMapMarkerAlt className="text-blue-500" /> {club.location}
//                 </div>
//                 <div className="text-sm font-black text-slate-900 flex items-center gap-1">
//                   <FaDollarSign className="text-emerald-500" />{" "}
//                   {club.membershipFee}
//                 </div>
//               </div>

//               <Link
//                 to={`/club/${club._id}`}
//                 className="mt-4 flex items-center justify-center gap-2 w-full bg-slate-900 text-white py-3 rounded-xl hover:bg-blue-600 transition-colors text-sm font-bold"
//               >
//                 Join Now <FaArrowRight className="text-xs" />
//               </Link>
//             </div>
//           </div>
//         ))}
//       </div>

//       {/* Bottom Center Button */}
//       <div className="mt-16 text-center">
//         <Link
//           to="/all-club"
//           className="inline-flex items-center gap-3 bg-white border-2 border-slate-200 px-8 py-4 rounded-full font-bold text-slate-700 hover:border-blue-600 hover:text-blue-600 transition-all shadow-sm"
//         >
//           Browse All {clubs.length >= 8 ? "Available" : ""} Clubs{" "}
//           <FaShapes className="text-blue-500" />
//         </Link>
//       </div>
//     </div>
//   );
// };

// export default HomeClub;
