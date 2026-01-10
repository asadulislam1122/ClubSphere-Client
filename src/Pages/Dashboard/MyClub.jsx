// import { useQuery } from "@tanstack/react-query";
// import React, { useState } from "react";
// import {
//   FaMapMarkerAlt,
//   FaMoneyBillAlt,
//   FaStar,
//   FaEdit,
//   FaTrashAlt,
//   FaTags,
// } from "react-icons/fa";
// import useAuth from "../../Hooks/useAuth";
// import useAxiosSecure from "../../Hooks/useAxiosSecure";
// import Swal from "sweetalert2";
// import { useForm } from "react-hook-form";

// const MyClub = () => {
//   const { user } = useAuth();
//   const axiosSecure = useAxiosSecure();
//   const [selectedClub, setSelectedClub] = useState(null);
//   const { register, handleSubmit, reset } = useForm();

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

//   const handleDelete = (id) => {
//     Swal.fire({
//       title: "Are you sure?",
//       text: "This action cannot be undone!",
//       icon: "warning",
//       showCancelButton: true,
//       confirmButtonColor: "#EF4444",
//       cancelButtonColor: "#6B7280",
//       confirmButtonText: "Yes, delete it!",
//     }).then(async (result) => {
//       if (result.isConfirmed) {
//         const res = await axiosSecure.delete(`/club/${id}`);
//         if (res.data.deletedCount > 0) {
//           refetch();
//           Swal.fire("Deleted!", "The club has been removed.", "success");
//         }
//       }
//     });
//   };

//   const onEditSubmit = async (data) => {
//     try {
//       const res = await axiosSecure.patch(`/club/${selectedClub._id}`, data);
//       if (res.data.modifiedCount > 0) {
//         Swal.fire({
//           icon: "success",
//           title: "Updated!",
//           showConfirmButton: false,
//           timer: 1500,
//         });
//         refetch();
//         document.getElementById("edit_modal").close();
//       }
//     } catch (error) {
//       Swal.fire("Error", "Update failed", "error");
//     }
//   };

//   if (isLoading)
//     return (
//       <div className="flex justify-center items-center h-64">
//         <span className="loading loading-dots loading-lg text-blue-500"></span>
//       </div>
//     );

//   return (
//     <div className="p-6 bg-gray-50 min-h-screen">
//       <title>Dashboard-My-Club</title>
//       <header className="mb-10 text-center">
//         <h2 className="text-4xl font-extrabold text-gray-800">
//           My Managed Clubs
//         </h2>
//         <p className="text-gray-500 mt-2">
//           Manage and update your photography clubs easily
//         </p>
//       </header>

//       <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-3 gap-8">
//         {clubs.map((club) => (
//           <div
//             key={club._id}
//             className="group bg-white rounded-2xl shadow-sm hover:shadow-xl transition-all duration-300 border border-gray-100 overflow-hidden flex flex-col"
//           >
//             {/* Image Section */}
//             <div className="relative h-52 overflow-hidden">
//               <img
//                 src={club.bannerImage}
//                 className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
//                 alt={club.clubName}
//               />
//               <div className="absolute top-4 left-4">
//                 <span className="bg-white/90 backdrop-blur px-3 py-1 rounded-full text-xs font-bold text-blue-600 shadow-sm flex items-center gap-1">
//                   <FaTags /> {club.category}
//                 </span>
//               </div>
//             </div>

//             {/* Content Section */}
//             <div className="p-5 flex-grow">
//               <h3 className="text-xl font-bold text-gray-800 mb-2 line-clamp-1">
//                 {club.clubName}
//               </h3>
//               <p className="text-gray-500 text-sm line-clamp-2 mb-4 h-10">
//                 {club.description}
//               </p>

//               <div className="space-y-2 border-t pt-4">
//                 <div className="flex items-center text-gray-600 text-sm gap-3">
//                   <FaMapMarkerAlt className="text-red-400" />
//                   <span>{club.location}</span>
//                 </div>
//                 <div className="flex items-center text-gray-600 text-sm gap-3">
//                   <FaMoneyBillAlt className="text-green-500 text-base" />
//                   <span className="font-semibold text-gray-800">
//                     ${club.membershipFee}{" "}
//                     <span className="text-gray-400 font-normal">/ member</span>
//                   </span>
//                 </div>
//               </div>
//             </div>

//             {/* Action Buttons */}
//             <div className="p-4 bg-gray-50/50 flex gap-3">
//               <button
//                 onClick={() => {
//                   setSelectedClub(club);
//                   reset();
//                   document.getElementById("edit_modal").showModal();
//                 }}
//                 className="flex-1 cursor-pointer flex items-center justify-center gap-2 bg-blue-50 text-blue-600 py-2.5 rounded-xl font-medium hover:bg-blue-600 hover:text-white transition-colors duration-200"
//               >
//                 <FaEdit /> Edit
//               </button>
//               <button
//                 onClick={() => handleDelete(club._id)}
//                 className="flex-1 cursor-pointer flex items-center justify-center gap-2 bg-red-50 text-red-500 py-2.5 rounded-xl font-medium hover:bg-red-500 hover:text-white transition-colors duration-200"
//               >
//                 <FaTrashAlt /> Delete
//               </button>
//             </div>
//           </div>
//         ))}
//       </div>

