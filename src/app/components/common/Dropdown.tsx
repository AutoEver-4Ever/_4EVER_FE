import { KeyValueItem } from '@/app/types/CommonType';
import { useEffect, useRef, useState } from 'react';

interface DropdownProps<T extends string = string> {
  items: KeyValueItem[];
  value: T; // 선택된 값
  onChange?: (key: T) => void;
  className?: string;
}

export default function Dropdown<T extends string = string>({
  items,
  value,
  onChange,
  className = '',
}: DropdownProps<T>) {
  const [open, setOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);

  const selectedItem = items.find((item) => item.key === value);
  const displayLabel = selectedItem?.value;

  const handleSelect = (key: string) => {
    onChange?.(key as T);
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
        type="button"
        onClick={() => setOpen(!open)}
        className={`pl-4 pr-1.5 py-1.5 text-sm rounded-lg font-medium focus:outline-none transition cursor-pointer
                    ${
                      selectedItem?.key === 'ALL'
                        ? 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                        : 'bg-blue-100 text-blue-500 hover:bg-blue-200/70'
                    }
                  `}
      >
        <span>{displayLabel ?? items[0].value}</span>
        <span className="pl-2">
          <i className="ri-arrow-down-s-line"></i>
        </span>
      </button>
      {/* 드롭다운 리스트 */}
      {open && (
        <ul className="absolute left-0 top-full mt-1 min-w-full bg-white border border-gray-200 rounded-lg shadow-lg z-10">
          {items.map((item, index) => {
            const isSelected = item.key === selectedItem?.key;
            const borderRadiusClass =
              index === 0 ? 'rounded-t-lg' : index === items.length - 1 ? 'rounded-b-lg' : '';
            return (
              <li
                key={item.key}
                onClick={() => {
                  handleSelect(item.key);
                }}
                className={`px-4 py-2 text-sm truncate cursor-pointer
                            ${borderRadiusClass}
                            ${isSelected ? 'text-blue-500 bg-blue-50' : 'text-gray-800 hover:bg-blue-50'}
                          `}
              >
                {item.value}
              </li>
            );
          })}
        </ul>
      )}
    </div>
  );
}
