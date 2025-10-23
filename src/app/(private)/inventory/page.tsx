import StatSection from '@/app/components/common/StatSection';
import TabNavigation from '@/app/components/common/TabNavigation';
import Providers from '@/app/providers';
import { getQueryClient } from '@/lib/queryClient';
import { INVENTORY_TABS } from '@/types/componentConstant';
import { dehydrate } from '@tanstack/react-query';
import { Suspense } from 'react';
import { getInventoryStats } from '@/app/(private)/inventory/inventory.api';
import { mapInventoryStatsToCards } from './inventory.service';

export default async function InventoryPage() {
  const queryClient = getQueryClient();
  const dehydratedState = dehydrate(queryClient);

  await queryClient.prefetchQuery({
    queryKey: ['inventoryStats'],
    queryFn: getInventoryStats,
  });

  const inventoryStats = await getInventoryStats();
  const inventoryStatsData = mapInventoryStatsToCards(inventoryStats);

  return (
    <Providers dehydratedState={dehydratedState}>
      <div className="min-h-screen bg-gray-50">
        <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          {/* 페이지 헤더 */}
          <StatSection
            title="재고 관리"
            subTitle="재고 현황 및 입출고 관리"
            statsData={inventoryStatsData}
          />
          {/* 탭 콘텐츠 */}
          <Suspense fallback={<div>Loading...</div>}>
            <TabNavigation tabs={INVENTORY_TABS} />
          </Suspense>
        </main>
      </div>
    </Providers>
  );
}
