'use client';

import Link from 'next/link';

const QuickActions = () => {
  const actions = [
    {
      title: '신규 주문 등록',
      description: '새로운 판매 주문을 등록합니다',
      icon: 'ri-add-circle-line',
      color: 'blue',
      href: '/sales',
    },
    {
      title: '자재 구매 요청',
      description: '새로운 구매 요청을 생성합니다',
      icon: 'ri-shopping-cart-line',
      color: 'green',
      href: '/purchase/request/new',
    },
    {
      title: '재고 확인',
      description: '재고 현황을 확인합니다',
      icon: 'ri-archive-line',
      color: 'purple',
      href: '/inventory',
    },
    {
      title: '공급사 확인',
      description: '공급업체 정보를 확인합니다',
      icon: 'ri-building-line',
      color: 'orange',
      href: '/companies',
    },
  ];

  return (
    <div className="bg-white rounded-lg border border-gray-200 p-6">
      <div className="flex items-center space-x-2 mb-6">
        <i className="ri-flashlight-line text-blue-600 text-lg"></i>
        <h2 className="text-lg font-semibold text-gray-900">빠른 작업</h2>
      </div>

      <div className="space-y-3">
        {actions.map((action, index) => (
          <Link
            key={index}
            href={action.href}
            className="group flex items-center space-x-4 p-3 rounded-lg hover:bg-gray-50 transition-colors duration-200 cursor-pointer border border-transparent hover:border-gray-200"
          >
            <div
              className={`w-10 h-10 ${action.color} rounded-lg flex items-center justify-center`}
            >
              <i className={`${action.icon} ${action.color} text-lg`}></i>
            </div>
            <div className="flex-1">
              <h3 className="text-sm font-medium text-gray-900 group-hover:text-gray-800">
                {action.title}
              </h3>
              <p className="text-xs text-gray-500 mt-1">{action.description}</p>
            </div>
            <i className="ri-arrow-right-line text-gray-400 group-hover:text-gray-600 transition-colors duration-200"></i>
          </Link>
        ))}
      </div>
    </div>
  );
};

export default QuickActions;
