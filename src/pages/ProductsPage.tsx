import { 
  Search, 
  Filter, 
  Grid, 
  List, 
  ExternalLink,
  ArrowLeft,
  Copy,
  Check
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
  const [searchQuery, setSearchQuery] = useState('');
  const [copyingId, setCopyingId] = useState<string | null>(null);
  const { user } = useAuth();
  const navigate = useNavigate();

  useEffect(() => {
    const fetchUserAndProducts = async () => {
      try {
        setLoading(true);
        if (user) {
          try {
            const { data: profile } = await supabase
              .from('affiliate_profiles')
              .select('username')
              .eq('user_id', user.id)
              .single();
            if (profile?.username) setUsername(profile.username);
            else setUsername(user.user_metadata?.username || user.email?.split('@')[0] || '');
          } catch (e) {
            setUsername(user.user_metadata?.username || user.email?.split('@')[0] || '');
          }
        }

        const response = await fetch('https://lampungcerdas.com/api/produks', {
          method: 'GET',
          headers: {
            'x-api-key': import.meta.env.VITE_PRODUCTS_API_KEY,
            'Content-Type': 'application/json'
          }
        });
        
        const result = await response.json();
        if (result.success && (result.data || result.data?.data)) {
          const rawData = result.data.data || result.data || [];
          const normalized = rawData.map((item: any) => {
            const rawPriceStr = (item.harga_jual || item.harga || '0').toString();
            const price = parseInt(rawPriceStr.replace(/[^0-9]/g, ''), 10) || 0;
            const commission = Math.round(price * 0.12);

            return {
              id: item.id?.toString() || Math.random().toString(),
              name: item.nama || 'Program LC',
              slug: item.slug || item.id?.toString() || '',
              category: item.kategori?.nama || item.kategori || 'Program',
              price: price,
              commission: commission,
              image: item.gambar_url || (item.galeri_urls?.[0]) || 'https://images.unsplash.com/photo-1516321318423-f06f85e504b3?w=800&auto=format&fit=crop&q=60',
              salesCount: item.jumlah_pembeli ? `${item.jumlah_pembeli} Terjual` : 'Baru',
              apiLink: item.link_affiliate || '#'
            };
          });
          setProducts(normalized);
        }
      } catch (err: any) {
        setError('Gagal memuat produk.');
      } finally {
        setLoading(false);
      }
    };
    fetchUserAndProducts();
  }, [user]);

  const filteredProducts = products.filter(p => 
    p.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
    p.category.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const formatCurrency = (val: number) => {
    return new Intl.NumberFormat('id-ID', { style: 'currency', currency: 'IDR', minimumFractionDigits: 0 }).format(val);
  };

  const generateAffiliateLink = (item: any) => {
    const usr = username || 'member';
    if (item.apiLink === '#' || !item.apiLink) {
      return `https://lampungcerdas.com/program/${item.slug}?ref=${usr}`;
    }
    const separator = item.apiLink.includes('?') ? '&' : '?';
    return `${item.apiLink}${separator}aff=${usr}`;
  };

  const handleCopy = (e: React.MouseEvent, item: any) => {
    e.stopPropagation();
    const link = generateAffiliateLink(item);
    navigator.clipboard.writeText(link);
    setCopyingId(item.id);
    setTimeout(() => setCopyingId(null), 2000);
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
                <h1 className="text-xl font-black text-gray-900 leading-none tracking-tight">Katalog Produk</h1>
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
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  placeholder="Cari program belajar..." 
                  className="w-full pl-12 pr-4 py-4 bg-white border border-gray-100 rounded-2xl shadow-sm outline-none focus:ring-2 focus:ring-primary-100 transition-all font-medium"
                />
             </div>
             <div className="flex items-center gap-3">
                <div className="flex bg-white p-1.5 rounded-2xl border border-gray-100 shadow-sm">
                   <button onClick={() => setViewMode('grid')} className={`p-2.5 rounded-xl transition-all ${viewMode === 'grid' ? 'bg-primary-600 text-white shadow-lg shadow-primary-100' : 'text-gray-400 hover:bg-gray-50'}`}><Grid className="w-5 h-5" /></button>
                   <button onClick={() => setViewMode('list')} className={`p-2.5 rounded-xl transition-all ${viewMode === 'list' ? 'bg-primary-600 text-white shadow-lg shadow-primary-100' : 'text-gray-400 hover:bg-gray-50'}`}><List className="w-5 h-5" /></button>
                </div>
                <button className="flex items-center gap-2 px-6 py-4 bg-white border border-gray-100 rounded-2xl shadow-sm font-bold text-gray-600 hover:bg-gray-50 transition-all">
                   <Filter className="w-5 h-5" />
                   Filter
                </button>
             </div>
          </div>

          {loading ? (
             <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
                {[1,2,3,4,5,6].map(i => <div key={i} className="bg-white rounded-[2.5rem] p-4 h-[450px] animate-pulse border border-gray-100 shadow-sm" />)}
             </div>
          ) : error ? (
             <div className="bg-red-50 p-12 rounded-[3rem] border border-red-100 text-center space-y-4">
                <h3 className="text-xl font-black text-red-900">{error}</h3>
                <Button variant="outline" onClick={() => window.location.reload()}>Coba Lagi</Button>
             </div>
          ) : viewMode === 'grid' ? (
             <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
                {filteredProducts.map((product) => (
                  <div key={product.id} onClick={() => navigate(`/products/${product.slug}`)} className="group cursor-pointer bg-white rounded-[2.5rem] overflow-hidden border border-gray-100 shadow-sm hover:shadow-2xl hover:shadow-primary-100/30 hover:-translate-y-2 transition-all duration-500 flex flex-col">
                    <div className="relative h-56 overflow-hidden">
                      <img src={product.image} alt={product.name} className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700" />
                      <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent"></div>
                    </div>
                    <div className="p-6 lg:p-8 space-y-6 flex-1 flex flex-col">
                      <div className="space-y-2">
                        <h3 className="text-xl font-black text-gray-900 leading-tight group-hover:text-primary-600 transition-colors line-clamp-4 min-h-[6rem]">{product.name}</h3>
                        <p className="text-emerald-600 font-bold text-[10px] uppercase tracking-widest">{product.category} • {product.salesCount}</p>
                      </div>
                      
                      <div className="space-y-3">
                        <div className="flex items-center justify-between p-4 bg-gray-50 rounded-2xl border border-gray-100">
                          <span className="text-[10px] font-bold text-gray-400 uppercase">Harga</span>
                          <span className="text-sm font-black text-gray-900">{formatCurrency(product.price)}</span>
                        </div>
                        <div className="flex items-center justify-between p-4 bg-primary-50 rounded-2xl border border-primary-100">
                          <span className="text-[10px] font-bold text-primary-400 uppercase">Komisi</span>
                          <span className="text-sm font-black text-primary-700">{formatCurrency(product.commission)}</span>
                        </div>
                      </div>
                      
                      <div className="mt-auto grid grid-cols-2 gap-3">
                        <Button 
                          variant="outline" 
                          className={`py-3.5 px-1 text-[10px] font-black flex items-center justify-center gap-2 transition-all duration-300 ${copyingId === product.id ? 'bg-emerald-50 border-emerald-500 text-emerald-600' : ''}`}
                          onClick={(e) => handleCopy(e, product)}
                        >
                          {copyingId === product.id ? (
                            <><Check className="w-3.5 h-3.5" /> Tersalin</>
                          ) : (
                            <><Copy className="w-3.5 h-3.5" /> Salin</>
                          )}
                        </Button>
                        <Button 
                          className="py-3.5 px-1 text-[10px] font-black shadow-lg shadow-primary-200"
                          onClick={(e) => { e.stopPropagation(); window.open(generateAffiliateLink(product), '_blank'); }}
                        >
                          Buka Link
                          <ExternalLink className="w-3.5 h-3.5 ml-1.5" />
                        </Button>
                      </div>
                    </div>
                  </div>
                ))}
             </div>
          ) : (
            <div className="bg-white rounded-[3rem] border border-gray-100 shadow-sm overflow-hidden">
               <table className="w-full text-left">
                  <thead className="bg-gray-50 border-b border-gray-100 text-[10px] font-black text-gray-400 uppercase tracking-widest">
                     <tr><th className="px-10 py-6">Produk</th><th className="px-6 py-6 text-center">Harga & Komisi</th><th className="px-10 py-6 text-right">Aksi</th></tr>
                  </thead>
                  <tbody className="divide-y divide-gray-50">
                     {filteredProducts.map((product) => (
                        <tr key={product.id} className="group hover:bg-gray-50 transition-colors cursor-pointer" onClick={() => navigate(`/products/${product.slug}`)}>
                           <td className="px-10 py-8">
                              <div className="flex items-center gap-6">
                                 <div className="w-16 h-16 rounded-2xl overflow-hidden shadow-sm"><img src={product.image} className="w-full h-full object-cover" /></div>
                                 <h4 className="text-lg font-black text-gray-900 group-hover:text-primary-600 transition-colors leading-snug line-clamp-4 min-h-[4.5rem]">{product.name}</h4>
                              </div>
                           </td>
                           <td className="px-6 py-8 text-center space-y-1">
                              <div className="text-sm font-bold text-gray-900">{formatCurrency(product.price)}</div>
                              <div className="text-xs font-black text-primary-600 bg-primary-50 inline-block px-3 py-1 rounded-full">{formatCurrency(product.commission)} (12%)</div>
                           </td>
                           <td className="px-10 py-8 text-right">
                              <div className="flex items-center justify-end gap-2">
                                <button onClick={(e) => handleCopy(e, product)} className={`p-3 rounded-xl transition-all ${copyingId === product.id ? 'bg-emerald-500 text-white' : 'bg-gray-100 text-gray-500 hover:bg-gray-200'}`}>
                                  {copyingId === product.id ? <Check className="w-5 h-5" /> : <Copy className="w-5 h-5" />}
                                </button>
                                <button onClick={(e) => { e.stopPropagation(); window.open(generateAffiliateLink(product), '_blank'); }} className="p-3 bg-primary-600 text-white rounded-xl hover:bg-primary-700 transition-all shadow-md">
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


