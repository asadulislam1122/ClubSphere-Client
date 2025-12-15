import React from "react";
import { Link } from "react-router";

const PaymentCencel = () => {
  return (
    <div className="">
      <h2 className="text-primary text-3xl font-semibold text-center p-8">
        Payment Canceled
      </h2>
      <div className="flex justify-center">
        <Link to={"/dashboard/my-club"} className="btn btn-error text-center  ">
          Try Again
        </Link>
      </div>
    </div>
  );
};

export default PaymentCencel;
