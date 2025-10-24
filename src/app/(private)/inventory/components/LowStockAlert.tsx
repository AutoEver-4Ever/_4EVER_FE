'use client';

import Link from 'next/link';
import { LowStockItemResponse } from '../types/LowStockItems';
import { useQuery } from '@tanstack/react-query';
import { getLowStockItems } from '../inventory.api';

export default function LowStockAlert() {
  const lowStockItems = [
    {
      id: 1,
      code: 'ST-001',
      name: '강판 (두께 5mm)',
      currentStock: 50,
      minStock: 100,
      unit: 'EA',
      status: 'critical',
    },
    {
      id: 2,
      code: 'ST-015',
      name: '알루미늄 프로파일',
      currentStock: 25,
      minStock: 50,
      unit: 'M',
      status: 'warning',
    },
    {
      id: 3,
      code: 'ST-008',
      name: '스테인리스 파이프',
      currentStock: 8,
      minStock: 20,
      unit: 'EA',
      status: 'critical',
    },
  ];

    queryKey: ['lowStockItems'],
    queryFn: getLowStockItems,
  });

  return (
    <div className="bg-white rounded-lg border border-gray-200">
      <div className="p-4 border-b border-gray-200">
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-2">
            <h3 className="text-lg font-semibold text-gray-900">재고 부족 알림</h3>
            <span className="bg-red-100 text-red-800 text-xs font-medium px-2 py-1 rounded-full">
              {lowStockRes?.length}건
            </span>
          </div>
          <Link href="/inventory/low-stock">
            <button className="flex items-center text-sm text-blue-600 hover:text-blue-500 cursor-pointer font-medium">
              전체 보기
              <i className="ri-arrow-right-line ml-1"></i>
            </button>
          </Link>
        </div>
      </div>

      <div className="p-4 space-y-3">
        {lowStockRes?.map((item) => (
          <div
            key={item.itemId}
            className="flex items-center justify-between p-3 bg-gray-50 rounded-lg"
          >
            <div className="flex-1">
              <div className="flex items-center space-x-2">
                <span
                  className={`w-2 h-2 rounded-full ${
                    item.statusCode === 'URGENT' ? 'bg-red-500' : 'bg-yellow-500'
                  }`}
                ></span>
                <span className="text-sm font-medium text-gray-900">{item.itemName}</span>
              </div>
              <div className="text-xs text-gray-500 mt-1">
                현재: {item.currentStock}
                {item.uomName} / 최소: {item.safetyStock}
                {item.uomName}
              </div>
            </div>
            <div className="text-right">
              <div
                className={`text-sm font-medium ${
                  item.statusCode === 'URGENT' ? 'text-red-600' : 'text-yellow-600'
                }`}
              >
                {item.statusCode === 'URGENT' ? '긴급' : '주의'}
              </div>
            </div>
          </div>
        ))}

        <Link href="/purchase/request/new">
          <button className="w-full mt-4 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors text-sm font-medium cursor-pointer">
            <i className="ri-shopping-cart-line mr-2"></i>발주 요청 생성
          </button>
        </Link>
      </div>
    </div>
  );
}
