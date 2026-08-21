import React, { useState } from 'react';

const SIPCalculator = () => {
  const [investment, setInvestment] = useState(10000);
  const [rate, setRate] = useState(12);
  const [years, setYears] = useState(10);

  const monthlyRate = rate / 12 / 100;
  const totalMonths = years * 12;
  const futureValue = investment * ((Math.pow(1 + monthlyRate, totalMonths) - 1) / monthlyRate) * (1 + monthlyRate);
  const investedAmount = investment * totalMonths;
  const estimatedReturns = futureValue - investedAmount;

  return (
    <section className="p-12 bg-slate-50">
      <h2 className="text-4xl font-bold text-[#173B7A] text-center mb-12 font-sans">See What Consistent Investing Can Build</h2>
      <div className="bg-white p-8 rounded-xl shadow-sm border border-[#E5EAF2] grid md:grid-cols-2 gap-12 max-w-5xl mx-auto">
        <div className="space-y-6">
          <div className='space-y-2'>
              <div className='flex justify-between'><label className="text-sm font-semibold text-[#173B7A]">Monthly Investment (₹)</label><span className='font-bold text-[#173B7A]'>₹{investment.toLocaleString()}</span></div>
              <input type="range" min="1000" max="100000" step="1000" value={investment} onChange={e => setInvestment(Number(e.target.value))} className="w-full h-1.5 bg-[#E5EAF2] rounded-full accent-[#2563EB]" />
          </div>
          {/* Add more inputs here in a real app */}
        </div>
        <div className="bg-[#F4F8FF] p-6 rounded-lg border border-dashed border-[#E5EAF2]">
          <h3 className="text-lg font-semibold text-[#173B7A] mb-4">Results</h3>
          <div className="text-4xl font-bold text-[#2563EB] mb-6">₹{Math.round(futureValue).toLocaleString()}</div>
          <div className='grid grid-cols-2 gap-4'>
             <div className='bg-white p-4 rounded border border-[#E5EAF2]'><div className='text-[10px] uppercase text-[#6B7280] font-semibold'>Invested</div><div className='font-bold text-[#173B7A]'>₹{investedAmount.toLocaleString()}</div></div>
             <div className='bg-white p-4 rounded border border-[#E5EAF2]'><div className='text-[10px] uppercase text-[#6B7280] font-semibold'>Returns</div><div className='font-bold text-[#2563EB]'>₹{Math.round(estimatedReturns).toLocaleString()}</div></div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default SIPCalculator;
