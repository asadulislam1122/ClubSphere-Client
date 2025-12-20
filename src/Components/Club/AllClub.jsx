import React from "react";
import { Link, useLoaderData } from "react-router-dom";
import {
  FaMapMarkerAlt,
  FaDollarSign,
  FaArrowRight,
  FaShapes,
} from "react-icons/fa";

const AllClub = () => {
  const clubs = useLoaderData();

  return (
    <div className="bg-[#f8fafc] min-h-screen p-4 md:p-10">
      {/* Header with Glass Effect */}
      <div className="max-w-[1400px] mx-auto mb-16 text-center">
        <span className="text-blue-600 font-bold tracking-widest uppercase text-sm bg-blue-50 px-4 py-2 rounded-full">
          Our Community
        </span>
        <h2 className="text-5xl font-black text-slate-900 mt-4 mb-4">
          Join a{" "}
          <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-600 to-indigo-500">
            Club
          </span>
        </h2>
        <p className="text-slate-500 max-w-xl mx-auto">
          Choose from{" "}
          <span className="text-blue-600 font-semibold">({clubs.length})</span>{" "}
          premium clubs. Designed for enthusiasts, built for professionals.
        </p>
      </div>

      {/* Modern 4-Column Grid */}
      <div className="max-w-[1400px] mx-auto grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8">
        {clubs.map((club) => (
          <div
            key={club._id}
            className="group relative bg-white rounded-[2rem] p-3 transition-all duration-500 hover:-translate-y-2 hover:shadow-[0_20px_50px_rgba(0,0,0,0.1)]"
          >
            {/* Unique Floating Image */}
            <div className="relative h-48 w-full overflow-hidden rounded-[1.5rem] z-10 shadow-md">
              <img
                src={club.bannerImage}
                alt={club.clubName}
                className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/40 to-transparent" />
              <div className="absolute bottom-3 left-3 flex items-center gap-2">
                <span className="bg-white/20 backdrop-blur-md text-white text-[10px] px-3 py-1 rounded-lg font-semibold uppercase">
                  {club.category}
                </span>
              </div>
            </div>

            {/* Body Content */}
            <div className="px-3 pt-5 pb-2">
              <h3 className="text-xl font-extrabold text-slate-800 leading-tight min-h-[56px]">
                {club.clubName}
              </h3>

              <p className="text-slate-700 text-xs mt-2 line-clamp-3 font-medium">
                {club.description}
              </p>

              {/* Unique Info Pills */}
              <div className="flex items-center justify-between mt-6 bg-slate-50 rounded-2xl p-3">
                <div className="flex flex-col">
                  <span className="text-[10px] text-slate-400 uppercase font-bold">
                    Location
                  </span>
                  <div className="flex items-center gap-1 text-slate-700 font-bold text-xs">
                    <FaMapMarkerAlt className="text-blue-500" /> {club.location}
                  </div>
                </div>
                <div className="h-8 w-[1px] bg-slate-200"></div>
                <div className="flex flex-col items-end">
                  <span className="text-[10px] text-slate-400 uppercase font-bold">
                    Fee
                  </span>
                  <div className="flex items-center gap-1 text-slate-900 font-black text-sm">
                    <FaDollarSign className="text-emerald-500 text-xs" />{" "}
                    {club.membershipFee}
                  </div>
                </div>
              </div>

              {/* Modern Action Button */}
              <Link
                to={`/club/${club._id}`}
                className="mt-4 flex items-center justify-between w-full bg-slate-900 group-hover:bg-blue-600 text-white p-4 rounded-2xl transition-all duration-300 overflow-hidden relative"
              >
                <span className="font-bold text-sm z-10">Details</span>
                <div className="bg-white/20 p-2 rounded-xl z-10">
                  <FaArrowRight className="text-xs group-hover:translate-x-1 transition-transform" />
                </div>
                {/* Subtle background circle animation */}
                <div className="absolute top-0 right-0 w-16 h-16 bg-white/10 rounded-full -mr-8 -mt-8 transition-all group-hover:scale-[5]" />
              </Link>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default AllClub;
