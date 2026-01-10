import React from "react";
import { motion } from "framer-motion";
import {
  FaUsers,
  FaCalendarCheck,
  FaShieldAlt,
  FaRocket,
} from "react-icons/fa";

const About = () => {
  const stats = [
    {
      label: "Active Clubs",
      value: "50+",
      icon: <FaUsers className="text-emerald-500" />,
    },
    {
      label: "Events Hosted",
      value: "200+",
      icon: <FaCalendarCheck className="text-blue-500" />,
    },
    {
      label: "Secure Payments",
      value: "100%",
      icon: <FaShieldAlt className="text-purple-500" />,
    },
    {
      label: "Community Growth",
      value: "24/7",
      icon: <FaRocket className="text-orange-500" />,
    },
  ];

  return (
    <div className="min-h-screen bg-slate-50 dark:bg-slate-950 pt-24 pb-16 transition-colors duration-500">
      <div className="max-w-7xl mx-auto px-6">
        {/* --- Hero Section --- */}
        <section className="text-center mb-20">
          <motion.span
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            className="text-emerald-500 font-bold tracking-[0.3em] text-xs uppercase bg-emerald-500/10 px-4 py-2 rounded-full"
          >
            About ClubSphere
          </motion.span>
          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            className="text-4xl md:text-6xl font-black text-slate-900 dark:text-white mt-6 leading-tight"
          >
            Connecting People through <br />
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-emerald-500 to-blue-600">
              Passionate Communities
            </span>
          </motion.h1>
          <motion.p
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            transition={{ delay: 0.2 }}
            className="mt-6 text-slate-600 dark:text-slate-400 max-w-2xl mx-auto text-lg leading-relaxed"
          >
            ClubSphere is the ultimate MERN-stack destination for managing local
            clubs. From photography to tech, we empower managers to lead and
            members to discover.
          </motion.p>
        </section>

        {/* --- Stats Grid --- */}
        <section className="grid grid-cols-2 lg:grid-cols-4 gap-6 mb-24">
          {stats.map((stat, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, scale: 0.9 }}
              whileInView={{ opacity: 1, scale: 1 }}
              transition={{ delay: index * 0.1 }}
              viewport={{ once: true }}
              className="bg-white dark:bg-slate-900/50 p-8 rounded-[2rem] border border-slate-100 dark:border-white/5 shadow-xl shadow-slate-200/50 dark:shadow-none text-center group hover:border-emerald-500/50 transition-all"
            >
              <div className="text-3xl flex justify-center mb-4 transform group-hover:scale-110 transition-transform">
                {stat.icon}
              </div>
              <h3 className="text-3xl font-black text-slate-900 dark:text-white">
                {stat.value}
              </h3>
              <p className="text-slate-500 dark:text-slate-400 text-sm font-bold uppercase tracking-wider mt-1">
                {stat.label}
              </p>
            </motion.div>
          ))}
        </section>

        {/* --- Mission & Story Section --- */}
        <section className="grid md:grid-cols-2 gap-16 items-center mb-24">
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            className="space-y-6"
          >
            <h2 className="text-3xl font-black text-slate-900 dark:text-white">
              Our Mission
            </h2>
            <p className="text-slate-600 dark:text-slate-400 leading-relaxed text-lg">
              Our mission is to bridge the gap between passion and community. We
              noticed that local groups often struggle with organization,
              payments, and event tracking.
            </p>
            <div className="space-y-4">
              {[
                "Seamless Club Management",
                "Secure Stripe Integration",
                "Role-based Dashboards",
              ].map((item, i) => (
                <div key={i} className="flex items-center gap-3">
                  <div className="w-2 h-2 rounded-full bg-emerald-500" />
                  <span className="text-slate-700 dark:text-slate-300 font-medium">
                    {item}
                  </span>
                </div>
              ))}
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, x: 30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            className="relative"
          >
            <div className="aspect-video rounded-[3rem] overflow-hidden border-8 border-white dark:border-slate-800 shadow-2xl">
              <img
                src="https://images.unsplash.com/photo-1522202176988-66273c2fd55f?q=80&w=2071&auto=format&fit=crop"
                alt="Our Community"
                className="w-full h-full object-cover"
              />
            </div>
            {/* Decoration */}
            <div className="absolute -bottom-6 -left-6 w-32 h-32 bg-emerald-500/10 rounded-full blur-3xl -z-10" />
          </motion.div>
        </section>
      </div>
    </div>
  );
};

export default About;
