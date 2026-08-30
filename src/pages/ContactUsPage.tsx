import React from 'react';
import { MessageCircle } from 'lucide-react';
import Header from '../components/Header';
import Footer from '../components/Footer';

const ContactUsPage = () => {
  return (
    <div className="min-h-screen bg-white">
      <Header />

      {/* Hero Section */}
      <section className="py-12 md:py-20 px-5 sm:px-8 md:px-12 bg-[#F4F8FC] text-center">
        <div className="max-w-4xl mx-auto space-y-4 md:space-y-6">
          <span className="text-[#2563EB] font-bold tracking-[0.15em] sm:tracking-[0.2em] text-xs sm:text-sm uppercase">GET IN TOUCH</span>
          <h1 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-bold text-[#123B7A] leading-tight md:leading-[1.15]">Let's Start a Conversation About Your Financial Future.</h1>
          <p className="text-sm sm:text-base md:text-lg text-[#64748B] leading-relaxed max-w-2xl mx-auto">
            Whether you're looking to invest, plan for the future, protect your family or review your existing portfolio, we're here to help you make informed financial decisions.
          </p>
        </div>
      </section>

      {/* Contact Cards */}
      <section className="py-8 md:py-16 px-5 sm:px-8 md:px-12 -mt-4 md:-mt-16">
        <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-3 gap-6 sm:gap-8">
            {[
                { title: 'Talk to Us', desc: 'Have a question or want to discuss your financial goals?', cta: 'Call Us →', href: 'tel:+919987974931' },
                { title: 'Email Us', desc: 'Send us your enquiry and our team will get back to you.', cta: 'Email Us →', href: 'mailto:sandesh.rsfinancialservices@gmail.com' },
                { title: 'Visit Our Office', desc: 'Meet our team for a more detailed conversation about your financial goals.', cta: 'Get Directions →', href: 'https://www.google.com/maps/search/?api=1&query=NJ+Fundz+Panvel' }
            ].map((card, i) => (
                <div key={i} className="bg-white p-6 sm:p-8 rounded-2xl border border-[#E2E8F0] shadow-sm space-y-3 sm:space-y-4">
                    <h3 className="text-lg sm:text-xl font-bold text-[#123B7A]">{card.title}</h3>
                    <p className="text-[#64748B] text-xs sm:text-sm leading-relaxed">{card.desc}</p>
                    <a href={card.href} className="inline-block text-[#2563EB] font-semibold text-xs sm:text-sm hover:text-[#123B7A]">{card.cta}</a>
                </div>
            ))}
        </div>
      </section>

      {/* WhatsApp Section & Office Info */}
      <section className="py-12 md:py-24 px-5 sm:px-8 md:px-12">
        <div className="max-w-7xl mx-auto grid md:grid-cols-2 gap-8 md:gap-16 items-start">
            <div className="bg-white p-6 sm:p-10 rounded-2xl border border-[#E2E8F0] shadow-sm text-center flex flex-col items-center">
                <span className="text-[#2563EB] font-bold tracking-[0.15em] sm:tracking-[0.2em] text-xs sm:text-sm uppercase mb-3 sm:mb-4 block">CHAT WITH US</span>
                <h2 className="text-2xl sm:text-3xl font-bold text-[#123B7A] mb-4 sm:mb-6">Prefer WhatsApp?</h2>
                <p className="text-[#64748B] text-sm sm:text-base mb-6 sm:mb-8">Click the button below to start a direct conversation with our team on WhatsApp.</p>
                <a 
                    href="https://wa.link/fudqk8" 
                    target="_blank" 
                    rel="noopener noreferrer"
                    className="inline-flex items-center justify-center gap-3 bg-[#25D366] text-white px-6 sm:px-10 py-3.5 sm:py-4 rounded-lg font-semibold hover:bg-[#128C7E] transition-colors whitespace-nowrap min-h-[50px] w-auto max-w-full text-sm sm:text-base shadow-sm"
                >
                    <MessageCircle size={20} className="sm:w-6 sm:h-6" />
                    <span>Chat on WhatsApp →</span>
                </a>
            </div>

            <div className="space-y-6 sm:space-y-8">
                <img src="https://images.unsplash.com/photo-1552664730-d307ca884978?auto=format&fit=crop&q=80&w=800&h=600" alt="Consultation" className="rounded-2xl shadow-lg w-full h-64 sm:h-80 object-cover" />
                <div className="space-y-3 sm:space-y-4">
                    <span className="text-[#2563EB] font-bold tracking-[0.15em] sm:tracking-[0.2em] text-xs sm:text-sm uppercase">VISIT US</span>
                    <h2 className="text-2xl sm:text-3xl font-bold text-[#123B7A]">Let's Meet</h2>
                    <p className="text-[#64748B] text-sm sm:text-base leading-relaxed">NJ Fundz, X4Q7+289, Vasudev Balwant Phadke Rd, MCCH Society, Panvel, Maharashtra 410206</p>
                    <div className="border-t pt-4 border-[#E2E8F0] space-y-1 text-sm sm:text-base">
                        <p className="font-semibold text-[#123B7A]">Phone: <span className="text-[#64748B] font-normal">+91-9987974931</span></p>
                        <p className="font-semibold text-[#123B7A]">Email: <span className="text-[#64748B] font-normal break-all sm:break-normal">sandesh.rsfinancialservices@gmail.com</span></p>
                    </div>
                </div>
            </div>
        </div>
      </section>

      {/* Footer */}
      <Footer />
    </div>
  );
};

export default ContactUsPage;
