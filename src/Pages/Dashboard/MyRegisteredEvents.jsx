import React from "react";
import { useQuery } from "@tanstack/react-query";
import useAxiosSecure from "../../Hooks/useAxiosSecure";
import useAuth from "../../Hooks/useAuth";

const MyRegisteredEvents = () => {
  const { user } = useAuth();
  const axiosSecure = useAxiosSecure();

  // ১. ইউজারের ইমেইল দিয়ে তার রেজিস্টার করা ইভেন্টগুলো ফেচ করা
  const { data: myEvents = [], isLoading } = useQuery({
    queryKey: ["my-registered-events", user?.email],
    queryFn: async () => {
      const res = await axiosSecure.get(
        `/my-event-registrations?email=${user?.email}`
      );
      return res.data;
    },
  });

  if (isLoading)
    return (
      <div className="text-center mt-10">
        <span className="loading loading-spinner text-primary"></span>
      </div>
    );

  return (
    <div className="p-6">
      <title>My-Registered-Events</title>
      <h2 className="text-3xl font-bold mb-6 text-center">
        My Registered Events
      </h2>

      <div className="overflow-x-auto bg-white rounded-lg shadow-md border">
        <table className="table w-full">
          {/* টেবিল হেড */}
          <thead className="bg-primary text-white text-lg">
            <tr>
              <th>#</th>
              <th>Event Title</th>
              <th>Club Name</th>
              <th>Event Date</th>
              <th>Status</th>
            </tr>
          </thead>
          <tbody>
            {myEvents.length > 0 ? (
              myEvents.map((event, index) => (
                <tr key={event._id} className="hover:bg-gray-50">
                  <th>{index + 1}</th>
                  <td className="font-semibold text-primary">
                    {event.eventTitle}
                  </td>
                  <td>{event.clubName || "N/A"}</td>
                  <td>{new Date(event.eventDate).toLocaleDateString()}</td>
                  <td>
                    <span
                      className={`badge ${
                        event.status === "registered"
                          ? "badge-success"
                          : "badge-warning"
                      } text-white`}
                    >
                      {event.status}
                    </span>
                  </td>
                </tr>
              ))
            ) : (
              <tr>
                <td
                  colSpan="5"
                  className="text-center py-10 text-xl text-gray-400"
                >
                  You haven't registered for any events yet.
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default MyRegisteredEvents;
