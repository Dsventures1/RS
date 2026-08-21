import React, { useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Menu, X } from 'lucide-react';

const Header = () => {
  const location = useLocation();
  const [isOpen, setIsOpen] = useState(false);

  const getLinkClass = (path: string) => {
    const baseClass = "hover:text-[#2563EB] relative";
    return location.pathname === path 
      ? `${baseClass} text-[#2563EB] after:absolute after:bottom-[-20px] after:left-0 after:w-full after:h-[2px] after:bg-[#2563EB]`
      : baseClass;
  };

  return (
    <header className="h-[90px] bg-white border-b border-[#E5EAF2] px-6 md:px-12 flex items-center justify-between sticky top-0 z-50">
      <div className="flex items-center">
        <img 
          src="https://i.ibb.co/yFXv6Nxh/Screenshot-2026-08-20-000740.png" 
          alt="RS Financial Services" 
          className="h-[60px] md:h-[78px] w-auto object-contain" 
        />
      </div>
      
      {/* Desktop Navigation */}
      <nav className="hidden md:flex items-center gap-6 text-sm font-semibold text-[#173B7A]">
        <Link to="/" className={getLinkClass('/')}>Home</Link>
        <Link to="/about" className={getLinkClass('/about')}>About Us</Link>
        <Link to="/services" className={getLinkClass('/services')}>Services</Link>
        <Link to="/why-us" className={getLinkClass('/why-us')}>Why Us</Link>
        <Link to="/blogs" className={location.pathname.startsWith('/blogs') 
          ? `hover:text-[#2563EB] relative text-[#2563EB] after:absolute after:bottom-[-20px] after:left-0 after:w-full after:h-[2px] after:bg-[#2563EB]`
          : "hover:text-[#2563EB]"}>Blogs</Link>
        <Link to="/contact" className={getLinkClass('/contact')}>Contact us</Link>
      </nav>

      <div className="hidden md:flex items-center gap-4">
        <a href="https://wa.me/919987974931" target="_blank" rel="noopener noreferrer" className="bg-[#173B7A] text-white px-6 py-2 rounded-md shadow-sm hover:bg-[#1e4ba1] transition-colors font-semibold text-sm">Book a Consultation</a>
      </div>

      {/* Mobile Burger Button */}
      <button className="md:hidden" onClick={() => setIsOpen(!isOpen)}>
        {isOpen ? <X size={24} /> : <Menu size={24} />}
      </button>

      {/* Mobile Menu */}
      {isOpen && (
        <div className="absolute top-[90px] left-0 w-full bg-white border-b border-[#E5EAF2] flex flex-col items-center gap-4 py-6 md:hidden">
          <Link to="/" onClick={() => setIsOpen(false)}>Home</Link>
          <Link to="/about" onClick={() => setIsOpen(false)}>About Us</Link>
          <Link to="/services" onClick={() => setIsOpen(false)}>Services</Link>
          <Link to="/why-us" onClick={() => setIsOpen(false)}>Why Us</Link>
          <Link to="/blogs" onClick={() => setIsOpen(false)}>Blogs</Link>
          <Link to="/contact" onClick={() => setIsOpen(false)}>Contact us</Link>
          <a href="https://wa.me/919987974931" target="_blank" rel="noopener noreferrer" className="bg-[#173B7A] text-white px-6 py-2 rounded-md shadow-sm hover:bg-[#1e4ba1] transition-colors font-semibold text-sm">Book a Consultation</a>
        </div>
      )}
    </header>
  );
};

export default Header;
