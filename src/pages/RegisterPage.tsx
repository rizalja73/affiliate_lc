import { useState } from 'react';
import { GraduationCap, User, Phone, MapPin, Calendar, Users, ArrowRight, ArrowLeft, Home, Globe, Building, Mail, Lock, AlertCircle, CheckCircle, Loader2 } from 'lucide-react';
import { Link, useNavigate } from 'react-router-dom';
import Button from '../components/Button';
import { registerAffiliate } from '../lib/auth';

const PROVINCES = [
  "Aceh", "Sumatera Utara", "Sumatera Barat", "Riau", "Kepulauan Riau", "Jambi", "Bengkulu", 
  "Sumatera Selatan", "Kepulauan Bangka Belitung", "Lampung", "Banten", "Jawa Barat", 
  "DKI Jakarta", "Jawa Tengah", "DI Yogyakarta", "Jawa Timur", "Bali", "Nusa Tenggara Barat", 
  "Nusa Tenggara Timur", "Kalimantan Barat", "Kalimantan Tengah", "Kalimantan Selatan", 
  "Kalimantan Timur", "Kalimantan Utara", "Sulawesi Utara", "Gorontalo", "Sulawesi Tengah", 
  "Sulawesi Barat", "Sulawesi Selatan", "Sulawesi Tenggara", "Maluku", "Maluku Utara", 
  "Papua", "Papua Barat"
];

const MONTHS = [
  "Januari", "Februari", "Maret", "April", "Mei", "Juni", 
  "Juli", "Agustus", "September", "Oktober", "November", "Desember"
];

