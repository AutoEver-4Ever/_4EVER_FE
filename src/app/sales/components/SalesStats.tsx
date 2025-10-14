'use client';

import { useQuery } from '@tanstack/react-query';
import { useState } from 'react';
import { Period, SalesStatCard } from '@/app/sales/types/SalesStatsType';
import { getSalesStats } from '@/app/sales/service';

const SalesStats = () => {
  const [selectedPeriod, setSelectedPeriod] = useState<Period>('week');
  const periods: { id: Period; name: string }[] = [
    { id: 'week', name: '이번 주' },
    { id: 'month', name: '이번 달' },
    { id: 'quarter', name: '이번 분기' },
    { id: 'year', name: '연도별' },
  ];

  const { data, isLoading, isError } = useQuery<Record<Period, SalesStatCard[]>>({
    queryKey: ['stats'],
    queryFn: getSalesStats,
  });
  if (isLoading) return <p>불러오는 중...</p>;
  if (isError || !data) return <p>데이터를 불러오지 못했습니다.</p>;

  const stats = data[selectedPeriod];

  // const mockStats = [
  //   {
  //     title: '이번 달 매출',
  //     value: '₩485,200,000',
  //     change: '+12.5%',
  //     changeType: 'increase',
  //     icon: 'ri-money-dollar-circle-line',
  //     color: 'blue',
  //   },
  //   {
  //     title: '신규 주문',
  //     value: '₩485,200,000',
  //     change: '+12.5%',
  //     changeType: 'increase',
  //     icon: 'ri-shopping-cart-line',
  //     color: 'green',
  //   },
  // ];

  return (
    <div className="space-y-4">
      {/* 필터링 버튼 */}
      <div className="flex items-center space-x-2">
        {periods.map((period) => (
          <button
            key={period.id}
            onClick={() => setSelectedPeriod(period.id)}
            className={`px-4 py-2 rounded-lg text-sm font-medium transition-colors duration-200 cursor-pointer whitespace-nowrap ${
              selectedPeriod === period.id
                ? 'bg-blue-600 text-white'
                : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
            }`}
          >
            {period.name}
          </button>
        ))}
      </div>

      {/* 통계 카드 */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {stats.map((stat, index) => (
          <div
            key={index}
            className="bg-white rounded-lg border border-gray-200 p-6 hover:shadow-md transition-shadow duration-200"
          >
            <div className="flex items-center justify-between mb-4">
              <div
                className={`w-12 h-12 rounded-lg flex items-center justify-center ${
                  stat.color === 'blue' ? 'bg-blue-100' : 'bg-green-100'
                }`}
              >
                <i
                  className={`${stat.icon} text-xl ${
                    stat.color === 'blue' ? 'text-blue-600' : 'text-green-600'
                  }`}
                ></i>
              </div>
              <div
                className={`flex items-center space-x-1 text-sm font-medium ${
                  stat.changeType === 'increase' ? 'text-green-600' : 'text-red-600'
                }`}
              >
                <i
                  className={`${
                    stat.changeType === 'increase' ? 'ri-arrow-up-line' : 'ri-arrow-down-line'
                  } text-xs`}
                ></i>
                <span>{stat.change}</span>
              </div>
            </div>

            <div>
              <h3 className="text-sm font-medium text-gray-600 mb-1">{stat.title}</h3>
              <p className="text-2xl font-bold text-gray-900">{stat.value}</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default SalesStats;
