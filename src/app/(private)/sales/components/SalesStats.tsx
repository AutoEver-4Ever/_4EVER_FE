'use client';

import { useQuery } from '@tanstack/react-query';
import { SalesStatResponse } from '@/app/(private)/sales/types/SalesStatsType';
import { getSalesStats } from '@/app/(private)/sales/sales.api';
import { mapSalesStatsToCards } from '../sales.service';
import StatSection from '@/app/components/statCard/StatSection';

const SalesStats = () => {
  const { data, isLoading, isError } = useQuery<SalesStatResponse>({
    queryKey: ['stats'],
    queryFn: getSalesStats,
    staleTime: 1000,
  });
  if (isLoading) return <p>불러오는 중...</p>;
  if (isError || !data) return <p>데이터를 불러오지 못했습니다.</p>;

  const stats = mapSalesStatsToCards(data);

  return (
    <div className="space-y-4">
      {/* 통계 카드 */}
      <StatSection statsData={stats} />
    </div>
  );
};

export default SalesStats;
