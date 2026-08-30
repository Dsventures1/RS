import React from 'react';
import Header from '../components/Header';
import Footer from '../components/Footer';
import TrustMetrics from '../components/TrustMetrics';
import Philosophy from '../components/AboutUsSections/Philosophy';
import MissionVisionGoals from '../components/AboutUsSections/MissionVisionGoals';
import FounderCard from '../components/AboutUsSections/FounderCard';
import TrustCards from '../components/AboutUsSections/TrustCards';
import ApproachSteps from '../components/AboutUsSections/ApproachSteps';
import Commitment from '../components/AboutUsSections/Commitment';

const AboutUs = () => {
  return (
    <div className="min-h-screen bg-[#F8FAFC]">
      <Header />
      <main>
        {/* About Us Hero */}
        <section className="bg-[#F4F8FC] py-12 md:py-20 px-6 md:px-12 text-center">
            <p className="text-[#2563EB] font-semibold tracking-wider text-xs md:text-sm uppercase mb-4">ABOUT RS FINANCIAL SERVICES</p>
            <h1 className="text-3xl md:text-5xl font-bold text-[#123B7A] mb-6">Helping you build wealth with clarity and confidence.</h1>
            <p className="text-[#64748B] text-base md:text-lg max-w-2xl mx-auto mb-10">RS Financial Services helps individuals and families make informed financial decisions through thoughtful investment planning, wealth management and long-term financial strategies.</p>
        </section>

        <TrustMetrics />

        <Commitment />

        {/* Who We Are Section */}
        <section className="py-12 md:py-20 px-6 md:px-12 bg-white">
            <div className="container mx-auto grid md:grid-cols-2 gap-8 md:gap-12 items-center">
                <div className="rounded-2xl overflow-hidden shadow-lg">
                    <img src="https://images.unsplash.com/photo-1554224155-8d04cb21cd6c?auto=format&fit=crop&q=80&w=800&h=600" alt="Financial Advisory" className="w-full h-auto" />
                </div>
                <div>
                    <p className="text-[#2563EB] font-semibold tracking-wider text-xs md:text-sm uppercase mb-3 md:mb-4">WHO WE ARE</p>
                    <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold text-[#123B7A] mb-4 md:mb-6">Your Wealth Deserves More Than Just An Investment.</h2>
                    <p className="text-[#64748B] text-sm md:text-base mb-4 md:mb-6 leading-relaxed">RS Financial Services helps individuals and families make informed financial decisions through personalized investment planning, wealth management and long-term financial strategies.</p>
                    <p className="text-[#64748B] text-sm md:text-base mb-6 md:mb-8 leading-relaxed">Our approach is built around understanding each client's goals, risk profile, financial priorities and future aspirations — and then creating a strategy designed around them.</p>
                    <a href="/services" className="text-[#2563EB] font-semibold text-sm md:text-base">Discover Our Approach →</a>
                </div>
            </div>
        </section>

        <MissionVisionGoals />
        <FounderCard />
        <Philosophy />
        <TrustCards />
        <ApproachSteps />

      </main>
      <Footer />
    </div>
  );
};

export default AboutUs;
