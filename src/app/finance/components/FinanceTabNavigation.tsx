'use client';
import { useSearchParams, useRouter } from 'next/navigation';
import { useState } from 'react';
import ArVoucherList from './ArVoucherList';
import VoucherList from './VoucherList';

const FinanceTabNavigation = () => {
  const router = useRouter();
  const searchParams = useSearchParams();
  const initialTab = searchParams.get('purchase') || 'sales';
  const [activeTab, setActiveTab] = useState(initialTab);

  const tabs = [
    { id: 'sales', name: '매출 전표 관리', icon: 'ri-money-dollar-circle-line' },
    { id: 'purchase', name: '매입 전표 관리', icon: 'ri-shopping-cart-line' },
  ];

  const handleClick = (tabId: string) => {
    setActiveTab(tabId);
    const params = new URLSearchParams(searchParams.toString());
    params.set('tab', tabId);
    router.replace(`?${params.toString()}`, { scroll: false });
  };
  return (
    <div className="mt-8 mb-6">
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

      <div className="space-y-8">
        {activeTab === 'sales' && <ArVoucherList />}
        {activeTab === 'purchase' && <VoucherList />}
      </div>
    </div>
  );
};
export default FinanceTabNavigation;
