import { useQuery } from "@tanstack/react-query";
import useAxiosSecure from "../../Hooks/useAxiosSecure";
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  AreaChart,
  Area,
} from "recharts";
import Loading from "../../Components/Loading/Loading";

const AdminDashboard = () => {
  const axiosSecure = useAxiosSecure();

  const { data: revenueData = {}, isLoading } = useQuery({
    queryKey: ["all-payments"],
    queryFn: async () => {
      const res = await axiosSecure.get("/all-payments");
      return res.data;
    },
  });

  if (isLoading) return <Loading></Loading>;

  const chartData =
    revenueData.payments?.slice(-7).map((payment) => ({
      name: new Date(payment.registeredAt).toLocaleDateString(undefined, {
        day: "numeric",
        month: "short",
      }),
      amount: payment.amount,
    })) || [];

  return (
    // bg-base-200 এবং text-base-content থিম অনুযায়ী অ্যাডজাস্ট হবে
    <div className="p-6 min-h-screen bg-base-200 transition-colors duration-500">
      <h2 className="text-3xl font-black mb-8 text-secondary">
        Admin Analytics
      </h2>

      {/* Summary Cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-10">
        <div className="stat bg-base-100 shadow-xl rounded-2xl border-l-4 border-primary">
          <div className="stat-title uppercase text-[10px] font-black tracking-widest text-base-content/60">
            Total Revenue
          </div>
          <div className="stat-value text-primary">
            ${revenueData.totalRevenue || 0}
          </div>
          <div className="stat-desc text-base-content/50">
            All time earnings
          </div>
        </div>

        <div className="stat bg-base-100 shadow-xl rounded-2xl border-l-4 border-secondary">
          <div className="stat-title uppercase text-[10px] font-black tracking-widest text-base-content/60">
            Total Transactions
          </div>
          <div className="stat-value text-secondary">
            {revenueData.totalCount || 0}
          </div>
          <div className="stat-desc text-base-content/50">
            Successfully processed
          </div>
        </div>

        <div className="stat bg-base-100 shadow-xl rounded-2xl border-l-4 border-accent">
          <div className="stat-title uppercase text-[10px] font-black tracking-widest text-base-content/60">
            Active Users
          </div>
          <div className="stat-value text-accent">--</div>
          <div className="stat-desc text-base-content/50">
            Users with payments
          </div>
        </div>
      </div>

      {/* Charts Section */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-10">
        {/* Area Chart */}
        <div className="bg-base-100 p-6 rounded-2xl shadow-xl border border-base-content/5">
          <h3 className="text-lg font-bold mb-6 text-base-content/80">
            Recent Revenue Trend
          </h3>
          <div className="h-[300px] w-full">
            <ResponsiveContainer width="100%" height="100%">
              <AreaChart data={chartData}>
                <defs>
                  <linearGradient id="colorAmt" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="#570df8" stopOpacity={0.3} />
                    <stop offset="95%" stopColor="#570df8" stopOpacity={0} />
                  </linearGradient>
                </defs>
                {/* ডার্ক মোডে গ্রিড লাইন হালকা দেখানোর জন্য opacity ব্যবহার করা হয়েছে */}
                <CartesianGrid
                  strokeDasharray="3 3"
                  vertical={false}
                  strokeOpacity={0.1}
                />
                <XAxis
                  dataKey="name"
                  stroke="currentColor"
                  fontSize={12}
                  tickLine={false}
                  axisLine={false}
                  className="fill-base-content/60"
                />
                <YAxis
                  stroke="currentColor"
                  fontSize={12}
                  tickLine={false}
                  axisLine={false}
                  className="fill-base-content/60"
                />
                <Tooltip
                  contentStyle={{
                    backgroundColor: "var(--fallback-b1,oklch(var(--b1)))",
                    borderRadius: "12px",
                    border: "none",
                    boxShadow: "0 10px 15px -3px rgb(0 0 0 / 0.1)",
                  }}
                  itemStyle={{ color: "var(--fallback-bc,oklch(var(--bc)))" }}
                />
                <Area
                  type="monotone"
                  dataKey="amount"
                  stroke="#570df8"
                  fillOpacity={1}
                  fill="url(#colorAmt)"
                />
              </AreaChart>
            </ResponsiveContainer>
          </div>
        </div>

        {/* Bar Chart */}
        <div className="bg-base-100 p-6 rounded-2xl shadow-xl border border-base-content/5">
          <h3 className="text-lg font-bold mb-6 text-base-content/80">
            Transaction Breakdown
          </h3>
          <div className="h-[300px] w-full">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={chartData}>
                <CartesianGrid
                  strokeDasharray="3 3"
                  vertical={false}
                  strokeOpacity={0.1}
                />
                <XAxis
                  dataKey="name"
                  stroke="currentColor"
                  fontSize={12}
                  tickLine={false}
                  axisLine={false}
                  className="fill-base-content/60"
                />
                <YAxis
                  stroke="currentColor"
                  fontSize={12}
                  tickLine={false}
                  axisLine={false}
                  className="fill-base-content/60"
                />
                <Tooltip
                  cursor={{ fill: "rgba(0,0,0,0.05)" }}
                  contentStyle={{
                    backgroundColor: "var(--fallback-b1,oklch(var(--b1)))",
                    borderRadius: "12px",
                    border: "none",
                  }}
                />
                <Bar dataKey="amount" fill="#f000b8" radius={[6, 6, 0, 0]} />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AdminDashboard;
