import { 
  Search, 
  Filter, 
  Grid, 
  List, 
  ArrowRight, 
  ShoppingBag, 
  Tag, 
  ChevronRight,
  Loader2,
  ExternalLink,
  ChevronLeft,
  ArrowLeft
} from 'lucide-react';
import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../hooks/useAuth';
import { supabase } from '../lib/supabase';
import Button from '../components/Button';
import FloatingActionMenu from '../components/FloatingActionMenu';
import Sidebar from '../components/Sidebar';
import ProfileDropdown from '../components/ProfileDropdown';

export default function ProductsPage() {
  const [viewMode, setViewMode] = useState<'grid' | 'list'>('grid');
  const [products, setProducts] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [username, setUsername] = useState<string>('');
  const { user } = useAuth();
  const navigate = useNavigate();

  useEffect(() => {
    const fetchUserAndProducts = async () => {
      try {
        setLoading(true);
        
        // 1. Fetch User Profile for Username
        if (user) {
          const { data: profile } = await supabase
            .from('affiliate_profiles')
            .select('username')
            .eq('user_id', user.id)
            .single();
          
          if (profile?.username) {
            setUsername(profile.username);
          } else {
            setUsername(user.user_metadata?.username || user.email?.split('@')[0] || '');
          }
        }

        // 2. Fetch Products
        const response = await fetch('https://lampungcerdas.com/api/produks', {
          method: 'GET',
          headers: {
            'x-api-key': import.meta.env.VITE_PRODUCTS_API_KEY,
            'Content-Type': 'application/json'
          }
        });
        
        const result = await response.json();
        
        if (result.success && result.data) {
          const normalized = (result.data.data || result.data).map((item: any) => {
            const price = parseFloat(item.harga_jual) || 0;
            const commission = price * 0.12; // 12% commission
            
            return {
              id: item.id,
              name: item.nama,
              slug: item.slug || item.id,
              category: item.kategori?.nama || item.kategori || 'Digital Course',
              price: price,
              commission: commission,
              image: item.gambar_url || (item.galeri_urls && item.galeri_urls.length > 0 ? item.galeri_urls[0] : 'https://images.unsplash.com/photo-1516321318423-f06f85e504b3?w=800&auto=format&fit=crop&q=60'),
              salesCount: item.jumlah_pembeli ? `${item.jumlah_pembeli} Terjual` : 'Baru Rilis',
              apiLink: item.link_affiliate || '#'
            };
          });
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

    fetchUserAndProducts();
  }, [user]);

  const generateAffiliateLink = (item: any) => {
    const usr = username || 'member';
    if (item.apiLink === '#' || !item.apiLink) {
      return `https://lampungcerdas.com/program/${item.slug}?ref=${usr}`;
    }
    const separator = item.apiLink.includes('?') ? '&' : '?';
    return `${item.apiLink}${separator}aff=${usr}`;
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
      <div className="xl:ml-72 min-h-screen">
        <header className="sticky top-0 z-40 bg-white/80 backdrop-blur-md border-b border-gray-100 px-6 lg:px-10 py-4">
          <div className="max-w-7xl mx-auto flex items-center justify-between gap-6">
            <div className="flex items-center gap-4">
              <button 
                onClick={() => navigate(-1)}
                className="flex items-center justify-center w-10 h-10 text-gray-400 hover:text-primary-600 hover:bg-primary-50 rounded-xl transition-all border border-gray-100 bg-white"
              >
                <ArrowLeft className="w-5 h-5" />
              </button>
              <div>
                <h1 className="text-xl font-black text-gray-900 leading-none tracking-tight">Cek Produk</h1>
                <p className="text-[10px] uppercase tracking-widest font-black text-gray-400 mt-1">Lampung Cerdas Affiliate</p>
              </div>
            </div>
            <ProfileDropdown />
          </div>
        </header>

        <main className="max-w-7xl mx-auto p-6 lg:p-10 space-y-8">
          <div className="flex flex-col md:flex-row md:items-center justify-between gap-6">
             <div className="relative flex-1 max-w-lg">
                <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
                <input 
                  type="text" 
                  placeholder="Cari program belajar..." 
                  className="w-full pl-12 pr-4 py-4 bg-white border border-gray-100 rounded-2xl shadow-sm outline-none focus:ring-2 focus:ring-primary-100 transition-all font-medium"
                />
             </div>
             <div className="flex items-center gap-3">
                <div className="flex bg-white p-1.5 rounded-2xl border border-gray-100 shadow-sm">
                   <button 
                     onClick={() => setViewMode('grid')}
                     className={`p-2.5 rounded-xl transition-all ${viewMode === 'grid' ? 'bg-primary-600 text-white shadow-lg shadow-primary-100' : 'text-gray-400 hover:bg-gray-50'}`}
                   >
                     <Grid className="w-5 h-5" />
                   </button>
                   <button 
                     onClick={() => setViewMode('list')}
                     className={`p-2.5 rounded-xl transition-all ${viewMode === 'list' ? 'bg-primary-600 text-white shadow-lg shadow-primary-100' : 'text-gray-400 hover:bg-gray-50'}`}
                   >
                     <List className="w-5 h-5" />
                   </button>
                </div>
                <button className="flex items-center gap-2 px-6 py-4 bg-white border border-gray-100 rounded-2xl shadow-sm font-bold text-gray-600 hover:bg-gray-50 transition-all">
                   <Filter className="w-5 h-5" />
                   Filter
                </button>
             </div>
          </div>

          {loading ? (
             <div className="grid md:grid-cols-2 lg:grid-cols-2 gap-8">
                {[1,2,3,4].map(i => (
                  <div key={i} className="bg-white rounded-[2.5rem] p-4 h-96 animate-pulse border border-gray-100">
                     <div className="bg-gray-100 w-full h-48 rounded-[2rem] mb-6"></div>
                     <div className="space-y-3 px-4">
                        <div className="h-4 bg-gray-100 rounded w-1/4"></div>
                        <div className="h-6 bg-gray-100 rounded w-3/4"></div>
                        <div className="h-10 bg-gray-100 rounded w-full mt-6"></div>
                     </div>
                  </div>
                ))}
             </div>
          ) : error ? (
             <div className="bg-red-50 p-12 rounded-[3rem] border border-red-100 text-center space-y-4">
                <div className="w-20 h-20 bg-red-100 rounded-full flex items-center justify-center mx-auto text-red-600 mb-4">
                   <ShoppingBag className="w-10 h-10" />
                </div>
                <h3 className="text-xl font-black text-red-900">Waduh, ada kendala!</h3>
                <p className="text-red-700 font-medium max-w-md mx-auto">{error}</p>
                <Button variant="outline" onClick={() => window.location.reload()}>Coba Lagi</Button>
             </div>
          ) : viewMode === 'grid' ? (
             <div className="grid md:grid-cols-2 lg:grid-cols-2 gap-8">
                {products.map((product) => (
                  <div 
                    key={product.id} 
                    onClick={() => navigate(`/products/${product.slug}`)}
                    className="group cursor-pointer bg-white rounded-[2.5rem] overflow-hidden border border-gray-100 shadow-sm hover:shadow-2xl hover:-translate-y-2 transition-all duration-500"
                  >
                    <div className="relative h-64 overflow-hidden">
                      <img src={product.image} alt={product.name} className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700" />
                      <div className="absolute top-6 left-6">
                        <div className="px-4 py-2 bg-white/90 backdrop-blur-md rounded-full text-[10px] font-black uppercase tracking-widest text-primary-600 shadow-lg border border-white/50">
                          {product.category}
                        </div>
                      </div>
                    </div>
                    <div className="p-8 lg:p-10 space-y-6">
                      <div className="space-y-2">
                        <h3 className="text-2xl font-black text-gray-900 leading-tight group-hover:text-primary-600 transition-colors line-clamp-2">
                          {product.name}
                        </h3>
                        <p className="text-gray-500 font-bold text-sm flex items-center gap-2">
                          <PackageCheck className="w-4 h-4 text-emerald-500" />
                          {product.salesCount} oleh Affiliate
                        </p>
                      </div>

                      <div className="grid grid-cols-2 gap-4">
                        <div className="p-4 bg-gray-50 rounded-2xl border border-gray-100">
                          <div className="text-[10px] font-black text-gray-400 uppercase tracking-widest mb-1">Harga Jual</div>
                          <div className="text-sm font-black text-gray-900">{formatCurrency(product.price)}</div>
                        </div>
                        <div className="p-4 bg-primary-50 rounded-2xl border border-primary-100">
                          <div className="text-[10px] font-black text-primary-400 uppercase tracking-widest mb-1">Komisi (12%)</div>
                          <div className="text-sm font-black text-primary-600">{formatCurrency(product.commission)}</div>
                        </div>
                      </div>

                      <div className="grid grid-cols-2 gap-4">
                        <Button 
                          variant="outline"
                          rounded="full"
                          className="w-full"
                          onClick={(e) => {
                            e.stopPropagation();
                            navigate(`/products/${product.slug}`);
                          }}
                        >
                          Detail
                        </Button>
                        <Button 
                          size="lg" 
                          rounded="full" 
                          className="w-full shadow-xl shadow-primary-100 flex items-center justify-center gap-2 group"
                          onClick={(e) => {
                            e.stopPropagation();
                            window.open(generateAffiliateLink(product), '_blank');
                          }}
                        >
                          Link
                          <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
                        </Button>
                      </div>
                    </div>
                  </div>
                ))}
             </div>
          ) : (
            <div className="bg-white rounded-[3rem] border border-gray-100 shadow-sm overflow-hidden">
               <table className="w-full text-left">
                  <thead>
                     <tr className="bg-gray-50 border-b border-gray-100 text-[10px] font-black text-gray-400 uppercase tracking-[0.2em]">
                        <th className="px-10 py-6">Produk</th>
                        <th className="px-6 py-6 text-center">Harga Jual</th>
                        <th className="px-6 py-6 text-center">Komisi (12%)</th>
                        <th className="px-10 py-6 text-right">Aksi</th>
                     </tr>
                  </thead>
                  <tbody className="divide-y divide-gray-50">
                     {products.map((product) => (
                        <tr key={product.id} className="group hover:bg-primary-50/30 transition-colors cursor-pointer" onClick={() => navigate(`/products/${product.slug}`)}>
                           <td className="px-10 py-8">
                              <div className="flex items-center gap-6">
                                 <div className="w-20 h-20 rounded-2xl overflow-hidden shadow-md">
                                    <img src={product.image} className="w-full h-full object-cover" />
                                 </div>
                                 <div className="space-y-1">
                                    <h4 className="font-black text-gray-900 group-hover:text-primary-600 transition-colors">{product.name}</h4>
                                    <span className="text-[10px] font-black uppercase text-gray-400">{product.category}</span>
                                 </div>
                              </div>
                           </td>
                           <td className="px-6 py-8 text-center">
                              <span className="font-bold text-gray-900">{formatCurrency(product.price)}</span>
                           </td>
                           <td className="px-6 py-8 text-center">
                              <span className="px-4 py-2 bg-primary-100 text-primary-700 rounded-full text-sm font-black">
                                 {formatCurrency(product.commission)}
                              </span>
                           </td>
                           <td className="px-10 py-8 text-right">
                              <div className="flex items-center justify-end gap-2">
                                <button 
                                  onClick={(e) => {
                                    e.stopPropagation();
                                    navigate(`/products/${product.slug}`);
                                  }}
                                  className="p-3 bg-gray-100 text-gray-500 rounded-xl hover:bg-gray-200 transition-all"
                                >
                                  <ChevronRight className="w-5 h-5" />
                                </button>
                                <button 
                                  onClick={(e) => {
                                    e.stopPropagation();
                                    window.open(generateAffiliateLink(product), '_blank');
                                  }}
                                  className="p-3 bg-gray-100 text-gray-500 rounded-xl hover:bg-primary-600 hover:text-white transition-all shadow-sm"
                                >
                                  <ExternalLink className="w-5 h-5" />
                                </button>
                              </div>
                           </td>
                        </tr>
                     ))}
                  </tbody>
               </table>
            </div>
          )}
        </main>
        <FloatingActionMenu />
      </div>
    </div>
  );
}

function PackageCheck({ className }: { className?: string }) {
  return (
    <svg 
      className={className} 
      xmlns="http://www.w3.org/2000/svg" 
      width="24" 
      height="24" 
      viewBox="0 0 24 24" 
      fill="none" 
      stroke="currentColor" 
      strokeWidth="2" 
      strokeLinecap="round" 
      strokeLinejoin="round"
    >
      <path d="m16 16 2 2 4-4"/><path d="M21 10V8a2 2 0 0 0-1-1.73l-7-4a2 2 0 0 0-2 0l-7 4A2 2 0 0 0 3 8v8a2 2 0 0 0 1 1.73l7 4a2 2 0 0 0 2 0l2-1.14"/><path d="m7.5 4.27 9 5.15"/><polyline points="3.29 7 12 12 20.71 7"/><line x1="12" x2="12" y1="22" y2="12"/>
    </svg>
  );
}
