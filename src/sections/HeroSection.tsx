import { TrendingUp, ShieldCheck, Rocket, Star, Users } from 'lucide-react';
import Button from '../components/Button';
import Section from '../components/Section';

export default function HeroSection() {
  return (
    <Section background="gradient" className="pt-24 pb-20 md:pt-40 md:pb-32 overflow-hidden relative text-center">
      {/* Dynamic Red Background Blobs */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] bg-primary-50 rounded-full blur-[120px] -z-10 opacity-70"></div>
      <div className="absolute bottom-0 right-0 translate-y-1/2 translate-x-1/2 w-[400px] h-[400px] bg-primary-100 rounded-full blur-[100px] -z-10 opacity-40"></div>
      
      <div className="max-w-4xl mx-auto space-y-10 animate-fade-in relative z-10">
        <div className="inline-flex items-center gap-3 bg-white border-2 border-primary-100 text-primary-600 px-6 py-2.5 rounded-full text-sm font-black shadow-xl shadow-primary-50">
          <ShieldCheck className="w-5 h-5" />
          <span className="tracking-wide uppercase">Program Affiliate Terpercaya & Resmi</span>
        </div>

        <h1 className="text-5xl md:text-7xl lg:text-8xl font-black text-gray-900 leading-[1.1] tracking-tight">
          Bagikan Ilmu, <br />
          <span className="text-primary-600 underline decoration-primary-100 decoration-8 underline-offset-8">Raih Kesuksesan</span>
        </h1>

        <p className="text-xl md:text-2xl text-gray-600 leading-relaxed max-w-2xl mx-auto font-medium">
          Bergabunglah dengan <span className="text-primary-600 font-bold">Lampung Cerdas</span>. Transformasikan pengaruh Anda menjadi penghasilan jutaan rupiah dengan mempromosikan produk edukasi berkualitas.
        </p>

        <div className="flex flex-col sm:flex-row items-center justify-center gap-6 pt-6">
          <Button size="xl" className="group shadow-2xl shadow-primary-200 w-full sm:w-auto">
            DAFTAR SEKARANG
            <Rocket className="ml-3 w-6 h-6 group-hover:translate-x-1 group-hover:-translate-y-1 transition-transform" />
          </Button>
          <Button size="xl" variant="outline" className="w-full sm:w-auto border-2 font-black">
            PELAJARI POTENSI CUAN
          </Button>
        </div>

        <div className="flex flex-wrap items-center justify-center gap-8 md:gap-12 pt-12 border-t border-gray-100">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 bg-primary-50 rounded-xl flex items-center justify-center">
              <Star className="w-6 h-6 text-primary-600 fill-primary-600" />
            </div>
            <div className="text-left">
              <p className="text-xl font-black text-gray-900 leading-none">100%</p>
              <p className="text-xs font-bold text-gray-500 uppercase tracking-widest">Gratis Biaya</p>
            </div>
          </div>
          
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 bg-primary-50 rounded-xl flex items-center justify-center">
              <TrendingUp className="w-6 h-6 text-primary-600" />
            </div>
            <div className="text-left">
              <p className="text-xl font-black text-gray-900 leading-none">Jutaan</p>
              <p className="text-xs font-bold text-gray-500 uppercase tracking-widest">Potensi Komisi</p>
            </div>
          </div>

          <div className="flex items-center gap-3">
            <div className="w-10 h-10 bg-primary-50 rounded-xl flex items-center justify-center">
              <Users className="w-6 h-6 text-primary-600" />
            </div>
            <div className="text-left">
              <p className="text-xl font-black text-gray-900 leading-none">1,200+</p>
              <p className="text-xs font-bold text-gray-500 uppercase tracking-widest">Affiliate Aktif</p>
            </div>
          </div>
        </div>
      </div>
    </Section>
  );
}
