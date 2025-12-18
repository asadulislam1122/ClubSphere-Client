// import React from "react";
// import { useParams } from "react-router-dom";
// import { useQuery, useMutation } from "@tanstack/react-query";

// import useAuth from "../../Hooks/useAuth";
// import Swal from "sweetalert2";
// import useAxiosSecure from "../../Hooks/useAxiosSecure";

// const EventDetails = () => {
//   const { id } = useParams(); // URL থেকে ID নেওয়া
//   const { user } = useAuth();
//   const axiosSecure = useAxiosSecure();

//   // ১. নির্দিষ্ট ইভেন্টের ডাটা ফেচ করা
//   const { data: event = {}, isLoading } = useQuery({
//     queryKey: ["event", id],
//     queryFn: async () => {
//       const res = await axiosSecure.get(`/events/${id}`); // এই এপিআই ব্যাকএন্ডে থাকতে হবে
//       return res.data;
//     },
//   });

//   // ২. রেজিস্ট্রেশনের জন্য মিউটেশন (Backend API: /event-registrations)
//   const { mutateAsync } = useMutation({
//     mutationFn: async (regData) => {
//       const res = await axiosSecure.post("/event-registrations", regData);
//       return res.data;
//     },
//     onSuccess: () => {
//       Swal.fire("Success!", "You have registered for this event.", "success");
//     },
//     onError: (err) => {
//       Swal.fire(
//         "Error!",
//         err.response?.data?.message || "Registration failed",
//         "error"
//       );
//     },
//   });

//   const handleRegister = async () => {
//     const registrationInfo = {
//       eventId: event._id,
//       eventTitle: event.title,
//       clubId: event.clubId,
//       userEmail: user?.email,
//       userName: user?.displayName,
//       status: "registered",
//       eventDate: event.eventDate,
//     };
//     await mutateAsync(registrationInfo);
//   };

//   if (isLoading)
//     return <span className="loading loading-spinner text-primary"></span>;

//   return (
//     <div className="max-w-4xl mx-auto my-10 p-5 bg-white shadow-lg rounded-lg">
//       <h2 className="text-4xl font-bold mb-4">{event.title}</h2>
//       <div className="badge badge-primary mb-4">{event.clubName}</div>

//       <p className="text-lg text-gray-700 mb-6">{event.description}</p>

//       <div className="grid grid-cols-2 gap-4 mb-8">
//         <div className="p-4 bg-gray-100 rounded">
//           <p className="font-bold">Date:</p>
//           <p>{new Date(event.eventDate).toLocaleDateString()}</p>
//         </div>
//         <div className="p-4 bg-gray-100 rounded">
//           <p className="font-bold">Location:</p>
//           <p>{event.location}</p>
//         </div>
//       </div>

//       <div className="flex justify-between items-center">
//         <p className="text-2xl font-bold text-primary">
//           Fee: {event.eventFee > 0 ? `$${event.eventFee}` : "Free"}
//         </p>

//         {/* রেজিস্ট্রেশন বাটন */}
//         <button
//           onClick={handleRegister}
//           className="btn btn-primary btn-lg"
//           disabled={!user} // লগইন না থাকলে ডিজেবল
//         >
//           {event.eventFee > 0 ? "Pay & Register" : "Register Now"}
//         </button>
//       </div>
//     </div>
//   );
// };

// export default EventDetails;

import React from "react";
import { useParams } from "react-router-dom";
import { useQuery, useMutation } from "@tanstack/react-query";
import useAuth from "../../Hooks/useAuth";
import Swal from "sweetalert2";
import useAxiosSecure from "../../Hooks/useAxiosSecure";

const EventDetails = () => {
  const { id } = useParams();
  const { user } = useAuth();
  const axiosSecure = useAxiosSecure();

  // ১. নির্দিষ্ট ইভেন্টের ডাটা ফেচ করা
  const { data: event = {}, isLoading } = useQuery({
    queryKey: ["event", id],
    queryFn: async () => {
      const res = await axiosSecure.get(`/events/${id}`);
      return res.data;
    },
  });

  // ২. ফ্রি রেজিস্ট্রেশনের জন্য মিউটেশন
  const { mutateAsync } = useMutation({
    mutationFn: async (regData) => {
      const res = await axiosSecure.post("/event-registrations", regData);
      return res.data;
    },
    onSuccess: () => {
      Swal.fire("Success!", "You have registered for this event.", "success");
    },
    onError: (err) => {
      Swal.fire(
        "Error!",
        err.response?.data?.message || "Registration failed",
        "error"
      );
    },
  });

  // ৩. রেজিস্ট্রেশন হ্যান্ডলার (পেমেন্ট বা সরাসরি)
  const handleRegister = async () => {
    if (!user) {
      return Swal.fire(
        "Login Required",
        "Please login to register for this event",
        "warning"
      );
    }

    const registrationInfo = {
      eventId: event._id,
      eventTitle: event.title,
      clubId: event.clubId,
      clubName: event.clubName,
      userEmail: user?.email,
      userName: user?.displayName,
      eventDate: event.eventDate,
      eventFee: event.eventFee,
    };

    if (event.eventFee > 0) {
      // **পেইড ইভেন্ট:** পেমেন্ট গেটওয়েতে পাঠাও
      try {
        const res = await axiosSecure.post(
          "/create-event-checkout-session",
          registrationInfo
        );
        if (res.data.url) {
          window.location.href = res.data.url;
        }
      } catch (error) {
        Swal.fire("Error!", "Failed to initiate payment session", "error");
      }
    } else {
      // **ফ্রি ইভেন্ট:** সরাসরি রেজিস্ট্রেশন করো
      await mutateAsync({ ...registrationInfo, status: "registered" });
    }
  };

  if (isLoading)
    return (
      <div className="flex justify-center my-20">
        <span className="loading loading-spinner loading-lg text-primary"></span>
      </div>
    );

  return (
    <div className="max-w-4xl mx-auto my-10 p-5 bg-white shadow-lg rounded-lg">
      <h2 className="text-4xl font-bold mb-4">{event.title}</h2>
      <div className="badge badge-primary mb-4">{event.clubName}</div>

      <p className="text-lg text-gray-700 mb-6">{event.description}</p>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-8">
        <div className="p-4 bg-gray-100 rounded">
          <p className="font-bold">📅 Date:</p>
          <p>{new Date(event.eventDate).toLocaleDateString()}</p>
        </div>
        <div className="p-4 bg-gray-100 rounded">
          <p className="font-bold">📍 Location:</p>
          <p>{event.location}</p>
        </div>
      </div>

      <div className="flex justify-between items-center border-t pt-6">
        <div>
          <p className="text-gray-500 uppercase text-xs font-bold tracking-widest">
            Entry Fee
          </p>
          <p className="text-3xl font-bold text-primary">
            {event.eventFee > 0 ? `$${event.eventFee}` : "Free"}
          </p>
        </div>

        <button
          onClick={handleRegister}
          className="btn btn-primary btn-lg px-10"
          disabled={!user}
        >
          {event.eventFee > 0 ? "Pay & Register" : "Register Now"}
        </button>
      </div>
      {!user && (
        <p className="text-red-500 text-sm mt-2 text-right">
          * Please login to register
        </p>
      )}
    </div>
  );
};

export default EventDetails;
