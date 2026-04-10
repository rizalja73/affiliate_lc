import { 
  ArrowLeft, 
  Search, 
  Play, 
  BookOpen, 
  Clock, 
  Award, 
  ChevronRight, 
  Lock, 
  CheckCircle2,
  Youtube,
  FileText,
  Loader2,
  AlertCircle
} from 'lucide-react';
import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import Button from '../components/Button';
import FloatingActionMenu from '../components/FloatingActionMenu';
import Sidebar from '../components/Sidebar';
import ProfileDropdown from '../components/ProfileDropdown';

export default function AcademyPage() {
  const navigate = useNavigate();
  const [activeCategory, setActiveCategory] = useState<'all' | 'modul' | 'video'>('all');
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [academies, setAcademies] = useState<any[]>([]);

  useEffect(() => {
    const fetchAcademies = async () => {
      try {
        setLoading(true);
        const response = await fetch('https://lampungcerdas.com/api/academies', {
          method: 'GET',
          headers: {
            'x-api-key': 'lc-api-key-2026',
            'Content-Type': 'application/json'
          }
        });

        const result = await response.json();

        if (result.success) {
          const rawData = result.data?.data || result.data || [];
          const formatted = rawData.map((item: any) => ({
            id: item.id,
            title: item.title,
            type: "video", // Default from API
            duration: "Tutorial",
            description: item.description || "Materi eksklusif Academy Affiliate Lampung Cerdas.",
            image: item.thumbnail_url || "https://images.unsplash.com/photo-1552664730-d307ca884978?w=800&auto=format&fit=crop&q=60",
            isPremium: false, // Default for now
            lessons: 1,
            link: item.video_url
          }));
          setAcademies(formatted);
        } else {
          setError('Gagal memuat materi academy.');
        }
      } catch (err) {
        console.error('Fetch error:', err);
        setError('Terjadi kesalahan koneksi.');
      } finally {
        setLoading(false);
      }
    };

    fetchAcademies();
  }, []);

  const filteredContent = activeCategory === 'all' 
    ? academies 
    : academies.filter(item => item.type === activeCategory);

  return (
    <div className="min-h-screen bg-[#F8FAFC]">
      <Sidebar />
      
      {/* Main Content Area */}
      <div className="xl:ml-72 min-h-screen flex flex-col">
        {/* Premium Header */}
        <header className="sticky top-0 z-40 bg-white/80 backdrop-blur-md border-b border-gray-100 px-6 lg:px-10 py-4">
        <div className="max-w-7xl mx-auto flex items-center justify-between gap-6">
          <div className="flex items-center gap-4">
            <FloatingActionMenu />
            <button 
              onClick={() => navigate('/dashboard')}
              className="hidden xl:flex items-center justify-center w-10 h-10 text-gray-400 hover:text-primary-600 hover:bg-primary-50 rounded-xl transition-all border border-gray-100 bg-white"
            >
              <ArrowLeft className="w-5 h-5" />
            </button>
            <div>
              <h1 className="text-xl font-black text-gray-900 leading-none">Academy Affiliate</h1>
              <p className="text-[10px] uppercase tracking-widest font-black text-gray-400 mt-1">Pusat Belajar Affiliate Pro</p>
            </div>
          </div>

          <div className="hidden lg:flex items-center bg-gray-100/50 rounded-2xl px-4 py-2 w-96 border border-gray-100 focus-within:bg-white focus-within:ring-2 focus-within:ring-primary-100 transition-all">
            <Search className="w-4 h-4 text-gray-400 mr-2" />
            <input type="text" placeholder="Cari materi belajar..." className="bg-transparent text-sm outline-none w-full font-medium" />
          </div>

          <div className="flex items-center gap-3">
             <div className="hidden sm:flex flex-col items-end">
                <div className="text-[10px] font-black text-gray-400 uppercase tracking-widest">Update Terakhir</div>
                <div className="text-sm font-black text-primary-600">Terbaru</div>
             </div>
             <ProfileDropdown />
          </div>
        </div>
      </header>

      <main className="max-w-7xl mx-auto p-6 lg:p-10">
        <div className="space-y-10">
          {/* Welcome Banner */}
          <section className="relative overflow-hidden bg-gradient-to-br from-gray-900 via-primary-900 to-primary-800 rounded-[3rem] p-10 lg:p-16 text-white shadow-2xl">
            <div className="relative z-10 grid lg:grid-cols-2 gap-12 items-center">
              <div className="space-y-8">
                <div className="inline-flex items-center gap-2 px-4 py-2 bg-white/10 backdrop-blur-md rounded-full text-xs font-black uppercase tracking-widest border border-white/20">
                  <Award className="w-3.5 h-3.5 text-yellow-400" />
                  Affiliate Pro Learning Path
                </div>
                <h2 className="text-4xl lg:text-5xl font-black leading-tight">
                  Tingkatkan Skill, <br />
                  <span className="text-primary-400">Lipat Gandakan Komisi!</span>
                </h2>
                <p className="text-lg text-primary-50/70 font-medium leading-relaxed max-w-lg">
                  Akses materi eksklusif Academy Affiliate yang diambil langsung dari database pusat Lampung Cerdas.
                </p>
                <div className="flex flex-wrap gap-4">
                   <div className="flex items-center gap-2 px-4 py-2 bg-black/20 rounded-xl border border-white/5">
                      <Play className="w-4 h-4 text-primary-400" />
                      <span className="text-sm font-bold">{academies.length}+ Materi Video</span>
                   </div>
                   <div className="flex items-center gap-2 px-4 py-2 bg-black/20 rounded-xl border border-white/5">
                      <BookOpen className="w-4 h-4 text-primary-400" />
                      <span className="text-sm font-bold">Akses Unlimited</span>
                   </div>
                </div>
              </div>

              <div className="hidden lg:block relative">
                 <div className="absolute inset-0 bg-primary-500/20 blur-[100px] rounded-full"></div>
                 <div className="relative bg-white/5 backdrop-blur-2xl p-8 rounded-[2.5rem] border border-white/10 shadow-2xl space-y-6">
                    <div className="flex items-center justify-between">
                       <span className="text-sm font-black uppercase tracking-widest text-primary-400">Sertifikat Tersedia</span>
                       <CheckCircle2 className="w-6 h-6 text-emerald-400" />
                    </div>
                    <div className="space-y-2">
                       <div className="h-2 w-full bg-white/10 rounded-full overflow-hidden">
                          <div className="h-full bg-primary-500 w-[100%]" />
                       </div>
                       <div className="flex justify-between text-[10px] font-black text-white/50 uppercase tracking-widest">
                          <span>Sistem Siap Digunakan</span>
                          <span>100%</span>
                       </div>
                    </div>
                    <Button variant="primary" className="w-full">Lihat Semua Materi</Button>
                 </div>
              </div>
            </div>
            
            <div className="absolute top-0 right-0 w-96 h-96 bg-primary-400/10 rounded-full blur-[120px] -translate-y-1/2 translate-x-1/2"></div>
            <div className="absolute bottom-0 left-0 w-64 h-64 bg-primary-600/10 rounded-full blur-[80px] translate-y-1/2 -translate-x-1/2"></div>
          </section>

          {/* Filter and Content Type */}
          <div className="flex flex-wrap items-center justify-between gap-6">
             <div className="flex p-1.5 bg-white rounded-2xl border border-gray-100 shadow-sm">
                {[
                  { id: 'all', label: 'Semua Materi', icon: <Layers className="w-4 h-4" /> },
                  { id: 'video', label: 'Video Tutorial', icon: <Youtube className="w-4 h-4" /> }
                ].map((cat) => (
                  <button
                    key={cat.id}
                    onClick={() => setActiveCategory(cat.id as any)}
                    className={`px-6 py-2.5 rounded-xl text-sm font-black transition-all flex items-center gap-2 ${activeCategory === cat.id ? 'bg-primary-600 text-white shadow-lg' : 'text-gray-500 hover:bg-gray-50'}`}
                  >
                    {cat.icon}
                    {cat.label}
                  </button>
                ))}
             </div>

             <div className="flex items-center gap-4">
                <span className="text-sm font-bold text-gray-400">Urutkan:</span>
                <select className="bg-white border border-gray-100 px-4 py-2.5 rounded-xl text-sm font-bold text-gray-700 outline-none focus:ring-2 focus:ring-primary-100">
                   <option>Terbaru</option>
                </select>
             </div>
          </div>

          {/* Academy Content Grid */}
          {loading ? (
             <div className="flex flex-col items-center justify-center py-32 bg-white rounded-[3rem] border border-gray-100">
                <Loader2 className="w-12 h-12 text-primary-600 animate-spin mb-4" />
                <p className="font-black text-gray-400 uppercase tracking-widest">Menyiapkan Materi...</p>
             </div>
          ) : error ? (
            <div className="bg-red-50 p-12 rounded-[3.5rem] border border-red-100 text-center space-y-4">
               <AlertCircle className="w-16 h-16 text-red-600 mx-auto" />
               <h3 className="text-xl font-black text-red-900">Gagal Memuat</h3>
               <p className="text-red-700 font-medium">{error}</p>
               <Button variant="outline" onClick={() => window.location.reload()}>Coba Lagi</Button>
            </div>
          ) : (
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
              {filteredContent.map((item) => (
                <div key={item.id} className="group bg-white rounded-[2.5rem] overflow-hidden border border-gray-100 shadow-sm hover:shadow-2xl hover:-translate-y-2 transition-all duration-500">
                  <div className="relative h-56 overflow-hidden">
                    <img src={item.image} alt={item.title} className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700" />
                    <div className="absolute inset-0 bg-black/20 group-hover:bg-black/40 transition-colors" />
                    
                    {/* Play Button Overlay */}
                    <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity">
                       <a href={item.link} target="_blank" rel="noopener noreferrer" className="bg-primary-600 p-4 rounded-full shadow-2xl text-white transform group-hover:scale-110 transition-transform">
                          <Play className="w-8 h-8 fill-current" />
                       </a>
                    </div>

                    <div className="absolute top-6 left-6 flex gap-2">
                      <div className={`px-4 py-2 rounded-xl text-[10px] font-black uppercase tracking-widest shadow-xl border border-white/20 backdrop-blur-md bg-blue-600/80 text-white`}>
                        {item.type}
                      </div>
                    </div>
                  </div>

                  <div className="p-8 space-y-6">
                    <div className="space-y-3">
                      <div className="flex items-center justify-between">
                         <div className="flex items-center gap-2 text-[10px] font-black text-gray-400 uppercase tracking-widest">
                            <Clock className="w-3.5 h-3.5" />
                            {item.duration}
                         </div>
                         <div className="flex items-center gap-2 text-[10px] font-black text-primary-500 uppercase tracking-widest">
                            <BookOpen className="w-3.5 h-3.5" />
                            Live Center
                         </div>
                      </div>
                      <h3 className="text-xl font-black text-gray-900 leading-tight group-hover:text-primary-600 transition-colors line-clamp-4 min-h-[5rem]">{item.title}</h3>
                      <p className="text-sm text-gray-500 font-medium leading-relaxed line-clamp-2">
                        {item.description}
                      </p>
                    </div>

                    <a 
                      href={item.link} 
                      target="_blank" 
                      rel="noopener noreferrer"
                      className="w-full py-4 rounded-2xl font-black text-sm flex items-center justify-center gap-2 transition-all bg-primary-50 text-primary-600 hover:bg-primary-600 hover:text-white shadow-sm"
                    >
                      Mulai Belajar
                      <ChevronRight className="w-4 h-4" />
                    </a>
                  </div>
                </div>
              ))}
              {academies.length === 0 && (
                <div className="col-span-full py-20 text-center text-gray-400 font-black uppercase tracking-widest italic">
                  Belum ada materi tersedia saat ini.
                </div>
              )}
            </div>
          )}

          {/* Need Help Section */}
          <section className="bg-white rounded-[2.5rem] p-10 lg:p-12 border border-gray-100 shadow-sm flex flex-wrap items-center justify-between gap-8">
             <div className="space-y-2">
                <h3 className="text-2xl font-black text-gray-900">Masih Butuh Bantuan?</h3>
                <p className="text-gray-500 font-medium">Tim mentor kamin siap membimbing perjalanan affiliate Anda.</p>
             </div>
             <div className="flex gap-4">
                <Button variant="outline" size="lg" rounded="full" className="border-gray-200">Buka Forum</Button>
                <Button variant="primary" size="lg" rounded="full" className="shadow-xl shadow-primary-200">Hubungi Mentor</Button>
             </div>
          </section>
        </div>
      </main>

        <footer className="max-w-7xl mx-auto p-10 text-center border-t border-gray-100 mt-auto">
          <p className="text-sm text-gray-400 font-bold">
            Materi ini disinkronkan langsung dari pusat Lampung Cerdas.
          </p>
        </footer>
      </div>

    </div>
  );
}

function Layers(props: React.SVGProps<SVGSVGElement>) {
  return (
    <svg
      {...props}
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
      <path d="m12.83 2.18a2 2 0 0 0-1.66 0L2.6 6.08a1 1 0 0 0 0 1.83l8.58 3.91a2 2 0 0 0 1.66 0l8.58-3.9a1 1 0 0 0 0-1.83Z" />
      <path d="m22 17.65-9.17 4.16a2 2 0 0 1-1.66 0L2 17.65" />
      <path d="m22 12.65-9.17 4.16a2 2 0 0 1-1.66 0L2 12.65" />
    </svg>
  );
}
