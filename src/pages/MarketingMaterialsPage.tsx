import {
  ArrowLeft,
  Image as ImageIcon,
  FileText,
  Video,
  Share2,
  Download,
  ExternalLink,
  Sparkles,
  Zap,
  CheckCircle2,
  PlayCircle,
  Loader2,
  AlertCircle,
  Search,
  Youtube,
  Instagram,
  Smartphone
} from 'lucide-react';
import { useState, useEffect, useMemo } from 'react';
import { useNavigate } from 'react-router-dom';
import Button from '../components/Button';
import FloatingActionMenu from '../components/FloatingActionMenu';
import Sidebar from '../components/Sidebar';
import ProfileDropdown from '../components/ProfileDropdown';

export default function MarketingMaterialsPage() {
  const navigate = useNavigate();
  const [materials, setMaterials] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [activeFilter, setActiveFilter] = useState<string>('Semua');

  const filteredMaterials = useMemo(() => {
    if (activeFilter === 'Semua') return materials;
    return materials.filter(item => {
      const typeStr = item.type?.toLowerCase() || '';
      const titleStr = item.title?.toLowerCase() || '';

      if (activeFilter === 'Video') return typeStr === 'video' || titleStr.includes('video');
      if (activeFilter === 'Gambar') return titleStr.includes('banner') || titleStr.includes('gambar') || titleStr.includes('poster');
      if (activeFilter === 'Testimoni') return titleStr.includes('testimoni');
      if (activeFilter === 'Dokumen') return titleStr.includes('copywriting') || titleStr.includes('skrip') || titleStr.includes('caption');
      return true;
    });
  }, [materials, activeFilter]);

  const categories = [
    { id: 'Semua', label: 'Semua Aset', icon: <Sparkles className="w-4 h-4" /> },
    { id: 'Gambar', label: 'Gambar', icon: <ImageIcon className="w-4 h-4" /> },
    { id: 'Video', label: 'Video', icon: <Video className="w-4 h-4" /> },
    { id: 'Testimoni', label: 'Testimoni', icon: <Share2 className="w-4 h-4" /> },
    { id: 'Dokumen', label: 'Copywriting', icon: <FileText className="w-4 h-4" /> }
  ];

  useEffect(() => {
    const fetchMaterials = async () => {
      try {
        setLoading(true);
        const response = await fetch('https://lampungcerdas.com/api/marketing-materials', {
          method: 'GET',
          headers: {
            'x-api-key': import.meta.env.VITE_PRODUCTS_API_KEY,
            'Content-Type': 'application/json'
          }
        });

        const result = await response.json();

        if (result.success) {
          const rawData = result.data?.data || result.data || [];
          const formatted = rawData.map((item: any) => {
            let icon = <FileText className="w-5 h-5 text-amber-500" />;
            let bgColor = 'bg-amber-50';
            let coverImage = '/bahan marketing gemini.png';

            const titleStr = item.title?.toLowerCase() || '';
            const typeStr = item.type?.toLowerCase() || '';

            if (typeStr === 'video' || titleStr.includes('video')) {
              icon = <Video className="w-5 h-5 text-rose-500" />;
              bgColor = 'bg-rose-50';
              coverImage = '/ps.jpg';
            } else if (titleStr.includes('testimoni')) {
              icon = <Share2 className="w-5 h-5 text-emerald-500" />;
              bgColor = 'bg-emerald-50';
              coverImage = '/bahan marketing gemini.png';
            } else if (titleStr.includes('banner') || titleStr.includes('gambar') || titleStr.includes('poster') || titleStr.includes('story')) {
              icon = <ImageIcon className="w-5 h-5 text-blue-500" />;
              bgColor = 'bg-blue-50';
              coverImage = '/bahan marketing gemini.png';
            }

            // Custom overrides for specific materials
            if (titleStr.includes('public speaking') || titleStr.includes('promosi terbaru') || titleStr.includes('video iklan')) {
              coverImage = '/ps.jpg';
            }

            return {
              id: item.id,
              title: item.title,
              description: item.description || `Bahan promosi untuk produk ${item.produk?.nama || 'Lampung Cerdas'}`,
              icon: icon,
              itemCount: 'Lihat Asset',
              link: item.link,
              color: bgColor,
              tag: item.produk?.nama || 'General Marketing',
              cover: coverImage
            };
          });
          setMaterials(formatted);
        } else {
          setError('Gagal memuat bahan marketing.');
        }
      } catch (err) {
        console.error('Fetch error:', err);
        setError('Terjadi kesalahan koneksi.');
      } finally {
        setLoading(false);
      }
    };

    fetchMaterials();
  }, []);

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
              <div>
                <h1 className="text-xl font-black text-gray-900 leading-none">Bahan Marketing</h1>
                <p className="text-[10px] uppercase tracking-widest font-black text-gray-400 mt-1">Kit Promosi Affiliate</p>
              </div>
            </div>

            <div className="flex items-center gap-3">
              <div className="hidden sm:flex items-center gap-2 px-4 py-2 bg-primary-50 text-primary-600 rounded-full text-[10px] font-black uppercase tracking-widest border border-primary-100">
                <Sparkles className="w-3 h-3" />
                Live dari Pusat
              </div>
              <ProfileDropdown />
            </div>
          </div>
        </header>

        <main className="max-w-7xl mx-auto p-6 lg:p-10 space-y-12">
          {/* Hero Promotion */}
          <section className="relative overflow-hidden bg-gray-900 rounded-[3rem] p-10 lg:p-16 text-white shadow-2xl">
            <div className="relative z-10 grid lg:grid-cols-2 gap-12 items-center">
              <div className="space-y-8">
                <div className="inline-flex items-center gap-2 px-4 py-2 bg-primary-600 rounded-full text-xs font-black uppercase tracking-widest">
                  <Zap className="w-4 h-4 text-accent" />
                  Siap Jualan Sekarang
                </div>
                <h2 className="text-4xl lg:text-6xl font-black leading-tight">
                  Ledakkan Penjualan <br />
                  <span className="text-primary-500">Dengan Bahan Premium!</span>
                </h2>
                <p className="text-gray-400 text-lg font-medium leading-relaxed max-w-lg">
                  Gunakan aset marketing terbaru yang diambil langsung dari database pusat. Tinggal copy-paste dan raih komisi Anda.
                </p>
                <div className="flex flex-wrap gap-4">
                  <div className="flex items-center gap-2 text-sm font-bold text-gray-300">
                    <CheckCircle2 className="w-5 h-5 text-primary-500" /> Desain Pro
                  </div>
                  <div className="flex items-center gap-2 text-sm font-bold text-gray-300">
                    <CheckCircle2 className="w-5 h-5 text-primary-500" /> Real-time Sync
                  </div>
                  <div className="flex items-center gap-2 text-sm font-bold text-gray-300">
                    <CheckCircle2 className="w-5 h-5 text-primary-500" /> Assets Drive
                  </div>
                </div>
              </div>
              <div className="hidden lg:flex justify-center relative">
                <div className="w-72 h-72 bg-primary-600/20 rounded-full blur-[100px] absolute"></div>
                <div className="relative z-10 bg-white/5 backdrop-blur-xl p-8 rounded-[2.5rem] border border-white/10 shadow-2xl rotate-3 hover:rotate-0 transition-transform duration-500">
                  <div className="flex items-center gap-4 mb-6">
                    <div className="w-12 h-12 bg-white/10 rounded-xl flex items-center justify-center">
                      <ImageIcon className="w-8 h-8 text-primary-400" />
                    </div>
                    <div>
                      <div className="text-sm font-black">Aset Promosi Terbaru</div>
                      <div className="text-[10px] text-gray-500 font-bold uppercase tracking-widest">Update Otomatis</div>
                    </div>
                  </div>
                  <div className="w-full h-40 bg-gray-800 rounded-2xl overflow-hidden mb-6 relative group border border-white/5">
                    <img
                      src="/bahan marketing gemini.png"
                      alt="Latest Material"
                      className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-gray-900/90 to-transparent flex flex-col justify-end p-4">
                      <span className="px-2 py-0.5 w-fit bg-primary-500/80 backdrop-blur-md rounded-lg text-[9px] font-black uppercase tracking-widest shadow-lg">New</span>
                    </div>
                  </div>
                  <Button variant="glass" size="sm" className="w-full font-black text-[10px] uppercase tracking-widest border-white/10">
                    Akses Mudah
                  </Button>
                </div>
              </div>
            </div>

            <div className="absolute top-0 right-0 w-[400px] h-[400px] bg-primary-600 opacity-20 rounded-full blur-[120px] -translate-y-1/2 translate-x-1/2"></div>
          </section>

          {/* Marketing Materials Grid */}
          <section className="space-y-8 animate-fade-in">
            <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-6 px-4">
              <div className="space-y-1">
                <h3 className="text-2xl font-black text-gray-900 tracking-tight">Katalog Aset Promosi</h3>
                <p className="text-sm font-bold text-gray-500 italic">Klik kartu untuk mengunduh aset via Google Drive</p>
              </div>

              {/* Filter Tabs */}
              <div className="flex flex-wrap p-1.5 bg-white shadow-sm rounded-2xl w-fit border border-gray-100 overflow-x-auto max-w-full lg:max-w-none no-scrollbar">
                {categories.map((cat) => (
                  <button
                    key={cat.id}
                    onClick={() => setActiveFilter(cat.id)}
                    className={`flex items-center gap-2 px-6 py-3 rounded-xl text-[10px] font-black uppercase tracking-widest transition-all whitespace-nowrap ${activeFilter === cat.id
                        ? 'bg-primary-50 text-primary-600 shadow-sm border border-primary-100 scale-105'
                        : 'text-gray-400 hover:text-gray-600 hover:bg-gray-50'
                      }`}
                  >
                    {cat.icon}
                    {cat.label}
                  </button>
                ))}
              </div>
            </div>

            {loading ? (
              <div className="grid md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8">
                {[1, 2, 3, 4, 5, 6, 7, 8].map(i => (
                  <div key={i} className="bg-white rounded-[2.5rem] p-8 border border-gray-100 shadow-sm h-[320px] animate-pulse flex flex-col justify-between">
                    <div className="w-16 h-16 bg-gray-100 rounded-2xl mb-6"></div>
                    <div className="space-y-3">
                      <div className="w-3/4 h-6 bg-gray-100 rounded-lg"></div>
                      <div className="w-full h-12 bg-gray-50 rounded-lg"></div>
                    </div>
                    <div className="w-full h-10 bg-gray-50 rounded-xl mt-8"></div>
                  </div>
                ))}
              </div>
            ) : error ? (
              <div className="bg-red-50 p-12 rounded-[3.5rem] border border-red-100 text-center space-y-4 shadow-sm">
                <AlertCircle className="w-16 h-16 text-red-600 mx-auto" />
                <h3 className="text-xl font-black text-red-900">Koneksi Gagal</h3>
                <p className="text-red-700 font-medium">{error}</p>
                <Button variant="outline" onClick={() => window.location.reload()}>Coba Lagi</Button>
              </div>
            ) : (
              <div className="grid md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8">
                {filteredMaterials.map((item, idx) => (
                  <a
                    key={item.id}
                    href={item.link}
                    target="_blank"
                    rel="noopener noreferrer"
                    style={{ animationDelay: `${idx * 50}ms` }}
                    className="group relative bg-white rounded-[2.5rem] p-4 border border-gray-100 shadow-sm hover:shadow-2xl hover:shadow-primary-100/50 hover:-translate-y-2 transition-all duration-500 overflow-hidden flex flex-col justify-between h-full animate-fade-in-up"
                  >
                    <div className="flex flex-col flex-1">
                      <div className="relative w-full h-48 rounded-[2rem] overflow-hidden mb-6 shadow-sm group-hover:shadow-lg transition-all shrink-0">
                        <img
                          src={item.cover}
                          alt={item.title}
                          className="w-full h-full object-cover group-hover:scale-110 group-hover:rotate-1 transition-transform duration-700"
                          loading="lazy"
                        />
                        <div className="absolute inset-0 bg-gradient-to-t from-gray-900/60 via-gray-900/10 to-transparent"></div>

                        <div className="absolute top-4 right-4 z-10">
                          <div className={`w-10 h-10 ${item.color} rounded-xl flex items-center justify-center shadow-lg backdrop-blur-md bg-white/90`}>
                            {item.icon}
                          </div>
                        </div>
                      </div>

                      <div className="space-y-3 px-2 flex-1 flex flex-col">
                        <div className="flex items-center">
                          <span className="px-3 py-1 bg-gradient-to-r from-primary-50 to-primary-100/50 text-primary-700 text-[10px] font-black rounded-lg border border-primary-200 uppercase tracking-widest truncate max-w-full">
                            {item.tag}
                          </span>
                        </div>
                        <h4 className="text-lg font-black text-gray-900 group-hover:text-primary-600 transition-colors leading-snug line-clamp-2">
                          {item.title}
                        </h4>
                        <p className="text-sm text-gray-500 font-medium leading-relaxed line-clamp-2">
                          {item.description && item.description !== '-' && item.description !== 'undefined' ? item.description : 'Aset promosi siap pakai untuk membantu Anda meningkatkan penjualan produk.'}
                        </p>
                      </div>
                    </div>

                    <div className="mt-6 pt-6 border-t border-gray-50 flex items-center justify-between px-2 pb-2 z-10">
                      <div className="text-[10px] font-black text-gray-400 flex items-center gap-1.5 uppercase tracking-widest group-hover:text-primary-500 transition-colors">
                        <Download className="w-4 h-4" />
                        Akses File
                      </div>
                      <div className="w-10 h-10 bg-gray-50 rounded-[1rem] flex items-center justify-center text-gray-400 group-hover:bg-primary-500 group-hover:text-white transition-all shadow-sm group-hover:shadow-md group-hover:-rotate-12">
                        <ExternalLink className="w-4 h-4" />
                      </div>
                    </div>
                  </a>
                ))}

                {filteredMaterials.length === 0 && (
                  <div className="col-span-full py-24 text-center bg-gray-50 rounded-[3rem] border border-dashed border-gray-200">
                    <div className="flex flex-col items-center justify-center gap-6">
                      <div className="w-20 h-20 bg-gray-100 rounded-full flex items-center justify-center text-gray-300 shadow-inner">
                        <Search className="w-10 h-10" />
                      </div>
                      <div>
                        <h3 className="text-xl font-black text-gray-900">Aset Belum Tersedia</h3>
                        <p className="text-gray-500 font-medium mt-2">Coba filter kategori lain atau kembali nanti untuk update terbaru.</p>
                      </div>
                      <Button variant="outline" onClick={() => setActiveFilter('Semua')}>Reset Filter</Button>
                    </div>
                  </div>
                )}
              </div>
            )}
          </section>

          {/* Call to Action Helper */}
          <section className="bg-primary-600 rounded-[2.5rem] p-10 lg:p-14 text-white flex flex-wrap items-center justify-between gap-8 shadow-2xl shadow-primary-200">
            <div className="space-y-2 flex-1 min-w-[300px]">
              <h3 className="text-2xl font-black">Masih bingung cara menggunakannya?</h3>
              <p className="text-primary-100 font-medium">Ikuti saluran media sosial resmi Lampung Cerdas untuk panduan dan tips penjualan terbaru.</p>
            </div>
            <div className="flex items-center gap-3 flex-wrap">
              <a
                href="https://www.youtube.com/@lampungcerdas"
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-2 px-6 py-4 bg-white hover:bg-white/90 rounded-2xl text-gray-900 text-xs font-black transition-all group shadow-xl"
              >
                <Youtube className="w-5 h-5 text-red-600 group-hover:scale-110 transition-transform" />
                <span>YouTube</span>
              </a>
              <a
                href="https://www.instagram.com/lampungcerdas/"
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-2 px-6 py-4 bg-white hover:bg-white/90 rounded-2xl text-gray-900 text-xs font-black transition-all group shadow-xl"
              >
                <Instagram className="w-5 h-5 text-pink-600 group-hover:scale-110 transition-transform" />
                <span>Instagram</span>
              </a>
              <a
                href="https://www.tiktok.com/@lampungcerdas?is_from_webapp=1&sender_device=pc"
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-2 px-6 py-4 bg-white hover:bg-white/90 rounded-2xl text-gray-900 text-xs font-black transition-all group shadow-xl"
              >
                <Smartphone className="w-5 h-5 text-black group-hover:scale-110 transition-transform" />
                <span>TikTok</span>
              </a>
            </div>
          </section>
        </main>

        <footer className="p-10 border-t border-gray-100 text-center">
          <p className="text-sm text-gray-400 font-bold italic">
            Aset ini diambil secara real-time dari database Lampung Cerdas. <br />
            Gunakan untuk keperluan promosi resmi Anda.
          </p>
        </footer>
        <FloatingActionMenu />
      </div>
    </div>
  );
}
