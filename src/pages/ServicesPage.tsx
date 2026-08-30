import React from 'react';
import Header from '../components/Header';
import Footer from '../components/Footer';
// Removed unused imports

const allServices = [
  { title: 'Mutual Funds', image: 'https://images.unsplash.com/photo-1554224155-8d04cb21cd6c?auto=format&fit=crop&q=80&w=800&h=600', desc: 'Diversified investment solutions professionally managed across equity, debt and hybrid strategies.' },
  { title: 'Equity & ETFs', image: 'https://images.unsplash.com/photo-1611974789855-9c2a0a7236a3?auto=format&fit=crop&q=80&w=800&h=600', desc: 'Market-linked solutions designed for long-term growth and diversified equity exposure.' },
  { title: 'Portfolio Management Services (PMS)', image: 'https://images.unsplash.com/photo-1552664730-d307ca884978?auto=format&fit=crop&q=80&w=800&h=600', desc: 'Personalized portfolio strategies managed around your goals, risk profile and investment horizon.' },
  { title: 'National Pension System (NPS)', image: 'https://images.unsplash.com/photo-1582213782179-e0d53f98f2ca?auto=format&fit=crop&q=80&w=800&h=600', desc: 'A structured retirement solution designed to help you build long-term financial security.' },
  { title: 'Loan Against Mutual Funds', image: 'https://images.unsplash.com/photo-1556742049-0cfed4f6a45d?auto=format&fit=crop&q=80&w=800&h=600', desc: 'Access liquidity against eligible mutual fund investments without immediately selling your holdings.' },
  { title: 'Insurance', image: 'https://images.unsplash.com/photo-1450101499163-c8848c66ca85?auto=format&fit=crop&q=80&w=800&h=600', desc: 'Protection solutions designed to safeguard your family, income and long-term financial goals.' },
  { title: 'Fixed Deposits', image: 'https://images.unsplash.com/photo-1563986768609-322da13575f3?auto=format&fit=crop&q=80&w=800&h=600', desc: 'Stable and predictable investment options designed to support capital preservation and financial planning.' },
  { title: 'Structured Debt', image: 'https://images.unsplash.com/photo-1554224155-8d04cb21cd6c?auto=format&fit=crop&q=80&w=800&h=600', desc: 'Specialized fixed-income opportunities designed for investors seeking structured return and diversification.' },
  { title: 'Fractional Real Estate', image: 'https://images.unsplash.com/photo-1582407947304-fd86f028f716?auto=format&fit=crop&q=80&w=800&h=600', desc: 'Access professionally selected real-estate opportunities through fractional ownership structures.' },
  { title: 'Alternative Investment Funds', image: 'https://images.unsplash.com/photo-1559526323-cb2f2fe2591b?auto=format&fit=crop&q=80&w=800&h=600', desc: 'Specialized investment strategies designed to diversify beyond traditional asset classes.' },
  { title: 'Non-Convertible Debentures', image: 'https://images.unsplash.com/photo-1460925895917-afdab827c52f?auto=format&fit=crop&q=80&w=800&h=600', desc: 'Fixed-income investment opportunities designed to provide potential returns with defined tenure and structure.' },
];

