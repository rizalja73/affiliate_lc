import { Routes, Route } from 'react-router-dom';
import Header from './components/Header';
import Footer from './components/Footer';
import HeroSection from './sections/HeroSection';
import KeuntunganSection from './sections/KeuntunganSection';
import CaraKerjaSection from './sections/CaraKerjaSection';
import PotensiPenghasilanSection from './sections/PotensiPenghasilanSection';
import SiapaCocokSection from './sections/SiapaCocokSection';
import TestimoniSection from './sections/TestimoniSection';
import FAQSection from './sections/FAQSection';
import FinalCTASection from './sections/FinalCTASection';
import LoginPage from './pages/LoginPage';
import RegisterPage from './pages/RegisterPage';
import DashboardPage from './pages/DashboardPage';
import ProductsPage from './pages/ProductsPage';
import EarningsPage from './pages/EarningsPage';
import SalesDataPage from './pages/SalesDataPage';
import MarketingMaterialsPage from './pages/MarketingMaterialsPage';

function LandingPage() {
  return (
    <>
      <Header />
      <main>
        <div id="home">
          <HeroSection />
        </div>
        <div id="keuntungan">
          <KeuntunganSection />
        </div>
        <div id="cara-kerja">
          <CaraKerjaSection />
        </div>
        <div id="penghasilan">
          <PotensiPenghasilanSection />
        </div>
        <div id="siapa-cocok">
          <SiapaCocokSection />
        </div>
        <div id="testimoni">
          <TestimoniSection />
        </div>
        <div id="faq">
          <FAQSection />
        </div>
        <FinalCTASection />
      </main>
      <Footer />
    </>
  );
}

function App() {
  return (
    <div className="min-h-screen bg-white">
      <Routes>
        <Route path="/" element={<LandingPage />} />
        <Route path="/login" element={<LoginPage />} />
        <Route path="/register" element={<RegisterPage />} />
        <Route path="/dashboard" element={<DashboardPage />} />
        <Route path="/products" element={<ProductsPage />} />
        <Route path="/earnings" element={<EarningsPage />} />
        <Route path="/sales" element={<SalesDataPage />} />
        <Route path="/marketing" element={<MarketingMaterialsPage />} />
      </Routes>
    </div>
  );
}

export default App;
