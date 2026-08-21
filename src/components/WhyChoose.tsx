import React from 'react';
import { Award, Target, Layers, ShieldCheck, Headphones, HeartHandshake } from 'lucide-react';

const features = [
  { icon: Award, title: 'Decades of Expertise', desc: 'Experience-driven financial guidance built around long-term thinking.' },
  { icon: Target, title: 'Personalized Investment Plans', desc: 'Strategies designed around your goals, risk profile and financial journey.' },
  { icon: Layers, title: 'Wide Range of Investment Solutions', desc: 'Access to diversified investment products across multiple asset classes.' },
  { icon: ShieldCheck, title: 'Transparency You Can Trust', desc: 'Clear communication, transparent processes and no unnecessary complexity.' },
  { icon: Headphones, title: 'Dedicated Client Support', desc: 'Ongoing guidance and assistance whenever your financial needs evolve.' },
  { icon: HeartHandshake, title: 'Long-Term Relationships', desc: 'We focus on building lasting relationships rather than chasing short-term transactions.' },
];

const WhyChoose = () => {
  return (
    <section className="bg-[#F7FAFF] py-[110px]">
      <div className="max-w-[1200px] mx-auto px-6">
        {/* SECTION HEADER */}
        <div className="text-center mb-[60px]">
          <span className="text-[#2563EB] font-bold tracking-[2px] text-[14px] uppercase">WHY RS FINANCIAL SERVICES</span>
          <h2 className="text-[48px] font-extrabold text-[#123B8F] leading-[1.15] mt-4">A More Thoughtful Approach to Wealth</h2>
          <p className="text-[#52627A] text-[17px] leading-[1.7] max-w-[720px] mx-auto mt-6">
            Financial decisions are personal. Our approach combines experience, thoughtful planning and ongoing guidance to help you make confident decisions at every stage of your financial journey.
          </p>
        </div>

        {/* FEATURE GRID */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-[30px]">
          {features.map((f, i) => (
            <div 
              key={i} 
              className="bg-white border border-[#E5ECF7] p-8 rounded-[18px] shadow-sm hover:shadow-lg hover:-translate-y-[3px] hover:border-[#2563EB]/30 transition-all duration-200"
            >
              <div className="w-[48px] h-[48px] bg-[#EEF5FF] text-[#2563EB] flex items-center justify-center rounded-[12px] mb-6">
                <f.icon size={24} />
              </div>
              <h3 className="text-[20px] font-bold text-[#123B8F] mb-3">{f.title}</h3>
              <p className="text-[#607089] text-[15px] leading-[1.65]">{f.desc}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default WhyChoose;
