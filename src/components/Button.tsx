import { ButtonHTMLAttributes } from 'react';

interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: 'primary' | 'secondary' | 'outline' | 'glass' | 'white';
  size?: 'xs' | 'sm' | 'md' | 'lg' | 'xl';
  rounded?: 'normal' | 'full';
  children: React.ReactNode;
}

export default function Button({
  variant = 'primary',
  size = 'md',
  rounded = 'normal',
  children,
  className = '',
  ...props
}: ButtonProps) {
  const baseStyles = 'inline-flex items-center justify-center font-bold tracking-tight transition-all duration-300 transform active:scale-95 disabled:opacity-50 disabled:cursor-not-allowed';

  const variants = {
    primary: 'bg-primary-600 text-white hover:bg-primary-700 shadow-xl shadow-primary-200 hover:shadow-primary-300 hover:-translate-y-1',
    secondary: 'bg-accent text-primary-900 hover:bg-amber-500 shadow-xl shadow-accent/20 hover:-translate-y-1',
    outline: 'bg-transparent text-primary-600 border-2 border-primary-600 hover:bg-primary-600 hover:text-white hover:-translate-y-1',
    glass: 'bg-white/10 backdrop-blur-md text-white border border-white/20 hover:bg-white/20 hover:-translate-y-1',
    white: 'bg-white text-primary-900 hover:bg-gray-100 shadow-2xl hover:-translate-y-1'
  };

  const sizes = {
    xs: 'px-4 py-1.5 text-xs',
    sm: 'px-6 py-2.5 text-sm',
    md: 'px-8 py-3.5 text-base',
    lg: 'px-10 py-4.5 text-lg',
    xl: 'px-10 py-6 text-xl md:text-2xl shadow-2xl'
  };

  const roundedStyles = {
    normal: 'rounded-2xl',
    full: 'rounded-full'
  };

  return (
    <button
      className={`${baseStyles} ${variants[variant]} ${sizes[size as keyof typeof sizes]} ${roundedStyles[rounded]} ${className}`}
      {...props}
    >
      {children}
    </button>
  );
}
