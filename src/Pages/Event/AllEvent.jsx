// import React, { useState } from "react";
// import { useQuery } from "@tanstack/react-query";

// import { Link } from "react-router-dom";
// import useAxiosSecure from "../../Hooks/useAxiosSecure";

// const AllEvent = () => {
//   const axiosSecure = useAxiosSecure();
//   const [searchText, setSearchText] = useState("");
//   const [sort, setSort] = useState("oldest"); // ডিফল্ট সর্টিং

//   // ১. ডাটা ফেচ করা (সার্চ এবং সর্টিং এর ওপর ভিত্তি করে)
//   const { data: events = [], isLoading } = useQuery({
//     queryKey: ["events", searchText, sort],
//     queryFn: async () => {
//       const res = await axiosSecure.get(
//         `/events?searchText=${searchText}&sort=${sort}`
//       );
//       return res.data;
//     },
//   });

//   return (
//     <div className="container mx-auto p-6 min-h-screen">
//       <h2 className="text-4xl font-bold text-center mb-8">
//         All Upcoming Events
//       </h2>

//       {/* সার্চ এবং ফিল্টার সেকশন */}
//       <div className="flex flex-col md:flex-row gap-4 justify-between items-center mb-10">
//         {/* সার্চ ইনপুট */}
//         <div className="form-control w-full max-w-xs">
//           <input
//             type="text"
//             placeholder="Search by event title..."
//             className="input input-bordered w-full"
//             onChange={(e) => setSearchText(e.target.value)}
//           />
//         </div>

//         {/* সর্টিং ড্রপডাউন */}
//         <div className="flex items-center gap-2">
//           <span className="font-semibold">Sort By:</span>
//           <select
//             className="select select-bordered"
//             value={sort}
//             onChange={(e) => setSort(e.target.value)}
//           >
//             <option value="oldest">Event Date (Soonest)</option>
//             <option value="newest">Recently Added</option>
//           </select>
//         </div>
//       </div>

//       {/* লোডিং স্টেট */}
//       {isLoading && (
//         <div className="flex justify-center my-20">
//           <span className="loading loading-spinner loading-lg text-primary"></span>
//         </div>
//       )}

//       {/* ইভেন্ট কার্ড গ্রিড */}
//       <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
//         {events.length > 0
//           ? events.map((event) => (
//               <div
//                 key={event._id}
//                 className="card bg-base-100 shadow-xl hover:scale-105 transition-transform border"
//               >
//                 <div className="card-body">
//                   <div className="badge badge-secondary mb-2">
//                     {event.clubName}
//                   </div>
//                   <h2 className="card-title text-2xl font-bold">
//                     {event.title}
//                   </h2>
//                   <p className="text-gray-600 line-clamp-2">
//                     {event.description}
//                   </p>

//                   <div className="mt-4 space-y-2">
//                     <p className="flex items-center gap-2">
//                       <span className="font-bold">📅 Date:</span>{" "}
//                       {new Date(event.eventDate).toLocaleDateString()}
//                     </p>
//                     <p className="flex items-center gap-2">
//                       <span className="font-bold">📍 Location:</span>{" "}
//                       {event.location}
//                     </p>
//                     <p className="text-lg font-bold text-primary">
//                       Fee: {event.eventFee > 0 ? `$${event.eventFee}` : "Free"}
//                     </p>
//                   </div>

//                   <div className="card-actions justify-end mt-6">
//                     <Link
//                       to={`/events/${event._id}`}
//                       className="btn btn-primary btn-outline w-full"
//                     >
//                       View Details
//                     </Link>
//                   </div>
//                 </div>
//               </div>
//             ))
//           : !isLoading && (
//               <p className="text-center col-span-full text-2xl text-gray-400">
//                 No events found.
//               </p>
//             )}
//       </div>
//     </div>
//   );
// };

// export default AllEvent;

import React, { useState } from "react";
import { useQuery } from "@tanstack/react-query";
import { Link, useSearchParams } from "react-router-dom"; // ১. useSearchParams ইম্পোর্ট করুন
import useAxiosSecure from "../../Hooks/useAxiosSecure";
import { FaArrowRight } from "react-icons/fa";

