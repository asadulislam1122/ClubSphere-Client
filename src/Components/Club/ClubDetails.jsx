// import React from "react";
// import { Link, useLoaderData } from "react-router-dom";

// const ClubDetails = () => {
//   const club = useLoaderData();

//   return (
//     <div className="max-w-3xl mx-auto p-6 bg-white shadow rounded-lg mt-10">
//       <img
//         src={club.bannerImage}
//         alt={club.clubName}
//         className="w-full h-60 object-cover rounded"
//       />
//       <h2 className="text-3xl font-bold mt-4">{club.clubName}</h2>
//       <p className="text-gray-600 mt-2">{club.description}</p>
//       <p className="mt-2">Category: {club.category}</p>
//       <p className="mt-2">Location: {club.location}</p>
//       <p className="mt-2">Membership Fee: ${club.membershipFee}</p>
//       <p className="mt-2">Status: {club.status}</p>

//       {/* ✅ Correct way */}
//       {/* <Link
//         to={`/dashboard/payment/${club._id}`}
//         className="btn btn-primary text-white btn-sm mt-4"
//       >
//         Join
//       </Link> */}
//       <button className="btn btn-primary">Join Event </button>
//     </div>
//   );
// };

// export default ClubDetails;

import React from "react";
import { useLoaderData, useNavigate } from "react-router-dom";

const ClubDetails = () => {
  const club = useLoaderData();
  const navigate = useNavigate();

  const handleJoinEvent = () => {
    // ক্লাব নেম অনুযায়ী সার্চ করার জন্য নেভিগেট করছি
    // আমরা কুয়েরি প্যারামিটার হিসেবে নাম পাঠাচ্ছি
    navigate(`/all-events?clubName=${encodeURIComponent(club.clubName)}`);
  };

  return (
    <div className="max-w-3xl mx-auto p-6 bg-white shadow rounded-lg mt-10">
      <img
        src={club.bannerImage}
        alt={club.clubName}
        className="w-full h-60 object-cover rounded"
      />
      <h2 className="text-3xl font-bold mt-4">{club.clubName}</h2>
      <p className="text-gray-600 mt-2">{club.description}</p>

      <div className="mt-4 border-t pt-4">
        <p>
          <strong>Category:</strong> {club.category}
        </p>
        <p>
          <strong>Location:</strong> {club.location}
        </p>
        <p>
          <strong>Membership Fee:</strong> ${club.membershipFee}
        </p>
      </div>

      <button onClick={handleJoinEvent} className="btn btn-primary mt-6 w-full">
        View Events of this Club
      </button>
    </div>
  );
};

export default ClubDetails;
