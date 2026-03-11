import { GraduationCap, User, Phone, MapPin, Calendar, Users, ArrowRight, ArrowLeft, Home, Globe, Building } from 'lucide-react';
import { Link, useNavigate } from 'react-router-dom';
import Button from '../components/Button';

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

              {/* Decorative blobs inside the red panel */}
              <div className="absolute top-0 right-0 w-32 h-32 bg-white/10 rounded-full blur-2xl -translate-y-1/2 translate-x-1/2"></div>
              <div className="absolute bottom-0 left-0 w-24 h-24 bg-black/10 rounded-full blur-xl translate-y-1/2 -translate-x-1/2"></div>
            </div>

            {/* Right Form Panel */}
            <div className="lg:col-span-8 p-8 md:p-12 lg:p-16">
              <div className="mb-12">
                <h1 className="text-3xl font-black text-gray-900 mb-2">Formulir Pendaftaran</h1>
                <p className="text-gray-500 font-medium">Lengkapi data diri Anda untuk menjadi bagian dari Affiliate Elite.</p>
              </div>

              <form className="space-y-12">
                {/* Section 1: Informasi Affiliate */}
                <div className="space-y-8">
                  <div className="flex items-center gap-3 pb-2 border-b-2 border-primary-50">
                    <User className="w-5 h-5 text-primary-600" />
                    <h3 className="text-sm font-black text-gray-900 uppercase tracking-widest">Informasi Akun</h3>
                  </div>
                  
                  <div className="grid md:grid-cols-1 gap-6">
                    <div className="space-y-2">
                       <label className="text-xs font-black text-gray-700 uppercase tracking-widest ml-1">Nama Anggota Affiliate</label>
                       <input 
                         type="text" 
                         placeholder="Contoh: Budi_Elite01" 
                         className="w-full px-6 py-4 bg-gray-50 border-2 border-transparent rounded-2xl focus:bg-white focus:border-primary-100 focus:ring-4 focus:ring-primary-50 transition-all outline-none font-medium text-gray-900"
                       />
                    </div>
                  </div>

                  <div className="grid md:grid-cols-2 gap-6">
                    <div className="space-y-2">
                       <label className="text-xs font-black text-gray-700 uppercase tracking-widest ml-1">Nama Depan</label>
                       <input 
                         type="text" 
                         placeholder="Nama Depan" 
                         className="w-full px-6 py-4 bg-gray-50 border-2 border-transparent rounded-2xl focus:bg-white focus:border-primary-100 focus:ring-4 focus:ring-primary-50 transition-all outline-none font-medium text-gray-900"
                       />
                    </div>
                    <div className="space-y-2">
                       <label className="text-xs font-black text-gray-700 uppercase tracking-widest ml-1">Nama Belakang</label>
                       <input 
                         type="text" 
                         placeholder="Nama Belakang" 
                         className="w-full px-6 py-4 bg-gray-50 border-2 border-transparent rounded-2xl focus:bg-white focus:border-primary-100 focus:ring-4 focus:ring-primary-50 transition-all outline-none font-medium text-gray-900"
                       />
                    </div>
                  </div>

                  <div className="space-y-2">
                    <label className="text-xs font-black text-gray-700 uppercase tracking-widest ml-1">Nomor WhatsApp</label>
                    <div className="relative">
                      <Phone className="absolute left-5 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
                      <input 
                        type="tel" 
                        placeholder="0812XXXXXXXX" 
                        className="w-full pl-14 pr-6 py-4 bg-gray-50 border-2 border-transparent rounded-2xl focus:bg-white focus:border-primary-100 focus:ring-4 focus:ring-primary-50 transition-all outline-none font-medium text-gray-900"
                      />
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
                        <label className="text-xs font-black text-gray-700 uppercase tracking-widest ml-1">Provinsi Asal</label>
                        <select className="w-full px-6 py-4 bg-gray-50 border-2 border-transparent rounded-2xl focus:bg-white focus:border-primary-100 focus:ring-4 focus:ring-primary-50 transition-all outline-none font-medium text-gray-900 appearance-none cursor-pointer">
                          <option value="">Pilih Provinsi</option>
                          {PROVINCES.map(p => <option key={p} value={p}>{p}</option>)}
                        </select>
                    </div>
                    <div className="space-y-2">
                        <label className="text-xs font-black text-gray-700 uppercase tracking-widest ml-1">Nama Kabupaten</label>
                        <input 
                          type="text" 
                          placeholder="Kabupaten / Kota" 
                          className="w-full px-6 py-4 bg-gray-50 border-2 border-transparent rounded-2xl focus:bg-white focus:border-primary-100 focus:ring-4 focus:ring-primary-50 transition-all outline-none font-medium text-gray-900"
                        />
                    </div>
                  </div>

                  <div className="space-y-2">
                    <label className="text-xs font-black text-gray-700 uppercase tracking-widest ml-1">Alamat Lengkap</label>
                    <textarea 
                      placeholder="Nama Jalan, RT/RW, No. Rumah, Kecamatan..." 
                      className="w-full px-6 py-4 bg-gray-50 border-2 border-transparent rounded-2xl focus:bg-white focus:border-primary-100 focus:ring-4 focus:ring-primary-50 transition-all outline-none font-medium text-gray-900 min-h-[120px] resize-none"
                    ></textarea>
                  </div>
                </div>

                {/* Section 3: Data Pribadi & Keluarga */}
                <div className="space-y-8">
                  <div className="flex items-center gap-3 pb-2 border-b-2 border-primary-50">
                    <Calendar className="w-5 h-5 text-primary-600" />
                    <h3 className="text-sm font-black text-gray-900 uppercase tracking-widest">Detail Pribadi</h3>
                  </div>

                  <div className="grid md:grid-cols-1 gap-6">
                    <div className="space-y-2">
                        <label className="text-xs font-black text-gray-700 uppercase tracking-widest ml-1">Tempat Lahir</label>
                        <input 
                          type="text" 
                          placeholder="Kota Tempat Lahir" 
                          className="w-full px-6 py-4 bg-gray-50 border-2 border-transparent rounded-2xl focus:bg-white focus:border-primary-100 focus:ring-4 focus:ring-primary-50 transition-all outline-none font-medium text-gray-900"
                        />
                    </div>
                  </div>

                  <div className="space-y-2">
                    <label className="text-xs font-black text-gray-700 uppercase tracking-widest ml-1">Tanggal Lahir</label>
                    <div className="grid grid-cols-3 gap-4">
                        <select className="px-4 py-4 bg-gray-50 border-2 border-transparent rounded-2xl focus:bg-white focus:border-primary-100 transition-all outline-none font-medium text-gray-900 cursor-pointer">
                          <option value="">Hari</option>
                          {[...Array(31)].map((_, i) => <option key={i+1} value={i+1}>{i+1}</option>)}
                        </select>
                        <select className="px-4 py-4 bg-gray-50 border-2 border-transparent rounded-2xl focus:bg-white focus:border-primary-100 transition-all outline-none font-medium text-gray-900 cursor-pointer">
                          <option value="">Bulan</option>
                          {MONTHS.map((m, i) => <option key={m} value={i+1}>{m}</option>)}
                        </select>
                        <select className="px-4 py-4 bg-gray-50 border-2 border-transparent rounded-2xl focus:bg-white focus:border-primary-100 transition-all outline-none font-medium text-gray-900 cursor-pointer">
                          <option value="">Tahun</option>
                          {[...Array(60)].map((_, i) => {
                            const year = new Date().getFullYear() - 10 - i;
                            return <option key={year} value={year}>{year}</option>
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
                          <label className="text-xs font-black text-gray-700 uppercase tracking-widest ml-1">Nama Orang Tua</label>
                          <input 
                            type="text" 
                            placeholder="Nama Lengkap Ayah/Ibu" 
                            className="w-full px-6 py-4 bg-gray-50 border-2 border-transparent rounded-2xl focus:bg-white focus:border-primary-100 focus:ring-4 focus:ring-primary-50 transition-all outline-none font-medium text-gray-900"
                          />
                      </div>
                      <div className="space-y-2">
                          <label className="text-xs font-black text-gray-700 uppercase tracking-widest ml-1">WhatsApp Orang Tua</label>
                          <div className="relative">
                            <Phone className="absolute left-5 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
                            <input 
                              type="tel" 
                              placeholder="08XXXXXXXXXX" 
                              className="w-full pl-14 pr-6 py-4 bg-gray-50 border-2 border-transparent rounded-2xl focus:bg-white focus:border-primary-100 focus:ring-4 focus:ring-primary-50 transition-all outline-none font-medium text-gray-900"
                            />
                          </div>
                      </div>
                    </div>
                  </div>
                </div>

                <div className="pt-10">
                  <Button size="xl" rounded="full" className="w-full py-6 text-xl shadow-2xl shadow-primary-200 group">
                    Daftar Sekarang
                    <ArrowRight className="ml-3 w-6 h-6 group-hover:translate-x-2 transition-transform" />
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
