import React from "react";
import { useForm } from "react-hook-form";
import useAuth from "../../Hooks/useAuth";
import useAxiosSecure from "../../Hooks/useAxiosSecure";
import Swal from "sweetalert2";

const Manager = () => {
  const axiosSecure = useAxiosSecure();
  const { user } = useAuth();
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const onSubmit = (data) => {
    const managerData = {
      ...data,
      photo: user?.photoURL,
    };

    console.log("Manager Application Data:", managerData);
    // manager db create
    axiosSecure.post("/managers", managerData).then((res) => {
      if (res.data.insertedId) {
        Swal.fire({
          position: "top-end",
          icon: "success",
          title: "Your application has been submited. Plese wait!!!",
          showConfirmButton: false,
          timer: 1500,
        });
      }
    });
  };

  return (
    <div className="max-w-xl mb-22 mx-auto p-6 border rounded-lg shadow-lg mt-10 bg-white">
      <title>Be-A-Manager</title>
      <h2 className="text-3xl font-bold mb-6 text-center text-blue-600">
        Be A Manager
      </h2>

      {/* 📷 User Photo Preview */}
      <div className="flex flex-col items-center mb-6">
        <label className="mb-2 font-medium text-gray-700">Profile Photo</label>
        {user?.photoURL ? (
          <img
            src={user.photoURL}
            alt="User Profile"
            className="w-24 h-24 rounded-full border-4 border-blue-100 object-cover shadow-sm"
          />
        ) : (
          <div className="w-24 h-24 rounded-full bg-gray-200 flex items-center justify-center text-gray-500">
            No Photo
          </div>
        )}
      </div>

      <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
        {/* Name Field */}
        <div>
          <label className="block mb-1 font-medium text-gray-700">Name</label>
          <input
            type="text"
            defaultValue={user?.displayName}
            placeholder="Your Name"
            {...register("name", { required: "Name is required" })}
            className="w-full border p-3 rounded-lg focus:ring-2 focus:ring-blue-300"
          />
          {errors.name && (
            <p className="text-red-500 text-sm mt-1">{errors.name.message}</p>
          )}
        </div>

        {/* Email Field */}
        <div>
          <label className="block mb-1 font-medium text-gray-700">Email</label>
          <input
            type="email"
            defaultValue={user?.email}
            readOnly
            placeholder="Your Email"
            {...register("email", {
              required: "Email is required",
              pattern: {
                value: /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,6}$/,
                message: "Invalid email address",
              },
            })}
            className="w-full border p-3 rounded-lg focus:ring-2 focus:ring-blue-300 bg-gray-50"
          />
          {errors.email && (
            <p className="text-red-500 text-sm mt-1">{errors.email.message}</p>
          )}
        </div>

        {/* Phone Number Field */}
        <div>
          <label className="block mb-1 font-medium text-gray-700">
            Phone Number
          </label>
          <input
            type="tel"
            placeholder="Phone Number"
            {...register("phone", {
              required: "Phone number is required",
              minLength: {
                value: 6,
                message: "Phone number must be at least 6 digits",
              },
            })}
            className="w-full border p-3 rounded-lg focus:ring-2 focus:ring-blue-300"
          />
          {errors.phone && (
            <p className="text-red-500 text-sm mt-1">{errors.phone.message}</p>
          )}
        </div>

        {/* Address Field */}
        <div>
          <label className="block mb-1 font-medium text-gray-700">
            Address
          </label>
          <input
            type="text"
            placeholder="Your Address"
            {...register("address", { required: "Address is required" })}
            className="w-full border p-3 rounded-lg focus:ring-2 focus:ring-blue-300"
          />
          {errors.address && (
            <p className="text-red-500 text-sm mt-1">
              {errors.address.message}
            </p>
          )}
        </div>

        {/* Submit Button */}
        <button
          type="submit"
          className="w-full py-3 bg-gradient-to-r from-blue-500 to-blue-700 text-white font-semibold rounded-lg hover:opacity-90 transition"
        >
          Apply Now
        </button>
      </form>
    </div>
  );
};

export default Manager;
