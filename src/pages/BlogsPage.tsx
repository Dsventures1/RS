import React, { useState, useRef } from 'react';
import { Link } from 'react-router-dom';
import { ChevronLeft, ChevronRight } from 'lucide-react';
import Header from '../components/Header';
import Footer from '../components/Footer';
import { blogData } from '../data/blogData';

const categories = ['All', 'Investing', 'Mutual Funds', 'Wealth Planning', 'Insurance', 'Retirement', 'Market Insights'];

const BlogsPage = () => {
  const [activeCategory, setActiveCategory] = useState('All');
  const scrollContainerRef = useRef<HTMLDivElement>(null);

  const scroll = (direction: 'left' | 'right') => {
    if (scrollContainerRef.current) {
      const scrollAmount = 200;
      scrollContainerRef.current.scrollBy({
        left: direction === 'left' ? -scrollAmount : scrollAmount,
        behavior: 'smooth',
      });
    }
  };

  const filteredArticles = activeCategory === 'All' 
    ? blogData 
    : blogData.filter(article => article.category === activeCategory);

  const featured = blogData[0];
  const remaining = filteredArticles.slice(1);

  return (
    <div className="min-h-screen bg-white">
      <Header />

      {/* Hero Section */}
      <section className="py-12 md:py-20 px-5 sm:px-8 md:px-12 bg-[#F4F8FC] text-center">
        <div className="max-w-4xl mx-auto space-y-4 md:space-y-6">
          <span className="text-[#2563EB] font-bold tracking-[0.15em] sm:tracking-[0.2em] text-xs sm:text-sm uppercase">INSIGHTS & RESOURCES</span>
          <h1 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-bold text-[#123B7A] leading-tight md:leading-[1.15]">Insights to Help You Make Better Financial Decisions</h1>
          <p className="text-sm sm:text-base md:text-lg text-[#64748B] leading-relaxed max-w-2xl mx-auto">
            Explore practical insights, investment perspectives and financial planning ideas designed to help you make more informed decisions about your financial future.
          </p>
        </div>
      </section>

      {/* Featured Article */}
      <section className="py-12 md:py-20 px-5 sm:px-8 md:px-12">
        <div className="max-w-7xl mx-auto grid md:grid-cols-2 gap-8 md:gap-12 items-center">
          <img src={featured.image} alt={featured.title} className="w-full h-64 sm:h-80 md:h-[400px] object-cover rounded-[18px] shadow-lg" />
          <div className="space-y-4 md:space-y-6">
            <span className="text-[#2563EB] font-semibold text-xs sm:text-sm">FEATURED INSIGHT</span>
            <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold text-[#123B7A] leading-tight">{featured.title}</h2>
            <p className="text-[#64748B] text-sm sm:text-base md:text-lg leading-relaxed">{featured.desc}</p>
            <div className="flex gap-4 items-center text-xs sm:text-sm text-[#64748B]">
                <span className="font-semibold">{featured.category}</span>
                <span>•</span>
                <span>{featured.time}</span>
            </div>
            <Link to={`/blogs/${featured.id}`} className="inline-block text-[#2563EB] font-semibold hover:text-[#123B7A]">Read Article →</Link>
          </div>
        </div>
      </section>

      {/* Category Filter */}
      <section className="py-4 md:py-6 px-3 sm:px-8 md:px-12 border-y border-[#E2E8F0] bg-white">
        <div className="max-w-7xl mx-auto flex items-center gap-1.5 sm:gap-3">
          <button
            onClick={() => scroll('left')}
            className="flex-shrink-0 w-8 h-8 rounded-full bg-[#F4F8FC] hover:bg-[#E2E8F0] text-[#123B7A] flex items-center justify-center transition-colors shadow-sm"
            aria-label="Scroll categories left"
          >
            <ChevronLeft size={18} />
          </button>

          <div 
            ref={scrollContainerRef}
            className="flex-1 flex gap-2.5 sm:gap-3 overflow-x-auto py-1 scrollbar-none scroll-smooth"
            style={{ scrollbarWidth: 'none', msOverflowStyle: 'none' }}
          >
            {categories.map(cat => (
              <button 
                key={cat}
                onClick={() => setActiveCategory(cat)}
                className={`px-4 sm:px-6 py-2 rounded-full text-xs sm:text-sm font-semibold whitespace-nowrap transition-all flex-shrink-0 ${activeCategory === cat ? 'bg-[#2563EB] text-white shadow-sm' : 'bg-[#F4F8FC] text-[#123B7A] hover:bg-[#EAF1FB]'}`}
              >
                {cat}
              </button>
            ))}
          </div>

          <button
            onClick={() => scroll('right')}
            className="flex-shrink-0 w-8 h-8 rounded-full bg-[#F4F8FC] hover:bg-[#E2E8F0] text-[#123B7A] flex items-center justify-center transition-colors shadow-sm"
            aria-label="Scroll categories right"
          >
            <ChevronRight size={18} />
          </button>
        </div>
      </section>

      {/* Article Grid */}
      <section className="py-12 md:py-20 px-5 sm:px-8 md:px-12">
        <div className="max-w-7xl mx-auto grid md:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8">
          {remaining.map((article) => (
            <Link to={`/blogs/${article.id}`} key={article.id} className="group bg-white border border-[#E2E8F0] rounded-[16px] shadow-sm hover:shadow-lg hover:-translate-y-2 transition-all duration-300 overflow-hidden flex flex-col">
              <img src={article.image} alt={article.title} className="w-full h-48 sm:h-52 object-cover transition-transform duration-300 group-hover:scale-105" />
              <div className="p-5 sm:p-6 flex flex-col flex-grow space-y-3 sm:space-y-4">
                <span className="text-xs font-bold uppercase tracking-wider text-[#2563EB]">{article.category}</span>
                <h3 className="text-lg sm:text-xl font-bold text-[#123B7A] leading-snug flex-grow">{article.title}</h3>
                <p className="text-[#64748B] text-sm leading-relaxed">{article.desc}</p>
                <div className="flex justify-between items-center pt-4 border-t border-[#E2E8F0] text-sm">
                    <span className="text-[#64748B] text-xs sm:text-sm">{article.time}</span>
                    <span className="text-[#2563EB] font-semibold text-xs sm:text-sm">Read Article →</span>
                </div>
              </div>
            </Link>
          ))}
        </div>
      </section>

      {/* Newsletter */}
      <section className="py-12 md:py-20 px-5 sm:px-8 md:px-12 bg-[#F4F8FC] text-center">
        <div className="max-w-2xl mx-auto space-y-4 md:space-y-6">
            <span className="text-[#2563EB] font-bold tracking-[0.15em] sm:tracking-[0.2em] text-xs sm:text-sm uppercase">STAY INFORMED</span>
            <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold text-[#123B7A]">Get Financial Insights That Matter</h2>
            <p className="text-[#64748B] text-sm sm:text-base md:text-lg">Receive useful investment and financial planning insights designed to help you make more informed decisions.</p>
            <div className="flex flex-col sm:flex-row gap-3 sm:gap-4 pt-4 max-w-md mx-auto">
                <input type="email" placeholder="Email Address" className="flex-grow px-5 py-3.5 rounded-lg border border-[#E2E8F0] text-sm sm:text-base" />
                <button className="bg-[#123B7A] text-white px-6 sm:px-8 py-3.5 rounded-lg font-semibold hover:bg-[#0B2F6B] whitespace-nowrap text-sm sm:text-base">Subscribe →</button>
            </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="bg-[#0B2F6B] py-16 md:py-20 px-6 md:px-12 text-center text-white">
        <div className="max-w-3xl mx-auto space-y-6 flex flex-col items-center">
            <h2 className="text-3xl md:text-4xl font-bold">Have Questions About Your Financial Strategy?</h2>
            <p className="text-[#E2E8F0] text-base md:text-lg">Speak with RS Financial Services to discuss your goals and explore a more thoughtful approach to financial planning.</p>
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

export default BlogsPage;
