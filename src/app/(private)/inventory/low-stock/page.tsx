import LowStockList from './LowStockList';
import LowStockStats from './LowStockStats';
import LowStockActions from './LowStockActions';

export default function LowStockPage() {
  return (
    <div className="min-h-screen bg-gray-50">
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="mb-8">
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-3xl font-bold text-gray-900">재고 부족 관리</h1>
              <p className="text-gray-600 mt-2">안전재고 미달 품목 현황 및 관리</p>
            </div>
            <LowStockActions />
          </div>
        </div>

        <div className="mb-8">
          <LowStockStats />
        </div>

        <div className="grid grid-cols-1 gap-6">
          <LowStockList />
        </div>
      </main>
    </div>
  );
}
