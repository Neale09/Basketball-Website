import React from 'react';
import { Phone, Mail, Clock, Instagram, Facebook, Youtube } from 'lucide-react';

export const Footer: React.FC = () => {
  return (
    <footer className="relative bg-[#0d0f11] text-neutral-300 overflow-hidden border-t border-neutral-800">
      {/* Background Court Lighting Overlay */}
      <div 
        className="absolute inset-0 opacity-15 bg-cover bg-center pointer-events-none filter grayscale contrast-125"
        style={{
          backgroundImage: 'radial-gradient(circle at 50% 30%, #1e293b 0%, #09090b 100%)'
        }}
      />

      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-16 pb-12">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-10 lg:gap-12 pb-12 border-b border-neutral-800/80">
          {/* Column 1: COMPANY */}
          <div>
            <h3 className="text-sm font-extrabold text-white uppercase tracking-wider mb-5">
              COMPANY
            </h3>
            <ul className="space-y-3 text-xs font-medium text-neutral-400">
              <li>
                <a href="#about" className="hover:text-white transition-colors">About Us</a>
              </li>
              <li>
                <a href="#contact" className="hover:text-white transition-colors">Contact Us</a>
              </li>
              <li>
                <a href="#blogs" className="hover:text-white transition-colors">Blogs & Court Stories</a>
              </li>
              <li>
                <a href="#catalogues" className="hover:text-white transition-colors">Catalogues & Lookbooks</a>
              </li>
              <li>
                <a href="#compliance" className="hover:text-white transition-colors">Compliance & Standards</a>
              </li>
              <li>
                <a href="#terms" className="hover:text-white transition-colors">Terms And Conditions</a>
              </li>
              <li>
                <a href="#privacy" className="hover:text-white transition-colors">Privacy Policy</a>
              </li>
              <li>
                <a href="#refund" className="hover:text-white transition-colors">Refund & Replacement Policy</a>
              </li>
            </ul>
          </div>

          {/* Column 2: BASKETBALL AFFILIATION */}
          <div>
            <h3 className="text-sm font-extrabold text-white uppercase tracking-wider mb-5">
              COURT AFFILIATION & PARTNERS
            </h3>
            <ul className="space-y-3 text-xs font-medium text-neutral-400">
              <li>
                <span className="hover:text-white transition-colors cursor-pointer">BFI (Basketball Federation of India)</span>
              </li>
              <li>
                <span className="hover:text-white transition-colors cursor-pointer">NBA India Academy Training Partner</span>
              </li>
              <li>
                <span className="hover:text-white transition-colors cursor-pointer">FIBA Approved Composite Specifications</span>
              </li>
              <li>
                <span className="hover:text-white transition-colors cursor-pointer">All-India Inter-University Hoops League</span>
              </li>
              <li>
                <span className="hover:text-white transition-colors cursor-pointer">Streetball 3x3 National Circuit</span>
              </li>
              <li>
                <span className="hover:text-white transition-colors cursor-pointer">Junior NBA Development Camp Supporter</span>
              </li>
            </ul>
          </div>

          {/* Column 3: CONNECT WITH US */}
          <div>
            <h3 className="text-sm font-extrabold text-white uppercase tracking-wider mb-5">
              CONNECT WITH US
            </h3>
            <div className="space-y-4 text-xs text-neutral-300">
              <div className="flex items-center gap-3">
                <Phone className="w-4 h-4 text-neutral-400 shrink-0" />
                <a href="tel:+919115497521" className="hover:text-white font-medium">
                  +91 9115497521
                </a>
              </div>
              <div className="flex items-center gap-3">
                <Mail className="w-4 h-4 text-neutral-400 shrink-0" />
                <a href="mailto:support@aerocourt.sports" className="hover:text-white font-medium">
                  support@aerocourt.sports
                </a>
              </div>
              <div className="flex items-center gap-3">
                <Clock className="w-4 h-4 text-neutral-400 shrink-0" />
                <span>9AM - 6PM (Mon - Sat)</span>
              </div>
            </div>

            {/* Newsletter signup for sneaker drops */}
            <div className="mt-8">
              <span className="text-xs font-bold text-white block mb-2 uppercase tracking-tight">
                Get New Shoe Drop Alerts
              </span>
              <div className="flex">
                <input
                  type="email"
                  placeholder="Enter your email"
                  className="bg-neutral-900 border border-neutral-700 text-xs px-3 py-2 rounded-l-lg text-white focus:outline-none focus:border-neutral-500 w-full"
                />
                <button className="bg-white hover:bg-neutral-200 text-black px-3.5 py-2 rounded-r-lg text-xs font-bold uppercase transition-colors shrink-0">
                  Join
                </button>
              </div>
            </div>
          </div>
        </div>

        {/* Bottom Strip: Copyright & Socials */}
        <div className="pt-8 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-neutral-400">
          <p>© 2026 AEROCOURT Sports & Footwear. All Rights Reserved.</p>

          {/* Social Icons matching screenshot */}
          <div className="flex items-center space-x-5 text-neutral-400">
            <a href="https://instagram.com" target="_blank" rel="noreferrer" className="hover:text-white transition-colors" aria-label="Instagram">
              <Instagram className="w-4 h-4" />
            </a>
            <a href="https://facebook.com" target="_blank" rel="noreferrer" className="hover:text-white transition-colors" aria-label="Facebook">
              <Facebook className="w-4 h-4" />
            </a>
            {/* Custom X (Twitter) Logo */}
            <a href="https://x.com" target="_blank" rel="noreferrer" className="hover:text-white transition-colors" aria-label="X">
              <svg className="w-4 h-4 fill-current" viewBox="0 0 24 24">
                <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z" />
              </svg>
            </a>
            <a href="https://youtube.com" target="_blank" rel="noreferrer" className="hover:text-white transition-colors" aria-label="YouTube">
              <Youtube className="w-4 h-4" />
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
};
