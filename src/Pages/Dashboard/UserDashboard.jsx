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
    <div className="p-6 bg-base-200 min-h-screen space-y-8 transition-colors duration-500">
      <title>Dashboard | {user?.displayName}</title>

      {/* Header Section */}
      <div className="flex flex-col md:flex-row justify-between items-center bg-base-100 p-8 rounded-[2rem] shadow-xl border border-base-content/5 gap-4">
        <div>
          <h2 className="text-3xl md:text-4xl font-black text-base-content">
            Welcome,{" "}
            <span className="text-primary">
              {user?.displayName?.split(" ")[0]}
            </span>
            !
          </h2>
          <p className="text-base-content/50 text-sm mt-1">
            Here's what's happening with your activities today.
          </p>
        </div>
        <div className="bg-primary text-primary-content px-6 py-3 rounded-2xl flex items-center gap-3 shadow-lg shadow-primary/20">
          <FaCrown className="text-yellow-400 text-lg" />{" "}
          <span className="font-black text-sm uppercase tracking-wider">
            Premium Member
          </span>
        </div>
      </div>

      {/* Grid: Charts & Cards */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        <div className="lg:col-span-2 space-y-8">
          {/* Spending Trend Area Chart */}
          <div className="bg-base-100 p-8 rounded-[2rem] border border-base-content/5 shadow-xl h-80">
            <h3 className="font-black mb-6 text-base-content/80 uppercase text-xs tracking-widest">
              Spending Trend
            </h3>
            <ResponsiveContainer width="100%" height="85%">
              <AreaChart data={activityData}>
                <defs>
                  <linearGradient id="colorSpent" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="#6366f1" stopOpacity={0.3} />
                    <stop offset="95%" stopColor="#6366f1" stopOpacity={0} />
                  </linearGradient>
                </defs>
                <XAxis dataKey="month" hide />
                <YAxis hide />
                <Tooltip
                  contentStyle={{
                    backgroundColor: "var(--fallback-b1,oklch(var(--b1)))",
                    borderRadius: "16px",
                    border: "none",
                    boxShadow: "0 10px 15px -3px rgb(0 0 0 / 0.1)",
                  }}
                  itemStyle={{ color: "var(--fallback-bc,oklch(var(--bc)))" }}
                />
                <Area
                  type="monotone"
                  dataKey="spent"
                  stroke="#6366f1"
                  fill="url(#colorSpent)"
                  strokeWidth={4}
                />
              </AreaChart>
            </ResponsiveContainer>
          </div>

          {/* Mini Stats Cards */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
            <div className="bg-base-100 p-6 rounded-3xl border border-base-content/5 shadow-lg flex items-center gap-5 hover:scale-[1.02] transition-transform">
              <div className="p-4 bg-blue-500/10 rounded-2xl">
                <FaTicketAlt className="text-3xl text-blue-500" />
              </div>
              <div>
                <p className="text-[10px] text-base-content/40 font-black uppercase tracking-tighter">
                  Total Tickets
                </p>
                <h4 className="text-3xl font-black text-base-content">
                  {stats.totalTickets || 12}
                </h4>
              </div>
            </div>

            <div className="bg-base-100 p-6 rounded-3xl border border-base-content/5 shadow-lg flex items-center gap-5 hover:scale-[1.02] transition-transform">
              <div className="p-4 bg-emerald-500/10 rounded-2xl">
                <FaCreditCard className="text-3xl text-emerald-500" />
              </div>
              <div>
                <p className="text-[10px] text-base-content/40 font-black uppercase tracking-tighter">
                  Total Spent
                </p>
                <h4 className="text-3xl font-black text-base-content">
                  ${stats.totalSpent || 450}
                </h4>
              </div>
            </div>
          </div>
        </div>

        {/* Vertical Bar Chart Section */}
        <div className="bg-base-100 p-8 rounded-[2rem] border border-base-content/5 shadow-xl">
          <h3 className="font-black mb-8 text-base-content/80 uppercase text-xs tracking-widest">
            Events Per Month
          </h3>
          <div className="h-[350px]">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={activityData} layout="vertical">
                <XAxis type="number" hide />
                <YAxis
                  dataKey="month"
                  type="category"
                  tick={{ fontSize: 12, fill: "currentColor", opacity: 0.5 }}
                  width={45}
                  axisLine={false}
                  tickLine={false}
                />
                <Tooltip
                  cursor={{
                    fill: "var(--fallback-b2,oklch(var(--b2)))",
                    opacity: 0.4,
                  }}
                  contentStyle={{
                    backgroundColor: "var(--fallback-b1,oklch(var(--b1)))",
                    borderRadius: "12px",
                    border: "none",
                  }}
                />
                <Bar
                  dataKey="events"
                  radius={[0, 20, 20, 0]}
                  barSize={12}
                  fill="#6366f1"
                />
              </BarChart>
            </ResponsiveContainer>
          </div>
          <div className="mt-6 p-4 bg-primary/5 rounded-2xl border border-primary/10 text-center">
            <p className="text-xs font-bold text-primary italic">
              "Consistency is the key to success!"
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default UserDashboard;
