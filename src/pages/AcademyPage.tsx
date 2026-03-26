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
  FileText
} from 'lucide-react';
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Button from '../components/Button';
import FloatingActionMenu from '../components/FloatingActionMenu';
import Sidebar from '../components/Sidebar';
import ProfileDropdown from '../components/ProfileDropdown';

export default function AcademyPage() {
  const navigate = useNavigate();
  const [activeCategory, setActiveCategory] = useState<'all' | 'modul' | 'video'>('all');

  const academyContent = [
    {
      id: 1,
      title: "Mindset Jutawan Affiliate",
      type: "video",
      duration: "15:20",
      description: "Membangun pondasi mental yang kuat untuk menjadi super affiliate yang sukses.",
      image: "https://images.unsplash.com/photo-1552664730-d307ca884978?w=800&auto=format&fit=crop&q=60",
      isPremium: false,
      lessons: 1
    },
    {
      id: 2,
      title: "Strategi Copywriting yang Menjual",
      type: "modul",
      duration: "45 Halaman",
      description: "Panduan lengkap menulis kata-kata yang menghipnotis calon pembeli.",
      image: "https://images.unsplash.com/photo-1455390582262-044cdead277a?w=800&auto=format&fit=crop&q=60",
      isPremium: true,
      lessons: 12
    },
    {
      id: 3,
      title: "Optimasi Iklan Facebook & Instagram",
      type: "video",
      duration: "120:00",
      description: "Teknik beriklan murah dengan hasil konversi yang maksimal untuk Lampung Cerdas.",
      image: "https://images.unsplash.com/photo-1460925895917-afdab827c52f?w=800&auto=format&fit=crop&q=60",
      isPremium: true,
      lessons: 5
    },
    {
      id: 4,
      title: "Rahasia Personal Branding di TikTok",
      type: "video",
      duration: "45:30",
      description: "Cara cepat membangun audiens loyal yang siap membeli apa pun yang Anda tawarkan.",
      image: "https://images.unsplash.com/photo-1611162617213-7d7a39e9b1d7?w=800&auto=format&fit=crop&q=60",
      isPremium: false,
      lessons: 3
    },
    {
      id: 5,
      title: "E-Book: 100 Template Promosi",
      type: "modul",
      duration: "100 Template",
      description: "Kumpulan template siap pakai untuk berbagai platform media sosial.",
      image: "https://images.unsplash.com/photo-1434030216411-0b793f4b4173?w=800&auto=format&fit=crop&q=60",
      isPremium: true,
      lessons: 1
    },
    {
      id: 6,
      title: "Webinar: Closing Tanpa Tapi",
      type: "video",
      duration: "90:00",
      description: "Rekaman webinar eksklusif tentang teknik closing yang belum pernah dibagikan.",
      image: "https://images.unsplash.com/photo-1540575861501-7ad058de391c?w=800&auto=format&fit=crop&q=60",
      isPremium: true,
      lessons: 1
    }
  ];

  const filteredContent = activeCategory === 'all' 
    ? academyContent 
    : academyContent.filter(item => item.type === activeCategory);

  return (
    <div className="min-h-screen bg-[#F8FAFC]">
      <Sidebar />
      
      {/* Main Content Area */}
      <div className="xl:ml-72 min-h-screen flex flex-col">
        {/* Premium Header */}
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
                <div className="text-[10px] font-black text-gray-400 uppercase tracking-widest">Progress Belajar</div>
                <div className="text-sm font-black text-primary-600">45% Selesai</div>
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
                  Akses modul eksklusif dan video tutorial yang dirancang khusus untuk membantu Anda sukses di Affiliate Lampung Cerdas.
                </p>
                <div className="flex flex-wrap gap-4">
                   <div className="flex items-center gap-2 px-4 py-2 bg-black/20 rounded-xl border border-white/5">
                      <Play className="w-4 h-4 text-primary-400" />
                      <span className="text-sm font-bold">12+ Jam Video</span>
                   </div>
                   <div className="flex items-center gap-2 px-4 py-2 bg-black/20 rounded-xl border border-white/5">
                      <BookOpen className="w-4 h-4 text-primary-400" />
                      <span className="text-sm font-bold">8 Modul Utama</span>
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
                          <div className="h-full bg-primary-500 w-[65%]" />
                       </div>
                       <div className="flex justify-between text-[10px] font-black text-white/50 uppercase tracking-widest">
                          <span>Progress Saat Ini</span>
                          <span>65%</span>
                       </div>
                    </div>
                    <Button variant="primary" className="w-full">Lanjutkan Belajar</Button>
                 </div>
              </div>
            </div>
            
            {/* Background Decoration */}
            <div className="absolute top-0 right-0 w-96 h-96 bg-primary-400/10 rounded-full blur-[120px] -translate-y-1/2 translate-x-1/2"></div>
            <div className="absolute bottom-0 left-0 w-64 h-64 bg-primary-600/10 rounded-full blur-[80px] translate-y-1/2 -translate-x-1/2"></div>
          </section>

          {/* Filter and Content Type */}
          <div className="flex flex-wrap items-center justify-between gap-6">
             <div className="flex p-1.5 bg-white rounded-2xl border border-gray-100 shadow-sm">
                {[
                  { id: 'all', label: 'Semua Materi', icon: <Layers className="w-4 h-4" /> },
                  { id: 'modul', label: 'E-Book & Modul', icon: <FileText className="w-4 h-4" /> },
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
                   <option>Paling Populer</option>
                   <option>Durasi Terpendek</option>
                </select>
             </div>
          </div>

          {/* Academy Content Grid */}
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {filteredContent.map((item) => (
              <div key={item.id} className="group bg-white rounded-[2.5rem] overflow-hidden border border-gray-100 shadow-sm hover:shadow-2xl hover:-translate-y-2 transition-all duration-500">
                <div className="relative h-56 overflow-hidden">
                  <img src={item.image} alt={item.title} className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700" />
                  <div className="absolute inset-0 bg-black/20 group-hover:bg-black/40 transition-colors" />
                  
                  {/* Lock Overlay for Premium */}
                  {item.isPremium && (
                    <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity">
                       <div className="bg-white/20 backdrop-blur-md p-4 rounded-full border border-white/30 text-white">
                          <Lock className="w-8 h-8" />
                       </div>
                    </div>
                  )}

                  {/* Play Button Overlay for Videos */}
                  {item.type === 'video' && !item.isPremium && (
                    <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity">
                       <div className="bg-primary-600 p-4 rounded-full shadow-2xl text-white transform group-hover:scale-110 transition-transform">
                          <Play className="w-8 h-8 fill-current" />
                       </div>
                    </div>
                  )}

                  <div className="absolute top-6 left-6 flex gap-2">
                    <div className={`px-4 py-2 rounded-xl text-[10px] font-black uppercase tracking-widest shadow-xl border border-white/20 backdrop-blur-md ${item.type === 'video' ? 'bg-blue-600/80 text-white' : 'bg-emerald-600/80 text-white'}`}>
                      {item.type}
                    </div>
                    {item.isPremium && (
                      <div className="bg-yellow-500 px-4 py-2 rounded-xl text-[10px] font-black uppercase tracking-widest text-yellow-950 shadow-xl border border-yellow-400/50">
                        Premium
                      </div>
                    )}
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
                          {item.lessons} Lesson
                       </div>
                    </div>
                    <h3 className="text-xl font-black text-gray-900 leading-tight group-hover:text-primary-600 transition-colors">{item.title}</h3>
                    <p className="text-sm text-gray-500 font-medium leading-relaxed line-clamp-2">
                      {item.description}
                    </p>
                  </div>

                  <button className={`w-full py-4 rounded-2xl font-black text-sm flex items-center justify-center gap-2 transition-all ${item.isPremium ? 'bg-gray-100 text-gray-400 cursor-not-allowed group-hover:bg-gray-200' : 'bg-primary-50 text-primary-600 hover:bg-primary-600 hover:text-white shadow-sm'}`}>
                    {item.isPremium ? (
                      <>
                        <Lock className="w-4 h-4" />
                        Upgrade Pro Untuk Akses
                      </>
                    ) : (
                      <>
                        Mulai Belajar
                        <ChevronRight className="w-4 h-4" />
                      </>
                    )}
                  </button>
                </div>
              </div>
            ))}
          </div>

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
            Dapatkan materi terbaru setiap minggunya hanya di Academy Affiliate Pro.
          </p>
        </footer>
      </div>

      <FloatingActionMenu />
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
