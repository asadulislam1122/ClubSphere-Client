// import React from "react";
// import { useParams } from "react-router-dom";
// import { useQuery, useMutation } from "@tanstack/react-query";
// import useAuth from "../../Hooks/useAuth";
// import Swal from "sweetalert2";
// import useAxiosSecure from "../../Hooks/useAxiosSecure";
// import { FaArrowRight } from "react-icons/fa";

// const EventDetails = () => {
//   const { id } = useParams();
//   const { user } = useAuth();
//   const axiosSecure = useAxiosSecure();

//   const { data: event = {}, isLoading } = useQuery({
//     queryKey: ["event", id],
//     queryFn: async () => {
//       const res = await axiosSecure.get(`/events/${id}`);
//       return res.data;
//     },
//   });

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
//     if (!user) {
//       return Swal.fire(
//         "Login Required",
//         "Please login to register for this event",
//         "warning"
//       );
//     }

//     const registrationInfo = {
//       eventId: event._id,
//       eventTitle: event.title,
//       clubId: event.clubId,
//       clubName: event.clubName,
//       userEmail: user?.email,
//       userName: user?.displayName,
//       eventDate: event.eventDate,
//       eventFee: event.eventFee,
//     };

//     if (event.eventFee > 0) {
//       try {
//         const res = await axiosSecure.post(
//           "/create-event-checkout-session",
//           registrationInfo
//         );
//         if (res.data.url) {
//           window.location.href = res.data.url;
//         }
//       } catch (error) {
//         Swal.fire("Error!", "Failed to initiate payment session", "error");
//       }
//     } else {
//       await mutateAsync({ ...registrationInfo, status: "registered" });
//     }
//   };

//   if (isLoading)
//     return (
//       <div className="flex justify-center my-20">
//         <span className="loading loading-spinner loading-lg text-primary"></span>
//       </div>
//     );

//   return (
//     <div className="max-w-4xl mx-auto my-10 p-5 bg-white shadow-lg rounded-lg">
//       <h2 className="text-4xl font-bold mb-4">{event.title}</h2>
//       <div className="badge badge-primary mb-4">{event.clubName}</div>

//       <p className="text-lg text-gray-700 mb-6">{event.description}</p>

//       <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-8">
//         <div className="p-4 bg-gray-100 rounded">
//           <p className="font-bold">📅 Date:</p>
//           <p>{new Date(event.eventDate).toLocaleDateString()}</p>
//         </div>
//         <div className="p-4 bg-gray-100 rounded">
//           <p className="font-bold">📍 Location:</p>
//           <p>{event.location}</p>
//         </div>
//       </div>

//       <div className="flex justify-between items-center border-t pt-6">
//         <div>
//           <p className="text-gray-500 uppercase text-xs font-bold tracking-widest">
//             Entry Fee
//           </p>
//           <p className="text-3xl font-bold text-primary">
//             {event.eventFee > 0 ? `$${event.eventFee}` : "Free"}
//           </p>
//         </div>

//         <button
//           onClick={handleRegister}
//           disabled={!user}
//           className="group relative flex items-center gap-4 bg-slate-900 hover:bg-blue-600 disabled:bg-gray-200 text-white py-3 px-6 rounded-xl transition-all duration-300 overflow-hidden"
//         >
//           <span className="font-bold text-sm z-10">
//             {event.eventFee > 0 ? "Pay & Register" : "Register Now"}
//           </span>

//           <div className="bg-white/20 p-1.5 rounded-lg z-10">
//             <FaArrowRight className="text-[10px] group-hover:translate-x-1 transition-transform" />
//           </div>

//           {user && (
//             <div className="absolute top-0 right-0 w-12 h-12 bg-white/10 rounded-full -mr-6 -mt-6 transition-all duration-500 group-hover:scale-[8]" />
//           )}
//         </button>
//       </div>
//       {!user && (
//         <p className="text-red-500 text-sm mt-2 text-right">
//           * Please login to register
//         </p>
//       )}
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
import { FaArrowRight, FaCalendarAlt, FaMapMarkerAlt } from "react-icons/fa";

