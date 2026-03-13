
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
  PlayCircle
} from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import Button from '../components/Button';
import FloatingActionMenu from '../components/FloatingActionMenu';

export default function MarketingMaterialsPage() {
  const navigate = useNavigate();

  const materials = [
    {
      id: 1,
      title: 'Banner Promosi Instagram',
      description: 'Kumpulan banner feed dan story dengan desain high-conversion.',
      icon: <ImageIcon className="w-8 h-8 text-blue-500" />,
      itemCount: '24 Files',
      link: 'https://drive.google.com/drive/folders/example1',
      color: 'bg-blue-50',
      tag: 'Paling Laris'
    },
    {
      id: 2,
      title: 'Video Ads TikTok/Reels',
      description: 'Video vertikal pendek yang siap diunggah untuk viral marketing.',
      icon: <Video className="w-8 h-8 text-rose-500" />,
      itemCount: '12 Videos',
      link: 'https://drive.google.com/drive/folders/example2',
      color: 'bg-rose-50',
      tag: 'Trending'
    },
    {
      id: 3,
      title: 'Copywriting Scripts',
      description: 'Naskah jualan yang menghipnotis untuk WhatsApp dan email.',
      icon: <FileText className="w-8 h-8 text-amber-500" />,
      itemCount: '15 PDF',
      link: 'https://drive.google.com/drive/folders/example3',
      color: 'bg-amber-50',
      tag: 'Wajib Ada'
    },
    {
      id: 4,
      title: 'Testimoni Pembeli',
      description: 'Kumpulan screenshot dan video testimoni asli dari peserta.',
      icon: <Share2 className="w-8 h-8 text-emerald-500" />,
      itemCount: '50+ Assets',
      link: 'https://drive.google.com/drive/folders/example4',
      color: 'bg-emerald-50',
      tag: 'Trust Builder'
    }
  ];

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
              <h1 className="text-xl font-black text-gray-900 leading-none">Bahan Marketing</h1>
              <p className="text-[10px] uppercase tracking-widest font-black text-gray-400 mt-1">Kit Promosi Affiliate</p>
            </div>
          </div>
          <div className="hidden sm:flex items-center gap-2 px-4 py-2 bg-primary-50 text-primary-600 rounded-full text-[10px] font-black uppercase tracking-widest border border-primary-100">
            <Sparkles className="w-3 h-3" />
            Update Terakhir: Hari Ini
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
                Gunakan aset marketing yang sudah teruji menghasilkan jutaan rupiah. Tidak perlu pusing desain, tinggal copy-paste dan raih komisi Anda.
              </p>
              <div className="flex flex-wrap gap-4">
                <div className="flex items-center gap-2 text-sm font-bold text-gray-300">
                  <CheckCircle2 className="w-5 h-5 text-primary-500" /> Desain Pro
                </div>
                <div className="flex items-center gap-2 text-sm font-bold text-gray-300">
                  <CheckCircle2 className="w-5 h-5 text-primary-500" /> Copywriting HWG
                </div>
                <div className="flex items-center gap-2 text-sm font-bold text-gray-300">
                  <CheckCircle2 className="w-5 h-5 text-primary-500" /> Mudah Digunakan
                </div>
              </div>
            </div>
            <div className="hidden lg:flex justify-center relative">
               <div className="w-72 h-72 bg-primary-600/20 rounded-full blur-[100px] absolute"></div>
               <div className="relative z-10 bg-white/5 backdrop-blur-xl p-8 rounded-[2.5rem] border border-white/10 shadow-2xl rotate-3 hover:rotate-0 transition-transform duration-500">
                  <div className="flex items-center gap-4 mb-6">
                     <div className="w-12 h-12 bg-white/10 rounded-xl flex items-center justify-center">
                        <PlayCircle className="w-8 h-8 text-primary-400" />
                     </div>
                     <div>
                        <div className="text-sm font-black">Video Trailer Kursus</div>
                        <div className="text-[10px] text-gray-500 font-bold uppercase tracking-widest">Siap Post Reels/TikTok</div>
                     </div>
                  </div>
                  <div className="w-full h-40 bg-gray-800 rounded-2xl overflow-hidden mb-6 flex items-center justify-center border border-white/5">
                     <PlayCircle className="w-12 h-12 text-white/20" />
                  </div>
                  <Button variant="glass" size="sm" className="w-full font-black text-[10px] uppercase tracking-widest border-white/10">
                    Satu Klik Ke Drive
                  </Button>
               </div>
            </div>
          </div>
          
          {/* Background Decorative Blobs */}
          <div className="absolute top-0 right-0 w-[400px] h-[400px] bg-primary-600 opacity-20 rounded-full blur-[120px] -translate-y-1/2 translate-x-1/2"></div>
        </section>

        {/* Marketing Materials Grid */}
        <section className="space-y-8">
          <div className="flex items-center justify-between px-4">
             <h3 className="text-2xl font-black text-gray-900 tracking-tight">Katalog Aset Promosi</h3>
             <p className="hidden md:block text-sm font-bold text-gray-500 italic">Klik kartu untuk membuka folder Google Drive</p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
            {materials.map((item) => (
              <a 
                key={item.id} 
                href={item.link} 
                target="_blank" 
                rel="noopener noreferrer"
                className="group relative bg-white rounded-[2.5rem] p-8 border border-gray-100 shadow-sm hover:shadow-2xl hover:shadow-primary-100/50 hover:-translate-y-2 transition-all duration-500 overflow-hidden"
              >
                <div className={`${item.color} w-16 h-16 rounded-2xl flex items-center justify-center mb-6 group-hover:scale-110 group-hover:rotate-3 transition-transform duration-500`}>
                  {item.icon}
                </div>
                
                <div className="absolute top-8 right-8">
                   <span className="px-3 py-1 bg-primary-50 text-primary-600 text-[10px] font-black rounded-lg border border-primary-100 uppercase tracking-widest group-hover:bg-primary-600 group-hover:text-white transition-colors">
                     {item.tag}
                   </span>
                </div>

                <div className="space-y-3">
                  <h4 className="text-lg font-black text-gray-900 group-hover:text-primary-600 transition-colors leading-tight">{item.title}</h4>
                  <p className="text-sm text-gray-500 font-medium leading-relaxed">
                    {item.description}
                  </p>
                </div>

                <div className="mt-8 flex items-center justify-between">
                   <div className="text-xs font-black text-gray-400 flex items-center gap-1.5">
                      <Download className="w-3.5 h-3.5" />
                      {item.itemCount}
                   </div>
                   <div className="w-10 h-10 bg-gray-50 rounded-xl flex items-center justify-center text-gray-400 group-hover:bg-primary-50 group-hover:text-primary-600 transition-colors">
                      <ExternalLink className="w-5 h-5" />
                   </div>
                </div>

                {/* Decorative background element */}
                <div className="absolute -bottom-6 -right-6 w-24 h-24 bg-gray-50 rounded-full group-hover:scale-150 transition-transform duration-700 -z-10 group-hover:bg-primary-50"></div>
              </a>
            ))}
          </div>
        </section>

        {/* Call to Action Helper */}
        <section className="bg-primary-600 rounded-[2.5rem] p-10 lg:p-14 text-white flex flex-wrap items-center justify-between gap-8 shadow-2xl shadow-primary-200">
           <div className="space-y-2">
              <h3 className="text-2xl font-black">Masih bingung cara menggunakannya?</h3>
              <p className="text-primary-100 font-medium">Tonton panduan strategi jualan Lampung Cerdas untuk hasil maksimal.</p>
           </div>
           <Button variant="white" size="lg" className="px-10 font-black shadow-2xl group">
             Tonton Panduan
             <ArrowLeft className="ml-2 w-5 h-5 rotate-180 group-hover:translate-x-1 transition-transform" />
           </Button>
        </section>
      </main>

      {/* Footer Info */}
      <footer className="p-10 border-t border-gray-100 text-center">
          <p className="text-sm text-gray-400 font-bold italic">
            Aset ini hanya untuk penggunaan resmi Affiliate Lampung Cerdas. <br />
            Dilarang keras menyebarkan tanpa izin tertulis.
          </p>
      </footer>
      <FloatingActionMenu />
    </div>
  );
}
