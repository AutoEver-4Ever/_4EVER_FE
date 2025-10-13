'use client';

import { useRouter, useSearchParams } from 'next/navigation';
import PurchaseOrderList from './PurchaseOrderList';
import PurchaseRequestList from './PurchaseRequestList';
import SupplierList from './SupplierList';
import { PURCHASE_TABS } from '@/app/purchase/constants';

export default function PurchaseTabNavigation() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const currentTab = searchParams.get('tab') || 'requests';

  const handleTabChange = (tabId: string) => {
    const params = new URLSearchParams(searchParams.toString());
    params.set('tab', tabId);
    router.replace(`?${params.toString()}`);
  };

  return (
    <div className="m-4 border-b border-gray-200">
      <nav className="-mb-px flex space-x-8">
        {PURCHASE_TABS.map((tab) => (
          <button
            key={tab.id}
            onClick={() => handleTabChange(tab.id)}
            className={`group inline-flex items-center py-4 px-1 border-b-2 font-medium text-sm cursor-pointer whitespace-nowrap ${
              currentTab === tab.id
                ? 'border-blue-500 text-blue-600'
                : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
            }`}
          >
            <i className={`${tab.icon} mr-2 text-lg`}></i>
            {tab.name}
          </button>
        ))}
      </nav>

      {/* 탭 콘텐츠 */}
      <div className="mt-6">
        {currentTab === 'requests' && <PurchaseRequestList />}
        {currentTab === 'orders' && <PurchaseOrderList />}
        {currentTab === 'suppliers' && <SupplierList />}
      </div>
    </div>
  );
}
