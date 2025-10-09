'use client';
import { useSearchParams, useRouter } from 'next/navigation';
import { useState } from 'react';
import SalesOrderList from '@/app/sales/components/SalesOrderList';
import SalesCustomerList from '@/app/sales/components/SalesCustomerList';
import SalesChart from '@/app/sales/components/SalesChart';
import QuoteList from '@/app/sales/components/QuoteList';

const SalesTabNavigation = () => {
  const [activeTab, setActiveTab] = useState('orders');
  const router = useRouter();
  const searchParams = useSearchParams();

  const tabs = [
    { id: 'orders', name: '주문 관리', icon: 'ri-shopping-cart-line' },
    { id: 'quotes', name: '견적 관리', icon: 'ri-file-text-line' },
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
    <div className="mb-6">
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
        {activeTab === 'orders' && <SalesOrderList />}
        {activeTab === 'quotes' && <QuoteList />}
        {activeTab === 'customers' && <SalesCustomerList />}
        {activeTab === 'analytics' && <SalesChart />}
      </div>
    </div>
  );
};

export default SalesTabNavigation;