const AllEvent = () => {
  const axiosSecure = useAxiosSecure();
  const [searchParams] = useSearchParams(); // ২. সার্চ প্যারামস ধরুন
  const clubNameFromUrl = searchParams.get("clubName") || ""; // URL থেকে ক্লাব নেম নিন

  const [searchText, setSearchText] = useState("");
  const [sort, setSort] = useState("oldest");

  // ৩. ডাটা ফেচিং লজিক আপডেট (queryKey তে clubNameFromUrl যোগ করা হয়েছে)
  const { data: events = [], isLoading } = useQuery({
    queryKey: ["events", searchText, sort, clubNameFromUrl],
    queryFn: async () => {
      // ব্যাকএন্ডে সার্চ, সর্ট এবং ক্লাব নেম পাঠানো হচ্ছে
      const res = await axiosSecure.get(
        `/events?searchText=${searchText}&sort=${sort}&clubName=${clubNameFromUrl}`
      );
      return res.data;
    },
  });

  return (
    <div className="container mx-auto p-6 min-h-screen">
      {/* শিরোনাম পরিবর্তন (যদি ক্লাব ফিল্টার থাকে) */}
      <h2 className="text-4xl font-bold text-center mb-4">
        {clubNameFromUrl
          ? `Events for: ${clubNameFromUrl}`
          : "All Upcoming Events"}
      </h2>

      {clubNameFromUrl && (
        <p className="text-center mb-8 text-blue-500 font-medium">
          Showing filtered events from this club
        </p>
      )}

      {/* সার্চ এবং ফিল্টার সেকশন (আপনার আগের কোড) */}
      <div className="flex flex-col md:flex-row gap-4 justify-between items-center mb-10">
        <div className="form-control w-full max-w-xs">
          <input
            type="text"
            placeholder="Search by event title..."
            className="input input-bordered w-full"
            value={searchText}
            onChange={(e) => setSearchText(e.target.value)}
          />
        </div>

        <div className="flex items-center gap-2">
          <span className="font-semibold">Sort By:</span>
          <select
            className="select select-bordered"
            value={sort}
            onChange={(e) => setSort(e.target.value)}
          >
            <option value="oldest">Event Date (Soonest)</option>
            <option value="newest">Recently Added</option>
          </select>
        </div>
      </div>

      {/* লোডিং স্টেট */}
      {isLoading && (
        <div className="flex justify-center my-20">
          <span className="loading loading-spinner loading-lg text-primary"></span>
        </div>
      )}

      {/* ইভেন্ট কার্ড গ্রিড (আপনার আগের কোড) */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        {events.length > 0
          ? events.map((event) => (
              <div
                key={event._id}
                className="card bg-base-100 shadow-xl hover:scale-105 transition-transform border"
              >
                <div className="card-body">
                  <div className="badge badge-secondary mb-2">
                    {event.clubName}
                  </div>
                  <h2 className="card-title text-2xl font-bold">
                    {event.title}
                  </h2>
                  <p className="text-gray-600 line-clamp-2">
                    {event.description}
                  </p>

                  <div className="mt-4 space-y-2">
                    <p>
                      <span className="font-bold">📅 Date:</span>{" "}
                      {new Date(event.eventDate).toLocaleDateString()}
                    </p>
                    <p>
                      <span className="font-bold">📍 Location:</span>{" "}
                      {event.location}
                    </p>
                    <p className="text-lg font-bold text-primary">
                      Fee: {event.eventFee > 0 ? `$${event.eventFee}` : "Free"}
                    </p>
                  </div>

                  {/* <div className="card-actions justify-end mt-6">
                    <Link
                      to={`/events/${event._id}`}
                      className="btn btn-primary btn-outline w-full"
                    >
                      View Details
                    </Link>
                  </div> */}
                  <div className="card-actions mt-6">
                    <Link
                      to={`/events/${event._id}`}
                      className="group relative flex items-center justify-between w-full bg-slate-900 hover:bg-blue-600 text-white p-4 rounded-xl transition-all duration-500 overflow-hidden shadow-lg shadow-slate-200"
                    >
                      {/* Button Text */}
                      <span className="font-bold text-sm z-10 transition-colors duration-300">
                        View Details
                      </span>

                      {/* Icon with Glass Effect */}
                      <div className="bg-white/20 p-1.5 rounded-lg z-10">
                        <FaArrowRight className="text-xs group-hover:translate-x-1 transition-transform duration-300" />
                      </div>

                      {/* Background Animation Circle (Modern Effect) */}
                      <div className="absolute top-0 right-0 w-16 h-16 bg-white/10 rounded-full -mr-8 -mt-8 transition-all duration-500 group-hover:scale-[7] pointer-events-none" />
                    </Link>
                  </div>
                </div>
              </div>
            ))
          : !isLoading && (
              <p className="text-center col-span-full text-2xl text-gray-400">
                No events found for this selection.
              </p>
            )}
      </div>
    </div>
  );
};

export default AllEvent;
