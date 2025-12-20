import React from "react";
import { useQuery } from "@tanstack/react-query";
import useAuth from "../../Hooks/useAuth";
import useAxiosSecure from "../../Hooks/useAxiosSecure";
import {
  AreaChart,
  Area,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
  BarChart,
  Bar,
} from "recharts";
import { FaTicketAlt, FaCreditCard, FaCrown } from "react-icons/fa";
import Loading from "../../Components/Loading/Loading";

const UserDashboard = () => {
  const { user } = useAuth();
  const axiosSecure = useAxiosSecure();

  const { data: stats = {}, isLoading } = useQuery({
    queryKey: ["user-stats", user?.email],
    queryFn: async () =>
      (await axiosSecure.get(`/user-stats/${user?.email}`)).data,
    enabled: !!user?.email,
  });

  const activityData = [
    { month: "Jan", events: 1, spent: 50 },
    { month: "Feb", events: 3, spent: 150 },
    { month: "Mar", events: 2, spent: 100 },
    { month: "Apr", events: 5, spent: 250 },
    { month: "May", events: 4, spent: 200 },
    { month: "Jun", events: 6, spent: 300 },
  ];

  if (isLoading) return <Loading></Loading>;

  return (
    <div className="p-6 bg-[#F9FAFB] min-h-screen space-y-8">
      {/* Header */}
      <div className="flex justify-between items-center bg-white p-6 rounded-3xl shadow-sm border">
        <div>
          <h2 className="text-3xl font-black text-slate-800">
            Welcome, {user?.displayName?.split(" ")[0]}!
          </h2>
        </div>
        <div className="bg-blue-600 text-white p-3 rounded-xl flex items-center gap-2 shadow-lg">
          <FaCrown className="text-yellow-300" />{" "}
          <span className="font-bold text-xs uppercase">Premium</span>
        </div>
      </div>

      {/* Grid: Charts & Cards */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="lg:col-span-2 space-y-6">
          {/* Main Area Chart */}
          <div className="bg-white p-5 rounded-3xl border h-80">
            <h3 className="font-bold mb-4 text-slate-700">Spending Trend</h3>
            <ResponsiveContainer width="100%" height="85%">
              <AreaChart data={activityData}>
                <XAxis dataKey="month" hide />
                <YAxis hide />
                <Tooltip />
                <Area
                  type="monotone"
                  dataKey="spent"
                  stroke="#6366f1"
                  fill="#6366f133"
                  strokeWidth={3}
                />
              </AreaChart>
            </ResponsiveContainer>
          </div>

          {/* Mini Cards */}
          <div className="grid grid-cols-2 gap-4">
            <div className="bg-white p-5 rounded-2xl border flex items-center gap-4">
              <FaTicketAlt className="text-2xl text-blue-500" />
              <div>
                <p className="text-xs text-slate-400 font-bold">TICKETS</p>
                <h4 className="text-xl font-bold">
                  {stats.totalTickets || 12}
                </h4>
              </div>
            </div>
            <div className="bg-white p-5 rounded-2xl border flex items-center gap-4">
              <FaCreditCard className="text-2xl text-emerald-500" />
              <div>
                <p className="text-xs text-slate-400 font-bold">SPENT</p>
                <h4 className="text-xl font-bold">
                  ${stats.totalSpent || 450}
                </h4>
              </div>
            </div>
          </div>
        </div>

        {/* Right Bar Chart */}
        <div className="bg-white p-5 rounded-3xl border h-full">
          <h3 className="font-bold mb-4 text-slate-700">Events / Month</h3>
          <ResponsiveContainer width="100%" height={300}>
            <BarChart data={activityData} layout="vertical">
              <XAxis type="number" hide />
              <YAxis
                dataKey="month"
                type="category"
                tick={{ fontSize: 12 }}
                width={40}
                axisLine={false}
              />
              <Tooltip cursor={{ fill: "transparent" }} />
              <Bar
                dataKey="events"
                radius={[0, 10, 10, 0]}
                barSize={15}
                fill="#6366f1"
              />
            </BarChart>
          </ResponsiveContainer>
        </div>
      </div>
    </div>
  );
};

export default UserDashboard;
