import React from "react";
import { FaTruckMoving } from "react-icons/fa";
const HowWorks = () => {
  const services = [
    {
      icon: <FaTruckMoving />, // You can replace with actual icon component or image
      title: "Booking Pick & Drop",
      descrip:
        "From personal packages to business shipments — we deliver on time, every time.",
    },
    {
      icon: <FaTruckMoving />,
      title: "Cash On Delivery",
      descrip:
        "From personal packages to business shipments — we deliver on time, every time.",
    },
    {
      icon: <FaTruckMoving />,
      title: "Delivery Hub",
      descrip:
        "From personal packages to business shipments — we deliver on time, every time.",
    },
    {
      icon: <FaTruckMoving />,
      title: "Booking SME & Corporate",
      descrip:
        "From personal packages to business shipments — we deliver on time, every time.",
    },
  ];
  return (
    <div>
      <h3 className="text-3xl font-bold">How it Works</h3>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 pb-8  ">
        {services.map((service, index) => {
          //   console.log(service.title);
          return (
            <div
              key={index}
              className="  rounded-3xl shadow-2xl p-5 text-center hover:bg-amber-200 hover:scale-105 transition-all "
            >
              <div className="text-4xl  mb-2">
                {service.icon}
              </div>
              <h4 className="text-xl font-bold mb-1">{service.title}</h4>
              <p className="text-sm text-gray-600"> {service.descrip} </p>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default HowWorks;