//       {/* --- Elegant Edit Modal --- */}
//       <dialog id="edit_modal" className="modal backdrop-blur-sm">
//         <div className="modal-box max-w-2xl rounded-3xl p-8">
//           <div className="flex justify-between items-center mb-6">
//             <h3 className="text-2xl font-bold text-gray-800 flex items-center gap-2">
//               <FaEdit className="text-blue-500" /> Update Club Info
//             </h3>
//             <button
//               onClick={() => document.getElementById("edit_modal").close()}
//               className="btn  btn-sm btn-circle btn-ghost"
//             >
//               ✕
//             </button>
//           </div>

//           {selectedClub && (
//             <form onSubmit={handleSubmit(onEditSubmit)} className="space-y-5">
//               <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
//                 <div className="form-control">
//                   <label className="label text-gray-600 font-semibold">
//                     Club Name
//                   </label>
//                   <input
//                     {...register("clubName")}
//                     defaultValue={selectedClub.clubName}
//                     className="input input-bordered focus:ring-2 ring-blue-100 outline-none"
//                     required
//                   />
//                 </div>
//                 <div className="form-control">
//                   <label className="label text-gray-600 font-semibold">
//                     Category
//                   </label>
//                   <input
//                     {...register("category")}
//                     defaultValue={selectedClub.category}
//                     className="input input-bordered focus:ring-2 ring-blue-100 outline-none"
//                     required
//                   />
//                 </div>
//               </div>

//               <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
//                 <div className="form-control">
//                   <label className="label text-gray-600 font-semibold">
//                     Fee ($)
//                   </label>
//                   <input
//                     type="number"
//                     {...register("membershipFee")}
//                     defaultValue={selectedClub.membershipFee}
//                     className="input input-bordered focus:ring-2 ring-blue-100 outline-none"
//                     required
//                   />
//                 </div>
//                 <div className="form-control">
//                   <label className="label text-gray-600 font-semibold">
//                     Location
//                   </label>
//                   <input
//                     {...register("location")}
//                     defaultValue={selectedClub.location}
//                     className="input input-bordered focus:ring-2 ring-blue-100 outline-none"
//                     required
//                   />
//                 </div>
//               </div>

//               <div className="form-control">
//                 <label className="label text-gray-600 font-semibold">
//                   Image URL
//                 </label>
//                 <input
//                   {...register("bannerImage")}
//                   defaultValue={selectedClub.bannerImage}
//                   className="input input-bordered focus:ring-2 ring-blue-100 outline-none"
//                   required
//                 />
//               </div>

//               <div className="form-control">
//                 <label className="label text-gray-600 font-semibold">
//                   Short Description
//                 </label>
//                 <textarea
//                   {...register("description")}
//                   defaultValue={selectedClub.description}
//                   className="textarea textarea-bordered h-28 focus:ring-2 ring-blue-100 outline-none"
//                   required
//                 ></textarea>
//               </div>

//               <div className="pt-4">
//                 <button
//                   type="submit"
//                   className="w-full cursor-pointer bg-blue-600 text-white py-3 rounded-xl font-bold hover:bg-blue-700 shadow-lg shadow-blue-200 transition-all duration-300"
//                 >
//                   Update Changes
//                 </button>
//               </div>
//             </form>
//           )}
//         </div>
//       </dialog>
//     </div>
//   );
// };

// export default MyClub;

