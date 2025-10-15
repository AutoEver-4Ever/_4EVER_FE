'use client';

import { useState } from 'react';
import { useQuery } from '@tanstack/react-query';

import { fetchPurchaseStats } from '@/app/purchase/api/purchase.api';
import { mapPurchaseStatsToCards } from '@/app/purchase/services/purchase.service';
import { Period } from '@/app/purchase/types/PurchaseStatsType';
import { PURCHASE_STAT_PERIODS } from '@/app/purchase/constants';
import SlidingNavBar from '@/app/components/common/SlidingNavBar';

export default function PurchaseStats() {
  const [selectedPeriod, setSelectedPeriod] = useState<Period>('week');

  const { data, isLoading, isError } = useQuery({
    queryKey: ['purchase-stats'],
    queryFn: async () => {
      const data = await fetchPurchaseStats();
      return mapPurchaseStatsToCards(data);
    },
  });

  if (isLoading) return <p>불러오는 중...</p>;
  if (isError || !data) return <p>데이터를 불러오지 못했습니다.</p>;

  const stats = data[selectedPeriod];

  // 선택된 기간의 레이블 조회
  const currentPeriodLabel =
    PURCHASE_STAT_PERIODS.find((p) => p.key === selectedPeriod)?.value || selectedPeriod; // '이번 주', '이번 달' 등

  return (
    <div className="space-y-4">
      <SlidingNavBar
        items={PURCHASE_STAT_PERIODS}
        selectedKey={selectedPeriod}
        onSelect={(key) => setSelectedPeriod(key as Period)}
      />
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {stats.map((stat, index) => (
          <div key={index} className="bg-white rounded-lg border border-gray-200 p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600">{stat.title}</p>
                <p className="text-2xl font-bold text-gray-900 mt-2">{stat.value}</p>
                <div className="flex items-center mt-2">
                  <span
                    className={`text-sm font-medium ${
                      stat.changeType === 'increase' ? 'text-green-600' : 'text-red-600'
                    }`}
                  >
                    {stat.change}
                  </span>
                  <span className="text-sm text-gray-500 ml-2">{currentPeriodLabel} 대비</span>
                </div>
              </div>
              <div
                className={`w-12 h-12 ${stat.iconBg} rounded-lg flex items-center justify-center`}
              >
                <i className={`${stat.icon} ${stat.iconColor} text-xl`}></i>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
