import logo from '../assets/logo.svg';
import { Mail, Phone, MapPin, Heart } from 'lucide-react';

export default function Footer() {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="bg-slate-900 text-slate-400 pt-16 pb-8 border-t border-slate-800">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-10 mb-12">
          
          {/* Brand Col */}
          <div className="flex flex-col space-y-4">
            <img src={logo} alt="Kidrove Logo" className="h-10 w-auto self-start brightness-0 invert" />
            <p className="text-sm text-slate-500 leading-relaxed">
              Making learning fun, interactive, and child-centric. We provide hands-on experiences in sports, arts, coding, and STEM across the UAE.
            </p>
          </div>

          {/* Quick Links */}
          <div>
            <h4 className="text-white font-extrabold text-sm uppercase tracking-wider mb-4">Quick Links</h4>
            <ul className="space-y-2 text-sm">
              <li>
                <a href="#details" className="hover:text-white transition-colors">Workshop Details</a>
              </li>
              <li>
                <a href="#outcomes" className="hover:text-white transition-colors">Learning Outcomes</a>
              </li>
              <li>
                <a href="#projects" className="hover:text-white transition-colors">Kids Projects</a>
              </li>
              <li>
                <a href="#faqs" className="hover:text-white transition-colors">FAQs</a>
              </li>
            </ul>
          </div>

          {/* Programs */}
          <div>
            <h4 className="text-white font-extrabold text-sm uppercase tracking-wider mb-4">Other Programs</h4>
            <ul className="space-y-2 text-sm text-slate-500">
              <li>Robotics Starter (Ages 6-8)</li>
              <li>Python Coding Camp (Ages 12-16)</li>
              <li>Science & DIY Camp</li>
              <li>Virtual Reality Sandbox</li>
            </ul>
          </div>

          {/* Contact Col */}
          <div>
            <h4 className="text-white font-extrabold text-sm uppercase tracking-wider mb-4">Contact Kidrove</h4>
            <ul className="space-y-3 text-sm">
              <li className="flex items-center gap-2">
                <Mail className="w-4 h-4 text-brand-orange" />
                <a href="mailto:support@kidrove.com" className="hover:text-white transition-colors">
                  support@kidrove.com
                </a>
              </li>
              <li className="flex items-center gap-2">
                <Phone className="w-4 h-4 text-brand-orange" />
                <span>+971 4 123 4567</span>
              </li>
              <li className="flex items-start gap-2">
                <MapPin className="w-4 h-4 text-brand-orange flex-shrink-0 mt-0.5" />
                <span className="text-slate-500">Dubai Silicon Oasis, Dubai, UAE</span>
              </li>
            </ul>
          </div>

        </div>

        {/* Bottom border & Copy */}
        <div className="border-t border-slate-800 pt-8 flex flex-col md:flex-row justify-between items-center text-xs text-slate-500">
          <p>© {currentYear} Kidrove. All rights reserved.</p>
          <p className="flex items-center gap-1 mt-2 md:mt-0">
            Crafted with <Heart className="w-3.5 h-3.5 text-red-500 fill-red-500" /> for young builders.
          </p>
        </div>
      </div>
    </footer>
  );
}
