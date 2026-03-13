
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
  Info
} from 'lucide-react';
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Button from '../components/Button';
import FloatingActionMenu from '../components/FloatingActionMenu';

export default function EarningsPage() {
  const navigate = useNavigate();
  const [activeFilter, setActiveFilter] = useState<'semua' | 'tertunda' | 'terkirim' | 'batal'>('semua');

  const transactions = [
    { id: 1, type: 'Komisi Penjualan', amount: 'Rp 150.000', status: 'terkirim', date: '12 Mar 2026', product: 'Kursus CPNS' },
    { id: 2, type: 'Komisi Penjualan', amount: 'Rp 35.000', status: 'tertunda', date: '11 Mar 2026', product: 'Buku Strategi' },
    { id: 3, type: 'Komisi Penjualan', amount: 'Rp 40.000', status: 'batal', date: '10 Mar 2026', product: 'E-Book Maba' },
    { id: 4, type: 'Komisi Penjualan', amount: 'Rp 150.000', status: 'terkirim', date: '09 Mar 2026', product: 'Kursus CPNS' },
  ];

  const filteredTransactions = activeFilter === 'semua' 
    ? transactions 
    : transactions.filter(t => t.status === activeFilter);

  const getStatusStyle = (status: string) => {
    switch(status) {
      case 'terkirim': return 'bg-emerald-50 text-emerald-600 border-emerald-100';
      case 'tertunda': return 'bg-amber-50 text-amber-600 border-amber-100';
      case 'batal': return 'bg-red-50 text-red-600 border-red-100';
      default: return 'bg-gray-50 text-gray-600 border-gray-100';
    }
  };

  const getStatusIcon = (status: string) => {
    switch(status) {
      case 'terkirim': return <CheckCircle2 className="w-4 h-4" />;
      case 'tertunda': return <Clock className="w-4 h-4" />;
      case 'batal': return <XCircle className="w-4 h-4" />;
      default: return null;
    }
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
              <h1 className="text-xl font-black text-gray-900 leading-none">Cek Pendapatan</h1>
              <p className="text-[10px] uppercase tracking-widest font-black text-gray-400 mt-1">Keuangan Affiliate</p>
            </div>
          </div>
          <button className="flex items-center gap-2 px-4 py-2 bg-gray-50 text-gray-500 rounded-xl text-xs font-black uppercase tracking-widest border border-gray-100 hover:bg-gray-100 transition-colors">
            <CreditCard className="w-4 h-4" />
            Metode Pembayaran
          </button>
        </div>
      </header>

      <main className="max-w-7xl mx-auto p-6 lg:p-10 space-y-10">
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

          {/* Background Decoration */}
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
                  <h3 className="text-2xl font-black text-gray-900 tracking-tight">Riwayat Komisi</h3>
                  <div className="flex items-center gap-2 mt-1">
                    <span className="flex items-center gap-1 text-[10px] font-black uppercase tracking-widest text-gray-400">
                      <Info className="w-3 h-3 text-primary-400" /> Keterangan Status:
                    </span>
                  </div>
               </div>
            </div>

            {/* Filter Buttons (Keterangan) */}
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
      </main>

      {/* Info Footer */}
      <footer className="max-w-7xl mx-auto px-6 lg:px-10 pb-20">
         <div className="bg-blue-600 rounded-[2.5rem] p-10 text-white flex flex-wrap items-center justify-between gap-8 relative overflow-hidden">
            <div className="relative z-10">
               <h4 className="text-xl font-black mb-1">Butuh Bantuan Keuangan?</h4>
               <p className="text-blue-50/80 font-medium">Hubungi tim admin untuk pertanyaan seputar pencairan komisi.</p>
            </div>
            <Button className="relative z-10 bg-white text-blue-600 border-white hover:bg-blue-50 font-black px-8 py-4 text-sm shadow-2xl">
              Hubungi Helpdesk
            </Button>
            <div className="absolute top-0 left-0 w-64 h-64 bg-white/10 rounded-full blur-[80px] -translate-x-1/2 -translate-y-1/2"></div>
         </div>
      </footer>
      <FloatingActionMenu />
    </div>
  );
}
