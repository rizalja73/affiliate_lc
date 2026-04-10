import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { 
  X, 
  ShoppingBag, 
  Wallet, 
  FileText,
  LayoutDashboard,
  GraduationCap,
  User,
  Lock,
  LogOut
} from 'lucide-react';
import { supabase } from '../lib/supabase';

export default function FloatingActionMenu() {
  const navigate = useNavigate();
  const [isOpen, setIsOpen] = useState(false);

  const toggleMenu = () => setIsOpen(!isOpen);

  const actions = [
    { icon: <LayoutDashboard className="w-5 h-5" />, label: 'Dashboard Utama', desc: 'Ringkasan statistik & performa', color: 'bg-primary-600', shadow: 'shadow-primary-100', path: '/dashboard', category: 'Main' },
    { icon: <ShoppingBag className="w-5 h-5" />, label: 'Katalog Produk', desc: 'Cek produk & ambil link affiliate', color: 'bg-emerald-600', shadow: 'shadow-emerald-100', path: '/products', category: 'Main' },
    { icon: <FileText className="w-5 h-5" />, label: 'Asset Promosi', desc: 'Video iklan, story & copywriting', color: 'bg-blue-600', shadow: 'shadow-blue-100', path: '/marketing', category: 'Main' },
    { icon: <Wallet className="w-5 h-5" />, label: 'Keuangan & Sales', desc: 'Pantau saldo & riwayat penjualan', color: 'bg-orange-600', shadow: 'shadow-orange-100', path: '/earnings', category: 'Main' },
    { icon: <GraduationCap className="w-5 h-5" />, label: 'Academy Affiliate', desc: 'Belajar strategi penjualan cerdas', color: 'bg-purple-600', shadow: 'shadow-purple-100', path: '/academy', category: 'Main' },
    { icon: <User className="w-5 h-5" />, label: 'Profil Saya', desc: 'Pengaturan identitas & akun', color: 'bg-cyan-600', shadow: 'shadow-cyan-100', path: '/profile', category: 'Account' },
    { icon: <Lock className="w-5 h-5" />, label: 'Ganti Password', desc: 'Keamanan & akses masuk', color: 'bg-slate-600', shadow: 'shadow-slate-100', path: '/change-password', category: 'Account' },
    { icon: <LogOut className="w-5 h-5" />, label: 'Keluar Akun', desc: 'Sesi berakhir dengen aman', color: 'bg-red-600', shadow: 'shadow-red-100', action: 'logout', category: 'Account' },
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

  const mainActions = actions.filter(a => a.category === 'Main');
  const accountActions = actions.filter(a => a.category === 'Account');

  return (
    <div className="xl:hidden">
      {/* Menu Overlay (Fixed) */}
      <div className={`fixed inset-0 z-[110] transition-all duration-500 ${isOpen ? 'visible' : 'invisible'}`}>
        {/* Backdrop - Keep slightly dimmed but remove blur if requested "not transparent" (User usually means UI components) */}
        {/* I will keep the dimming for focus but remove the heavy blur from the layout if that's what's bothering them */}
        <div 
          className={`fixed inset-0 bg-gray-900/40 transition-all duration-700 ${isOpen ? 'opacity-100' : 'opacity-0'}`}
          onClick={() => setIsOpen(false)}
        />

        {/* Slide-in Menu Panel (Left Side) */}
        <div 
          className={`fixed top-0 left-0 h-full w-[85%] max-w-[340px] bg-white shadow-[10px_0_30px_rgba(0,0,0,0.1)] transition-all duration-500 ease-out transform flex flex-col ${isOpen ? 'translate-x-0' : '-translate-x-full'}`}
        >
          {/* Decorative elements - Subtle and not distracting */}
          <div className="absolute top-0 right-0 w-40 h-40 bg-gray-50 rounded-full -translate-y-1/2 translate-x-1/2 blur-[80px]"></div>

          {/* Menu Header - Solid Background */}
          <div className="p-8 border-b border-gray-100 relative bg-white">
            <div className="flex items-center justify-between gap-4">
              <div className="flex items-center gap-4">
                <div className="w-14 h-14 bg-white rounded-2xl flex items-center justify-center shadow-lg border border-gray-100 p-2">
                  <img src="/Logo LC.png" alt="Logo" className="w-full h-full object-contain" />
                </div>
                <div>
                  <div className="text-xl font-black text-gray-900 leading-none tracking-tight">Pusat Navigasi</div>
                  <div className="text-[10px] uppercase tracking-[0.2em] font-black text-primary-600 mt-2">Affiliate Elite v2.0</div>
                </div>
              </div>
              <button 
                onClick={() => setIsOpen(false)}
                className="w-10 h-10 flex items-center justify-center rounded-xl bg-gray-100 text-gray-900 hover:bg-gray-200 transition-colors border border-gray-200"
              >
                <X className="w-5 h-5" />
              </button>
            </div>
          </div>

          {/* Menu Items */}
          <div className="flex-1 overflow-y-auto p-6 space-y-10 custom-scrollbar relative bg-white">
            {/* Main Section */}
            <div className="space-y-4">
              <div className="text-[10px] font-black text-gray-900 uppercase tracking-[0.3em] px-4 mb-2 flex items-center gap-3">
                <span className="w-8 h-px bg-primary-600"></span>
                MENU UTAMA
              </div>
              {mainActions.map((action, index) => (
                <button
                  key={index}
                  onClick={() => handleAction(action)}
                  className="w-full flex items-center gap-5 p-5 rounded-[2rem] bg-gray-50 hover:bg-white hover:shadow-xl hover:shadow-gray-200/50 transition-all group relative overflow-hidden active:scale-95 border border-gray-100"
                  style={{ 
                    transitionDelay: `${isOpen ? index * 50 : 0}ms`,
                    opacity: isOpen ? 1 : 0,
                    transform: isOpen ? 'translateX(0)' : 'translateX(-40px)'
                  }}
                >
                  <div className={`w-14 h-14 ${action.color} rounded-2xl flex items-center justify-center text-white shadow-lg ${action.shadow} group-hover:scale-105 transition-all duration-500`}>
                    {action.icon}
                  </div>
                  <div className="text-left flex-1">
                    <div className="text-sm font-black text-gray-900 group-hover:text-primary-600 transition-colors tracking-tight">{action.label}</div>
                    <div className="text-[10px] text-gray-600 font-bold mt-1 line-clamp-1 group-hover:text-gray-900 transition-colors">{action.desc}</div>
                  </div>
                  <div className="w-8 h-8 rounded-full bg-white border border-gray-100 shadow-sm flex items-center justify-center text-primary-600">
                    <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M9 5l7 7-7 7" />
                    </svg>
                  </div>
                </button>
              ))}
            </div>

            {/* Account Section */}
            <div className="space-y-4">
              <div className="text-[10px] font-black text-gray-900 uppercase tracking-[0.3em] px-4 mb-2 flex items-center gap-3">
                <span className="w-8 h-px bg-primary-600"></span>
                AKUN & KEAMANAN
              </div>
              <div className="grid gap-3">
                {accountActions.map((action, index) => (
                  <button
                    key={index}
                    onClick={() => handleAction(action)}
                    className="w-full flex items-center gap-4 p-4 rounded-3xl bg-gray-50/50 hover:bg-white border border-gray-100 transition-all group active:scale-95"
                    style={{ 
                      transitionDelay: `${isOpen ? (index + mainActions.length) * 50 : 0}ms`,
                      opacity: isOpen ? 1 : 0,
                      transform: isOpen ? 'translateX(0)' : 'translateX(-40px)'
                    }}
                  >
                    <div className={`w-12 h-12 ${action.color} rounded-2xl flex items-center justify-center text-white shadow-md ${action.shadow}`}>
                      {action.icon}
                    </div>
                    <div className="text-left">
                      <div className="text-sm font-bold text-gray-700 group-hover:text-gray-900">{action.label}</div>
                      <div className="text-[9px] text-gray-500 font-medium">{action.desc}</div>
                    </div>
                  </button>
                ))}
              </div>
            </div>
          </div>

          {/* Menu Footer */}
          <div className="p-10 border-t border-gray-100 bg-white">
            <div className="space-y-4">
              <p className="text-[10px] font-black text-gray-400 text-center uppercase tracking-[0.2em] leading-relaxed">
                Butuh bantuan teknis? <br/>
                <span className="text-primary-600 cursor-pointer hover:underline">Hubungi Support Admin</span>
              </p>
              <div className="flex justify-center gap-4">
                <div className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse"></div>
                <div className="text-[8px] font-bold text-gray-400 uppercase tracking-widest">Sistem Online</div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Navbar Integrated Hamburger Trigger - Enhanced Clarity */}
      <button
        onClick={toggleMenu}
        className={`w-10 h-10 rounded-xl flex items-center justify-center transition-all duration-300 group ${isOpen ? 'opacity-0' : 'bg-gray-100 text-gray-900 border border-gray-200 shadow-md hover:bg-gray-200 active:scale-90'}`}
      >
        <div className="flex flex-col gap-1 items-center">
          <span className={`h-0.5 bg-gray-900 rounded-full transition-all duration-300 ${isOpen ? 'w-0' : 'w-5'}`}></span>
          <span className={`h-0.5 bg-primary-600 rounded-full transition-all duration-300 delay-75 ${isOpen ? 'w-0' : 'w-3'}`}></span>
          <span className={`h-0.5 bg-gray-900 rounded-full transition-all duration-300 delay-150 ${isOpen ? 'w-0' : 'w-5'}`}></span>
        </div>
      </button>
    </div>


  );
}
