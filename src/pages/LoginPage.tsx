import { useState } from 'react';
import { GraduationCap, Mail, Lock, ArrowRight, ArrowLeft, AlertCircle, Loader2 } from 'lucide-react';
import { Link, useNavigate } from 'react-router-dom';
import Button from '../components/Button';
import { loginAffiliate } from '../lib/auth';

export default function LoginPage() {
  const navigate = useNavigate();

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState('');

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
    <div className="min-h-screen bg-[#fafafa] flex items-center justify-center p-6 lg:p-12 relative overflow-hidden">
      {/* Abstract Background Blobs */}
      <div className="absolute top-0 right-0 w-[600px] h-[600px] bg-primary-50 rounded-full blur-[120px] -z-10 opacity-60 -translate-y-1/2 translate-x-1/2"></div>
      <div className="absolute bottom-0 left-0 w-[800px] h-[800px] bg-red-50 rounded-full blur-[150px] -z-10 opacity-40 translate-y-1/2 -translate-x-1/2"></div>

      <div className="max-w-6xl w-full relative z-10">
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

        <div className="grid lg:grid-cols-2 gap-12 items-center">
          
          {/* Left Side: Branding & Welcome Message */}
          <div className="hidden lg:block space-y-12">
            <div className="space-y-6">
              <h1 className="text-5xl font-black text-gray-900 leading-tight">
                Selamat Datang <br />
                <span className="text-primary-600">Para Pejuang!</span>
              </h1>
              <p className="text-xl text-gray-600 leading-relaxed max-w-md font-medium">
                Masuk ke dashboard Anda untuk memantau trafik, konversi, dan komisi harian Anda. Bersiaplah untuk lonjakan penghasilan hari ini.
              </p>
            </div>

            <div className="grid grid-cols-2 gap-8 pt-8">
              <div className="bg-white/50 backdrop-blur-sm p-6 rounded-3xl border border-white shadow-xl shadow-gray-200/50">
                <p className="text-3xl font-black text-gray-900 mb-1">2M+</p>
                <p className="text-xs font-bold text-gray-500 uppercase tracking-widest leading-relaxed">Komisi Telah<br/>Dibayarkan</p>
              </div>
              <div className="bg-white/50 backdrop-blur-sm p-6 rounded-3xl border border-white shadow-xl shadow-gray-200/50">
                <p className="text-3xl font-black text-primary-600 mb-1">24/7</p>
                <p className="text-xs font-bold text-gray-500 uppercase tracking-widest leading-relaxed">Dukungan Tim<br/>Support</p>
              </div>
            </div>
          </div>

          {/* Right Side: Login Form Card */}
          <div className="w-full max-w-md mx-auto">
            <div className="bg-white rounded-[2.5rem] shadow-[0_20px_50px_rgba(0,0,0,0.08)] p-10 md:p-12 relative overflow-hidden border border-gray-50">

              <div className="mb-10">
                <h2 className="text-3xl font-black text-gray-900 mb-2">Login Member</h2>
                <p className="text-gray-500 font-medium">Akses dashboard eksklusif Anda</p>
              </div>

              {/* Error Alert */}
              {error && (
                <div className="mb-6 flex items-center gap-3 bg-red-50 border border-red-100 text-red-700 rounded-2xl px-5 py-4 text-sm font-semibold">
                  <AlertCircle className="w-5 h-5 flex-shrink-0" />
                  <span>{error}</span>
                </div>
              )}

              <form className="space-y-6" onSubmit={handleLogin}>
                <div className="space-y-2">
                  <label htmlFor="login-email" className="text-sm font-black text-gray-700 uppercase tracking-widest ml-1">Email</label>
                  <div className="relative group">
                    <Mail className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400 group-focus-within:text-primary-600 transition-colors" />
                    <input 
                      id="login-email"
                      type="email" 
                      placeholder="nama@email.com"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      disabled={isLoading}
                      className="w-full pl-12 pr-6 py-4 bg-gray-50 border-2 border-transparent rounded-2xl focus:bg-white focus:border-primary-100 focus:ring-4 focus:ring-primary-50 transition-all outline-none font-medium placeholder:text-gray-400 text-gray-900 disabled:opacity-60"
                    />
                  </div>
                </div>

                <div className="space-y-2">
                  <div className="flex justify-between items-center ml-1">
                    <label htmlFor="login-password" className="text-sm font-black text-gray-700 uppercase tracking-widest">Password</label>
                    <a href="#" className="text-xs font-bold text-primary-600 hover:underline">Lupa Password?</a>
                  </div>
                  <div className="relative group">
                    <Lock className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400 group-focus-within:text-primary-600 transition-colors" />
                    <input 
                      id="login-password"
                      type="password" 
                      placeholder="••••••••"
                      value={password}
                      onChange={(e) => setPassword(e.target.value)}
                      disabled={isLoading}
                      className="w-full pl-12 pr-6 py-4 bg-gray-50 border-2 border-transparent rounded-2xl focus:bg-white focus:border-primary-100 focus:ring-4 focus:ring-primary-50 transition-all outline-none font-medium placeholder:text-gray-400 text-gray-900 disabled:opacity-60"
                    />
                  </div>
                </div>

                <Button 
                  id="login-submit"
                  size="xl" 
                  rounded="full" 
                  className="w-full shadow-2xl shadow-primary-200 group"
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
                      <ArrowRight className="ml-2 w-6 h-6 group-hover:translate-x-1 transition-transform" />
                    </>
                  )}
                </Button>
              </form>

              <div className="mt-10 text-center">
                <p className="text-gray-500 font-bold">
                  Belum punya akun? <br className="sm:hidden" />
                  <Link to="/register" className="text-primary-600 hover:underline ml-1">Daftar sekarang gratis</Link>
                </p>
              </div>
            </div>

          </div>
        </div>
      </div>
    </div>
  );
}
