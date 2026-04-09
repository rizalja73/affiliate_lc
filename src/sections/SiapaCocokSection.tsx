import { GraduationCap, Users, BookOpen, Home, Megaphone, Briefcase, CheckCircle2 } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import Card from '../components/Card';
import Section from '../components/Section';

const profiles = [
  {
    icon: GraduationCap,
    title: 'Mahasiswa & Pelajar',
    description: 'Cari tambahan uang jajan sambil kuliah dengan promosi fleksibel sesuai jadwal Anda.',
    gradient: 'from-primary-500 to-primary-600'
  },
  {
    icon: Users,
    title: 'Content Creator',
    description: 'Monetisasi audience Anda dengan produk edukatif yang memberikan value nyata.',
    gradient: 'from-primary-500 to-primary-600'
  },
  {
    icon: BookOpen,
    title: 'Guru & Pendidik',
    description: 'Berbagi manfaat pendidikan Lampung Cerdas sambil dapat income tambahan.',
    gradient: 'from-primary-500 to-primary-600'
  },
  {
    icon: Home,
    title: 'IRT',
    description: 'Dapatkan penghasilan tambahan dari rumah sambil tetap fokus mengurus keluarga.',
    gradient: 'from-primary-500 to-primary-600'
  },
  {
    icon: Megaphone,
    title: 'Influencer',
    description: 'Gunakan pengaruh positif Anda untuk membantu orang lain berkembang.',
    gradient: 'from-primary-500 to-primary-600'
  },
  {
    icon: Briefcase,
    title: 'Siapa Saja',
    description: 'Siapapun yang ingin produktif dan menghasilkan dari smartphone/laptop.',
    gradient: 'from-primary-500 to-primary-600'
  }
];

export default function SiapaCocokSection() {
  const navigate = useNavigate();

  return (
    <Section background="gradient" className="relative overflow-hidden">
      <div className="absolute top-0 right-1/4 w-64 h-64 bg-primary-100 rounded-full blur-3xl opacity-30 -z-10"></div>
      
      <div className="text-center mb-16">
        <h2 className="text-3xl md:text-5xl font-extrabold text-gray-900 mb-6">
          Siapa yang <span className="text-primary-600 underline underline-offset-8 decoration-primary-200">Cocok Bergabung</span>?
        </h2>
        <p className="text-lg text-gray-600 max-w-2xl mx-auto font-medium">
          Kami menyambut siapapun yang memiliki semangat untuk bertumbuh dan membantu orang lain melalui edukasi.
        </p>
      </div>

      <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-8">
        {profiles.map((profile, index) => (
          <Card key={index} className="group p-8 border-none bg-white/80 backdrop-blur-sm shadow-xl shadow-gray-200/50 hover:shadow-2xl hover:bg-white transition-all duration-500 rounded-[2.5rem] relative overflow-hidden text-center">
            <div className={`w-20 h-20 mx-auto mb-6 bg-gradient-to-br ${profile.gradient} rounded-3xl flex items-center justify-center text-white shadow-lg transform group-hover:scale-110 group-hover:rotate-6 transition-all duration-300`}>
              <profile.icon className="w-10 h-10" />
            </div>

            <h3 className="text-2xl font-black text-gray-900 mb-4">{profile.title}</h3>
            <p className="text-gray-600 leading-relaxed font-normal mb-8">{profile.description}</p>

            <button 
              onClick={() => navigate('/register')}
              className="inline-flex items-center gap-2 px-4 py-2 bg-gray-50 rounded-full text-primary-600 font-bold text-sm group-hover:bg-primary-600 group-hover:text-white transition-all duration-300 cursor-pointer border-none"
            >
              <span>Mulai Sekarang</span>
              <CheckCircle2 className="w-4 h-4" />
            </button>
            
            {/* Subtle number background */}
            <span className="absolute -bottom-4 -right-2 text-8xl font-black text-gray-100/30 group-hover:text-primary-50/50 transition-colors pointer-events-none">
              {index + 1}
            </span>
          </Card>
        ))}
      </div>

      <div className="mt-16 text-center max-w-4xl mx-auto">
        <div className="p-1 w-full bg-gradient-to-r from-transparent via-primary-200 to-transparent mb-12"></div>
        <div className="bg-white/50 backdrop-blur-md rounded-[3rem] p-10 md:p-14 shadow-2xl border border-white/40">
           <p className="text-2xl md:text-3xl font-black text-gray-900 mb-6 leading-tight">
            "Tidak Ada Pengalaman? <br />
            <span className="text-primary-600">Bukan Masalah!</span>"
          </p>
          <p className="text-lg text-gray-600 leading-relaxed mb-8 max-w-2xl mx-auto font-medium">
            Kami menyediakan Video Tutorial, Copywriting siap pakai, hingga Training eksklusif di grup private untuk memastikan Anda bisa langsung action dan closing!
          </p>
          <button 
            onClick={() => navigate('/register')}
            className="px-10 py-5 bg-primary-600 text-white font-black text-xl rounded-2xl shadow-xl shadow-primary-200 hover:bg-primary-700 hover:scale-105 transition-all active:scale-95"
          >
            GABUNG SEKARANG JUGA
          </button>
        </div>
      </div>
    </Section>
  );
}
