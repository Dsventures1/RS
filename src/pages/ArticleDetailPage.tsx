import React from 'react';
import { useParams, Link } from 'react-router-dom';
import Header from '../components/Header';
import Footer from '../components/Footer';
import { blogData } from '../data/blogData';

const ArticleDetailPage = () => {
  const { slug } = useParams();
  const article = blogData.find(a => a.id === slug);

  if (!article) return <div>Article not found</div>;

  return (
    <div className="min-h-screen bg-white">
      <Header />
      
      <article className="py-12 md:py-20 px-5 sm:px-8 md:px-12">
        <div className="max-w-[850px] mx-auto space-y-6 md:space-y-8">
            <span className="text-[#2563EB] font-bold tracking-[0.15em] sm:tracking-[0.2em] text-xs sm:text-sm uppercase">{article.category}</span>
            <h1 className="text-2xl sm:text-3xl md:text-5xl font-bold text-[#123B7A] leading-tight">{article.title}</h1>
            <div className="flex gap-4 items-center text-xs sm:text-sm text-[#64748B]">
                <span>{article.time}</span>
            </div>
            <img src={article.image} alt={article.title} className="w-full h-64 sm:h-96 md:h-[450px] object-cover rounded-xl md:rounded-2xl" />
            
            <div className="prose prose-base sm:prose-lg text-[#64748B] leading-relaxed space-y-4 md:space-y-6">
                <p>Successful investing is often less about predicting the perfect moment and more about building disciplined habits that can compound over time. {article.desc}</p>
                <h2 className="text-xl sm:text-2xl md:text-3xl font-bold text-[#123B7A]">Understanding the Financial Landscape</h2>
                <p>Investment decisions should be made based on individual goals, risk tolerance and financial circumstances. By aligning your portfolio with your broader financial plan, you can navigate market fluctuations with more confidence.</p>
                <ul className="list-disc pl-6 space-y-2">
                    <li>Start early to leverage compounding.</li>
                    <li>Diversify across asset classes to manage risk.</li>
                    <li>Stay focused on your long-term goals.</li>
                </ul>
            </div>
        </div>
      </article>

      <section className="py-12 md:py-16 px-6 md:px-12 bg-[#F4F8FC] text-center">
        <div className="max-w-2xl mx-auto space-y-6 flex flex-col items-center">
          <h2 className="text-2xl sm:text-3xl font-bold text-[#123B7A]">Have Questions About Your Financial Strategy?</h2>
          <a 
            href="https://wa.me/919987974931" 
            target="_blank" 
            rel="noopener noreferrer" 
            className="inline-flex items-center justify-center gap-2 bg-[#123B7A] text-white px-6 sm:px-10 py-3.5 sm:py-4 rounded-lg font-semibold hover:bg-[#0B2F6B] whitespace-nowrap min-h-[50px] w-auto max-w-full text-center"
          >
            <span>Book a Consultation</span>
            <span aria-hidden="true">→</span>
          </a>
        </div>
      </section>

      <Footer />
    </div>
  );
};

export default ArticleDetailPage;