const ServicesPage = () => {
  return (
    <div className="min-h-screen bg-[#F8FAFC]">
      <Header />
      
      {/* Hero Section */}
      <section className="bg-white py-[100px] border-b border-[#E2E8F0]">
        <div className="max-w-[1200px] mx-auto px-6 text-center">
          <span className="text-[#2563EB] font-bold tracking-[3px] text-[14px] uppercase">OUR SERVICES</span>
          <h1 className="text-3xl md:text-[56px] font-bold text-[#123B8F] leading-[1.1] mt-4">Solutions Designed Around Your Financial Goals</h1>
          <p className="text-[#52627A] text-[18px] leading-[1.7] max-w-[750px] mx-auto mt-6">
            From wealth creation to protection and diversification, we provide thoughtfully selected financial solutions designed to support every stage of your financial journey.
          </p>
          <div className="flex justify-center gap-4 mt-10">
            <a href="https://wa.link/fudqk8" target="_blank" rel="noopener noreferrer" className="bg-[#173B7A] text-white px-8 py-4 rounded-[12px] shadow-sm hover:bg-[#1e4ba1] transition-colors font-semibold">Book a Consultation</a>
            <button className="text-[#173B7A] bg-white border border-[#173B7A] px-8 py-4 rounded-[12px] shadow-sm hover:bg-[#F8FAFC] transition-colors font-semibold">Explore Our Services</button>
          </div>
        </div>
      </section>

      {/* Services Intro */}
      <section className="py-[100px]">
        <div className="max-w-[1200px] mx-auto px-6 text-center">
          <span className="text-[#2563EB] font-bold tracking-[3px] text-[14px] uppercase">OUR OFFERINGS</span>
          <h2 className="text-[40px] font-bold text-[#123B8F] leading-[1.1] mt-4">Financial Solutions Built Around Your Needs</h2>
          <p className="text-[#52627A] text-[18px] leading-[1.7] max-w-[750px] mx-auto mt-6">
            Every financial journey is different. Our approach combines thoughtful planning, diversified investment solutions and long-term guidance to help you make informed financial decisions with confidence.
          </p>
        </div>
      </section>

      {/* Services Grid */}
      <section className="pb-[100px]">
        <div className="max-w-[1200px] mx-auto px-6">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-[24px]">
            {allServices.map((p, i) => (
              <div 
                key={i} 
                className="group bg-white border border-[#E3EAF4] rounded-[16px] shadow-sm hover:shadow-lg hover:-translate-y-[3px] hover:border-[#2563EB]/30 transition-all duration-300 flex flex-col overflow-hidden"
              >
                <div className="h-[200px] overflow-hidden">
                  <img 
                    src={p.image} 
                    alt={p.title} 
                    className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105" 
                  />
                </div>
                <div className="p-[30px] flex flex-col flex-grow">
                  <h3 className="text-[20px] font-bold text-[#123B7A] mb-3">{p.title}</h3>
                  <p className="text-[#607089] text-[15px] leading-[1.6] mb-6 flex-grow">{p.desc}</p>
                  <a href="https://wa.link/fudqk8" target="_blank" rel="noopener noreferrer" className="text-[#2563EB] font-semibold text-[16px] hover:text-[#123B7A] transition-colors">
                    Explore Solution →
                  </a>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Featured Service Section */}
      <section className="bg-[#F4F8FD] py-[100px]">
        <div className="max-w-[1200px] mx-auto px-6 flex flex-col md:flex-row items-center gap-12">
          <div className="md:w-1/2">
            <span className="text-[#2563EB] font-bold tracking-[3px] text-[14px] uppercase">PERSONALIZED GUIDANCE</span>
            <h2 className="text-[40px] font-bold text-[#123B8F] leading-[1.1] mt-4 mb-6">More Than Products. A Strategy Built Around You.</h2>
            <p className="text-[#52627A] text-[18px] leading-[1.7] mb-8">
              We believe financial planning should begin with understanding you — your goals, priorities, risk profile, time horizon and future aspirations. Our role is to help connect the right financial solutions with the bigger picture.
            </p>
            <a href="https://wa.link/fudqk8" target="_blank" rel="noopener noreferrer" className="bg-[#173B7A] text-white px-8 py-4 rounded-[12px] shadow-sm hover:bg-[#1e4ba1] transition-colors font-semibold">Book a Consultation →</a>
          </div>
          <div className="md:w-1/2 flex items-center justify-center">
            <img 
              src="https://images.unsplash.com/photo-1552664730-d307ca884978?auto=format&fit=crop&q=80&w=800&h=600" 
              alt="Financial Planning" 
              className="w-full h-auto rounded-[24px] shadow-lg"
            />
          </div>
        </div>
      </section>

      {/* How We Help */}
      <section className="py-[100px]">
        <div className="max-w-[1200px] mx-auto px-6 text-center">
          <span className="text-[#2563EB] font-bold tracking-[3px] text-[14px] uppercase">OUR APPROACH</span>
          <h2 className="text-3xl md:text-[40px] font-bold text-[#123B8F] leading-[1.1] mt-4 mb-16">From Financial Goals to a Clearer Strategy</h2>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-12 relative">
            {[
              { num: '01', title: 'Understand', desc: 'We understand your goals, financial priorities, risk profile and investment horizon.' },
              { num: '02', title: 'Plan', desc: 'We identify suitable financial solutions and build a strategy around your requirements.' },
              { num: '03', title: 'Grow', desc: 'We provide ongoing guidance as your financial goals and circumstances evolve.' },
            ].map((step, i) => (
              <div key={i} className="relative z-10">
                <div className="text-[48px] font-bold text-[#2563EB]/20 mb-4">{step.num}</div>
                <h3 className="text-[24px] font-bold text-[#123B7A] mb-4">{step.title}</h3>
                <p className="text-[#607089] text-[16px] leading-[1.7] max-w-[300px] mx-auto">{step.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="bg-[#123B7A] py-[80px]">
        <div className="max-w-[1200px] mx-auto px-6 text-center">
          <h2 className="text-2xl md:text-[40px] font-bold text-white leading-[1.1] mb-6">Let's Build a Financial Strategy Around Your Goals.</h2>
          <p className="text-[#E3EAF4] text-[18px] mb-10 max-w-[600px] mx-auto">
            Speak with RS Financial Services to explore solutions designed around your financial journey.
          </p>
          <a href="https://wa.link/fudqk8" target="_blank" rel="noopener noreferrer" className="bg-white text-[#123B7A] px-10 py-4 rounded-[12px] shadow-sm hover:bg-[#F8FAFC] transition-colors font-semibold">Book a Consultation</a>
        </div>
      </section>
      
      <Footer />
    </div>
  );
};

export default ServicesPage;
