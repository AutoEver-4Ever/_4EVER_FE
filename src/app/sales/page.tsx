import SalesHeader from '@/app/sales/components/SalesHeader';
import SalesStats from '@/app/sales/components/SalesStats';
import SalesTabNavigation from '@/app/sales/components/SalesTabNavigation';

export default function SalesPage() {
  return (
    <div className="min-h-screen bg-gray-50">
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* 페이지 헤더 */}
        <SalesHeader />

        {/* 주요 지표 */}
        <SalesStats />

        {/* 탭 콘텐츠 */}
        {<SalesTabNavigation />}
      </main>
    </div>
  );
}
