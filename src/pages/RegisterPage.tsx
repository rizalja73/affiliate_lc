import { useState } from 'react';
import { GraduationCap, User, Phone, ArrowRight, ArrowLeft, Mail, Lock, AlertCircle, CheckCircle, Loader2, Eye, EyeOff } from 'lucide-react';
import { Link, useNavigate } from 'react-router-dom';
import Button from '../components/Button';
import { registerAffiliate, loginWithGoogle } from '../lib/auth';

export default function RegisterPage() {
  const navigate = useNavigate();

  // State untuk semua field form
  const [formData, setFormData] = useState({
    fullName: '',
    email: '',
    whatsapp: '',
    password: '',
    confirmPassword: '',
  });

  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData(prev => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const validate = (): string | null => {
    if (!formData.fullName.trim()) return 'Nama lengkap wajib diisi.';
    if (!formData.email.trim()) return 'Email wajib diisi.';
    if (!formData.whatsapp.trim()) return 'Nomor WhatsApp wajib diisi.';
    if (!formData.password) return 'Password wajib diisi.';
    if (formData.password.length < 6) return 'Password minimal 6 karakter.';
    if (formData.password !== formData.confirmPassword) return 'Konfirmasi password tidak cocok.';
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
    
    // Memetakan field simple ke RegisterData yang diharapkan API
    const result = await registerAffiliate({
      username: formData.fullName.replace(/\s+/g, '_').toLowerCase() + Math.random().toString(36).substring(2, 7),
      email: formData.email,
      password: formData.password,
      fullName: formData.fullName,
      whatsapp: formData.whatsapp,
      province: '-',
      regency: '-',
      address: '-',
      birthPlace: '-',
      birthDay: 1,
      birthMonth: 1,
      birthYear: 2000,
      parentName: '-',
      parentWhatsapp: '-',
    });
    
    setIsLoading(false);

    if (result.success) {
      setSuccess(result.message);
      // Kami tidak langsung navigasi agar user bisa melihat pesan sukses "Cek Email" jika ada
      window.scrollTo({ top: 0, behavior: 'smooth' });
    } else {
      setError(result.message);
      window.scrollTo({ top: 0, behavior: 'smooth' });
    }
  };

  const inputClass = "w-full pl-12 pr-12 py-4 bg-white/50 backdrop-blur-sm border-2 border-gray-100 rounded-2xl focus:bg-white focus:border-primary-600 focus:ring-4 focus:ring-primary-50 transition-all outline-none font-medium text-gray-900 disabled:opacity-60 placeholder:text-gray-400";
  const labelClass = "text-[11px] font-bold text-gray-500 uppercase tracking-widest ml-1 mb-2 block";

  return (
    <div className="min-h-screen bg-[#fafafa] flex flex-col items-center justify-center p-4 md:p-8 relative overflow-hidden font-sans">
      {/* Dynamic Background Elements */}
      <div className="absolute top-[-10%] left-[-10%] w-[40%] h-[40%] bg-primary-100 rounded-full blur-[120px] -z-10 opacity-60 animate-pulse"></div>
      <div className="absolute bottom-[-10%] right-[-10%] w-[50%] h-[50%] bg-primary-50 rounded-full blur-[150px] -z-10 opacity-40 animate-pulse" style={{ animationDelay: '2s' }}></div>

      <div className="max-w-[1000px] w-full grid lg:grid-cols-2 bg-white rounded-[2.5rem] shadow-[0_32px_64px_-16px_rgba(0,0,0,0.1)] overflow-hidden border border-white relative z-10 transition-all duration-500 hover:shadow-[0_48px_80px_-24px_rgba(0,0,0,0.12)]">
        
        {/* Left Side: Visual/Branding */}
        <div className="bg-gradient-to-br from-primary-600 via-primary-700 to-primary-900 p-8 md:p-12 text-white flex flex-col justify-between relative overflow-hidden">
          {/* Subtle patterns */}
          <div className="absolute inset-0 opacity-10 pointer-events-none">
            <div className="absolute top-0 left-0 w-full h-full bg-[radial-gradient(circle_at_20%_30%,rgba(255,255,255,0.2)_0%,transparent_50%)]"></div>
          </div>

          <div className="relative z-10">
            <Link to="/" className="inline-flex items-center gap-3 mb-12 group">
              <div className="w-12 h-12 bg-white rounded-2xl flex items-center justify-center shadow-lg group-hover:scale-110 transition-transform duration-300">
                <GraduationCap className="w-7 h-7 text-primary-600" />
              </div>
              <div>
                <div className="text-xl font-black tracking-tight text-white">Lampung <span className="text-primary-100">Cerdas</span></div>
                <div className="text-[10px] uppercase tracking-[0.2em] font-bold text-primary-50/80">Affiliate Platform</div>
              </div>
            </Link>

            <div className="space-y-6">
              <h1 className="text-4xl md:text-5xl font-black leading-[1.1] tracking-tight">
                Mari Bergabung <br />
                <span className="text-primary-200">Menuju Kesuksesan.</span>
              </h1>
              <p className="text-primary-50/90 text-lg font-medium max-w-sm">
                Daftarkan diri Anda sekarang dan dapatkan akses eksklusif ke berbagai program unggulan kami.
              </p>
            </div>
          </div>

          <div className="mt-12 relative z-10">
            <div className="grid grid-cols-2 gap-4">
              <div className="bg-white/10 backdrop-blur-md p-4 rounded-2xl border border-white/10">
                <div className="text-2xl font-black mb-1">5K+</div>
                <div className="text-xs font-bold text-primary-100/70 uppercase tracking-wider">Members</div>
              </div>
              <div className="bg-white/10 backdrop-blur-md p-4 rounded-2xl border border-white/10">
                <div className="text-2xl font-black mb-1">100+</div>
                <div className="text-xs font-bold text-primary-100/70 uppercase tracking-wider">Programs</div>
              </div>
            </div>
          </div>
        </div>

        {/* Right Side: Form / Success State */}
        <div className="p-8 md:p-12 lg:p-16 bg-white relative min-h-[600px] flex flex-col justify-center">
          {!success ? (
            <>
              <div className="flex justify-between items-center mb-10">
                <div>
                  <h2 className="text-2xl font-black text-gray-900 tracking-tight">Buat Akun Baru</h2>
                  <p className="text-gray-500 font-medium text-sm mt-1">Hanya butuh beberapa detik.</p>
                </div>
                <Link to="/" className="w-10 h-10 rounded-full border border-gray-100 flex items-center justify-center text-gray-400 hover:text-primary-600 hover:border-primary-100 transition-all">
                  <ArrowLeft className="w-5 h-5" />
                </Link>
              </div>

              {/* Error Alert */}
              {error && (
                <div className="mb-6 flex items-center gap-3 bg-red-50 border border-red-100 text-red-700 rounded-2xl px-5 py-4 text-sm font-semibold animate-in fade-in slide-in-from-top-2">
                  <AlertCircle className="w-5 h-5 flex-shrink-0" />
                  <span>{error}</span>
                </div>
              )}

              <form onSubmit={handleSubmit} className="space-y-5">
                {/* Input Nama */}
                <div className="relative">
                  <label className={labelClass}>Nama Lengkap</label>
                  <div className="relative">
                    <User className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
                    <input 
                      name="fullName" 
                      type="text" 
                      placeholder="Masukkan nama lengkap" 
                      value={formData.fullName} 
                      onChange={handleChange} 
                      disabled={isLoading} 
                      className={inputClass} 
                    />
                  </div>
                </div>

                {/* Input HP */}
                <div className="relative">
                  <label className={labelClass}>Nomor WhatsApp</label>
                  <div className="relative">
                    <Phone className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
                    <input 
                      name="whatsapp" 
                      type="tel" 
                      placeholder="0812XXXXXXXX" 
                      value={formData.whatsapp} 
                      onChange={handleChange} 
                      disabled={isLoading} 
                      className={inputClass} 
                    />
                  </div>
                </div>

                {/* Input Email */}
                <div className="relative">
                  <label className={labelClass}>Alamat Email</label>
                  <div className="relative">
                    <Mail className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
                    <input 
                      name="email" 
                      type="email" 
                      placeholder="nama@email.com" 
                      value={formData.email} 
                      onChange={handleChange} 
                      disabled={isLoading} 
                      className={inputClass} 
                    />
                  </div>
                </div>

                {/* Input Password */}
                <div className="relative">
                  <label className={labelClass}>Password</label>
                  <div className="relative">
                    <Lock className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
                    <input 
                      name="password" 
                      type={showPassword ? "text" : "password"} 
                      placeholder="Min. 6 karakter" 
                      value={formData.password} 
                      onChange={handleChange} 
                      disabled={isLoading} 
                      className={inputClass} 
                    />
                    <button 
                      type="button"
                      onClick={() => setShowPassword(!showPassword)}
                      className="absolute right-4 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600 transition-colors"
                    >
                      {showPassword ? <EyeOff className="w-5 h-5" /> : <Eye className="w-5 h-5" />}
                    </button>
                  </div>
                </div>

                {/* Input Confirm Password */}
                <div className="relative">
                  <label className={labelClass}>Ulangi Password</label>
                  <div className="relative">
                    <Lock className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
                    <input 
                      name="confirmPassword" 
                      type={showConfirmPassword ? "text" : "password"} 
                      placeholder="Konfirmasi password" 
                      value={formData.confirmPassword} 
                      onChange={handleChange} 
                      disabled={isLoading} 
                      className={inputClass} 
                    />
                    <button 
                      type="button"
                      onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                      className="absolute right-4 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600 transition-colors"
                    >
                      {showConfirmPassword ? <EyeOff className="w-5 h-5" /> : <Eye className="w-5 h-5" />}
                    </button>
                  </div>
                </div>

                <div className="pt-6 space-y-4">
                  <Button 
                    id="register-submit" 
                    size="xl" 
                    rounded="full" 
                    className="w-full py-4 text-white bg-primary-600 hover:bg-primary-700 shadow-xl shadow-primary-200 group flex items-center justify-center transition-all duration-300 transform hover:-translate-y-1" 
                    disabled={isLoading}
                  >
                    {isLoading ? (
                      <>
                        <Loader2 className="mr-2 w-5 h-5 animate-spin" />
                        Memproses...
                      </>
                    ) : (
                      <>
                        Daftar Sekarang
                        <ArrowRight className="ml-2 w-5 h-5 group-hover:translate-x-1 transition-transform" />
                      </>
                    )}
                  </Button>

                  <div className="relative py-2 flex items-center gap-4">
                    <div className="flex-1 h-[1px] bg-gray-100"></div>
                    <span className="text-[10px] font-bold text-gray-400 uppercase tracking-widest">Atau</span>
                    <div className="flex-1 h-[1px] bg-gray-100"></div>
                  </div>

                  <button
                    type="button"
                    onClick={async () => {
                      setError('');
                      setIsLoading(true);
                      const result = await loginWithGoogle();
                      setIsLoading(false);
                      if (!result.success) {
                        setError(result.message);
                      }
                    }}
                    className="w-full flex items-center justify-center gap-3 bg-white border-2 border-gray-100 py-4 rounded-full font-bold text-gray-700 hover:bg-gray-50 hover:border-gray-200 transition-all transform hover:-translate-y-1"
                  >
                    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                      <path d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z" fill="#4285F4"/>
                      <path d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" fill="#34A853"/>
                      <path d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l3.66-2.84z" fill="#FBBC05"/>
                      <path d="M12 5.38c1.62 0 3.06.56 4.21 1.66l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z" fill="#EA4335"/>
                    </svg>
                    Daftar dengan Google
                  </button>
                </div>

                <p className="mt-8 text-center text-sm text-gray-500 font-medium">
                  Sudah punya akun? <Link to="/login" className="text-primary-600 font-bold hover:underline">Masuk disini</Link>
                </p>
              </form>
            </>
          ) : (
            <div className="text-center space-y-8 animate-in zoom-in-95 duration-500">
              <div className="w-24 h-24 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-6 text-green-600">
                <CheckCircle className="w-12 h-12" />
              </div>
              <div className="space-y-4">
                <h2 className="text-3xl font-black text-gray-900">Pendaftaran Berhasil!</h2>
                <p className="text-gray-500 font-medium text-lg leading-relaxed">
                  {success.includes('verifikasi') 
                    ? "Silakan cek email Anda untuk memverifikasi akun sebelum masuk."
                    : "Akun Anda telah berhasil dibuat. Sekarang Anda dapat masuk ke dashboard."}
                </p>
              </div>
              <div className="pt-4 px-4">
                <div className="bg-gray-50 p-6 rounded-[2rem] border border-dashed border-gray-200 mb-8 max-w-sm mx-auto">
                    <div className="text-xs font-bold text-gray-400 uppercase tracking-widest mb-2">Email Akun</div>
                    <div className="text-gray-900 font-black text-lg">{formData.email}</div>
                </div>
                <Link to={`/login?email=${formData.email}`} className="inline-flex items-center justify-center gap-3 bg-primary-600 text-white px-10 py-5 rounded-full font-black text-lg hover:bg-primary-700 transition-all shadow-xl shadow-primary-100 group">
                  Lanjut ke Login
                  <ArrowRight className="w-6 h-6 group-hover:translate-x-2 transition-transform" />
                </Link>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
