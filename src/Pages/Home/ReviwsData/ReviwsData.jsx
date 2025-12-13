import React, { use } from "react";
import { EffectCoverflow, Pagination, Autoplay } from "swiper/modules";
import { Swiper, SwiperSlide } from "swiper/react";
import { FaQuoteLeft, FaStar } from "react-icons/fa";

import "swiper/css";
import "swiper/css/effect-coverflow";
import "swiper/css/pagination";

const ReviwsData = ({ reviwsPromissData }) => {
  const reviwsData = use(reviwsPromissData);

  return (
    <div className="py-12 bg-gray-50">
      <h2 className="text-4xl font-extrabold text-center mb-10 text-gray-800">
        <span className="text-blue-600 font-bold">User</span>{" "}
        <span className="font-bold text-green-600">Reviews</span>
      </h2>
      <Swiper
        effect={"coverflow"}
        grabCursor={true}
        centeredSlides={true}
        slidesPerView={3}
        autoplay={{ delay: 2500, disableOnInteraction: false }}
        coverflowEffect={{ rotate: 20, stretch: 0, depth: 120, modifier: 1 }}
        pagination={{ clickable: true }}
        modules={[EffectCoverflow, Pagination, Autoplay]}
        className="mySwiper"
      >
        {reviwsData?.map((review) => (
          <SwiperSlide key={review.id}>
            <div className="bg-white border-l-4 border-blue-600 shadow-lg hover:shadow-blue-300/40 transition duration-300 rounded-xl p-6 w-72 mx-auto flex flex-col items-center scale-95 hover:scale-100">
              <FaQuoteLeft className="text-blue-500 text-2xl mb-3 opacity-80" />

              <p className="text-gray-700 text-center text-base italic leading-relaxed">
                "{review.review.substring(0, 120)}..."
              </p>

              <div className="w-full h-px bg-gray-200 my-4"></div>

              <div className="flex flex-col items-center">
                <img
                  src={review.user_photoURL}
                  alt={review.userName}
                  className="w-14 h-14 rounded-full border-2 border-white ring-2 ring-blue-500 shadow-md object-cover"
                />

                <h3 className="text-lg font-bold mt-2 text-gray-900">
                  {review.userName}
                </h3>
                <p className="text-xs text-gray-500 font-medium">
                  {new Date(review.date).toLocaleDateString()}
                </p>

                <div className="flex justify-center items-center mt-2">
                  {[...Array(5)].map((_, i) => (
                    <FaStar
                      key={i}
                      className={
                        i < review.ratings
                          ? "text-amber-400 w-4 h-4"
                          : "text-gray-300 w-4 h-4"
                      }
                    />
                  ))}
                  <span className="ml-2 text-sm font-bold text-amber-500">
                    ({review.ratings}.0)
                  </span>
                </div>
              </div>
            </div>
          </SwiperSlide>
        ))}
      </Swiper>
    </div>
  );
};

export default ReviwsData;
