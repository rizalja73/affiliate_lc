import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { 
  X, 
  ShoppingBag, 
  Wallet, 
  BarChart3, 
  Image as ImageIcon 
} from 'lucide-react';

export default function FloatingActionMenu() {
  const navigate = useNavigate();
  const [isOpen, setIsOpen] = useState(false);

  const toggleMenu = () => setIsOpen(!isOpen);

  const actions = [
    {
      icon: <ImageIcon className="w-5 h-5" />,
      label: 'Bahan Marketing',
      color: 'bg-orange-500',
      shadow: 'shadow-orange-200',
      path: '/marketing'
    },
    {
      icon: <BarChart3 className="w-5 h-5" />,
      label: 'Data Penjualan',
      color: 'bg-purple-500',
      shadow: 'shadow-purple-200',
      path: '/sales'
    },
    {
      icon: <Wallet className="w-5 h-5" />,
      label: 'Cek Pendapatan',
      color: 'bg-emerald-500',
      shadow: 'shadow-emerald-200',
      path: '/earnings'
    },
    {
      icon: <ShoppingBag className="w-5 h-5" />,
      label: 'Produk LC',
      color: 'bg-blue-500',
      shadow: 'shadow-blue-200',
      path: '/products'
    }
  ];

  return (
    <div className="fixed bottom-6 right-6 xl:hidden z-[100] flex flex-col items-end gap-4">
      {/* Backdrop for close on click outside (optional) */}
      {isOpen && (
        <div 
          className="fixed inset-0 bg-black/20 backdrop-blur-[2px] z-[-1]"
          onClick={() => setIsOpen(false)}
        />
      )}

      {/* Menu Sub-buttons */}
      <div className={`flex flex-col items-end gap-3 transition-all duration-300 ${isOpen ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10 pointer-events-none'}`}>
        {actions.map((action, index) => (
          <div 
            key={index} 
            className="flex items-center gap-3 group cursor-pointer"
            onClick={() => {
              if (action.path) navigate(action.path);
              setIsOpen(false);
            }}
          >
            <span className={`px-3 py-1.5 bg-white text-gray-700 text-xs font-bold rounded-lg shadow-lg border border-gray-100 transition-all duration-300 ${isOpen ? 'translate-x-0 opacity-100' : 'translate-x-4 opacity-0'}`}>
              {action.label}
            </span>
            <button
              className={`w-12 h-12 ${action.color} text-white rounded-full flex items-center justify-center shadow-xl ${action.shadow} group-hover:scale-110 active:scale-95 transition-all`}
            >
              {action.icon}
            </button>
          </div>
        ))}
      </div>

      {/* Main Floating Button */}
      <button
        onClick={toggleMenu}
        className={`w-16 h-16 rounded-full flex items-center justify-center text-white shadow-2xl transition-all duration-500 ${isOpen ? 'bg-gray-900 rotate-45 scale-110 shadow-gray-400' : 'bg-primary-600 rotate-0 shadow-primary-300 active:scale-90 hover:scale-105'}`}
      >
        {isOpen ? (
          <X className="w-8 h-8" />
        ) : (
          <img src="/src/components/public/Logo LC.png" alt="LC" className="w-10 h-10 object-contain" />
        )}
      </button>
    </div>
  );
}
