import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { TrendingUp, Target, Coins, Calculator, ArrowUpRight } from 'lucide-react';
import Card from '../components/Card';
import Section from '../components/Section';
import Button from '../components/Button';

function AnimatedNumber({ end, duration = 2000 }: { end: number; duration?: number }) {
  const [count, setCount] = useState(0);

  useEffect(() => {
    let startTime: number;
    let animationFrame: number;

    const animate = (currentTime: number) => {
      if (!startTime) startTime = currentTime;
      const progress = Math.min((currentTime - startTime) / duration, 1);
      const easeOut = 1 - Math.pow(1 - progress, 3); // Cubic ease out

      setCount(Math.floor(easeOut * end));

      if (progress < 1) {
        animationFrame = requestAnimationFrame(animate);
      }
    };

    animationFrame = requestAnimationFrame(animate);

    return () => cancelAnimationFrame(animationFrame);
  }, [end, duration]);

  return <>{count.toLocaleString('id-ID')}</>;
}

export default function PotensiPenghasilanSection() {
  const navigate = useNavigate();
  const [sales, setSales] = useState(30);
  const commissionPerSale = 100000;

  return (
    <Section background="white" className="relative">
      <div className="absolute top-0 right-0 w-96 h-96 bg-primary-50 rounded-full blur-3xl -z-10 opacity-60"></div>
      
      <div className="text-center mb-16">
        <div className="inline-flex items-center gap-2 px-4 py-1.5 mb-4 text-xs font-bold text-primary-700 uppercase bg-primary-100 rounded-full">
          <Calculator className="w-3.5 h-3.5" />
          Income Calculator
        </div>
        <h2 className="text-3xl md:text-5xl font-extrabold text-gray-900 mb-6">
          Simulasi <span className="text-primary-600 italic">Penghasilan Anda</span>
        </h2>
        <p className="text-lg text-gray-600 max-w-2xl mx-auto font-medium">
          Program affiliate kami memberikan komisi transparan. Geser slider atau lihat estimasi pendapatan bulanan Anda di bawah ini.
        </p>
      </div>

      <div className="max-w-5xl mx-auto">
        <div className="grid lg:grid-cols-12 gap-8 items-stretch">
          {/* Left Side: Stats */}
          <div className="lg:col-span-5 space-y-6">
            <Card className="bg-white border-primary-50 shadow-2xl shadow-gray-200/50 p-8 rounded-[2.5rem]">
              <div className="space-y-8">
                <div className="flex items-center gap-5">
                  <div className="w-14 h-14 bg-primary-50 rounded-2xl flex items-center justify-center text-primary-600">
                    <TrendingUp className="w-8 h-8" />
                  </div>
                  <div>
                    <p className="text-sm font-bold text-gray-400 uppercase tracking-widest">Harga Program</p>
                    <p className="text-3xl font-black text-gray-900 leading-none mt-1">Rp 500rb</p>
                  </div>
                </div>

                <div className="flex items-center gap-5">
                  <div className="w-14 h-14 bg-gray-50 rounded-2xl flex items-center justify-center text-gray-400">
                    <Target className="w-8 h-8" />
                  </div>
                  <div>
                    <p className="text-sm font-bold text-gray-400 uppercase tracking-widest">Komisi Affiliate</p>
                    <div className="flex items-baseline gap-2 mt-1">
                       <p className="text-3xl font-black text-primary-600 leading-none">20%</p>
                       <span className="text-gray-400 font-bold text-xs uppercase tracking-tighter">per closing</span>
                    </div>
                  </div>
                </div>

                <div className="pt-8 border-t border-gray-100">
                  <div className="bg-gray-50 rounded-[2rem] p-8">
                    <label className="block text-sm font-black text-gray-900 mb-6 uppercase tracking-widest">
                      Target Sales: <span className="text-primary-600 text-3xl ml-3">{sales}</span>
                    </label>
                    <input 
                      type="range" 
                      min="1" 
                      max="100" 
                      value={sales} 
                      onChange={(e) => setSales(parseInt(e.target.value))}
                      className="w-full h-3 bg-gray-200 rounded-full appearance-none cursor-pointer accent-primary-600"
                    />
                    <div className="flex justify-between mt-4 text-[10px] font-black text-gray-400 uppercase tracking-widest">
                      <span>Starter</span>
                      <span>Growth</span>
                      <span>Legendary</span>
                    </div>
                  </div>
                </div>
              </div>
            </Card>
          </div>

          {/* Right Side: Big Result */}
          <div className="lg:col-span-7">
            <div className="h-full bg-gradient-to-br from-primary-600 via-primary-700 to-primary-950 rounded-[2.5rem] p-10 md:p-14 text-white shadow-2xl relative overflow-hidden group">
              {/* Background Decoration */}
              <div className="absolute top-0 right-0 w-80 h-80 bg-white/10 rounded-full blur-[100px] -translate-y-1/2 translate-x-1/2 group-hover:scale-125 transition-transform duration-700"></div>
              
              <div className="relative z-10 flex flex-col h-full justify-between">
                <div>
                  <div className="inline-flex items-center gap-2 px-4 py-2 mb-8 text-xs font-black bg-white/20 rounded-full uppercase tracking-widest">
                    <Coins className="w-4 h-4 text-white" />
                    Estimated Monthly Income
                  </div>
                  <h3 className="text-2xl font-bold mb-4 opacity-80">Total Pendapatan Anda:</h3>
                  <div className="flex items-baseline gap-1">
                    <span className="text-4xl md:text-5xl lg:text-8xl font-black text-white drop-shadow-2xl">
                      Rp <AnimatedNumber end={sales * commissionPerSale} />
                    </span>
                  </div>
                  <p className="mt-6 text-primary-100 font-bold text-lg">Berdasarkan {sales} penjualan per bulan.</p>
                </div>

                <div className="mt-12 space-y-6">
                  <div className="flex items-center gap-4 bg-white/10 p-5 rounded-2xl backdrop-blur-md border border-white/10">
                    <div className="w-12 h-12 bg-white rounded-2xl flex items-center justify-center text-primary-700 shadow-lg">
                      <ArrowUpRight className="w-7 h-7" />
                    </div>
                    <div>
                      <p className="font-black text-xl">Tanpa Batas!</p>
                      <p className="text-sm text-primary-100 font-medium opacity-80">Tingkatkan sales Anda untuk komisi yang lebih besar.</p>
                    </div>
                  </div>
                  <Button 
                    variant="white" 
                    size="xl" 
                    rounded="full" 
                    className="w-full"
                    onClick={() => navigate('/register')}
                  >
                    Gabung Sekarang
                  </Button>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Quick Milestones */}
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-6 mt-12">
          {[
            { label: 'Starter', sales: '5', income: '500rb' },
            { label: 'Rising Star', sales: '20', income: '2jt' },
            { label: 'Elite Partner', sales: '50', income: '5jt' },
            { label: 'Master Affiliate', sales: '100', income: '10jt+' },
          ].map((m, i) => (
            <div key={i} className="bg-white p-6 rounded-3xl border border-gray-100 text-center hover:border-primary-200 hover:shadow-xl hover:shadow-primary-50/50 transition-all duration-300 group">
              <p className="text-[10px] font-black text-gray-400 uppercase tracking-widest mb-2 group-hover:text-primary-500 transition-colors">{m.label}</p>
              <p className="font-bold text-gray-900 text-lg">{m.sales} Sales</p>
              <p className="text-2xl font-black text-primary-600 mt-1">Rp {m.income}</p>
            </div>
          ))}
        </div>
      </div>
    </Section>
  );
}
