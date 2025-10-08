'use client';

import { useState } from 'react';
import DashboardStats from '@/app/dashboard/components/Dashboardstats';
import QuickActions from '@/app/dashboard/components/QuickActions';
import WorkflowStatus from '@/app/dashboard/components/WorkflowStatus';

export default function DashboardPage() {
  const [selectedPeriod, setSelectedPeriod] = useState('이번 달');

  return (
    <div className="min-h-screen">
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* 주요 지표 */}
        <div className="mb-8">
          <DashboardStats selectedPeriod={selectedPeriod} />
        </div>

        {/* 메인 콘텐츠 그리드 */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 mb-8">
          {/* 빠른 작업 */}
          <div className="lg:col-span-1">
            <QuickActions />
          </div>

          {/* 워크플로우 현황 */}
          <div className="lg:col-span-2">
            <WorkflowStatus />
          </div>
        </div>
      </main>
    </div>
  );
}
