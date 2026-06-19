import { useState, useEffect } from 'react';
import { Menu, X, Rocket } from 'lucide-react';
import logo from '../assets/logo.svg';

export default function Navbar() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 20) {
        setIsScrolled(true);
      } else {
        setIsScrolled(false);
      }
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const scrollToSection = (id: string) => {
    setIsMobileMenuOpen(false);
    const element = document.getElementById(id);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <nav
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        isScrolled
          ? 'bg-white/80 backdrop-blur-md shadow-md py-3'
          : 'bg-transparent py-5'
      }`}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center">
          {/* Logo */}
          <div className="flex-shrink-0 flex items-center cursor-pointer" onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}>
            <img src={logo} alt="Kidrove Logo" className="h-10 w-auto" />
          </div>

          {/* Desktop Navigation Links */}
          <div className="hidden md:flex items-center space-x-8">
            <button
              onClick={() => scrollToSection('details')}
              className="text-slate-600 hover:text-brand-purple font-medium transition-colors"
            >
              Workshop Details
            </button>
            <button
              onClick={() => scrollToSection('outcomes')}
              className="text-slate-600 hover:text-brand-purple font-medium transition-colors"
            >
              Learning Outcomes
            </button>
            <button
              onClick={() => scrollToSection('projects')}
              className="text-slate-600 hover:text-brand-purple font-medium transition-colors"
            >
              Projects
            </button>
            <button
              onClick={() => scrollToSection('faqs')}
              className="text-slate-600 hover:text-brand-purple font-medium transition-colors"
            >
              FAQs
            </button>
            <button
              onClick={() => scrollToSection('enroll')}
              className="bg-brand-purple hover:bg-brand-purple-dark text-white px-5 py-2.5 rounded-full font-bold shadow-lg shadow-brand-purple/20 transition-all duration-200 flex items-center gap-2 hover:scale-105"
            >
              <Rocket className="w-4 h-4" />
              Enroll Now
            </button>
          </div>

          {/* Mobile menu button */}
          <div className="md:hidden flex items-center">
            <button
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              className="text-slate-700 hover:text-brand-purple focus:outline-none"
            >
              {isMobileMenuOpen ? (
                <X className="h-6 w-6" aria-hidden="true" />
              ) : (
                <Menu className="h-6 w-6" aria-hidden="true" />
              )}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Menu */}
      {isMobileMenuOpen && (
        <div className="md:hidden bg-white/95 backdrop-blur-md border-t border-slate-100 shadow-xl absolute top-full left-0 right-0 py-4 px-6 flex flex-col space-y-4">
          <button
            onClick={() => scrollToSection('details')}
            className="text-left text-slate-700 hover:text-brand-purple font-medium py-2 border-b border-slate-50"
          >
            Workshop Details
          </button>
          <button
            onClick={() => scrollToSection('outcomes')}
            className="text-left text-slate-700 hover:text-brand-purple font-medium py-2 border-b border-slate-50"
          >
            Learning Outcomes
          </button>
          <button
            onClick={() => scrollToSection('projects')}
            className="text-left text-slate-700 hover:text-brand-purple font-medium py-2 border-b border-slate-50"
          >
            Projects
          </button>
          <button
            onClick={() => scrollToSection('faqs')}
            className="text-left text-slate-700 hover:text-brand-purple font-medium py-2 border-b border-slate-50"
          >
            FAQs
          </button>
          <button
            onClick={() => scrollToSection('enroll')}
            className="bg-brand-purple text-white px-5 py-3 rounded-full font-bold shadow-lg text-center flex items-center justify-center gap-2"
          >
            <Rocket className="w-5 h-5" />
            Enroll Now
          </button>
        </div>
      )}
    </nav>
  );
}
