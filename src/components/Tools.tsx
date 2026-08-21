import React from 'react';

const tools = [
  { title: 'Retirement Planner', desc: 'Estimate the amount you may need to build the retirement lifestyle you envision.', cta: 'Plan Your Retirement →' },
  { title: 'Child Education Planner', desc: 'Estimate future education costs and plan your investment goals accordingly.', cta: 'Plan Education Goal →' },
];

const Tools = () => {
  return (
    <section className="p-12 grid md:grid-cols-2 gap-8 bg-slate-50">
      {tools.map((t, i) => (
        <div key={i} className="bg-white p-8 rounded-xl shadow-sm border border-slate-100">
            <h3 className="text-2xl font-serif text-[#173B7A] mb-4">{t.title}</h3>
            <p className="text-[#6B7280] mb-6 leading-relaxed">{t.desc}</p>
            <button className="text-[#2563EB] font-semibold hover:underline">{t.cta}</button>
        </div>
      ))}
    </section>
  );
};

export default Tools;
