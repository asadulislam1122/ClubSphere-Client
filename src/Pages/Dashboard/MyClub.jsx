// import { useQuery } from "@tanstack/react-query";
// import React from "react";
// import {
//   FaUserAlt,
//   FaMapMarkerAlt,
//   FaMoneyBillAlt,
//   FaStar,
// } from "react-icons/fa";
// import useAuth from "../../Hooks/useAuth";
// import useAxiosSecure from "../../Hooks/useAxiosSecure";
// import { Link } from "react-router";

// const MyClub = () => {
//   const { user } = useAuth();
//   const axiosSecure = useAxiosSecure();

//   const { data: clubs = [], isLoading } = useQuery({
//     queryKey: ["myClubs", user?.email],
//     queryFn: async () => {
//       if (!user?.email) return [];
//       const res = await axiosSecure.get(`/club?email=${user.email}`);
//       return res.data;
//     },
//   });

//   if (isLoading) {
//     return <p className="text-center mt-10">Loading your clubs...</p>;
//   }

//   return (
//     <div className="p-6">
//       <h2 className="text-3xl font-bold mb-6 text-center text-blue-600">
//         My Clubs ({clubs.length})
//       </h2>

//       <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
//         {clubs.map((club) => (
//           <div
//             key={club._id}
//             className="bg-white shadow-lg rounded-xl overflow-hidden transform hover:scale-105 transition duration-300"
//           >
//             {/* Banner Image */}
//             <img
//               src={club.bannerImage}
//               alt={club.clubName}
//               className="w-[400px] h-[200px] object-cover rounded-t-lg"
//             />

//             {/* Card Body */}
//             <div className="p-4 space-y-2">
//               {/* Club Name */}
//               <h3 className="text-xl font-bold text-gray-800">
//                 {club.clubName}
//               </h3>

//               {/* Category */}
//               <p className="text-sm text-gray-500 flex items-center gap-2">
//                 <FaStar className="text-yellow-400" /> {club.category}
//               </p>

//               {/* Description */}
//               <p className="text-gray-600 text-sm line-clamp-2">
//                 {club.description}
//               </p>

//               {/* Info Row */}
//               <div className="flex justify-between items-center mt-2 text-gray-600 text-sm">
//                 <span className="flex items-center gap-1">
//                   <FaUserAlt /> {club.email.split("@")[0]}
//                 </span>
//                 <span className="flex items-center gap-1">
//                   <FaMapMarkerAlt /> {club.location}
//                 </span>
//               </div>

//               <div className="flex justify-between items-center mt-1 text-gray-600 text-sm">
//                 <span className="flex items-center gap-1">
//                   <FaMoneyBillAlt /> ${club.membershipFee}
//                 </span>
//                 {/* <span className="flex items-center gap-1">
//                   <FaStar /> {club.status}
//                 </span> */}
//                 <button
//                   className={` font-semibold text-black ${
//                     club.status === "paid" ? "text-green-600" : "text-red-600"
//                   }`}
//                 >
//                   {club.status === "paid" ? "Paid" : "Unpaid"}
//                 </button>
//               </div>
//               <div className="flex justify-end mt-4">
//                 <button className="btn btn-sm btn-secondary">
//                   <Link to={`/club/${club._id}`}>See Details</Link>
//                 </button>
//               </div>
//             </div>
//           </div>
//         ))}
//       </div>
//     </div>
//   );
// };

// export default MyClub;

// import { useQuery } from "@tanstack/react-query";
// import React from "react";
// import {
//   FaUserAlt,
//   FaMapMarkerAlt,
//   FaMoneyBillAlt,
//   FaStar,
//   FaEdit,
//   FaTrashAlt,
// } from "react-icons/fa";
// import useAuth from "../../Hooks/useAuth";
// import useAxiosSecure from "../../Hooks/useAxiosSecure";
// import { Link } from "react-router-dom"; // react-router-dom ব্যবহার করুন
// import Swal from "sweetalert2";

// const MyClub = () => {
//   const { user } = useAuth();
//   const axiosSecure = useAxiosSecure();

