import Providers from '@/app/providers';
import PurchaseHeader from '@/app/purchase/components/PurchaseHeader';
import PurchaseStats from '@/app/purchase/components/PurchaseStats';
import PurchaseTabNavigation from '@/app/purchase/components/PurchaseTabNavigation';
import { getQueryClient } from '@/lib/queryClient';
import { dehydrate } from '@tanstack/react-query';
import { Suspense } from 'react';
import { fetchPurchaseStats } from '@/app/purchase/api/purchase.api';
import { mapPurchaseStatsToCards } from '@/app/purchase/services/purchase.service';

export default async function PurchasePage() {
  const queryClient = getQueryClient();

  await queryClient.prefetchQuery({
    queryKey: ['purchase-stats'],
    queryFn: async () => {
      const data = await fetchPurchaseStats();
      return mapPurchaseStatsToCards(data);
    },
  });

  const dehydratedState = dehydrate(queryClient);

  return (
    <div className="min-h-screen bg-gray-50">
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* 페이지 헤더 */}
        <PurchaseHeader />

        <Providers dehydratedState={dehydratedState}>
          {/* 주요 지표 */}
          <PurchaseStats />
        </Providers>

        <Suspense fallback={<div>Loading...</div>}>
          {/* 탭 네비게이션: 구매 요청 / 발주서 / 공급업체 관리 */}
          <PurchaseTabNavigation />
        </Suspense>
      </main>
    </div>
  );
}
