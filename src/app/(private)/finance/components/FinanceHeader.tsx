'use client';

import { useState } from 'react';
import FinanceStats from '@/app/(private)/finance/components/FinanceStats';
import { Period } from '@/types/StatType';

const FinanceHeader = () => {
  const periods: { id: Period; name: string }[] = [
    { id: 'week', name: '이번 주' },
    { id: 'month', name: '이번 달' },
    { id: 'quarter', name: '이번 분기' },
    { id: 'year', name: '연도별' },
  ];
  const [selectedPeriod, setSelectedPeriod] = useState<Period>('month');

  return (
    <>
      <div className="mb-8">
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-3xl font-bold text-gray-900">재무관리</h1>
            <p className="text-gray-600 mt-2">전표 관리 및 재무 현황</p>
          </div>

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
      <FinanceStats $selectedPeriod={selectedPeriod} />
    </>
  );
};

export default FinanceHeader;
