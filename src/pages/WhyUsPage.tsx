import React from 'react';
import Header from '../components/Header';
import Footer from '../components/Footer';
import TrustMetrics from '../components/TrustMetrics';

const features = [
  { title: 'Decades of Expertise', image: 'https://images.unsplash.com/photo-1552664730-d307ca884978?auto=format&fit=crop&q=80&w=800&h=600', desc: 'Experience-driven financial guidance built around long-term thinking and informed decision-making.' },
  { title: 'Personalized Investment Plans', image: 'https://images.unsplash.com/photo-1556742049-0cfed4f6a45d?auto=format&fit=crop&q=80&w=800&h=600', desc: 'Strategies designed around your goals, risk profile, financial priorities and investment horizon.' },
  { title: 'Wide Range of Solutions', image: 'https://images.unsplash.com/photo-1450101499163-c8848c66ca85?auto=format&fit=crop&q=80&w=800&h=600', desc: 'Access to diversified investment and financial solutions across multiple asset classes.' },
  { title: 'Transparency You Can Trust', image: 'https://images.unsplash.com/photo-1554224155-8d04cb21cd6c?auto=format&fit=crop&q=80&w=800&h=600', desc: 'Clear communication, transparent processes and straightforward financial guidance without unnecessary complexity.' },
  { title: 'Dedicated Client Support', image: 'https://images.unsplash.com/photo-1582213782179-e0d53f98f2ca?auto=format&fit=crop&q=80&w=800&h=600', desc: 'Ongoing guidance and assistance as your financial needs, priorities and circumstances evolve.' },
  { title: 'Long-Term Relationships', image: 'https://images.unsplash.com/photo-1521737711867-e3b97375f902?auto=format&fit=crop&q=80&w=800&h=600', desc: 'We focus on building lasting client relationships rather than chasing short-term transactions.' },
];

