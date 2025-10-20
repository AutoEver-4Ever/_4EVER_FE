'use client';

import SalesStats from '@/app/(private)/sales/components/SalesStats';
import { Period } from '@/types/StatType';
import { useState } from 'react';

const SalesHeader = () => {
  const [selectedPeriod, setSelectedPeriod] = useState<Period>('month');
  const periods: { id: Period; name: string }[] = [
    { id: 'week', name: '이번 주' },
    { id: 'month', name: '이번 달' },
    { id: 'quarter', name: '이번 분기' },
    { id: 'year', name: '연도별' },
  ];
  return (
    <>
      <div className="mb-8">
        <div className="flex items-center justify-between">
          <div className="flex flex-col">
            <h1 className="text-3xl font-bold text-gray-900">영업관리</h1>
            <p className="text-gray-600 mt-2">주문 및 고객 관리 시스템</p>
          </div>
          {/* 필터링 버튼 */}

          <div className="flex items-center space-x-4">
            <div className="flex items-center space-x-1 bg-white rounded-lg border border-gray-300 p-1">
              {periods.map((period) => (
                <button
                  key={period.id}
                  onClick={() => setSelectedPeriod(period.id)}
                  className={`px-4 py-2 rounded-md text-sm font-medium transition-colors duration-200 whitespace-nowrap cursor-pointer ${
                    selectedPeriod === period.id
                      ? 'bg-blue-600 text-white'
                      : 'text-gray-700 hover:text-gray-900 hover:bg-gray-100'
                  }`}
                >
                  {period.name}
                </button>
              ))}
            </div>
          </div>
        </div>
      </div>
      {/* 주요 지표 */}
      <SalesStats />
    </>
  );
};

export default SalesHeader;
