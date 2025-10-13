import PurchaseHeader from '@/app/purchase/components/PurchaseHeader';
import PurchaseStats from '@/app/purchase/components/PurchaseStats';
import PurchaseTabNavigation from '@/app/purchase/components/PurchaseTabNavigation';
import { Suspense } from 'react';

export default function PurchasePage() {
  return (
    <div className="min-h-screen bg-gray-50">
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* 페이지 헤더 */}
        <PurchaseHeader />

        {/* 주요 지표 */}
        <PurchaseStats />

        <Suspense fallback={<div>Loading...</div>}>
          {/* 탭 네비게이션: 구매 요청 / 발주서 / 공급업체 관리 */}
          <PurchaseTabNavigation />
        </Suspense>
      </main>
    </div>
  );
}
