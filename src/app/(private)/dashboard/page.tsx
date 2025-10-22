import DashboardHeader from '@/app/(private)/dashboard/components/DashboardHeader';
import DashboardStats from '@/app/(private)/dashboard/components/DashboardStats';
import QuickActions from '@/app/(private)/dashboard/components/QuickActions';
import WorkflowStatus from '@/app/(private)/dashboard/components/WorkflowStatus';
import ReportDownloadModal from '@/app/(private)/dashboard/components/ReportDownloadModal';
import Providers from '@/app/providers';
import { getQueryClient } from '@/lib/queryClient';
import { dehydrate } from '@tanstack/react-query';
import { Suspense } from 'react';
import StatSection from '@/app/components/common/StatSection';

export default async function DashboardPage() {
  const queryClient = getQueryClient();

  await queryClient.prefetchQuery({
    queryKey: ['dashboardStats'],
    queryFn: getDashboardStats,
  });
  const dashboardStats = await getDashboardStats();

  return (
    <Providers>
      <div className="min-h-screen">
        <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          {/* 페이지 헤더 */}
          <StatSection
            title="대시보드"
            subTitle="기업 자원 관리 현황"
            statsData={dashboardStatsData}
          />
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
        {/* <ReportDownloadModal
          isOpen={isDownloadModalOpen}
          onClose={() => setIsDownloadModalOpen(false)}
          selectedPeriod={selectedPeriod}
        /> */}
      </div>
    </Providers>
  );
}
