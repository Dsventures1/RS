import React from 'react';

const ApproachSteps = () => {
  const steps = [
    { num: '01', title: 'Understand', desc: 'We begin by understanding your goals, priorities, financial position and aspirations.' },
    { num: '02', title: 'Plan', desc: 'We create a strategy aligned with your objectives, risk profile and time horizon.' },
    { num: '03', title: 'Implement', desc: 'We help put the strategy into action through suitable investment solutions.' },
    { num: '04', title: 'Review & Evolve', desc: 'We continuously review your strategy and adapt it as your financial needs change.' },
  ];

  return (
    <section className="py-20 px-12 bg-white">
      <div className="container mx-auto text-center mb-16">
        <h2 className="text-4xl font-bold text-[#123B7A] mb-4">How We Work</h2>
        <p className="text-[#64748B] text-lg">A simple, structured approach to building and managing your financial future.</p>
      </div>
      <div className="container mx-auto grid md:grid-cols-2 lg:grid-cols-4 gap-8">
        {steps.map((step, i) => (
          <div key={i} className="text-center">
            <div className="text-5xl font-bold text-[#2563EB] mb-6">{step.num}</div>
            <h3 className="text-xl font-bold text-[#123B7A] mb-4">{step.title}</h3>
            <p className="text-[#64748B]">{step.desc}</p>
          </div>
        ))}
      </div>
    </section>
  );
};

export default ApproachSteps;
