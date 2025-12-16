import React, { useEffect, useState } from "react";
import { useSearchParams } from "react-router";
import useAxiosSecure from "../../../Hooks/useAxiosSecure";

const PaymentSuccessful = () => {
  const [searchParams] = useSearchParams();
  const [paymentInfo, setPaymentInfo] = useState({});
  const sessionId = searchParams.get("session_id");
  const axiosSecure = useAxiosSecure();
  console.log(sessionId);

  useEffect(() => {
    if (sessionId) {
      axiosSecure
        .patch(`/payment-success?session_id=${sessionId}`)
        .then((res) => {
          console.log(res.data);
          setPaymentInfo({
            transactionId: res.data.transactionId,
          });
        });
    }
  }, [sessionId, axiosSecure]);
  return (
    <div className="bg-fuchsia-200 mt-10 rounded-3xl w-150 mx-auto">
      <h2 className="text-primary text-3xl font-semibold text-center p-4">
        Payment Successfull
      </h2>
      <p className="text-center">🎉🎉🎉🎉🎉🎉🎉</p>
      <p className="font-semibold text-gray-700 text-center p-4">
        Your Transaction Id :{paymentInfo.transactionId}
      </p>
    </div>
  );
};

export default PaymentSuccessful;
