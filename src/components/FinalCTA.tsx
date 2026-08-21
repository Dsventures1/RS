import React from 'react';

const FinalCTA = () => {
  return (
    <section className="bg-[#123B7A] py-12 md:py-[80px] px-6">
      <div className="max-w-[1200px] mx-auto text-center">
        <h2 className="text-2xl md:text-[40px] font-bold text-white leading-[1.1] mb-6">Let’s Build a Strategy Around Your Goals.</h2>
        <p className="text-[#E3EAF4] text-base md:text-[18px] mb-10 max-w-[600px] mx-auto">
          Speak with RS Financial Services to explore the right investment and wealth solutions for your financial journey.
        </p>
        <div className="flex flex-col sm:flex-row justify-center items-center gap-4 px-2">
          <a href="https://wa.me/919987974931" target="_blank" rel="noopener noreferrer" className="bg-white text-[#123B7A] px-4 md:px-12 py-3 md:py-5 rounded-[12px] shadow-sm hover:bg-[#F8FAFC] transition-colors font-semibold w-full sm:w-auto text-center whitespace-nowrap text-sm md:text-base">Book a Consultation</a>
          <a href="/services" className="bg-[#123B7A] text-white border border-white px-4 md:px-12 py-3 md:py-5 rounded-[12px] shadow-sm hover:bg-[#1e4ba1] transition-colors font-semibold w-full sm:w-auto text-center whitespace-nowrap text-sm md:text-base">Explore Services</a>
        </div>
      </div>
    </section>
  );
};

export default FinalCTA;
