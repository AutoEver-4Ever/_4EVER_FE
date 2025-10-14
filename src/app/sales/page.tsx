import SalesHeader from '@/app/sales/components/SalesHeader';
import SalesStats from '@/app/sales/components/SalesStats';
import SalesTabNavigation from '@/app/sales/components/SalesTabNavigation';
import { getQueryClient } from '@/lib/queryClient';
import { dehydrate } from '@tanstack/react-query';
import { redirect } from 'next/navigation';
import { Suspense } from 'react';
import Providers from '@/app/providers';
import { fetchSalesStats } from '@/app/sales/service';

export default async function SalesPage({
  searchParams,
}: {
  searchParams: Promise<{ tab?: string }>;
}) {
  const queryClient = getQueryClient();
  await queryClient.prefetchQuery({
    queryKey: ['stats'],
    queryFn: fetchSalesStats,
  });
  const dehydratedState = dehydrate(queryClient);

  return (
    <div className="min-h-screen bg-gray-50">
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* 페이지 헤더 */}
        <SalesHeader />

        <Providers dehydratedState={dehydratedState}>
          {/* 주요 지표 */}
          <SalesStats />
        </Providers>

        {/* 탭 콘텐츠 */}
        <Suspense fallback={<div>Loading...</div>}>
          <SalesTabNavigation />
        </Suspense>
      </main>
    </div>
  );
}
