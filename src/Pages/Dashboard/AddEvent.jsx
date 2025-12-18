import React from "react";
import { useForm } from "react-hook-form";
import { useMutation, useQuery } from "@tanstack/react-query";
import useAxiosSecure from "../../Hooks/useAxiosSecure";
import useAuth from "../../Hooks/useAuth";
import Swal from "sweetalert2";

const AddEvent = () => {
  const { user } = useAuth();
  const axiosSecure = useAxiosSecure();
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm();

  // ১. ম্যানেজারের নিজস্ব ক্লাবগুলো ড্রপডাউনে দেখানোর জন্য ফেচ করা
  const { data: myClubs = [] } = useQuery({
    queryKey: ["myClubs", user?.email],
    queryFn: async () => {
      const res = await axiosSecure.get(`/club?email=${user?.email}`);
      return res.data;
    },
  });

  // ২. ইভেন্ট পোস্ট করার জন্য মিউটেশন (Backend API: app.post("/events"))
  const { mutateAsync } = useMutation({
    mutationFn: async (eventData) => {
      const res = await axiosSecure.post("/events", eventData);
      return res.data;
    },
    onSuccess: () => {
      Swal.fire({
        icon: "success",
        title: "Event Created Successfully!",
        showConfirmButton: false,
        timer: 1500,
      });
      reset();
    },
    onError: (error) => {
      Swal.fire("Error!", error.message, "error");
    },
  });

  const onSubmit = async (data) => {
    const selectedClub = myClubs.find((c) => c._id === data.clubId);

    const eventInfo = {
      title: data.title,
      description: data.description,
      eventDate: data.eventDate,
      location: data.location,
      eventFee: parseFloat(data.eventFee) || 0,
      maxAttendees: parseInt(data.maxAttendees) || 0,
      isPaid: parseFloat(data.eventFee) > 0,
      clubId: data.clubId,
      clubName: selectedClub?.clubName,
      managerEmail: user?.email,
      createdAt: new Date(),
    };

    await mutateAsync(eventInfo);
  };

  return (
    <div className="p-6 md:p-12 bg-gray-50 min-h-screen">
      <div className="max-w-2xl mx-auto bg-white p-8 rounded-2xl shadow-xl border border-gray-100">
        <h2 className="text-3xl font-bold text-center text-primary mb-8">
          🎉 Create New Event
        </h2>

        <form onSubmit={handleSubmit(onSubmit)} className="space-y-5">
          {/* ক্লাব সিলেক্ট ড্রপডাউন */}
          <div className="form-control">
            <label className="label font-semibold">Select Club</label>
            <select
              {...register("clubId", { required: "Please select a club" })}
              className={`select select-bordered w-full ${
                errors.clubId ? "select-error" : ""
              }`}
            >
              <option value="">Which club is this event for?</option>
              {myClubs.map((club) => (
                <option key={club._id} value={club._id}>
                  {club.clubName}
                </option>
              ))}
            </select>
            {errors.clubId && (
              <span className="text-red-500 text-sm mt-1">
                {errors.clubId.message}
              </span>
            )}
          </div>

          {/* ইভেন্ট টাইটেল */}
          <div className="form-control">
            <label className="label font-semibold">Event Title</label>
            <input
              type="text"
              {...register("title", { required: "Title is required" })}
              placeholder="e.g. Photography Workshop 2024"
              className="input input-bordered"
            />
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {/* ইভেন্ট তারিখ */}
            <div className="form-control">
              <label className="label font-semibold">Event Date</label>
              <input
                type="date"
                {...register("eventDate", { required: true })}
                className="input input-bordered"
              />
            </div>

            {/* লোকেশন */}
            <div className="form-control">
              <label className="label font-semibold">Location</label>
              <input
                type="text"
                {...register("location", { required: true })}
                placeholder="Venue or City"
                className="input input-bordered"
              />
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {/* ইভেন্ট ফি */}
            <div className="form-control">
              <label className="label font-semibold">Event Fee ($)</label>
              <input
                type="number"
                step="0.01"
                {...register("eventFee", { required: true })}
                placeholder="0 for Free"
                className="input input-bordered"
              />
            </div>

            {/* ম্যাক্স মেম্বার */}
            <div className="form-control">
              <label className="label font-semibold">Max Attendees</label>
              <input
                type="number"
                {...register("maxAttendees")}
                placeholder="Unlimited if empty"
                className="input input-bordered"
              />
            </div>
          </div>

          {/* ডেসক্রিপশন */}
          <div className="form-control">
            <label className="label font-semibold">Event Description</label>
            <textarea
              {...register("description")}
              className="textarea textarea-bordered h-28"
              placeholder="Details about the event..."
            ></textarea>
          </div>

          <button
            type="submit"
            className="btn btn-primary w-full text-white text-lg"
          >
            Publish Event
          </button>
        </form>
      </div>
    </div>
  );
};

export default AddEvent;
