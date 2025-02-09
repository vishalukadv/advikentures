import React from 'react';
import { LucideIcon } from 'lucide-react';
import { cn } from '../utils/cn';

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLAnchorElement> {
  variant?: 'primary' | 'outline';
  icon?: LucideIcon;
  href: string;
}

const Button: React.FC<ButtonProps> = ({
  children,
  variant = 'primary',
  icon: Icon,
  className,
  href,
  ...props
}) => {
  const baseStyles = "px-8 py-3 rounded-full font-semibold transition-colors flex items-center gap-2";
  const variants = {
    primary: "bg-white text-orange-600 hover:bg-orange-50",
    outline: "bg-transparent border-2 border-white text-white hover:bg-white/10"
  };

  return (
    <a
      href={href}
      className={cn(
        baseStyles,
        variants[variant],
        className
      )}
      {...props}
    >
      {children}
      {Icon && <Icon className="group-hover:translate-x-1 transition-transform" />}
    </a>
  );
};

export default Button;