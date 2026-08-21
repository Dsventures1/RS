import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Header from './components/Header';
import Hero from './components/Hero';
import TrustMetrics from './components/TrustMetrics';
import About from './components/About';
import WhyChoose from './components/WhyChoose';
import Offerings from './components/Offerings';
import Approach from './components/Approach';
import FinalCTA from './components/FinalCTA';
import Footer from './components/Footer';
import AboutUs from './pages/AboutUs';
import ServicesPage from './pages/ServicesPage';
import WhyUsPage from './pages/WhyUsPage';
import BlogsPage from './pages/BlogsPage';
import ArticleDetailPage from './pages/ArticleDetailPage';
import ContactUsPage from './pages/ContactUsPage';

export default function App() {
  return (
    <BrowserRouter>
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
              <Approach />
              <FinalCTA />
            </main>
            <Footer />
          </div>
        } />
        <Route path="/about" element={<AboutUs />} />
        <Route path="/services" element={<ServicesPage />} />
        <Route path="/why-us" element={<WhyUsPage />} />
        <Route path="/blogs" element={<BlogsPage />} />
        <Route path="/blogs/:slug" element={<ArticleDetailPage />} />
        <Route path="/contact" element={<ContactUsPage />} />
      </Routes>
    </BrowserRouter>
  );
}
