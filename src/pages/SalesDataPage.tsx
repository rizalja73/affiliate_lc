
import { 
  ArrowLeft, 
  BarChart3, 
  Users, 
  ShoppingBag, 
  RefreshCw, 
  Calendar, 
  MousePointer2, 
  UserPlus, 
  CheckCircle2,
  TrendingUp,
  ArrowRight,
  Filter,
  Download
} from 'lucide-react';
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Button from '../components/Button';
import FloatingActionMenu from '../components/FloatingActionMenu';

export default function SalesDataPage() {
  const navigate = useNavigate();
  const [activeView, setActiveView] = useState<'produk' | 'audiens'>('produk');

  const productData = [
    { id: 1, name: "Kursus Intensif CPNS 2026", qty: 45, date: "12 Mar 2026", returns: 0, revenue: "Rp 22.455.000" },
    { id: 2, name: "Buku Strategi Kuliah", qty: 28, date: "11 Mar 2026", returns: 1, revenue: "Rp 5.180.000" },
    { id: 3, name: "E-Book Maba", qty: 89, date: "10 Mar 2026", returns: 0, revenue: "Rp 8.811.000" },
  ];

  const audienceData = {
    clicks: "12,840",
    registrations: "1,250",
    paid: "840",
    conversionRate: "6.5%"
  };

  return (
    <div className="min-h-screen bg-[#F8FAFC]">
      {/* Header */}
      <header className="sticky top-0 z-50 bg-white/80 backdrop-blur-md border-b border-gray-100 px-6 lg:px-10 py-4">
        <div className="max-w-7xl mx-auto flex items-center justify-between">
          <div className="flex items-center gap-4">
            <button 
              onClick={() => navigate('/dashboard')}
              className="flex items-center justify-center w-10 h-10 text-gray-400 hover:text-primary-600 hover:bg-primary-50 rounded-xl transition-all border border-gray-100 bg-white"
            >
              <ArrowLeft className="w-5 h-5" />
            </button>
            <div>
              <h1 className="text-xl font-black text-gray-900 leading-none">Data Penjualan</h1>
              <p className="text-[10px] uppercase tracking-widest font-black text-gray-400 mt-1">Analisis Performa</p>
            </div>
          </div>
          
          {/* Dual Tab Navigation */}
          <div className="flex p-1.5 bg-gray-100 rounded-2xl w-fit border border-gray-200">
            <button 
              onClick={() => setActiveView('produk')}
              className={`px-8 py-2.5 rounded-xl text-sm font-black transition-all flex items-center gap-2 ${activeView === 'produk' ? 'bg-white text-primary-600 shadow-md' : 'text-gray-500 hover:bg-gray-200'}`}
            >
              <ShoppingBag className="w-4 h-4" />
              Produk
            </button>
            <button 
              onClick={() => setActiveView('audiens')}
              className={`px-8 py-2.5 rounded-xl text-sm font-black transition-all flex items-center gap-2 ${activeView === 'audiens' ? 'bg-white text-primary-600 shadow-md' : 'text-gray-500 hover:bg-gray-200'}`}
            >
              <Users className="w-4 h-4" />
              Audiens
            </button>
          </div>

          <div className="hidden lg:flex items-center gap-3">
             <button className="flex items-center gap-2 px-4 py-2.5 bg-white text-gray-600 rounded-xl text-xs font-black uppercase tracking-widest border border-gray-100 hover:bg-gray-50 transition-colors">
                <Download className="w-4 h-4" /> Export Report
             </button>
          </div>
        </div>
      </header>

      <main className="max-w-7xl mx-auto p-6 lg:p-10 space-y-10">
        
        {activeView === 'produk' ? (
          <div className="space-y-10 animate-fade-in">
            {/* Produk Summary Section */}
            <div className="grid lg:grid-cols-3 gap-8">
              <div className="bg-white p-8 rounded-[2.5rem] border border-gray-100 shadow-sm flex items-center gap-6">
                 <div className="w-16 h-16 bg-blue-50 rounded-2xl flex items-center justify-center text-blue-600">
                    <ShoppingBag className="w-8 h-8" />
                 </div>
                 <div>
                    <div className="text-xs font-black text-gray-400 uppercase tracking-widest mb-1">Total Terjual</div>
                    <div className="text-3xl font-black text-gray-900">162 <span className="text-sm text-gray-400 font-bold ml-1">Pcs</span></div>
                 </div>
              </div>
              <div className="bg-white p-8 rounded-[2.5rem] border border-gray-100 shadow-sm flex items-center gap-6">
                 <div className="w-16 h-16 bg-purple-50 rounded-2xl flex items-center justify-center text-purple-600">
                    <Calendar className="w-8 h-8" />
                 </div>
                 <div>
                    <div className="text-xs font-black text-gray-400 uppercase tracking-widest mb-1">Update Terakhir</div>
                    <div className="text-lg font-black text-gray-900">12 Maret 2026</div>
                 </div>
              </div>
              <div className="bg-white p-8 rounded-[2.5rem] border border-gray-100 shadow-sm flex items-center gap-6">
                 <div className="w-16 h-16 bg-red-50 rounded-2xl flex items-center justify-center text-red-600">
                    <RefreshCw className="w-8 h-8" />
                 </div>
                 <div>
                    <div className="text-xs font-black text-gray-400 uppercase tracking-widest mb-1">Produk Return</div>
                    <div className="text-3xl font-black text-gray-900">1 <span className="text-sm text-gray-400 font-bold ml-1">Kasus</span></div>
                 </div>
              </div>
            </div>

            {/* Product Sale List */}
            <div className="bg-white rounded-[3rem] border border-gray-100 shadow-sm overflow-hidden">
               <div className="p-8 lg:p-10 border-b border-gray-50 flex items-center justify-between">
                  <h3 className="text-xl font-black text-gray-900">Rincian Penjualan Produk</h3>
                  <button className="px-4 py-2 bg-gray-50 text-gray-500 rounded-xl text-[10px] font-black uppercase tracking-widest border border-gray-100 flex items-center gap-2">
                    <Filter className="w-3 h-3" /> Filter Tanggal
                  </button>
               </div>
               <div className="overflow-x-auto">
                 <table className="w-full text-left">
                    <thead>
                      <tr className="bg-gray-50/50">
                        <th className="px-10 py-5 text-[10px] font-black text-gray-400 uppercase tracking-widest">Nama Produk</th>
                        <th className="px-6 py-5 text-[10px] font-black text-center text-gray-400 uppercase tracking-widest">Tanggal</th>
                        <th className="px-6 py-5 text-[10px] font-black text-center text-gray-400 uppercase tracking-widest">Jumlah</th>
                        <th className="px-6 py-5 text-[10px] font-black text-center text-gray-400 uppercase tracking-widest">Return</th>
                        <th className="px-10 py-5 text-[10px] font-black text-right text-gray-400 uppercase tracking-widest">Revenue</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-gray-50">
                      {productData.map((p) => (
                        <tr key={p.id} className="hover:bg-gray-50/30 transition-colors group">
                           <td className="px-10 py-8 font-black text-gray-900 group-hover:text-primary-600 transition-colors">{p.name}</td>
                           <td className="px-6 py-8 text-center text-sm font-bold text-gray-500 italic">{p.date}</td>
                           <td className="px-6 py-8 text-center font-black text-gray-900 text-lg">{p.qty}</td>
                           <td className="px-6 py-8 text-center">
                              <span className={`px-3 py-1 rounded-lg text-[10px] font-black uppercase tracking-widest ${p.returns > 0 ? 'bg-red-50 text-red-600 border border-red-100' : 'bg-emerald-50 text-emerald-600 border border-emerald-100'}`}>
                                 {p.returns} Return
                              </span>
                           </td>
                           <td className="px-10 py-8 text-right font-black text-primary-600 text-lg">{p.revenue}</td>
                        </tr>
                      ))}
                    </tbody>
                 </table>
               </div>
            </div>
          </div>
        ) : (
          <div className="space-y-10 animate-fade-in">
            {/* Audiens Metrics Grid */}
            <div className="grid lg:grid-cols-4 gap-8">
               <div className="bg-gradient-to-br from-primary-600 to-primary-800 p-8 rounded-[2.5rem] text-white shadow-2xl shadow-primary-200 relative overflow-hidden group">
                  <MousePointer2 className="w-12 h-12 opacity-20 absolute -right-2 -top-2 group-hover:scale-110 transition-transform" />
                  <div className="text-[10px] font-black uppercase tracking-[0.2em] mb-4 opacity-70">Klik Produk</div>
                  <div className="text-4xl font-black mb-1">{audienceData.clicks}</div>
                  <div className="flex items-center gap-1 text-[10px] font-bold text-primary-100">
                    <TrendingUp className="w-3 h-3" /> +12% dari kemarin
                  </div>
               </div>
               <div className="bg-white p-8 rounded-[2.5rem] border border-gray-100 shadow-sm relative overflow-hidden group">
                  <UserPlus className="w-12 h-12 text-blue-500 opacity-10 absolute -right-2 -top-2 group-hover:scale-110 transition-transform" />
                  <div className="text-[10px] font-black text-gray-400 uppercase tracking-[0.2em] mb-4">Mendaftar</div>
                  <div className="text-4xl font-black text-gray-900 mb-1">{audienceData.registrations}</div>
                  <div className="text-[10px] font-bold text-blue-500 italic">User Lead Baru</div>
               </div>
               <div className="bg-white p-8 rounded-[2.5rem] border border-gray-100 shadow-sm relative overflow-hidden group">
                  <CheckCircle2 className="w-12 h-12 text-emerald-500 opacity-10 absolute -right-2 -top-2 group-hover:scale-110 transition-transform" />
                  <div className="text-[10px] font-black text-gray-400 uppercase tracking-[0.2em] mb-4">Lunas</div>
                  <div className="text-4xl font-black text-gray-900 mb-1">{audienceData.paid}</div>
                  <div className="text-[10px] font-bold text-emerald-500 italic">Transaksi Selesai</div>
               </div>
               <div className="bg-gray-900 p-8 rounded-[2.5rem] text-white shadow-2xl relative overflow-hidden group">
                  <BarChart3 className="w-12 h-12 opacity-20 absolute -right-2 -top-2 group-hover:scale-110 transition-transform" />
                  <div className="text-[10px] font-black uppercase tracking-[0.2em] mb-4 opacity-70">Konversi</div>
                  <div className="text-4xl font-black mb-1">{audienceData.conversionRate}</div>
                  <div className="text-[10px] font-bold text-primary-400 italic">Performa Sangat Baik</div>
               </div>
            </div>

            {/* Funnel Layout */}
            <div className="bg-white rounded-[3rem] p-10 lg:p-14 border border-gray-100 shadow-sm">
               <div className="max-w-3xl mx-auto space-y-12">
                  <div className="text-center space-y-2">
                     <h3 className="text-2xl font-black text-gray-900">Visualisasi Funnel</h3>
                     <p className="text-gray-500 font-medium">Lacak perjalanan audiens Anda hingga menjadi pembeli loyal.</p>
                  </div>
                  
                  <div className="space-y-6">
                    {[
                      { step: 'Kunjungan Link', value: audienceData.clicks, width: '100%', color: 'bg-primary-500' },
                      { step: 'Proses Pendaftaran', value: audienceData.registrations, width: '65%', color: 'bg-blue-500' },
                      { step: 'Pembayaran Lunas', value: audienceData.paid, width: '45%', color: 'bg-emerald-500' }
                    ].map((item, idx) => (
                      <div key={idx} className="relative">
                        <div className="flex justify-between items-center mb-2 px-2">
                           <span className="text-sm font-black text-gray-700 uppercase tracking-widest">{item.step}</span>
                           <span className="text-lg font-black text-gray-900">{item.value}</span>
                        </div>
                        <div className="h-6 bg-gray-100 rounded-full overflow-hidden shadow-inner flex items-center p-1">
                           <div 
                            className={`h-full ${item.color} rounded-full transition-all duration-1000 shadow-lg`} 
                            style={{ width: item.width }}
                           ></div>
                        </div>
                      </div>
                    ))}
                  </div>
               </div>
            </div>
          </div>
        )}

      </main>

      {/* Action Footer */}
      <footer className="max-w-7xl mx-auto px-6 lg:px-10 pb-20">
         <div className="bg-gradient-to-r from-gray-900 to-primary-900 rounded-[2.5rem] p-12 text-white flex flex-col md:flex-row items-center justify-between gap-8 relative overflow-hidden">
            <div className="relative z-10 text-center md:text-left">
               <h4 className="text-2xl font-black mb-2">Ingin meningkatkan konversi?</h4>
               <p className="text-gray-400 font-medium">Pelajari strategi market affiliate dari Lampung Cerdas Academy.</p>
            </div>
            <Button size="lg" className="relative z-10 bg-primary-600 border-none group px-10">
              Mulai Belajar
              <ArrowRight className="ml-2 w-5 h-5 group-hover:translate-x-1 transition-transform" />
            </Button>
            <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-primary-500/10 rounded-full blur-[100px] translate-x-1/3 -translate-y-1/3"></div>
         </div>
      </footer>
      <FloatingActionMenu />
    </div>
  );
}
