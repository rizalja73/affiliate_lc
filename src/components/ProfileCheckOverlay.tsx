import { useState, useEffect, useCallback } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { supabase } from '../lib/supabase';
import { useAuth } from '../hooks/useAuth';
import { 
  AlertTriangle, 
  ArrowRight, 
  UserCircle2, 
  ShieldCheck, 
  Loader2,
  XCircle
} from 'lucide-react';
import Button from './Button';

export default function ProfileCheckOverlay() {
  const { user, loading: authLoading } = useAuth();
  const { pathname } = useLocation();
  const navigate = useNavigate();
  
  const [isProfileIncomplete, setIsProfileIncomplete] = useState(false);
  const [isChecking, setIsChecking] = useState(false);

  // Daftar halaman yang dikecualikan dari pemblokiran
  const isExcludedPage = useCallback((path: string) => {
    const excludedBase = ['/profile', '/login', '/register', '/', '/affiliate'];
    return excludedBase.some(base => path === base || path.startsWith('/affiliate/'));
  }, []);

  const checkProfileStatus = useCallback(async () => {
    if (!user) return;
    
    setIsChecking(true);
    
    try {
      const { data, error } = await supabase
        .from('affiliate_profiles')
        .select('whatsapp, address, username, status')
        .eq('user_id', user.id)
        .single();

      if (error) {
        if (error.code === 'PGRST116') {
          // Data profil tidak ada sama sekali
          setIsProfileIncomplete(true);
        } else {
          console.error('Error fetching profile:', error);
          // Jangan blokir jika error koneksi? Atau tetap blokir demi keamanan?
          // Kita asumsikan jika error, mungkin profil belum ready
        }
      } else if (data) {
        // Cek apakah field wajib masih kosong atau default '-'
        const isIncomplete = 
          !data.whatsapp || 
          data.whatsapp.trim() === '' ||
          !data.address || 
          data.address.trim() === '' || 
          data.address === '-' ||
          !data.username ||
          data.username.trim() === '';
        
        setIsProfileIncomplete(isIncomplete);
      }
    } catch (err) {
      console.error('Unexpected error in profile check:', err);
    } finally {
      setIsChecking(false);
    }
  }, [user]);

  // Efek: Cek saat user berubah atau pathname berubah
  useEffect(() => {
    if (authLoading) return;

    if (!user || isExcludedPage(pathname)) {
      setIsProfileIncomplete(false);
      return;
    }

    checkProfileStatus();
  }, [user, pathname, authLoading, isExcludedPage, checkProfileStatus]);

  // Loader state saat pengecekan pertama kali
  // Kita biarkan dashboard terlihat gelap (backdrop) saat mengecek
  
  const shouldBlock = !isExcludedPage(pathname) && user && isProfileIncomplete && !authLoading;

  if (!shouldBlock) return null;

  return (
    <div className="fixed inset-0 z-[99999] flex items-center justify-center p-4">
      {/* Backdrop semi-transparan dengan blur tinggi */}
      <div className="absolute inset-0 bg-gray-900/60 backdrop-blur-[12px] animate-fade-in-simple"></div>
      
      {/* Container Modal */}
      <div className="relative w-full max-w-2xl bg-white rounded-[3rem] shadow-[0_50px_100px_-20px_rgba(0,0,0,0.4)] overflow-hidden border border-white/20 flex flex-col md:flex-row animate-scale-up">
        
        {/* Visual Section - Sisi Kiri */}
        <div className="md:w-2/5 bg-gradient-to-br from-primary-600 via-primary-700 to-primary-900 p-8 lg:p-12 flex flex-col justify-between text-white relative">
          <div className="relative z-10">
             <div className="w-16 h-16 bg-white/20 backdrop-blur-md rounded-2xl flex items-center justify-center border border-white/20 shadow-xl mb-8">
                <UserCircle2 className="w-10 h-10" />
             </div>
             <div className="space-y-4">
                <div className="inline-flex items-center gap-2 px-3 py-1 bg-white/10 rounded-full text-[9px] font-black uppercase tracking-[0.2em] border border-white/10">
                  <ShieldCheck className="w-3.5 h-3.5 text-primary-200" />
                  Sistem Affiliate LC
                </div>
                <h3 className="text-3xl font-black leading-tight tracking-tight">
                  Lengkapi <br />Pendaftaran.
                </h3>
             </div>
          </div>
          
          <div className="relative z-10 text-primary-100/60 text-[10px] font-black uppercase tracking-widest">
            Level Akun: Member Baru
          </div>
          
          {/* Decorative Pattern */}
          <div className="absolute top-0 right-0 w-40 h-40 bg-white/5 rounded-full -translate-y-1/2 translate-x-1/2 blur-3xl"></div>
        </div>

        {/* Content Section - Sisi Kanan */}
        <div className="md:w-3/5 p-8 lg:p-12 flex flex-col justify-center space-y-10 bg-white relative">
          {isChecking && (
            <div className="absolute top-6 right-8 flex items-center gap-2 text-[10px] font-black text-primary-600 uppercase tracking-widest animate-pulse">
               <Loader2 className="w-3.5 h-3.5 animate-spin" />
               Sinkronisasi...
            </div>
          )}

          <div className="space-y-4">
            <div className="flex items-center gap-3 text-orange-600">
              <div className="w-10 h-10 bg-orange-50 rounded-xl flex items-center justify-center border border-orange-100">
                <AlertTriangle className="w-6 h-6" />
              </div>
              <span className="text-[10px] font-black uppercase tracking-[0.3em]">Peringatan Keamanan</span>
            </div>
            <h4 className="text-2xl font-black text-gray-900 tracking-tight leading-tight">
              Akses Fitur Terkunci
            </h4>
            <p className="text-gray-500 font-medium leading-relaxed">
              Mohon maaf, Anda wajib **mengisi profil (WhatsApp & Alamat)** terlebih dahulu sebelum dapat mengakses fitur Dashboard, Academy, dan Marketing Tool.
            </p>
          </div>

          <div className="space-y-6">
            <div className="space-y-3">
               {[
                 "Akses Materi Video Premium",
                 "Download Bahan Promosi HD",
                 "Pantau Komisi & Wallet"
               ].map((item, i) => (
                 <div key={i} className="flex items-center gap-3 text-sm font-bold text-gray-600">
                    <XCircle className="w-4 h-4 text-gray-300" />
                    {item}
                 </div>
               ))}
            </div>

            <Button 
              onClick={() => navigate('/profile')}
              className="w-full py-5 text-lg shadow-2xl shadow-primary-200 group flex items-center justify-center gap-3"
              size="lg"
              rounded="full"
            >
              Lengkapi Profil Sekarang
              <ArrowRight className="w-5 h-5 group-hover:translate-x-2 transition-transform" />
            </Button>
          </div>

          <div className="text-center">
            <button 
              onClick={() => supabase.auth.signOut()}
              className="text-[10px] font-black uppercase tracking-[0.2em] text-gray-400 hover:text-red-500 transition-colors"
            >
              Coba Akun Lain / Keluar
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
