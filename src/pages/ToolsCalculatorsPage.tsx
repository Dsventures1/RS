import React from 'react';
import { Sliders, Sparkles } from 'lucide-react';
import Header from '../components/Header';
import Footer from '../components/Footer';

const ToolsCalculatorsPage = () => {
  return (
    <div className="min-h-screen bg-[#F8FAFC] flex flex-col">
      <Header />

      {/* Hero Banner */}
      <section className="bg-white py-16 md:py-24 border-b border-[#E2E8F0] px-6 md:px-12 text-center">
        <div className="max-w-4xl mx-auto space-y-4 md:space-y-6">
          <span className="text-[#2563EB] font-bold tracking-[0.2em] text-xs sm:text-sm uppercase">
            WEALTH & PLANNING SUITE
          </span>
          <h1 className="text-3xl sm:text-4xl md:text-5xl font-bold text-[#0B1B3D] leading-tight">
            Tools & Calculators
          </h1>
          <p className="text-base sm:text-lg text-[#52627A] leading-relaxed max-w-2xl mx-auto">
            Comprehensive financial tools spanning asset allocation, loan comparisons, retirement projections, and tax-saving estimators.
          </p>
        </div>
      </section>

      {/* Main Body Placeholder */}
      <main className="flex-grow py-16 md:py-24 px-6 md:px-12">
        <div className="max-w-3xl mx-auto">
          <div className="bg-white border border-[#E2E8F0] rounded-2xl p-8 md:p-14 shadow-sm text-center flex flex-col items-center space-y-6">
            <div className="w-16 h-16 rounded-2xl bg-[#F4F8FD] border border-[#E3EAF4] flex items-center justify-center text-[#2563EB] shadow-xs">
              <Sliders size={32} />
            </div>

            <div className="space-y-2 max-w-lg">
              <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-[#EFF6FF] text-[#2563EB] text-xs font-semibold uppercase tracking-wider">
                <Sparkles size={14} />
                <span>Under Preparation</span>
              </div>
              <h2 className="text-2xl sm:text-3xl font-bold text-[#0B1B3D] pt-2">
                Interactive Calculators Loading Soon...
              </h2>
              <p className="text-[#64748B] text-sm sm:text-base leading-relaxed">
                Our suite of interactive financial planning tools is currently in development. You will soon be able to evaluate investment trade-offs, EMI strategies, and financial milestones.
              </p>
            </div>

            <div className="pt-4 flex flex-col sm:flex-row gap-4 justify-center items-center w-full max-w-md">
              <a
                href="https://wa.link/fudqk8"
                target="_blank"
                rel="noopener noreferrer"
                className="bg-[#2563EB] text-white px-8 py-3.5 rounded-xl font-semibold shadow-md hover:bg-[#1e4ba1] transition-colors w-full sm:w-auto text-center text-sm sm:text-base"
              >
                Book a Consultation
              </a>
              <a
                href="/services"
                className="bg-white text-[#173B7A] border border-[#173B7A] px-8 py-3.5 rounded-xl font-semibold hover:bg-[#F8FAFC] transition-colors w-full sm:w-auto text-center text-sm sm:text-base"
              >
                Explore Services
              </a>
            </div>
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
};

export default ToolsCalculatorsPage;
