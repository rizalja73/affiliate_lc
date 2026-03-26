import { 
  ArrowLeft, 
  Search, 
  Settings2, 
  Filter, 
  ExternalLink, 
  Tag, 
  ArrowRight,
  Sparkles,
  Layers,
  CheckCircle2,
  PackageCheck,
  AlertTriangle
} from 'lucide-react';
import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import Button from '../components/Button';
import FloatingActionMenu from '../components/FloatingActionMenu';
import Sidebar from '../components/Sidebar';
import ProfileDropdown from '../components/ProfileDropdown';

export default function ProductsPage() {
  const navigate = useNavigate();
  const [activeTab, setActiveTab] = useState<'temukan' | 'kelola'>('temukan');
  const [isUpgrading, setIsUpgrading] = useState(false);
  const [products, setProducts] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        setLoading(true);
        const response = await fetch('https://lampungcerdas.com/api/produks', {
          method: 'GET',
          headers: {
            'x-api-key': 'lc-api-key-2026',
            'Content-Type': 'application/json'
          }
        });
        
        const result = await response.json();
        
        if (result.success && result.data) {
          // Normalize data structure if needed
          const normalized = (result.data.data || result.data).map((item: any) => ({
            id: item.id,
            name: item.nama,
            category: item.kategori?.nama || item.kategori || 'Digital Course',
            price: item.harga_jual,
            commission: item.komisi,
            image: item.gambar_url || (item.galeri_urls && item.galeri_urls.length > 0 ? item.galeri_urls[0] : 'https://images.unsplash.com/photo-1516321318423-f06f85e504b3?w=800&auto=format&fit=crop&q=60'),
            salesCount: item.jumlah_pembeli ? `${item.jumlah_pembeli} Terjual` : 'Baru Rilis',
            link: `https://lampungcerdas.com/produk/${item.slug || item.id}`
          }));
          setProducts(normalized);
        } else {
          throw new Error('Gagal memuat data produk');
        }
      } catch (err: any) {
        console.error('Fetch error:', err);
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchProducts();
  }, []);

  const formatCurrency = (val: any) => {
    if (typeof val === 'string' && val.includes('Rp')) return val;
    const num = typeof val === 'number' ? val : parseInt(val) || 0;
    return new Intl.NumberFormat('id-ID', {
      style: 'currency',
      currency: 'IDR',
      minimumFractionDigits: 0
    }).format(num);
  };

  return (
    <div className="min-h-screen bg-[#F8FAFC]">
      <Sidebar />
      
      {/* Main Content Area */}
      <div className="xl:ml-72 min-h-screen flex flex-col">
        {/* Top Navigation Bar */}
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
              <h1 className="text-xl font-black text-gray-900 leading-none">Cek Produk</h1>
              <p className="text-[10px] uppercase tracking-widest font-black text-gray-400 mt-1">Katalog Affiliate</p>
            </div>
          </div>

          {/* Segmented Control Tabs */}
          <div className="flex p-1.5 bg-gray-100 rounded-2xl w-fit border border-gray-200">
            <button 
              onClick={() => setActiveTab('temukan')}
              className={`px-8 py-2.5 rounded-xl text-sm font-black transition-all flex items-center gap-2 ${activeTab === 'temukan' ? 'bg-white text-primary-600 shadow-md' : 'text-gray-500 hover:bg-gray-200'}`}
            >
              <Search className="w-4 h-4" />
              Temukan
            </button>
            <button 
              onClick={() => setActiveTab('kelola')}
              className={`px-8 py-2.5 rounded-xl text-sm font-black transition-all flex items-center gap-2 ${activeTab === 'kelola' ? 'bg-white text-primary-600 shadow-md' : 'text-gray-500 hover:bg-gray-200'}`}
            >
              <Settings2 className="w-4 h-4" />
              Kelola
            </button>
          </div>

          <div className="hidden lg:flex items-center gap-3">
             <div className="relative">
                <Filter className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
                <select className="pl-10 pr-6 py-2.5 bg-gray-50 border border-gray-100 rounded-xl text-sm font-bold text-gray-600 appearance-none focus:bg-white focus:ring-2 focus:ring-primary-100 outline-none cursor-pointer">
                  <option>Semua Kategori</option>
                  <option>Digital Course</option>
                  <option>Buku Fisik</option>
                  <option>E-Book</option>
                </select>
             </div>
             <ProfileDropdown />
          </div>
        </div>
      </header>

      <main className="max-w-7xl mx-auto p-6 lg:p-10">
        {activeTab === 'temukan' ? (
          <div className="space-y-10 animate-fade-in">
            {/* Search and Promotion Header */}
            <div className="relative overflow-hidden bg-gradient-to-br from-gray-900 to-primary-900 rounded-[3rem] p-10 lg:p-16 text-white shadow-2xl">
              <div className="relative z-10 max-w-2xl space-y-6">
                <div className="inline-flex items-center gap-2 px-4 py-2 bg-white/10 backdrop-blur-md rounded-full text-xs font-black uppercase tracking-widest border border-white/20">
                  <Sparkles className="w-3.5 h-3.5 text-yellow-400" />
                  Produk Baru Tersedia
                </div>
                <h2 className="text-4xl lg:text-5xl font-black leading-tight">
                  Ayo Temukan <br />
                  <span className="text-primary-400">Peluang Emas!</span>
                </h2>
                <div className="relative group max-w-md">
                   <Search className="absolute left-5 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400 group-focus-within:text-primary-400" />
                   <input 
                    type="text" 
                    placeholder="Cari kursus, buku, atau modul..."
                    className="w-full pl-14 pr-6 py-5 bg-white/10 backdrop-blur-xl border-2 border-white/10 rounded-2xl focus:bg-white focus:text-gray-900 focus:border-white transition-all outline-none text-white font-medium placeholder:text-white/40 shadow-2xl"
                   />
                </div>
              </div>
              <div className="absolute top-0 right-0 w-96 h-96 bg-primary-500/20 rounded-full blur-[100px] -translate-y-1/2 translate-x-1/2"></div>
              <div className="absolute bottom-0 left-0 w-64 h-64 bg-primary-600/20 rounded-full blur-[80px] translate-y-1/2 -translate-x-1/2"></div>
            </div>

            {/* Product Grid */}
            <div className="grid md:grid-cols-2 lg:grid-cols-2 gap-10 max-w-6xl mx-auto">
              {loading ? (
                // Skeleton Loading
                [1, 2, 3, 4, 5, 6].map((i) => (
                  <div key={i} className="bg-white rounded-[2.5rem] overflow-hidden border border-gray-100 shadow-sm animate-pulse h-[500px]">
                    <div className="h-64 bg-gray-100" />
                    <div className="p-8 space-y-6">
                       <div className="h-8 bg-gray-100 rounded-xl w-3/4" />
                       <div className="h-4 bg-gray-50 rounded-lg w-1/2" />
                       <div className="grid grid-cols-2 gap-4">
                          <div className="h-16 bg-gray-50 rounded-2xl" />
                          <div className="h-16 bg-gray-50 rounded-2xl" />
                       </div>
                       <div className="h-14 bg-gray-100 rounded-full" />
                    </div>
                  </div>
                ))
              ) : error ? (
                <div className="col-span-full py-20 text-center space-y-4">
                   <div className="w-20 h-20 bg-red-50 text-red-500 rounded-full flex items-center justify-center mx-auto">
                      <AlertTriangle className="w-10 h-10" />
                   </div>
                   <h3 className="text-xl font-black text-gray-900">Oops! Gagal Memuat Produk</h3>
                   <p className="text-gray-500 font-medium">Terjadi kesalahan: {error}</p>
                   <Button variant="outline" onClick={() => window.location.reload()}>Coba Lagi</Button>
                </div>
              ) : (
                products.map((product) => (
                  <div key={product.id} className="group bg-white rounded-[2.5rem] overflow-hidden border border-gray-100 shadow-sm hover:shadow-2xl hover:-translate-y-2 transition-all duration-500">
                    <div className="relative h-64 overflow-hidden">
                      <img src={product.image} alt={product.name} className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700" />
                      <div className="absolute top-6 left-6">
                        <div className="bg-white/90 backdrop-blur-md px-4 py-2 rounded-xl text-[10px] font-black uppercase tracking-widest text-primary-600 shadow-xl border border-white/20">
                          {product.category}
                        </div>
                      </div>
                    </div>
                    <div className="p-8 space-y-6">
                      <div className="min-h-[64px]">
                        <h3 className="text-2xl font-black text-gray-900 leading-tight group-hover:text-primary-600 transition-colors mb-2 decoration-primary-500/30 decoration-4 group-hover:underline underline-offset-8">
                          {product.name}
                        </h3>
                        <div className="flex items-center gap-2 text-[10px] font-black uppercase tracking-widest text-emerald-500 bg-emerald-50 w-fit px-3 py-1 rounded-lg border border-emerald-100 mt-3">
                          <PackageCheck className="w-3.5 h-3.5" />
                          {product.salesCount}
                        </div>
                      </div>
                      
                      <div className="grid grid-cols-2 gap-4">
                        <div className="p-4 bg-gray-50 rounded-2xl border border-gray-100">
                          <div className="text-[10px] font-black text-gray-400 uppercase tracking-widest mb-1">Harga Jual</div>
                          <div className="text-sm font-black text-gray-900">{formatCurrency(product.price)}</div>
                        </div>
                        <div className="p-4 bg-primary-50 rounded-2xl border border-primary-100">
                          <div className="text-[10px] font-black text-primary-400 uppercase tracking-widest mb-1">Komisi</div>
                          <div className="text-sm font-black text-primary-600">{formatCurrency(product.commission)}</div>
                        </div>
                      </div>

                      <Button 
                        size="lg" 
                        rounded="full" 
                        className="w-full shadow-xl shadow-primary-100 flex items-center justify-center gap-2 group"
                        onClick={() => window.open(product.link, '_blank')}
                      >
                        Dapatkan Link
                        <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
                      </Button>
                    </div>
                  </div>
                ))
              )}
            </div>
          </div>
        ) : (
          <div className="space-y-8 animate-fade-in">
            {/* Manage Section */}
            <div className="bg-white rounded-[3rem] border border-gray-100 shadow-sm overflow-hidden">
               <div className="p-10 lg:p-12 border-b border-gray-50 flex flex-wrap items-center justify-between gap-6">
                  <div>
                    <h2 className="text-2xl font-black text-gray-900">Kelola Produk Saya</h2>
                    <p className="text-gray-500 font-medium mt-1">Daftar produk yang sedang Anda promosikan secara aktif.</p>
                  </div>
                  <div className="flex items-center gap-3">
                    <div className="text-right">
                      <div className="text-xs font-black text-gray-400 uppercase tracking-widest">Total Produk Tersedia</div>
                      <div className="text-xl font-black text-primary-600">{products.length} Produk</div>
                    </div>
                    <div className="w-12 h-12 bg-primary-50 rounded-2xl flex items-center justify-center text-primary-600">
                       <Layers className="w-6 h-6" />
                    </div>
                  </div>
               </div>

               <div className="overflow-x-auto">
                 <table className="w-full text-left">
                    <thead>
                      <tr className="bg-gray-50">
                        <th className="px-10 py-5 text-[10px] font-black text-gray-400 uppercase tracking-widest">Detail Produk</th>
                        <th className="px-6 py-5 text-[10px] font-black text-gray-400 uppercase tracking-widest">Komisi Rate</th>
                        <th className="px-6 py-5 text-[10px] font-black text-gray-400 uppercase tracking-widest">Status</th>
                        <th className="px-10 py-5 text-[10px] font-black text-right text-gray-400 uppercase tracking-widest">Aksi</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-gray-50">
                      {products.length === 0 ? (
                        <tr>
                          <td colSpan={4} className="px-10 py-20 text-center">
                             <div className="text-gray-400 font-bold italic">Belum ada produk untuk dikelola.</div>
                          </td>
                        </tr>
                      ) : (
                        products.slice(0, 5).map((product) => (
                          <tr key={product.id} className="hover:bg-gray-50/50 transition-colors group">
                             <td className="px-10 py-8">
                               <div className="flex items-center gap-4">
                                 <div className="w-16 h-16 rounded-2xl bg-gray-100 overflow-hidden flex-shrink-0">
                                    <img src={product.image} className="w-full h-full object-cover" />
                                 </div>
                                 <div>
                                   <div className="font-black text-gray-900 leading-tight mb-1">{product.name}</div>
                                   <div className="text-xs font-bold text-gray-400 flex items-center gap-1">
                                      <Tag className="w-3 h-3" />
                                      {product.category}
                                   </div>
                                 </div>
                               </div>
                             </td>
                             <td className="px-6 py-8">
                                <span className="inline-flex px-3 py-1 bg-emerald-50 text-emerald-600 text-[10px] font-black rounded-lg border border-emerald-100">
                                  FIXED {formatCurrency(product.commission)}
                                </span>
                             </td>
                             <td className="px-6 py-8">
                                <div className="flex items-center gap-2">
                                   <span className="w-2 h-2 bg-emerald-500 rounded-full animate-pulse"></span>
                                   <span className="text-xs font-black text-gray-900 uppercase tracking-widest">Aktif</span>
                                </div>
                             </td>
                             <td className="px-10 py-8 text-right">
                                <button 
                                  onClick={() => window.open(product.link, '_blank')}
                                  className="p-3 bg-gray-100 text-gray-500 rounded-xl hover:bg-primary-600 hover:text-white transition-all shadow-sm"
                                >
                                  <ExternalLink className="w-5 h-5" />
                                </button>
                             </td>
                          </tr>
                        ))
                      )}
                    </tbody>
                 </table>
               </div>
               <div className="p-8 bg-gray-50/50 border-t border-gray-50 text-center">
                  <button className="text-sm font-black text-primary-600 hover:underline">
                    Muat Lebih Banyak...
                  </button>
               </div>
            </div>
          </div>
        )}
      </main>

      {/* Benefits Banner */}
      <section className="max-w-7xl mx-auto px-6 lg:px-10 pb-20">
         <div className="bg-emerald-500 rounded-[2.5rem] p-10 text-white flex flex-wrap items-center justify-between gap-8 relative overflow-hidden">
            <div className="relative z-10 flex flex-wrap items-center gap-10">
               <div>
                  <h4 className="text-xl font-black mb-1">Keuntungan Menjadi Affiliate Premium</h4>
                  <p className="text-emerald-50/80 font-medium">Capai tier Platinum dan dapatkan extra komisi +5%!</p>
               </div>
               <div className="flex items-center gap-4">
                  <div className="flex items-center gap-2 bg-white/10 px-4 py-2 rounded-xl text-sm font-bold border border-white/20">
                     <CheckCircle2 className="w-4 h-4" /> Bonus Unlimited
                  </div>
                  <div className="flex items-center gap-2 bg-white/10 px-4 py-2 rounded-xl text-sm font-bold border border-white/20">
                     <CheckCircle2 className="w-4 h-4" /> Reward Gadget
                  </div>
               </div>
            </div>
            <button 
               onClick={() => {
                 setIsUpgrading(true);
                 setTimeout(() => setIsUpgrading(false), 3000); // Reset for demonstration
               }}
               className={`relative z-10 font-black px-8 py-4 text-sm rounded-full shadow-2xl overflow-hidden transition-all duration-700 ease-out transform hover:-translate-y-1 active:scale-95 cursor-pointer ${
                 isUpgrading 
                   ? 'bg-gradient-to-r from-yellow-300 to-yellow-500 text-yellow-950 scale-105 shadow-[0_0_50px_rgba(250,204,21,0.6)] border border-yellow-200' 
                   : 'bg-white text-emerald-600 hover:bg-emerald-50 border border-white/20'
               }`}
            >
              <div className="relative flex items-center justify-center min-w-[200px] h-6">
                <span className={`absolute flex items-center justify-center gap-2 transition-all duration-500 ${
                  isUpgrading ? 'opacity-0 translate-y-8 scale-75 blur-sm' : 'opacity-100 translate-y-0 scale-100 blur-0'
                }`}>
                  Upgrade Membership
                </span>
                <span className={`absolute flex items-center justify-center gap-2 transition-all duration-500 delay-100 ${
                  isUpgrading ? 'opacity-100 translate-y-0 scale-100 blur-0' : 'opacity-0 -translate-y-8 scale-125 blur-sm'
                }`}>
                  <Sparkles className="w-5 h-5 animate-spin-slow text-yellow-900" />
                  Mengaktifkan VIP...
                </span>
              </div>
            </button>
            {/* Background pattern */}
            <div className="absolute top-1/2 right-0 -translate-y-1/2 w-64 h-64 bg-white/10 rounded-full blur-[60px]"></div>
         </div>
      </section>
      <FloatingActionMenu />
      </div>
    </div>
  );
}
