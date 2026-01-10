// import React from "react";
// import { useForm } from "react-hook-form";
// import useAxiosSecure from "../../Hooks/useAxiosSecure";
// import useAuth from "../../Hooks/useAuth";
// import axios from "axios";
// import { toast } from "react-toastify";
// import { useNavigate } from "react-router";

// const Club = () => {
//   const { user } = useAuth();
//   const {
//     register,
//     handleSubmit,
//     formState: { errors },
//   } = useForm();
//   const axiosSecure = useAxiosSecure();
//   const navigate = useNavigate();
//   const onSubmit = async (data) => {
//     try {
//       // 1️⃣ Banner photo upload
//       const bannerFile = data.bannerImage[0];
//       const formData = new FormData();
//       formData.append("image", bannerFile);

//       const image_Api_URL = `https://api.imgbb.com/1/upload?key=${
//         import.meta.env.VITE_image_host
//       }`;
//       const imgRes = await axios.post(image_Api_URL, formData);
//       const imageUrl = imgRes.data.data.url;

//       // 2️⃣ Club data
//       const clubData = {
//         clubName: data.clubName,
//         description: data.description,
//         category: data.category,
//         location: data.location,
//         membershipFee: data.membershipFee,
//         bannerImage: imageUrl,
//         email: user?.email,
//         status: "pending",
//         createdAt: new Date(),
//       };

//       // 3️⃣ POST to backend
//       const res = await axiosSecure.post("/club", clubData);
//       console.log("Club saved:", res.data);
//       toast.success("Club created successfully!");
//       navigate("/dashboard/my-club");
//     } catch (err) {
//       console.error(err);
//       toast.error("Failed to create club!");
//     }
//   };

//   return (
//     <div className="max-w-xl mx-auto p-6 border rounded-lg shadow-lg mt-10 ">
//       <title>Dashboard-Create-Club</title>
//       <h2 className="text-3xl font-bold mb-6 text-center text-blue-600">
//         Create Your Club
//       </h2>

//       <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
//         {/* Club Name */}
//         <input
//           type="text"
//           placeholder="Club Name"
//           {...register("clubName", { required: "Club Name is required" })}
//           className="w-full border p-3 rounded-lg focus:ring-2 focus:ring-blue-300"
//         />
//         {errors.clubName && (
//           <p className="text-red-500 text-sm">{errors.clubName.message}</p>
//         )}

//         {/* Description */}
//         <textarea
//           placeholder="Description"
//           {...register("description", { required: "Description is required" })}
//           className="w-full border p-3 rounded-lg focus:ring-2 focus:ring-blue-300"
//         />
//         {errors.description && (
//           <p className="text-red-500 text-sm">{errors.description.message}</p>
//         )}

//         {/* Category */}
//         <select
//           {...register("category", { required: "Category is required" })}
//           className="w-full border p-3 rounded-lg focus:ring-2 focus:ring-blue-900"
//         >
//           <option value="">Select Category</option>
//           <option value="Photography">Photography</option>
//           <option value="Sports">Sports</option>
//           <option value="Tech">Tech</option>
//           <option value="Book Club">Book Club</option>
//           <option value="Book Club">Song Club</option>
//         </select>
//         {errors.category && (
//           <p className="text-red-500 text-sm">{errors.category.message}</p>
//         )}

//         {/* Location */}
//         <input
//           type="text"
//           placeholder="Location"
//           {...register("location", { required: "Location is required" })}
//           className="w-full border p-3 rounded-lg focus:ring-2 focus:ring-blue-300"
//         />
//         {errors.location && (
//           <p className="text-red-500 text-sm">{errors.location.message}</p>
//         )}

//         {/* Banner Image */}
//         <input
//           type="file"
//           {...register("bannerImage", { required: "Banner Image is required" })}
//           className="w-full border p-2 rounded-lg"
//         />
//         {errors.bannerImage && (
//           <p className="text-red-500 text-sm">{errors.bannerImage.message}</p>
//         )}

//         {/* Membership Fee */}
//         <input
//           type="number"
//           placeholder="Membership Fee (0 for free)"
//           {...register("membershipFee", {
//             required: "Membership Fee is required",
//           })}
//           className="w-full border p-3 rounded-lg focus:ring-2 focus:ring-blue-300"
//         />
//         {errors.membershipFee && (
//           <p className="text-red-500 text-sm">{errors.membershipFee.message}</p>
//         )}

//         {/* Submit */}
//         <button
//           type="submit"
//           className="w-full cursor-pointer py-3 bg-gradient-to-r from-blue-500 to-blue-700 text-white font-semibold rounded-lg hover:opacity-90 transition"
//         >
//           Create
//         </button>
//       </form>
//     </div>
//   );
// };

// export default Club;

import React, { useState } from "react";
import { useForm } from "react-hook-form";
import useAxiosSecure from "../../Hooks/useAxiosSecure";
import useAuth from "../../Hooks/useAuth";
import axios from "axios";
import { toast } from "react-toastify";
import { useNavigate } from "react-router";
import { FaCloudUploadAlt, FaUsers } from "react-icons/fa";

