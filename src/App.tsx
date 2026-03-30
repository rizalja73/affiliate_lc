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
import MarketingMaterialsPage from './pages/MarketingMaterialsPage';
import AcademyPage from './pages/AcademyPage';
import ProfilePage from './pages/ProfilePage';
import ChangePasswordPage from './pages/ChangePasswordPage';
import ProductDetailPage from './pages/ProductDetailPage';
// removed ProfileCheckOverlay from here as it is now in ProtectedRoute

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

import ProtectedRoute from './components/ProtectedRoute';

function App() {
  return (
    <div className="min-h-screen bg-white">
      <Routes>
        {/* Public Routes */}
        <Route path="/" element={<LandingPage />} />
        <Route path="/affiliate" element={<LandingPage />} />
        <Route path="/login" element={<LoginPage />} />
        <Route path="/register" element={<RegisterPage />} />
        
        {/* Protected Dashboard Routes */}
        <Route element={<ProtectedRoute />}>
          <Route path="/dashboard" element={<DashboardPage />} />
          <Route path="/products" element={<ProductsPage />} />
          <Route path="/products/:slug" element={<ProductDetailPage />} />
          <Route path="/earnings" element={<EarningsPage />} />

          <Route path="/marketing" element={<MarketingMaterialsPage />} />
          <Route path="/academy" element={<AcademyPage />} />
          <Route path="/profile" element={<ProfilePage />} />
          <Route path="/change-password" element={<ChangePasswordPage />} />
        </Route>

        {/* Fallback route for 404 or unknown paths to redirect to home */}
        <Route path="*" element={<LandingPage />} />
      </Routes>
    </div>
  );
}

export default App;
