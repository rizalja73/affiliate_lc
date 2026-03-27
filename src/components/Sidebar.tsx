import {
  LayoutDashboard,
  ShoppingBag,
  Wallet,
  Image as ImageIcon,
  LogOut,
  GraduationCap
} from 'lucide-react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { logoutAffiliate } from '../lib/auth';

export default function Sidebar() {
  const location = useLocation();
  const navigate = useNavigate();

  const handleLogout = async () => {
    await logoutAffiliate();
    navigate('/login');
  };

  const menuItems = [
    {
      title: 'Academy Affiliate',
      icon: <GraduationCap className="w-5 h-5" />,
      link: '/academy'
    },
    {
      title: 'Cek Produk',
      icon: <ShoppingBag className="w-5 h-5" />,
      link: '/products'
    },
    {
      title: 'Cek Pendapatan',
      icon: <Wallet className="w-5 h-5" />,
      link: '/earnings'
    },
    {
      title: 'Bahan Marketing',
      icon: <ImageIcon className="w-5 h-5" />,
      link: '/marketing'
    }
  ];

  const isActive = (path: string) => location.pathname === path;

  return (
    <aside className="fixed left-0 top-0 h-screen w-72 bg-white border-r border-gray-100 hidden xl:flex flex-col z-50">
      <div className="p-8">
        <Link to="/" className="flex items-center gap-3">
          <div className="w-10 h-10 bg-white rounded-xl flex items-center justify-center shadow-lg shadow-primary-200 overflow-hidden">
            <img src="/Logo LC.png" alt="Lampung Cerdas" className="w-8 h-8 object-contain" />
          </div>
          <div>
            <div className="text-lg font-black text-gray-900 tracking-tight leading-none">Pusat <span className="text-primary-600">Affiliate</span></div>
            <div className="text-[10px] uppercase tracking-widest font-black text-primary-500/80 mt-1">Lampung Cerdas</div>
          </div>
        </Link>
      </div>

      <nav className="flex-1 px-6 space-y-2 mt-4">
        <div className="text-xs font-bold text-gray-400 uppercase tracking-[0.2em] px-4 mb-4">Main Menu</div>
        
        <Link 
          to="/dashboard" 
          className={`flex items-center gap-3 px-4 py-3.5 rounded-2xl font-bold transition-all ${isActive('/dashboard') ? 'bg-primary-50 text-primary-600' : 'text-gray-500 hover:bg-gray-50 hover:text-primary-600'}`}
        >
          <LayoutDashboard className="w-5 h-5" />
          Dashboard
        </Link>

        {menuItems.map((item, idx) => (
          <Link 
            key={idx} 
            to={item.link} 
            className={`flex items-center gap-3 px-4 py-3.5 rounded-2xl font-bold transition-all ${isActive(item.link) ? 'bg-primary-50 text-primary-600' : 'text-gray-500 hover:bg-gray-50 hover:text-primary-600'}`}
          >
            {item.icon}
            <span className="text-sm">{item.title}</span>
          </Link>
        ))}
      </nav>

      <div className="p-6 border-t border-gray-50">
        <button
          onClick={handleLogout}
          className="flex items-center gap-3 px-4 py-3.5 w-full text-red-500 hover:bg-red-50 rounded-2xl font-bold transition-all"
        >
          <LogOut className="w-5 h-5" />
          Keluar
        </button>
      </div>
    </aside>
  );
}
