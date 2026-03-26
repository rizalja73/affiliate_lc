import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { 
  X, 
  Plus,
  ShoppingBag, 
  Wallet, 
  BarChart3, 
  Image as ImageIcon,
  Home,
  GraduationCap
} from 'lucide-react';

export default function FloatingActionMenu() {
  const navigate = useNavigate();
  const [isOpen, setIsOpen] = useState(false);

  const toggleMenu = () => setIsOpen(!isOpen);

  const actions = [
    {
      icon: <ImageIcon className="w-5 h-5" />,
      label: 'Bahan Marketing',
      color: 'bg-gradient-to-tr from-orange-600 to-orange-400',
      shadow: 'shadow-orange-500/40',
      path: '/marketing'
    },
    {
      icon: <BarChart3 className="w-5 h-5" />,
      label: 'Data Penjualan',
      color: 'bg-gradient-to-tr from-purple-600 to-purple-400',
      shadow: 'shadow-purple-500/40',
      path: '/sales'
    },
    {
      icon: <Wallet className="w-5 h-5" />,
      label: 'Cek Pendapatan',
      color: 'bg-gradient-to-tr from-emerald-600 to-emerald-400',
      shadow: 'shadow-emerald-500/40',
      path: '/earnings'
    },
    {
      icon: <Home className="w-5 h-5" />,
      label: 'Dashboard Utama',
      color: 'bg-gradient-to-tr from-rose-600 to-rose-400',
      shadow: 'shadow-rose-500/40',
      path: '/dashboard'
    },
    {
      icon: <GraduationCap className="w-5 h-5" />,
      label: 'Academy Affiliate',
      color: 'bg-gradient-to-tr from-red-600 to-red-400',
      shadow: 'shadow-red-500/40',
      path: '/academy'
    },
    {
      icon: <ShoppingBag className="w-5 h-5" />,
      label: 'Produk LC',
      color: 'bg-gradient-to-tr from-blue-600 to-blue-400',
      shadow: 'shadow-blue-500/40',
      path: '/products'
    }
  ];

  return (
    <div className="fixed bottom-[96px] right-4 xl:hidden z-[100] flex flex-col items-end gap-3 pointer-events-none">
      {/* Backdrop for close on click outside */}
      <div 
        className={`fixed inset-0 bg-black/40 backdrop-blur-sm transition-all duration-300 pointer-events-auto ${isOpen ? 'opacity-100 visible z-[-1]' : 'opacity-0 invisible z-[-1]'}`}
        onClick={() => setIsOpen(false)}
      />

      {/* Menu Sub-buttons */}
      <div className={`flex flex-col items-end gap-3 transition-transform duration-300 pointer-events-auto relative z-10 ${isOpen ? 'translate-y-0' : 'translate-y-12 pointer-events-none'}`}>
        {actions.map((action, index) => (
          <div 
            key={index} 
            className="flex items-center gap-3 group cursor-pointer"
            onClick={() => {
              if (action.path) navigate(action.path);
              setIsOpen(false);
            }}
            style={{ transitionDelay: `${isOpen ? (actions.length - index) * 50 : 0}ms` }}
          >
            <span className={`px-4 py-2 bg-white/90 backdrop-blur-md text-gray-800 text-sm font-semibold rounded-xl shadow-lg border border-white/50 transition-all duration-300 ${isOpen ? 'translate-x-0 opacity-100 scale-100' : 'translate-x-8 opacity-0 scale-90'}`}>
              {action.label}
            </span>
            <button
              className={`w-14 h-14 ${action.color} text-white rounded-full flex items-center justify-center shadow-lg transition-all duration-300 ${isOpen ? 'opacity-100 scale-100' : 'opacity-0 scale-50'} hover:shadow-xl hover:-translate-y-1 active:scale-95 ${action.shadow}`}
            >
              {action.icon}
            </button>
          </div>
        ))}
      </div>

      {/* Main Floating Button */}
      <div className="relative pointer-events-auto mt-2">
        {/* Pulsating Ring (only when closed) */}
        {!isOpen && (
          <div className="absolute inset-0 bg-primary-600 rounded-full animate-ping opacity-25"></div>
        )}
        <button
          onClick={toggleMenu}
          className={`relative w-[64px] h-[64px] rounded-full flex items-center justify-center text-white shadow-2xl transition-all duration-500 overflow-hidden ${isOpen ? 'bg-gray-900 rotate-90 shadow-gray-900/40' : 'bg-gradient-to-tr from-primary-700 to-primary-500 shadow-primary-600/50 hover:scale-105 active:scale-95'}`}
        >
          <div className={`absolute inset-0 flex items-center justify-center transition-all duration-500 ${isOpen ? 'opacity-100 rotate-0 scale-100' : 'opacity-0 -rotate-90 scale-50'}`}>
            <X className="w-8 h-8 text-white" />
          </div>
          <div className={`absolute inset-0 flex items-center justify-center transition-all duration-500 ${isOpen ? 'opacity-0 rotate-90 scale-50' : 'opacity-100 rotate-0 scale-100'}`}>
            <Plus className="w-8 h-8 text-white" />
          </div>
        </button>
      </div>
    </div>
  );
}