const WhyUsPage = () => {
  return (
    <div className="min-h-screen bg-white">
      <Header />
      
      {/* Hero Section */}
      <section className="py-12 md:py-24 px-6 md:px-12 bg-white">
        <div className="max-w-7xl mx-auto flex flex-col md:flex-row items-center gap-8 md:gap-12">
            <div className="md:w-1/2 space-y-4 md:space-y-6">
                <span className="text-[#2563EB] font-bold tracking-[0.2em] text-xs md:text-sm uppercase">WHY RS FINANCIAL SERVICES</span>
                <h1 className="text-3xl md:text-6xl font-bold leading-[1.1] text-[#123B7A]">Why Your Wealth Deserves a More Thoughtful Approach</h1>
                <p className="text-base md:text-xl text-[#64748B] leading-relaxed">Financial decisions are deeply personal. At RS Financial Services, we combine experience, thoughtful planning and ongoing guidance to help you make informed decisions with confidence.</p>
                <div className="flex flex-col sm:flex-row gap-4 pt-4 md:pt-6">
                    <a href="https://wa.link/fudqk8" target="_blank" rel="noopener noreferrer" className="bg-[#123B7A] text-white px-8 py-4 rounded-lg font-semibold hover:bg-[#0B2F6B] transition-colors text-center">Book a Consultation</a>
                    <a href="/about" className="bg-white border-2 border-[#123B7A] text-[#123B7A] px-8 py-4 rounded-lg font-semibold hover:bg-[#F4F8FC] transition-colors text-center">Explore Our Approach →</a>
                </div>
            </div>
            <div className="md:w-1/2">
                <img src="https://images.unsplash.com/photo-1559526323-cb2f2fe2591b?auto=format&fit=crop&q=80&w=800&h=600" alt="Financial advisor" className="rounded-2xl shadow-xl w-full h-auto" />
            </div>
        </div>
      </section>

      <TrustMetrics />

      {/* Feature Grid */}
      <section className="py-24 px-12 bg-[#F4F8FC]">
        <div className="max-w-7xl mx-auto">
            <div className="text-center mb-16 space-y-4">
                <span className="text-[#2563EB] font-bold tracking-[0.2em] text-sm uppercase">WHY CHOOSE US</span>
                <h2 className="text-4xl font-bold text-[#123B7A]">Built Around Your Goals. Guided by Experience.</h2>
                <p className="text-lg text-[#64748B] max-w-2xl mx-auto">We believe effective financial advice begins with understanding the person behind the portfolio. Our approach combines personalized planning, transparent communication and long-term guidance.</p>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                {features.map((f, i) => (
                    <div key={i} className="bg-white border border-[#E2E8F0] rounded-2xl overflow-hidden shadow-sm hover:shadow-lg transition-all duration-300">
                        <img src={f.image} alt={f.title} className="w-full h-48 object-cover" />
                        <div className="p-6 space-y-3">
                            <h3 className="text-xl font-bold text-[#123B7A]">{f.title}</h3>
                            <p className="text-[#64748B] text-sm leading-relaxed">{f.desc}</p>
                            <a href="#" className="inline-block text-[#2563EB] font-semibold text-sm pt-2 hover:text-[#123B7A]">Learn More →</a>
                        </div>
                    </div>
                ))}
            </div>
        </div>
      </section>

      {/* Our Difference */}
      <section className="py-24 px-12">
        <div className="max-w-7xl mx-auto flex flex-col md:flex-row items-center gap-16">
            <div className="md:w-1/2">
                <img src="https://images.unsplash.com/photo-1554224155-8d04cb21cd6c?auto=format&fit=crop&q=80&w=800&h=600" alt="Financial planning" className="rounded-2xl shadow-xl w-full h-auto" />
            </div>
            <div className="md:w-1/2 space-y-8">
                <span className="text-[#2563EB] font-bold tracking-[0.2em] text-sm uppercase">OUR DIFFERENCE</span>
                <h2 className="text-4xl font-bold text-[#123B7A]">Advice That Looks Beyond the Investment</h2>
                <p className="text-lg text-[#64748B] leading-relaxed">Investing is only one part of the financial journey. We look at the bigger picture — your goals, priorities, risk profile, time horizon and changing circumstances.</p>
                
                <div className="grid grid-cols-2 gap-6">
                    {[
                        { num: '01', title: 'Understand First', desc: 'We begin by understanding your financial goals before recommending solutions.' },
                        { num: '02', title: 'Plan With Purpose', desc: 'Every recommendation should connect to a meaningful financial objective.' },
                        { num: '03', title: 'Stay Transparent', desc: 'We believe good advice should be clear, understandable and transparent.' },
                        { num: '04', title: 'Review & Adapt', desc: 'Your financial strategy should evolve as your life and goals change.' },
                    ].map((p, i) => (
                        <div key={i} className="space-y-2">
                            <div className="text-2xl font-bold text-[#2563EB] bg-[#F4F8FC] w-12 h-12 flex items-center justify-center rounded-full mb-3">{p.num}</div>
                            <h4 className="font-bold text-[#123B7A]">{p.title}</h4>
                            <p className="text-sm text-[#64748B]">{p.desc}</p>
                        </div>
                    ))}
                </div>
            </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="bg-[#0B2F6B] py-16 md:py-20 px-6 md:px-12 text-center text-white">
        <div className="max-w-3xl mx-auto space-y-6 flex flex-col items-center">
            <h2 className="text-3xl md:text-4xl font-bold">Ready to Take a More Thoughtful Approach to Your Wealth?</h2>
            <p className="text-[#E2E8F0] text-base md:text-lg">Start a conversation with RS Financial Services and explore how thoughtful financial planning can support your goals.</p>
            <div className="flex justify-center items-center w-full pt-2">
              <a 
                href="https://wa.link/fudqk8" 
                target="_blank" 
                rel="noopener noreferrer" 
                className="inline-flex items-center justify-center gap-2 bg-white text-[#0B2F6B] px-6 sm:px-10 py-3.5 sm:py-4 rounded-lg font-semibold hover:bg-[#F4F8FC] transition-colors whitespace-nowrap min-h-[50px] w-auto max-w-full text-center"
              >
                <span>Book a Consultation</span>
                <span aria-hidden="true">→</span>
              </a>
            </div>
        </div>
      </section>
      
      <Footer />
    </div>
  );
};

export default WhyUsPage;
