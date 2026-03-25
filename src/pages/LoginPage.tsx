import { useState, useEffect } from 'react';
import { GraduationCap, Mail, Lock, ArrowRight, ArrowLeft, AlertCircle, Loader2, Eye, EyeOff, CheckCircle } from 'lucide-react';
import { Link, useNavigate, useSearchParams } from 'react-router-dom';
import Button from '../components/Button';
import { loginAffiliate } from '../lib/auth';

export default function LoginPage() {
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState('');
  const [justRegistered, setJustRegistered] = useState(false);

  useEffect(() => {
    const emailParam = searchParams.get('email');
    if (emailParam) {
      setEmail(emailParam);
      setJustRegistered(true);
    }
  }, [searchParams]);

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');

    if (!email || !password) {
      setError('Email dan password tidak boleh kosong.');
      return;
    }

    setIsLoading(true);
    const result = await loginAffiliate(email, password);
    setIsLoading(false);

    if (result.success) {
      navigate('/dashboard');
    } else {
      setError(result.message);
    }
  };

  return (
    <div className="min-h-screen bg-[#fafafa] flex items-center justify-center p-4 md:p-8 relative overflow-hidden font-sans">
      {/* Premium Background Blobs */}
      <div className="absolute top-[-20%] right-[-10%] w-[60%] h-[60%] bg-primary-100/50 rounded-full blur-[140px] -z-10 animate-blob"></div>
      <div className="absolute bottom-[-10%] left-[-10%] w-[50%] h-[50%] bg-red-50 rounded-full blur-[120px] -z-10 animate-blob" style={{ animationDelay: '4s' }}></div>

      <div className="max-w-[1000px] w-full grid lg:grid-cols-2 bg-white rounded-[2.5rem] shadow-[0_32px_80px_rgba(0,0,0,0.1)] overflow-hidden border border-white relative z-10">
        
        {/* Left Side: Illustration / Welcome */}
        <div className="bg-gradient-to-br from-primary-600 to-primary-900 p-12 text-white flex flex-col justify-between relative overflow-hidden hidden lg:flex">
          <div className="relative z-10">
            <Link to="/" className="inline-flex items-center gap-3 mb-16 group">
                <div className="w-12 h-12 bg-white rounded-2xl flex items-center justify-center shadow-xl group-hover:scale-110 transition-transform">
                    <GraduationCap className="w-7 h-7 text-primary-600" />
                </div>
                <div>
                    <div className="text-xl font-black text-white tracking-tight">Lampung <span className="text-primary-200">Cerdas</span></div>
                    <div className="text-[10px] uppercase tracking-[0.2em] font-bold text-white/60">Pusat Affiliate</div>
                </div>
            </Link>

            <div className="space-y-8">
              <h1 className="text-5xl font-black leading-tight tracking-tight">
                Selamat Datang <br />
                <span className="text-primary-200">Kembali, Mentor!</span>
              </h1>
              <p className="text-primary-50/80 text-lg font-medium leading-relaxed max-w-sm">
                Masuk untuk mengakses dashboard performa, kelola jaringan Anda, dan tarik komisi hasil kerja keras Anda.
              </p>
            </div>
          </div>

          <div className="relative z-10 pt-10 border-t border-white/10 mt-12">
            <div className="flex items-center gap-4">
              <div className="flex -space-x-3">
                {[1, 2, 3, 4].map((i) => (
                  <div key={i} className="w-10 h-10 rounded-full border-2 border-primary-600 bg-primary-100 flex items-center justify-center overflow-hidden">
                    <img src={`https://i.pravatar.cc/150?u=${i+10}`} alt="User" />
                  </div>
                ))}
              </div>
              <p className="text-sm font-bold text-primary-100">Bergabung dengan 5.000+ affiliate lainnya.</p>
            </div>
          </div>

          {/* Abstract pattern decoration */}
          <div className="absolute top-1/2 right-0 w-64 h-64 bg-white/5 rounded-full blur-3xl -translate-y-1/2 translate-x-1/2"></div>
        </div>

        {/* Right Side: Form */}
        <div className="p-8 md:p-12 lg:p-16 bg-white relative flex flex-col justify-center">
          <div className="flex justify-between items-center mb-10">
            <div>
              <h2 className="text-3xl font-black text-gray-900 tracking-tight leading-tight">Masuk Akun</h2>
              <p className="text-gray-500 font-medium text-sm mt-1">Lanjutkan perjalanan Anda hari ini.</p>
            </div>
            <Link to="/" className="w-10 h-10 rounded-full border border-gray-100 flex items-center justify-center text-gray-400 hover:text-primary-600 hover:border-primary-100 transition-all">
              <ArrowLeft className="w-5 h-5" />
            </Link>
          </div>

          {/* Alerts */}
          {justRegistered && !error && (
            <div className="mb-8 flex items-center gap-3 bg-green-50 border border-green-100 text-green-700 rounded-2xl px-5 py-4 text-sm font-semibold animate-in fade-in slide-in-from-top-2">
              <CheckCircle className="w-5 h-5 flex-shrink-0" />
              <span>Berhasil terdaftar! Sekarang silakan masuk.</span>
            </div>
          )}

          {error && (
            <div className="mb-8 flex items-center gap-3 bg-red-50 border border-red-100 text-red-700 rounded-2xl px-5 py-4 text-sm font-semibold animate-in shake-in duration-300">
              <AlertCircle className="w-5 h-5 flex-shrink-0" />
              <div className="flex flex-col">
                <span>{error}</span>
                {error.includes('salah') && (
                  <Link to="/register" className="text-xs underline mt-1 opacity-80 hover:opacity-100">Belum terdaftar? Buat akun sekarang</Link>
                )}
              </div>
            </div>
          )}

          <form onSubmit={handleLogin} className="space-y-6">
            <div className="space-y-2">
              <label className="text-[11px] font-bold text-gray-500 uppercase tracking-widest ml-1 mb-2 block text-gray-500">Alamat Email</label>
              <div className="relative group">
                <Mail className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400 group-focus-within:text-primary-600 transition-colors" />
                <input 
                  type="email" 
                  placeholder="nama@email.com"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  disabled={isLoading}
                  className="w-full pl-12 pr-6 py-4 bg-gray-50/50 border-2 border-gray-100 rounded-2xl focus:bg-white focus:border-primary-600 focus:ring-4 focus:ring-primary-50 transition-all outline-none font-medium text-gray-900 disabled:opacity-60"
                />
              </div>
            </div>

            <div className="space-y-2">
              <div className="flex justify-between items-center ml-1">
                <label className="text-[11px] font-bold text-gray-500 uppercase tracking-widest mb-2 block text-gray-500">Kata Sandi</label>
                <a href="#" className="text-xs font-bold text-primary-600 hover:underline">Lupa Password?</a>
              </div>
              <div className="relative group">
                <Lock className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400 group-focus-within:text-primary-600 transition-colors" />
                <input 
                  type={showPassword ? "text" : "password"} 
                  placeholder="••••••••"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  disabled={isLoading}
                  className="w-full pl-12 pr-12 py-4 bg-gray-50/50 border-2 border-gray-100 rounded-2xl focus:bg-white focus:border-primary-600 focus:ring-4 focus:ring-primary-50 transition-all outline-none font-medium text-gray-900 disabled:opacity-60"
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

            <div className="pt-4">
                <Button 
                id="login-submit"
                size="xl" 
                rounded="full" 
                className="w-full py-4 bg-primary-600 hover:bg-primary-700 text-white font-black text-lg shadow-xl shadow-primary-200 transition-all transform hover:-translate-y-1 flex items-center justify-center group"
                disabled={isLoading}
                >
                {isLoading ? (
                    <>
                    <Loader2 className="mr-2 w-5 h-5 animate-spin" />
                    Memproses...
                    </>
                ) : (
                    <>
                    Masuk Sekarang
                    <ArrowRight className="ml-2 w-5 h-5 group-hover:translate-x-1 transition-transform" />
                    </>
                )}
                </Button>
            </div>
          </form>

          <div className="mt-10 text-center">
            <p className="text-gray-500 font-medium">
              Belum punya akun? <br className="sm:hidden" />
              <Link to="/register" className="text-primary-600 font-bold hover:underline ml-1">Daftar sekarang gratis</Link>
            </p>
          </div>
        </div>
      </div>

      <p className="absolute bottom-8 text-xs font-bold text-gray-400 uppercase tracking-widest opacity-50">
        &copy; 2026 Lampung Cerdas • Secure Authentication System
      </p>
    </div>
  );
}
