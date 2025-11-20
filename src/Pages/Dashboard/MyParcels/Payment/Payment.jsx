import { useQuery } from "@tanstack/react-query";
import React from "react";
import { useParams } from "react-router";
import useAxiosSecure from "../../../../Hooks/useAxiosSecure";

const Payment = () => {
  const { parcelId } = useParams();
  const axiosSecure = useAxiosSecure();
  const { isLoading, data: parcel } = useQuery({
    queryKey: ["parcels", parcelId],
    queryFn: async () => {
      const res = await axiosSecure.get(`/parcels/${parcelId}`);
      return res.data;
    },
  });

  const handlePayment = async () => {
    const paymentinfo = {
      //! Distructure Backend er api te element er name onujai
      cost: parcel.cost,
      parcelId: parcel._id,
      senderEmail: parcel.senderEmail,
      parcelName: parcel.parcelName,
    };
    const res = await axiosSecure.post("/create-checkout-session", paymentinfo);
    console.log(res.data);
    // navigate payment page
    window.location.href =res.data.url
  };

  if (isLoading) {
    return (
      <div>
        <span className="loading loading-infinity loading-xl"></span>;
      </div>
    );
  }

  return (
    <div>
      <h1>
        Please Pay ${parcel.cost} for: {parcel.parcelName}
      </h1>
      <button onClick={handlePayment} className="btn btn-primary text-black">
        Pay
      </button>
    </div>
  );
};

export default Payment;
<h1>Plax may</h1>;
