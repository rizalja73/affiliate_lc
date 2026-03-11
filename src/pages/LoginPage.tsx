import { GraduationCap, Mail, Lock, ArrowRight, Home } from 'lucide-react';
import { Link } from 'react-router-dom';
import Button from '../components/Button';

export default function LoginPage() {
  return (
    <div className="min-h-screen bg-[#fafafa] flex items-center justify-center p-6 lg:p-12 relative overflow-hidden">
      {/* Abstract Background Blobs */}
      <div className="absolute top-0 right-0 w-[600px] h-[600px] bg-primary-50 rounded-full blur-[120px] -z-10 opacity-60 -translate-y-1/2 translate-x-1/2"></div>
      <div className="absolute bottom-0 left-0 w-[800px] h-[800px] bg-red-50 rounded-full blur-[150px] -z-10 opacity-40 translate-y-1/2 -translate-x-1/2"></div>

      <div className="max-w-6xl w-full grid lg:grid-cols-2 gap-12 items-center relative z-10">
        
        {/* Left Side: Branding & Welcome Message */}
        <div className="hidden lg:block space-y-12">
          <Link to="/" className="inline-flex items-center gap-4 group">
            <div className="w-14 h-14 bg-gradient-to-br from-primary-600 to-primary-800 rounded-2xl flex items-center justify-center shadow-2xl shadow-primary-200 group-hover:rotate-6 transition-transform">
              <GraduationCap className="w-8 h-8 text-white" />
            </div>
            <div>
              <div className="text-3xl font-black text-gray-900 tracking-tight">Lampung <span className="text-primary-600">Cerdas</span></div>
              <div className="text-xs uppercase tracking-[0.3em] font-black text-primary-500/80">Affiliate Elite</div>
            </div>
          </Link>

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
            {/* Header for Mobile */}
            <div className="lg:hidden mb-10 text-center">
               <div className="w-16 h-16 bg-primary-600 rounded-2xl flex items-center justify-center mx-auto mb-4 shadow-xl shadow-primary-200">
                  <GraduationCap className="w-8 h-8 text-white" />
               </div>
               <h2 className="text-2xl font-black text-gray-900">Login Affiliate</h2>
            </div>

            <div className="mb-10 lg:block hidden">
              <h2 className="text-3xl font-black text-gray-900 mb-2">Login Member</h2>
              <p className="text-gray-500 font-medium">Akses dashboard eksklusif Anda</p>
            </div>

            <form className="space-y-6">
              <div className="space-y-2">
                <label className="text-sm font-black text-gray-700 uppercase tracking-widest ml-1">Email</label>
                <div className="relative group">
                  <Mail className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400 group-focus-within:text-primary-600 transition-colors" />
                  <input 
                    type="email" 
                    placeholder="nama@email.com"
                    className="w-full pl-12 pr-6 py-4 bg-gray-50 border-2 border-transparent rounded-2xl focus:bg-white focus:border-primary-100 focus:ring-4 focus:ring-primary-50 transition-all outline-none font-medium placeholder:text-gray-400 text-gray-900"
                  />
                </div>
              </div>

              <div className="space-y-2">
                <div className="flex justify-between items-center ml-1">
                  <label className="text-sm font-black text-gray-700 uppercase tracking-widest">Password</label>
                  <a href="#" className="text-xs font-bold text-primary-600 hover:underline">Lupa Password?</a>
                </div>
                <div className="relative group">
                  <Lock className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400 group-focus-within:text-primary-600 transition-colors" />
                  <input 
                    type="password" 
                    placeholder="••••••••"
                    className="w-full pl-12 pr-6 py-4 bg-gray-50 border-2 border-transparent rounded-2xl focus:bg-white focus:border-primary-100 focus:ring-4 focus:ring-primary-50 transition-all outline-none font-medium placeholder:text-gray-400 text-gray-900"
                  />
                </div>
              </div>

              <div className="flex items-center gap-3 ml-1 py-1">
                <input type="checkbox" className="w-5 h-5 rounded-lg border-2 border-gray-200 text-primary-600 focus:ring-primary-600 cursor-pointer" id="remember" />
                <label htmlFor="remember" className="text-sm font-bold text-gray-600 cursor-pointer">Ingat saya</label>
              </div>

              <Button size="xl" rounded="full" className="w-full shadow-2xl shadow-primary-200 group">
                Masuk Sekarang
                <ArrowRight className="ml-2 w-6 h-6 group-hover:translate-x-1 transition-transform" />
              </Button>
            </form>

            <div className="mt-10 text-center">
              <p className="text-gray-500 font-bold">
                Belum punya akun? <br className="sm:hidden" />
                <Link to="/" className="text-primary-600 hover:underline ml-1">Daftar sekarang gratis</Link>
              </p>
            </div>
          </div>

          <Link to="/" className="mt-8 flex items-center justify-center gap-2 text-gray-400 hover:text-primary-600 font-bold transition-colors">
            <Home className="w-4 h-4" />
            <span className="text-sm">Kembali ke Beranda</span>
          </Link>
        </div>

      </div>
    </div>
  );
}
