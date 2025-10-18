import { Suspense } from 'react';
import BomStats from './components/BomStats';
import BomList from './components/BomTab';
import MrpCalculation from './components/MrpCalculation';
import ProductionPlan from '../ProductionPlan';
import ManufacturingExecution from './components/MesTab';
import MrpTabNew from './components/MrpTab';
import PageHeader from '@/app/components/common/PageHeader';
import Providers from '@/app/providers';
import { getQueryClient } from '@/lib/queryClient';
import { fetchPurchaseStats } from '@/app/(private)/purchase/api/purchase.api';
import { mapPurchaseStatsToCards } from '@/app/(private)/purchase/services/purchase.service';
import PurchaseStatsSection from '@/app/(private)//purchase/components/sections/PurchaseStatsSection';
import TabNavigation from '@/app/components/common/TabNavigation';
import { dehydrate } from '@tanstack/react-query';
import { Production_TABS } from './constants';

export default async function BomPage() {
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
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* 페이지 헤더 */}
        <PageHeader
          title="생산관리"
          subTitle="MPS, MRP, MES, BOM 전 과정을 아우르는 생산 계획 및 실행 통합 관리"
        />
        {/* <BomStats /> */}

        <Providers dehydratedState={dehydratedState}>
          <PurchaseStatsSection />
        </Providers>

        <Suspense fallback={<div>Loading..</div>}>
          <TabNavigation tabs={Production_TABS} />
        </Suspense>
      </div>
    </div>
  );
}
