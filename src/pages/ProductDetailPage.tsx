import { 
  ArrowLeft, 
  PackageCheck, 
  ArrowRight, 
  Tag, 
  ChevronRight,
  Sparkles,
  Award
} from 'lucide-react';
import { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { supabase } from '../lib/supabase';
import { useAuth } from '../hooks/useAuth';
import Button from '../components/Button';
import Sidebar from '../components/Sidebar';
import ProfileDropdown from '../components/ProfileDropdown';

export default function ProductDetailPage() {
  const { slug } = useParams();
  const navigate = useNavigate();
  const { user } = useAuth();
  const [product, setProduct] = useState<any>(null);
  const [loading, setLoading] = useState(true);
  const [username, setUsername] = useState('');

  useEffect(() => {
    const fetchData = async () => {
      try {
        setLoading(true);
        
        // 1. Fetch User for Link
        if (user) {
           const { data: profile } = await supabase
            .from('affiliate_profiles')
            .select('username')
            .eq('user_id', user.id)
            .single();
           setUsername(profile?.username || user.user_metadata?.username || user.email?.split('@')[0] || 'member');
        }

        // 2. Fetch all products and find the one with this slug
        const response = await fetch('https://lampungcerdas.com/api/produks', {
          method: 'GET',
          headers: {
            'x-api-key': import.meta.env.VITE_PRODUCTS_API_KEY,
            'Content-Type': 'application/json'
          }
        });
        const result = await response.json();
        const rawProducts = result.data.data || result.data || [];
        const found = rawProducts.find((p: any) => p.slug === slug || p.id.toString() === slug);
        
        if (found) {
            const price = parseFloat(found.harga_jual) || 0;
            setProduct({
                id: found.id,
                name: found.nama,
                category: found.kategori?.nama || found.kategori || 'Digital Course',
                price: price,
                commission: price * 0.12,
                image: found.gambar_url || (found.galeri_urls && found.galeri_urls.length > 0 ? found.galeri_urls[0] : 'https://images.unsplash.com/photo-1516321318423-f06f85e504b3?w=800&auto=format&fit=crop&q=60'),
                salesCount: found.jumlah_pembeli ? `${found.jumlah_pembeli} Terjual` : 'Baru Rilis',
                description: found.deskripsi || 'Program unggulan dari Lampung Cerdas untuk meningkatkan skill dan potensi masa depan.',
                apiLink: found.link_affiliate || '#'
            });
        }
      } catch (err) {
        console.error(err);
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
            <div className="w-12 h-12 border-4 border-primary-100 border-t-primary-600 rounded-full animate-spin"></div>
        </div>
      </div>
    );
  }

  if (!product) {
    return (
      <div className="min-h-screen bg-[#F8FAFC]">
        <Sidebar />
        <div className="xl:ml-72 flex flex-col items-center justify-center min-h-screen space-y-4">
            <h1 className="text-2xl font-black text-gray-900">Produk Tidak Ditemukan</h1>
            <Button onClick={() => navigate('/products')}>Kembali ke Katalog</Button>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[#F8FAFC]">
      <Sidebar />
      <div className="xl:ml-72 min-h-screen">
          <header className="sticky top-0 z-40 bg-white/80 backdrop-blur-md border-b border-gray-100 px-6 lg:px-10 py-4">
            <div className="max-w-6xl mx-auto flex items-center justify-between">
               <div className="flex items-center gap-4">
                  <button onClick={() => navigate('/products')} className="p-2.5 bg-white border border-gray-100 rounded-xl text-gray-400 hover:text-primary-600 hover:bg-primary-50 transition-all">
                    <ArrowLeft className="w-5 h-5" />
                  </button>
                  <h1 className="text-xl font-black text-gray-900 tracking-tight">Detail Produk</h1>
               </div>
               <ProfileDropdown />
            </div>
          </header>

          <main className="max-w-6xl mx-auto p-6 lg:p-10">
             <div className="grid lg:grid-cols-2 gap-12 items-start">
                <div className="space-y-6">
                   <div className="bg-white p-4 rounded-[3rem] shadow-sm border border-gray-50 overflow-hidden">
                      <img src={product.image} alt={product.name} className="w-full aspect-square object-cover rounded-[2.5rem]" />
                   </div>
                </div>

                <div className="space-y-8">
                   <div className="space-y-4">
                      <div className="inline-flex items-center gap-2 px-4 py-2 bg-primary-50 text-primary-600 rounded-full text-xs font-black uppercase tracking-widest border border-primary-100">
                         <Tag className="w-3.5 h-3.5" />
                         {product.category}
                      </div>
                      <h2 className="text-4xl lg:text-5xl font-black text-gray-900 leading-tight">
                         {product.name}
                      </h2>
                      <div className="flex items-center gap-2 text-gray-500 font-bold">
                         <PackageCheck className="w-5 h-5 text-emerald-500" />
                         {product.salesCount} Terjual oleh Affiliate
                      </div>
                   </div>

                   <div className="grid sm:grid-cols-2 gap-6">
                      <div className="bg-white p-6 rounded-[2rem] border border-gray-100 shadow-sm space-y-2">
                         <div className="text-[10px] font-black text-gray-400 uppercase tracking-widest">Harga Jual</div>
                         <div className="text-2xl font-black text-gray-900">{formatCurrency(product.price)}</div>
                      </div>
                      <div className="bg-gradient-to-br from-primary-600 to-primary-700 p-6 rounded-[2rem] text-white shadow-xl shadow-primary-100 space-y-2 relative overflow-hidden">
                         <div className="relative z-10">
                            <div className="text-[10px] font-black text-primary-100/70 uppercase tracking-widest">Komisi Anda (12%)</div>
                            <div className="text-2xl font-black">{formatCurrency(product.commission)}</div>
                         </div>
                         <Sparkles className="absolute bottom-[-10px] right-[-10px] w-20 h-20 text-white/10" />
                      </div>
                   </div>

                   <div className="bg-emerald-50 p-6 rounded-[2rem] border border-emerald-100 flex items-center justify-between gap-6">
                      <div className="space-y-1">
                        <div className="text-[10px] font-black text-emerald-600 uppercase tracking-widest flex items-center gap-1">
                           <Award className="w-3 h-3" />
                           Potensi Profit
                        </div>
                        <div className="text-lg font-black text-emerald-950">Terjual 10 = {formatCurrency(product.commission * 10)}</div>
                      </div>
                      <div className="text-emerald-300">
                         <ChevronRight className="w-8 h-8" />
                      </div>
                   </div>

                   <div className="space-y-4">
                      <h4 className="text-sm font-black text-gray-400 uppercase tracking-widest">Deskripsi Program</h4>
                      <p className="text-gray-600 font-medium leading-relaxed">
                        {product.description}
                      </p>
                   </div>

                   <div className="pt-6">
                      <Button 
                        size="xl" 
                        rounded="full" 
                        className="w-full shadow-2xl shadow-primary-200 py-6 text-lg flex items-center justify-center gap-3 group"
                        onClick={() => window.open(generateLink(), '_blank')}
                      >
                        Share Link & Raih Komisi
                        <ArrowRight className="w-6 h-6 group-hover:translate-x-2 transition-transform" />
                      </Button>
                   </div>
                </div>
             </div>
          </main>
      </div>
    </div>
  );
}
