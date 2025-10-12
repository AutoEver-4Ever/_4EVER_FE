'use client';

import { useState } from 'react';
import PurchaseStats from '@/app/purchase/components/PurchaseStats';
import PurchaseRequestList from '@/app/purchase/components/PurchaseRequestList';
import PurchaseOrderList from '@/app/purchase/components/PurchaseOrderList';
import SupplierList from '@/app/purchase/components/SupplierList';
import PeriodFilter from '@/app/purchase/components/PeriodFilter';
import TabNavigation from '@/app/purchase/components/TabNavigation';
import { PURCHASE_PERIODS, PURCHASE_TABS } from '@/app/purchase/constants';

export default function PurchasePage() {
  const [activeTab, setActiveTab] = useState('requests');
  const [selectedPeriod, setSelectedPeriod] = useState('이번 달');

  // 탭 컨텐츠 렌더링
  const renderTabContent = () => {
    switch (activeTab) {
      case 'requests':
        return <PurchaseRequestList />; // 구매 요청 탭
      case 'orders':
        return <PurchaseOrderList />; // 발주서 탭
      case 'suppliers':
        return <SupplierList />; // 공급업체 관리 탭
      default:
        return <PurchaseRequestList />; // 기본은 구매 요청 탭
    }
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* 페이지 헤더 */}
        <div className="mb-8">
          <div className="flex items-center justify-between">
            {/* 페이지 제목 */}
            <div>
              <h1 className="text-3xl font-bold text-gray-900">구매 및 조달 관리</h1>
              <p className="text-gray-600 mt-2">구매 요청부터 발주까지 전체 프로세스 관리</p>
            </div>

            <div className="flex items-center space-x-4">
              {/* 주요 지표 필터링 버튼들 */}
              <PeriodFilter
                periods={PURCHASE_PERIODS}
                selectedPeriod={selectedPeriod}
                onPeriodChange={setSelectedPeriod}
              />
            </div>
          </div>
        </div>

        {/* 주요 지표 */}
        <div className="mb-8">
          <PurchaseStats selectedPeriod={selectedPeriod} />
        </div>

        {/* 탭 네비게이션: 구매 요청 / 발주서 / 공급업체 관리 */}
        <div className="mb-6">
          <TabNavigation tabs={PURCHASE_TABS} activeTab={activeTab} onTabChange={setActiveTab} />
        </div>

        {/* 탭 콘텐츠 */}
        <div className="mb-8">{renderTabContent()}</div>
      </main>
    </div>
  );
}
