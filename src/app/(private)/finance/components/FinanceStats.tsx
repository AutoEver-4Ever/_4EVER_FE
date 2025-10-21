'use client';

import { FinanceStatResponse } from '@/app/(private)/finance/types/FinanceStatsType';
import { useQuery } from '@tanstack/react-query';
import { getFinanceStats } from '@/app/(private)/finance/finance.api';
import { mapFinanceStatsToCards } from '../finance.service';

const FinanceStats = () => {
  const { data, isLoading, isError } = useQuery<FinanceStatResponse>({
    queryKey: ['financeStats'],
    queryFn: getFinanceStats,
    staleTime: 1000,
  });
  if (isLoading) return <p>불러오는 중...</p>;
  if (isError || !data) return <p>데이터를 불러오지 못했습니다.</p>;

  const stats = mapFinanceStatsToCards(data);

  return (
    <div className="space-y-4">
      {/* {stats.map((stat, index) => (
        <div
          key={index}
          className="bg-white rounded-lg border border-gray-200 p-6 hover:shadow-md transition-shadow duration-200"
        >
          <div className="flex items-center justify-between">
            <div className="flex-1">
              <p className="text-sm font-medium text-gray-600 mb-2">{stat.title}</p>
              <p className="text-2xl font-bold text-gray-900 mb-2">{stat.value}</p>
              <div className="flex items-center space-x-2">
                <div
                  className={`flex items-center px-2 py-1 rounded text-xs font-medium ${
                    stat.changeType === 'increase'
                      ? 'bg-green-100 text-green-700'
                      : 'bg-red-100 text-red-700'
                  }`}
                >
                  <i
                    className={`${
                      stat.changeType === 'increase' ? 'ri-arrow-up-line' : 'ri-arrow-down-line'
                    } mr-1`}
                  ></i>
                  {stat.change}
                </div>
                <span className="text-xs text-gray-500">{getPeriodText($selectedPeriod)}</span>
              </div>
            </div>
            <div className={`w-12 h-12 ${stat.iconBg} rounded-lg flex items-center justify-center`}>
              <i className={`${stat.icon} ${stat.iconColor} text-xl`}></i>
            </div>
          </div>
        </div>
      ))} */}
    </div>
  );
};

export default FinanceStats;
