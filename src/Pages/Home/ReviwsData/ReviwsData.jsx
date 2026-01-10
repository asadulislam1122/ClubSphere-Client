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
    <div className="py-12 transition-colors duration-500">
      {/* Title */}
      <h2 className="text-4xl font-black text-center mb-12 text-slate-800 dark:text-white">
        User <span className="text-emerald-500">Reviews</span>
      </h2>

      <Swiper
        effect={"coverflow"}
        grabCursor={true}
        centeredSlides={true}
        slidesPerView={"auto"}
        autoplay={{ delay: 2500, disableOnInteraction: false }}
        coverflowEffect={{ rotate: 20, stretch: 0, depth: 120, modifier: 1 }}
        pagination={{ clickable: true }}
        modules={[EffectCoverflow, Pagination, Autoplay]}
        className="mySwiper !pb-12"
      >
        {reviwsData?.map((review) => (
          <SwiperSlide key={review.id} className="max-w-[300px]">
            {/* Main Card: Dark mode এ bg-slate-900/50 এবং Light mode এ white */}
            <div className="bg-white dark:bg-slate-900/50 backdrop-blur-md border-l-4 border-emerald-500 shadow-xl dark:shadow-none transition-all duration-300 rounded-2xl p-6 w-72 mx-auto flex flex-col items-center scale-95 hover:scale-100 group">
              <FaQuoteLeft className="text-emerald-500 text-2xl mb-3 opacity-60 group-hover:opacity-100 transition-opacity" />

              <p className="text-slate-600 dark:text-slate-300 text-center text-sm italic leading-relaxed min-h-[70px]">
                "{review.review.substring(0, 120)}..."
              </p>

              {/* Divider */}
              <div className="w-full h-px bg-slate-100 dark:bg-white/10 my-4"></div>

              <div className="flex flex-col items-center">
                <img
                  src={review.user_photoURL}
                  alt={review.userName}
                  className="w-14 h-14 rounded-full border-2 border-white dark:border-slate-800 ring-4 ring-emerald-500/20 shadow-md object-cover"
                />

                <h3 className="text-base font-bold mt-3 text-slate-900 dark:text-white">
                  {review.userName}
                </h3>
                <p className="text-[10px] text-slate-400 dark:text-slate-500 font-bold uppercase tracking-wider">
                  {new Date(review.date).toLocaleDateString()}
                </p>

                {/* Stars */}
                <div className="flex justify-center items-center mt-2 gap-0.5">
                  {[...Array(5)].map((_, i) => (
                    <FaStar
                      key={i}
                      className={
                        i < review.ratings
                          ? "text-amber-400 w-3 h-3"
                          : "text-slate-200 dark:text-slate-700 w-3 h-3"
                      }
                    />
                  ))}
                  <span className="ml-2 text-xs font-black text-amber-500">
                    {review.ratings}.0
                  </span>
                </div>
              </div>
            </div>
          </SwiperSlide>
        ))}
      </Swiper>

      {/* Pagination Dot Styling */}
      <style jsx="true">{`
        .swiper-pagination-bullet {
          background: #10b981 !important; /* emerald-500 */
        }
      `}</style>
    </div>
  );
};

export default ReviwsData;

// import React, { use } from "react";
// import { EffectCoverflow, Pagination, Autoplay } from "swiper/modules";
// import { Swiper, SwiperSlide } from "swiper/react";
// import { FaQuoteLeft, FaStar } from "react-icons/fa";

// import "swiper/css";
// import "swiper/css/effect-coverflow";
// import "swiper/css/pagination";

// const ReviwsData = ({ reviwsPromissData }) => {
//   const reviwsData = use(reviwsPromissData);

//   return (
//     <div className="py-12 bg-gray-50">
//       <h2 className="text-4xl font-extrabold text-center mb-10 text-gray-800">
//         <span className="text-blue-600 font-bold">User</span>{" "}
//         <span className="font-bold text-green-600">Reviews</span>
//       </h2>
//       <Swiper
//         effect={"coverflow"}
//         grabCursor={true}
//         centeredSlides={true}
//         slidesPerView={3}
//         autoplay={{ delay: 2500, disableOnInteraction: false }}
//         coverflowEffect={{ rotate: 20, stretch: 0, depth: 120, modifier: 1 }}
//         pagination={{ clickable: true }}
//         modules={[EffectCoverflow, Pagination, Autoplay]}
//         className="mySwiper"
//       >
//         {reviwsData?.map((review) => (
//           <SwiperSlide key={review.id}>
//             <div className="bg-white border-l-4 border-blue-600 shadow-lg hover:shadow-blue-300/40 transition duration-300 rounded-xl p-6 w-72 mx-auto flex flex-col items-center scale-95 hover:scale-100">
//               <FaQuoteLeft className="text-blue-500 text-2xl mb-3 opacity-80" />

//               <p className="text-gray-700 text-center text-base italic leading-relaxed">
//                 "{review.review.substring(0, 120)}..."
//               </p>

//               <div className="w-full h-px bg-gray-200 my-4"></div>

//               <div className="flex flex-col items-center">
//                 <img
//                   src={review.user_photoURL}
//                   alt={review.userName}
//                   className="w-14 h-14 rounded-full border-2 border-white ring-2 ring-blue-500 shadow-md object-cover"
//                 />

//                 <h3 className="text-lg font-bold mt-2 text-gray-900">
//                   {review.userName}
//                 </h3>
//                 <p className="text-xs text-gray-500 font-medium">
//                   {new Date(review.date).toLocaleDateString()}
//                 </p>

//                 <div className="flex justify-center items-center mt-2">
//                   {[...Array(5)].map((_, i) => (
//                     <FaStar
//                       key={i}
//                       className={
//                         i < review.ratings
//                           ? "text-amber-400 w-4 h-4"
//                           : "text-gray-300 w-4 h-4"
//                       }
//                     />
//                   ))}
//                   <span className="ml-2 text-sm font-bold text-amber-500">
//                     ({review.ratings}.0)
//                   </span>
//                 </div>
//               </div>
//             </div>
//           </SwiperSlide>
//         ))}
//       </Swiper>
//     </div>
//   );
// };

// export default ReviwsData;
