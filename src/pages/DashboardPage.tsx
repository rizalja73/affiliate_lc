import {
  ShoppingBag,
  Wallet,
  Image as ImageIcon,
  ArrowLeft,
  Bell,
  Search,
  TrendingUp,
  Users,
  Award,
  ExternalLink,
  ChevronRight,
  Calendar,
  GraduationCap,
  Loader2,
  AlertCircle
} from 'lucide-react';
import { Link, useNavigate } from 'react-router-dom';
import { useState, useEffect } from 'react';
import FloatingActionMenu from '../components/FloatingActionMenu';
import Sidebar from '../components/Sidebar';
import ProfileDropdown from '../components/ProfileDropdown';
import { useAuth } from '../hooks/useAuth';
import { supabase } from '../lib/supabase';

export default function DashboardPage() {
  const navigate = useNavigate();
  const { user } = useAuth();
  const [activeTimeFilter, setActiveTimeFilter] = useState<'hari-ini' | 'kemarin' | '7-hari' | 'custom'>('hari-ini');
  
  // Real-time stats state
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [statsData, setStatsData] = useState({
    gmv: 0,
    sold: 0,
    komisi: 0
  });

  const displayName = user?.user_metadata?.first_name 
    ? `${user.user_metadata.first_name} ${user.user_metadata.last_name || ''}`
    : user?.email?.split('@')[0] || 'Member';

  // Helper (Same logic as EarningsPage)
  const isStatusSuccess = (status: string) => {
    if (!status) return false;
    const s = status.toLowerCase();
    return s === 'success' || s === 'completed' || s === 'lunas' || s === 'sukses';
  };

  useEffect(() => {
    const fetchPerformanceData = async () => {
      if (!user) return;
      
      try {
        setLoading(true);
        setError(null);

        // 1. Get Username
        const { data: profile } = await supabase
          .from('affiliate_profiles')
          .select('username')
          .eq('user_id', user.id)
          .single();
        
        const username = profile?.username || user.user_metadata?.username || user.email?.split('@')[0] || 'member';

        // 2. Fetch Orders
        const response = await fetch(`https://lampungcerdas.com/api/produks/orders?referral=${username}`, {
          method: 'GET',
          headers: {
            'x-api-key': import.meta.env.VITE_PRODUCTS_API_KEY,
            'Content-Type': 'application/json'
          }
        });

        const result = await response.json();

        if (result.success) {
          const rawOrders = result.data?.data || result.data || [];
          
          let totalGMV = 0;
          let totalSold = 0;
          let totalKomisi = 0;

          rawOrders.forEach((o: any) => {
            if (isStatusSuccess(o.status)) {
              // Calculate GMV (Price * Qty)
              const price = o.produk?.harga || o.harga || 0;
              const qty = o.qty || 1;
              totalGMV += (price * qty);

              // Calculate Sold (Qty)
              totalSold += qty;

              // Calculate Komisi
              let komisiNum = 0;
              if (o.produk?.komisi) {
                 const rawKomisiStr = (o.produk.komisi || '0').toString();
                 komisiNum = parseInt(rawKomisiStr.replace(/[^0-9]/g, ''), 10) || 0;
              }
              totalKomisi += komisiNum;
            }
          });

          setStatsData({
            gmv: totalGMV,
            sold: totalSold,
            komisi: totalKomisi
          });
        }
      } catch (err) {
        console.error('Fetch error:', err);
        setError('Gagal mensinkronkan data.');
      } finally {
        setLoading(false);
      }
    };

    fetchPerformanceData();
  }, [user]);

  const stats = [
    { label: 'GMV', value: new Intl.NumberFormat('id-ID', { style: 'currency', currency: 'IDR', minimumFractionDigits: 0 }).format(statsData.gmv) },
    { label: 'Produk Terjual', value: `${statsData.sold} unit` },
    { label: 'Komisi', value: new Intl.NumberFormat('id-ID', { style: 'currency', currency: 'IDR', minimumFractionDigits: 0 }).format(statsData.komisi) }
  ];

  const menuItems = [
    {
      title: 'Cek Produk Lampung Cerdas',
      icon: <ShoppingBag className="w-8 h-8" />,
      description: 'Lihat katalog produk digital & fisik yang bisa Anda promosikan.',
      color: 'bg-blue-500',
      shadow: 'shadow-blue-200',
      link: '/products'
    },
    {
      title: 'Cek Pendapatan',
      icon: <Wallet className="w-8 h-8" />,
      description: 'Pantau saldo komisi, data penjualan, dan performa link affiliate Anda.',
      color: 'bg-emerald-500',
      shadow: 'shadow-emerald-200',
      link: '/earnings'
    },
    {
      title: 'Bahan Marketing',
      icon: <ImageIcon className="w-8 h-8" />,
      description: 'Download banner, copywriting, dan konten promosi siap pakai.',
      color: 'bg-orange-500',
      shadow: 'shadow-orange-200',
      link: '/marketing'
    },
    {
      title: 'Academy Affiliate',
      icon: <GraduationCap className="w-8 h-8" />,
      description: 'Akses modul eksklusif dan video tutorial untuk Affiliate Pro.',
      color: 'bg-red-500',
      shadow: 'shadow-red-200',
      link: '/academy'
    }
  ];

  return (
    <div className="min-h-screen bg-[#F8FAFC]">
      <Sidebar />

      {/* Main Content Area */}
      <main className="xl:ml-72 min-h-screen">
        {/* Top Header */}
        <header className="sticky top-0 z-40 bg-white/80 backdrop-blur-md border-b border-gray-100 px-6 lg:px-10 py-4">
          <div className="flex items-center justify-between gap-4">
            <div className="flex items-center gap-4">
              <button
                onClick={() => navigate(-1)}
                className="flex items-center gap-2 text-gray-500 hover:text-primary-600 font-bold transition-colors bg-white px-4 py-2 rounded-xl border border-gray-100 shadow-sm"
              >
                <ArrowLeft className="w-4 h-4" />
                <span className="hidden sm:inline">Kembali</span>
              </button>
              <div className="h-8 w-[1px] bg-gray-100 hidden sm:block"></div>
              <h1 className="text-xl font-black text-gray-900 hidden md:block">Dashboard Overview</h1>
            </div>

            <div className="flex items-center gap-3 md:gap-6">
              <div className="hidden lg:flex items-center bg-gray-50 border border-gray-100 rounded-xl px-4 py-2 w-64">
                <Search className="w-4 h-4 text-gray-400 mr-2" />
                <input type="text" placeholder="Cari fitur..." className="bg-transparent text-sm outline-none w-full" />
              </div>

              <button className="relative w-10 h-10 flex items-center justify-center bg-gray-50 rounded-xl hover:bg-gray-100 transition-colors">
                <Bell className="w-5 h-5 text-gray-600" />
                <span className="absolute top-2.5 right-2.5 w-2 h-2 bg-red-500 rounded-full border-2 border-white"></span>
              </button>

              <ProfileDropdown />
            </div>
          </div>
        </header>

        <div className="p-6 lg:p-10 space-y-10">
          {/* Welcome Section */}
          <section className="relative overflow-hidden bg-primary-600 rounded-[2.5rem] p-8 lg:p-12 text-white shadow-2xl shadow-primary-200">
            <div className="relative z-10 space-y-10">
              <div className="grid lg:grid-cols-2 gap-8 items-start">
                <div className="space-y-6">
                  {loading ? (
                    <div className="inline-flex items-center gap-2 px-4 py-2 bg-white/10 backdrop-blur-md rounded-full text-sm font-bold border border-white/20 animate-pulse">
                      <Loader2 className="w-4 h-4 animate-spin text-white" />
                      Mensinkronkan data...
                    </div>
                  ) : error ? (
                    <div className="inline-flex items-center gap-2 px-4 py-2 bg-red-500 rounded-full text-sm font-bold border border-white/20">
                      <AlertCircle className="w-4 h-4 text-white" />
                      Oops! {error}
                    </div>
                  ) : (
                    <div className="inline-flex items-center gap-2 px-4 py-2 bg-white/10 backdrop-blur-md rounded-full text-sm font-bold border border-white/20">
                      <TrendingUp className="w-4 h-4" />
                      Performa Anda tersinkronisasi otomatis!
                    </div>
                  )}
                  <h2 className="text-4xl lg:text-5xl font-black leading-tight">
                    Halo, {displayName.split(' ')[0]}! <br />
                    Siap raih <span className="text-primary-100">komisi besar?</span>
                  </h2>
                  <p className="text-primary-50/80 text-lg font-medium max-w-md">
                    Akses semua fitur dashboard pusat affiliate di bawah ini dan mulai kembangkan jaringan bisnis Anda sekarang.
                  </p>
                </div>

                <div className="flex flex-col gap-4 lg:items-end">
                  {/* Time Filters - Premium Pill Style */}
                  <div className="flex flex-wrap p-1.5 bg-white/10 backdrop-blur-md rounded-2xl w-fit border border-white/10 shadow-inner">
                    {[
                      { id: 'hari-ini', label: 'Hari Ini' },
                      { id: 'kemarin', label: 'Kemarin' },
                      { id: '7-hari', label: '7 Hari' },
                      { id: 'custom', label: 'Custom', icon: <Calendar className="w-3.5 h-3.5" /> }
                    ].map((filter) => (
                      <button
                        key={filter.id}
                        onClick={() => setActiveTimeFilter(filter.id as any)}
                        className={`px-5 py-2.5 rounded-xl text-[10px] font-black uppercase tracking-[0.15em] transition-all duration-300 flex items-center gap-2 group ${activeTimeFilter === filter.id ? 'bg-white text-primary-600 shadow-[0_8px_20px_rgba(255,255,255,0.2)] scale-105' : 'text-white/70 hover:text-white hover:bg-white/10'}`}
                      >
                        {filter.icon && <span className={activeTimeFilter === filter.id ? 'text-primary-500' : 'text-white/40 group-hover:text-white/60'}>{filter.icon}</span>}
                        {filter.label}
                      </button>
                    ))}
                  </div>

                  <button
                    className="px-8 py-2.5 bg-white text-primary-600 shadow-lg rounded-xl text-xs font-black tracking-widest uppercase transition-all duration-300 pointer-events-none"
                  >
                    Komisi
                  </button>
                </div>
              </div>

              {/* Stats Highlights Grid */}
              <div className="grid grid-cols-2 lg:grid-cols-3 gap-4 animate-fade-in" key={activeTimeFilter}>
                {stats.map((stat, i) => (
                  <div key={i} className={`bg-white/10 backdrop-blur-md p-6 rounded-3xl border border-white/10 group hover:bg-white/20 transition-all cursor-default relative overflow-hidden ${loading ? 'animate-pulse' : ''}`}>
                    <div className="text-primary-100 text-[10px] font-black uppercase tracking-[0.2em] mb-3 opacity-80 group-hover:opacity-100 transition-opacity">{stat.label}</div>
                    <div className="text-2xl font-black tracking-tight">
                      {loading ? '...' : stat.value}
                    </div>
                    {/* Subtle line decoration */}
                    <div className="absolute bottom-0 left-0 w-full h-[2px] bg-gradient-to-r from-transparent via-white/20 to-transparent scale-x-0 group-hover:scale-x-100 transition-transform"></div>
                  </div>
                ))}
              </div>
            </div>

            {/* Background Decoration */}
            <div className="absolute top-0 right-0 w-96 h-96 bg-white opacity-5 rounded-full -translate-y-1/2 translate-x-1/2 blur-3xl"></div>
            <div className="absolute bottom-0 left-0 w-64 h-64 bg-black opacity-10 rounded-full translate-y-1/2 -translate-x-1/2 blur-3xl"></div>
          </section>

          {/* Quick Menu Grid */}
          <section className="space-y-6">
            <div className="flex items-center justify-between px-4">
              <h3 className="text-2xl font-black text-gray-900 tracking-tight">Eksplorasi Fitur Utama</h3>
              <a href="#" className="text-sm font-bold text-primary-600 hover:underline flex items-center gap-1 group">
                Lihat Panduan Lengkap <ChevronRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
              </a>
            </div>

            <div className="grid md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-5 gap-6">
              {menuItems.map((item, idx) => (
                <Link
                  key={idx}
                  to={item.link}
                  className="group relative bg-white p-8 rounded-[2rem] border border-gray-100 shadow-sm hover:shadow-2xl hover:shadow-gray-200/50 transition-all overflow-hidden"
                >
                  <div className={`${item.color} w-16 h-16 rounded-2xl flex items-center justify-center text-white mb-6 group-hover:scale-110 transition-transform shadow-xl ${item.shadow}`}>
                    {item.icon}
                  </div>
                  <h4 className="text-lg font-black text-gray-900 mb-2 group-hover:text-primary-600 transition-colors">
                    {item.title}
                  </h4>
                  <p className="text-sm text-gray-500 font-medium leading-relaxed mb-6">
                    {item.description}
                  </p>
                  <div className="flex items-center text-xs font-black uppercase tracking-widest text-primary-600 gap-1 opacity-0 group-hover:opacity-100 transition-opacity">
                    Buka Menu <ArrowLeft className="w-3 h-3 rotate-180" />
                  </div>
                </Link>
              ))}
            </div>
          </section>

          {/* Rewards & Rank Section */}
          <div className="grid lg:grid-cols-3 gap-8">
            <div className="lg:col-span-2 bg-white rounded-[2.5rem] p-8 lg:p-10 border border-gray-100 shadow-sm">
              <div className="flex items-center justify-between mb-8">
                <div>
                  <h3 className="text-xl font-black text-gray-900">Program Hadiah Affiliate</h3>
                  <p className="text-gray-500 text-sm font-medium mt-1">Kejar target dan dapatkan bonus fantastis!</p>
                </div>
                <Award className="w-8 h-8 text-primary-500" />
              </div>

              <div className="space-y-6">
                {[
                  { label: 'Target Penjualan Maret', current: 75, target: '100 Project', color: 'bg-primary-600' },
                  { label: 'Komisi Bulanan', current: 40, target: 'Rp 20.000.000', color: 'bg-emerald-500' }
                ].map((stat, i) => (
                  <div key={i} className="space-y-3">
                    <div className="flex justify-between items-end">
                      <span className="text-sm font-bold text-gray-700">{stat.label}</span>
                      <span className="text-sm font-black text-primary-600">{stat.current}% <span className="text-gray-400 font-bold ml-1">/ {stat.target}</span></span>
                    </div>
                    <div className="h-4 bg-gray-100 rounded-full overflow-hidden">
                      <div className={`h-full ${stat.color} rounded-full transition-all duration-1000`} style={{ width: `${stat.current}%` }}></div>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            <div className="bg-gradient-to-br from-gray-900 to-gray-800 rounded-[2.5rem] p-8 lg:p-10 text-white flex flex-col justify-between shadow-2xl relative overflow-hidden group">
              <div className="relative z-10">
                <Users className="w-10 h-10 text-primary-400 mb-6" />
                <h3 className="text-xl font-black mb-2">Webinar Eksklusif</h3>
                <p className="text-gray-400 text-sm font-medium leading-relaxed">
                  Ikuti sesi strategi pemasaran khusus Top Affiliate Lampung Cerdas besok jam 19:00 WIB.
                </p>
              </div>
              <button className="relative z-10 flex items-center justify-center gap-2 bg-primary-600 py-4 rounded-2xl font-black hover:bg-primary-700 transition-colors mt-8 group">
                Amankan Kursi
                <ExternalLink className="w-4 h-4 group-hover:scale-110 transition-transform" />
              </button>
              {/* Pattern Background */}
              <div className="absolute bottom-0 right-0 w-32 h-32 opacity-10">
                <svg width="100" height="100" viewBox="0 0 100 100" fill="none" opacity="0.3">
                  <circle cx="50" cy="50" r="40" stroke="white" strokeWidth="10" strokeDasharray="20 10" />
                </svg>
              </div>
            </div>
          </div>
        </div>

        {/* Footer info for Dashboard */}
        <footer className="p-10 border-t border-gray-100 text-center">
          <p className="text-sm text-gray-400 font-bold">
            &copy; 2026 Lampung Cerdas. Semua hak dilindungi. <br />
            <span className="text-primary-500/50">Affiliate Management System v2.1.0</span>
          </p>
        </footer>
      </main>

      {/* Floating Action Menu for Mobile */}
      <FloatingActionMenu />
    </div>
  );
}
