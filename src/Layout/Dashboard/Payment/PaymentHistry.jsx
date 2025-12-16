import { useQuery } from "@tanstack/react-query";
import React from "react";
import useAuth from "../../../Hooks/useAuth";
import useAxiosSecure from "../../../Hooks/useAxiosSecure";

const PaymentHistry = () => {
  const { user } = useAuth();
  const axiosSecure = useAxiosSecure();
  const { data: payments = [] } = useQuery({
    queryKey: ["payments", user.email],
    queryFn: async () => {
      const res = await axiosSecure.get(`/payments?email=${user.email}`);
      return res.data;
    },
  });
  //   console.log(payments);
  return (
    <div>
      <h2 className="text-3xl text-center p-4 text-primary font-semibold">
        Payment History: {payments.length}
      </h2>
      <div className="overflow-x-auto">
        <table className="table table-zebra">
          {/* head */}
          <thead>
            <tr>
              <th>No</th>
              <th>Club Name</th>
              <th>User Email</th>
              <th>Amount</th>
              <th>Transation Id</th>
              <th>Date</th>
              <th>Status</th>
            </tr>
          </thead>
          <tbody>
            {payments.map((payment, i) => (
              <tr key={payment._id}>
                <th>{i + 1}</th>
                <td>{payment.clubName}</td>
                <td>{payment.userEmail}</td>
                <td>{payment.amount / 100} Taka </td>
                <td>{payment.transactionId}</td>
                <td>{new Date(payment.createdAt).toLocaleString()}</td>
                <td className="btn btn-secondary btn-sm">{payment.status}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default PaymentHistry;
