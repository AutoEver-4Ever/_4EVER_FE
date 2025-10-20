import SalesHeader from '@/app/(private)/sales/components/SalesHeader';
import SalesTabNavigation from '@/app/(private)/sales/components/SalesTabNavigation';
import { getQueryClient } from '@/lib/queryClient';
import { dehydrate } from '@tanstack/react-query';
import { Suspense } from 'react';
import Providers from '@/app/providers';
import { getQuoteList, getSalesStats } from '@/app/(private)/sales/sales.api';
import { QuoteQueryParams } from '@/app/(private)/sales/types/SalesQuoteListType';

export default async function SalesPage() {
  const queryClient = getQueryClient();

  await queryClient.prefetchQuery({
    queryKey: ['stats'],
    queryFn: getSalesStats,
  });
  await queryClient.prefetchQuery({
    queryKey: [
      'quoteList',
      { page: 0, size: 10, startDate: '', endDate: '', status: 'ALL', search: '' },
    ],
    queryFn: ({ queryKey }) => getQuoteList(queryKey[1] as QuoteQueryParams),
  });

  const dehydratedState = dehydrate(queryClient);

  return (
    <Providers dehydratedState={dehydratedState}>
      <div className="min-h-screen bg-gray-50">
        <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          {/* 페이지 헤더 */}
          <SalesHeader />

          {/* 탭 콘텐츠 */}
          <Suspense fallback={<div>Loading...</div>}>
            <SalesTabNavigation />
          </Suspense>
        </main>
      </div>
    </Providers>
  );
}
