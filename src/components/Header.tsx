import { GraduationCap, Menu, X, Rocket } from 'lucide-react';
import { useState, useEffect } from 'react';
import Button from './Button';

export default function Header() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <header className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${isScrolled ? 'bg-white/80 backdrop-blur-lg shadow-xl shadow-gray-200/50 py-3' : 'bg-transparent py-5'}`}>
      <div className="container mx-auto px-4 md:px-6 lg:px-8 max-w-7xl">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-4 group cursor-pointer">
            <div className="w-12 h-12 bg-gradient-to-br from-primary-600 to-primary-800 rounded-2xl flex items-center justify-center shadow-lg shadow-primary-200 transform group-hover:rotate-6 transition-transform">
              <GraduationCap className="w-7 h-7 text-white" />
            </div>
            <div>
              <div className="text-xl font-black text-gray-900 tracking-tight">Lampung <span className="text-primary-600">Cerdas</span></div>
              <div className="text-[10px] uppercase tracking-widest font-black text-primary-500/80">Affiliate Elite</div>
            </div>
          </div>

          <nav className="hidden lg:flex items-center gap-10">
            {['Keuntungan', 'Cara Kerja', 'Penghasilan', 'Testimoni', 'FAQ'].map((item) => (
              <a 
                key={item}
                href={`#${item.toLowerCase().replace(' ', '-')}`} 
                className="text-gray-600 hover:text-primary-600 font-bold text-sm transition-all hover:scale-105"
              >
                {item}
              </a>
            ))}
          </nav>

          <div className="hidden md:flex items-center gap-4">
             <Button variant="outline" size="sm" className="hidden xl:flex border-2 font-black">
              Login Member
            </Button>
            <Button size="sm" className="font-black shadow-xl shadow-primary-100">
              Mulai Sekarang
              <Rocket className="ml-2 w-4 h-4" />
            </Button>
          </div>

          <button
            onClick={() => setIsMenuOpen(!isMenuOpen)}
            className="lg:hidden w-12 h-12 flex items-center justify-center rounded-2xl bg-gray-50 text-gray-900 shadow-sm hover:bg-gray-100 transition-colors"
          >
            {isMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
          </button>
        </div>
      </div>

      {/* Mobile Menu */}
      <div className={`lg:hidden absolute top-full left-0 right-0 bg-white shadow-2xl transition-all duration-300 transform ${isMenuOpen ? 'translate-y-0 opacity-100 visible' : '-translate-y-4 opacity-0 invisible'}`}>
        <div className="p-6 space-y-4">
          {['Keuntungan', 'Cara Kerja', 'Penghasilan', 'Testimoni', 'FAQ'].map((item) => (
            <a 
              key={item}
              href={`#${item.toLowerCase().replace(' ', '-')}`} 
              onClick={() => setIsMenuOpen(false)}
              className="block py-4 text-gray-900 font-bold border-b border-gray-50 hover:text-primary-600"
            >
              {item}
            </a>
          ))}
          <div className="pt-4 grid sm:grid-cols-2 gap-4">
            <Button variant="outline" className="w-full font-black border-2">Login</Button>
            <Button className="w-full font-black shadow-xl shadow-primary-200">Daftar Sekarang</Button>
          </div>
        </div>
      </div>
    </header>
  );
}
