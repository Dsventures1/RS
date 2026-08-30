import React from 'react';

const RemainingSections = () => {
  return (
    <>
      <section className="py-12 md:py-20 px-6 md:px-12 bg-[#F8FAFC]">
        <div className="container mx-auto px-0 md:px-6 text-center border-t border-slate-200 pt-12">
            <h2 className="text-2xl md:text-4xl font-serif text-[#173B7A]">Ready to build your financial future?</h2>
            <a href="https://wa.link/fudqk8" target="_blank" rel="noopener noreferrer" className="inline-block bg-[#2563EB] text-white px-8 py-4 rounded font-semibold mt-6">Book a Consultation</a>
        </div>
      </section>
      <footer className="bg-[#172554] text-white py-12 px-6 md:px-12 text-xs">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8 mb-8">
             <div><h4 className='font-bold mb-4'>RS Financial Services</h4><p className='opacity-70'>Advise · Plan · Grow</p></div>
             <div><h4 className='font-bold mb-4'>Company</h4><p className='opacity-70'>About Us</p></div>
             <div><h4 className='font-bold mb-4'>Offerings</h4><p className='opacity-70'>Mutual Funds</p></div>
             <div><h4 className='font-bold mb-4'>Contact</h4><p className='opacity-70'>Address</p></div>
        </div>
        <div className="flex flex-col md:flex-row justify-between items-center pt-8 border-t border-white/20 gap-4 text-center md:text-left">
            <p className='opacity-60'>&copy; 2026 RS Financial Services. All rights reserved.</p>
            <p className='opacity-60 text-[10px]'>Mutual fund investments are subject to market risks. Read all scheme-related documents carefully before investing.</p>
        </div>
      </footer>
    </>
  );
};

export default RemainingSections;
