import React from 'react';

const metrics = [
  { label: 'Assets Under Management', value: '₹8.5+ Cr' },
  { label: 'Clients', value: '200+' },
  { label: 'Years of Experience', value: '12+' },
  { label: 'Awards & Recognitions', value: '20+' },
];

const TrustMetrics = () => {
  return (
    <section className="px-6 py-12 bg-white border-b border-[#E5EAF2]">
        <div className="container mx-auto grid grid-cols-2 md:grid-cols-4 gap-y-8 divide-x divide-[#E5EAF2]">
          {metrics.map((m, i) => (
            <div key={i} className={`px-4 md:px-12 text-center ${i % 2 !== 0 ? 'border-l' : ''} md:border-l`}>
              <div className="text-2xl md:text-4xl font-bold text-[#173B7A]">{m.value}</div>
              <div className="text-xs md:text-sm text-[#6B7280] mt-2 font-medium">{m.label}</div>
            </div>
          ))}
        </div>
    </section>
  );
};

export default TrustMetrics;
