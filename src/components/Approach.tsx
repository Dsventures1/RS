import React from 'react';

const steps = [
  { num: '01', title: 'Understand', desc: 'Understand your financial goals, priorities and risk profile.' },
  { num: '02', title: 'Plan', desc: 'Build a personalized financial strategy.' },
  { num: '03', title: 'Invest', desc: 'Implement suitable investment solutions.' },
  { num: '04', title: 'Review', desc: 'Review and refine your portfolio as your needs evolve.' },
];

const Approach = () => {
  return (
    <section className="py-12 px-6 md:p-12 bg-white">
      <h2 className="text-2xl md:text-4xl font-serif text-[#173B7A] text-center mb-12">A Strategy Built Around You</h2>
      <div className="grid md:grid-cols-4 gap-8">
        {steps.map((s, i) => (
          <div key={i} className="border-t-2 border-[#2563EB] pt-6">
            <div className="text-3xl font-bold text-[#2563EB] mb-4">{s.num}</div>
            <h3 className="text-xl font-semibold text-[#173B7A] mb-2">{s.title}</h3>
            <p className="text-[#6B7280] text-sm leading-relaxed">{s.desc}</p>
          </div>
        ))}
      </div>
    </section>
  );
};

export default Approach;
