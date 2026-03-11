interface CardProps {
  children: React.ReactNode;
  className?: string;
  hover?: boolean;
}

export default function Card({ children, className = '', hover = true }: CardProps) {
  return (
    <div
      className={`bg-white rounded-2xl shadow-md p-6 ${hover ? 'transition-all duration-300 hover:shadow-xl hover:-translate-y-2' : ''} ${className}`}
    >
      {children}
    </div>
  );
}
