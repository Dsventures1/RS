import React, { useState, useRef, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Menu, X, ChevronDown, Calculator, Sliders } from 'lucide-react';

const Header = () => {
  const location = useLocation();
  const [isOpen, setIsOpen] = useState(false);
  const [isToolsOpen, setIsToolsOpen] = useState(false);
  const [mobileToolsOpen, setMobileToolsOpen] = useState(true);
  const dropdownRef = useRef<HTMLDivElement>(null);

  const isToolsActive = location.pathname === '/mf-calculators' || 
                        location.pathname === '/tools-calculators' || 
                        location.pathname === '/tools';

  const getLinkClass = (path: string) => {
    const baseClass = "hover:text-[#2563EB] relative transition-colors";
    return location.pathname === path 
      ? `${baseClass} text-[#2563EB] after:absolute after:bottom-[-20px] after:left-0 after:w-full after:h-[2px] after:bg-[#2563EB]`
      : baseClass;
  };

  // Close desktop dropdown on click outside
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setIsToolsOpen(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  return (
    <header className="h-[100px] md:h-[120px] lg:h-[130px] bg-white border-b border-[#E5EAF2] px-4 sm:px-6 md:px-10 lg:px-12 flex items-center justify-between sticky top-0 z-50 transition-all shadow-sm">
      <div className="flex items-center h-full overflow-hidden w-[200px] sm:w-[240px] md:w-[280px]">
        <Link to="/" className="flex items-center justify-start group h-full w-full relative">
          <img 
            src="https://i.ibb.co/yFXv6Nxh/Screenshot-2026-08-20-000740.png" 
            alt="RS Financial Services" 
            className="absolute top-1/2 -translate-y-1/2 left-0 h-[150%] sm:h-[160%] md:h-[170%] w-auto object-contain mix-blend-multiply contrast-[1.1] transition-transform duration-300 group-hover:scale-[1.05] origin-left" 
            style={{ imageRendering: '-webkit-optimize-contrast' }}
            loading="eager"
          />
        </Link>
      </div>
      
      {/* Desktop Navigation */}
      <nav className="hidden md:flex items-center gap-6 lg:gap-8 text-sm font-semibold text-[#173B7A]">
        <Link to="/" className={getLinkClass('/')}>Home</Link>
        <Link to="/about" className={getLinkClass('/about')}>About Us</Link>
        <Link to="/services" className={getLinkClass('/services')}>Services</Link>
        <Link to="/why-us" className={getLinkClass('/why-us')}>Why Us</Link>
        <Link to="/blogs" className={location.pathname.startsWith('/blogs') 
          ? `hover:text-[#2563EB] relative text-[#2563EB] after:absolute after:bottom-[-20px] after:left-0 after:w-full after:h-[2px] after:bg-[#2563EB]`
          : "hover:text-[#2563EB]"}>Blogs</Link>
        
        {/* Tools Dropdown */}
        <div 
          ref={dropdownRef}
          className="relative"
          onMouseEnter={() => setIsToolsOpen(true)}
          onMouseLeave={() => setIsToolsOpen(false)}
        >
          <button 
            onClick={() => setIsToolsOpen(!isToolsOpen)}
            className={`flex items-center gap-1.5 py-2 font-semibold text-sm transition-colors cursor-pointer ${
              isToolsActive 
                ? 'text-[#2563EB] relative after:absolute after:bottom-[-20px] after:left-0 after:w-full after:h-[2px] after:bg-[#2563EB]' 
                : 'text-[#173B7A] hover:text-[#2563EB]'
            }`}
            aria-expanded={isToolsOpen}
          >
            <span>Tools</span>
            <ChevronDown 
              size={15} 
              className={`transition-transform duration-200 ${isToolsOpen ? 'rotate-180 text-[#2563EB]' : ''}`} 
            />
          </button>

          {/* Dropdown Card */}
          {isToolsOpen && (
            <div className="absolute top-full left-1/2 -translate-x-1/2 pt-2 w-56 z-50 animate-in fade-in slide-in-from-top-1 duration-150">
              <div className="bg-white rounded-xl shadow-xl border border-[#E5EAF2] p-2 space-y-1">
                <Link
                  to="/mf-calculators"
                  onClick={() => setIsToolsOpen(false)}
                  className={`flex items-center gap-3 px-3.5 py-2.5 rounded-lg text-sm font-semibold transition-colors ${
                    location.pathname === '/mf-calculators'
                      ? 'bg-[#EFF6FF] text-[#2563EB]'
                      : 'text-[#173B7A] hover:bg-[#F4F8FD] hover:text-[#2563EB]'
                  }`}
                >
                  <Calculator size={16} className="text-[#2563EB]" />
                  <span>MF Calculators</span>
                </Link>

                <Link
                  to="/tools-calculators"
                  onClick={() => setIsToolsOpen(false)}
                  className={`flex items-center gap-3 px-3.5 py-2.5 rounded-lg text-sm font-semibold transition-colors ${
                    location.pathname === '/tools-calculators'
                      ? 'bg-[#EFF6FF] text-[#2563EB]'
                      : 'text-[#173B7A] hover:bg-[#F4F8FD] hover:text-[#2563EB]'
                  }`}
                >
                  <Sliders size={16} className="text-[#2563EB]" />
                  <span>Tools & Calculators</span>
                </Link>
              </div>
            </div>
          )}
        </div>

        <Link to="/contact" className={getLinkClass('/contact')}>Contact us</Link>
      </nav>

      <div className="hidden md:flex items-center gap-4">
        <a href="https://wa.link/fudqk8" target="_blank" rel="noopener noreferrer" className="bg-[#173B7A] text-white px-6 py-2 rounded-md shadow-sm hover:bg-[#1e4ba1] transition-colors font-semibold text-sm">Book a Consultation</a>
      </div>

      {/* Mobile Burger Button */}
      <button className="md:hidden text-[#173B7A]" onClick={() => setIsOpen(!isOpen)} aria-label="Toggle menu">
        {isOpen ? <X size={24} /> : <Menu size={24} />}
      </button>

      {/* Mobile Menu */}
      {isOpen && (
        <div className="absolute top-[100px] left-0 w-full bg-white border-b border-[#E5EAF2] flex flex-col items-center gap-4 py-6 md:hidden shadow-lg animate-in fade-in duration-150 z-50">
          <Link to="/" onClick={() => setIsOpen(false)} className={`text-sm font-semibold ${location.pathname === '/' ? 'text-[#2563EB]' : 'text-[#173B7A]'}`}>Home</Link>
          <Link to="/about" onClick={() => setIsOpen(false)} className={`text-sm font-semibold ${location.pathname === '/about' ? 'text-[#2563EB]' : 'text-[#173B7A]'}`}>About Us</Link>
          <Link to="/services" onClick={() => setIsOpen(false)} className={`text-sm font-semibold ${location.pathname === '/services' ? 'text-[#2563EB]' : 'text-[#173B7A]'}`}>Services</Link>
          <Link to="/why-us" onClick={() => setIsOpen(false)} className={`text-sm font-semibold ${location.pathname === '/why-us' ? 'text-[#2563EB]' : 'text-[#173B7A]'}`}>Why Us</Link>
          <Link to="/blogs" onClick={() => setIsOpen(false)} className={`text-sm font-semibold ${location.pathname.startsWith('/blogs') ? 'text-[#2563EB]' : 'text-[#173B7A]'}`}>Blogs</Link>
          
          {/* Mobile Tools Submenu */}
          <div className="w-full flex flex-col items-center">
            <button 
              onClick={() => setMobileToolsOpen(!mobileToolsOpen)}
              className={`flex items-center gap-1.5 font-semibold text-sm py-1 ${isToolsActive ? 'text-[#2563EB]' : 'text-[#173B7A]'}`}
            >
              <span>Tools</span>
              <ChevronDown size={16} className={`transition-transform duration-200 ${mobileToolsOpen ? 'rotate-180' : ''}`} />
            </button>
            {mobileToolsOpen && (
              <div className="flex flex-col items-center gap-2 mt-2 bg-[#F8FAFC] py-3 px-6 rounded-xl w-4/5 border border-[#E5EAF2]">
                <Link 
                  to="/mf-calculators" 
                  onClick={() => setIsOpen(false)}
                  className={`text-sm py-1 font-semibold flex items-center gap-2 ${location.pathname === '/mf-calculators' ? 'text-[#2563EB]' : 'text-[#173B7A] hover:text-[#2563EB]'}`}
                >
                  <Calculator size={15} className="text-[#2563EB]" />
                  <span>MF Calculators</span>
                </Link>
                <Link 
                  to="/tools-calculators" 
                  onClick={() => setIsOpen(false)}
                  className={`text-sm py-1 font-semibold flex items-center gap-2 ${location.pathname === '/tools-calculators' ? 'text-[#2563EB]' : 'text-[#173B7A] hover:text-[#2563EB]'}`}
                >
                  <Sliders size={15} className="text-[#2563EB]" />
                  <span>Tools & Calculators</span>
                </Link>
              </div>
            )}
          </div>

          <Link to="/contact" onClick={() => setIsOpen(false)} className={`text-sm font-semibold ${location.pathname === '/contact' ? 'text-[#2563EB]' : 'text-[#173B7A]'}`}>Contact us</Link>
          <a href="https://wa.link/fudqk8" target="_blank" rel="noopener noreferrer" className="bg-[#173B7A] text-white px-6 py-2 rounded-md shadow-sm hover:bg-[#1e4ba1] transition-colors font-semibold text-sm mt-2">Book a Consultation</a>
        </div>
      )}
    </header>
  );
};

export default Header;

