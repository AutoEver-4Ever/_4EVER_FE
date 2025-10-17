import FinanceHeader from '@/app/(private)/finance/components/FinanceHeader';
import FinanceTabNavigation from './components/FinanceTabNavigation';
import { Suspense } from 'react';

export default function FinancePage() {
  return (
    <div className="min-h-screen bg-gray-50">
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* 페이지 헤더 */}
        <FinanceHeader />

        {/* 탭 네비게이션 */}
        <Suspense fallback={<div>Loading...</div>}>
          <FinanceTabNavigation />
        </Suspense>
      </main>
    </div>
  );
}
