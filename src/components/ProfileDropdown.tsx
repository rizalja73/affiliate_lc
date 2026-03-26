import { 
  User, 
  LogOut, 
  ChevronDown, 
  Key,
  ShieldCheck,
  CreditCard
} from 'lucide-react';
import { useState, useRef, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { logoutAffiliate } from '../lib/auth';
import { useAuth } from '../hooks/useAuth';

export default function ProfileDropdown() {
  const [isOpen, setIsOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);
  const navigate = useNavigate();
  const { user } = useAuth();

  const handleLogout = async () => {
    await logoutAffiliate();
    navigate('/login');
  };

  const displayName = user?.user_metadata?.first_name 
    ? `${user.user_metadata.first_name} ${user.user_metadata.last_name || ''}`
    : user?.email?.split('@')[0] || 'Member';

  // Handle click outside to close
  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setIsOpen(false);
      }
    }
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  return (
    <div className="relative" ref={dropdownRef}>
      {/* Trigger Button */}
      <button 
        onClick={() => setIsOpen(!isOpen)}
        className="flex items-center gap-3 pl-3 md:pl-6 border-l border-gray-100 group hover:opacity-80 transition-all outline-none"
      >
        <div className="text-right hidden sm:block">
          <div className="text-sm font-black text-gray-900 group-hover:text-primary-600 transition-colors">{displayName}</div>
          <div className="text-[10px] font-bold text-emerald-500 uppercase tracking-wider flex items-center justify-end gap-1">
            <ShieldCheck className="w-3 h-3" />
            Affiliate Pro
          </div>
        </div>
        
        <div className="relative">
          <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-primary-100 to-primary-200 flex items-center justify-center font-black text-primary-700 shadow-sm group-hover:shadow-md transition-all border-2 border-transparent group-hover:border-primary-200">
            {displayName.substring(0, 2).toUpperCase()}
          </div>
          {/* Status Indicator */}
          <div className="absolute -bottom-1 -right-1 w-4 h-4 bg-emerald-500 rounded-full border-2 border-white flex items-center justify-center">
             <div className="w-1.5 h-1.5 bg-white rounded-full animate-pulse"></div>
          </div>
        </div>

        <ChevronDown className={`w-4 h-4 text-gray-400 group-hover:text-primary-500 transition-transform duration-300 ${isOpen ? 'rotate-180' : 'rotate-0'}`} />
      </button>

      {/* Dropdown Menu */}
      <div className={`absolute right-0 mt-4 w-72 bg-white rounded-[2rem] shadow-2xl border border-gray-100 overflow-hidden z-[100] transition-all duration-300 origin-top-right ${isOpen ? 'opacity-100 scale-100 translate-y-0' : 'opacity-0 scale-95 -translate-y-4 pointer-events-none'}`}>
        
        {/* User Info Header */}
        <div className="p-6 bg-gradient-to-br from-gray-50 to-white border-b border-gray-50 flex items-center gap-4">
           <div className="w-14 h-14 rounded-2xl bg-primary-600 flex items-center justify-center font-black text-white text-xl shadow-lg shadow-primary-200">
             {displayName.substring(0, 2).toUpperCase()}
           </div>
           <div>
              <div className="font-black text-gray-900 leading-none mb-1">{displayName}</div>
              <div className="text-xs font-bold text-gray-400 truncate max-w-[150px]">{user?.email}</div>
              <div className="mt-2 text-[9px] font-black uppercase tracking-widest bg-emerald-50 text-emerald-600 px-2 py-1 rounded-lg border border-emerald-100 inline-block">
                Member Sejak 2026
              </div>
           </div>
        </div>

        {/* Menu Items */}
        <div className="p-2">
          <button 
            onClick={() => { navigate('/profile'); setIsOpen(false); }}
            className="w-full flex items-center gap-3 px-4 py-3 text-gray-600 hover:bg-primary-50 hover:text-primary-600 rounded-xl font-bold transition-all group"
          >
            <div className="w-10 h-10 rounded-xl bg-gray-50 flex items-center justify-center group-hover:bg-primary-100 transition-colors">
              <User className="w-5 h-5" />
            </div>
            <div className="text-left">
               <div className="text-sm">Profil Anda</div>
               <div className="text-[10px] text-gray-400">Atur info pribadi & alamat</div>
            </div>
          </button>

          <button 
            onClick={() => { navigate('/change-password'); setIsOpen(false); }}
            className="w-full flex items-center gap-3 px-4 py-3 text-gray-600 hover:bg-primary-50 hover:text-primary-600 rounded-xl font-bold transition-all group"
          >
            <div className="w-10 h-10 rounded-xl bg-gray-50 flex items-center justify-center group-hover:bg-primary-100 transition-colors">
              <Key className="w-5 h-5" />
            </div>
            <div className="text-left">
               <div className="text-sm">Ganti Password</div>
               <div className="text-[10px] text-gray-400">Keamanan akun berkala</div>
            </div>
          </button>

          <button 
            onClick={() => { navigate('/earnings'); setIsOpen(false); }}
            className="w-full flex items-center gap-3 px-4 py-3 text-gray-600 hover:bg-primary-50 hover:text-primary-600 rounded-xl font-bold transition-all group"
          >
            <div className="w-10 h-10 rounded-xl bg-gray-50 flex items-center justify-center group-hover:bg-primary-100 transition-colors">
              <CreditCard className="w-5 h-5" />
            </div>
            <div className="text-left">
               <div className="text-sm">Rekening Penarikan</div>
               <div className="text-[10px] text-gray-400">Atur tujuan pencairan dana</div>
            </div>
          </button>
        </div>

        {/* Logout Section */}
        <div className="p-2 border-t border-gray-50 bg-gray-50/50">
          <button 
            onClick={handleLogout}
            className="w-full flex items-center gap-3 px-4 py-3 text-red-500 hover:bg-red-50 rounded-xl font-bold transition-all group"
          >
            <div className="w-10 h-10 rounded-xl bg-red-50 flex items-center justify-center group-hover:bg-red-100 transition-colors">
              <LogOut className="w-5 h-5" />
            </div>
            <div className="text-left">
               <div className="text-sm">Keluar Sesi</div>
               <div className="text-[10px] text-red-400/70">Sampai jumpa lagi!</div>
            </div>
          </button>
        </div>

      </div>
    </div>
  );
}
