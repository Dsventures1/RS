import React from 'react';

const Philosophy = () => {
  const cards = [
    { title: 'Clarity Before Complexity', desc: 'Financial decisions should be understandable. We focus on clear guidance and practical strategies rather than unnecessary complexity.' },
    { title: 'Long-Term Thinking', desc: 'Successful wealth creation requires patience, discipline and a strategy designed for the long term.' },
    { title: 'Advice Built Around You', desc: 'Every client has different goals, priorities and circumstances. Our approach is designed around your individual financial journey.' },
  ];

  return (
    <section className="py-20 px-12 bg-[#F8FAFC]">
      <div className="container mx-auto text-center mb-16">
        <h2 className="text-4xl font-bold text-[#123B7A] mb-4">Our Philosophy</h2>
        <p className="text-[#64748B] text-lg">Thoughtful financial planning built around your goals, your priorities and your future.</p>
      </div>
      <div className="container mx-auto grid md:grid-cols-3 gap-8">
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

export default Philosophy;
