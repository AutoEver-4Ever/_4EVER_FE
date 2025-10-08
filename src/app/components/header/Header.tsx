'use client';

import { useEffect, useState } from 'react';
import Logo from './Logo';
import Navigation from './Navigation';
import NotificationDropdown from './NoificationDropdown';
import ProfileDropdown from './ProfileDropdown';

interface HeaderProps {
  userRole?: string;
  userName?: string;
  userEmail?: string;
}

export default function Header({
  userRole = '관리자',
  userName = '홍길동',
  userEmail = 'hong@company.com',
}: HeaderProps) {
  const [isScrolled, setIsScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 0);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-40 transition-all duration-300 ${
        isScrolled ? 'bg-white shadow-sm border-gray-100' : 'bg-gray-50'
      }`}
    >
      <div className="min-w-full mx-auto px-8 sm:px-6 lg:px-4">
        <div className="flex justify-between items-center h-16 pt-1">
          {/* 좌측: 로고 + 네비게이션 바*/}
          <div className="flex gap-6">
            <Logo />
            <Navigation />
          </div>

          {/* 우측: 알림 + 프로필 */}
          <div className="flex items-center space-x-4">
            <NotificationDropdown />
            <ProfileDropdown userName={userName} userEmail={userEmail} userRole={userRole} />
          </div>
        </div>
      </div>
    </header>
  );
}
