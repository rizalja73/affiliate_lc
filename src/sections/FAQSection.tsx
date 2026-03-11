import { useState } from 'react';
import { ChevronDown, HelpCircle } from 'lucide-react';
import Section from '../components/Section';

const faqs = [
  {
    question: 'Berapa biaya untuk bergabung?',
    answer: '100% Gratis! Tidak ada biaya pendaftaran atau biaya bulanan apapun untuk menjadi affiliate kami. Anda bisa langsung mendaftar dan mulai promosi.'
  },
  {
    question: 'Bagaimana sistem komisi dihitung?',
    answer: 'Setiap penjualan program edukasi dari link affiliate Anda akan mendapatkan komisi sebesar 20%. Anda bisa melihat detail closing dan komisi di dashboard secara real-time.'
  },
  {
    question: 'Kapan komisi akan dibayarkan?',
    answer: 'Komisi dibayarkan secara rutin setiap minggu atau bulan (sesuai pilihan Anda) langsung ke rekening bank yang Anda daftarkan di dashboard affiliate.'
  },
  {
    question: 'Apakah ada materi promosi yang disediakan?',
    answer: 'Tentu! Kami menyediakan beragam materi promosi mulai dari banner harian, copywriting, hingga video testimoni yang siap Anda bagikan di media sosial.'
  },
  {
    question: 'Apakah saya perlu modal untuk mulai?',
    answer: 'Sama sekali tidak. Anda bisa memulai dari nol hanya dengan smartphone dan koneksi internet. Kami juga menyediakan panduan agar Anda bisa langsung closing.'
  },
  {
    question: 'Apakah ada grup support untuk affiliate?',
    answer: 'Ya, kami memiliki grup private di WhatsApp/Telegram khusus untuk para affiliate. Di sana kami berbagi tips, strategi closing, dan update terbaru seputar program.'
  }
];

export default function FAQSection() {
  const [openIndex, setOpenIndex] = useState<number | null>(0);

  return (
    <Section background="gradient" className="relative overflow-hidden">
      <div className="absolute top-1/2 left-0 w-96 h-96 bg-primary-100/50 rounded-full blur-3xl -z-10"></div>
      
      <div className="text-center mb-16">
        <div className="inline-flex items-center gap-2 px-4 py-2 mb-4 text-xs font-bold text-primary-700 uppercase bg-primary-100 rounded-full">
          <HelpCircle className="w-4 h-4" />
          Got Questions?
        </div>
        <h2 className="text-3xl md:text-5xl font-extrabold text-gray-900 mb-6">
          Pertanyaan Yang <br /><span className="text-primary-600 italic">Sering Diajukan</span>
        </h2>
        <p className="text-lg text-gray-600 max-w-2xl mx-auto font-medium">
          Temukan jawaban atas pertanyaan umum seputar program affiliate Lampung Cerdas.
        </p>
      </div>

      <div className="max-w-4xl mx-auto space-y-4">
        {faqs.map((faq, index) => (
          <div
            key={index}
            className={`border-none rounded-[1.5rem] overflow-hidden transition-all duration-300 ${
              openIndex === index ? 'bg-white shadow-2xl shadow-primary-100/50 scale-[1.02]' : 'bg-white/50 hover:bg-white/80'
            }`}
          >
            <button
              onClick={() => setOpenIndex(openIndex === index ? null : index)}
              className="w-full flex items-center justify-between p-6 md:p-8 text-left transition-colors"
            >
              <span className={`text-lg md:text-xl font-bold ${openIndex === index ? 'text-primary-700' : 'text-gray-900'}`}>
                {faq.question}
              </span>
              <div className={`w-10 h-10 rounded-full flex items-center justify-center transition-all ${openIndex === index ? 'bg-primary-600 text-white rotate-180' : 'bg-gray-100 text-gray-500'}`}>
                <ChevronDown className="w-6 h-6" />
              </div>
            </button>
            
            <div
              className={`transition-all duration-300 ease-in-out ${
                openIndex === index ? 'max-h-[300px] opacity-100 pb-8 px-6 md:px-8' : 'max-h-0 opacity-0'
              } overflow-hidden`}
            >
              <div className="p-4 md:p-6 bg-gray-50 rounded-2xl border-l-4 border-primary-500">
                <p className="text-gray-600 leading-relaxed text-lg italic">
                  "{faq.answer}"
                </p>
              </div>
            </div>
          </div>
        ))}
      </div>
    </Section>
  );
}
