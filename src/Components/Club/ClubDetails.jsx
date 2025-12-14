import React from "react";
import { useLoaderData } from "react-router-dom";

const ClubDetails = () => {
  const club = useLoaderData();

  return (
    <div className="max-w-3xl mx-auto p-6 bg-white shadow rounded-lg mt-10">
      <img
        src={club.bannerImage}
        alt={club.clubName}
        className="w-full h-60 object-cover rounded"
      />
      <h2 className="text-3xl font-bold mt-4">{club.clubName}</h2>
      <p className="text-gray-600 mt-2">{club.description}</p>
      <p className="mt-2">Category: {club.category}</p>
      <p className="mt-2">Location: {club.location}</p>
      <p className="mt-2">Membership Fee: ${club.membershipFee}</p>
      <p className="mt-2">Status: {club.status}</p>
    </div>
  );
};

export default ClubDetails;
