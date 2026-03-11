interface SectionProps {
  children: React.ReactNode;
  className?: string;
  background?: 'white' | 'gray' | 'gradient';
}

export default function Section({ children, className = '', background = 'white' }: SectionProps) {
  const backgrounds = {
    white: 'bg-white',
    gray: 'bg-gray-50',
    gradient: 'bg-gradient-to-br from-primary-50 via-white to-primary-50'
  };

  return (
    <section className={`${backgrounds[background]} py-16 md:py-24 ${className}`}>
      <div className="container mx-auto px-4 md:px-6 lg:px-8 max-w-7xl">
        {children}
      </div>
    </section>
  );
}
