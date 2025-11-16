import React from "react";
import Banner from "./Banner/Banner";
import HowWorks from "./HowWork/HowWorks";
import Brands from "./Brands/Brands";
import Reviews from "./Reviews/Reviews";
import OurService from "./OurService/OurService";

const reviewsPromise = fetch("/reviews.json").then((res) => res.json());
const servicesPromise = fetch("/services.json").then((res) => res.json());
const Home = () => {
  return (
    <div>
      <Banner></Banner>
      <HowWorks></HowWorks>
      <OurService servicesPromise={servicesPromise}></OurService>
      <Brands></Brands>
      <Reviews reviewsPromise={reviewsPromise}></Reviews>
    </div>
  );
};

export default Home;
