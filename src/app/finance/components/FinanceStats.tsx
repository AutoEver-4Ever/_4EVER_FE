'use client';

import { FinanceStatsProps } from '@/app/finance/types/FinanceStatsProps';

const FinanceStats = ({ $selectedPeriod }: FinanceStatsProps) => {
  const stats = [
    {
      title: '총 매출 (AR)',
      value: '₩125,000,000',
      change: '+12.5%',
      changeType: 'increase',
      icon: 'ri-arrow-up-circle-line',
      iconColor: 'text-green-600',
      iconBg: 'bg-green-100',
    },
    {
      title: '총 매입 (AP)',
      value: '₩85,000,000',
      change: '+8.2%',
      changeType: 'increase',
      icon: 'ri-arrow-down-circle-line',
      iconColor: 'text-red-600',
      iconBg: 'bg-red-100',
    },
    {
      title: '순이익',
      value: '₩40,000,000',
      change: '+15.3%',
      changeType: 'increase',
      icon: 'ri-money-dollar-circle-line',
      iconColor: 'text-blue-600',
      iconBg: 'bg-blue-100',
    },
    {
      title: '미수금',
      value: '₩25,000,000',
      change: '-3.2%',
      changeType: 'decrease',
      icon: 'ri-file-text-line',
      iconColor: 'text-orange-600',
      iconBg: 'bg-orange-100',
    },
  ];

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
      {stats.map((stat, index) => (
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
                <span className="text-xs text-gray-500">
                  vs 지난 {$selectedPeriod.replace('이번 ', '')}
                </span>
              </div>
            </div>
            <div className={`w-12 h-12 ${stat.iconBg} rounded-lg flex items-center justify-center`}>
              <i className={`${stat.icon} ${stat.iconColor} text-xl`}></i>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
};

export default FinanceStats;
