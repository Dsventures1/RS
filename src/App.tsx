import { BrowserRouter, Routes, Route } from 'react-router-dom';
import ScrollToTop from './components/ScrollToTop';
import Header from './components/Header';
import Hero from './components/Hero';
import TrustMetrics from './components/TrustMetrics';
import About from './components/About';
import WhyChoose from './components/WhyChoose';
import Offerings from './components/Offerings';
import FinalCTA from './components/FinalCTA';
import Footer from './components/Footer';
import AboutUs from './pages/AboutUs';
import ServicesPage from './pages/ServicesPage';
import BlogsPage from './pages/BlogsPage';
import ArticleDetailPage from './pages/ArticleDetailPage';
import ContactUsPage from './pages/ContactUsPage';
import MFCalculatorsPage from './pages/MFCalculatorsPage';
import ToolsCalculatorsPage from './pages/ToolsCalculatorsPage';

export default function App() {
  return (
    <BrowserRouter>
      <ScrollToTop />
      <Routes>
        <Route path="/" element={
          <div className="min-h-screen bg-[#F8FAFC]">
            <Header />
            <main>
              <Hero />
              <TrustMetrics />
              <About />
              <WhyChoose />
              <Offerings />
              <FinalCTA />
            </main>
            <Footer />
          </div>
        } />
        <Route path="/about" element={<AboutUs />} />
        <Route path="/services" element={<ServicesPage />} />
        <Route path="/blogs" element={<BlogsPage />} />
        <Route path="/blogs/:slug" element={<ArticleDetailPage />} />
        <Route path="/tools" element={<ToolsCalculatorsPage />} />
        <Route path="/mf-calculators" element={<MFCalculatorsPage />} />
        <Route path="/tools-calculators" element={<ToolsCalculatorsPage />} />
        <Route path="/contact" element={<ContactUsPage />} />
      </Routes>
    </BrowserRouter>
  );
}
