import { use } from "react";
import ReviewsCard from "./ReviewsCard";
import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay, EffectCoverflow, Pagination } from "swiper/modules";

const Reviews = ({ reviewsPromise }) => {
  const reviews = use(reviewsPromise);
  console.log(reviews);

  return (
    <div className="my-24">
      <div className="text-center mb-24">
        <h3 className="text-3xl text-center font-bold my-8">Review</h3>
        <p>
          Lorem, ipsum dolor sit amet consectetur adipisicing elit. Non soluta,
          perspiciatis esse eius praesentium similique asperiores quasi veniam
          repellat architecto repellendus, deserunt accusantium, debitis ipsa.
          Expedita possimus facilis voluptas deserunt.
        </p>
      </div>

      <Swiper
        loop={true}
        effect={"coverflow"}
        grabCursor={true}
        centeredSlides={true}
        slidesPerView={"2"}
        autoplay={{
        delay: 2000,
        disableOnInteraction: false,
      }}
        coverflowEffect={{
          rotate: 30,
          stretch: "50%",
          depth: 200,
          modifier: 1,
          scale: 0.75,
          slideShadows: true,
        }}
        pagination={true}
        modules={[EffectCoverflow, Pagination, Autoplay]}
        className="mySwiper"
      >
        {reviews.map((rev) => (
          <SwiperSlide key={rev.id}>
            <ReviewsCard rev={rev} />
          </SwiperSlide>
        ))}
      </Swiper>
    </div>
  );
};

export default Reviews;
