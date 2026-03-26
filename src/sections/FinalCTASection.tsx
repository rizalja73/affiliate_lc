import { Sparkles, ArrowRight, ShieldCheck } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import Section from '../components/Section';
import Button from '../components/Button';

export default function FinalCTASection() {
  const navigate = useNavigate();

  return (
    <Section background="transparent" className="py-20 md:py-32 relative z-0 overflow-hidden bg-gradient-to-b from-gray-900 via-primary-900 to-black">
      {/* Subtle Grid Pattern Overlay */}
      <div className="absolute inset-0 bg-[linear-gradient(rgba(255,255,255,0.03)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.03)_1px,transparent_1px)] bg-[size:32px_32px] [mask-image:radial-gradient(ellipse_80%_80%_at_50%_50%,#000_20%,transparent_100%)] -z-10"></div>
      
      {/* Dynamic Glowing Background Elements */}
      <div className="absolute top-0 left-0 w-full h-full overflow-hidden -z-10">
        <div className="absolute -top-32 -right-32 w-[600px] h-[600px] bg-primary-600 rounded-full blur-[120px] opacity-40 animate-float"></div>
        <div className="absolute top-1/2 -left-32 w-[500px] h-[500px] bg-yellow-400 rounded-full blur-[150px] opacity-[0.15] animate-float" style={{ animationDelay: '2s' }}></div>
        <div className="absolute -bottom-40 left-1/2 -translate-x-1/2 w-[800px] h-[800px] bg-red-700 rounded-full blur-[150px] opacity-30 animate-float" style={{ animationDelay: '4s' }}></div>
      </div>

      <div className="max-w-5xl mx-auto text-center relative z-10">
        <div className="inline-flex items-center gap-2 px-6 py-2.5 mb-10 bg-white shadow-2xl rounded-full text-primary-700 text-sm font-black uppercase tracking-widest animate-bounce-slow">
          <Sparkles className="w-4 h-4 text-primary-600" />
          <span>Kesempatan Terbatas! Bergabung Sekarang</span>
        </div>

        <h2 className="text-4xl md:text-5xl lg:text-6xl font-light text-white mb-8 leading-tight tracking-wide">
          Siap Memulai <br />
          <span className="font-black uppercase tracking-[0.2em] mt-3 block text-yellow-400">
            Masa Depan?
          </span>
        </h2>

        <div className="max-w-3xl mx-auto mb-14">
          <p className="text-base md:text-lg lg:text-xl text-white/90 font-normal leading-loose">
            Ubah pengaruh Anda menjadi <span className="font-bold text-yellow-400">sumber penghasilan berkelanjutan</span>.
            <br className="hidden md:block mt-2" />
            Bergabung dengan ekosistem affiliate <strong className="font-black uppercase tracking-wider text-yellow-400 mx-1">Lampung Cerdas</strong>
            yang transparan dan bersahabat.
          </p>
        </div>

        <div className="flex flex-col sm:flex-row items-center justify-center gap-6">
          <Button
            variant="white"
            size="xl"
            rounded="full"
            className="w-full sm:w-auto min-w-[280px] group border-none"
            onClick={() => navigate('/register')}
          >
            Daftar Sekarang
            <ArrowRight className="ml-4 w-8 h-8 group-hover:translate-x-2 transition-transform" />
          </Button>

          <div className="flex items-center gap-4 text-white font-black bg-white/10 px-8 py-5 rounded-full border border-white/20 backdrop-blur-md">
            <ShieldCheck className="w-7 h-7 text-white" />
            <span className="uppercase tracking-widest text-sm">100% Free & Verified</span>
          </div>
        </div>

        <div className="mt-20 pt-16 border-t border-white/20 grid grid-cols-2 md:grid-cols-4 gap-12">
          {[
            { label: 'Total Affiliate', val: '1,200+' },
            { label: 'Komisi Terbayar', val: 'Rp 2M+' },
            { label: 'Program Edukasi', val: '15+' },
            { label: 'CS Online', val: '24/7' },
          ].map((stat, i) => (
            <div key={i} className="text-center group">
              <p className="text-4xl font-black text-white mb-2 group-hover:scale-110 transition-transform">{stat.val}</p>
              <p className="text-xs font-black text-white/70 uppercase tracking-widest">{stat.label}</p>
            </div>
          ))}
        </div>
      </div>
    </Section>
  );
}
