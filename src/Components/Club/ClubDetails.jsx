// import React from "react";
// import { useLoaderData, useNavigate } from "react-router-dom";
// import {
//   FaMapMarkerAlt,
//   FaTag,
//   FaArrowRight,
//   FaInfoCircle,
// } from "react-icons/fa";

// const ClubDetails = () => {
//   const club = useLoaderData();
//   const navigate = useNavigate();

//   return (
//     <div className="bg-gray-50 min-h-screen py-8 px-4 flex items-center justify-center">
//       {/* Container with max-width and clean shadow */}
//       <div className="max-w-5xl w-full bg-white rounded-[2rem] shadow-xl overflow-hidden">
//         <div className="flex flex-col md:flex-row">
//           {/* Left Side: Image with Reduced Height/Width */}
//           <div className="md:w-[40%] h-60 md:h-auto relative overflow-hidden">
//             <img
//               src={club.bannerImage}
//               alt={club.clubName}
//               className="absolute inset-0 w-full h-full object-cover transition-transform duration-500 hover:scale-105"
//             />
//             <div className="absolute top-4 left-4">
//               <span className="bg-white/80 backdrop-blur-sm text-blue-600 px-3 py-1 rounded-full text-[10px] font-bold uppercase tracking-wider shadow-sm">
//                 Premium Club
//               </span>
//             </div>
//           </div>

//           {/* Right Side: Compact Details */}
//           <div className="md:w-[60%] p-6 md:p-10 flex flex-col justify-center">
//             <div className="flex items-center gap-2 text-blue-500 font-bold text-[10px] mb-2 uppercase tracking-tighter">
//               <FaInfoCircle /> Overview
//             </div>

//             <h2 className="text-3xl font-extrabold text-slate-800 mb-4 leading-tight">
//               {club.clubName}
//             </h2>

//             <p className="text-gray-500 text-sm leading-relaxed mb-6 line-clamp-3">
//               {club.description}
//             </p>

//             {/* Stats Grid: More Compact */}
//             <div className="grid grid-cols-2 gap-4 p-4 bg-slate-50 rounded-2xl mb-6">
//               <div className="space-y-1">
//                 <span className="text-[9px] text-slate-400 uppercase font-bold">
//                   Category
//                 </span>
//                 <div className="flex items-center gap-1.5 text-slate-700 font-bold text-xs italic">
//                   <FaTag className="text-blue-500" /> {club.category}
//                 </div>
//               </div>

//               <div className="space-y-1">
//                 <span className="text-[9px] text-slate-400 uppercase font-bold">
//                   Location
//                 </span>
//                 <div className="flex items-center gap-1.5 text-slate-700 font-bold text-xs">
//                   <FaMapMarkerAlt className="text-red-400" /> {club.location}
//                 </div>
//               </div>

//               <div className="col-span-2 pt-3 border-t border-slate-200 flex justify-between items-center">
//                 <div>
//                   <span className="text-[9px] text-slate-400 uppercase font-bold">
//                     Membership Fee
//                   </span>
//                   <div className="text-lg font-black text-slate-900">
//                     ${club.membershipFee}
//                   </div>
//                 </div>
//                 <div className="text-right">
//                   <span className="text-[9px] text-slate-400 uppercase font-bold">
//                     Status
//                   </span>
//                   <div className="flex items-center gap-1.5 text-xs font-bold text-slate-700">
//                     <span className="h-2 w-2 rounded-full bg-green-500 animate-pulse"></span>{" "}
//                     {club.status || "Active"}
//                   </div>
//                 </div>
//               </div>
//             </div>

//             {/* Your Modern Button Style */}
//             <button
//               onClick={() =>
//                 navigate(
//                   `/all-events?clubName=${encodeURIComponent(club.clubName)}`
//                 )
//               }
//               className="group relative flex items-center justify-between w-full bg-slate-900 hover:bg-blue-600 text-white p-4 rounded-xl transition-all duration-500 overflow-hidden shadow-lg shadow-slate-200"
//             >
//               <span className="font-bold text-sm z-10">
//                 View Events of this Club
//               </span>
//               <div className="bg-white/20 p-1.5 rounded-lg z-10">
//                 <FaArrowRight className="text-xs group-hover:translate-x-1 transition-transform" />
//               </div>
//               <div className="absolute top-0 right-0 w-16 h-16 bg-white/10 rounded-full -mr-8 -mt-8 transition-all duration-500 group-hover:scale-[7]" />
//             </button>
//           </div>
//         </div>
//       </div>
//     </div>
//   );
// };

// export default ClubDetails;