//   // ১. ডাটা ফেচিং এবং রিফেচ সেটআপ
//   const {
//     data: clubs = [],
//     isLoading,
//     refetch,
//   } = useQuery({
//     queryKey: ["myClubs", user?.email],
//     queryFn: async () => {
//       if (!user?.email) return [];
//       const res = await axiosSecure.get(`/club?email=${user.email}`);
//       return res.data;
//     },
//   });

//   // ২. ডিলিট হ্যান্ডলার ফাংশন
//   const handleDelete = (id) => {
//     Swal.fire({
//       title: "Are you sure?",
//       text: "You won't be able to revert this!",
//       icon: "warning",
//       showCancelButton: true,
//       confirmButtonColor: "#d33",
//       cancelButtonColor: "#3085d6",
//       confirmButtonText: "Yes, delete it!",
//     }).then(async (result) => {
//       if (result.isConfirmed) {
//         try {
//           const res = await axiosSecure.delete(`/club/${id}`);
//           if (res.data.deletedCount > 0) {
//             refetch(); // লিস্ট আপডেট করবে
//             Swal.fire("Deleted!", "Your club has been deleted.", "success");
//           }
//         } catch (error) {
//           Swal.fire("Error!", "Something went wrong.", "error");
//         }
//       }
//     });
//   };

//   if (isLoading) {
//     return (
//       <div className="flex justify-center items-center min-h-[400px]">
//         <span className="loading loading-spinner loading-lg text-primary"></span>
//       </div>
//     );
//   }

//   return (
//     <div className="p-6">
//       <h2 className="text-3xl font-bold mb-6 text-center text-blue-600">
//         My Managed Clubs ({clubs.length})
//       </h2>

//       <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
//         {clubs.map((club) => (
//           <div
//             key={club._id}
//             className="bg-white shadow-lg rounded-xl overflow-hidden flex flex-col border border-gray-100 hover:shadow-2xl transition duration-300"
//           >
//             {/* Banner Image */}
//             <div className="relative">
//               <img
//                 src={club.bannerImage}
//                 alt={club.clubName}
//                 className="w-full h-[180px] object-cover"
//               />
//               <div className="absolute top-2 right-2">
//                 <span
//                   className={`badge p-3 font-bold border-none ${
//                     club.status === "paid"
//                       ? "bg-green-100 text-green-700"
//                       : "bg-red-100 text-red-700"
//                   }`}
//                 >
//                   {club.status === "paid" ? "Paid" : "Unpaid"}
//                 </span>
//               </div>
//             </div>

//             {/* Card Body */}
//             <div className="p-4 flex-grow space-y-3">
//               <h3 className="text-xl font-bold text-gray-800 line-clamp-1">
//                 {club.clubName}
//               </h3>

//               <div className="flex items-center gap-2 text-sm text-gray-500">
//                 <FaStar className="text-yellow-400" />
//                 <span className="bg-gray-100 px-2 py-0.5 rounded">
//                   {club.category}
//                 </span>
//               </div>

//               <p className="text-gray-600 text-sm line-clamp-2 min-h-[40px]">
//                 {club.description}
//               </p>

//               <div className="grid grid-cols-2 gap-2 text-xs text-gray-500 pt-2 border-t">
//                 <span className="flex items-center gap-1">
//                   <FaUserAlt className="text-blue-400" />{" "}
//                   {user?.displayName || "Manager"}
//                 </span>
//                 <span className="flex items-center gap-1">
//                   <FaMapMarkerAlt className="text-red-400" /> {club.location}
//                 </span>
//                 <span className="flex items-center gap-1 font-bold text-gray-700">
//                   <FaMoneyBillAlt className="text-green-500 text-sm" /> $
//                   {club.membershipFee}
//                 </span>
//               </div>
//             </div>

//             {/* Actions Footer */}
//             <div className="p-4 bg-gray-50 border-t space-y-3">
//               <Link
//                 to={`/club/${club._id}`}
//                 className="btn btn-sm btn-outline btn-secondary w-full"
//               >
//                 See Public Details
//               </Link>

//               <div className="flex justify-between gap-2">
//                 <Link
//                   to={`/dashboard/edit-club/${club._id}`}
//                   className="btn btn-sm btn-info text-white flex-1 flex items-center gap-1"
//                 >
//                   <FaEdit /> Edit
//                 </Link>
//                 <button
//                   onClick={() => handleDelete(club._id)}
//                   className="btn btn-sm btn-error text-white flex-1 flex items-center gap-1"
//                 >
//                   <FaTrashAlt /> Delete
//                 </button>
//               </div>
//             </div>
//           </div>
//         ))}
//       </div>

