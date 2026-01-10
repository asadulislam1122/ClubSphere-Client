import React, { useEffect, useRef } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/dist/ScrollTrigger";
import { FaLinkedin } from "react-icons/fa";

gsap.registerPlugin(ScrollTrigger);

const leaders = [
  {
    name: "Md Asadullah",
    title: "Co-founder and CEO",
    img: "https://i.ibb.co.com/C5VCKBmz/574844188-822685373960919-6143056544719542289-n.jpg",
    color: "text-sky-500",
    desc: "Founder and CEO of Airtable. Founded in 2012, Airtable enables over 500,000 organizations to accelerate work and automate workflows.",
    linkedin: "https://www.linkedin.com/in/md-asadullah-a62863396",
  },
  {
    name: "Ambereen Toubassy",
    title: "Chief Financial Officer",
    img: "https://i.ibb.co.com/nN7L5sJ8/Airtable-280-blue.png",
    color: "text-amber-500",
    desc: "Leads Airtable’s finance and legal teams. Previously CFO at Quibi and operating partner at WndrCo with experience in investment banking.",
    linkedin: "https://www.linkedin.com/in/ambereen-toubassy-816694",
  },
  {
    name: "David Azose",
    title: "Chief Technology Officer",
    img: "https://i.ibb.co.com/Kc8jH3Fn/images-38.jpg",
    color: "text-emerald-500",
    desc: "Heads engineering, security, and IT at Airtable. Joined in 2025 from OpenAI, leading enterprise AI product scaling.",
    linkedin: "https://www.linkedin.com/in/david-azose-4b80757",
  },
  {
    name: "Paul Ohls",
    title: "Chief Revenue Officer",
    img: "https://i.ibb.co.com/6RzWJCKN/images-37.jpg",
    color: "text-sky-500",
    desc: "Leads customer-facing teams including sales and success. Former CRO at Sprinklr and held leadership roles at Tenfold and Zilliant.",
    linkedin: "https://www.linkedin.com/in/paulohls",
  },
];

const Leadership = () => {
  const sectionRef = useRef(null);
  const cardsRef = useRef([]);

  useEffect(() => {
    // GSAP Animation for Title
    gsap.fromTo(
      ".leader-title",
      { opacity: 0, y: -50 },
      {
        opacity: 1,
        y: 0,
        duration: 1,
        scrollTrigger: {
          trigger: ".leader-title",
          start: "top 80%",
        },
      }
    );

    // GSAP Animation for Cards
    cardsRef.current.forEach((el, index) => {
      gsap.fromTo(
        el,
        { opacity: 0, x: index % 2 === 0 ? -50 : 50 },
        {
          opacity: 1,
          x: 0,
          duration: 0.8,
          delay: index * 0.2,
          scrollTrigger: {
            trigger: el,
            start: "top 85%",
          },
        }
      );
    });
  }, []);

  return (
    <section
      ref={sectionRef}
      className="py-20 px-6 md:px-20 bg-white dark:bg-slate-950 transition-colors duration-500 overflow-hidden"
    >
      <div className="max-w-6xl mx-auto">
        {/* Header */}
        <div className="text-center mb-16 leader-title">
          <h2 className="text-4xl md:text-5xl font-black text-slate-900 dark:text-white">
            Meet Our <span className="text-emerald-500">Leadership</span> 🚀
          </h2>
          <div className="h-1.5 w-24 bg-emerald-500 mx-auto mt-4 rounded-full"></div>
        </div>

        {/* Grid Layout */}
        <div className="grid md:grid-cols-2 gap-8">
          {leaders.map((leader, index) => (
            <div
              key={index}
              ref={(el) => (cardsRef.current[index] = el)}
              className="group relative flex flex-col sm:flex-row items-center bg-slate-50 dark:bg-slate-900/50 backdrop-blur-xl p-8 rounded-[2.5rem] border border-slate-200 dark:border-white/10 hover:border-emerald-500 dark:hover:border-emerald-500 transition-all duration-500 shadow-sm hover:shadow-2xl hover:shadow-emerald-500/10"
            >
              {/* Image with Decorative Ring */}
              <div className="relative flex-shrink-0 mb-6 sm:mb-0 sm:mr-8">
                <div className="absolute inset-0 bg-emerald-500 rounded-2xl rotate-6 group-hover:rotate-12 transition-transform duration-500 opacity-20"></div>
                <img
                  src={leader.img}
                  alt={leader.name}
                  className="relative z-10 w-32 h-32 rounded-2xl object-cover shadow-lg border-2 border-white dark:border-slate-800"
                />
              </div>

              {/* Content */}
              <div className="text-center sm:text-left">
                <h3 className="text-2xl font-bold text-slate-800 dark:text-white group-hover:text-emerald-500 transition-colors">
                  {leader.name}
                </h3>
                <p
                  className={`${leader.color} font-bold text-sm uppercase tracking-widest mb-3`}
                >
                  {leader.title}
                </p>
                <p className="text-slate-600 dark:text-slate-400 text-sm leading-relaxed mb-4">
                  {leader.desc}
                </p>

                {/* LinkedIn Button */}
                <a
                  href={leader.linkedin}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2 px-4 py-2 bg-white dark:bg-slate-800 rounded-full text-sm font-semibold text-sky-600 shadow-sm hover:bg-sky-600 hover:text-white transition-all duration-300 border border-slate-100 dark:border-slate-700"
                >
                  <FaLinkedin className="text-lg" />
                  Connect
                </a>
              </div>

              {/* Hover Decorative Element */}
              <div className="absolute bottom-4 right-8 opacity-0 group-hover:opacity-100 transition-opacity duration-500 text-emerald-500/20 text-6xl font-black">
                {index + 1}
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Leadership;
