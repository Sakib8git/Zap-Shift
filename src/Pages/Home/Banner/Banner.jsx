import React from "react";
import { Carousel } from "react-responsive-carousel";
import "react-responsive-carousel/lib/styles/carousel.min.css";
import banImg1 from "../../../assets/banner/banner1.png";
import banImg2 from "../../../assets/banner/banner2.png";
import banImg3 from "../../../assets/banner/banner3.png";
const Banner = () => {
  return (
    <div>
      <Carousel autoPlay={true}>
         <div className="relative">
          <img src={banImg1} alt="" className="w-full h-auto" />
          <div className="absolute bottom-20   left-20">
            <p className="mb-3">
              Lorem ipsum dolor sit amet consectetur adipisicing elit. Dolorum,
              obcaecati!
            </p>
            <div className=" absolute max-w-55 text-xl bg-primary shadow-2xl  text-black z-50 p-3 rounded-full">
              <h3>Track your Parcel</h3>
            </div>
          </div>
        </div>
        <div>
          <img src={banImg2} alt="" />
        </div>
        <div className="relative">
          <img src={banImg3} alt="" className="w-full h-auto" />
          <div className="absolute bottom-30   left-20">
            <p className="mb-3">
              Lorem ipsum dolor sit amet consectetur adipisicing elit. Dolorum,
              obcaecati!
            </p>
            <div className=" absolute max-w-55 text-xl bg-primary shadow-2xl  text-black z-50 p-3 rounded-full">
              <h3>Track your Parcel</h3>
            </div>
          </div>
        </div>
      </Carousel>
    </div>
  );
};

export default Banner;
