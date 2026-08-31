import React from 'react';

const TrustCards = () => {
  const cards = [
    { title: 'In Market Experience', desc: 'Experience-driven financial guidance built around long-term thinking.' },
    { title: 'Personalized Investment Plans', desc: 'Strategies designed around your goals, risk profile and financial journey.' },
    { title: 'Wide Range of Investment Solutions', desc: 'Access to diversified investment products across multiple asset classes.' },
    { title: 'Transparency You Can Trust', desc: 'Clear communication, transparent processes and no unnecessary complexity.' },
    { title: 'Dedicated Client Support', desc: 'Ongoing guidance and assistance whenever your financial needs evolve.' },
    { title: 'Long-Term Relationships', desc: 'We focus on building lasting relationships rather than chasing short-term transactions.' },
  ];

  return (
    <section className="py-20 px-12 bg-[#F4F8FC]">
      <div className="container mx-auto text-center mb-16">
        <p className="text-[#2563EB] font-semibold tracking-wider text-sm uppercase mb-4">WHY RS FINANCIAL SERVICES</p>
        <h2 className="text-3xl md:text-4xl font-bold text-[#123B7A] mb-4">A more thoughtful approach to wealth</h2>
      </div>
      <div className="container mx-auto grid md:grid-cols-2 lg:grid-cols-3 gap-8">
        {cards.map((card, i) => (
          <div key={i} className="bg-white p-8 rounded-2xl shadow-sm border border-[#E2E8F0]">
            <h3 className="text-xl font-bold text-[#123B7A] mb-4">{card.title}</h3>
            <p className="text-[#64748B]">{card.desc}</p>
          </div>
        ))}
      </div>
    </section>
  );
};

export default TrustCards;
