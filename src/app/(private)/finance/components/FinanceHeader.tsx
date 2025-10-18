'use client';

import { useState } from 'react';
import FinanceStats from '@/app/(private)/finance/components/FinanceStats';

const FinanceHeader = () => {
  const periods = ['이번 주', '이번 달', '이번 분기', '올해'];
  const [selectedPeriod, setSelectedPeriod] = useState('이번 달');

  const [isProfileOpen, setIsProfileOpen] = useState(false);
  const [isNotificationOpen, setIsNotificationOpen] = useState(false);

  const notifications = [
    { id: 1, type: 'warning', message: '미결제 전표가 5건 있습니다', time: '10분 전' },
    { id: 2, type: 'info', message: '월말 결산 준비가 필요합니다', time: '30분 전' },
    { id: 3, type: 'success', message: '전표 V-2024-025가 승인되었습니다', time: '1시간 전' },
  ];

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
                  key={period}
                  onClick={() => setSelectedPeriod(period)}
                  className={`px-4 py-2 rounded-md text-sm font-medium transition-colors duration-200 whitespace-nowrap cursor-pointer ${
                    selectedPeriod === period
                      ? 'bg-blue-600 text-white'
                      : 'text-gray-700 hover:text-gray-900 hover:bg-gray-100'
                  }`}
                >
                  {period}
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
