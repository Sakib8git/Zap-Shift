import React from "react";
import { Link } from "react-router";

const PaymentCancel = () => {
  return (
    <div>
      <h4 className="text-4xl text-red-500">Payment Cancel</h4>
      <Link to="/dashboard/my-parcels">
        <button className="btn btn-error">Try Again</button>
      </Link>
    </div>
  );
};

export default PaymentCancel;
