import React from 'react';

const MissionVisionGoals = () => {
  const items = [
    { title: 'Our Mission', desc: 'To provide personalized, expert financial advisory services that empower our clients to achieve their life goals with clarity, security, and confidence.' },
    { title: 'Our Vision', desc: 'To be the most trusted financial partner for families and individuals, recognized for our integrity, long-term approach, and unwavering commitment to client success.' },
    { title: 'Our Goals', desc: 'To continuously deliver sustainable wealth creation, simplify complex financial decisions, and foster enduring relationships built on transparency and expertise.' },
  ];

  return (
    <section className="py-20 px-12 bg-white">
      <div className="container mx-auto grid md:grid-cols-3 gap-8">
        {items.map((item, i) => (
          <div key={i} className="p-8 rounded-2xl border border-[#E2E8F0] shadow-sm hover:shadow-md transition-shadow">
            <h3 className="text-2xl font-bold text-[#123B7A] mb-4">{item.title}</h3>
            <p className="text-[#64748B] leading-relaxed">{item.desc}</p>
          </div>
        ))}
      </div>
    </section>
  );
};

export default MissionVisionGoals;
