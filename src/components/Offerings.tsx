import React from 'react';

const products = [
  { title: 'Mutual Funds', image: 'https://images.unsplash.com/photo-1554224155-8d04cb21cd6c?auto=format&fit=crop&q=80&w=800&h=600', desc: 'Diversified investment solutions professionally managed across equity, debt and hybrid strategies.' },
  { title: 'Equity & ETFs', image: 'https://images.unsplash.com/photo-1611974789855-9c2a0a7236a3?auto=format&fit=crop&q=80&w=800&h=600', desc: 'Market-linked solutions designed for long-term growth and diversified equity exposure.' },
  { title: 'Portfolio Management Services (PMS)', image: 'https://images.unsplash.com/photo-1552664730-d307ca884978?auto=format&fit=crop&q=80&w=800&h=600', desc: 'Personalized portfolio strategies managed around your goals, risk profile and investment horizon.' },
  { title: 'National Pension System (NPS)', image: 'https://images.unsplash.com/photo-1582213782179-e0d53f98f2ca?auto=format&fit=crop&q=80&w=800&h=600', desc: 'A structured retirement solution designed to help build long-term financial security.' },
  { title: 'Loan Against Mutual Funds', image: 'https://images.unsplash.com/photo-1556742049-0cfed4f6a45d?auto=format&fit=crop&q=80&w=800&h=600', desc: 'Access liquidity against eligible mutual fund investments without disrupting your long-term portfolio.' },
  { title: 'Insurance', image: 'https://images.unsplash.com/photo-1450101499163-c8848c66ca85?auto=format&fit=crop&q=80&w=800&h=600', desc: 'Protection-focused solutions designed to safeguard your family, income and financial goals.' },
  { title: 'Fixed Deposits', image: 'https://images.unsplash.com/photo-1563986768609-322da13575f3?auto=format&fit=crop&q=80&w=800&h=600', desc: 'Stable, predictable investment options designed for capital preservation and dependable returns.' },
  { title: 'Structured Debt', image: 'https://images.unsplash.com/photo-1579621970563-ebec7560ff3e?auto=format&fit=crop&q=80&w=800&h=600', desc: 'Specialized fixed-income opportunities designed for investors seeking diversified income solutions.' },
  { title: 'Non-Convertible Debentures', image: 'https://images.unsplash.com/photo-1460925895917-afdab827c52f?auto=format&fit=crop&q=80&w=800&h=600', desc: 'Fixed-income investment opportunities designed to provide structured returns over a defined tenure.' },
];

const Offerings = () => {
  return (
    <section className="bg-[#F7FAFF] py-12 md:py-[100px]">
      <div className="max-w-[1500px] mx-auto px-4 md:px-6">
        {/* HERO */}
        <div className="text-center mb-12 md:mb-[80px] pt-4 md:pt-[60px]">
          <span className="text-[#2563EB] font-bold tracking-[3px] text-2xl md:text-3xl uppercase">OUR SOLUTIONS</span>
          <h2 className="text-2xl md:text-[32px] lg:text-[38px] font-bold text-[#123B8F] leading-[1.2] mt-4">Services designed around your financial goals</h2>
          <p className="text-[#52627A] text-base md:text-[18px] leading-[1.7] max-w-[750px] mx-auto mt-4 md:mt-6">
            From wealth creation to protection and diversification, explore investment solutions designed to support every stage of your financial journey.
          </p>
        </div>

        {/* SOLUTIONS GRID */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-[24px]">
          {products.map((p, i) => (
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
  );
};

export default Offerings;
