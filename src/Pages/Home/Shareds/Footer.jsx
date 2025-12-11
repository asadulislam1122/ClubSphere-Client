import React from "react";
import { Mail, Copyright } from "lucide-react"; // Assuming you use lucide-react or similar icons

const Footer = () => {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="bg-base-300 text-base-content p-10">
      <div className="container mx-auto grid grid-cols-2 md:grid-cols-5 gap-8">
        {/* Navigation Columns - Adjusted to span 3 columns on desktop */}
        <nav className="col-span-1">
          <h6 className="footer-title text-lg font-bold text-primary">
            Services
          </h6>
          <a className="link link-hover">Branding Strategy</a>
          <a className="link link-hover">UI/UX Design</a>
          <a className="link link-hover">Digital Marketing</a>
          <a className="link link-hover">SEO Optimization</a>
        </nav>

        <nav className="col-span-1">
          <h6 className="footer-title text-lg font-bold text-primary">
            Company
          </h6>
          <a className="link link-hover">Our Story</a>
          <a className="link link-hover">Team</a>
          <a className="link link-hover">Careers</a>
          <a className="link link-hover">Blog</a>
        </nav>

        <nav className="col-span-2 md:col-span-1">
          <h6 className="footer-title text-lg font-bold text-primary">Legal</h6>
          <a className="link link-hover">Terms & Conditions</a>
          <a className="link link-hover">Data Privacy</a>
          <a className="link link-hover">Accessibility</a>
        </nav>

        {/* Newsletter/Subscription Section - Spans wider on mobile/desktop */}
        <div className="col-span-2 md:col-span-2 w-full">
          <header className="footer-title text-lg font-bold text-accent mb-4">
            <Mail className="inline w-5 h-5 mr-2" />
            Stay Updated
          </header>
          <p className="mb-4 text-sm opacity-80">
            Join our newsletter for the latest news and offers.
          </p>
          <fieldset className="form-control w-full">
            <div className="join w-full">
              <input
                type="text"
                placeholder="email@site.com"
                className="input input-bordered join-item w-full"
              />
              <button className="btn btn-primary join-item">Subscribe</button>
            </div>
          </fieldset>
        </div>
      </div>

      {/* Separator and Copyright Section */}
      <div className="border-t border-base-content border-opacity-10 mt-10 pt-6">
        <aside className="text-center text-sm opacity-70">
          <p>
            <Copyright className="inline w-4 h-4 mr-1" />
            Copyright {currentYear} - All rights reserved by ClubSphere
          </p>
        </aside>
      </div>
    </footer>
  );
};

export default Footer;
