import React from "react";
import serImg from "../../../assets/service.png"
const ServiceCard = ({ service }) => {
  const { image, title, description } = service;
  return (
    <div className="bg-base-100 hover:bg-primary hover:scale-105 transition-transform duration-500 shadow-xl rounded-lg p-6 max-w-md mx-auto text-center"
>
      {/* Image */}
      <div className="flex justify-center mb-4">
        <img src={serImg} alt={title} className="w-15 h-15 object-contain" />
      </div>

      {/* Title */}
      <h3 className="text-xl font-bold mb-2">{title}</h3>

      {/* Description */}
      <p className="text-gray-600 text-sm">{description}</p>
    </div>
  );
};

export default ServiceCard;