//       {clubs.length === 0 && (
//         <div className="text-center mt-20">
//           <p className="text-xl text-gray-400">
//             You haven't created any clubs yet.
//           </p>
//           <Link to="/dashboard/add-club" className="btn btn-primary mt-4">
//             Create Your First Club
//           </Link>
//         </div>
//       )}
//     </div>
//   );
// };

// export default MyClub;

import { useQuery } from "@tanstack/react-query";
import React, { useState } from "react";
import {
  FaMapMarkerAlt,
  FaMoneyBillAlt,
  FaStar,
  FaEdit,
  FaTrashAlt,
  FaTags,
} from "react-icons/fa";
import useAuth from "../../Hooks/useAuth";
import useAxiosSecure from "../../Hooks/useAxiosSecure";
import Swal from "sweetalert2";
import { useForm } from "react-hook-form";

const MyClub = () => {
  const { user } = useAuth();
  const axiosSecure = useAxiosSecure();
  const [selectedClub, setSelectedClub] = useState(null);
  const { register, handleSubmit, reset } = useForm();

  const {
    data: clubs = [],
    isLoading,
    refetch,
  } = useQuery({
    queryKey: ["myClubs", user?.email],
    queryFn: async () => {
      if (!user?.email) return [];
      const res = await axiosSecure.get(`/club?email=${user.email}`);
      return res.data;
    },
  });

  const handleDelete = (id) => {
    Swal.fire({
      title: "Are you sure?",
      text: "This action cannot be undone!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#EF4444",
      cancelButtonColor: "#6B7280",
      confirmButtonText: "Yes, delete it!",
    }).then(async (result) => {
      if (result.isConfirmed) {
        const res = await axiosSecure.delete(`/club/${id}`);
        if (res.data.deletedCount > 0) {
          refetch();
          Swal.fire("Deleted!", "The club has been removed.", "success");
        }
      }
    });
  };

  const onEditSubmit = async (data) => {
    try {
      const res = await axiosSecure.patch(`/club/${selectedClub._id}`, data);
      if (res.data.modifiedCount > 0) {
        Swal.fire({
          icon: "success",
          title: "Updated!",
          showConfirmButton: false,
          timer: 1500,
        });
        refetch();
        document.getElementById("edit_modal").close();
      }
    } catch (error) {
      Swal.fire("Error", "Update failed", "error");
    }
  };

  if (isLoading)
    return (
      <div className="flex justify-center items-center h-64">
        <span className="loading loading-dots loading-lg text-blue-500"></span>
      </div>
    );

  return (
    <div className="p-6 bg-gray-50 min-h-screen">
      <header className="mb-10 text-center">
        <h2 className="text-4xl font-extrabold text-gray-800">
          My Managed Clubs
        </h2>
        <p className="text-gray-500 mt-2">
          Manage and update your photography clubs easily
        </p>
      </header>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-3 gap-8">
        {clubs.map((club) => (
          <div
            key={club._id}
            className="group bg-white rounded-2xl shadow-sm hover:shadow-xl transition-all duration-300 border border-gray-100 overflow-hidden flex flex-col"
          >
            {/* Image Section */}
            <div className="relative h-52 overflow-hidden">
              <img
                src={club.bannerImage}
                className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                alt={club.clubName}
              />
              <div className="absolute top-4 left-4">
                <span className="bg-white/90 backdrop-blur px-3 py-1 rounded-full text-xs font-bold text-blue-600 shadow-sm flex items-center gap-1">
                  <FaTags /> {club.category}
                </span>
              </div>
            </div>

            {/* Content Section */}
            <div className="p-5 flex-grow">
              <h3 className="text-xl font-bold text-gray-800 mb-2 line-clamp-1">
                {club.clubName}
              </h3>
              <p className="text-gray-500 text-sm line-clamp-2 mb-4 h-10">
                {club.description}
              </p>

              <div className="space-y-2 border-t pt-4">
                <div className="flex items-center text-gray-600 text-sm gap-3">
                  <FaMapMarkerAlt className="text-red-400" />
                  <span>{club.location}</span>
                </div>
                <div className="flex items-center text-gray-600 text-sm gap-3">
                  <FaMoneyBillAlt className="text-green-500 text-base" />
                  <span className="font-semibold text-gray-800">
                    ${club.membershipFee}{" "}
                    <span className="text-gray-400 font-normal">/ member</span>
                  </span>
                </div>
              </div>
            </div>

            {/* Action Buttons */}
            <div className="p-4 bg-gray-50/50 flex gap-3">
              <button
                onClick={() => {
                  setSelectedClub(club);
                  reset(); // ফর্মে আগের ডাটা রিসেট করার জন্য
                  document.getElementById("edit_modal").showModal();
                }}
                className="flex-1 flex items-center justify-center gap-2 bg-blue-50 text-blue-600 py-2.5 rounded-xl font-medium hover:bg-blue-600 hover:text-white transition-colors duration-200"
              >
                <FaEdit /> Edit
              </button>
              <button
                onClick={() => handleDelete(club._id)}
                className="flex-1 flex items-center justify-center gap-2 bg-red-50 text-red-500 py-2.5 rounded-xl font-medium hover:bg-red-500 hover:text-white transition-colors duration-200"
              >
                <FaTrashAlt /> Delete
              </button>
            </div>
          </div>
        ))}
      </div>

      {/* --- Elegant Edit Modal --- */}
      <dialog id="edit_modal" className="modal backdrop-blur-sm">
        <div className="modal-box max-w-2xl rounded-3xl p-8">
          <div className="flex justify-between items-center mb-6">
            <h3 className="text-2xl font-bold text-gray-800 flex items-center gap-2">
              <FaEdit className="text-blue-500" /> Update Club Info
            </h3>
            <button
              onClick={() => document.getElementById("edit_modal").close()}
              className="btn btn-sm btn-circle btn-ghost"
            >
              ✕
            </button>
          </div>

          {selectedClub && (
            <form onSubmit={handleSubmit(onEditSubmit)} className="space-y-5">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                <div className="form-control">
                  <label className="label text-gray-600 font-semibold">
                    Club Name
                  </label>
                  <input
                    {...register("clubName")}
                    defaultValue={selectedClub.clubName}
                    className="input input-bordered focus:ring-2 ring-blue-100 outline-none"
                    required
                  />
                </div>
                <div className="form-control">
                  <label className="label text-gray-600 font-semibold">
                    Category
                  </label>
                  <input
                    {...register("category")}
                    defaultValue={selectedClub.category}
                    className="input input-bordered focus:ring-2 ring-blue-100 outline-none"
                    required
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                <div className="form-control">
                  <label className="label text-gray-600 font-semibold">
                    Fee ($)
                  </label>
                  <input
                    type="number"
                    {...register("membershipFee")}
                    defaultValue={selectedClub.membershipFee}
                    className="input input-bordered focus:ring-2 ring-blue-100 outline-none"
                    required
                  />
                </div>
                <div className="form-control">
                  <label className="label text-gray-600 font-semibold">
                    Location
                  </label>
                  <input
                    {...register("location")}
                    defaultValue={selectedClub.location}
                    className="input input-bordered focus:ring-2 ring-blue-100 outline-none"
                    required
                  />
                </div>
              </div>

              <div className="form-control">
                <label className="label text-gray-600 font-semibold">
                  Image URL
                </label>
                <input
                  {...register("bannerImage")}
                  defaultValue={selectedClub.bannerImage}
                  className="input input-bordered focus:ring-2 ring-blue-100 outline-none"
                  required
                />
              </div>

              <div className="form-control">
                <label className="label text-gray-600 font-semibold">
                  Short Description
                </label>
                <textarea
                  {...register("description")}
                  defaultValue={selectedClub.description}
                  className="textarea textarea-bordered h-28 focus:ring-2 ring-blue-100 outline-none"
                  required
                ></textarea>
              </div>

              <div className="pt-4">
                <button
                  type="submit"
                  className="w-full bg-blue-600 text-white py-3 rounded-xl font-bold hover:bg-blue-700 shadow-lg shadow-blue-200 transition-all duration-300"
                >
                  Update Changes
                </button>
              </div>
            </form>
          )}
        </div>
      </dialog>
    </div>
  );
};

export default MyClub;
