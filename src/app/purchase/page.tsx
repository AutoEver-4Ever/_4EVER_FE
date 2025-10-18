import Providers from '@/app/providers';
import { getQueryClient } from '@/lib/queryClient';
import { dehydrate } from '@tanstack/react-query';
import { Suspense } from 'react';
import { fetchPurchaseStats } from '@/app/purchase/api/purchase.api';
import { mapPurchaseStatsToCards } from '@/app/purchase/services/purchase.service';
import { PURCHASE_TABS } from '@/app/purchase/constants';
import PageHeader from '@/app/components/common/PageHeader';
import PurchaseStatsSection from '@/app/purchase/components/sections/PurchaseStatsSection';
import TabNavigation from '@/app/components/common/TabNavigation';

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
        <PageHeader
          title="구매 및 조달 관리"
          subTitle="구매 요청부터 발주까지 전체 프로세스 관리"
        />
        <Providers dehydratedState={dehydratedState}>
          {/* 구매 관리 주요 지표 */}
          <PurchaseStatsSection />
        </Providers>

        <Suspense fallback={<div>Loading...</div>}>
          <TabNavigation tabs={PURCHASE_TABS} />
        </Suspense>
      </main>
    </div>
  );
}
