import { useQuery } from "@tanstack/react-query";
import React from "react";
import {
  FaUserAlt,
  FaMapMarkerAlt,
  FaMoneyBillAlt,
  FaStar,
} from "react-icons/fa";
import useAuth from "../../Hooks/useAuth";
import useAxiosSecure from "../../Hooks/useAxiosSecure";
import { Link } from "react-router";

const MyClub = () => {
  const { user } = useAuth();
  const axiosSecure = useAxiosSecure();

  const { data: clubs = [], isLoading } = useQuery({
    queryKey: ["myClubs", user?.email],
    queryFn: async () => {
      if (!user?.email) return [];
      const res = await axiosSecure.get(`/club?email=${user.email}`);
      return res.data;
    },
  });

  if (isLoading) {
    return <p className="text-center mt-10">Loading your clubs...</p>;
  }

  return (
    <div className="p-6">
      <h2 className="text-3xl font-bold mb-6 text-center text-blue-600">
        My Clubs ({clubs.length})
      </h2>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
        {clubs.map((club) => (
          <div
            key={club._id}
            className="bg-white shadow-lg rounded-xl overflow-hidden transform hover:scale-105 transition duration-300"
          >
            {/* Banner Image */}
            <img
              src={club.bannerImage}
              alt={club.clubName}
              className="w-[400px] h-[200px] object-cover rounded-t-lg"
            />

            {/* Card Body */}
            <div className="p-4 space-y-2">
              {/* Club Name */}
              <h3 className="text-xl font-bold text-gray-800">
                {club.clubName}
              </h3>

              {/* Category */}
              <p className="text-sm text-gray-500 flex items-center gap-2">
                <FaStar className="text-yellow-400" /> {club.category}
              </p>

              {/* Description */}
              <p className="text-gray-600 text-sm line-clamp-2">
                {club.description}
              </p>

              {/* Info Row */}
              <div className="flex justify-between items-center mt-2 text-gray-600 text-sm">
                <span className="flex items-center gap-1">
                  <FaUserAlt /> {club.email.split("@")[0]}
                </span>
                <span className="flex items-center gap-1">
                  <FaMapMarkerAlt /> {club.location}
                </span>
              </div>

              <div className="flex justify-between items-center mt-1 text-gray-600 text-sm">
                <span className="flex items-center gap-1">
                  <FaMoneyBillAlt /> ${club.membershipFee}
                </span>
                {/* <span className="flex items-center gap-1">
                  <FaStar /> {club.status}
                </span> */}
                <button
                  className={` font-semibold text-black ${
                    club.status === "paid" ? "text-green-600" : "text-red-600"
                  }`}
                >
                  {club.status === "paid" ? "Paid" : "Unpaid"}
                </button>
              </div>
              <div className="flex justify-end mt-4">
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

export default MyClub;

// import { useQuery } from "@tanstack/react-query";
// import React from "react";
// import useAuth from "../../Hooks/useAuth";
// import useAxiosSecure from "../../Hooks/useAxiosSecure";

// const MyClub = () => {
//   const { user } = useAuth();
//   const axiosSecure = useAxiosSecure();
//   const { data: club = [] } = useQuery({
//     queryKey: ["myClubs", user?.email],
//     queryFn: async () => {
//       const res = await axiosSecure.get(`/club?email=${user.email}`);
//       return res.data;
//     },
//   });
//   console.log(club);
//   return (
//     <div>
//       <h2>This is Club {club.length}</h2>
//     </div>
//   );
// };

// export default MyClub;
