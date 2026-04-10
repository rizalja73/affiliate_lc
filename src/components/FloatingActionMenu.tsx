import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { createPortal } from 'react-dom';
import { 
  X, 
  ShoppingBag, 
  Wallet, 
  FileText,
  LayoutDashboard,
  GraduationCap,
  User,
  Lock,
  LogOut,
  Bell,
  Settings,
  HelpCircle,
  MessageCircle,
  ChevronRight,
  Sparkles,
  Search
} from 'lucide-react';
import { supabase } from '../lib/supabase';

export default function FloatingActionMenu() {
  const navigate = useNavigate();
  const [isOpen, setIsOpen] = useState(false);
  const [profile, setProfile] = useState<any>(null);

  useEffect(() => {
    const fetchProfile = async () => {
      const { data: { user } } = await supabase.auth.getUser();
      if (user) {
        const { data } = await supabase
          .from('affiliate_profiles')
          .select('*')
          .eq('user_id', user.id)
          .single();
        setProfile(data || user.user_metadata);
      }
    };
    fetchProfile();
  }, []);

  const toggleMenu = () => setIsOpen(!isOpen);

  const mainActions = [
    { icon: <LayoutDashboard className="w-6 h-6" />, label: 'Dashboard Utama', desc: 'Ringkasan statistik & performa', color: 'bg-indigo-600', path: '/dashboard' },
    { icon: <ShoppingBag className="w-6 h-6" />, label: 'Cek Produk', desc: 'Katalog program & link affiliate', color: 'bg-emerald-600', path: '/products' },
    { icon: <FileText className="w-6 h-6" />, label: 'Bahan Marketing', desc: 'Video, story & copywriting promosi', color: 'bg-blue-600', path: '/marketing' },
    { icon: <Wallet className="w-6 h-6" />, label: 'Cek Pendapatan', desc: 'Pantau saldo & riwayat komisi', color: 'bg-orange-600', path: '/earnings' },
    { icon: <GraduationCap className="w-6 h-6" />, label: 'Academy Affiliate', desc: 'Belajar strategi penjualan cerdas', color: 'bg-purple-600', path: '/academy' },
  ];

  const accountActions = [
    { icon: <User className="w-5 h-5" />, label: 'Profil Saya', path: '/profile' },
    { icon: <Lock className="w-5 h-5" />, label: 'Keamanan Akun', path: '/change-password' },
    { icon: <Settings className="w-5 h-5" />, label: 'Pengaturan', path: '/profile' },
  ];

  const handleAction = async (item: any) => {
    if (item.action === 'logout') {
      await supabase.auth.signOut();
      navigate('/login');
    } else if (item.path) {
      navigate(item.path);
    }
    setIsOpen(false);
  };

  const handleLogout = async () => {
    await supabase.auth.signOut();
    navigate('/login');
    setIsOpen(false);
  };

  const menuOverlay = (
    <div className={`fixed inset-0 z-[9999] transition-all duration-500 ${isOpen ? 'visible' : 'invisible'}`}>
      {/* Solid Dark Backdrop */}
      <div 
        className={`fixed inset-0 bg-gray-950/90 transition-all duration-500 ease-in-out ${isOpen ? 'opacity-100' : 'opacity-0'}`}
        onClick={() => setIsOpen(false)}
      />

      {/* Side Menu Panel */}
      <div 
        className={`fixed top-0 left-0 h-[100dvh] w-[88%] max-w-[400px] bg-white transition-all duration-500 ease-out transform flex flex-col shadow-[20px_0_50px_rgba(0,0,0,0.3)] ${isOpen ? 'translate-x-0' : '-translate-x-full'}`}
      >
        {/* Header Section: User Info & Brand */}
        <div className="p-8 pb-6 bg-primary-600 relative overflow-hidden shrink-0">
          <div className="absolute top-0 right-0 w-40 h-40 bg-white/10 rounded-full -translate-y-1/2 translate-x-1/2 blur-2xl"></div>
          <div className="absolute bottom-0 left-0 w-24 h-24 bg-primary-400/20 rounded-full translate-y-1/2 -translate-x-1/2"></div>
          
          <div className="relative z-10 flex items-center justify-between mb-8">
            <div className="bg-white p-2 rounded-2xl shadow-xl">
               <img src="/Logo LC.png" alt="LC Logo" className="w-10 h-10 object-contain" />
            </div>
            <button 
              onClick={() => setIsOpen(false)}
              className="w-11 h-11 flex items-center justify-center rounded-2xl bg-white/20 text-white hover:bg-white/30 transition-all border border-white/30 active:scale-95"
            >
              <X className="w-6 h-6" />
            </button>
          </div>

          <div className="relative z-10 flex items-center gap-5">
             <div className="w-16 h-16 rounded-[1.5rem] bg-white p-1 shadow-2xl relative">
                <img 
                  src={profile?.avatar_url || "https://api.dicebear.com/7.x/avataaars/svg?seed=Felix"} 
                  alt="User" 
                  className="w-full h-full rounded-[1.25rem] object-cover" 
                />
                <div className="absolute -bottom-1 -right-1 w-6 h-6 bg-emerald-500 border-4 border-white rounded-full"></div>
             </div>
             <div className="flex-1">
                <h3 className="text-xl font-black text-white leading-none mb-1">
                  {profile?.full_name || profile?.username || "Elite Member"}
                </h3>
                <div className="flex items-center gap-2">
                   <span className="text-[10px] font-black text-primary-100 uppercase tracking-widest px-2 py-0.5 bg-white/20 rounded-full">Affiliate Pro</span>
                   <Sparkles className="w-3 h-3 text-amber-300 fill-amber-300" />
                </div>
             </div>
          </div>
        </div>

        {/* Scrollable Content Area */}
        <div className="flex-1 overflow-y-auto custom-scrollbar flex flex-col bg-white">
          <div className="px-6 py-6 space-y-8">
            {/* Primary Navigation Section */}
            <div>
              <div className="text-[10px] font-black text-gray-400 uppercase tracking-[0.3em] ml-4 mb-4">Navigasi Utama</div>
              <div className="space-y-3">
                {mainActions.map((action, index) => (
                  <button
                    key={index}
                    onClick={() => handleAction(action)}
                    className="w-full flex items-center gap-5 p-4 rounded-[2rem] bg-gray-50 hover:bg-white hover:shadow-xl hover:shadow-gray-200/40 transition-all border border-gray-100 group active:scale-95"
                  >
                    <div className={`w-14 h-14 shrink-0 ${action.color} rounded-[1.25rem] flex items-center justify-center text-white shadow-xl shadow-gray-200 group-hover:scale-110 group-hover:rotate-6 transition-all duration-500`}>
                      {action.icon}
                    </div>
                    <div className="text-left flex-1 min-w-0">
                      <div className="text-sm font-black text-gray-900 group-hover:text-primary-600 transition-colors truncate">{action.label}</div>
                      <div className="text-[10px] text-gray-500 font-bold mt-1 line-clamp-2 leading-relaxed">{action.desc}</div>
                    </div>
                    <ChevronRight className="w-5 h-5 text-gray-300 group-hover:text-primary-600 group-hover:translate-x-1 transition-all shrink-0" />
                  </button>
                ))}
              </div>
            </div>

            {/* Account Section */}
            <div className="space-y-4">
               <div className="text-[10px] font-black text-gray-400 uppercase tracking-[0.3em] ml-4">Pengaturan</div>
               <div className="grid grid-cols-2 gap-3">
                  {accountActions.map((action, index) => (
                    <button
                      key={index}
                      onClick={() => handleAction(action)}
                      className="flex flex-col items-center gap-3 p-4 rounded-3xl bg-gray-50 border border-transparent hover:border-gray-200 hover:bg-white hover:shadow-lg transition-all group"
                    >
                      <div className="w-10 h-10 rounded-2xl bg-white flex items-center justify-center text-gray-400 group-hover:text-primary-600 shadow-sm transition-all border border-gray-100">
                        {action.icon}
                      </div>
                      <span className="text-[10px] font-black text-gray-700 group-hover:text-primary-700">{action.label}</span>
                    </button>
                  ))}
               </div>
            </div>
          </div>
        </div>

        {/* Panel Footer: Logout & Version */}
        <div className="p-6 border-t border-gray-100 bg-white shrink-0 mt-auto">
           <button 
              onClick={handleLogout}
              className="w-full flex items-center justify-center gap-2 p-3.5 rounded-2xl bg-red-50 text-red-600 hover:bg-red-600 hover:text-white transition-all group mb-4 font-black text-xs uppercase tracking-widest active:scale-95"
           >
              <LogOut className="w-4 h-4 group-hover:-translate-x-1 transition-transform" />
              Keluar Akun
           </button>
           <div className="flex items-center justify-center text-[9px] font-black text-gray-300 uppercase tracking-widest gap-2">
              <span>© Lampung Cerdas</span>
              <span className="w-1 h-1 bg-gray-300 rounded-full"></span>
              <span>v2.4</span>
           </div>
        </div>
      </div>
    </div>
  );

  return (
    <div className="xl:hidden relative flex items-center">
      {/* Navbar Integrated Hamburger Trigger - High Visibility */}
      <button
        onClick={toggleMenu}
        aria-label="Open Menu"
        className={`w-11 h-11 rounded-xl flex items-center justify-center transition-all duration-300 group shadow-md ${isOpen ? 'opacity-0 scale-90' : 'bg-primary-600 text-white hover:bg-primary-700 active:scale-95 border border-primary-500'}`}
      >
        <div className="flex flex-col gap-1 items-center">
          <span className="h-0.5 bg-white rounded-full transition-all duration-300 w-5 group-hover:w-4"></span>
          <span className="h-0.5 bg-white rounded-full transition-all duration-300 w-3 group-hover:w-5"></span>
          <span className="h-0.5 bg-white rounded-full transition-all duration-300 w-5 group-hover:w-4"></span>
        </div>
      </button>

      {/* Render overlay via Portal to escape stacking context issues */}
      {typeof document !== 'undefined' ? createPortal(menuOverlay, document.body) : menuOverlay}
    </div>
  );
}
