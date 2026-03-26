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
  Download,
  Loader2,
  AlertCircle
} from 'lucide-react';
import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { supabase } from '../lib/supabase';
import { useAuth } from '../hooks/useAuth';
import Button from '../components/Button';
import FloatingActionMenu from '../components/FloatingActionMenu';
import ProfileDropdown from '../components/ProfileDropdown';
import Sidebar from '../components/Sidebar';

export default function SalesDataPage() {
  const navigate = useNavigate();
  const { user } = useAuth();
  const [activeView, setActiveView] = useState<'produk' | 'audiens'>('produk');
  const [orders, setOrders] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [stats, setStats] = useState({
    totalSold: 0,
    lastUpdate: 'Menarik data...',
    returns: 0
  });

  const [audienceData, setAudienceData] = useState({
    clicks: "0",
    registrations: "0",
    paid: "0",
    conversionRate: "0%"
  });

  useEffect(() => {
    const fetchSalesData = async () => {
      try {
        setLoading(true);
        if (!user) return;

        // 1. Get Username
        const { data: profile } = await supabase
          .from('affiliate_profiles')
          .select('username')
          .eq('user_id', user.id)
          .single();
        
        const username = profile?.username || user.user_metadata?.username || user.email?.split('@')[0] || 'member';

        // 2. Fetch Orders from API
        const response = await fetch(`https://lampungcerdas.com/api/produks/orders?referral=${username}`, {
          method: 'GET',
          headers: {
            'x-api-key': 'lc-api-key-2026',
            'Content-Type': 'application/json'
          }
        });

        const result = await response.json();

        if (result.success) {
          const rawOrders = result.data?.data || result.data || [];
          
          // Map to local format
          const formatted = rawOrders.map((o: any) => ({
            id: o.id || Math.random(),
            name: o.produk?.nama || o.nama_produk || 'Program LC',
            qty: o.qty || 1,
            date: o.created_at ? new Date(o.created_at).toLocaleDateString('id-ID', { day: 'numeric', month: 'short', year: 'numeric' }) : '-',
            status: o.status || 'pending',
            revenue: o.total_harga || o.harga || 0
          }));

          setOrders(formatted);

          // Calculate Summary
          const totalQty = formatted.reduce((acc: number, curr: any) => acc + curr.qty, 0);
          const paidOrders = formatted.filter((o: any) => o.status === 'success' || o.status === 'completed' || o.status === 'Lunas');
          
          setStats({
            totalSold: totalQty,
            lastUpdate: formatted.length > 0 ? formatted[0].date : 'Belum ada data',
            returns: 0 // API hasn't specified returns yet
          });

          // Audience Data (Mocking based on orders for now, ideally another API)
          setAudienceData({
            clicks: (formatted.length * 15).toLocaleString(), // Mock conversion 1:15
            registrations: formatted.length.toLocaleString(),
            paid: paidOrders.length.toLocaleString(),
            conversionRate: formatted.length > 0 ? `${((paidOrders.length / (formatted.length * 15)) * 100).toFixed(1)}%` : '0%'
          });

        } else {
          setError('Gagal memuat data dari pusat.');
        }
      } catch (err: any) {
        console.error('Sales fetch error:', err);
        setError('Terjadi kesalahan koneksi.');
      } finally {
        setLoading(false);
      }
    };

    fetchSalesData();
  }, [user]);

  const formatCurrency = (val: number) => {
    return new Intl.NumberFormat('id-ID', {
      style: 'currency',
      currency: 'IDR',
      minimumFractionDigits: 0
    }).format(val);
  };

  return (
    <div className="min-h-screen bg-[#F8FAFC]">
      <Sidebar />
      <div className="xl:ml-72 min-h-screen">
        <header className="sticky top-0 z-40 bg-white/80 backdrop-blur-md border-b border-gray-100 px-6 lg:px-10 py-4">
          <div className="max-w-7xl mx-auto flex items-center justify-between gap-6">
            <div className="flex items-center gap-4">
              <button 
                onClick={() => navigate('/dashboard')}
                className="flex items-center justify-center w-10 h-10 text-gray-400 hover:text-primary-600 hover:bg-primary-50 rounded-xl transition-all border border-gray-100 bg-white"
              >
                <ArrowLeft className="w-5 h-5" />
              </button>
              <div>
                <h1 className="text-xl font-black text-gray-900 leading-none">Data Penjualan</h1>
                <p className="text-[10px] uppercase tracking-widest font-black text-gray-400 mt-1">Performa Real-Time</p>
              </div>
            </div>
            
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

            <ProfileDropdown />
          </div>
        </header>

        <main className="max-w-7xl mx-auto p-6 lg:p-10 space-y-10">
          
          {loading ? (
             <div className="flex flex-col items-center justify-center h-[60vh] space-y-4">
                <Loader2 className="w-12 h-12 text-primary-600 animate-spin" />
                <p className="font-black text-gray-400 uppercase tracking-widest">Sinkronisasi Data...</p>
             </div>
          ) : error ? (
            <div className="bg-red-50 p-12 rounded-[3.5rem] border border-red-100 text-center space-y-4">
               <AlertCircle className="w-16 h-16 text-red-600 mx-auto" />
               <h3 className="text-xl font-black text-red-900">Koneksi Gagal</h3>
               <p className="text-red-700 font-medium">{error}</p>
               <Button variant="outline" onClick={() => window.location.reload()}>Coba Lagi</Button>
            </div>
          ) : activeView === 'produk' ? (
            <div className="space-y-10 animate-fade-in">
              <div className="grid lg:grid-cols-3 gap-8">
                <div className="bg-white p-8 rounded-[2.5rem] border border-gray-100 shadow-sm flex items-center gap-6">
                   <div className="w-16 h-16 bg-blue-50 rounded-2xl flex items-center justify-center text-blue-600">
                      <ShoppingBag className="w-8 h-8" />
                   </div>
                   <div>
                      <div className="text-xs font-black text-gray-400 uppercase tracking-widest mb-1">Total Terjual</div>
                      <div className="text-3xl font-black text-gray-900">{stats.totalSold} <span className="text-sm text-gray-400 font-bold ml-1">Order</span></div>
                   </div>
                </div>
                <div className="bg-white p-8 rounded-[2.5rem] border border-gray-100 shadow-sm flex items-center gap-6">
                   <div className="w-16 h-16 bg-purple-50 rounded-2xl flex items-center justify-center text-purple-600">
                      <Calendar className="w-8 h-8" />
                   </div>
                   <div>
                      <div className="text-xs font-black text-gray-400 uppercase tracking-widest mb-1">Update Terakhir</div>
                      <div className="text-lg font-black text-gray-900">{stats.lastUpdate}</div>
                   </div>
                </div>
                <div className="bg-white p-8 rounded-[2.5rem] border border-gray-100 shadow-sm flex items-center gap-6">
                   <div className="w-16 h-16 bg-red-50 rounded-2xl flex items-center justify-center text-red-600">
                      <RefreshCw className="w-8 h-8" />
                   </div>
                   <div>
                      <div className="text-xs font-black text-gray-400 uppercase tracking-widest mb-1">Status Issue</div>
                      <div className="text-3xl font-black text-gray-900">{stats.returns} <span className="text-sm text-gray-400 font-bold ml-1">Kasus</span></div>
                   </div>
                </div>
              </div>

              <div className="bg-white rounded-[3rem] border border-gray-100 shadow-sm overflow-hidden">
                 <div className="p-8 lg:p-10 border-b border-gray-50 flex items-center justify-between">
                    <h3 className="text-xl font-black text-gray-900">Rincian Penjualan Anda</h3>
                    <div className="flex items-center gap-3">
                      <button className="px-4 py-2 bg-gray-50 text-gray-500 rounded-xl text-[10px] font-black uppercase tracking-widest border border-gray-100 flex items-center gap-2">
                        <Filter className="w-3 h-3" /> Filter
                      </button>
                      <button className="p-2 bg-gray-900 text-white rounded-xl shadow-lg">
                         <Download className="w-4 h-4" />
                      </button>
                    </div>
                 </div>
                 <div className="overflow-x-auto">
                   <table className="w-full text-left">
                      <thead>
                        <tr className="bg-gray-50/50">
                          <th className="px-10 py-5 text-[10px] font-black text-gray-400 uppercase tracking-widest">Nama Produk</th>
                          <th className="px-6 py-5 text-[10px] font-black text-center text-gray-400 uppercase tracking-widest">Tanggal</th>
                          <th className="px-6 py-5 text-[10px] font-black text-center text-gray-400 uppercase tracking-widest">Status</th>
                          <th className="px-10 py-5 text-[10px] font-black text-right text-gray-400 uppercase tracking-widest">Revenue</th>
                        </tr>
                      </thead>
                      <tbody className="divide-y divide-gray-50">
                        {orders.length > 0 ? orders.map((o) => (
                          <tr key={o.id} className="hover:bg-gray-50/30 transition-colors group">
                             <td className="px-10 py-8 font-black text-gray-900 group-hover:text-primary-600 transition-colors">{o.name}</td>
                             <td className="px-6 py-8 text-center text-sm font-bold text-gray-500 italic">{o.date}</td>
                             <td className="px-6 py-8 text-center">
                                <span className={`px-4 py-1.5 rounded-full text-[10px] font-black uppercase tracking-widest border ${o.status === 'success' || o.status === 'completed' || o.status === 'Lunas' ? 'bg-emerald-50 text-emerald-600 border-emerald-100' : 'bg-orange-50 text-orange-600 border-orange-100'}`}>
                                   {o.status}
                                </span>
                             </td>
                             <td className="px-10 py-8 text-right font-black text-primary-600 text-lg">{formatCurrency(o.revenue)}</td>
                          </tr>
                        )) : (
                          <tr>
                            <td colSpan={4} className="px-10 py-20 text-center font-black text-gray-300 uppercase tracking-widest">Belum ada transaksi ditemukan</td>
                          </tr>
                        )}
                      </tbody>
                   </table>
                 </div>
              </div>
            </div>
          ) : (
            <div className="space-y-10 animate-fade-in">
              <div className="grid lg:grid-cols-4 gap-8">
                 <div className="bg-gray-900 p-8 rounded-[2.5rem] text-white shadow-2xl relative overflow-hidden group">
                    <MousePointer2 className="w-12 h-12 opacity-20 absolute -right-2 -top-2 group-hover:scale-110 transition-transform" />
                    <div className="text-[10px] font-black uppercase tracking-[0.2em] mb-4 opacity-70">Estimasi Klik</div>
                    <div className="text-4xl font-black mb-1">{audienceData.clicks}</div>
                 </div>
                 <div className="bg-white p-8 rounded-[2.5rem] border border-gray-100 shadow-sm relative overflow-hidden group">
                    <UserPlus className="w-12 h-12 text-blue-500 opacity-10 absolute -right-2 -top-2 group-hover:scale-110 transition-transform" />
                    <div className="text-[10px] font-black text-gray-400 uppercase tracking-[0.2em] mb-4">Mendaftar</div>
                    <div className="text-4xl font-black text-gray-900 mb-1">{audienceData.registrations}</div>
                 </div>
                 <div className="bg-white p-8 rounded-[2.5rem] border border-gray-100 shadow-sm relative overflow-hidden group">
                    <CheckCircle2 className="w-12 h-12 text-emerald-500 opacity-10 absolute -right-2 -top-2 group-hover:scale-110 transition-transform" />
                    <div className="text-[10px] font-black text-gray-400 uppercase tracking-[0.2em] mb-4">Lunas</div>
                    <div className="text-4xl font-black text-gray-900 mb-1">{audienceData.paid}</div>
                 </div>
                 <div className="bg-primary-600 p-8 rounded-[2.5rem] text-white shadow-2xl relative overflow-hidden group">
                    <BarChart3 className="w-12 h-12 opacity-20 absolute -right-2 -top-2 group-hover:scale-110 transition-transform" />
                    <div className="text-[10px] font-black uppercase tracking-[0.2em] mb-4 opacity-70">Konversi</div>
                    <div className="text-4xl font-black mb-1">{audienceData.conversionRate}</div>
                 </div>
              </div>

              <div className="bg-white rounded-[3rem] p-10 lg:p-14 border border-gray-100 shadow-sm">
                 <div className="max-w-3xl mx-auto space-y-12">
                   <div className="text-center space-y-2">
                      <h3 className="text-2xl font-black text-gray-900 font-clash">Analisis Funnel</h3>
                      <p className="text-gray-500 font-medium">Data real-time dari performa link afiliasi Anda.</p>
                   </div>
                   
                   <div className="space-y-6">
                     {[
                       { step: 'Kunjungan Link (Est)', value: audienceData.clicks, width: '100%', color: 'bg-primary-600' },
                       { step: 'Pendaftaran', value: audienceData.registrations, width: '65%', color: 'bg-blue-500' },
                       { step: 'Pembayaran Lunas', value: audienceData.paid, width: '45%', color: 'bg-emerald-500' }
                     ].map((item, idx) => (
                       <div key={idx} className="relative">
                         <div className="flex justify-between items-center mb-2 px-2">
                            <span className="text-xs font-black text-gray-700 uppercase tracking-widest">{item.step}</span>
                            <span className="text-lg font-black text-gray-900">{item.value}</span>
                         </div>
                         <div className="h-6 bg-gray-50 rounded-full overflow-hidden shadow-inner flex items-center p-1 border border-gray-100">
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
        <FloatingActionMenu />
      </div>
    </div>
  );
}
