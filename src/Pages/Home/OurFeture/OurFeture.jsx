import React from "react";
import Marquee from "react-fast-marquee";

const OurFeture = () => {
  return (
    <div className="max-w-6xl mx-auto py-12 px-4 sm:px-6 lg:px-8">
      <h2 className="text-3xl font-extrabold text-gray-900 text-center mb-10">
        <span className="text-blue-600">Our Tech</span>{" "}
        <span className="text-green-500">Stack</span> 🛠️
      </h2>

      <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-6 lg:gap-8">
        <FeatureCard
          imgSrc="https://i.ibb.co.com/4Z2NCz1x/1051277.png"
          title="HTML"
        />
        <FeatureCard
          imgSrc="https://i.ibb.co.com/wNjjrZCd/css-3-logo-png-seeklogo-426083.png"
          title="CSS"
        />
        <FeatureCard
          imgSrc="https://i.ibb.co.com/Mk7BPgsC/javascript-logo-javascript-icon-transparent-free-png.webp"
          title="JavaScript"
        />
        <FeatureCard
          imgSrc="https://i.ibb.co.com/nNJbrFJp/images-2.png"
          title="React"
        />

        <FeatureCard
          imgSrc="https://i.ibb.co.com/kv9NPKr/images-3.png"
          title="MongoDB"
        />
        <FeatureCard
          imgSrc="https://i.ibb.co.com/0yctTYz9/channels4-profile.jpg"
          title="Firebase"
        />
        <FeatureCard
          imgSrc="https://i.ibb.co.com/BVh3VdRn/tailwindcss.jpg"
          title="Tailwind CSS"
        />
        <FeatureCard
          imgSrc="https://i.ibb.co.com/WWKddjXw/images-28.jpg"
          title="Daisy UI"
        />
      </div>
    </div>
  );
};

const FeatureCard = ({ imgSrc, title }) => {
  return (
    <div
      className="bg-white p-6 rounded-xl shadow-lg border border-gray-100 flex flex-col items-center justify-center 
                    transition-all duration-300 ease-in-out cursor-pointer 
                    hover:scale-[1.03] hover:shadow-2xl hover:border-blue-500"
    >
      <div className="w-16 h-16 md:w-20 md:h-20 mb-4 flex items-center justify-center">
        <img
          src={imgSrc}
          alt={title}
          className="w-full h-full object-contain"
          loading="lazy"
        />
      </div>

      <p className="text-lg font-semibold text-gray-800 mt-2">{title}</p>
    </div>
  );
};

export default OurFeture;
