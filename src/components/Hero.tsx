import React from 'react';

const Hero = () => {
  return (
    <section className="py-12 md:py-24 px-6 md:px-12 text-center bg-gradient-to-b from-white to-[#F4F8FF]">
      <div className="space-y-6 max-w-4xl mx-auto">
        <span className="text-[#2563EB] font-bold tracking-[0.2em] text-xs md:text-sm uppercase">ADVISE · PLAN · GROW</span>
        <h1 className="text-4xl md:text-7xl font-bold leading-[1.1] text-[#173B7A] font-sans">Build Wealth With Clarity.<br/>Grow With Confidence.</h1>
        <p className="text-lg md:text-xl text-[#4B5563] max-w-2xl mx-auto leading-relaxed">Personalized financial guidance, investment solutions and long-term wealth strategies designed around your goals.</p>
        
        <div className="flex flex-col md:flex-row gap-4 justify-center pt-6 px-4 sm:px-0">
          <a href="https://wa.me/919987974931" target="_blank" rel="noopener noreferrer" className="bg-[#2563EB] text-white px-8 md:px-10 py-4 md:py-5 rounded-lg font-semibold shadow-lg hover:bg-[#1e4ba1] transition-colors text-base md:text-lg w-full sm:w-auto text-center">Book a Consultation</a>
          <a href="/services" className="bg-white border-2 border-[#2563EB] text-[#2563EB] px-8 md:px-10 py-4 md:py-5 rounded-lg font-semibold hover:bg-[#F4F8FF] transition-colors text-base md:text-lg w-full sm:w-auto text-center">Explore Our Solutions</a>
        </div>
      </div>
    </section>
  );
};

export default Hero;
