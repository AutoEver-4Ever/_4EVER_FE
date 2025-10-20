import FinanceHeader from '@/app/(private)/finance/components/FinanceHeader';
import FinanceTabNavigation from './components/FinanceTabNavigation';
import { Suspense } from 'react';
import { dehydrate } from '@tanstack/react-query';
import { getQueryClient } from '@/lib/queryClient';
import { getFinanceStats, getSalesInvoicesList } from '@/app/(private)/finance/finance.service';
import { InvoiceQueryParams } from './types/InvoiceListType';
import Providers from '@/app/providers';

export default async function FinancePage() {
  const queryClient = getQueryClient();

  await queryClient.prefetchQuery({
    queryKey: ['financeStats'],
    queryFn: getFinanceStats,
  });

  await queryClient.prefetchQuery({
    queryKey: ['salesInvoiceList', { page: 0, size: 10, status: 'ALL' }],
    queryFn: ({ queryKey }) => getSalesInvoicesList(queryKey[1] as InvoiceQueryParams),
  });

  const dehydratedState = dehydrate(queryClient);

  return (
    <Providers dehydratedState={dehydratedState}>
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
    </Providers>
  );
}
