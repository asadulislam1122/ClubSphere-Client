import React from "react";
import { useForm } from "react-hook-form";
import useAxiosSecure from "../../Hooks/useAxiosSecure";
import useAuth from "../../Hooks/useAuth";
import axios from "axios";
import { toast } from "react-toastify";
import { useNavigate } from "react-router";

const Club = () => {
  const { user } = useAuth();
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();
  const axiosSecure = useAxiosSecure();
  const navigate = useNavigate();
  const onSubmit = async (data) => {
    try {
      // 1️⃣ Banner photo upload
      const bannerFile = data.bannerImage[0];
      const formData = new FormData();
      formData.append("image", bannerFile);

      const image_Api_URL = `https://api.imgbb.com/1/upload?key=${
        import.meta.env.VITE_image_host
      }`;
      const imgRes = await axios.post(image_Api_URL, formData);
      const imageUrl = imgRes.data.data.url;

      // 2️⃣ Club data
      const clubData = {
        clubName: data.clubName,
        description: data.description,
        category: data.category,
        location: data.location,
        membershipFee: data.membershipFee,
        bannerImage: imageUrl,
        email: user?.email,
        status: "pending",
        createdAt: new Date(),
      };

      // 3️⃣ POST to backend
      const res = await axiosSecure.post("/club", clubData);
      console.log("Club saved:", res.data);
      toast.success("Club created successfully!");
      navigate("/dashboard/my-club");
    } catch (err) {
      console.error(err);
      toast.error("Failed to create club!");
    }
  };

  return (
    <div className="max-w-xl mx-auto p-6 border rounded-lg shadow-lg mt-10 bg-white">
      <title>Dashboard-Create-Club</title>
      <h2 className="text-3xl font-bold mb-6 text-center text-blue-600">
        Create Your Club
      </h2>

      <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
        {/* Club Name */}
        <input
          type="text"
          placeholder="Club Name"
          {...register("clubName", { required: "Club Name is required" })}
          className="w-full border p-3 rounded-lg focus:ring-2 focus:ring-blue-300"
        />
        {errors.clubName && (
          <p className="text-red-500 text-sm">{errors.clubName.message}</p>
        )}

        {/* Description */}
        <textarea
          placeholder="Description"
          {...register("description", { required: "Description is required" })}
          className="w-full border p-3 rounded-lg focus:ring-2 focus:ring-blue-300"
        />
        {errors.description && (
          <p className="text-red-500 text-sm">{errors.description.message}</p>
        )}

        {/* Category */}
        <select
          {...register("category", { required: "Category is required" })}
          className="w-full border p-3 rounded-lg focus:ring-2 focus:ring-blue-300"
        >
          <option value="">Select Category</option>
          <option value="Photography">Photography</option>
          <option value="Sports">Sports</option>
          <option value="Tech">Tech</option>
          <option value="Book Club">Book Club</option>
          <option value="Book Club">Song Club</option>
        </select>
        {errors.category && (
          <p className="text-red-500 text-sm">{errors.category.message}</p>
        )}

        {/* Location */}
        <input
          type="text"
          placeholder="Location"
          {...register("location", { required: "Location is required" })}
          className="w-full border p-3 rounded-lg focus:ring-2 focus:ring-blue-300"
        />
        {errors.location && (
          <p className="text-red-500 text-sm">{errors.location.message}</p>
        )}

        {/* Banner Image */}
        <input
          type="file"
          {...register("bannerImage", { required: "Banner Image is required" })}
          className="w-full border p-2 rounded-lg"
        />
        {errors.bannerImage && (
          <p className="text-red-500 text-sm">{errors.bannerImage.message}</p>
        )}

        {/* Membership Fee */}
        <input
          type="number"
          placeholder="Membership Fee (0 for free)"
          {...register("membershipFee", {
            required: "Membership Fee is required",
          })}
          className="w-full border p-3 rounded-lg focus:ring-2 focus:ring-blue-300"
        />
        {errors.membershipFee && (
          <p className="text-red-500 text-sm">{errors.membershipFee.message}</p>
        )}

        {/* Submit */}
        <button
          type="submit"
          className="w-full py-3 bg-gradient-to-r from-blue-500 to-blue-700 text-white font-semibold rounded-lg hover:opacity-90 transition"
        >
          Create
        </button>
      </form>
    </div>
  );
};

export default Club;