const EventDetails = () => {
  const { id } = useParams();
  const { user } = useAuth();
  const axiosSecure = useAxiosSecure();

  const { data: event = {}, isLoading } = useQuery({
    queryKey: ["event", id],
    queryFn: async () => {
      const res = await axiosSecure.get(`/events/${id}`);
      return res.data;
    },
  });

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
    // bg-base-100 এবং text-base-content থিম অনুযায়ী কালার পরিবর্তন করবে
    <div className="max-w-4xl mx-auto my-10 p-6 md:p-10 bg-base-100 border border-base-content/5 shadow-2xl rounded-3xl transition-colors duration-500">
      {/* Badge & Title */}
      <div className="inline-block px-4 py-1 rounded-full bg-primary/10 text-primary text-xs font-bold uppercase tracking-widest mb-4">
        {event.clubName}
      </div>
      <h2 className="text-4xl md:text-5xl font-black text-base-content mb-6 leading-tight">
        {event.title}
      </h2>

      {/* Description */}
      <p className="text-lg text-base-content/70 mb-10 leading-relaxed">
        {event.description}
      </p>

      {/* Info Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-10">
        <div className="p-5 bg-base-200 border border-base-content/5 rounded-2xl flex items-center gap-4">
          <div className="p-3 bg-primary/10 rounded-xl text-primary">
            <FaCalendarAlt size={20} />
          </div>
          <div>
            <p className="text-xs font-black uppercase text-base-content/40 tracking-tighter">
              Date
            </p>
            <p className="font-bold text-base-content">
              {new Date(event.eventDate).toLocaleDateString("en-GB", {
                day: "numeric",
                month: "long",
                year: "numeric",
              })}
            </p>
          </div>
        </div>

        <div className="p-5 bg-base-200 border border-base-content/5 rounded-2xl flex items-center gap-4">
          <div className="p-3 bg-secondary/10 rounded-xl text-secondary">
            <FaMapMarkerAlt size={20} />
          </div>
          <div>
            <p className="text-xs font-black uppercase text-base-content/40 tracking-tighter">
              Location
            </p>
            <p className="font-bold text-base-content">{event.location}</p>
          </div>
        </div>
      </div>

      {/* Footer Section: Fee and Action Button */}
      <div className="flex flex-col sm:flex-row justify-between items-center gap-6 border-t border-base-content/10 pt-8">
        <div className="text-center sm:text-left">
          <p className="text-base-content/40 uppercase text-xs font-black tracking-widest mb-1">
            Entry Fee
          </p>
          <p className="text-4xl font-black text-primary">
            {event.eventFee > 0 ? `$${event.eventFee}` : "Free"}
          </p>
        </div>

        <div className="w-full sm:w-auto">
          <button
            onClick={handleRegister}
            disabled={!user}
            className="group relative flex items-center justify-center gap-4 bg-slate-900 cursor-pointer dark:bg-primary hover:bg-blue-600 dark:hover:bg-primary-focus disabled:bg-base-300 disabled:text-base-content/30 text-white py-4 px-10 rounded-2xl transition-all duration-500 overflow-hidden w-full sm:w-auto shadow-xl shadow-primary/10"
          >
            <span className="font-black text-sm uppercase tracking-widest z-10">
              {event.eventFee > 0 ? "Pay & Register" : "Register Now"}
            </span>

            <div className="bg-white/20 p-2 rounded-xl z-10">
              <FaArrowRight className="text-xs group-hover:translate-x-2 transition-transform duration-300" />
            </div>

            {/* আগের সেই সুন্দর সার্কেল অ্যানিমেশন */}
            {user && (
              <div className="absolute top-0 right-0 w-16 h-16 bg-white/10 rounded-full -mr-8 -mt-8 transition-all duration-700 group-hover:scale-[10] ease-in-out" />
            )}
          </button>

          {!user && (
            <p className="text-error text-[10px] font-bold mt-3 text-center sm:text-right cursor-pointer animate-pulse">
              * Please login to register
            </p>
          )}
        </div>
      </div>
    </div>
  );
};

export default EventDetails;
