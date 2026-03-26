import { TrendingUp, ShieldCheck, Rocket, Star, Users } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import Button from '../components/Button';
import Section from '../components/Section';

export default function HeroSection() {
  const navigate = useNavigate();

  return (
    <Section background="transparent" className="pt-24 pb-20 md:pt-40 md:pb-32 overflow-hidden relative z-0 text-center bg-gradient-to-b from-white via-primary-50/50 to-white">
      {/* Subtle Grid Pattern Overlay */}
      <div className="absolute inset-0 bg-[linear-gradient(rgba(0,0,0,0.03)_1px,transparent_1px),linear-gradient(90deg,rgba(0,0,0,0.03)_1px,transparent_1px)] bg-[size:32px_32px] [mask-image:radial-gradient(ellipse_80%_80%_at_50%_30%,#000_20%,transparent_100%)] -z-10"></div>

      {/* Dynamic Light Background Blobs */}
      <div className="absolute top-0 left-0 w-full h-full overflow-hidden -z-10">
        <div className="absolute -top-32 left-1/2 -translate-x-1/2 w-[800px] h-[800px] bg-primary-200 rounded-full blur-[120px] opacity-30 animate-float"></div>
        <div className="absolute top-1/3 -right-32 w-[600px] h-[600px] bg-primary-200 rounded-full blur-[120px] opacity-40 animate-float" style={{ animationDelay: '2s' }}></div>
        <div className="absolute bottom-0 -left-32 w-[600px] h-[300px] bg-primary-300 rounded-full blur-[120px] opacity-20 animate-float" style={{ animationDelay: '4s' }}></div>
      </div>

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
          <Button
            size="xl"
            rounded="full"
            className="group shadow-2xl shadow-primary-200 w-full sm:w-auto min-w-[240px]"
            onClick={() => navigate('/register')}
          >
            Daftar Sekarang
            <Rocket className="ml-3 w-6 h-6 group-hover:translate-x-1 group-hover:-translate-y-1 transition-transform" />
          </Button>
          <Button
            size="xl"
            variant="outline"
            rounded="full"
            className="w-full sm:w-auto min-w-[240px] border-2 font-black"
            onClick={() => {
              const element = document.getElementById('penghasilan');
              if (element) element.scrollIntoView({ behavior: 'smooth' });
            }}
          >
            Pelajari Potensi Cuan
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
