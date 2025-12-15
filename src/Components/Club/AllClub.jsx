import React from "react";
import { Link, useLoaderData } from "react-router-dom";
import { FaMapMarkerAlt, FaMoneyBillAlt, FaStar } from "react-icons/fa";

const AllClub = () => {
  const clubs = useLoaderData();

  return (
    <div className="p-6">
      <h2 className="text-3xl font-bold text-center text-blue-600 mb-6">
        All Clubs ({clubs.length})
      </h2>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
        {clubs.map((club) => (
          <div
            key={club._id}
            className="bg-white shadow-lg rounded-xl overflow-hidden transform hover:scale-105 transition duration-300"
          >
            <img
              src={club.bannerImage}
              alt={club.clubName}
              className="w-full h-40 object-cover"
            />

            <div className="p-4 space-y-2">
              <h3 className="text-xl font-bold text-gray-800">
                {club.clubName}
              </h3>
              <p className="text-sm text-gray-500 flex items-center gap-2">
                <FaStar className="text-yellow-400" /> {club.category}
              </p>
              <p className="text-gray-600 text-sm line-clamp-2">
                {club.description}
              </p>

              <div className="flex justify-between items-center mt-2 text-gray-600 text-sm">
                <span className="flex items-center gap-1">
                  <FaMapMarkerAlt /> {club.location}
                </span>
                <span className="flex items-center gap-1">
                  <FaMoneyBillAlt /> ${club.membershipFee}
                </span>
              </div>

              <div className="flex justify-between items-center content-center ">
                <div className="text-sm text-gray-500 mt-1">
                  <button
                    className={` font-semibold text-black ${
                      club.status === "paid" ? "text-green-600" : "text-red-600"
                    }`}
                  >
                    {club.status === "paid" ? "Paid" : "Unpaid"}
                  </button>
                </div>
                <button className="btn btn-sm btn-secondary">
                  <Link to={`/club/${club._id}`}>See Details</Link>
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default AllClub;
