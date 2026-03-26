import { GraduationCap, Mail, Phone, MapPin, Facebook, Instagram, Twitter, Linkedin, Heart } from 'lucide-react';

export default function Footer() {
  return (
    <footer className="bg-primary-950 text-gray-400 py-16 md:py-24 relative overflow-hidden">
      {/* Decorative background overlay */}
      <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-transparent via-primary-500 to-transparent opacity-50"></div>

      <div className="container mx-auto px-4 md:px-6 lg:px-8 max-w-7xl">
        <div className="grid md:grid-cols-2 lg:grid-cols-12 gap-12 lg:gap-8 mb-16">
          <div className="lg:col-span-4 space-y-8">
            <div className="flex items-center gap-4 group cursor-pointer">
              <div className="w-14 h-14 bg-gradient-to-br from-primary-600 to-primary-800 rounded-2xl flex items-center justify-center shadow-lg shadow-primary-950/50">
                <GraduationCap className="w-8 h-8 text-white" />
              </div>
              <div>
                <div className="text-2xl font-black text-white tracking-tight">Lampung <span className="text-primary-500">Cerdas</span></div>
                <div className="text-xs uppercase tracking-[0.2em] font-black text-primary-400/60">Affiliate Elite</div>
              </div>
            </div>

            <p className="text-lg leading-relaxed text-gray-400 font-medium">
              Membangun masa depan generasi cerdas Indonesia melalui sistem edukasi berbasis kurikulum terbaik dan peluang ekonomi yang inklusif.
            </p>

            <div className="flex gap-4">
              {[Facebook, Instagram, Twitter, Linkedin].map((Icon, i) => (
                <a
                  key={i}
                  href="#"
                  className="w-12 h-12 bg-white/5 border border-white/10 rounded-2xl flex items-center justify-center hover:bg-primary-600 hover:text-white hover:-translate-y-1 transition-all duration-300"
                >
                  <Icon className="w-5 h-5" />
                </a>
              ))}
            </div>
          </div>

          <div className="lg:col-span-2 lg:ml-auto">
            <h3 className="text-white font-black text-sm uppercase tracking-[0.2em] mb-8">Navigation</h3>
            <ul className="space-y-4 text-base">
              {['Home', 'Keuntungan', 'Cara Kerja', 'Penghasilan', 'Testimoni'].map((item) => (
                <li key={item}>
                  <a href={`#${item.toLowerCase().replace(' ', '-')}`} className="hover:text-primary-500 transition-colors font-medium">
                    {item}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          <div className="lg:col-span-2">
            <h3 className="text-white font-black text-sm uppercase tracking-[0.2em] mb-8">Support</h3>
            <ul className="space-y-4 text-base">
              {['Panduan Affiliate', 'F.A.Q', 'Terms of Service', 'Privacy Policy'].map((item) => (
                <li key={item}>
                  <a href="#" className="hover:text-primary-500 transition-colors font-medium">
                    {item}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          <div className="lg:col-span-4 lg:ml-auto">
            <h3 className="text-white font-black text-sm uppercase tracking-[0.2em] mb-8">Connect With Us</h3>
            <ul className="space-y-6">
              <li className="flex items-start gap-4">
                <div className="w-10 h-10 bg-primary-900/50 rounded-xl flex items-center justify-center text-primary-500 flex-shrink-0">
                  <Mail className="w-5 h-5" />
                </div>
                <div>
                  <p className="text-white font-bold text-sm">Email Address</p>
                  <a href="mailto:it@lampungcerdas.com" className="text-sm hover:text-primary-500 transition-colors">it@lampungcerdas.com</a>
                </div>
              </li>
              <li className="flex items-start gap-4">
                <div className="w-10 h-10 bg-primary-900/50 rounded-xl flex items-center justify-center text-primary-500 flex-shrink-0">
                  <Phone className="w-5 h-5" />
                </div>
                <div>
                  <p className="text-white font-bold text-sm">Call Center</p>
                  <a href="tel:+6285147428018" className="text-sm hover:text-primary-500 transition-colors">+6285147428018</a>
                </div>
              </li>
              <li className="flex items-start gap-4">
                <div className="w-10 h-10 bg-primary-900/50 rounded-xl flex items-center justify-center text-primary-500 flex-shrink-0">
                  <MapPin className="w-5 h-5" />
                </div>
                <div>
                  <p className="text-white font-bold text-sm">Office Location</p>
                  <p className="text-sm">Jl. Bumi Manti III, Gg. Sawah Baru 1, Kel. Kampung Baru, Kec. Labuhan Ratu, Kota Bandar Lampung, Lampung 35141Bandar Lampung, Indonesia</p>
                </div>
              </li>
            </ul>
          </div>
        </div>

        <div className="pt-8 border-t border-white/10 flex flex-col md:flex-row items-center justify-between gap-6">
          <p className="text-sm font-medium">
            &copy; 2024 Lampung Cerdas. All rights reserved.
          </p>
          <p className="text-sm font-medium flex items-center gap-2">
            Made with <Heart className="w-4 h-4 text-primary-500 fill-primary-500" /> for Edukasi Indonesia
          </p>
        </div>
      </div>
    </footer>
  );
}
