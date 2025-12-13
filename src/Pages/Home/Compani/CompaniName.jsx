import React from "react";
import assio from "../../../assets/brands/casio.png";
import amazon from "../../../assets/brands/amazon_vector.png";
import monstar from "../../../assets/brands/moonstar.png";
import star from "../../../assets/brands/star.png";
import statpepole from "../../../assets/brands/start_people.png";
import randstack from "../../../assets/brands/randstad.png";
import Marquee from "react-fast-marquee";
const CompaniName = () => {
  return (
    <Marquee>
      <div className="flex gap-6 mt-16 mb-16 justify-center items-center text-wrap">
        <div>
          <img src={assio} alt="" />
        </div>
        <div>
          <img src={amazon} alt="" />
        </div>
        <div>
          <img src={monstar} alt="" />
        </div>
        <div>
          <img src={star} alt="" />
        </div>
        <div>
          <img src={statpepole} alt="" />
        </div>
        <div>
          <img src={randstack} alt="" />
        </div>
      </div>
    </Marquee>
  );
};

export default CompaniName;
