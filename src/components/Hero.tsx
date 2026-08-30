import React, { useState, useEffect } from 'react';

const IMAGES = [
  "https://images.unsplash.com/photo-1511895426328-dc8714191300?ixlib=rb-4.0.3&auto=format&fit=crop&w=1920&q=80", // Family / Home
  "https://images.unsplash.com/photo-1573497620053-ea5300f94f21?ixlib=rb-4.0.3&auto=format&fit=crop&w=1920&q=80", // Retirement / Older couple
  "https://images.unsplash.com/photo-1454165804606-c3d57bc86b40?ixlib=rb-4.0.3&auto=format&fit=crop&w=1920&q=80"  // Professional planning
];

const Hero = () => {
  const [currentIdx, setCurrentIdx] = useState(0);

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentIdx((prev) => (prev + 1) % IMAGES.length);
    }, 3000); // Changes every 3 seconds
    return () => clearInterval(timer);
  }, []);

  return (
    <section className="relative py-20 md:py-32 px-6 md:px-12 overflow-hidden min-h-[600px] md:min-h-[700px] flex items-center">
      {/* Background Images Slider */}
      {IMAGES.map((img, idx) => (
        <div
          key={img}
          className={`absolute inset-0 transition-opacity duration-1000 ease-in-out z-0 ${
            idx === currentIdx ? 'opacity-100' : 'opacity-0'
          }`}
        >
          <img src={img} alt={`Slide ${idx + 1}`} className="w-full h-full object-cover object-[70%_20%]" />
        </div>
      ))}
      
      {/* Overlay - Dark gradient from left to right */}
      <div className="absolute inset-0 bg-gradient-to-r from-black/90 via-black/50 to-transparent z-10"></div>

      {/* Content */}
      <div className="relative z-20 container mx-auto">
        <div className="max-w-2xl space-y-6">
          <span className="text-gray-300 font-bold tracking-[0.2em] text-xs md:text-sm uppercase">ADVISE · PLAN · GROW</span>
          <h1 className="text-4xl md:text-6xl lg:text-7xl font-bold leading-[1.1] text-white font-sans drop-shadow-lg">Build wealth with clarity and<br/>grow with confidence.</h1>
          <p className="text-lg md:text-xl text-gray-200 leading-relaxed font-medium max-w-xl drop-shadow-md">Personalized financial guidance, investment solutions and long-term wealth strategies designed around your goals.</p>
          
          <div className="flex flex-col sm:flex-row gap-4 pt-8">
            <a href="https://wa.link/fudqk8" target="_blank" rel="noopener noreferrer" className="bg-[#2563EB] text-white px-8 md:px-10 py-4 rounded-full font-semibold shadow-lg hover:bg-[#1d4ed8] transition-transform hover:-translate-y-1 text-base md:text-lg w-full sm:w-auto text-center">Contact Us</a>
            <a href="/services" className="bg-transparent border-2 border-white text-white px-8 md:px-10 py-4 rounded-full font-semibold hover:bg-white/10 transition-transform hover:-translate-y-1 text-base md:text-lg w-full sm:w-auto text-center shadow-sm">Explore Our Solutions</a>
          </div>
        </div>
      </div>

      {/* Slider Dots */}
      <div className="absolute bottom-8 left-6 md:left-12 lg:left-[calc(50%-600px)] 2xl:left-[calc(50%-768px)] z-20 flex gap-3 container mx-auto px-0 md:px-12">
        <div className="flex gap-2">
          {IMAGES.map((_, idx) => (
            <button 
              key={idx} 
              onClick={() => setCurrentIdx(idx)}
              className={`h-2.5 rounded-full transition-all duration-300 border border-white ${idx === currentIdx ? 'w-8 bg-white' : 'w-2.5 bg-transparent hover:bg-white/50'}`}
              aria-label={`Go to slide ${idx + 1}`}
            />
          ))}
        </div>
      </div>
    </section>
  );
};

export default Hero;
