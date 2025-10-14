interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  icon: string;
  variant?: 'primary' | 'secondary' | 'outline';
  size?: 'sm' | 'md' | 'lg';
}

export default function IconButton({
  icon,
  variant = 'primary',
  size = 'md',
  className,
  children,
  ...props
}: ButtonProps) {
  const base =
    'inline-flex items-center rounded-lg font-semibold focus:outline-none transition cursor-pointer';
  const variants = {
    primary: 'bg-blue-500 text-white hover:opacity-85',
    secondary: 'bg-gray-200 text-gray-600 hover:bg-gray-300',
    outline: 'border border-blue-500 text-blue-500 bg-transparent hover:bg-blue-50',
  };
  const sizes = {
    sm: 'px-3 py-0.5 text-sm',
    md: 'px-4 py-1.5 text-base',
    lg: 'px-5 py-2.5 text-lg',
  };

  // 글자보다 한 단계 큰 아이콘 클래스 매핑
  const iconSizes = {
    sm: 'text-base',
    md: 'text-lg',
    lg: 'text-xl',
  };

  return (
    <button className={`${base} ${variants[variant]} ${sizes[size]} ${className}`} {...props}>
      {icon && (
        <span className="pr-1">
          <i className={`${icon} ${iconSizes[size]}`}></i>
        </span>
      )}
      <span className="pr-1">{children}</span>
    </button>
  );
}