const Club = () => {
  const { user } = useAuth();
  const [loading, setLoading] = useState(false);
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();
  const axiosSecure = useAxiosSecure();
  const navigate = useNavigate();

  const onSubmit = async (data) => {
    setLoading(true);
    try {
      // 1️⃣ Banner photo upload to ImgBB
      const bannerFile = data.bannerImage[0];
      const formData = new FormData();
      formData.append("image", bannerFile);

      const image_Api_URL = `https://api.imgbb.com/1/upload?key=${
        import.meta.env.VITE_image_host
      }`;
      const imgRes = await axios.post(image_Api_URL, formData);
      const imageUrl = imgRes.data.data.url;

      // 2️⃣ Club data object
      const clubData = {
        clubName: data.clubName,
        description: data.description,
        category: data.category,
        location: data.location,
        membershipFee: parseFloat(data.membershipFee),
        bannerImage: imageUrl,
        email: user?.email,
        userName: user?.displayName,
        status: "pending",
        createdAt: new Date(),
      };

      // 3️⃣ POST to backend
      const res = await axiosSecure.post("/club", clubData);
      if (res.data.insertedId) {
        toast.success("Club created successfully and pending for approval!");
        navigate("/dashboard/my-club");
      }
    } catch (err) {
      console.error(err);
      toast.error("Failed to create club!");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen py-10 px-4 bg-base-200 transition-colors duration-500">
      <title>Create Club | ClubSphere</title>

      <div className="max-w-2xl mx-auto bg-base-100 rounded-[2rem] shadow-2xl overflow-hidden border border-base-content/5">
        {/* Header Section */}
        <div className="bg-gradient-to-r from-blue-600 to-indigo-700 p-8 text-center text-white">
          <div className="flex justify-center mb-4">
            <div className="p-4 bg-white/20 rounded-full backdrop-blur-md">
              <FaUsers className="text-4xl" />
            </div>
          </div>
          <h2 className="text-3xl font-black italic tracking-tight">
            CREATE YOUR CLUB
          </h2>
          <p className="text-blue-100 text-sm mt-2 opacity-80">
            Build a community and share your passion with others.
          </p>
        </div>

        {/* Form Section */}
        <div className="p-8">
          <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
            {/* Club Name */}
            <div className="form-control">
              <label className="label">
                <span className="label-text font-bold text-base-content/70">
                  Club Name
                </span>
              </label>
              <input
                type="text"
                placeholder="Ex: Dhaka Photography Club"
                {...register("clubName", { required: "Club Name is required" })}
                className="input input-bordered w-full bg-base-200 focus:input-primary transition-all rounded-xl"
              />
              {errors.clubName && (
                <span className="text-error text-xs mt-1">
                  {errors.clubName.message}
                </span>
              )}
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {/* Category */}
              <div className="form-control">
                <label className="label">
                  <span className="label-text font-bold text-base-content/70">
                    Category
                  </span>
                </label>
                <select
                  {...register("category", {
                    required: "Category is required",
                  })}
                  className="select select-bordered w-full bg-base-200 focus:select-primary rounded-xl"
                >
                  <option value="">Select Category</option>
                  <option value="Photography">Photography</option>
                  <option value="Sports">Sports</option>
                  <option value="Tech">Tech</option>
                  <option value="Book Club">Book Club</option>
                  <option value="Song Club">Song Club</option>
                </select>
                {errors.category && (
                  <span className="text-error text-xs mt-1">
                    {errors.category.message}
                  </span>
                )}
              </div>

              {/* Location */}
              <div className="form-control">
                <label className="label">
                  <span className="label-text font-bold text-base-content/70">
                    Location
                  </span>
                </label>
                <input
                  type="text"
                  placeholder="Ex: Mirpur, Dhaka"
                  {...register("location", {
                    required: "Location is required",
                  })}
                  className="input input-bordered w-full bg-base-200 focus:input-primary rounded-xl"
                />
                {errors.location && (
                  <span className="text-error text-xs mt-1">
                    {errors.location.message}
                  </span>
                )}
              </div>
            </div>

            {/* Description */}
            <div className="form-control">
              <label className="label">
                <span className="label-text font-bold text-base-content/70">
                  Description
                </span>
              </label>
              <textarea
                placeholder="Tell us about your club's goals and activities..."
                {...register("description", {
                  required: "Description is required",
                })}
                className="textarea textarea-bordered w-full bg-base-200 focus:textarea-primary rounded-xl h-28"
              />
              {errors.description && (
                <span className="text-error text-xs mt-1">
                  {errors.description.message}
                </span>
              )}
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 items-center">
              {/* Banner Image */}
              <div className="form-control">
                <label className="label">
                  <span className="label-text font-bold text-base-content/70">
                    Club Banner
                  </span>
                </label>
                <input
                  type="file"
                  {...register("bannerImage", {
                    required: "Banner Image is required",
                  })}
                  className="file-input file-input-bordered file-input-primary w-full bg-base-200 rounded-xl"
                />
                {errors.bannerImage && (
                  <span className="text-error text-xs mt-1">
                    {errors.bannerImage.message}
                  </span>
                )}
              </div>

              {/* Membership Fee */}
              <div className="form-control">
                <label className="label">
                  <span className="label-text font-bold text-base-content/70">
                    Membership Fee ($)
                  </span>
                </label>
                <input
                  type="number"
                  placeholder="0 for free"
                  {...register("membershipFee", {
                    required: "Membership Fee is required",
                  })}
                  className="input input-bordered w-full bg-base-200 focus:input-primary rounded-xl"
                />
                {errors.membershipFee && (
                  <span className="text-error text-xs mt-1">
                    {errors.membershipFee.message}
                  </span>
                )}
              </div>
            </div>

            {/* Submit Button */}
            <button
              type="submit"
              disabled={loading}
              className="btn btn-primary w-full text-white font-bold rounded-xl shadow-lg shadow-primary/20 bg-gradient-to-r from-blue-600 to-blue-800 border-none transition-all hover:scale-[1.01]"
            >
              {loading ? (
                <span className="loading loading-spinner"></span>
              ) : (
                <>
                  <FaCloudUploadAlt className="text-xl mr-2" /> Create Club
                </>
              )}
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default Club;
