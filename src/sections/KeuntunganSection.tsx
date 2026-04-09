import { DollarSign, Award, Zap, ShieldCheck } from 'lucide-react';
import Card from '../components/Card';
import Section from '../components/Section';

const benefits = [
  {
    icon: DollarSign,
    title: 'Komisi Tertinggi',
    description: 'Nikmati bagi hasil yang sangat kompetitif. Dapatkan pasif income yang stabil dari setiap closing yang Anda lakukan.',
    color: 'from-red-600 to-red-800'
  },
  {
    icon: Award,
    title: 'Produk Best-Seller',
    description: 'Promosikan program STIFIn & Edukasi yang sudah terbukti diminati ribuan orang. Konversi tinggi, jualan jadi mudah.',
    color: 'from-red-600 to-red-800'
  },
  {
    icon: Zap,
    title: 'Pencairan Cepat',
    description: 'Tidak perlu menunggu lama. Komisi Anda akan diproses dan dicairkan secara berkala dengan sistem yang transparan.',
    color: 'from-red-600 to-red-800'
  },
  {
    icon: ShieldCheck,
    title: 'Support & Mentoring',
    description: 'Dapatkan akses ke materi promosi eksklusif dan bimbingan langsung dari tim expert kami hingga Anda mahir.',
    color: 'from-red-600 to-red-800'
  }
];

export default function KeuntunganSection() {
  return (
    <Section background="white" className="relative">
      <div className="absolute top-40 left-0 w-72 h-72 bg-primary-50 rounded-full blur-3xl -z-10 opacity-60"></div>

      <div className="text-center mb-16">
        <div className="inline-block px-4 py-1.5 mb-4 text-xs font-bold tracking-widest text-primary-700 uppercase bg-primary-100 rounded-full">
          Why Choose Us
        </div>
        <h2 className="text-3xl md:text-5xl font-extrabold text-gray-900 mb-6">
          Keuntungan Eksklusif <br />
          <span className="text-primary-600 underline decoration-primary-200 decoration-8 underline-offset-4">Affiliate Kami</span>
        </h2>
        <p className="text-lg text-gray-600 max-w-2xl mx-auto">
          Kami menyediakan segala kebutuhan Anda untuk sukses. Fokus pada promosi, biarkan sistem kami yang bekerja untuk Anda.
        </p>
      </div>

      <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
        {benefits.map((benefit, index) => (
          <Card key={index} className="group p-8 border-none bg-white shadow-xl shadow-gray-100/50 hover:shadow-2xl hover:shadow-primary-100/40 transition-all duration-500 rounded-3xl relative overflow-hidden flex flex-col items-center text-center md:items-start md:text-left">
            <div className={`w-16 h-16 mb-6 bg-gradient-to-br ${benefit.color} rounded-2xl flex items-center justify-center transform group-hover:scale-110 group-hover:rotate-6 transition-all duration-300 shadow-lg`}>
              <benefit.icon className="w-8 h-8 text-white" />
            </div>
            <h3 className="text-xl font-bold text-gray-900 mb-3">{benefit.title}</h3>
            <p className="text-gray-600 leading-relaxed text-sm md:text-base">{benefit.description}</p>

            {/* Subtle Gradient Overlay */}
            <div className={`absolute bottom-0 right-0 w-32 h-32 bg-gradient-to-br ${benefit.color} opacity-[0.03] rounded-tl-full`}></div>
          </Card>
        ))}
      </div>
    </Section>
  );
}
