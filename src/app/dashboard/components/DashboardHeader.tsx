'use client';

import React from 'react';
import { DashboardHeaderProps } from '../types/DashboardHeaderType';

const periods = ['이번 주', '이번 달', '이번 분기', '올해'];

const DashboardHeader = ({
  selectedPeriod,
  setSelectedPeriod,
  onOpenDownload,
}: DashboardHeaderProps) => {
  return (
    <div className="mb-8">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-gray-900">대시보드</h1>
          <p className="text-gray-600 mt-2">기업 자원 관리 현황</p>
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

          <button
            onClick={onOpenDownload}
            className="px-4 py-2 bg-blue-600 text-white font-medium rounded-lg hover:bg-blue-700 transition-colors duration-200 cursor-pointer whitespace-nowrap flex items-center space-x-2"
          >
            <i className="ri-download-line"></i>
            <span>리포트 다운로드</span>
          </button>
        </div>
      </div>
    </div>
  );
};

export default DashboardHeader;
