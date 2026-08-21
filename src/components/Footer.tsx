import React from 'react';

const Footer = () => {
  return (
    <footer className="bg-[#172554] text-white py-12 px-6 md:py-16 md:px-12 text-sm font-sans">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8 md:gap-12 mb-12">
             <div className='space-y-4'>
                <div className="font-bold text-2xl tracking-tight">RS Financial Services</div>
                <p className='opacity-80 leading-relaxed max-w-xs'>
                    We provide bespoke financial advisory services designed to secure your future. Through meticulous planning and proactive growth strategies, we help you navigate complex financial landscapes with confidence.
                </p>
             </div>
             <div className='space-y-3'>
                <h4 className='font-bold mb-4 text-base'>Company</h4>
                {['Home', 'About Us', 'Why RS Financial Services', 'Contact Us'].map(link => (
                    <p key={link} className='opacity-70 cursor-pointer hover:text-blue-300 transition-colors'>{link}</p>
                ))}
             </div>
             <div className='space-y-3'>
                <h4 className='font-bold mb-4 text-base'>Offerings</h4>
                {['Mutual Funds', 'Equity & ETFs', 'Portfolio Management Services (PMS)', 'Insurances'].map(link => (
                    <p key={link} className='opacity-70 cursor-pointer hover:text-blue-300 transition-colors'>{link}</p>
                ))}
             </div>
             <div className='space-y-3'>
                <h4 className='font-bold mb-4 text-base'>Contact</h4>
                <p className='opacity-70'>+91-9987974931</p>
                <p className='opacity-70 break-words'>sandesh.rsfinancialservices@gmail.com</p>
                <p className='opacity-70 leading-relaxed'>NJ Fundz, X4Q7+289, Vasudev Balwant Phadke Rd, MCCH Society, Panvel, Maharashtra 410206</p>
             </div>
        </div>
        
        {/* Legal/Compliance Links */}
        <div className="pt-8 border-t border-white/20 flex flex-wrap gap-x-6 gap-y-2 text-[12px] opacity-70 mb-8">
            {['Terms of Service', 'Privacy Policy', 'Disclaimer', 'Disclosure Statement', 'Compliance & Regulatory Info', 'Fee Schedule'].map(link => (
                <span key={link} className="cursor-pointer hover:text-blue-300 transition-colors">{link}</span>
            ))}
        </div>

        <div className="pt-8 border-t border-white/20 flex flex-col md:flex-row justify-between items-center text-[11px] opacity-60 gap-4 text-center md:text-left">
            <p>&copy; 2026 RS Financial Services. All rights reserved.</p>
            <p className='max-w-md'>Mutual fund investments are subject to market risks. Read all scheme-related documents carefully before investing.</p>
        </div>
    </footer>
  );
};

export default Footer;
