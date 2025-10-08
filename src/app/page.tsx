'use client';

import { useEffect } from 'react';
import { useRouter } from 'next/navigation';

export default function Home() {
  const router = useRouter();

  useEffect(() => {
    router.push('/dashboard');
  }, [router]);

  return (
    <div className="flex flex-col items-center justify-center min-h-screen">
      <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-indigo-600"></div>
      {/* 로딩 컴포넌트 구현 예정 */}
      <p className="mt-4 text-gray-600">대시보드로 이동 중...</p>
    </div>
  );
}
