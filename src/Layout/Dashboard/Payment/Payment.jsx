// import React, { useEffect, useState } from "react";
// import { useParams } from "react-router-dom";
// import useAxiosSecure from "../../../Hooks/useAxiosSecure";
// import {
//   FaMoneyBillWave,
//   FaMapMarkerAlt,
//   FaTags,
//   FaCalendarAlt,
// } from "react-icons/fa";

// const Payment = () => {
//   const { clubId } = useParams();
//   const [club, setClub] = useState(null);
//   const [loading, setLoading] = useState(true);

//   const axiosSecure = useAxiosSecure();

//   useEffect(() => {
//     fetch(`https://clubshapare-server.vercel.app/club/${clubId}`)
//       .then((res) => res.json())
//       .then((data) => {
//         setClub(data);
//         setLoading(false);
//       });
//   }, [clubId]);

//   if (loading) {
//     return (
//       <p className="text-center mt-20 text-lg font-semibold">Loading...</p>
//     );
//   }

//   // Format date if exists
//   const createdAt = club.createdAt
//     ? new Date(club.createdAt).toLocaleDateString("en-US", {
//         year: "numeric",
//         month: "long",
//         day: "numeric",
//       })
//     : "N/A";

//   // Determine status
//   const statusColor =
//     club.status === "approved"
//       ? "bg-green-100 text-green-800"
//       : club.status === "pending"
//       ? "bg-yellow-100 text-yellow-800"
//       : "bg-red-100 text-red-800";

//   // payment
//   const handlePayment = async () => {
//     const paymentInfo = {
//       membershipFee: club.membershipFee,
//       clubId: club._id,
//       email: club.email,
//       clubName: club.clubName,
//     };
//     const res = await axiosSecure.post("/create-checkout-section", paymentInfo);
//     console.log(res.data);
//     window.location.href = res.data.url;
//   };
//   return (
//     <div className="max-w-5xl mx-auto mt-10 p-8 bg-white shadow-xl rounded-xl">
//       <h2 className="text-3xl font-bold mb-8 text-center">
//         Join Club & Payment
//       </h2>

//       {/* Flex layout: image left, text right */}
//       <div className="flex flex-col md:flex-row gap-8 items-start">
//         {/* Image */}
//         <div className="md:w-1/2">
//           <img
//             src={club.bannerImage}
//             alt={club.clubName}
//             className="w-full h-96 object-cover rounded-xl shadow-lg"
//           />
//         </div>

//         {/* Text & Info */}
//         <div className="md:w-1/2 flex flex-col justify-between h-full p-4  rounded-xl">
//           <div className="space-y-4">
//             <h3 className="text-2xl font-semibold">{club.clubName}</h3>

//             <p className="flex items-center gap-2 text-gray-700">
//               <FaTags className="text-blue-500" /> Category: {club.category}
//             </p>

//             <p className="flex items-center gap-2 text-gray-700">
//               <FaMapMarkerAlt className="text-red-500" /> Location:{" "}
//               {club.location}
//             </p>

//             <p className="flex items-center gap-2 text-gray-700">
//               <FaCalendarAlt className="text-purple-500" /> Created At:{" "}
//               {createdAt}
//             </p>

//             <p
//               className={`inline-block px-3 py-1 rounded-full text-sm font-medium ${statusColor}`}
//             >
//               Status: {club.status}
//             </p>

//             <p className="flex items-center gap-2 font-bold text-gray-800">
//               <FaMoneyBillWave className="text-green-500" /> Membership Fee: $
//               {club.membershipFee}
//             </p>
//           </div>

//           {/* Payment Button */}
//           <button
//             onClick={handlePayment}
//             className="btn p-2 btn-primary mt-5 text-xl"
//           >
//             Proceed to Payment
//           </button>
//         </div>
//       </div>
//     </div>
//   );
// };

// export default Payment;
