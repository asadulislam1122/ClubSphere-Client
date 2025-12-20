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
    <div className="p-6 bg-gray-50 min-h-screen">
      <h2 className="text-3xl font-bold mb-8 text-pink-500">Admin Analytics</h2>

      {/* Summary Cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-10">
        <div className="stat bg-white shadow-md rounded-xl border-l-4 border-primary">
          <div className="stat-title uppercase text-xs font-bold">
            Total Revenue
          </div>
          <div className="stat-value text-primary">
            ${revenueData.totalRevenue || 0}
          </div>
          <div className="stat-desc">All time earnings</div>
        </div>

        <div className="stat bg-white shadow-md rounded-xl border-l-4 border-secondary">
          <div className="stat-title uppercase text-xs font-bold">
            Total Transactions
          </div>
          <div className="stat-value text-secondary">
            {revenueData.totalCount || 0}
          </div>
          <div className="stat-desc">Successfully processed</div>
        </div>

        <div className="stat bg-white shadow-md rounded-xl border-l-4 border-accent">
          <div className="stat-title uppercase text-xs font-bold">
            Active Users
          </div>
          <div className="stat-value text-accent">--</div>{" "}
          {/* আপনার API থেকে আসলে বসাবেন */}
          <div className="stat-desc">Users with payments</div>
        </div>
      </div>

      {/* Charts Section */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-10">
        <div className="bg-white p-6 rounded-xl shadow-md">
          <h3 className="text-lg font-semibold mb-4 text-gray-700">
            Recent Revenue Trend
          </h3>
          <div className="h-[300px] w-full">
            <ResponsiveContainer width="100%" height="100%">
              <AreaChart data={chartData}>
                <CartesianGrid strokeDasharray="3 3" vertical={false} />
                <XAxis dataKey="name" />
                <YAxis />
                <Tooltip />
                <Area
                  type="monotone"
                  dataKey="amount"
                  stroke="#570df8"
                  fill="#570df8"
                  fillOpacity={0.1}
                />
              </AreaChart>
            </ResponsiveContainer>
          </div>
        </div>

        <div className="bg-white p-6 rounded-xl shadow-md">
          <h3 className="text-lg font-semibold mb-4 text-gray-700">
            Transaction Breakdown
          </h3>
          <div className="h-[300px] w-full">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={chartData}>
                <CartesianGrid strokeDasharray="3 3" vertical={false} />
                <XAxis dataKey="name" />
                <YAxis />
                <Tooltip cursor={{ fill: "#f3f4f6" }} />
                <Bar dataKey="amount" fill="#f000b8" radius={[4, 4, 0, 0]} />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AdminDashboard;
