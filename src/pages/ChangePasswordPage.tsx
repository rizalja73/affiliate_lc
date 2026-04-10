import { 
  ArrowLeft, 
  Key, 
  Lock, 
  ShieldCheck, 
  ShieldAlert, 
  Eye, 
  EyeOff,
  CheckCircle2,
  AlertTriangle
} from 'lucide-react';
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Sidebar from '../components/Sidebar';
import ProfileDropdown from '../components/ProfileDropdown';
import FloatingActionMenu from '../components/FloatingActionMenu';
import Button from '../components/Button';
import { supabase } from '../lib/supabase';

export default function ChangePasswordPage() {
  const navigate = useNavigate();
  const [currentPassword, setCurrentPassword] = useState('');
  const [newPassword, setNewPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [status, setStatus] = useState<{ type: 'success' | 'error', message: string } | null>(null);
  const [showPassword, setShowPassword] = useState({
    current: false,
    new: false,
    confirm: false,
  });
  const [isChanging, setIsChanging] = useState(false);

  const toggleVisibility = (field: keyof typeof showPassword) => {
    setShowPassword(prev => ({ ...prev, [field]: !prev[field] }));
  };

  const handleChange = async () => {
    if (!newPassword || !confirmPassword) {
      setStatus({ type: 'error', message: 'Password baru tidak boleh kosong.' });
      return;
    }
    if (newPassword !== confirmPassword) {
      setStatus({ type: 'error', message: 'Konfirmasi password tidak cocok.' });
      return;
    }
    if (newPassword.length < 6) {
      setStatus({ type: 'error', message: 'Password minimal 6 karakter.' });
      return;
    }

    setIsChanging(true);
    setStatus(null);
    try {
      const { error } = await supabase.auth.updateUser({
        password: newPassword
      });
      if (error) throw error;
      setStatus({ type: 'success', message: 'Password berhasil diperbarui!' });
      setCurrentPassword('');
      setNewPassword('');
      setConfirmPassword('');
    } catch (err: any) {
      setStatus({ type: 'error', message: err.message || 'Gagal merubah password.' });
    } finally {
      setIsChanging(false);
      setTimeout(() => setStatus(null), 3000);
    }
  };

  return (
    <div className="min-h-screen bg-[#F8FAFC]">
      <Sidebar />
      
      {/* Main Content Area */}
      <div className="xl:ml-72 min-h-screen flex flex-col">
        {/* Header */}
        <header className="sticky top-0 z-40 bg-white/80 backdrop-blur-md border-b border-gray-100 px-6 lg:px-10 py-4">
          <div className="max-w-7xl mx-auto flex items-center justify-between gap-6">
            <div className="flex items-center gap-4">
              <FloatingActionMenu />
              <button 
                onClick={() => navigate(-1)}
                className="hidden xl:flex items-center justify-center w-10 h-10 text-gray-400 hover:text-primary-600 hover:bg-primary-50 rounded-xl transition-all border border-gray-100 bg-white"
              >
                <ArrowLeft className="w-5 h-5" />
              </button>
              <div>
                <h1 className="text-xl font-black text-gray-900 leading-none">Keamanan Akun</h1>
                <p className="text-[10px] uppercase tracking-widest font-black text-gray-400 mt-1">Ganti Password Secara Berkala</p>
              </div>
            </div>
            <ProfileDropdown />
          </div>
        </header>

        <main className="max-w-2xl mx-auto p-6 lg:p-20 w-full flex-grow flex items-center justify-center">
          <div className="w-full space-y-10 animate-fade-in">
            {/* Header Text */}
            <div className="text-center space-y-4">
               <div className="inline-flex items-center justify-center w-20 h-20 bg-primary-50 text-primary-600 rounded-[2rem] shadow-xl shadow-primary-200 border border-primary-100 mb-6">
                  <Key className="w-10 h-10" />
               </div>
               <h2 className="text-3xl font-black text-gray-900 tracking-tight">Perbarui Kata Sandi Anda</h2>
               <p className="text-gray-500 font-medium max-w-sm mx-auto">Pastikan Anda menggunakan kombinasi karakter, angka, dan simbol untuk keamanan maksimal.</p>
            </div>

            {/* Change Password Form */}
            <div className="bg-white rounded-[3rem] p-8 lg:p-12 border border-gray-100 shadow-sm space-y-8 relative overflow-hidden">
               {/* Status Message */}
               {status && (
                 <div className={`p-4 rounded-2xl border flex items-center gap-3 animate-fade-in ${status.type === 'success' ? 'bg-emerald-50 border-emerald-100 text-emerald-600' : 'bg-red-50 border-red-100 text-red-600'}`}>
                   {status.type === 'success' ? <CheckCircle2 className="w-5 h-5 flex-shrink-0" /> : <AlertTriangle className="w-5 h-5 flex-shrink-0" />}
                   <p className="text-xs font-bold">{status.message}</p>
                 </div>
               )}

               <div className="space-y-6">
                  {/* Current Password */}
                  <div className="space-y-2">
                     <label className="text-[10px] font-black text-gray-400 uppercase tracking-widest ml-1">Password Saat Ini</label>
                     <div className="relative group">
                        <Lock className="absolute left-5 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400 group-focus-within:text-primary-500 transition-colors" />
                        <input 
                           type={showPassword.current ? 'text' : 'password'} 
                           value={currentPassword}
                           onChange={(e) => setCurrentPassword(e.target.value)}
                           className="w-full pl-14 pr-12 py-5 bg-gray-50 border border-gray-100 rounded-3xl text-sm font-bold text-gray-700 outline-none focus:bg-white focus:ring-4 focus:ring-primary-50 focus:border-primary-100 transition-all shadow-inner"
                           placeholder="••••••••••••"
                        />
                        <button 
                           type="button"
                           onClick={() => toggleVisibility('current')}
                           className="absolute right-5 top-1/2 -translate-y-1/2 text-gray-400 hover:text-primary-600 transition-colors"
                        >
                           {showPassword.current ? <EyeOff className="w-5 h-5" /> : <Eye className="w-5 h-5" />}
                        </button>
                     </div>
                  </div>

                  {/* New Password */}
                  <div className="space-y-2">
                     <label className="text-[10px] font-black text-gray-400 uppercase tracking-widest ml-1">Password Baru</label>
                     <div className="relative group">
                        <ShieldCheck className="absolute left-5 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400 group-focus-within:text-primary-500 transition-colors" />
                        <input 
                           type={showPassword.new ? 'text' : 'password'} 
                           value={newPassword}
                           onChange={(e) => setNewPassword(e.target.value)}
                           className="w-full pl-14 pr-12 py-5 bg-gray-50 border border-gray-100 rounded-3xl text-sm font-bold text-gray-700 outline-none focus:bg-white focus:ring-4 focus:ring-primary-50 focus:border-primary-100 transition-all shadow-inner"
                           placeholder="Minimal 6 karakter"
                        />
                        <button 
                           type="button"
                           onClick={() => toggleVisibility('new')}
                           className="absolute right-5 top-1/2 -translate-y-1/2 text-gray-400 hover:text-primary-600 transition-colors"
                        >
                           {showPassword.new ? <EyeOff className="w-5 h-5" /> : <Eye className="w-5 h-5" />}
                        </button>
                     </div>
                  </div>

                  {/* Confirm Password */}
                  <div className="space-y-2">
                     <label className="text-[10px] font-black text-gray-400 uppercase tracking-widest ml-1">Konfirmasi Password Baru</label>
                     <div className="relative group">
                        <ShieldAlert className="absolute left-5 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400 group-focus-within:text-primary-500 transition-colors" />
                        <input 
                           type={showPassword.confirm ? 'text' : 'password'} 
                           value={confirmPassword}
                           onChange={(e) => setConfirmPassword(e.target.value)}
                           className="w-full pl-14 pr-12 py-5 bg-gray-50 border border-gray-100 rounded-3xl text-sm font-bold text-gray-700 outline-none focus:bg-white focus:ring-4 focus:ring-primary-50 focus:border-primary-100 transition-all shadow-inner"
                           placeholder="Ulangi password baru"
                        />
                        <button 
                           type="button"
                           onClick={() => toggleVisibility('confirm')}
                           className="absolute right-5 top-1/2 -translate-y-1/2 text-gray-400 hover:text-primary-600 transition-colors"
                        >
                           {showPassword.confirm ? <EyeOff className="w-5 h-5" /> : <Eye className="w-5 h-5" />}
                        </button>
                     </div>
                  </div>
               </div>

               {/* Password Strength Indicator (Visual only) */}
               <div className="space-y-4">
                  <div className="flex items-center gap-3">
                     {[1, 2, 3, 4].map(i => (
                        <div key={i} className={`h-1.5 flex-1 rounded-full ${i <= 3 ? 'bg-emerald-500 shadow-[0_0_10px_rgba(16,185,129,0.3)]' : 'bg-gray-100'}`} />
                     ))}
                  </div>
                  <p className="text-[10px] font-bold text-emerald-500 uppercase tracking-widest flex items-center gap-2">
                     <CheckCircle2 className="w-3.5 h-3.5" />
                     Kekuatan Keamanan: Sangat Kuat
                  </p>
               </div>

               <Button 
                onClick={handleChange}
                size="xl" 
                rounded="full" 
                className="w-full shadow-2xl shadow-primary-200 mt-4 group"
               >
                  {isChanging ? (
                     <div className="flex items-center gap-2">
                        <div className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin"></div>
                        Memproses...
                     </div>
                  ) : (
                     <div className="flex items-center gap-2">
                        <ShieldCheck className="w-5 h-5 group-hover:scale-110 transition-transform" />
                        Update Password Sekarang
                     </div>
                  )}
               </Button>

               {/* Hint Box */}
               <div className="pt-8 flex items-start gap-4 border-t border-gray-50">
                  <div className="w-10 h-10 bg-amber-50 rounded-xl flex items-center justify-center text-amber-500 flex-shrink-0 border border-amber-100 shadow-sm">
                     <AlertTriangle className="w-5 h-5" />
                  </div>
                  <p className="text-[10px] font-bold text-gray-400 uppercase tracking-wide leading-relaxed">
                     Jangan bagikan kata sandi Anda kepada siapa pun, termasuk staf Lampung Cerdas demi keamanan data Anda.
                  </p>
               </div>
            </div>
          </div>
        </main>
      </div>
    </div>
  );
}
