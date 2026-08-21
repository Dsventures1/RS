import React from 'react';

const FounderCard = () => {
  return (
    <section className="py-20 px-12 bg-[#F8FAFC]">
      <div className="container mx-auto max-w-4xl">
        <div className="bg-white p-10 rounded-2xl border border-[#E2E8F0] shadow-md flex flex-col md:flex-row gap-8 items-center">
          <div className="w-32 h-32 md:w-48 md:h-48 rounded-full bg-gray-200 overflow-hidden shrink-0">
             {/* Placeholder for founder image - replace with actual image URL if available */}
             <img src="https://i.ibb.co/JjbCDM5x/Screenshot-2026-08-20-151126.png" alt="Sandesh" className="w-full h-full object-cover object-top"/>
          </div>
          <div>
            <p className="text-[#2563EB] font-semibold tracking-wider text-sm uppercase mb-2">MEET OUR FOUNDER</p>
            <h3 className="text-3xl font-bold text-[#123B7A] mb-2">Sandesh Jaiin</h3>
            <p className="text-[#123B7A] font-medium mb-4">Founder & Lead Advisor</p>
            <p className="text-[#64748B] leading-relaxed">
              With a deep passion for financial literacy and wealth creation, Sandesh Jaiin founded RS Financial Services to provide honest, transparent, and expert-driven financial guidance. His philosophy centers on the belief that everyone deserves a secure and prosperous financial future built on informed, long-term decisions.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
};

export default FounderCard;
