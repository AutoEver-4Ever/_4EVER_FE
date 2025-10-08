import Link from 'next/link';

export default function Logo() {
  return (
    <Link href="/dashboard" className="flex items-center space-x-2 cursor-pointer">
      <div className="w-9 h-9 bg-blue-500 rounded-lg flex items-center justify-center">
        <i className="ri-building-4-line text-white text-lg"></i>
      </div>
      <div>
        <span className="text-lg font-bold text-gray-800">ERP System</span>
      </div>
    </Link>
  );
}
