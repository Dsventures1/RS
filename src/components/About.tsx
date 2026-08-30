import React from 'react';

const About = () => {
  return (
    <section className="bg-[#F7FAFF] py-12 md:py-[80px]">
      <div className="max-w-[1200px] mx-auto px-6 flex flex-col md:flex-row items-center gap-8 md:gap-[60px]">
        {/* LEFT IMAGE */}
        <div className="w-full md:w-[48%]">
          <img 
            src="https://images.unsplash.com/photo-1454165804606-c3d57bc86b40?q=80&w=1000&auto=format&fit=crop" 
            alt="Financial Advisory" 
            className="w-full h-[300px] md:h-[420px] object-cover rounded-[20px] shadow-2xl" 
          />
        </div>
        
        {/* RIGHT CONTENT */}
        <div className="w-full md:w-[48%] space-y-6">
          <span className="text-[#2563EB] font-bold tracking-[2px] text-xs uppercase">WHO WE ARE</span>
          <h2 className="text-3xl md:text-[48px] font-extrabold text-[#123B8F] leading-[1.15]">
            Your wealth deserves more than just an investment.
          </h2>
          <div className="space-y-4">
            <p className="text-[#52627A] text-base md:text-[18px] leading-[1.7]">
              RS Financial Services helps individuals and families make informed financial decisions through personalized investment planning, wealth management and long-term financial strategies.
            </p>
            <p className="text-[#52627A] text-base md:text-[18px] leading-[1.7]">
              Our approach is built around understanding each client's goals, risk profile, financial priorities and future aspirations — and then creating a strategy designed around them.
            </p>
          </div>
          <a href="/services" className="inline-block text-[#2563EB] font-semibold text-base md:text-[18px] hover:text-[#123B8F] transition-colors">
            Discover Our Approach →
          </a>
        </div>
      </div>
    </section>
  );
};

export default About;
