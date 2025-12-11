import React from "react";
import Banner from "../Banner/Banner";
import ClubInfoSection from "../ClubInfoSection";
import OurFeture from "../OurFeture/OurFeture";
import NewsLetter from "../NewsLetter/NewsLetter";
import ClubFeatures from "../ClubFeatures/ClubFeatures";

const Home = () => {
  return (
    <div>
      <Banner></Banner>
      <section className="w-11/12 mx-auto">
        <ClubInfoSection></ClubInfoSection>
      </section>
      <section className="w-11/12 mx-auto">
        <ClubFeatures></ClubFeatures>
      </section>
      <section className="w-11/12 mx-auto">
        <OurFeture></OurFeture>
      </section>
      <section>
        <NewsLetter></NewsLetter>
      </section>
    </div>
  );
};

export default Home;