import React from "react";
import { useLoaderData, useNavigate } from "react-router-dom";
import {
  FaMapMarkerAlt,
  FaTag,
  FaArrowRight,
  FaInfoCircle,
} from "react-icons/fa";

const ClubDetails = () => {
  const club = useLoaderData();
  const navigate = useNavigate();

  return (
    // bg-base-200 ব্যবহার করা হয়েছে যাতে থিম অনুযায়ী ব্যাকগ্রাউন্ড চেঞ্জ হয়
    <div className="bg-base-200 min-h-screen py-8 px-4 flex items-center justify-center transition-colors duration-500">
      <title>{club.clubName} | Details</title>

      {/* Container: bg-base-100 ডার্ক মোডে কালো/গাঢ় এবং লাইট মোডে সাদা হবে */}
      <div className="max-w-5xl w-full bg-base-100 rounded-[2rem] shadow-2xl overflow-hidden border border-base-content/5">
        <div className="flex flex-col md:flex-row">
          {/* Left Side: Image Section */}
          <div className="md:w-[40%] h-64 md:h-auto relative overflow-hidden">
            <img
              src={club.bannerImage}
              alt={club.clubName}
              className="absolute inset-0 w-full h-full object-cover transition-transform duration-700 hover:scale-110"
            />
            <div className="absolute top-4 left-4">
              <span className="bg-primary/90 backdrop-blur-md text-primary-content px-4 py-1 rounded-full text-[10px] font-bold uppercase tracking-wider shadow-lg">
                Premium Club
              </span>
            </div>
            {/* Overlay for better blending */}
            <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent md:hidden" />
          </div>

          {/* Right Side: Content Details */}
          <div className="md:w-[60%] p-6 md:p-12 flex flex-col justify-center">
            <div className="flex items-center gap-2 text-primary font-bold text-[11px] mb-3 uppercase tracking-widest">
              <FaInfoCircle className="animate-pulse" /> Overview
            </div>

            <h2 className="text-3xl md:text-4xl font-black text-base-content mb-4 leading-tight">
              {club.clubName}
            </h2>

            <p className="text-base-content/70 text-sm leading-relaxed mb-8">
              {club.description}
            </p>

            {/* Stats Grid: Glassmorphism effect for Dark mode */}
            <div className="grid grid-cols-2 gap-6 p-6 bg-base-200/50 rounded-3xl mb-8 border border-base-content/5">
              <div className="space-y-1">
                <span className="text-[10px] text-base-content/40 uppercase font-black tracking-tighter">
                  Category
                </span>
                <div className="flex items-center gap-2 text-base-content font-bold text-sm italic">
                  <FaTag className="text-primary" /> {club.category}
                </div>
              </div>

              <div className="space-y-1">
                <span className="text-[10px] text-base-content/40 uppercase font-black tracking-tighter">
                  Location
                </span>
                <div className="flex items-center gap-2 text-base-content font-bold text-sm">
                  <FaMapMarkerAlt className="text-error" /> {club.location}
                </div>
              </div>

              <div className="col-span-2 pt-4 border-t border-base-content/10 flex justify-between items-center">
                <div>
                  <span className="text-[10px] text-base-content/40 uppercase font-black">
                    Membership Fee
                  </span>
                  <div className="text-2xl font-black text-base-content">
                    ${club.membershipFee}
                  </div>
                </div>
                <div className="text-right">
                  <span className="text-[10px] text-base-content/40 uppercase font-black">
                    Status
                  </span>
                  <div className="flex items-center justify-end gap-2 text-xs font-bold text-base-content">
                    <span className="h-2 w-2 rounded-full bg-success animate-ping"></span>
                    {club.status || "Active"}
                  </div>
                </div>
              </div>
            </div>

            {/* Your Modern Button Style: Updated for Dark mode */}
            <button
              onClick={() =>
                navigate(
                  `/all-events?clubName=${encodeURIComponent(club.clubName)}`
                )
              }
              className="group cursor-pointer relative flex items-center justify-between w-full bg-slate-900 dark:bg-primary hover:bg-blue-600 dark:hover:bg-primary-focus text-white p-5 rounded-2xl transition-all duration-500 overflow-hidden shadow-xl shadow-primary/10"
            >
              <span className="font-bold text-sm z-10 tracking-wide">
                View Events of this Club
              </span>
              <div className="bg-white/20 p-2 rounded-xl z-10">
                <FaArrowRight className="text-xs group-hover:translate-x-2 transition-transform duration-300" />
              </div>

              {/* Circle Animation */}
              <div className="absolute top-0 right-0 w-16 h-16 bg-white/10 rounded-full -mr-8 -mt-8 transition-all duration-700 group-hover:scale-[10] ease-in-out" />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ClubDetails;
