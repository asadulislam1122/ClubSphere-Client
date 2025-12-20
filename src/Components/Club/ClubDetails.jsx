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
    <div className="bg-gray-50 min-h-screen py-8 px-4 flex items-center justify-center">
      {/* Container with max-width and clean shadow */}
      <div className="max-w-5xl w-full bg-white rounded-[2rem] shadow-xl overflow-hidden">
        <div className="flex flex-col md:flex-row">
          {/* Left Side: Image with Reduced Height/Width */}
          <div className="md:w-[40%] h-60 md:h-auto relative overflow-hidden">
            <img
              src={club.bannerImage}
              alt={club.clubName}
              className="absolute inset-0 w-full h-full object-cover transition-transform duration-500 hover:scale-105"
            />
            <div className="absolute top-4 left-4">
              <span className="bg-white/80 backdrop-blur-sm text-blue-600 px-3 py-1 rounded-full text-[10px] font-bold uppercase tracking-wider shadow-sm">
                Premium Club
              </span>
            </div>
          </div>

          {/* Right Side: Compact Details */}
          <div className="md:w-[60%] p-6 md:p-10 flex flex-col justify-center">
            <div className="flex items-center gap-2 text-blue-500 font-bold text-[10px] mb-2 uppercase tracking-tighter">
              <FaInfoCircle /> Overview
            </div>

            <h2 className="text-3xl font-extrabold text-slate-800 mb-4 leading-tight">
              {club.clubName}
            </h2>

            <p className="text-gray-500 text-sm leading-relaxed mb-6 line-clamp-3">
              {club.description}
            </p>

            {/* Stats Grid: More Compact */}
            <div className="grid grid-cols-2 gap-4 p-4 bg-slate-50 rounded-2xl mb-6">
              <div className="space-y-1">
                <span className="text-[9px] text-slate-400 uppercase font-bold">
                  Category
                </span>
                <div className="flex items-center gap-1.5 text-slate-700 font-bold text-xs italic">
                  <FaTag className="text-blue-500" /> {club.category}
                </div>
              </div>

              <div className="space-y-1">
                <span className="text-[9px] text-slate-400 uppercase font-bold">
                  Location
                </span>
                <div className="flex items-center gap-1.5 text-slate-700 font-bold text-xs">
                  <FaMapMarkerAlt className="text-red-400" /> {club.location}
                </div>
              </div>

              <div className="col-span-2 pt-3 border-t border-slate-200 flex justify-between items-center">
                <div>
                  <span className="text-[9px] text-slate-400 uppercase font-bold">
                    Membership Fee
                  </span>
                  <div className="text-lg font-black text-slate-900">
                    ${club.membershipFee}
                  </div>
                </div>
                <div className="text-right">
                  <span className="text-[9px] text-slate-400 uppercase font-bold">
                    Status
                  </span>
                  <div className="flex items-center gap-1.5 text-xs font-bold text-slate-700">
                    <span className="h-2 w-2 rounded-full bg-green-500 animate-pulse"></span>{" "}
                    {club.status || "Active"}
                  </div>
                </div>
              </div>
            </div>

            {/* Your Modern Button Style */}
            <button
              onClick={() =>
                navigate(
                  `/all-events?clubName=${encodeURIComponent(club.clubName)}`
                )
              }
              className="group relative flex items-center justify-between w-full bg-slate-900 hover:bg-blue-600 text-white p-4 rounded-xl transition-all duration-500 overflow-hidden shadow-lg shadow-slate-200"
            >
              <span className="font-bold text-sm z-10">
                View Events of this Club
              </span>
              <div className="bg-white/20 p-1.5 rounded-lg z-10">
                <FaArrowRight className="text-xs group-hover:translate-x-1 transition-transform" />
              </div>
              <div className="absolute top-0 right-0 w-16 h-16 bg-white/10 rounded-full -mr-8 -mt-8 transition-all duration-500 group-hover:scale-[7]" />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ClubDetails;
