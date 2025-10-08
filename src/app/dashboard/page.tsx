'use client';

import { useState } from 'react';
import DashboardHeader from '@/app/dashboard/components/DashboardHeader';
import DashboardStats from '@/app/dashboard/components/DashboardStats';
import QuickActions from '@/app/dashboard/components/QuickActions';
import WorkflowStatus from '@/app/dashboard/components/WorkflowStatus';
import ReportDownloadModal from '@/app/dashboard/components/ReportDownloadModal';

export default function DashboardPage() {
  const [selectedPeriod, setSelectedPeriod] = useState('이번 달');
  const [isDownloadModalOpen, setIsDownloadModalOpen] = useState(false);

  return (
    <div className="min-h-screen bg-gray-50">
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* 페이지 헤더 */}
        <DashboardHeader
          selectedPeriod={selectedPeriod}
          setSelectedPeriod={setSelectedPeriod}
          onOpenDownload={() => setIsDownloadModalOpen(true)}
        />

        {/* 주요 지표 */}
        <DashboardStats selectedPeriod={selectedPeriod} />

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

      {/* 리포트 다운로드 */}
      <ReportDownloadModal
        isOpen={isDownloadModalOpen}
        onClose={() => setIsDownloadModalOpen(false)}
        selectedPeriod={selectedPeriod}
      />
    </div>
  );
}
