import { UserPlus, Share2, Wallet, Rocket, ArrowRight } from 'lucide-react';
import Section from '../components/Section';

const steps = [
  {
    icon: UserPlus,
    title: 'Daftar Gratis',
    description: 'Isi formulir pendaftaran singkat dan langsung dapatkan akses ke dashboard affiliate Anda.',
    color: 'bg-red-700'
  },
  {
    icon: Share2,
    title: 'Promosikan',
    description: 'Gunakan link affiliate unik dan materi promosi siap pakai untuk dibagikan di media sosial.',
    color: 'bg-red-700'
  },
  {
    icon: Wallet,
    title: 'Dapatkan Komisi',
    description: 'Terima komisi untuk setiap penjualan yang berhasil dari link pendaftaran yang Anda bagikan.',
    color: 'bg-red-700'
  },
  {
    icon: Rocket,
    title: 'Scale Up',
    description: 'Tingkatkan performa Anda dengan mentoring eksklusif dan raih bonus pencapaian menarik.',
    color: 'bg-red-700'
  }
];

export default function CaraKerjaSection() {
  return (
    <Section background="gradient" className="relative overflow-hidden">
      <div className="absolute -bottom-20 -right-20 w-96 h-96 bg-primary-100 rounded-full blur-3xl opacity-50 -z-10"></div>

      <div className="text-center mb-16 md:mb-24">
        <h2 className="text-3xl md:text-5xl font-extrabold text-gray-900 mb-6">
          Langkah Mudah <span className="text-primary-600 italic">Mulai Cuan</span>
        </h2>
        <p className="text-lg text-gray-600 max-w-2xl mx-auto">
          Hanya butuh 4 langkah sederhana untuk mulai membangun penghasilan tambahan bersama Lampung Cerdas.
        </p>
      </div>

      <div className="relative">
        {/* Connection Line (Desktop) */}
        <div className="hidden lg:block absolute top-1/2 left-0 w-full h-0.5 bg-gradient-to-r from-primary-100 via-primary-300 to-primary-100 -translate-y-1/2 z-0"></div>

        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-12 relative z-10">
          {steps.map((step, index) => (
            <div key={index} className="flex flex-col items-center group">
              <div className="relative mb-8">
                {/* Step Number */}
                <div className="absolute -top-4 -right-4 w-10 h-10 bg-white shadow-xl rounded-full flex items-center justify-center font-black text-primary-600 border-2 border-primary-50 z-20">
                  {index + 1}
                </div>

                {/* Icon Container */}
                <div className={`w-24 h-24 ${step.color} rounded-[2rem] flex items-center justify-center text-white shadow-2xl transform group-hover:scale-110 group-hover:rotate-6 transition-all duration-500 relative`}>
                  <step.icon className="w-10 h-10" />

                  {/* Decorative Ring */}
                  <div className="absolute inset-0 border-4 border-white/20 rounded-[2rem] scale-90 group-hover:scale-100 transition-transform duration-500" />
                </div>
              </div>

              <div className="text-center group-hover:translate-y-[-4px] transition-transform duration-300">
                <h3 className="text-xl font-bold text-gray-900 mb-3">{step.title}</h3>
                <p className="text-gray-600 leading-relaxed max-w-[240px] mx-auto text-sm md:text-base">
                  {step.description}
                </p>
              </div>

              {index < steps.length - 1 && (
                <div className="lg:hidden mt-8 text-primary-200 animate-bounce-slow">
                  <ArrowRight className="w-8 h-8 rotate-90" />
                </div>
              )}
            </div>
          ))}
        </div>
      </div>
    </Section>
  );
}
