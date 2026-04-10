import { 
  ArrowLeft, 
  ArrowRight, 
  Tag, 
  ChevronRight,
  Sparkles,
  Wallet,
  TrendingUp,
  ShoppingBag,
  Copy,
  Check
} from 'lucide-react';
import { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { supabase } from '../lib/supabase';
import { useAuth } from '../hooks/useAuth';
import Button from '../components/Button';
import Sidebar from '../components/Sidebar';
import FloatingActionMenu from '../components/FloatingActionMenu';
import ProfileDropdown from '../components/ProfileDropdown';
import PackageCheck from '../components/PackageCheck';

export default function ProductDetailPage() {
  const { slug } = useParams();
  const navigate = useNavigate();
  const { user } = useAuth();
  const [product, setProduct] = useState<any>(null);
  const [loading, setLoading] = useState(true);
  const [username, setUsername] = useState('');
  const [copied, setCopied] = useState(false);

  useEffect(() => {
    const fetchData = async () => {
      try {
        setLoading(true);
        
        // 1. User Info
        if (user) {
          try {
            const { data: profile } = await supabase
              .from('affiliate_profiles')
              .select('username')
              .eq('user_id', user.id)
              .single();
            setUsername(profile?.username || user.user_metadata?.username || user.email?.split('@')[0] || 'member');
          } catch (e) {
            setUsername(user.user_metadata?.username || user.email?.split('@')[0] || 'member');
          }
        }

        // 2. Fetch API Data
        const response = await fetch('https://lampungcerdas.com/api/produks', {
          method: 'GET',
          headers: {
            'x-api-key': import.meta.env.VITE_PRODUCTS_API_KEY,
            'Content-Type': 'application/json'
          }
        });
        const result = await response.json();
        const rawProducts = result.data.data || result.data || [];
        
        const found = rawProducts.find((p: any) => p.slug === slug || p.id?.toString() === slug);
        
        if (found) {
            const rawPriceStr = (found.harga_jual || found.harga || '0').toString();
            const price = parseInt(rawPriceStr.replace(/[^0-9]/g, ''), 10) || 0;
            const commission = Math.round(price * 0.12);

            setProduct({
                id: found.id,
                name: found.nama,
                category: found.kategori?.nama || found.kategori || 'Program',
                price: price,
                commission: commission,
                image: found.gambar_url || (found.galeri_urls?.[0]) || 'https://images.unsplash.com/photo-1516321318423-f06f85e504b3?w=800&auto=format&fit=crop&q=60',
                salesCount: found.jumlah_pembeli ? `${found.jumlah_pembeli} Terjual` : 'Baru',
                description: found.deskripsi || 'Satu langkah nyata Lampung Cerdas dalam membantu meningkatkan literasi di Indonesia.',
                apiLink: found.link_affiliate || '#'
            });
        }
      } catch (err) {
        console.error('Detail fetch error:', err);
      } finally {
        setLoading(false);
      }
    };
    fetchData();
  }, [slug, user]);

  const generateLink = () => {
    if (!product) return '#';
    const usr = username || 'member';
    if (product.apiLink === '#' || !product.apiLink) {
      return `https://lampungcerdas.com/program/${slug}?ref=${usr}`;
    }
    const separator = product.apiLink.includes('?') ? '&' : '?';
    return `${product.apiLink}${separator}aff=${usr}`;
  };

  const formatCurrency = (val: number) => {
    return new Intl.NumberFormat('id-ID', {
      style: 'currency',
      currency: 'IDR',
      minimumFractionDigits: 0
    }).format(val);
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-[#F8FAFC]">
        <Sidebar />
        <div className="xl:ml-72 flex items-center justify-center min-h-screen">
            <div className="w-10 h-10 border-4 border-primary-100 border-t-primary-600 rounded-full animate-spin"></div>
        </div>
      </div>
    );
  }

  if (!product) {
    return (
      <div className="min-h-screen bg-[#F8FAFC]">
        <Sidebar />
        <div className="xl:ml-72 flex flex-col items-center justify-center min-h-screen space-y-4 px-6 text-center">
            <h1 className="text-2xl font-black text-gray-900">Produk Tidak Ditemukan</h1>
            <p className="text-gray-500 font-medium max-w-sm">Data produk ini mungkin tidak tersedia secara publik saat ini.</p>
            <Button onClick={() => navigate('/products')} rounded="full">Kembali</Button>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[#F8FAFC]">
      <Sidebar />
      <div className="xl:ml-72 min-h-screen">
          <header className="sticky top-0 z-40 bg-white/80 backdrop-blur-md border-b border-gray-100 px-6 lg:px-10 py-5">
            <div className="max-w-6xl mx-auto flex items-center justify-between">
               <div className="flex items-center gap-5">
                  <FloatingActionMenu />
                  <button onClick={() => navigate('/products')} className="hidden xl:flex p-3 bg-white border border-gray-100 rounded-2xl text-gray-400 hover:text-primary-600 transition-all shadow-sm">
                    <ArrowLeft className="w-5 h-5" />
                  </button>
                  <h1 className="text-xl font-black text-gray-900 tracking-tight">Rincian Produk</h1>
               </div>
               <ProfileDropdown />
            </div>
          </header>

          <main className="max-w-6xl mx-auto p-6 lg:p-10">
             <div className="grid lg:grid-cols-2 gap-12 items-start">
                <div className="space-y-6 lg:sticky lg:top-32">
                   <div className="bg-white p-6 rounded-[3.5rem] shadow-2xl shadow-gray-100/30 border border-gray-50 overflow-hidden">
                      <img src={product.image} alt={product.name} className="w-full aspect-square object-cover rounded-[2.5rem]" />
                   </div>
                </div>

                <div className="space-y-10">
                   <div className="space-y-6">
                      <div className="inline-flex items-center gap-2 px-4 py-2 bg-primary-50 text-[11px] font-black text-primary-600 uppercase tracking-widest rounded-full border border-primary-100">
                         <Tag className="w-3.5 h-3.5" />
                         {product.category}
                      </div>
                      <h2 className="text-4xl lg:text-5xl font-black text-gray-900 leading-tight">
                         {product.name}
                      </h2>
                      <div className="flex items-center gap-2 text-emerald-600 font-black text-sm uppercase tracking-widest">
                         <PackageCheck className="w-5 h-5" />
                         Populer & Terlaris: {product.salesCount}
                      </div>
                   </div>

                   <div className="grid sm:grid-cols-2 gap-6">
                      <div className="bg-white p-8 rounded-[2.5rem] border border-gray-100 shadow-sm space-y-2">
                         <div className="text-[10px] font-black text-gray-400 uppercase tracking-[0.2em] flex items-center gap-2">
                           <ShoppingBag className="w-3 h-3" />
                           Harga Jual
                         </div>
                         <div className="text-2xl font-black text-gray-950">
                           {formatCurrency(product.price)}
                         </div>
                      </div>
                      <div className="bg-primary-600 p-8 rounded-[2.5rem] text-white shadow-2xl shadow-primary-200 space-y-2 relative overflow-hidden">
                         <div className="relative z-10">
                            <div className="text-[10px] font-black text-primary-100/70 uppercase tracking-[0.2em] flex items-center gap-2">
                               <Wallet className="w-3 h-3" />
                               Komisi (12%)
                            </div>
                            <div className="text-2xl font-black">
                               {formatCurrency(product.commission)}
                            </div>
                         </div>
                         <Sparkles className="absolute -bottom-2 -right-2 w-20 h-20 text-white/10" />
                      </div>
                   </div>

                   <div className="bg-emerald-50 p-8 rounded-[2.5rem] border border-emerald-100 flex items-center justify-between gap-6 group">
                      <div className="space-y-1">
                        <div className="text-[10px] font-black text-emerald-600 uppercase tracking-widest flex items-center gap-2">
                           <TrendingUp className="w-4 h-4" />
                           Potensi Laba
                        </div>
                        <div className="text-xl font-black text-emerald-950">
                           Jual 10 = {formatCurrency(product.commission * 10)}
                        </div>
                      </div>
                      <ChevronRight className="w-8 h-8 text-emerald-300 group-hover:translate-x-1 transition-transform" />
                   </div>

                   <div className="bg-white p-10 rounded-[2.5rem] border border-gray-100 space-y-6">
                      <h4 className="text-xs font-black text-gray-400 uppercase tracking-widest flex items-center gap-3">
                         <div className="w-1.5 h-1.5 bg-primary-600 rounded-full"></div>
                         Deskripsi Lengkap
                      </h4>
                      <div 
                        className="text-gray-600 font-medium leading-relaxed prose prose-indigo"
                        dangerouslySetInnerHTML={{ __html: product.description }}
                      />
                   </div>

                   {/* Main Action Call to Action */}
                   <div className="pt-8 mb-10 space-y-4">
                      <div className="flex flex-col sm:flex-row gap-4">
                        <Button 
                          size="xl" 
                          rounded="full" 
                          className="flex-1 shadow-2xl shadow-primary-200 py-7 text-xl flex items-center justify-center gap-4 group"
                          onClick={() => window.open(generateLink(), '_blank')}
                        >
                          Buka Link Program
                          <ArrowRight className="w-6 h-6 group-hover:translate-x-2 transition-transform scale-110" />
                        </Button>
                        
                        <Button
                          variant="outline"
                          size="xl"
                          rounded="full"
                          className={`sm:w-auto px-10 py-7 text-xl flex items-center justify-center gap-4 transition-all duration-300 ${copied ? 'bg-emerald-50 border-emerald-500 text-emerald-600' : ''}`}
                          onClick={() => {
                            navigator.clipboard.writeText(generateLink());
                            setCopied(true);
                            setTimeout(() => setCopied(false), 2000);
                          }}
                        >
                          {copied ? (
                            <>
                              <Check className="w-6 h-6 animate-bounce" />
                              Tersalin!
                            </>
                          ) : (
                            <>
                              <Copy className="w-6 h-6" />
                              Salin Link
                            </>
                          )}
                        </Button>
                      </div>
                      
                      <p className="text-center text-[10px] text-gray-400 font-black uppercase tracking-[0.2em] mt-2">
                         Link sudah menyertakan kode referal unik Anda
                      </p>
                   </div>
                </div>
             </div>
          </main>
      </div>
    </div>
  );
}


