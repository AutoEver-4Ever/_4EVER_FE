interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  label: string;
  variant?: 'primary' | 'secondary' | 'outline' | 'whiteOutline';
  size?: 'sm' | 'md' | 'lg';
  icon?: string;
}

export default function Button({
  label,
  variant = 'primary',
  size = 'md',
  className,
  ...props
}: ButtonProps) {
  const base = 'rounded-lg font-semibold focus:outline-none transition cursor-pointer';
  const variants = {
    primary: 'bg-blue-500 text-white hover:opacity-85',
    secondary: 'bg-gray-200 text-gray-500 hover:bg-gray-300',
    outline: 'border border-blue-500 text-blue-500 bg-transparent hover:bg-blue-50',
    whiteOutline: 'bg-white border border-gray-300 text-gray-700 hover:bg-gray-50',
  };
  const sizes = {
    sm: 'px-3 py-1.5 text-sm',
    md: 'px-4 py-2 text-base',
    lg: 'px-5 py-3 text-lg',
  };

  return (
    <button className={`${base} ${variants[variant]} ${sizes[size]} ${className}`} {...props}>
      {label}
    </button>
  );
}
