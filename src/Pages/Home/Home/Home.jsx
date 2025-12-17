import React from "react";
import Banner from "../Banner/Banner";
import ClubInfoSection from "../ClubInfoSection";
import OurFeture from "../OurFeture/OurFeture";
import NewsLetter from "../NewsLetter/NewsLetter";
import ClubFeatures from "../ClubFeatures/ClubFeatures";
import CompaniName from "../Compani/CompaniName";
import ReviwsData from "../ReviwsData/ReviwsData";
import SpacialFeture from "../SpacialFeture/SpacialFeture";

const reviwsPromissData = fetch("/ReviwsData.json").then((res) => res.json());
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
      <section className="w-10/12 mx-auto">
        <CompaniName></CompaniName>
      </section>
      <section className="w-11/12 mx-auto">
        <OurFeture></OurFeture>
      </section>
      <section className="w-11/12 mx-auto">
        <SpacialFeture></SpacialFeture>
      </section>
      <section className="w-11/12 mx-auto">
        <ReviwsData reviwsPromissData={reviwsPromissData}></ReviwsData>
      </section>
      <section>
        <NewsLetter></NewsLetter>
      </section>
    </div>
  );
};

export default Home;
