import { useQuery } from "@tanstack/react-query";
import useAxiosSecure from "../../Hooks/useAxiosSecure";

const AllPayments = () => {
  const axiosSecure = useAxiosSecure();

  const { data: revenueData = {}, isLoading } = useQuery({
    queryKey: ["all-payments"],
    queryFn: async () => {
      const res = await axiosSecure.get("/all-payments");
      return res.data;
    },
  });

  if (isLoading)
    return <div className="p-10 text-center text-2xl">Loading Stats...</div>;

  return (
    <div className="p-10">
      <h2 className="text-3xl font-bold mb-6">Payment Overview</h2>

      {/* Summary Card */}
      <div className="stats shadow bg-primary text-primary-content mb-8">
        <div className="stat">
          <div className="stat-title text-white">Total Revenue</div>
          <div className="stat-value text-4xl">
            ${revenueData.totalRevenue || 0}
          </div>
          <div className="stat-desc text-white">
            Total Transactions: {revenueData.totalCount}
          </div>
        </div>
      </div>

      {/* Payment Table */}
      <div className="overflow-x-auto bg-base-100 rounded-lg shadow">
        <table className="table w-full">
          <thead>
            <tr className="bg-gray-200">
              <th>#</th>
              <th>User Email</th>
              <th>Club/Event</th>
              <th>Amount</th>
              <th>Transaction ID</th>
              <th>Date</th>
            </tr>
          </thead>
          <tbody>
            {revenueData.payments?.map((payment, index) => (
              <tr key={payment._id}>
                <th>{index + 1}</th>
                <td>{payment.userEmail}</td>
                <td>{payment.clubName || "N/A"}</td>
                <td className="font-bold text-success">${payment.amount}</td>
                <td className="text-xs uppercase">{payment.transactionId}</td>
                <td>{new Date(payment.registeredAt).toLocaleDateString()}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default AllPayments;
