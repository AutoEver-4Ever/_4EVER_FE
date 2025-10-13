'use client';

import { useState } from 'react';
import { PURCHASE_PERIODS } from '@/app/purchase/constants';
import PeriodFilter from '@/app/purchase/components/PeriodFilter';

export default function PurchaseStats() {
  const [selectedPeriod, setSelectedPeriod] = useState('이번 달');

  const stats = [
    {
      title: '구매 요청',
      value: '24건',
      change: '+12%',
      changeType: 'increase',
      icon: 'ri-file-add-line',
      iconColor: 'text-blue-600',
      iconBg: 'bg-blue-100',
    },
    {
      title: '구매 승인 대기',
      value: '8건',
      change: '+5%',
      changeType: 'increase',
      icon: 'ri-time-line',
      iconColor: 'text-orange-600',
      iconBg: 'bg-orange-100',
    },
    {
      title: '발주 금액',
      value: '₩1,250만',
      change: '+8%',
      changeType: 'increase',
      icon: 'ri-money-dollar-circle-line',
      iconColor: 'text-green-600',
      iconBg: 'bg-green-100',
    },
    {
      title: '발주 승인 대기',
      value: '6건',
      change: '-5%',
      changeType: 'decrease',
      icon: 'ri-shopping-bag-3-line',
      iconColor: 'text-purple-600',
      iconBg: 'bg-purple-100',
    },
  ];

  return (
    <div className="space-y-4">
      <PeriodFilter
        periods={PURCHASE_PERIODS}
        selectedPeriod={selectedPeriod}
        onPeriodChange={setSelectedPeriod}
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
                  <span className="text-sm text-gray-500 ml-2">{selectedPeriod} 대비</span>
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
