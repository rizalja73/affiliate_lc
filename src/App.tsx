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

function App() {
  return (
    <div className="min-h-screen bg-white">
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
    </div>
  );
}

export default App;
