'use client';
import { useSearchParams, useRouter } from 'next/navigation';
import { useState } from 'react';
import SalesOrderList from '@/app/(private)/sales/components/SalesOrderList';
import SalesCustomerList from '@/app/(private)/sales/components/SalesCustomerList';
import SalesChart from '@/app/(private)/sales/components/SalesChart';
import SalesQuoteList from '@/app/(private)/sales/components/SalesQuoteList';

const SalesTabNavigation = () => {
  const router = useRouter();
  const searchParams = useSearchParams();
  const initialTab = searchParams.get('tab') || 'quotes';
  const [activeTab, setActiveTab] = useState(initialTab);

  const tabs = [
    { id: 'quotes', name: '견적 관리', icon: 'ri-file-text-line' },
    { id: 'orders', name: '주문 관리', icon: 'ri-shopping-cart-line' },
    { id: 'customers', name: '고객 관리', icon: 'ri-user-3-line' },
    { id: 'analytics', name: '매출 분석', icon: 'ri-bar-chart-line' },
  ];

  const handleClick = (tabId: string) => {
    setActiveTab(tabId);
    const params = new URLSearchParams(searchParams.toString());
    params.set('tab', tabId);
    router.replace(`?${params.toString()}`, { scroll: false });
  };
  return (
    <div className="mb-6 mt-6">
      <div className="border-b border-gray-200">
        <nav className="-mb-px flex space-x-8">
          {tabs.map((tab) => (
            <button
              key={tab.id}
              onClick={() => handleClick(tab.id)}
              className={`py-4 px-1 border-b-2 font-medium text-sm cursor-pointer transition-colors duration-200 flex items-center space-x-2 ${
                activeTab === tab.id
                  ? 'border-blue-500 text-blue-600'
                  : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
              }`}
            >
              <i className={`${tab.icon} text-lg`}></i>
              <span>{tab.name}</span>
            </button>
          ))}
        </nav>
      </div>

      <div className="space-y-6">
        {activeTab === 'quotes' && <SalesQuoteList />}
        {activeTab === 'orders' && <SalesOrderList />}
        {activeTab === 'customers' && <SalesCustomerList />}
        {activeTab === 'analytics' && <SalesChart />}
      </div>
    </div>
  );
};

export default SalesTabNavigation;
