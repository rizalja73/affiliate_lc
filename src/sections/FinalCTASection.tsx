import { Sparkles, ArrowRight, ShieldCheck } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import Section from '../components/Section';
import Button from '../components/Button';

export default function FinalCTASection() {
  const navigate = useNavigate();

  return (
    <Section background="gradient" className="py-20 md:py-32 relative overflow-hidden">
      {/* Dynamic Red Background Elements */}
      <div className="absolute top-0 left-0 w-full h-full bg-primary-900 overflow-hidden -z-20">
        <div className="absolute top-0 right-0 w-[800px] h-[800px] bg-primary-600 rounded-full blur-[150px] opacity-30 -translate-y-1/2 translate-x-1/2 animate-float"></div>
        <div className="absolute bottom-0 left-0 w-[600px] h-[600px] bg-red-800 rounded-full blur-[150px] opacity-20 translate-y-1/2 -translate-x-1/2"></div>
      </div>
      
      <div className="max-w-5xl mx-auto text-center relative z-10">
        <div className="inline-flex items-center gap-2 px-6 py-2.5 mb-10 bg-white shadow-2xl rounded-full text-primary-700 text-sm font-black uppercase tracking-widest animate-bounce-slow">
          <Sparkles className="w-4 h-4 text-primary-600" />
          <span>Kesempatan Terbatas! Bergabung Sekarang</span>
        </div>

        <h2 className="text-4xl md:text-5xl lg:text-6xl font-light text-red-500 mb-8 leading-tight tracking-wide">
          Siap Memulai <br />
          <span className="font-black uppercase tracking-[0.2em] mt-3 block text-yellow-400">
            Masa Depan?
          </span>
        </h2>

        <div className="max-w-3xl mx-auto mb-14">
          <p className="text-base md:text-lg lg:text-xl text-red-500 font-normal leading-loose">
            Ubah pengaruh Anda menjadi <span className="font-bold text-yellow-400">sumber penghasilan berkelanjutan</span>. 
            <br className="hidden md:block mt-2"/>
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

        <div className="mt-20 pt-16 border-t border-red-500/20 grid grid-cols-2 md:grid-cols-4 gap-12">
          {[
            { label: 'Total Affiliate', val: '1,200+' },
            { label: 'Komisi Terbayar', val: 'Rp 2M+' },
            { label: 'Program Edukasi', val: '15+' },
            { label: 'CS Online', val: '24/7' },
          ].map((stat, i) => (
            <div key={i} className="text-center group">
              <p className="text-4xl font-black text-red-500 mb-2 group-hover:scale-110 transition-transform">{stat.val}</p>
              <p className="text-xs font-black text-red-500 uppercase tracking-widest">{stat.label}</p>
            </div>
          ))}
        </div>
      </div>
    </Section>
  );
}
