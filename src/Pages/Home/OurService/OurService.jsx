import React, { use } from "react";
import ServiceCard from "./ServiceCard";

const OurService = ({ servicesPromise }) => {
  const services = use(servicesPromise);
  console.log(services);
  return (
    <div className="rounded-3xl bg-secondary mb-5">
      <div className="text-center  text-white ">
        <h3 className="text-3xl text-center font-bold my-8 pt-5">
          Our Servises
        </h3>
        <p className=" px-10 lg:px-60">
          Lorem, ipsum dolor sit amet consectetur adipisicing elit. Non soluta,
          perspiciatis esse eius praesentium similique asperiores quasi veniam
          repellat architecto repellendus, deserunt accusantium, debitis ipsa.
          Expedita possimus facilis voluptas deserunt.
        </p>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5 px-20 py-10 ">
        {services.map((service) => (
          <ServiceCard key={service.id} service={service}></ServiceCard>
        ))}
      </div>
    </div>
  );
};

export default OurService;
