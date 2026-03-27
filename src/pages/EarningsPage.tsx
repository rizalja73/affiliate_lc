import {
  ArrowLeft,
  Wallet,
  ArrowUpRight,
  Clock,
  CheckCircle2,
  XCircle,
  ChevronRight,
  TrendingUp,
  CreditCard,
  History,
  Info,
  Headphones,
  ShoppingBag,
  Users,
  RefreshCw,
  Calendar,
  Download,
  Filter,
  Loader2,
  AlertCircle,
  MousePointer2,
  UserPlus,
  BarChart3
} from 'lucide-react';
import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { supabase } from '../lib/supabase';
import { useAuth } from '../hooks/useAuth';
import Button from '../components/Button';
import FloatingActionMenu from '../components/FloatingActionMenu';
import ProfileDropdown from '../components/ProfileDropdown';
import Sidebar from '../components/Sidebar';

export default function EarningsPage() {
  const navigate = useNavigate();
  const { user } = useAuth();

  // Tabs State
  const [activeTab, setActiveTab] = useState<'pendapatan' | 'penjualan'>('pendapatan');

  // Earnings Page Local State
  const [activeFilter, setActiveFilter] = useState<'semua' | 'tertunda' | 'terkirim' | 'batal'>('semua');
  const [isCalling, setIsCalling] = useState(false);

  // Sales Data Local State
  const [activeSalesView, setActiveSalesView] = useState<'produk' | 'audiens'>('produk');
  const [orders, setOrders] = useState<any[]>([]);
  const [loadingSales, setLoadingSales] = useState(false);
  const [salesError, setSalesError] = useState<string | null>(null);
  const [salesStats, setSalesStats] = useState({
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

  const transactions = [
    { id: 1, type: 'Komisi Penjualan', amount: 'Rp 150.000', status: 'terkirim', date: '12 Mar 2026', product: 'Kursus CPNS' },
    { id: 2, type: 'Komisi Penjualan', amount: 'Rp 35.000', status: 'tertunda', date: '11 Mar 2026', product: 'Buku Strategi' },
    { id: 3, type: 'Komisi Penjualan', amount: 'Rp 40.000', status: 'batal', date: '10 Mar 2026', product: 'E-Book Maba' },
    { id: 4, type: 'Komisi Penjualan', amount: 'Rp 150.000', status: 'terkirim', date: '09 Mar 2026', product: 'Kursus CPNS' },
  ];

  const filteredTransactions = activeFilter === 'semua'
    ? transactions
    : transactions.filter(t => t.status === activeFilter);

  // Fetch Sales Data Logic (Integrated)
  useEffect(() => {
    if (activeTab === 'penjualan' && user) {
      const fetchSalesData = async () => {
        try {
          setLoadingSales(true);

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
              'x-api-key': import.meta.env.VITE_PRODUCTS_API_KEY,
              'Content-Type': 'application/json'
            }
          });

          const result = await response.json();

          if (result.success) {
            const rawOrders = result.data?.data || result.data || [];
            const formatted = rawOrders.map((o: any) => {
              const rawPriceStr = (o.total_harga || o.harga || '0').toString();
              const price = parseInt(rawPriceStr.replace(/[^0-9]/g, ''), 10) || 0;
              const isSuccess = o.status === 'success' || o.status === 'completed' || o.status === 'Lunas';
              const commission = isSuccess ? Math.round(price * 0.12) : 0;

              return {
                id: o.id || Math.random(),
                name: o.produk?.nama || o.nama_produk || 'Program LC',
                qty: o.qty || 1,
                date: o.created_at ? new Date(o.created_at).toLocaleDateString('id-ID', { day: 'numeric', month: 'short', year: 'numeric' }) : '-',
                status: o.status || 'pending',
                komisi: commission
              };
            });

            setOrders(formatted);

            const totalQty = formatted.reduce((acc: number, curr: any) => acc + curr.qty, 0);
            const paidOrders = formatted.filter((o: any) => o.status === 'success' || o.status === 'completed' || o.status === 'Lunas');

            setSalesStats({
              totalSold: totalQty,
              lastUpdate: formatted.length > 0 ? formatted[0].date : 'Belum ada data',
              returns: 0
            });

            setAudienceData({
              clicks: (formatted.length * 15).toLocaleString(),
              registrations: formatted.length.toLocaleString(),
              paid: paidOrders.length.toLocaleString(),
              conversionRate: formatted.length > 0 ? `${((paidOrders.length / (formatted.length * 15)) * 100).toFixed(1)}%` : '0%'
            });
          } else {
            setSalesError('Gagal memuat data dari pusat.');
          }
        } catch (err: any) {
          console.error('Sales fetch error:', err);
          setSalesError('Terjadi kesalahan koneksi.');
        } finally {
          setLoadingSales(false);
        }
      };
      fetchSalesData();
    }
  }, [activeTab, user]);

  const getStatusStyle = (status: string) => {
    switch (status) {
      case 'terkirim': return 'bg-emerald-50 text-emerald-600 border-emerald-100';
      case 'tertunda': return 'bg-amber-50 text-amber-600 border-amber-100';
      case 'batal': return 'bg-red-50 text-red-600 border-red-100';
      default: return 'bg-gray-50 text-gray-600 border-gray-100';
    }
  };

  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'terkirim': return <CheckCircle2 className="w-4 h-4" />;
      case 'tertunda': return <Clock className="w-4 h-4" />;
      case 'batal': return <XCircle className="w-4 h-4" />;
      default: return null;
    }
  };

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
      <div className="xl:ml-72 min-h-screen flex flex-col">
        {/* Header */}
        <header className="sticky top-0 z-50 bg-white/80 backdrop-blur-md border-b border-gray-100 px-6 lg:px-10 py-4">
          <div className="max-w-7xl mx-auto flex items-center justify-between gap-6">
            <div className="flex items-center gap-4">
              <button
                onClick={() => navigate('/dashboard')}
                className="flex items-center justify-center w-10 h-10 text-gray-400 hover:text-primary-600 hover:bg-primary-50 rounded-xl transition-all border border-gray-100 bg-white"
              >
                <ArrowLeft className="w-5 h-5" />
              </button>
              <div className="flex flex-col">
                <h1 className="text-xl font-black text-gray-900 leading-none">Keuangan & Penjualan</h1>
                <div className="flex items-center gap-4 mt-2">
                  <button
                    onClick={() => setActiveTab('pendapatan')}
                    className={`text-[10px] font-black uppercase tracking-widest transition-all ${activeTab === 'pendapatan' ? 'text-primary-600 border-b-2 border-primary-600 pb-1' : 'text-gray-400 hover:text-gray-600'}`}
                  >
                    Cek Pendapatan
                  </button>
                  <button
                    onClick={() => setActiveTab('penjualan')}
                    className={`text-[10px] font-black uppercase tracking-widest transition-all ${activeTab === 'penjualan' ? 'text-primary-600 border-b-2 border-primary-600 pb-1' : 'text-gray-400 hover:text-gray-600'}`}
                  >
                    Data Penjualan
                  </button>
                </div>
              </div>
            </div>

            <div className="hidden md:flex items-center gap-3">
              <button className="flex items-center gap-2 px-4 py-2 bg-gray-50 text-gray-500 rounded-xl text-[10px] font-black uppercase tracking-widest border border-gray-100 hover:bg-gray-100 transition-colors">
                <CreditCard className="w-4 h-4" />
                Metode Pembayaran
              </button>
              <ProfileDropdown />
            </div>
            <div className="md:hidden">
              <ProfileDropdown />
            </div>
          </div>
        </header>

        <main className="max-w-7xl mx-auto p-6 lg:p-10 space-y-10 w-full animate-fade-in" key={activeTab}>
          {activeTab === 'pendapatan' ? (
            <>
              {/* Balance Section */}
              <section className="relative overflow-hidden bg-gradient-to-br from-emerald-600 to-emerald-800 rounded-[3rem] p-10 lg:p-14 text-white shadow-2xl shadow-emerald-200">
                <div className="relative z-10 flex flex-col md:flex-row md:items-center justify-between gap-10">
                  <div className="space-y-4">
                    <div className="inline-flex items-center gap-2 px-4 py-2 bg-white/10 backdrop-blur-md rounded-full text-xs font-black uppercase tracking-widest border border-white/20">
                      <Wallet className="w-3.5 h-3.5" />
                      Saldo Tersedia
                    </div>
                    <div className="text-5xl lg:text-7xl font-black tracking-tight">
                      Rp 2.450.000
                    </div>
                    <p className="text-emerald-100/70 font-medium flex items-center gap-2">
                      <TrendingUp className="w-4 h-4" />
                      Naik Rp 450.000 dari minggu lalu
                    </p>
                  </div>

                  <div className="flex flex-col gap-4">
                    <Button size="xl" variant="white" className="text-emerald-700 border-none px-12 py-6 rounded-[2rem] shadow-2xl shadow-emerald-900/20 font-black text-lg group">
                      Tarik Saldo
                      <ArrowUpRight className="ml-2 w-6 h-6 group-hover:translate-x-1 group-hover:-translate-y-1 transition-transform" />
                    </Button>
                    <p className="text-[10px] text-center text-emerald-100 font-bold uppercase tracking-[0.2em] opacity-60">Minimal penarikan Rp 100.000</p>
                  </div>
                </div>
                <div className="absolute top-0 right-0 w-96 h-96 bg-white opacity-10 rounded-full -translate-y-1/2 translate-x-1/2 blur-3xl"></div>
                <div className="absolute bottom-0 left-0 w-64 h-64 bg-black opacity-10 rounded-full translate-y-1/2 -translate-x-1/2 blur-3xl"></div>
              </section>

              {/* Transaction Legend/Filter Section */}
              <section className="space-y-6">
                <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-6 px-4">
                  <div className="flex items-center gap-3">
                    <div className="w-12 h-12 bg-primary-50 rounded-2xl flex items-center justify-center text-primary-600 shadow-sm border border-primary-100">
                      <History className="w-6 h-6" />
                    </div>
                    <div>
                      <h3 className="text-2xl font-black text-gray-900 tracking-tight">Riwayat Penghasilan</h3>
                      <div className="flex items-center gap-2 mt-1">
                        <span className="flex items-center gap-1 text-[10px] font-black uppercase tracking-widest text-gray-400">
                          <Info className="w-3 h-3 text-primary-400" /> Keterangan Status:
                        </span>
                      </div>
                    </div>
                  </div>

                  <div className="flex flex-wrap p-1.5 bg-gray-100 rounded-2xl w-fit border border-gray-200">
                    {[
                      { id: 'semua', label: 'Semua' },
                      { id: 'tertunda', label: 'Tertunda' },
                      { id: 'terkirim', label: 'Terkirim' },
                      { id: 'batal', label: 'Batal' }
                    ].map((f) => (
                      <button
                        key={f.id}
                        onClick={() => setActiveFilter(f.id as any)}
                        className={`px-5 py-2.5 rounded-xl text-[10px] font-black uppercase tracking-widest transition-all ${activeFilter === f.id ? 'bg-white text-primary-600 shadow-md scale-105' : 'text-gray-400 hover:text-gray-600'}`}
                      >
                        {f.label}
                      </button>
                    ))}
                  </div>
                </div>

                {/* Transaction List */}
                <div className="bg-white rounded-[3rem] border border-gray-100 shadow-sm overflow-hidden">
                  <div className="overflow-x-auto">
                    <table className="w-full text-left">
                      <thead>
                        <tr className="bg-gray-50/50">
                          <th className="px-10 py-5 text-[10px] font-black text-gray-400 uppercase tracking-widest">Detail Transaksi</th>
                          <th className="px-6 py-5 text-[10px] font-black text-gray-400 uppercase tracking-widest text-center">Tanggal</th>
                          <th className="px-6 py-5 text-[10px] font-black text-gray-400 uppercase tracking-widest">Status</th>
                          <th className="px-10 py-5 text-[10px] font-black text-right text-gray-400 uppercase tracking-widest">Jumlah</th>
                        </tr>
                      </thead>
                      <tbody className="divide-y divide-gray-50">
                        {filteredTransactions.map((t) => (
                          <tr key={t.id} className="hover:bg-gray-50/30 transition-colors group">
                            <td className="px-10 py-8">
                              <div className="flex items-center gap-4">
                                <div className={`w-12 h-12 rounded-xl flex items-center justify-center ${getStatusStyle(t.status)}`}>
                                  {getStatusIcon(t.status)}
                                </div>
                                <div>
                                  <div className="font-black text-gray-900 group-hover:text-primary-600 transition-colors">{t.type}</div>
                                  <div className="text-xs font-bold text-gray-400 mt-0.5">{t.product}</div>
                                </div>
                              </div>
                            </td>
                            <td className="px-6 py-8 text-center text-sm font-bold text-gray-500 italic">
                              {t.date}
                            </td>
                            <td className="px-6 py-8">
                              <span className={`inline-flex items-center gap-1.5 px-3 py-1 rounded-lg border text-[10px] font-black uppercase tracking-widest ${getStatusStyle(t.status)}`}>
                                {t.status}
                              </span>
                            </td>
                            <td className="px-10 py-8 text-right">
                              <div className="text-lg font-black text-gray-900 tracking-tight">{t.amount}</div>
                              <button className="text-[10px] font-black text-primary-600 hover:underline mt-1 flex items-center gap-1 ml-auto">
                                Detail <ChevronRight className="w-3 h-3" />
                              </button>
                            </td>
                          </tr>
                        ))}
                        {filteredTransactions.length === 0 && (
                          <tr>
                            <td colSpan={4} className="px-10 py-20 text-center">
                              <div className="flex flex-col items-center gap-4">
                                <History className="w-12 h-12 text-gray-200" />
                                <p className="text-gray-400 font-bold italic">Tidak ada transaksi ditemukan.</p>
                              </div>
                            </td>
                          </tr>
                        )}
                      </tbody>
                    </table>
                  </div>
                </div>
              </section>

              {/* Info Footer */}
              <footer className="pb-10">
                <div className="bg-blue-600 rounded-[2.5rem] p-10 text-white flex flex-wrap items-center justify-between gap-8 relative overflow-hidden">
                  <div className="relative z-10">
                    <h4 className="text-xl font-black mb-1">Butuh Bantuan Keuangan?</h4>
                    <p className="text-blue-50/80 font-medium">Hubungi tim admin untuk pertanyaan seputar pencairan komisi.</p>
                  </div>
                  <button
                    onClick={() => {
                      setIsCalling(true);
                      setTimeout(() => setIsCalling(false), 3000);
                    }}
                    className={`relative z-10 font-black px-8 py-4 text-sm rounded-full shadow-2xl overflow-hidden transition-all duration-700 ease-out transform hover:-translate-y-1 active:scale-95 cursor-pointer ${isCalling
                      ? 'bg-gradient-to-r from-blue-300 to-cyan-300 text-blue-950 scale-105 shadow-[0_0_50px_rgba(56,189,248,0.6)] border border-blue-200'
                      : 'bg-white text-blue-600 hover:bg-blue-50 border border-white/20'
                      }`}
                  >
                    <div className="relative flex items-center justify-center min-w-[180px] h-6">
                      <span className={`absolute flex items-center justify-center gap-2 transition-all duration-500 ${isCalling ? 'opacity-0 translate-y-8 scale-75 blur-sm' : 'opacity-100 translate-y-0 scale-100 blur-0'
                        }`}>
                        Hubungi Helpdesk
                      </span>
                      <span className={`absolute flex items-center justify-center gap-2 transition-all duration-500 delay-100 ${isCalling ? 'opacity-100 translate-y-0 scale-100 blur-0' : 'opacity-0 -translate-y-8 scale-125 blur-sm'
                        }`}>
                        <Headphones className="w-5 h-5 animate-pulse text-blue-900" />
                        Menghubungkan...
                      </span>
                    </div>
                  </button>
                  <div className="absolute top-0 left-0 w-64 h-64 bg-white/10 rounded-full blur-[80px] -translate-x-1/2 -translate-y-1/2"></div>
                </div>
              </footer>
            </>
          ) : (
            <div className="space-y-10">
              {/* Sales View Selector inside Penjualan tab */}
              <div className="flex p-1.5 bg-gray-100 rounded-2xl w-fit border border-gray-200">
                <button
                  onClick={() => setActiveSalesView('produk')}
                  className={`px-8 py-2.5 rounded-xl text-xs font-black uppercase tracking-widest transition-all flex items-center gap-2 ${activeSalesView === 'produk' ? 'bg-white text-primary-600 shadow-md' : 'text-gray-500 hover:bg-gray-200'}`}
                >
                  <ShoppingBag className="w-4 h-4" />
                  Produk
                </button>
                <button
                  onClick={() => setActiveSalesView('audiens')}
                  className={`px-8 py-2.5 rounded-xl text-xs font-black uppercase tracking-widest transition-all flex items-center gap-2 ${activeSalesView === 'audiens' ? 'bg-white text-primary-600 shadow-md' : 'text-gray-500 hover:bg-gray-200'}`}
                >
                  <Users className="w-4 h-4" />
                  Audiens
                </button>
              </div>

              {loadingSales ? (
                <div className="flex flex-col items-center justify-center h-[50vh] space-y-4">
                  <Loader2 className="w-12 h-12 text-primary-600 animate-spin" />
                  <p className="font-black text-gray-400 uppercase tracking-widest">Sinkronisasi Data...</p>
                </div>
              ) : salesError ? (
                <div className="bg-red-50 p-12 rounded-[3.5rem] border border-red-100 text-center space-y-4">
                  <AlertCircle className="w-16 h-16 text-red-600 mx-auto" />
                  <h3 className="text-xl font-black text-red-900">Koneksi Gagal</h3>
                  <p className="text-red-700 font-medium">{salesError}</p>
                  <Button variant="outline" onClick={() => setActiveTab('penjualan')}>Coba Lagi</Button>
                </div>
              ) : activeSalesView === 'produk' ? (
                <div className="space-y-10">
                  <div className="grid lg:grid-cols-3 gap-8">
                    <div className="bg-white p-8 rounded-[2.5rem] border border-gray-100 shadow-sm flex items-center gap-6">
                      <div className="w-16 h-16 bg-blue-50 rounded-2xl flex items-center justify-center text-blue-600">
                        <ShoppingBag className="w-8 h-8" />
                      </div>
                      <div>
                        <div className="text-xs font-black text-gray-400 uppercase tracking-widest mb-1">Total Terjual</div>
                        <div className="text-3xl font-black text-gray-900">{salesStats.totalSold} <span className="text-sm text-gray-400 font-bold ml-1">Order</span></div>
                      </div>
                    </div>
                    <div className="bg-white p-8 rounded-[2.5rem] border border-gray-100 shadow-sm flex items-center gap-6">
                      <div className="w-16 h-16 bg-purple-50 rounded-2xl flex items-center justify-center text-purple-600">
                        <Calendar className="w-8 h-8" />
                      </div>
                      <div>
                        <div className="text-xs font-black text-gray-400 uppercase tracking-widest mb-1">Update Terakhir</div>
                        <div className="text-lg font-black text-gray-900">{salesStats.lastUpdate}</div>
                      </div>
                    </div>
                    <div className="bg-white p-8 rounded-[2.5rem] border border-gray-100 shadow-sm flex items-center gap-6">
                      <div className="w-16 h-16 bg-red-50 rounded-2xl flex items-center justify-center text-red-600">
                        <RefreshCw className="w-8 h-8" />
                      </div>
                      <div>
                        <div className="text-xs font-black text-gray-400 uppercase tracking-widest mb-1">Status Issue</div>
                        <div className="text-3xl font-black text-gray-900">{salesStats.returns} <span className="text-sm text-gray-400 font-bold ml-1">Kasus</span></div>
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
                            <th className="px-10 py-5 text-[10px] font-black text-right text-gray-400 uppercase tracking-widest">Komisi</th>
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
                              <td className="px-10 py-8 text-right font-black text-lg">
                                <span className="text-primary-600">{formatCurrency(o.komisi)}</span>
                              </td>
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
                <div className="space-y-10">
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
                        <h3 className="text-2xl font-black text-gray-900">Analisis Funnel</h3>
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
            </div>
          )}
        </main>

        <FloatingActionMenu />
      </div>
    </div>
  );
}
