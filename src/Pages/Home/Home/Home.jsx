// import React from "react";
// import Banner from "../Banner/Banner";
// import ClubInfoSection from "../ClubInfoSection";
// import OurFeture from "../OurFeture/OurFeture";
// import NewsLetter from "../NewsLetter/NewsLetter";
// import ClubFeatures from "../ClubFeatures/ClubFeatures";
// import CompaniName from "../Compani/CompaniName";
// import ReviwsData from "../ReviwsData/ReviwsData";
// import SpacialFeture from "../SpacialFeture/SpacialFeture";
// import HoomClub from "../HoomClub";

// const reviwsPromissData = fetch("/ReviwsData.json").then((res) => res.json());
// const Home = () => {
//   return (
//     <div className="bg-green-500">
//       <title>ClubSphere-App-Home-Page</title>
//       <nav>
//         <Banner></Banner>
//       </nav>
//       <section className="">
//         <ClubInfoSection></ClubInfoSection>
//       </section>
//       <section className="w-11/12 mx-auto">
//         <ClubFeatures></ClubFeatures>
//       </section>
//       <section className="w-11/12 mx-auto">
//         <HoomClub></HoomClub>
//       </section>
//       <section className="w-10/12 mx-auto">
//         <CompaniName></CompaniName>
//       </section>
//       <section className="w-11/12 mx-auto">
//         <OurFeture></OurFeture>
//       </section>
//       <section className="w-11/12 mx-auto">
//         <SpacialFeture></SpacialFeture>
//       </section>
//       <section className="w-11/12 mx-auto">
//         <ReviwsData reviwsPromissData={reviwsPromissData}></ReviwsData>
//       </section>
//       <section>
//         <NewsLetter></NewsLetter>
//       </section>
//     </div>
//   );
// };

// export default Home;
import React from "react";
import Banner from "../Banner/Banner";
import ClubInfoSection from "../ClubInfoSection";
import OurFeture from "../OurFeture/OurFeture";
import NewsLetter from "../NewsLetter/NewsLetter";
import ClubFeatures from "../ClubFeatures/ClubFeatures";
import CompaniName from "../Compani/CompaniName";
import ReviwsData from "../ReviwsData/ReviwsData";
import SpacialFeture from "../SpacialFeture/SpacialFeture";
import HoomClub from "../HoomClub";
import Leadership from "../../../Components/Leadership";

const reviwsPromissData = fetch("/ReviwsData.json").then((res) => res.json());

const Home = () => {
  return (
    // bg-slate-50 (Light) এবং dark:bg-slate-950 (Dark) আধুনিক কম্বিনেশন
    <div className="bg-slate-50 dark:bg-[#020617] transition-colors duration-500 min-h-screen">
      <title>ClubSphere | Home</title>

      <header>
        <Banner />
      </header>

      {/* gap-y-10 বা 12 ব্যবহার করলে সেকশনগুলোর মাঝে গ্যাপ পারফেক্ট থাকবে */}
      <main className="flex flex-col gap-y-10 md:gap-y-16 py-8">
        {/* ClubInfoSection - No extra wrapper needed if it has internal padding */}
        <ClubInfoSection />

        {/* content wrapper with consistent width */}
        <div className="w-11/12 max-w-7xl mx-auto space-y-12 md:space-y-20">
          <section>
            <ClubFeatures />
          </section>

          <section>
            <HoomClub />
          </section>

          <section>
            <Leadership></Leadership>
          </section>

          {/* Company names are usually smaller, so less gap here */}
          <section className="py-6 border-y border-slate-200 dark:border-white/5">
            <CompaniName />
          </section>

          <section>
            <OurFeture />
          </section>

          <section>
            <SpacialFeture />
          </section>

          <section className="bg-white/50 dark:bg-white/5 p-6 rounded-2xl">
            <ReviwsData reviwsPromissData={reviwsPromissData} />
          </section>
        </div>

        <section className="mt-6">
          <NewsLetter />
        </section>
      </main>
    </div>
  );
};

export default Home;
