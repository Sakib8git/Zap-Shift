import React, { use } from "react";
import { useForm, useWatch } from "react-hook-form";
import { useLoaderData, useNavigate } from "react-router";
import Swal from "sweetalert2";
import useAxiosSecure from "../../Hooks/useAxiosSecure";
import useAuth from "../../Hooks/useAuth";

const SendParcel = () => {
  const {
    register,
    handleSubmit,
    control,
    //formState: { errors },
  } = useForm();
  //   {
  //   defaultValues: {
  //     parcelType: "document", // ✅ safe default
  //   },
  // }
  const { user } = useAuth();

  // axios----------------
  const axiosSecure = useAxiosSecure();
  const navigate = useNavigate();
  const serviceCenters = useLoaderData();
  const regionsDuplicate = serviceCenters.map((c) => c.region);
  const regions = [...new Set(regionsDuplicate)];
  console.log(regions);
  const senderRegion = useWatch({ control, name: "senderRegion" });
  const receiverRegion = useWatch({ control, name: "receiverRegion" });
  // ----------------------------------------

  //!   parameter hisabe region nibe
  const districtByRegion = (region) => {
    //! filter kore district ber korbe oi region er
    //! amar dewa region === jodi database er reion er sathe mile tahole store koro
    const regionDistricts = serviceCenters.filter((c) => c.region === region);
    //! oitakeregion e store koro
    const districts = regionDistricts.map((d) => d.district);
    return districts;
  };

  const handleSendParcel = (data) => {
    console.log(data);
    const isDocument = data.parcelType === "document";
    const isSameDistricr = data.senderDistrict === data.receiverDistrict;
    const parcelWeight = parseFloat(data.parcelWeight);
    let cost = 0;
    if (isDocument) {
      cost = isSameDistricr ? 60 : 80;
    } else {
      if (parcelWeight < 3) {
        cost = isSameDistricr ? 110 : 150;
      } else {
        const minCharge = isSameDistricr ? 110 : 150;
        const extraWeight = parcelWeight - 3;
        const extraCharge = isSameDistricr
          ? extraWeight * 40
          : extraWeight * 40 + 40;

        cost = minCharge + extraCharge;
        Swal.fire({
          title: "Agree with the cost?",
          text: `Your cost is ${cost} TK`,
          icon: "warning",
          showCancelButton: true,
          confirmButtonColor: "#3085d6",
          cancelButtonColor: "#d33",
          confirmButtonText: "Confirm!",
        }).then((result) => {
          if (result.isConfirmed) {
            // if agree
            // .send DB........................
            axiosSecure.post("/parcels", data).then((res) => {
              console.log("DB saving", res.data);
              if (res.data.insertedId) {
                navigate("/dashboard/my-parcels");
                Swal.fire({
                  position: "top-end",
                  icon: "success",
                  title: "Parcel has created. Please Pay",
                  showConfirmButton: false,
                  timer: 2500,
                });
              }
            });
          }
        });
      }
    }
    console.log(cost);
    data.cost = cost;
    console.log("Parcel Type:", data.parcelType);
  };

  return (
    <div>
      <h2 className="text-5xl font-bold">Send a Percel</h2>
      <div>
        <form
          className="mt-12 p-4 text-black"
          onSubmit={handleSubmit(handleSendParcel)}
        >
          {/* parcel type */}
          <div className="">
            <lable className="label mr-4">
              <input
                type="radio"
                value="document"
                {...register("parcelType", { required: true })}
              />
              Document
            </lable>
            <lable className="label">
              <input
                type="radio"
                value="non-document"
                {...register("parcelType", { required: true })}
              />
              Non-Document
            </lable>
          </div>
          {/* percel info */}
          <div className="grid grid-cols-1 md:grid-cols-2  gap-12 my-8">
            <fieldset className="fieldset">
              <label className="label">Parcel Name</label>
              <input
                type="text"
                {...register("parcelName")}
                className="input w-full"
                placeholder="Parcel Name"
              />
            </fieldset>
            <fieldset className="fieldset">
              <label className="label">Parcel Weight (.KG)</label>
              <input
                type="number"
                {...register("parcelWeight")}
                className="input w-full"
                placeholder="Parcel Weight"
              />
            </fieldset>
          </div>
          {/* two column */}

          <div className=" grid grid-cols-1 md:grid-cols-2 gap-12">
            {/* send info */}
            <fieldset className="fieldset ">
              <h4 className="text-2xl font-semibold">Sender Info</h4>
              {/* name------------------ */}
              <label className="label ">Sender Name</label>
              <input
                type="text"
                {...register("senderName")}
                className="input w-full "
                defaultValue={user?.displayName}
                placeholder="Sender Name"
              />
              {/* email------------------ */}
              <label className="label ">Sender Email</label>
              <input
                type="email"
                {...register("senderEmail")}
                defaultValue={user?.email}
                className="input w-full "
                placeholder="Sender Email"
              />
              {/*! Address --------------*/}
              <label className="label mt-4 ">Sender Address</label>
              <input
                type="text"
                {...register("senderAddress")}
                className="input w-full"
                placeholder="Sender Address"
              />
              {/*! phone --------------*/}
              <label className="label mt-4 ">Sender Number</label>
              <input
                type="number"
                {...register("senderNumber")}
                className="input w-full"
                placeholder="Sender Number"
              />
              {/* ---------sender region--------- */}
              <fieldset className="fieldset">
                <legend className="fieldset-legend">Sender Region</legend>
                <select
                  {...register("senderRegion")}
                  defaultValue="Pick a Region"
                  className="select"
                >
                  <option disabled={true}>Pick a Region</option>
                  {regions.map((r, i) => (
                    <option key={i} value={r}>
                      {r}
                    </option>
                  ))}
                </select>
              </fieldset>

              {/* ----------------------------------- */}
              {/*! district --------------*/}
              <fieldset className="fieldset">
                <legend className="fieldset-legend">Sender District</legend>
                <select
                  {...register("senderDistrict")}
                  defaultValue="Pick a District"
                  className="select"
                >
                  <option disabled={true}>Pick a District</option>
                  {districtByRegion(senderRegion).map((r, i) => (
                    <option key={i} value={r}>
                      {r}
                    </option>
                  ))}
                </select>
              </fieldset>

              {/* ----------------------------------- */}
            </fieldset>
            {/* receiver info */}
            <fieldset className="fieldset ">
              <h4 className="text-2xl font-semibold">Receiver Info</h4>
              {/* name------------------ */}
              <label className="label ">Receiver Name</label>
              <input
                type="text"
                {...register("receiverName")}
                className="input w-full "
                placeholder="Receiver Name"
              />
              {/* email------------------ */}
              <label className="label ">Receiver Email</label>
              <input
                type="email"
                {...register("receiverEmail")}
                className="input w-full "
                placeholder="Receiver Email"
              />

              {/*! district --------------*/}
              {/*note: ---------receiver region--------- */}
              <fieldset className="fieldset">
                <legend className="fieldset-legend">Receiver Region</legend>
                <select
                  {...register("receiverRegion")}
                  defaultValue="Pick a Region"
                  className="select"
                >
                  <option disabled={true}>Pick a Region</option>
                  {regions.map((r, i) => (
                    <option key={i} value={r}>
                      {r}
                    </option>
                  ))}
                </select>
                <span className="label">Optional</span>
              </fieldset>
              {/*note: ---receiver district--------- */}
              <fieldset className="fieldset">
                <legend className="fieldset-legend">Receiver District</legend>
                <select
                  {...register("receiverDistrict")}
                  defaultValue=""
                  className="select"
                >
                  <option disabled value="">
                    Pick a District
                  </option>
                  {receiverRegion &&
                    districtByRegion(receiverRegion).map((d, i) => (
                      <option key={i} value={d}>
                        {d}
                      </option>
                    ))}
                </select>
                <span className="label">Optional</span>
              </fieldset>

              {/*! Address --------------*/}
              <label className="label mt-4 ">Receiver Address</label>
              <input
                type="text"
                {...register("receiverAddress")}
                className="input w-full"
                placeholder="Receiver Address"
              />
              {/*! phone --------------*/}
              <label className="label mt-4 ">Receiver Number</label>
              <input
                type="number"
                {...register("receiverNumber")}
                className="input w-full"
                placeholder="Receiver Number"
              />
            </fieldset>
          </div>
          <input
            type="submit"
            className="btn btn-primary text-black"
            value="Send Parcel"
          />
        </form>
      </div>
    </div>
  );
};

export default SendParcel;
