import { 
  ArrowLeft, 
  User, 
  Mail, 
  Phone, 
  MapPin, 
  Calendar, 
  Camera, 
  Save,
  ShieldCheck,
  AtSign,
  CheckCircle2,
  AlertTriangle
} from 'lucide-react';
import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import Sidebar from '../components/Sidebar';
import ProfileDropdown from '../components/ProfileDropdown';
import { useAuth } from '../hooks/useAuth';
import { supabase } from '../lib/supabase';
import Button from '../components/Button';

export default function ProfilePage() {
  const navigate = useNavigate();
  const { user } = useAuth();
  const [isSaving, setIsSaving] = useState(false);
  const [saveStatus, setSaveStatus] = useState<{ type: 'success' | 'error', message: string } | null>(null);

  const [formData, setFormData] = useState({
    username: user?.user_metadata?.username || user?.email?.split('@')[0] || '',
    firstName: user?.user_metadata?.first_name || '',
    lastName: user?.user_metadata?.last_name || '',
    whatsapp: '',
    province: '-', // Default provided in SQL schema NOT NULL
    address: '',
    birthDate: ''
  });

  const [totalKomisi, setTotalKomisi] = useState<number>(0);
  const [isLoadingKomisi, setIsLoadingKomisi] = useState(true);

  const formatCurrency = (val: number) => {
    return new Intl.NumberFormat('id-ID', { style: 'currency', currency: 'IDR', minimumFractionDigits: 0 }).format(val);
  };

  // Fetch data on mount
  useEffect(() => {
    if (!user) return;

    const loadProfile = async () => {
      try {
        const { data, error } = await supabase
          .from('affiliate_profiles')
          .select('*')
          .eq('user_id', user.id)
          .single();

        if (error && error.code !== 'PGRST116') throw error; 

        let userUsername = user?.user_metadata?.username || user?.email?.split('@')[0] || 'member';

        if (data) {
          userUsername = data.username || userUsername;
          setFormData({
            username: data.username || user?.user_metadata?.username || '',
            firstName: data.first_name || user?.user_metadata?.first_name || '',
            lastName: data.last_name || user?.user_metadata?.last_name || '',
            whatsapp: data.whatsapp || '',
            province: data.province || '-',
            address: data.address || '',
            birthDate: data.birth_date || ''
          });
        }

        // Fetch commissions
        try {
          const response = await fetch(`https://lampungcerdas.com/api/produks/orders?referral=${userUsername}`, {
            method: 'GET',
            headers: {
              'x-api-key': import.meta.env.VITE_PRODUCTS_API_KEY,
              'Content-Type': 'application/json'
            }
          });
          const result = await response.json();
          if (result.success) {
            const rawOrders = result.data?.data || result.data || [];
            let komisi = 0;
            rawOrders.forEach((o: any) => {
              const status = (o.status || '').toLowerCase();
              if (status === 'success' || status === 'completed' || status === 'lunas' || status === 'sukses') {
                let komisiNum = 0;
                if (o.produk?.komisi) {
                  const rawKomisiStr = (o.produk.komisi || '0').toString();
                  komisiNum = parseInt(rawKomisiStr.replace(/[^0-9]/g, ''), 10) || 0;
                }
                komisi += komisiNum;
              }
            });
            setTotalKomisi(komisi);
          }
        } catch (err) {
          console.error('Error fetching commission:', err);
        } finally {
          setIsLoadingKomisi(false);
        }

      } catch (err: any) {
        console.error('Error loading profile:', err);
      }
    };

    loadProfile();
  }, [user]);

  const handleSave = async () => {
    if (!user) return;
    
    // Validasi Field NOT NULL
    if (!formData.firstName.trim() || !formData.whatsapp.trim() || !formData.address.trim()) {
       setSaveStatus({ type: 'error', message: 'Tolong lengkapi: Nama Depan, WhatsApp, dan Alamat.' });
       return;
    }

    setIsSaving(true);
    setSaveStatus(null);

    try {
      // 1. Upsert into affiliate_profiles table
      const { error: profileError } = await supabase
        .from('affiliate_profiles')
        .upsert({
          user_id: user.id,
          username: formData.username.trim(),
          first_name: formData.firstName.trim(),
          last_name: formData.lastName.trim() || null,
          whatsapp: formData.whatsapp.trim(),
          province: formData.province || '-',
          address: formData.address.trim(),
          birth_date: formData.birthDate || null
        }, { onConflict: 'user_id' });

      if (profileError) {
        console.error('Supabase Profile Error:', profileError);
        let errorMsg = profileError.message;
        if (errorMsg.includes('unique constraint')) {
          errorMsg = 'Username sudah digunakan oleh pengguna lain.';
        } else if (errorMsg.includes('violates check constraint')) {
          errorMsg = 'Data yang dimasukkan tidak valid.';
        }
        throw new Error(errorMsg);
      }

      // 2. Update Auth Metadata
      const { error: authError } = await supabase.auth.updateUser({
        data: {
          username: formData.username,
          first_name: formData.firstName,
          last_name: formData.lastName,
        }
      });

      if (authError) throw authError;

      setSaveStatus({ type: 'success', message: 'Profil berhasil diperbarui!' });
    } catch (err: any) {
      console.error('Update error:', err);
      setSaveStatus({ type: 'error', message: err.message || 'Terjadi kesalahan saat menyimpan.' });
    } finally {
      setIsSaving(false);
      setTimeout(() => setSaveStatus(null), 3000);
    }
  };

  const displayName = user?.user_metadata?.first_name 
    ? `${user.user_metadata.first_name} ${user.user_metadata.last_name || ''}`
    : user?.email?.split('@')[0] || 'Member';

  return (
    <div className="min-h-screen bg-[#F8FAFC]">
      <Sidebar />
      
      {/* Main Content Area */}
      <div className="xl:ml-72 min-h-screen flex flex-col">
        {/* Header */}
        <header className="sticky top-0 z-40 bg-white/80 backdrop-blur-md border-b border-gray-100 px-6 lg:px-10 py-4">
          <div className="max-w-7xl mx-auto flex items-center justify-between gap-6">
            <div className="flex items-center gap-4">
              <button 
                onClick={() => navigate(-1)}
                className="flex items-center justify-center w-10 h-10 text-gray-400 hover:text-primary-600 hover:bg-primary-50 rounded-xl transition-all border border-gray-100 bg-white"
              >
                <ArrowLeft className="w-5 h-5" />
              </button>
              <div>
                <h1 className="text-xl font-black text-gray-900 leading-none">Profil Saya</h1>
                <p className="text-[10px] uppercase tracking-widest font-black text-gray-400 mt-1">Informasi Akun Affiliate</p>
              </div>
            </div>
            <ProfileDropdown />
          </div>
        </header>

        <main className="max-w-4xl mx-auto p-6 lg:p-10 w-full">
          {/* Profile Completion Alert */}
          {(!formData.address || formData.address === '-' || !formData.whatsapp) && (
            <div className="mb-10 bg-gradient-to-r from-orange-500 to-orange-600 rounded-[2rem] p-8 text-white shadow-xl shadow-orange-200 relative overflow-hidden group">
              <div className="relative z-10 flex flex-col md:flex-row items-center justify-between gap-6">
                <div className="flex items-center gap-5">
                  <div className="w-14 h-14 bg-white/20 backdrop-blur-md rounded-2xl flex items-center justify-center border border-white/20">
                    <AlertTriangle className="w-8 h-8 text-white" />
                  </div>
                  <div>
                    <h3 className="text-xl font-black tracking-tight">Profil Anda Belum Lengkap</h3>
                    <p className="text-orange-100 text-sm font-medium">Lengkapi WhatsApp dan Alamat untuk membuka akses fitur Academy & Dashboard.</p>
                  </div>
                </div>
                <div className="bg-white/20 px-4 py-2 rounded-xl text-[10px] font-black uppercase tracking-widest border border-white/20">
                  Aksi Diperlukan
                </div>
              </div>
              {/* Decorative Circle */}
              <div className="absolute top-0 right-0 w-32 h-32 bg-white/10 rounded-full translate-x-10 -translate-y-10 blur-2xl group-hover:scale-150 transition-transform duration-700"></div>
            </div>
          )}

          {/* Status Message */}
          {saveStatus && (
            <div className={`mb-6 p-4 rounded-2xl border flex items-center gap-3 animate-fade-in ${saveStatus.type === 'success' ? 'bg-emerald-50 border-emerald-100 text-emerald-600' : 'bg-red-50 border-red-100 text-red-600'}`}>
              <div className={`w-8 h-8 rounded-lg flex items-center justify-center ${saveStatus.type === 'success' ? 'bg-emerald-100' : 'bg-red-100'}`}>
                {saveStatus.type === 'success' ? <CheckCircle2 className="w-5 h-5" /> : <AlertTriangle className="w-5 h-5" />}
              </div>
              <p className="text-sm font-bold tracking-tight">{saveStatus.message}</p>
            </div>
          )}

          <div className="space-y-10 animate-fade-in">
            {/* Profile Hero Card */}
            <section className="relative overflow-hidden bg-white rounded-[3rem] border border-gray-100 shadow-sm p-8 lg:p-12">
               <div className="relative z-10 flex flex-col md:flex-row items-center gap-10">
                  <div className="relative group">
                     <div className="w-32 h-32 rounded-[2.5rem] bg-gradient-to-br from-primary-500 to-primary-700 flex items-center justify-center text-white text-5xl font-black shadow-2xl shadow-primary-200 border-4 border-white overflow-hidden uppercase">
                       {displayName.substring(0, 2)}
                     </div>
                     <button className="absolute -bottom-2 -right-2 w-10 h-10 bg-white rounded-xl shadow-lg border border-gray-100 flex items-center justify-center text-primary-600 hover:bg-primary-50 transition-colors">
                        <Camera className="w-5 h-5" />
                     </button>
                  </div>

                  <div className="text-center md:text-left space-y-2">
                     <div className="inline-flex items-center gap-2 px-3 py-1 bg-emerald-50 text-emerald-600 rounded-lg text-[10px] font-black uppercase tracking-widest border border-emerald-100">
                        <ShieldCheck className="w-3 h-3" />
                        Verified Affiliate Pro
                     </div>
                     <h2 className="text-3xl font-black text-gray-900">{displayName}</h2>
                     <p className="text-gray-500 font-medium">Bergabung sejak {new Date().toLocaleDateString('id-ID', { month: 'long', year: 'numeric' })}</p>
                  </div>

                  <div className="md:ml-auto flex flex-col items-center md:items-end gap-2">
                     <div className="text-[10px] font-black text-gray-400 uppercase tracking-widest">Total Komisi</div>
                     <div className={`text-2xl font-black text-primary-600 tracking-tight ${isLoadingKomisi ? 'animate-pulse' : ''}`}>
                       {isLoadingKomisi ? 'Menghitung...' : formatCurrency(totalKomisi)}
                     </div>
                  </div>
               </div>
               
               {/* Decorative Background */}
               <div className="absolute top-0 right-0 w-64 h-64 bg-primary-50 rounded-full blur-[80px] -translate-y-1/2 translate-x-1/2 opacity-50"></div>
            </section>

            {/* Information Grid */}
            <div className="grid md:grid-cols-2 gap-8">
               {/* Personal Details */}
               <div className="bg-white rounded-[2.5rem] p-8 lg:p-10 border border-gray-100 shadow-sm space-y-8">
                  <div className="flex items-center gap-3 border-b border-gray-50 pb-6">
                     <div className="w-10 h-10 rounded-xl bg-primary-50 flex items-center justify-center text-primary-600">
                        <User className="w-5 h-5" />
                     </div>
                     <h3 className="text-lg font-black text-gray-900 uppercase tracking-tight">Data Pribadi</h3>
                  </div>

                  <div className="space-y-6">
                     <div className="space-y-2">
                        <label className="text-[10px] font-black text-gray-400 uppercase tracking-widest ml-1">Username</label>
                        <div className="relative group">
                           <AtSign className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400 group-focus-within:text-primary-500 transition-colors" />
                           <input 
                              type="text" 
                              value={formData.username}
                              disabled
                              className="w-full pl-12 pr-4 py-4 bg-gray-100 border border-gray-100 rounded-2xl text-sm font-bold text-gray-400 outline-none cursor-not-allowed font-mono"
                           />
                        </div>
                     </div>

                     <div className="space-y-2">
                        <label className="text-[10px] font-black text-gray-400 uppercase tracking-widest ml-1">Nama Depan</label>
                        <div className="relative group">
                           <User className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400 group-focus-within:text-primary-500 transition-colors" />
                           <input 
                              type="text" 
                              value={formData.firstName}
                              onChange={(e) => setFormData({...formData, firstName: e.target.value})}
                              className="w-full pl-12 pr-4 py-4 bg-gray-50 border border-gray-100 rounded-2xl text-sm font-bold text-gray-700 outline-none focus:bg-white focus:ring-2 focus:ring-primary-100 transition-all"
                           />
                        </div>
                     </div>

                     <div className="space-y-2">
                        <label className="text-[10px] font-black text-gray-400 uppercase tracking-widest ml-1">Nama Belakang</label>
                        <div className="relative group">
                           <User className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400 group-focus-within:text-primary-500 transition-colors" />
                           <input 
                              type="text" 
                              value={formData.lastName}
                              onChange={(e) => setFormData({...formData, lastName: e.target.value})}
                              className="w-full pl-12 pr-4 py-4 bg-gray-50 border border-gray-100 rounded-2xl text-sm font-bold text-gray-700 outline-none focus:bg-white focus:ring-2 focus:ring-primary-100 transition-all"
                           />
                        </div>
                     </div>

                     <div className="space-y-2">
                        <label className="text-[10px] font-black text-gray-400 uppercase tracking-widest ml-1">Tanggal Lahir</label>
                        <div className="relative group">
                           <Calendar className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400 group-focus-within:text-primary-500 transition-colors" />
                           <input 
                              type="date" 
                              value={formData.birthDate}
                              onChange={(e) => setFormData({...formData, birthDate: e.target.value})}
                              className="w-full pl-12 pr-4 py-4 bg-gray-50 border border-gray-100 rounded-2xl text-sm font-bold text-gray-700 outline-none focus:bg-white focus:ring-2 focus:ring-primary-100 transition-all"
                           />
                        </div>
                     </div>
                  </div>
               </div>

               {/* Contact & Location */}
               <div className="bg-white rounded-[2.5rem] p-8 lg:p-10 border border-gray-100 shadow-sm space-y-8">
                  <div className="flex items-center gap-3 border-b border-gray-50 pb-6">
                     <div className="w-10 h-10 rounded-xl bg-orange-50 flex items-center justify-center text-orange-600">
                        <Mail className="w-5 h-5" />
                     </div>
                     <h3 className="text-lg font-black text-gray-900 uppercase tracking-tight">Kontak & Alamat</h3>
                  </div>

                  <div className="space-y-6">
                     <div className="space-y-2">
                        <label className="text-[10px] font-black text-gray-400 uppercase tracking-widest ml-1">Email</label>
                        <div className="relative group">
                           <Mail className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400 group-focus-within:text-primary-500 transition-colors" />
                           <input 
                              type="email" 
                              defaultValue={user?.email}
                              disabled
                              className="w-full pl-12 pr-4 py-4 bg-gray-100 border border-gray-100 rounded-2xl text-sm font-bold text-gray-400 outline-none cursor-not-allowed"
                           />
                        </div>
                     </div>

                     <div className="space-y-2">
                        <label className="text-[10px] font-black text-gray-400 uppercase tracking-widest ml-1">Nomor WhatsApp</label>
                        <div className="relative group">
                           <Phone className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400 group-focus-within:text-primary-500 transition-colors" />
                           <input 
                              type="text" 
                              placeholder="628xxxxxxxx"
                              value={formData.whatsapp}
                              onChange={(e) => setFormData({...formData, whatsapp: e.target.value})}
                              className="w-full pl-12 pr-4 py-4 bg-gray-50 border border-gray-100 rounded-2xl text-sm font-bold text-gray-700 outline-none focus:bg-white focus:ring-2 focus:ring-primary-100 transition-all"
                           />
                        </div>
                     </div>

                     <div className="space-y-2">
                        <label className="text-[10px] font-black text-gray-400 uppercase tracking-widest ml-1">Alamat Lengkap</label>
                        <div className="relative group">
                           <MapPin className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400 group-focus-within:text-primary-500 transition-colors" />
                           <textarea 
                              rows={2}
                              value={formData.address}
                              onChange={(e) => setFormData({...formData, address: e.target.value})}
                              className="w-full pl-12 pr-4 py-4 bg-gray-50 border border-gray-100 rounded-2xl text-sm font-bold text-gray-700 outline-none focus:bg-white focus:ring-2 focus:ring-primary-100 transition-all resize-none"
                              placeholder="Jl. Bumi Manti III..."
                           />
                        </div>
                     </div>
                  </div>
               </div>
            </div>

            {/* Actions */}
            <div className="flex flex-wrap items-center justify-between gap-6 px-4">
               <button 
                  onClick={() => navigate(-1)}
                  className="px-8 py-4 text-gray-500 font-bold hover:text-primary-600 transition-colors"
               >
                  Batalkan Perubahan
               </button>
               <Button 
                onClick={handleSave}
                size="xl" 
                rounded="full" 
                className="min-w-[200px] shadow-2xl shadow-primary-200"
               >
                  {isSaving ? (
                     <div className="flex items-center gap-2">
                        <div className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin"></div>
                        Menyimpan...
                     </div>
                  ) : (
                     <div className="flex items-center gap-2">
                        <Save className="w-5 h-5" />
                        Simpan Profil
                     </div>
                  )}
               </Button>
            </div>
          </div>
        </main>

        <footer className="mt-auto p-10 text-center text-sm text-gray-400 font-bold border-t border-gray-100">
           Layanan Bantuan: it@lampungcerdas.com
        </footer>
      </div>
    </div>
  );
}