import { useQuery } from "@tanstack/react-query";
import React, { useState } from "react";
import {
  FaMapMarkerAlt,
  FaMoneyBillAlt,
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
      background: "var(--fallback-b1,oklch(var(--b1)))", // ডার্ক মোড সাপোর্ট
      color: "var(--fallback-bc,oklch(var(--bc)))",
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
          background: "var(--fallback-b1,oklch(var(--b1)))",
          color: "var(--fallback-bc,oklch(var(--bc)))",
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
      <div className="flex justify-center items-center h-screen bg-base-200">
        <span className="loading loading-dots loading-lg text-primary"></span>
      </div>
    );

  return (
    <div className="p-6 bg-base-200 min-h-screen transition-colors duration-500">
      <header className="mb-10 text-center">
        <h2 className="text-4xl font-black text-base-content">
          My Managed Clubs
        </h2>
        <p className="text-base-content/60 mt-2">
          Manage and update your photography clubs easily
        </p>
      </header>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        {clubs.map((club) => (
          <div
            key={club._id}
            className="group bg-base-100 rounded-[2rem] shadow-xl hover:shadow-2xl transition-all duration-300 border border-base-content/5 overflow-hidden flex flex-col"
          >
            {/* Image Section */}
            <div className="relative h-56 overflow-hidden">
              <img
                src={club.bannerImage}
                className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700"
                alt={club.clubName}
              />
              <div className="absolute top-4 left-4">
                <span className="bg-base-100/80 backdrop-blur px-4 py-1.5 rounded-full text-[10px] font-black uppercase tracking-widest text-primary shadow-lg flex items-center gap-2">
                  <FaTags /> {club.category}
                </span>
              </div>
            </div>

            {/* Content Section */}
            <div className="p-6 flex-grow">
              <h3 className="text-2xl font-black text-base-content mb-3 line-clamp-1">
                {club.clubName}
              </h3>
              <p className="text-base-content/60 text-sm line-clamp-2 mb-6 leading-relaxed">
                {club.description}
              </p>

              <div className="space-y-3 border-t border-base-content/5 pt-5">
                <div className="flex items-center text-base-content/70 text-sm gap-3">
                  <div className="p-2 bg-red-500/10 rounded-lg">
                    <FaMapMarkerAlt className="text-red-500" />
                  </div>
                  <span className="font-medium">{club.location}</span>
                </div>
                <div className="flex items-center text-base-content/70 text-sm gap-3">
                  <div className="p-2 bg-green-500/10 rounded-lg">
                    <FaMoneyBillAlt className="text-green-500 text-lg" />
                  </div>
                  <span className="font-bold text-base-content">
                    ${club.membershipFee}
                    <span className="text-base-content/40 font-normal ml-1">
                      / member
                    </span>
                  </span>
                </div>
              </div>
            </div>

            {/* Action Buttons */}
            <div className="p-4 bg-base-200/50 flex gap-3">
              <button
                onClick={() => {
                  setSelectedClub(club);
                  reset();
                  document.getElementById("edit_modal").showModal();
                }}
                className="flex-1 btn btn-ghost bg-primary/10 text-primary hover:bg-primary hover:text-white rounded-2xl border-none transition-all"
              >
                <FaEdit /> Edit
              </button>
              <button
                onClick={() => handleDelete(club._id)}
                className="flex-1 btn btn-ghost bg-error/10 text-error hover:bg-error hover:text-white rounded-2xl border-none transition-all"
              >
                <FaTrashAlt /> Delete
              </button>
            </div>
          </div>
        ))}
      </div>

      {/* --- Elegant Edit Modal --- */}
      <dialog id="edit_modal" className="modal modal-bottom sm:modal-middle">
        <div className="modal-box bg-base-100 max-w-2xl rounded-[2.5rem] p-8 border border-base-content/10">
          <div className="flex justify-between items-center mb-8">
            <h3 className="text-2xl font-black text-base-content flex items-center gap-3">
              <div className="p-3 bg-primary/10 rounded-2xl">
                <FaEdit className="text-primary" />
              </div>
              Update Club Info
            </h3>
            <button
              onClick={() => document.getElementById("edit_modal").close()}
              className="btn btn-sm btn-circle btn-ghost"
            >
              ✕
            </button>
          </div>

          {selectedClub && (
            <form onSubmit={handleSubmit(onEditSubmit)} className="space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="form-control">
                  <label className="label">
                    <span className="label-text font-bold text-base-content/70">
                      Club Name
                    </span>
                  </label>
                  <input
                    {...register("clubName")}
                    defaultValue={selectedClub.clubName}
                    className="input input-bordered bg-base-200 focus:input-primary rounded-xl"
                    required
                  />
                </div>
                <div className="form-control">
                  <label className="label">
                    <span className="label-text font-bold text-base-content/70">
                      Category
                    </span>
                  </label>
                  <input
                    {...register("category")}
                    defaultValue={selectedClub.category}
                    className="input input-bordered bg-base-200 focus:input-primary rounded-xl"
                    required
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="form-control">
                  <label className="label">
                    <span className="label-text font-bold text-base-content/70">
                      Fee ($)
                    </span>
                  </label>
                  <input
                    type="number"
                    {...register("membershipFee")}
                    defaultValue={selectedClub.membershipFee}
                    className="input input-bordered bg-base-200 focus:input-primary rounded-xl"
                    required
                  />
                </div>
                <div className="form-control">
                  <label className="label">
                    <span className="label-text font-bold text-base-content/70">
                      Location
                    </span>
                  </label>
                  <input
                    {...register("location")}
                    defaultValue={selectedClub.location}
                    className="input input-bordered bg-base-200 focus:input-primary rounded-xl"
                    required
                  />
                </div>
              </div>

              <div className="form-control">
                <label className="label">
                  <span className="label-text font-bold text-base-content/70">
                    Banner Image URL
                  </span>
                </label>
                <input
                  {...register("bannerImage")}
                  defaultValue={selectedClub.bannerImage}
                  className="input input-bordered bg-base-200 focus:input-primary rounded-xl"
                  required
                />
              </div>

              <div className="form-control">
                <label className="label">
                  <span className="label-text font-bold text-base-content/70">
                    Short Description
                  </span>
                </label>
                <textarea
                  {...register("description")}
                  defaultValue={selectedClub.description}
                  className="textarea textarea-bordered bg-base-200 focus:textarea-primary rounded-xl h-28"
                  required
                ></textarea>
              </div>

              <div className="pt-4">
                <button
                  type="submit"
                  className="btn btn-primary w-full text-white font-black rounded-2xl shadow-lg shadow-primary/20"
                >
                  Save Changes
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
