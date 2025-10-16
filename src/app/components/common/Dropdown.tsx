import { ReactNode, useEffect, useRef, useState } from 'react';

interface DropdownItem {
  label: string;
  value: string;
}

interface DropdownProps {
  label: string | ReactNode;
  items: DropdownItem[];
  onChange?: (value: string) => void;
  className?: string;
}

export default function Dropdown({ label, items, onChange, className = '' }: DropdownProps) {
  const [open, setOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);

  const handleSelect = (value: string) => {
    onChange?.(value);
    setOpen(false); // 닫기
  };

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setOpen(false);
      }
    };

    if (open) {
      document.addEventListener('mousedown', handleClickOutside);
    }

    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [open]);

  return (
    <div ref={dropdownRef} className={`relative inline-block ${className}`}>
      {/* 버튼 */}
      <button
        onClick={() => setOpen(!open)}
        className="pl-4 pr-1.5 py-1.5 bg-white text-gray-700 border border-gray-400 text-sm rounded-lg font-medium focus:outline-none transition hover:bg-gray-100 cursor-pointer"
      >
        <span>{label}</span>
        <span className="pl-2">
          <i className="ri-arrow-down-s-line"></i>
        </span>
      </button>
      {/* 드롭다운 리스트 */}
      {open && (
        <ul className="absolute left-0 top-full mt-1 min-w-full bg-white border border-gray-200 rounded-lg shadow-lg z-10">
          {items.map((item) => (
            <li
              key={item.value}
              onClick={() => {
                handleSelect(item.value);
              }}
              className="px-4 py-2 text-sm text-gray-800 hover:bg-gray-100 cursor-pointer truncate"
            >
              {item.label}
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}
