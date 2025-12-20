import { useQuery } from "@tanstack/react-query";
import React from "react";
import useAxiosSecure from "../../Hooks/useAxiosSecure";
import { Link } from "react-router-dom";
import {
  FaMapMarkerAlt,
  FaDollarSign,
  FaArrowRight,
  FaShapes,
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
      <div className="text-center py-20 animate-pulse text-xl">
        Loading Featured Clubs...
      </div>
    );

  return (
    <div className="bg-[#f8fafc] py-16 px-4 md:px-10">
      {/* Section Header */}
      <div className="max-w-[1400px] mx-auto mb-12 flex flex-col md:flex-row md:items-end justify-between gap-4">
        <div>
          <span className="text-blue-600 font-bold tracking-widest uppercase text-xs bg-blue-50 px-3 py-1 rounded-full">
            Featured
          </span>
          <h2 className="text-4xl font-black text-slate-900 mt-2">
            Explore Our <span className="text-blue-600">Top Clubs</span>
          </h2>
        </div>
        <Link
          to="/all-clubs"
          className="text-blue-600 font-bold flex items-center gap-2 hover:underline"
        >
          View All Community <FaArrowRight className="text-sm" />
        </Link>
      </div>

      {/* 4-Column Grid for Home */}
      <div className="max-w-[1400px] mx-auto grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8">
        {clubs.map((club) => (
          <div
            key={club._id}
            className="group bg-white rounded-[2rem] p-3 shadow-sm hover:shadow-xl transition-all duration-500 border border-slate-100"
          >
            {/* Image Section */}
            <div className="relative h-44 w-full overflow-hidden rounded-[1.5rem]">
              <img
                src={club.bannerImage}
                alt=""
                className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700"
              />
              <div className="absolute top-3 left-3 bg-white/20 backdrop-blur-md px-3 py-1 rounded-lg text-[10px] text-white font-bold uppercase">
                {club.category}
              </div>
            </div>

            {/* Content Section */}
            <div className="p-3">
              <h3 className="text-lg font-bold text-slate-800 line-clamp-1 mt-2">
                {club.clubName}
              </h3>

              <div className="flex items-center justify-between mt-4 bg-slate-50 p-3 rounded-2xl">
                <div className="text-xs font-bold text-slate-600 flex items-center gap-1">
                  <FaMapMarkerAlt className="text-blue-500" /> {club.location}
                </div>
                <div className="text-sm font-black text-slate-900 flex items-center gap-1">
                  <FaDollarSign className="text-emerald-500" />{" "}
                  {club.membershipFee}
                </div>
              </div>

              <Link
                to={`/club/${club._id}`}
                className="mt-4 flex items-center justify-center gap-2 w-full bg-slate-900 text-white py-3 rounded-xl hover:bg-blue-600 transition-colors text-sm font-bold"
              >
                Join Now <FaArrowRight className="text-xs" />
              </Link>
            </div>
          </div>
        ))}
      </div>

      {/* Bottom Center Button */}
      <div className="mt-16 text-center">
        <Link
          to="/all-club"
          className="inline-flex items-center gap-3 bg-white border-2 border-slate-200 px-8 py-4 rounded-full font-bold text-slate-700 hover:border-blue-600 hover:text-blue-600 transition-all shadow-sm"
        >
          Browse All {clubs.length >= 8 ? "Available" : ""} Clubs{" "}
          <FaShapes className="text-blue-500" />
        </Link>
      </div>
    </div>
  );
};

export default HomeClub;
