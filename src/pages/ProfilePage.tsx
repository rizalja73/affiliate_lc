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
  Briefcase
} from 'lucide-react';
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Sidebar from '../components/Sidebar';
import ProfileDropdown from '../components/ProfileDropdown';
import { useAuth } from '../hooks/useAuth';
import Button from '../components/Button';

export default function ProfilePage() {
  const navigate = useNavigate();
  const { user } = useAuth();
  const [isSaving, setIsSaving] = useState(false);

  const displayName = user?.user_metadata?.first_name 
    ? `${user.user_metadata.first_name} ${user.user_metadata.last_name || ''}`
    : user?.email?.split('@')[0] || 'Member';

  const handleSave = () => {
    setIsSaving(true);
    setTimeout(() => setIsSaving(false), 2000);
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
                     <div className="text-2xl font-black text-primary-600 tracking-tight">Rp 2.450.000</div>
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
                        <label className="text-[10px] font-black text-gray-400 uppercase tracking-widest ml-1">Nama Lengkap</label>
                        <div className="relative group">
                           <User className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400 group-focus-within:text-primary-500 transition-colors" />
                           <input 
                              type="text" 
                              defaultValue={displayName}
                              className="w-full pl-12 pr-4 py-4 bg-gray-50 border border-gray-100 rounded-2xl text-sm font-bold text-gray-700 outline-none focus:bg-white focus:ring-2 focus:ring-primary-100 transition-all"
                           />
                        </div>
                     </div>

                     <div className="space-y-2">
                        <label className="text-[10px] font-black text-gray-400 uppercase tracking-widest ml-1">Nama Panggilan</label>
                        <div className="relative group">
                           <Briefcase className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400 group-focus-within:text-primary-500 transition-colors" />
                           <input 
                              type="text" 
                              defaultValue={displayName.split(' ')[0]}
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
                              className="w-full pl-12 pr-4 py-4 bg-gray-50 border border-gray-100 rounded-2xl text-sm font-bold text-gray-700 outline-none focus:bg-white focus:ring-2 focus:ring-primary-100 transition-all resize-none"
                              placeholder="Jl. Lampung Cerdas No. 1..."
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
           Layanan Bantuan: support@lampungcerdas.com
        </footer>
      </div>
    </div>
  );
}
