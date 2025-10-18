'use client';

import { useQuery } from '@tanstack/react-query';

import { fetchPurchaseStats } from '@/app/purchase/api/purchase.api';
import { mapPurchaseStatsToCards } from '@/app/purchase/services/purchase.service';
import StatSection from '@/app/components/statCard/StatSection';

export default function PurchaseStatsSection() {
  const { data, isLoading, isError } = useQuery({
    queryKey: ['purchase-stats'],
    queryFn: async () => {
      const rawData = await fetchPurchaseStats();
      return mapPurchaseStatsToCards(rawData);
    },
  });

  if (isLoading) return <p>불러오는 중...</p>;
  if (isError || !data) return <p>데이터를 불러오지 못했습니다.</p>;

  return (
    <div className="space-y-4">
      <StatSection statsData={data} />
    </div>
  );
}
