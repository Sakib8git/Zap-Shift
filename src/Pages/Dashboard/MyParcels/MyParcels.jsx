import React from "react";
import { useQuery } from "@tanstack/react-query";
import useAuth from "../../../Hooks/useAuth";
import useAxiosSecure from "../../../Hooks/useAxiosSecure";
import { CiEdit } from "react-icons/ci";
import { MdDeleteOutline } from "react-icons/md";
import { FaMagnifyingGlass } from "react-icons/fa6";
import Swal from "sweetalert2";
import { Link } from "react-router";
const MyParcels = () => {
  const { user } = useAuth();
  const axiosSecure = useAxiosSecure();
  // tanstack query
  // refetch use kora hoiche delete er por jno UI update hoy

  const { data: parcels = [], refetch } = useQuery({
    queryKey: ["myParcels", user?.email],
    queryFn: async () => {
      const res = await axiosSecure.get(`/parcels?email=${user.email}`);
      return res.data;
    },
  });

  const handleParcelDelete = (id) => {
    console.log(id);
    Swal.fire({
      title: "Are you sure?",
      text: "You won't be able to revert this!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Yes, delete it!",
    }).then((result) => {
      if (result.isConfirmed) {
        axiosSecure.delete(`/parcels/${id}`).then((res) => {
          console.log(res.data);

          if (res.data.deletedCount) {
            // refresh data in ui
            refetch();
            Swal.fire({
              title: "Deleted!",
              text: "Your Parcel has been deleted.",
              icon: "success",
            });
          }
        });
      }
    });
  };

  const handlePayment = async (parcel) => {
    const paymentInfo = {
      cost: parcel.cost,
      parcelId: parcel._id,
      senderEmail: parcel.senderEmail,
      parcelName: parcel.parcelName,
    };
    const res = await axiosSecure.post(
      "/payment-checkout-session",
      paymentInfo
    );
    window.location.assign(res.data.url);
    console.log(res.data.url);
  };

  return (
    <div>
      MyParcels: {parcels.length}
      <div className="overflow-x-auto">
        <table className="table table-zebra">
          {/* head */}
          <thead>
            <tr>
              <th>Num</th>
              <th>Name</th>
              <th>Cost</th>
              <th>Payment </th>
              <th>Delivary Status</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {parcels.map((parcel, i) => (
              <tr key={i}>
                <th>{i + 1}</th>
                <td>{parcel.parcelName}</td>
                <td>{parcel.cost}</td>
                
                <td>
                  {parcel.paymentStatus ? (
                    <span className="text-green-500">{parcel.paymentStatus}</span>
                  ) : (
                    <button
                      onClick={() => {
                        handlePayment(parcel);
                      }}
                      className="btn btn-sm btn-primary text-black"
                    >
                      pay
                    </button>

                    // <Link to={`/dashboard/payment/${parcel._id}`}>
                    //   <button className="btn btn-sm btn-primary text-black">
                    //     pay
                    //   </button>
                    // </Link>
                  )}
                </td>
                <td>{parcel.delicaryStatus}</td>
                <td>
                  <button className="btn btn-square hover:bg-primary ">
                    <CiEdit />
                  </button>
                  <button className="btn btn-square hover:bg-primary mx-2">
                    <FaMagnifyingGlass />
                  </button>
                  <button
                    onClick={() => {
                      handleParcelDelete(parcel._id);
                    }}
                    className="btn btn-square hover:bg-primary"
                  >
                    <MdDeleteOutline />
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default MyParcels;
