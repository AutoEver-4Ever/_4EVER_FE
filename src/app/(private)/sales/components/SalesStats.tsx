'use client';

import { useQuery } from '@tanstack/react-query';
import { Period, SalesStatCard } from '@/app/(private)/sales/types/SalesStatsType';
import { getSalesStats } from '@/app/(private)/sales/service';

interface SalesStatsProps {
  $selectedPeriod: Period;
}

const SalesStats = ({ $selectedPeriod }: SalesStatsProps) => {
  const { data, isLoading, isError } = useQuery<Record<Period, SalesStatCard[]>>({
    queryKey: ['stats'],
    queryFn: getSalesStats,
    staleTime: 1000,
  });
  if (isLoading) return <p>불러오는 중...</p>;
  if (isError || !data) return <p>데이터를 불러오지 못했습니다.</p>;

  const stats = data[$selectedPeriod];

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
