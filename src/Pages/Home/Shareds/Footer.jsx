import React from "react";
import { Copyright, Phone, ExternalLink, Globe } from "lucide-react";

const Footer = () => {
  // বর্তমান বছর অটোমেটিক আপডেট হবে
  const currentYear = new Date().getFullYear();

  return (
    <footer className="bg-base-300 text-base-content p-10 transition-colors duration-300">
      <div className="container mx-auto">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          {/* ১. সার্ভিস সেকশন */}
          <nav className="flex flex-col gap-2">
            <h6 className="footer-title text-lg font-bold text-primary opacity-100 mb-2">
              Services
            </h6>
            <a href="#" className="link link-hover">
              Branding Strategy
            </a>
            <a href="#" className="link link-hover">
              UI/UX Design
            </a>
            <a href="#" className="link link-hover">
              Digital Marketing
            </a>
            <a href="#" className="link link-hover">
              SEO Optimization
            </a>
          </nav>

          {/* ২. গুরুত্বপূর্ণ লিঙ্ক ও পোর্টফোলিও */}
          <nav className="flex flex-col gap-2">
            <h6 className="footer-title text-lg font-bold text-primary opacity-100 mb-2">
              Company
            </h6>
            <a
              href="https://protfolio.asadulislam0288.workers.dev/"
              target="_blank"
              rel="noreferrer"
              className="link link-hover flex items-center"
            >
              My Portfolio <ExternalLink className="w-3 h-3 ml-1" />
            </a>
            <a href="#" className="link link-hover">
              Our Story
            </a>
            <a href="#" className="link link-hover">
              Careers
            </a>
            <a href="#" className="link link-hover">
              Blog
            </a>
          </nav>

          {/* ৩. সরাসরি যোগাযোগ (ফোন ও হোয়াটস্যাপ) */}
          <nav className="flex flex-col gap-2">
            <h6 className="footer-title text-lg font-bold text-primary opacity-100 mb-2">
              Contact Us
            </h6>
            <a
              href="tel:+8801327822021"
              className="link link-hover flex items-center"
            >
              <Phone className="w-4 h-4 mr-2 text-success" /> 01327822021
            </a>
            <a
              href="https://wa.me/8801327822021"
              target="_blank"
              rel="noreferrer"
              className="link link-hover flex items-center"
            >
              <Globe className="w-4 h-4 mr-2 text-info" /> WhatsApp Chat
            </a>
          </nav>

          {/* ৪. সোশ্যাল মিডিয়া (Icons8 রঙিন আইকন) */}
          <div className="flex flex-col gap-4">
            <h6 className="footer-title text-lg font-bold text-primary opacity-100 mb-2">
              Social Profiles
            </h6>
            <div className="flex gap-5 items-center">
              <a
                href="https://www.linkedin.com/in/md-asadullah-a62863396/"
                target="_blank"
                rel="noreferrer"
                className="transition-transform hover:scale-110 active:scale-95"
              >
                <img
                  src="https://img.icons8.com/color/48/linkedin.png"
                  alt="Linkedin"
                  className="w-10 h-10"
                />
              </a>
              <a
                href="https://github.com/asadulislam1122"
                target="_blank"
                rel="noreferrer"
                className="transition-transform hover:scale-110 active:scale-95"
              >
                <img
                  src="https://img.icons8.com/arcade/64/github.png"
                  alt="Github"
                  className="w-10 h-10"
                />
              </a>
              <a
                href="https://www.facebook.com/prince.asadul.426723"
                target="_blank"
                rel="noreferrer"
                className="transition-transform hover:scale-110 active:scale-95"
              >
                <img
                  src="https://img.icons8.com/arcade/64/facebook-new.png"
                  alt="Facebook"
                  className="w-10 h-10"
                />
              </a>
            </div>
          </div>
        </div>

        {/* নিচের কপিরাইট অংশ */}
        <div className="border-t border-base-content border-opacity-10 mt-10 pt-6">
          <aside className="text-center text-sm opacity-70">
            <p className="flex items-center justify-center gap-1">
              <Copyright className="w-4 h-4" />
              {currentYear} - All rights reserved by
              <span className="font-bold text-secondary">ClubSphere</span>
            </p>
          </aside>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
