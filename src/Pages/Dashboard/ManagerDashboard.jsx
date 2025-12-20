import { useQuery } from "@tanstack/react-query";
import useAuth from "../../Hooks/useAuth";
import useAxiosSecure from "../../Hooks/useAxiosSecure";
import Swal from "sweetalert2";
import {
  ComposedChart,
  Line,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
  Area,
} from "recharts";
import { FaEdit, FaTrashAlt, FaChartLine } from "react-icons/fa";

const ManageEvents = () => {
  const { user } = useAuth();
  const axiosSecure = useAxiosSecure();

  const {
    data: events = [],
    isLoading,
    refetch,
  } = useQuery({
    queryKey: ["manager-events", user?.email],
    queryFn: async () => {
      const res = await axiosSecure.get(`/manageEvents?email=${user?.email}`);
      return res.data;
    },
    enabled: !!user?.email,
  });

  // চার্টের জন্য ডেটা তৈরি করা (টপ ৫টি ইভেন্ট ফি অনুযায়ী)
  const chartData = events.slice(0, 5).map((ev) => ({
    name: ev.title.substring(0, 10) + "...",
    fee: ev.eventFee || 0,
    count: ev.participantCount || Math.floor(Math.random() * 50) + 10, // ডামি বা আসল কাউন্ট
  }));

  if (isLoading)
    return (
      <div className="flex justify-center p-20">
        <span className="loading loading-dots loading-lg text-primary"></span>
      </div>
    );

  // handleDelete এবং handleEdit ফাংশন আগের মতোই থাকবে...
  const handleDelete = (id) => {
    Swal.fire({
      title: "Are you sure?",
      text: "You won't be able to revert this!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#EF4444",
      confirmButtonText: "Yes, delete it!",
    }).then(async (result) => {
      if (result.isConfirmed) {
        const res = await axiosSecure.delete(`/events/${id}`);
        if (res.data.deletedCount > 0) {
          refetch();
          Swal.fire("Deleted!", "Event has been removed.", "success");
        }
      }
    });
  };

  const handleEdit = async (event) => {
    const { value: formValues } = await Swal.fire({
      title: "Update Event",
      html:
        `<input id="swal-input1" class="swal2-input" placeholder="Title" value="${event.title}">` +
        `<input id="swal-input2" type="date" class="swal2-input" value="${event.eventDate}">` +
        `<input id="swal-input3" class="swal2-input" placeholder="Location" value="${event.location}">`,
      focusConfirm: false,
      showCancelButton: true,
      preConfirm: () => {
        return {
          title: document.getElementById("swal-input1").value,
          eventDate: document.getElementById("swal-input2").value,
          location: document.getElementById("swal-input3").value,
        };
      },
    });

    if (formValues) {
      const res = await axiosSecure.patch(`/events/${event._id}`, formValues);
      if (res.data.modifiedCount > 0) {
        refetch();
        Swal.fire("Success", "Event updated!", "success");
      }
    }
  };

  return (
    <div className="p-6 bg-gray-50 min-h-screen">
      <div className="flex items-center gap-3 mb-8">
        <div className="p-3 bg-primary text-white rounded-lg shadow-lg">
          <FaChartLine size={24} />
        </div>
        <h2 className="text-3xl font-bold text-gray-800">
          Event Analytics & Management
        </h2>
      </div>

      {/* --- Chart Section --- */}
      <div className="bg-white p-6 rounded-2xl shadow-sm border mb-10">
        <h3 className="text-lg font-semibold mb-6 text-gray-600 italic">
          Quick Insights: Fee vs Participation
        </h3>
        <div className="h-72 w-full">
          <ResponsiveContainer width="100%" height="100%">
            <ComposedChart data={chartData}>
              <CartesianGrid stroke="#f5f5f5" vertical={false} />
              <XAxis dataKey="name" scale="point" tick={{ fontSize: 12 }} />
              <YAxis tick={{ fontSize: 12 }} />
              <Tooltip
                contentStyle={{
                  borderRadius: "10px",
                  border: "none",
                  boxShadow: "0 4px 12px rgba(0,0,0,0.1)",
                }}
              />
              <Legend />
              <Area
                type="monotone"
                dataKey="count"
                fill="#E0E7FF"
                stroke="#4F46E5"
              />
              <Bar
                dataKey="fee"
                barSize={30}
                fill="#10B981"
                radius={[5, 5, 0, 0]}
              />
              <Line
                type="monotone"
                dataKey="fee"
                stroke="#F59E0B"
                strokeWidth={3}
              />
            </ComposedChart>
          </ResponsiveContainer>
        </div>
      </div>

      {/* --- Event List Section --- */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {events.map((event) => (
          <div
            key={event._id}
            className="group bg-white p-5 rounded-xl shadow-sm border hover:shadow-md transition-all duration-300"
          >
            <div className="flex justify-between items-start mb-4">
              <span className="badge badge-primary badge-outline text-xs uppercase font-bold tracking-wider">
                {event.clubName}
              </span>
              <div className="flex gap-1 opacity-0 group-hover:opacity-100 transition-opacity">
                <button
                  onClick={() => handleEdit(event)}
                  className="p-2 bg-blue-50 text-blue-600 rounded-lg hover:bg-blue-600 hover:text-white transition-colors"
                >
                  <FaEdit />
                </button>
                <button
                  onClick={() => handleDelete(event._id)}
                  className="p-2 bg-red-50 text-red-600 rounded-lg hover:bg-red-600 hover:text-white transition-colors"
                >
                  <FaTrashAlt />
                </button>
              </div>
            </div>

            <h3 className="font-bold text-xl text-gray-800 mb-2">
              {event.title}
            </h3>
            <div className="space-y-1 text-sm text-gray-500 mb-4">
              <p>📅 {new Date(event.eventDate).toDateString()}</p>
              <p>📍 {event.location}</p>
              <p className="font-semibold text-primary">
                Fee: ${event.eventFee || 0}
              </p>
            </div>

            <button className="btn btn-sm btn-block btn-ghost border-gray-200 group-hover:bg-primary group-hover:text-white">
              Details
            </button>
          </div>
        ))}
      </div>

      {events.length === 0 && (
        <div className="text-center py-20 bg-white rounded-2xl border-2 border-dashed">
          <p className="text-gray-400 text-lg">
            No events found. Start by creating one!
          </p>
        </div>
      )}
    </div>
  );
};

export default ManageEvents;
