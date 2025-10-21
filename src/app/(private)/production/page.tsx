import { Suspense } from 'react';
import BomStats from './components/BomStats';
import BomList from './components/tabs/BomTab';
import MrpCalculation from './components/MrpCalculation';
// import ProductionPlan from '../ProductionPlan';
import ManufacturingExecution from './components/tabs/MesTab';
import MrpTabNew from './components/tabs/MrpTab';
import Providers from '@/app/providers';
import { getQueryClient } from '@/lib/queryClient';
import { fetchPurchaseStats } from '@/app/(private)/purchase/api/purchase.api';
import { mapPurchaseStatsToCards } from '@/app/(private)/purchase/services/purchase.service';
import TabNavigation from '@/app/components/common/TabNavigation';
import { dehydrate } from '@tanstack/react-query';
import { Production_TABS } from './constants';

export default async function BomPage() {
  const queryClient = getQueryClient();

  const dehydratedState = dehydrate(queryClient);

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* 페이지 헤더 */}
        {/* <BomStats /> */}

        <Suspense fallback={<div>Loading..</div>}>
          <TabNavigation tabs={Production_TABS} />
        </Suspense>
      </div>
    </div>
  );
}