export default function RegisterPage() {
  const navigate = useNavigate();

  // State untuk semua field form
  const [formData, setFormData] = useState({
    username: '',
    email: '',
    password: '',
    confirmPassword: '',
    firstName: '',
    lastName: '',
    whatsapp: '',
    province: '',
    regency: '',
    address: '',
    birthPlace: '',
    birthDay: '',
    birthMonth: '',
    birthYear: '',
    parentName: '',
    parentWhatsapp: '',
  });

  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => {
    setFormData(prev => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const validate = (): string | null => {
    if (!formData.username.trim()) return 'Nama anggota affiliate wajib diisi.';
    if (!formData.email.trim()) return 'Email wajib diisi.';
    if (!formData.password) return 'Password wajib diisi.';
    if (formData.password.length < 6) return 'Password minimal 6 karakter.';
    if (formData.password !== formData.confirmPassword) return 'Konfirmasi password tidak cocok.';
    if (!formData.firstName.trim()) return 'Nama depan wajib diisi.';
    if (!formData.whatsapp.trim()) return 'Nomor WhatsApp wajib diisi.';
    if (!formData.province) return 'Provinsi wajib dipilih.';
    if (!formData.address.trim()) return 'Alamat lengkap wajib diisi.';
    if (!formData.birthPlace.trim()) return 'Tempat lahir wajib diisi.';
    if (!formData.birthDay || !formData.birthMonth || !formData.birthYear) return 'Tanggal lahir lengkap wajib diisi.';
    return null;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    setSuccess('');

    const validationError = validate();
    if (validationError) {
      setError(validationError);
      window.scrollTo({ top: 0, behavior: 'smooth' });
      return;
    }

    setIsLoading(true);
    const result = await registerAffiliate({
      username: formData.username,
      email: formData.email,
      password: formData.password,
      firstName: formData.firstName,
      lastName: formData.lastName,
      whatsapp: formData.whatsapp,
      province: formData.province,
      regency: formData.regency,
      address: formData.address,
      birthPlace: formData.birthPlace,
      birthDay: Number(formData.birthDay),
      birthMonth: Number(formData.birthMonth),
      birthYear: Number(formData.birthYear),
      parentName: formData.parentName,
      parentWhatsapp: formData.parentWhatsapp,
    });
    setIsLoading(false);

    if (result.success) {
      setSuccess(result.message);
      window.scrollTo({ top: 0, behavior: 'smooth' });
    } else {
      setError(result.message);
      window.scrollTo({ top: 0, behavior: 'smooth' });
    }
  };

  const inputClass = "w-full px-6 py-4 bg-gray-50 border-2 border-transparent rounded-2xl focus:bg-white focus:border-primary-100 focus:ring-4 focus:ring-primary-50 transition-all outline-none font-medium text-gray-900 disabled:opacity-60";
  const labelClass = "text-xs font-black text-gray-700 uppercase tracking-widest ml-1";

  return (
    <div className="min-h-screen bg-[#fafafa] flex flex-col items-center justify-center p-6 lg:p-12 relative overflow-hidden">
      {/* Abstract Background Blobs */}
      <div className="absolute top-0 left-0 w-[600px] h-[600px] bg-primary-50 rounded-full blur-[120px] -z-10 opacity-60 -translate-y-1/2 -translate-x-1/2"></div>
      <div className="absolute bottom-0 right-0 w-[800px] h-[800px] bg-red-50 rounded-full blur-[150px] -z-10 opacity-40 translate-y-1/2 translate-x-1/2"></div>

      <div className="max-w-4xl w-full relative z-10">
        <div className="mb-10 flex items-center justify-between">
          <Link to="/" className="inline-flex items-center gap-4 group">
            <div className="w-12 h-12 bg-gradient-to-br from-primary-600 to-primary-800 rounded-xl flex items-center justify-center shadow-xl shadow-primary-200 group-hover:rotate-6 transition-transform">
              <GraduationCap className="w-7 h-7 text-white" />
            </div>
            <div className="hidden sm:block">
              <div className="text-xl font-black text-gray-900 tracking-tight">Lampung <span className="text-primary-600">Cerdas</span></div>
              <div className="text-[10px] uppercase tracking-widest font-black text-primary-500/80">Affiliate Elite</div>
            </div>
          </Link>
          <button 
            onClick={() => navigate(-1)}
            className="flex items-center gap-2 text-gray-500 hover:text-primary-600 font-bold transition-colors bg-white px-5 py-2.5 rounded-full shadow-sm border border-gray-100"
          >
            <ArrowLeft className="w-4 h-4" />
            <span>Kembali</span>
          </button>
        </div>

        <div className="bg-white rounded-[2.5rem] shadow-[0_20px_50px_rgba(0,0,0,0.06)] overflow-hidden border border-gray-50">
          <div className="grid lg:grid-cols-12">
            
            {/* Left Info Panel */}
            <div className="lg:col-span-4 bg-primary-600 p-10 lg:p-12 text-white relative flex flex-col justify-between">
              <div className="relative z-10">
                <h2 className="text-3xl font-black mb-6 leading-tight">Mulai Perjalanan Anda Disini.</h2>
                <div className="space-y-6 opacity-90">
                  <div className="flex gap-4">
                    <div className="w-10 h-10 bg-white/10 rounded-xl flex-shrink-0 flex items-center justify-center">
                      <Globe className="w-5 h-5" />
                    </div>
                    <p className="text-sm font-medium">Bergabung dengan jaringan edukasi terbesar.</p>
                  </div>
                  <div className="flex gap-4">
                    <div className="w-10 h-10 bg-white/10 rounded-xl flex-shrink-0 flex items-center justify-center">
                      <Building className="w-5 h-5" />
                    </div>
                    <p className="text-sm font-medium">Akses alat pemasaran eksklusif dan pelatihan.</p>
                  </div>
                </div>
              </div>

              <div className="mt-12 lg:mt-0 relative z-10 pt-10 border-t border-white/10">
                <p className="text-xs font-black uppercase tracking-widest text-primary-200 mb-2">Butuh bantuan?</p>
                <Link to="/" className="inline-flex items-center gap-2 font-bold hover:underline">
                  <Home className="w-4 h-4" />
                  Hubungi Support 24/7
                </Link>
              </div>

              {/* Decorative blobs */}
              <div className="absolute top-0 right-0 w-32 h-32 bg-white/10 rounded-full blur-2xl -translate-y-1/2 translate-x-1/2"></div>
              <div className="absolute bottom-0 left-0 w-24 h-24 bg-black/10 rounded-full blur-xl translate-y-1/2 -translate-x-1/2"></div>
            </div>

            {/* Right Form Panel */}
            <div className="lg:col-span-8 p-8 md:p-12 lg:p-16">
              <div className="mb-12">
                <h1 className="text-3xl font-black text-gray-900 mb-2">Formulir Pendaftaran</h1>
                <p className="text-gray-500 font-medium">Lengkapi data diri Anda untuk menjadi bagian dari Affiliate Elite.</p>
              </div>

              {/* Error Alert */}
              {error && (
                <div className="mb-8 flex items-center gap-3 bg-red-50 border border-red-100 text-red-700 rounded-2xl px-5 py-4 text-sm font-semibold">
                  <AlertCircle className="w-5 h-5 flex-shrink-0" />
                  <span>{error}</span>
                </div>
              )}

              {/* Success Alert */}
              {success && (
                <div className="mb-8 flex items-center gap-3 bg-green-50 border border-green-100 text-green-700 rounded-2xl px-5 py-4 text-sm font-semibold">
                  <CheckCircle className="w-5 h-5 flex-shrink-0" />
                  <span>{success}</span>
                </div>
              )}

              <form className="space-y-12" onSubmit={handleSubmit}>

                {/* Section 1: Informasi Akun */}
                <div className="space-y-8">
                  <div className="flex items-center gap-3 pb-2 border-b-2 border-primary-50">
                    <User className="w-5 h-5 text-primary-600" />
                    <h3 className="text-sm font-black text-gray-900 uppercase tracking-widest">Informasi Akun</h3>
                  </div>
                  
                  <div className="space-y-2">
                    <label htmlFor="reg-username" className={labelClass}>Nama Anggota Affiliate</label>
                    <input id="reg-username" name="username" type="text" placeholder="Contoh: Budi_Elite01" value={formData.username} onChange={handleChange} disabled={isLoading} className={inputClass} />
                  </div>

                  <div className="space-y-2">
                    <label htmlFor="reg-email" className={labelClass}>Email</label>
                    <div className="relative">
                      <Mail className="absolute left-5 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
                      <input id="reg-email" name="email" type="email" placeholder="nama@email.com" value={formData.email} onChange={handleChange} disabled={isLoading} className={`${inputClass} pl-14`} />
                    </div>
                  </div>

                  <div className="grid md:grid-cols-2 gap-6">
                    <div className="space-y-2">
                      <label htmlFor="reg-password" className={labelClass}>Password</label>
                      <div className="relative">
                        <Lock className="absolute left-5 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
                        <input id="reg-password" name="password" type="password" placeholder="Min. 6 karakter" value={formData.password} onChange={handleChange} disabled={isLoading} className={`${inputClass} pl-14`} />
                      </div>
                    </div>
                    <div className="space-y-2">
                      <label htmlFor="reg-confirm-password" className={labelClass}>Konfirmasi Password</label>
                      <div className="relative">
                        <Lock className="absolute left-5 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
                        <input id="reg-confirm-password" name="confirmPassword" type="password" placeholder="Ulangi password" value={formData.confirmPassword} onChange={handleChange} disabled={isLoading} className={`${inputClass} pl-14`} />
                      </div>
                    </div>
                  </div>

                  <div className="grid md:grid-cols-2 gap-6">
                    <div className="space-y-2">
                      <label htmlFor="reg-first-name" className={labelClass}>Nama Depan</label>
                      <input id="reg-first-name" name="firstName" type="text" placeholder="Nama Depan" value={formData.firstName} onChange={handleChange} disabled={isLoading} className={inputClass} />
                    </div>
                    <div className="space-y-2">
                      <label htmlFor="reg-last-name" className={labelClass}>Nama Belakang</label>
                      <input id="reg-last-name" name="lastName" type="text" placeholder="Nama Belakang" value={formData.lastName} onChange={handleChange} disabled={isLoading} className={inputClass} />
                    </div>
                  </div>

                  <div className="space-y-2">
                    <label htmlFor="reg-whatsapp" className={labelClass}>Nomor WhatsApp</label>
                    <div className="relative">
                      <Phone className="absolute left-5 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
                      <input id="reg-whatsapp" name="whatsapp" type="tel" placeholder="0812XXXXXXXX" value={formData.whatsapp} onChange={handleChange} disabled={isLoading} className={`${inputClass} pl-14`} />
                    </div>
                  </div>
                </div>

                {/* Section 2: Data Alamat */}
                <div className="space-y-8">
                  <div className="flex items-center gap-3 pb-2 border-b-2 border-primary-50">
                    <MapPin className="w-5 h-5 text-primary-600" />
                    <h3 className="text-sm font-black text-gray-900 uppercase tracking-widest">Domisili Asal</h3>
                  </div>

                  <div className="grid md:grid-cols-2 gap-6">
                    <div className="space-y-2">
                      <label htmlFor="reg-province" className={labelClass}>Provinsi Asal</label>
                      <select id="reg-province" name="province" value={formData.province} onChange={handleChange} disabled={isLoading} className={`${inputClass} appearance-none cursor-pointer`}>
                        <option value="">Pilih Provinsi</option>
                        {PROVINCES.map(p => <option key={p} value={p}>{p}</option>)}
                      </select>
                    </div>
                    <div className="space-y-2">
                      <label htmlFor="reg-regency" className={labelClass}>Nama Kabupaten</label>
                      <input id="reg-regency" name="regency" type="text" placeholder="Kabupaten / Kota" value={formData.regency} onChange={handleChange} disabled={isLoading} className={inputClass} />
                    </div>
                  </div>

                  <div className="space-y-2">
                    <label htmlFor="reg-address" className={labelClass}>Alamat Lengkap</label>
                    <textarea id="reg-address" name="address" placeholder="Nama Jalan, RT/RW, No. Rumah, Kecamatan..." value={formData.address} onChange={handleChange} disabled={isLoading} className={`${inputClass} min-h-[120px] resize-none`}></textarea>
                  </div>
                </div>

                {/* Section 3: Data Pribadi */}
                <div className="space-y-8">
                  <div className="flex items-center gap-3 pb-2 border-b-2 border-primary-50">
                    <Calendar className="w-5 h-5 text-primary-600" />
                    <h3 className="text-sm font-black text-gray-900 uppercase tracking-widest">Detail Pribadi</h3>
                  </div>

                  <div className="space-y-2">
                    <label htmlFor="reg-birth-place" className={labelClass}>Tempat Lahir</label>
                    <input id="reg-birth-place" name="birthPlace" type="text" placeholder="Kota Tempat Lahir" value={formData.birthPlace} onChange={handleChange} disabled={isLoading} className={inputClass} />
                  </div>

                  <div className="space-y-2">
                    <label className={labelClass}>Tanggal Lahir</label>
                    <div className="grid grid-cols-3 gap-4">
                      <select name="birthDay" value={formData.birthDay} onChange={handleChange} disabled={isLoading} className={`${inputClass} px-4 cursor-pointer`}>
                        <option value="">Hari</option>
                        {[...Array(31)].map((_, i) => <option key={i+1} value={i+1}>{i+1}</option>)}
                      </select>
                      <select name="birthMonth" value={formData.birthMonth} onChange={handleChange} disabled={isLoading} className={`${inputClass} px-4 cursor-pointer`}>
                        <option value="">Bulan</option>
                        {MONTHS.map((m, i) => <option key={m} value={i+1}>{m}</option>)}
                      </select>
                      <select name="birthYear" value={formData.birthYear} onChange={handleChange} disabled={isLoading} className={`${inputClass} px-4 cursor-pointer`}>
                        <option value="">Tahun</option>
                        {[...Array(60)].map((_, i) => {
                          const year = new Date().getFullYear() - 10 - i;
                          return <option key={year} value={year}>{year}</option>;
                        })}
                      </select>
                    </div>
                  </div>

                  <div className="pt-6">
                    <div className="flex items-center gap-3 pb-2 border-b-2 border-primary-50 mb-8">
                      <Users className="w-5 h-5 text-primary-600" />
                      <h3 className="text-sm font-black text-gray-900 uppercase tracking-widest">Data Orang Tua</h3>
                    </div>

                    <div className="grid md:grid-cols-2 gap-6">
                      <div className="space-y-2">
                        <label htmlFor="reg-parent-name" className={labelClass}>Nama Orang Tua</label>
                        <input id="reg-parent-name" name="parentName" type="text" placeholder="Nama Lengkap Ayah/Ibu" value={formData.parentName} onChange={handleChange} disabled={isLoading} className={inputClass} />
                      </div>
                      <div className="space-y-2">
                        <label htmlFor="reg-parent-wa" className={labelClass}>WhatsApp Orang Tua</label>
                        <div className="relative">
                          <Phone className="absolute left-5 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
                          <input id="reg-parent-wa" name="parentWhatsapp" type="tel" placeholder="08XXXXXXXXXX" value={formData.parentWhatsapp} onChange={handleChange} disabled={isLoading} className={`${inputClass} pl-14`} />
                        </div>
                      </div>
                    </div>
                  </div>
                </div>

                <div className="pt-10">
                  <Button id="register-submit" size="xl" rounded="full" className="w-full py-6 text-xl shadow-2xl shadow-primary-200 group" disabled={isLoading}>
                    {isLoading ? (
                      <>
                        <Loader2 className="mr-3 w-6 h-6 animate-spin" />
                        Mendaftarkan...
                      </>
                    ) : (
                      <>
                        Daftar Sekarang
                        <ArrowRight className="ml-3 w-6 h-6 group-hover:translate-x-2 transition-transform" />
                      </>
                    )}
                  </Button>
                  <p className="mt-6 text-center text-sm text-gray-500 font-bold">
                    Sudah punya akun? <Link to="/login" className="text-primary-600 hover:underline">Masuk disini</Link>
                  </p>
                </div>
              </form>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
