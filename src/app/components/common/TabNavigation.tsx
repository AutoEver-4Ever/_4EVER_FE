'use client';

import { usePathname, useRouter, useSearchParams } from 'next/navigation';
import { TabNavigationProps } from '@/app/(private)/purchase/types/TabNavigationType';

export default function TabNavigation({ tabs }: TabNavigationProps) {
  const router = useRouter();
  const searchParams = useSearchParams();
  const pathName = usePathname(); // 현재 경로 가져오기 (ex: "/purchase")

  const currentTab = searchParams.get('tab') || tabs[0]?.id;

  const handelTabChange = (tabId: string) => {
    const params = new URLSearchParams(searchParams.toString());
    params.set('tab', tabId);
    const newUrl = `${pathName}?${params}`;
    router.replace(newUrl);
  };

  const activeTab = tabs.find((tab) => tab.id === currentTab);
  const ActiveComponent = activeTab?.component;

  return (
    <div className="my-4 border-b border-gray-200">
      {/* 네비게이션바 */}
      <nav className="-mb-px flex space-x-6">
        {tabs.map((tab) => (
          <button
            key={tab.id}
            onClick={() => handelTabChange(tab.id)}
            className={`group inline-flex items-center pt-4 pb-2 px-1 border-b-2 font-medium text-sm cursor-pointer whitespace-nowrap ${
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
      {/* 렌더링 되는 컴포넌트 */}
      <div className="mt-4"> {ActiveComponent && <ActiveComponent />}</div>
    </div>
  );
}
