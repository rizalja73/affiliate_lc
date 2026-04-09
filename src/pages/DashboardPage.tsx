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
  AlertCircle,
  Zap,
  Sparkles,
  ArrowRight
} from 'lucide-react';
import { Link, useNavigate } from 'react-router-dom';
import { useState, useEffect, useMemo } from 'react';
import FloatingActionMenu from '../components/FloatingActionMenu';
import Sidebar from '../components/Sidebar';
import ProfileDropdown from '../components/ProfileDropdown';
import { useAuth } from '../hooks/useAuth';
import { supabase } from '../lib/supabase';

export default function DashboardPage() {
  const navigate = useNavigate();
  const { user } = useAuth();
  const [activeTimeFilter, setActiveTimeFilter] = useState<'hari-ini' | 'kemarin' | '7-hari' | 'custom'>('hari-ini');
  
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [rawOrders, setRawOrders] = useState<any[]>([]);

  const displayName = user?.user_metadata?.full_name || user?.user_metadata?.first_name || user?.email?.split('@')[0] || 'Member';

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

        const { data: profile } = await supabase
          .from('affiliate_profiles')
          .select('username')
          .eq('user_id', user.id)
          .single();
        
        const username = profile?.username || user.user_metadata?.username || user.email?.split('@')[0] || 'member';

        const response = await fetch(`https://lampungcerdas.com/api/produks/orders?referral=${username}`, {
          method: 'GET',
          headers: {
            'x-api-key': import.meta.env.VITE_PRODUCTS_API_KEY,
            'Content-Type': 'application/json'
          }
        });

        const result = await response.json();

        if (result.success) {
          const orders = result.data?.data || result.data || [];
          setRawOrders(orders);
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

  const filteredStats = useMemo(() => {
    const now = new Date();
    const today = new Date(now.getFullYear(), now.getMonth(), now.getDate()).getTime();
    const yesterday = today - (24 * 60 * 60 * 1000);
    const sevenDaysAgo = today - (7 * 24 * 60 * 60 * 1000);

    let gmv = 0;
    let sold = 0;
    let komisi = 0;

    rawOrders.forEach(o => {
      if (!isStatusSuccess(o.status)) return;

      const orderDate = new Date(o.created_at).getTime();
      let matchesFilter = false;

      switch (activeTimeFilter) {
        case 'hari-ini':
          matchesFilter = orderDate >= today;
          break;
        case 'kemarin':
          matchesFilter = orderDate >= yesterday && orderDate < today;
          break;
        case '7-hari':
          matchesFilter = orderDate >= sevenDaysAgo;
          break;
        case 'custom':
          matchesFilter = true;
          break;
        default:
          matchesFilter = true;
      }

      if (matchesFilter) {
        const price = o.produk?.harga || o.harga || 0;
        const qty = o.qty || 1;
        gmv += (price * qty);
        sold += qty;
        let komisiNum = 0;
        if (o.produk?.komisi) {
          const rawKomisiStr = (o.produk.komisi || '0').toString();
          komisiNum = parseInt(rawKomisiStr.replace(/[^0-9]/g, ''), 10) || 0;
        }
        komisi += komisiNum;
      }
    });

    return { gmv, sold, komisi };
  }, [rawOrders, activeTimeFilter]);

  const stats = [
    { label: 'GMV', value: new Intl.NumberFormat('id-ID', { style: 'currency', currency: 'IDR', minimumFractionDigits: 0 }).format(filteredStats.gmv) },
    { label: 'Produk Terjual', value: `${filteredStats.sold} unit` },
    { label: 'Komisi', value: new Intl.NumberFormat('id-ID', { style: 'currency', currency: 'IDR', minimumFractionDigits: 0 }).format(filteredStats.komisi) }
  ];

  const menuItems = [
    {
      title: 'Katalog Produk',
      badge: 'Terpopuler',
      icon: <ShoppingBag className="w-7 h-7" />,
      description: 'Temukan produk unggulan dan mulai hasilkan cuan dengan link unik Anda.',
      color: 'from-blue-600 to-cyan-500',
      bgLight: 'bg-blue-50',
      link: '/products',
      delay: '0ms'
    },
    {
      title: 'Cek Pendapatan',
      badge: 'Penting',
      icon: <Wallet className="w-7 h-7" />,
      description: 'Pantau arus kas komisi Anda dan detail status transaksi secara berkala.',
      color: 'from-emerald-600 to-teal-400',
      bgLight: 'bg-emerald-50',
      link: '/earnings',
      delay: '100ms'
    },
    {
      title: 'Bahan Marketing',
      badge: 'Alat Perang',
      icon: <ImageIcon className="w-7 h-7" />,
      description: 'Download ribuan aset promosi HD dan copywriting yang sudah teruji.',
      color: 'from-orange-600 to-amber-400',
      bgLight: 'bg-orange-50',
      link: '/marketing',
      delay: '200ms'
    },
    {
      title: 'Academy Affiliate',
      badge: 'Wajib',
      icon: <GraduationCap className="w-7 h-7" />,
      description: 'Pertajam ilmu pemasaran digital Anda bareng master affiliate kami.',
      color: 'from-red-600 to-rose-400',
      bgLight: 'bg-rose-50',
      link: '/academy',
      delay: '300ms'
    }
  ];

  return (
    <div className="min-h-screen bg-[#F8FAFC]">
      <Sidebar />

      <main className="xl:ml-72 min-h-screen">
        <header className="sticky top-0 z-40 bg-white/80 backdrop-blur-md border-b border-gray-100 px-6 lg:px-10 py-4">
          <div className="flex items-center justify-between gap-4 max-w-full">
            <div className="flex items-center gap-4">
              <button
                onClick={() => navigate(-1)}
                className="flex items-center justify-center w-10 h-10 text-gray-500 hover:text-primary-600 hover:bg-primary-50 rounded-xl transition-all border border-gray-100 bg-white"
              >
                <ArrowLeft className="w-5 h-5" />
              </button>
              <div className="h-8 w-[1px] bg-gray-100 hidden sm:block"></div>
              <h1 className="text-xl font-black text-gray-900 hidden md:block">Dashboard Overview</h1>
            </div>

            <div className="flex items-center gap-3 md:gap-6">
              <div className="hidden lg:flex items-center bg-gray-50 border border-gray-100 rounded-xl px-4 py-2 w-64 focus-within:ring-2 focus-within:ring-primary-100 transition-all">
                <Search className="w-4 h-4 text-gray-400 mr-2" />
                <input type="text" placeholder="Cari fitur..." className="bg-transparent text-sm outline-none w-full font-medium" />
              </div>

              <button className="relative w-10 h-10 flex items-center justify-center bg-gray-50 rounded-xl hover:bg-gray-100 transition-colors">
                <Bell className="w-5 h-5 text-gray-600" />
                <span className="absolute top-2.5 right-2.5 w-2 h-2 bg-red-500 rounded-full border-2 border-white"></span>
              </button>

              <ProfileDropdown />
            </div>
          </div>
        </header>

        <div className="p-6 lg:p-10 space-y-12 max-w-[1600px] mx-auto">
          {/* Welcome Section */}
          <section className="relative overflow-hidden bg-primary-600 rounded-[3rem] p-10 lg:p-16 text-white shadow-2xl shadow-primary-200">
            <div className="relative z-10 space-y-12">
              <div className="grid lg:grid-cols-2 gap-10 items-center">
                <div className="space-y-6">
                  {loading ? (
                    <div className="inline-flex items-center gap-2 px-4 py-2 bg-white/10 backdrop-blur-md rounded-full text-[10px] font-black uppercase tracking-widest border border-white/20 animate-pulse">
                      <Loader2 className="w-3.5 h-3.5 animate-spin text-white" />
                      Sinkronisasi Data...
                    </div>
                  ) : error ? (
                    <div className="inline-flex items-center gap-2 px-4 py-2 bg-red-500 rounded-full text-[10px] font-black uppercase tracking-widest border border-white/20">
                      <AlertCircle className="w-3.5 h-3.5 text-white" />
                      Oops! {error}
                    </div>
                  ) : (
                    <div className="inline-flex items-center gap-2 px-4 py-2 bg-white/10 backdrop-blur-md rounded-full text-[10px] font-black uppercase tracking-widest border border-white/20">
                      <Sparkles className="w-3.5 h-3.5 text-yellow-300" />
                      Data Akurat & Terkini
                    </div>
                  )}
                  <h2 className="text-4xl lg:text-5xl font-black leading-tight">
                    Halo, {displayName.split(' ')[0]}! <br />
                    Siap raih <span className="text-primary-100">komisi besar?</span>
                  </h2>
                  <p className="text-primary-50/80 text-lg font-medium max-w-md">
                    Kelola bisnis affiliate Anda dengan alat profesional dari Lampung Cerdas.
                  </p>
                </div>

                <div className="flex flex-col gap-6 lg:items-end">
                  <div className="flex flex-wrap p-1.5 bg-white/10 backdrop-blur-md rounded-[1.25rem] w-fit border border-white/10 shadow-inner">
                    {[
                      { id: 'hari-ini', label: 'Hari Ini' },
                      { id: 'kemarin', label: 'Kemarin' },
                      { id: '7-hari', label: '7 Hari' },
                      { id: 'custom', label: 'Semua' }
                    ].map((filter) => (
                      <button
                        key={filter.id}
                        onClick={() => setActiveTimeFilter(filter.id as any)}
                        className={`px-5 py-2.5 rounded-xl text-[10px] font-black uppercase tracking-[0.15em] transition-all duration-300 flex items-center gap-2 group ${activeTimeFilter === filter.id ? 'bg-white text-primary-600 shadow-xl scale-105' : 'text-white/70 hover:text-white hover:bg-white/10'}`}
                      >
                        {filter.id === 'custom' && <Calendar className={`w-3.5 h-3.5 ${activeTimeFilter === filter.id ? 'text-primary-500' : 'text-white/40 group-hover:text-white/60'}`} />}
                        {filter.label}
                      </button>
                    ))}
                  </div>

                  <button
                    className="px-8 py-3 bg-white text-primary-600 shadow-xl rounded-2xl text-[10px] font-black uppercase tracking-[0.2em] transition-all flex items-center gap-3 border border-white/50"
                  >
                    <Zap className="w-4 h-4 fill-current" />
                    Status Akun Pro
                  </button>
                </div>
              </div>

              {/* Stats Highlights Grid */}
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6" key={activeTimeFilter}>
                {stats.map((stat, i) => (
                  <div key={i} className={`bg-white/10 backdrop-blur-md p-8 rounded-[2.5rem] border border-white/10 group hover:bg-white/20 transition-all cursor-default relative overflow-hidden ${loading ? 'animate-pulse' : ''}`}>
                    <div className="text-primary-100 text-[10px] font-black uppercase tracking-[0.2em] mb-4 opacity-80 group-hover:opacity-100 transition-opacity">{stat.label}</div>
                    <div className="text-3xl lg:text-4xl font-black tracking-tight leading-none">
                      {loading ? '...' : stat.value}
                    </div>
                    <div className="absolute bottom-0 left-0 w-full h-[3px] bg-gradient-to-r from-transparent via-white/30 to-transparent scale-x-0 group-hover:scale-x-100 transition-transform duration-500"></div>
                  </div>
                ))}
              </div>
            </div>

            <div className="absolute top-0 right-0 w-96 h-96 bg-white opacity-5 rounded-full -translate-y-1/2 translate-x-1/2 blur-[100px]"></div>
            <div className="absolute bottom-0 left-0 w-64 h-64 bg-black opacity-10 rounded-full translate-y-1/2 -translate-x-1/2 blur-[80px]"></div>
          </section>

          {/* Quick Menu Grid */}
          <section className="space-y-8">
            <div className="flex items-center justify-between px-2">
              <div className="space-y-1">
                <h3 className="text-2xl font-black text-gray-900 tracking-tight">Eksplorasi Fitur Utama</h3>
                <p className="text-sm font-medium text-gray-400">Pilih alat bantu navigasi bisnis Anda hari ini</p>
              </div>
              <a href="#" className="hidden sm:flex items-center gap-2 text-[10px] font-black uppercase tracking-widest text-primary-600 hover:text-primary-700 transition-colors bg-primary-50 px-5 py-2.5 rounded-xl border border-primary-100 group">
                Tutorial Dashboard <ChevronRight className="w-3.5 h-3.5 group-hover:translate-x-1 transition-transform" />
              </a>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-4 gap-6">
              {menuItems.map((item, idx) => (
                <Link
                  key={idx}
                  to={item.link}
                  style={{ animationDelay: item.delay }}
                  className="group relative bg-white p-10 rounded-[2.5rem] border border-gray-100 shadow-sm hover:shadow-2xl hover:shadow-gray-200/50 hover:-translate-y-2 transition-all duration-500 overflow-hidden flex flex-col items-start text-left"
                >
                  <div className={`absolute top-0 right-0 w-32 h-32 bg-gradient-to-br ${item.color} opacity-0 group-hover:opacity-[0.03] transition-opacity rounded-full -translate-y-1/2 translate-x-1/2`}></div>

                  <div className={`mb-8 px-4 py-2 ${item.bgLight} rounded-full text-[9px] font-black uppercase tracking-widest text-gray-500 border border-gray-100 flex items-center gap-2`}>
                    <div className={`w-1.5 h-1.5 rounded-full bg-gradient-to-r ${item.color} animate-pulse`}></div>
                    {item.badge}
                  </div>

                  <div className={`w-16 h-16 bg-gradient-to-br ${item.color} rounded-2xl flex items-center justify-center text-white mb-10 group-hover:scale-110 group-hover:rotate-6 transition-all duration-500 shadow-xl shadow-primary-200/20`}>
                    {item.icon}
                  </div>

                  <div className="space-y-4 flex-1">
                    <h4 className="text-xl font-black text-gray-900 group-hover:text-primary-600 transition-colors">
                      {item.title}
                    </h4>
                    <p className="text-sm text-gray-500 font-medium leading-relaxed">
                      {item.description}
                    </p>
                  </div>

                  <div className="mt-10 flex items-center gap-2 text-[10px] font-black uppercase tracking-[0.2em] text-primary-600 group-hover:gap-3 transition-all">
                    <span>Akses Fitur</span>
                    <ArrowRight className="w-4 h-4" />
                  </div>
                </Link>
              ))}
            </div>
          </section>

          {/* Rewards & Rank Section */}
          <div className="grid lg:grid-cols-3 gap-8">
            <div className="lg:col-span-2 bg-white rounded-[2.5rem] p-10 lg:p-14 border border-gray-100 shadow-sm flex flex-col">
              <div className="flex items-center justify-between mb-10">
                <div>
                  <h3 className="text-2xl font-black text-gray-900">Program Hadiah Affiliate</h3>
                  <p className="text-gray-500 text-sm font-medium mt-1">Kejar target dan dapatkan bonus fantastis!</p>
                </div>
                <div className="w-14 h-14 bg-yellow-50 rounded-2xl flex items-center justify-center text-yellow-600 border border-yellow-100">
                  <Award className="w-8 h-8" />
                </div>
              </div>

              <div className="space-y-10 flex-1 flex flex-col justify-center">
                {[
                  { label: 'Target Penjualan Maret', current: 75, target: '100 Project', color: 'from-primary-600 to-primary-400' },
                  { label: 'Komisi Bulanan', current: 40, target: 'Rp 20.000.000', color: 'from-emerald-600 to-emerald-400' }
                ].map((stat, i) => (
                  <div key={i} className="space-y-4">
                    <div className="flex justify-between items-end">
                      <span className="text-sm font-black text-gray-700 uppercase tracking-widest">{stat.label}</span>
                      <div className="text-right">
                        <span className="text-xl font-black text-primary-600">{stat.current}%</span>
                        <span className="text-[10px] text-gray-400 font-black uppercase tracking-widest ml-2">Selesai</span>
                      </div>
                    </div>
                    <div className="h-5 bg-gray-50 rounded-full overflow-hidden p-1 border border-gray-100 shadow-inner">
                      <div className={`h-full bg-gradient-to-r ${stat.color} rounded-full transition-all duration-1000 shadow-sm shadow-primary-200`} style={{ width: `${stat.current}%` }}></div>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            <div className="bg-gradient-to-br from-gray-900 to-gray-800 rounded-[2.5rem] p-10 lg:p-14 text-white flex flex-col justify-between shadow-2xl relative overflow-hidden group min-h-[450px]">
              <div className="relative z-10">
                <div className="w-16 h-16 bg-white/10 backdrop-blur-md rounded-2xl flex items-center justify-center text-primary-400 mb-10 border border-white/10">
                  <Users className="w-9 h-9" />
                </div>
                <h3 className="text-3xl font-black mb-6 leading-tight">Webinar <br />Eksklusif</h3>
                <p className="text-gray-400 font-medium leading-relaxed text-lg">
                  Pelajari strategi 100 juta pertama dari Top Affiliate Lampung Cerdas besok jam 19:00 WIB.
                </p>
              </div>
              <button className="relative z-10 flex items-center justify-center gap-3 bg-primary-600 py-5 rounded-2xl font-black hover:bg-primary-700 transition-all hover:scale-[1.02] active:scale-[0.98] group mt-10">
                Daftar Webinar
                <ExternalLink className="w-4 h-4 group-hover:scale-110 transition-transform" />
              </button>
              <div className="absolute bottom-0 right-0 w-64 h-64 opacity-[0.05] -translate-x-10 translate-y-10 group-hover:translate-x-0 group-hover:translate-y-0 transition-transform duration-700">
                <svg width="250" height="250" viewBox="0 0 100 100" fill="none">
                  <circle cx="50" cy="50" r="40" stroke="white" strokeWidth="15" strokeDasharray="30 10" />
                </svg>
              </div>
            </div>
          </div>
        </div>

        <footer className="p-12 border-t border-gray-100 text-center bg-white/50">
          <p className="text-[10px] text-gray-400 font-black uppercase tracking-[0.3em] leading-relaxed">
            &copy; 2026 Lampung Cerdas. Semua hak dilindungi secara hukum. <br />
            <span className="text-primary-500/50">Affiliate Management System v2.6.0</span>
          </p>
        </footer>
      </main>

      <FloatingActionMenu />
    </div>
  );
}
