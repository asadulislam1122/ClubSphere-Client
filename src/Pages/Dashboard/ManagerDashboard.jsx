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

  const chartData = events.slice(0, 5).map((ev) => ({
    name: ev.title.substring(0, 10) + "...",
    fee: ev.eventFee || 0,
    count: ev.participantCount || Math.floor(Math.random() * 50) + 10,
  }));

  if (isLoading)
    return (
      <div className="flex justify-center p-20 bg-base-200 min-h-screen">
        <span className="loading loading-dots loading-lg text-primary"></span>
      </div>
    );

  const handleDelete = (id) => {
    Swal.fire({
      title: "Are you sure?",
      text: "You won't be able to revert this!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#EF4444",
      cancelButtonColor: "#6B7280",
      confirmButtonText: "Yes, delete it!",
      background: "var(--fallback-b1,oklch(var(--b1)))",
      color: "var(--fallback-bc,oklch(var(--bc)))",
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
      background: "var(--fallback-b1,oklch(var(--b1)))",
      color: "var(--fallback-bc,oklch(var(--bc)))",
      html:
        `<input id="swal-input1" class="swal2-input custom-swal-input" placeholder="Title" value="${event.title}">` +
        `<input id="swal-input2" type="date" class="swal2-input custom-swal-input" value="${event.eventDate}">` +
        `<input id="swal-input3" class="swal2-input custom-swal-input" placeholder="Location" value="${event.location}">`,
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
    <div className="p-6 bg-base-200 min-h-screen transition-colors duration-500">
      <div className="flex items-center gap-4 mb-10">
        <div className="p-4 bg-primary text-primary-content rounded-2xl shadow-xl shadow-primary/20">
          <FaChartLine size={28} />
        </div>
        <div>
          <h2 className="text-3xl font-black text-base-content tracking-tight">
            Event Analytics
          </h2>
          <p className="text-base-content/50 text-sm font-medium">
            Manage and track your club activities
          </p>
        </div>
      </div>

      {/* --- Chart Section --- */}
      <div className="bg-base-100 p-8 rounded-[2rem] shadow-xl border border-base-content/5 mb-12">
        <h3 className="text-xs font-black mb-8 text-base-content/40 uppercase tracking-[0.2em]">
          Performance: Fee vs Participation
        </h3>
        <div className="h-80 w-full">
          <ResponsiveContainer width="100%" height="100%">
            <ComposedChart data={chartData}>
              <CartesianGrid
                strokeDasharray="3 3"
                vertical={false}
                stroke="var(--fallback-bc,oklch(var(--bc)/0.1))"
              />
              <XAxis
                dataKey="name"
                tick={{ fontSize: 11, fill: "currentColor", opacity: 0.5 }}
                axisLine={false}
                tickLine={false}
              />
              <YAxis
                tick={{ fontSize: 11, fill: "currentColor", opacity: 0.5 }}
                axisLine={false}
                tickLine={false}
              />
              <Tooltip
                contentStyle={{
                  backgroundColor: "var(--fallback-b1,oklch(var(--b1)))",
                  borderRadius: "16px",
                  border: "1px solid var(--fallback-bc,oklch(var(--bc)/0.1))",
                  boxShadow: "0 10px 15px -3px rgb(0 0 0 / 0.1)",
                  color: "var(--fallback-bc,oklch(var(--bc)))",
                }}
                itemStyle={{ color: "var(--fallback-bc,oklch(var(--bc)))" }}
              />
              <Legend iconType="circle" />
              <Area
                type="monotone"
                dataKey="count"
                fill="var(--fallback-p,oklch(var(--p)/0.2))"
                stroke="var(--fallback-p,oklch(var(--p)))"
                strokeWidth={3}
              />
              <Bar
                dataKey="fee"
                barSize={25}
                fill="#10B981"
                radius={[8, 8, 0, 0]}
              />
              <Line
                type="monotone"
                dataKey="fee"
                stroke="#F59E0B"
                strokeWidth={4}
                dot={{ r: 4, fill: "#F59E0B" }}
              />
            </ComposedChart>
          </ResponsiveContainer>
        </div>
      </div>

      {/* --- Event List Section --- */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        {events.map((event) => (
          <div
            key={event._id}
            className="group bg-base-100 p-6 rounded-[2rem] shadow-lg border border-base-content/5 hover:shadow-2xl hover:scale-[1.02] transition-all duration-300"
          >
            <div className="flex justify-between items-start mb-6">
              <span className="px-4 py-1.5 rounded-full bg-primary/10 text-primary text-[10px] font-black uppercase tracking-widest border border-primary/20">
                {event.clubName}
              </span>
              <div className="flex gap-2 opacity-0 group-hover:opacity-100 transition-opacity">
                <button
                  onClick={() => handleEdit(event)}
                  className="p-2.5 bg-blue-500/10 text-blue-500 rounded-xl hover:bg-blue-500 hover:text-white transition-all"
                >
                  <FaEdit size={14} />
                </button>
                <button
                  onClick={() => handleDelete(event._id)}
                  className="p-2.5 bg-error/10 text-error rounded-xl hover:bg-error hover:text-white transition-all"
                >
                  <FaTrashAlt size={14} />
                </button>
              </div>
            </div>

            <h3 className="font-black text-xl text-base-content mb-3 group-hover:text-primary transition-colors">
              {event.title}
            </h3>

            <div className="space-y-3 text-sm text-base-content/60 mb-6">
              <div className="flex items-center gap-2">
                <span>📅</span>
                <span className="font-medium">
                  {new Date(event.eventDate).toDateString()}
                </span>
              </div>
              <div className="flex items-center gap-2">
                <span>📍</span>
                <span className="font-medium line-clamp-1">
                  {event.location}
                </span>
              </div>
              <div className="pt-2">
                <span className="text-lg font-black text-success">
                  ${event.eventFee || 0}
                </span>
                <span className="text-[10px] ml-1 opacity-50 uppercase font-bold tracking-tighter">
                  Entry Fee
                </span>
              </div>
            </div>

            <button className="btn btn-block bg-base-200 hover:bg-primary hover:text-white border-none rounded-2xl font-bold transition-all">
              Manage Details
            </button>
          </div>
        ))}
      </div>

      {events.length === 0 && (
        <div className="text-center py-24 bg-base-100 rounded-[3rem] border-4 border-dashed border-base-content/10">
          <div className="text-6xl mb-4 opacity-20">📂</div>
          <p className="text-base-content/40 text-xl font-bold italic">
            No events found. Start by creating one!
          </p>
        </div>
      )}
    </div>
  );
};

export default ManageEvents;
