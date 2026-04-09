import { useState } from 'react';
import { ChevronLeft, ChevronRight, Star, Quote } from 'lucide-react';
import Card from '../components/Card';
import Section from '../components/Section';

const testimonials = [
  {
    name: 'Khumaira',
    role: 'Full-time Affiliate',
    image: '/khumaira.jpeg',
    rating: 5,
    text: 'Alhamdulillah sudah banyak Resolusi saya tercapai Mulai dari medapatkan 10 juta pertama saya, bayar kuliah sendiri, dan membeli kendaraan dengan uang saya sendiri. Itu semua saya sadari Karena Saya Join Program Mentoringnya Lampung Cerdas. Sudah tidak di ragukan lagi,Join saja dan rasakan Manfaatnya.',
    income: 'Rp 4.5jt/bulan',
  },
  {
    name: 'Ditra Irfan',
    role: 'Mahasiswa',
    image: '/Ditra Irfan.jpeg',
    rating: 5,
    text: 'Dari berbagai program yang aku ikuti, penghasilan total yang aku dapet lebih dari 10 juta rupiah. Tapi buat aku, yang paling berharga adalah perubahan diri. Program kayak SNBT Plus, Public Speaking School, Life Mentoring Batch, Resolusi Mimpi, dan berbagai ebook serta buku seperti Cara Gila Mengubah Diri, Jangan Menyerah Harus Berubah, Kuliah dengan Modal Nol Rupiah',
    income: 'Rp 2.2jt/bulan',
  },
  {
    name: 'Ade Eka ',
    role: 'Professional Marketer',
    image: '/mba ade.png',
    rating: 5,
    text: 'Saya sudah ikut banyak program affiliate, tapi support di sini luar biasa. Disediakan konten harian yang tinggal copas. Sangat cocok buat yang sibuk tapi ingin tetap produktif.',
    income: 'Rp 7.8jt/bulan',
  },
  {
    name: 'Nita ',
    role: 'Influenser',
    image: '/nita.png',
    rating: 5,
    text: 'Saya sudah ikut banyak program affiliate, tapi support di sini luar biasa. Disediakan konten harian yang tinggal copas. Sangat cocok buat yang sibuk tapi ingin tetap produktif.',
    income: 'Rp 7.8jt/bulan',
  },
];

export default function TestimoniSection() {
  const [currentIndex, setCurrentIndex] = useState(0);

  const nextTestimonial = () => {
    setCurrentIndex((prev) => (prev + 1) % testimonials.length);
  };

  const prevTestimonial = () => {
    setCurrentIndex((prev) => (prev - 1 + testimonials.length) % testimonials.length);
  };

  return (
    <Section background="white" className="relative overflow-hidden">
      <div className="absolute -top-24 -left-24 w-96 h-96 bg-primary-50 rounded-full blur-3xl opacity-60 -z-10"></div>

      <div className="text-center mb-16">
        <h2 className="text-3xl md:text-5xl font-extrabold text-gray-900 mb-6">
          Kisah Sukses <span className="text-primary-600">Affiliate Kami</span>
        </h2>
        <p className="text-lg text-gray-600 max-w-2xl mx-auto font-medium">
          Bergabunglah dengan ratusan orang lainnya yang telah berhasil mengubah smartphone mereka menjadi mesin penghasil uang.
        </p>
      </div>

      <div className="max-w-5xl mx-auto relative px-4">
        <Card className="bg-white border-none shadow-[0_32px_64px_-16px_rgba(0,0,0,0.1)] rounded-[3rem] p-8 md:p-16 relative overflow-hidden" hover={false}>
          {/* Decorative Elements */}
          <Quote className="absolute top-12 right-12 w-32 h-32 text-primary-50 opacity-50" />

          <div className="relative z-10">
            <div className="grid lg:grid-cols-12 gap-12 items-center">
              {/* Image Side */}
              <div className="lg:col-span-5">
                <div className="relative">
                  <div className="absolute inset-0 bg-primary-600 rounded-[2.5rem] rotate-6 scale-95 opacity-20"></div>
                  <div className="relative rounded-[2.5rem] overflow-hidden shadow-2xl border-8 border-white">
                    <img
                      src={testimonials[currentIndex].image}
                      alt={testimonials[currentIndex].name}
                      className="w-full h-auto object-cover aspect-square scale-110 hover:scale-100 transition-transform duration-700"
                    />
                  </div>
                  {/* Floating Income tag */}
                  <div className="absolute -bottom-6 -right-6 bg-primary-600 text-white font-black px-6 py-4 rounded-2xl shadow-xl transform -rotate-3">
                    {testimonials[currentIndex].income}
                  </div>
                </div>
              </div>

              {/* Content Side */}
              <div className="lg:col-span-7 space-y-8">
                <div className="flex gap-1">
                  {[...Array(testimonials[currentIndex].rating)].map((_, i) => (
                    <Star key={i} className="w-6 h-6 fill-primary-600 text-primary-600" />
                  ))}
                </div>

                <p className="text-xl md:text-2xl text-gray-700 leading-relaxed font-medium italic">
                  "{testimonials[currentIndex].text}"
                </p>

                <div className="pt-8 border-t border-gray-100 flex items-center justify-between">
                  <div>
                    <h3 className="text-2xl font-black text-gray-900">{testimonials[currentIndex].name}</h3>
                    <p className="text-primary-600 font-bold tracking-wide uppercase text-sm mt-1">{testimonials[currentIndex].role}</p>
                  </div>

                  <div className="flex gap-4">
                    <button
                      onClick={prevTestimonial}
                      className="w-14 h-14 rounded-2xl bg-gray-50 text-gray-400 flex items-center justify-center hover:bg-primary-600 hover:text-white transition-all shadow-sm hover:shadow-xl group"
                    >
                      <ChevronLeft className="w-6 h-6 group-hover:-translate-x-1 transition-transform" />
                    </button>
                    <button
                      onClick={nextTestimonial}
                      className="w-14 h-14 rounded-2xl bg-gray-50 text-gray-400 flex items-center justify-center hover:bg-primary-600 hover:text-white transition-all shadow-sm hover:shadow-xl group"
                    >
                      <ChevronRight className="w-6 h-6 group-hover:translate-x-1 transition-transform" />
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </Card>

        {/* Indicators */}
        <div className="flex justify-center gap-3 mt-12">
          {testimonials.map((_, index) => (
            <button
              key={index}
              onClick={() => setCurrentIndex(index)}
              className={`h-2.5 rounded-full transition-all duration-500 ${index === currentIndex ? 'w-12 bg-primary-600' : 'w-2.5 bg-primary-100 hover:bg-primary-200'
                }`}
            />
          ))}
        </div>
      </div>
    </Section>
  );
}
