'use client';

import { useState } from 'react';

export default function StockMovement() {
  const [showAllMovements, setShowAllMovements] = useState(false);

  const movements = [
    {
      id: 'MOV001',
      type: 'in',
      item: '스테인리스 스틸 파이프',
      quantity: 50,
      unit: 'EA',
      date: '2024-01-15',
      time: '14:30',
      reason: '구매입고',
      user: '김구매',
      reference: 'PO-2024-001',
      location: 'A-01-01',
    },
    {
      id: 'MOV002',
      type: 'out',
      item: '볼트 M8x20',
      quantity: 200,
      unit: 'EA',
      date: '2024-01-15',
      time: '11:20',
      reason: '생산출고',
      user: '이생산',
      reference: 'WO-2024-005',
      location: 'B-02-03',
    },
    {
      id: 'MOV003',
      type: 'in',
      item: '알루미늄 프로파일',
      quantity: 100,
      unit: 'M',
      date: '2024-01-14',
      time: '16:45',
      reason: '구매입고',
      user: '김구매',
      reference: 'PO-2024-002',
      location: 'A-02-01',
    },
    {
      id: 'MOV004',
      type: 'adjust',
      item: '용접봉 3.2mm',
      quantity: -5,
      unit: 'KG',
      date: '2024-01-14',
      time: '09:15',
      reason: '재고조정',
      user: '박관리',
      reference: 'ADJ-2024-001',
      location: 'C-01-02',
    },
    {
      id: 'MOV005',
      type: 'out',
      item: '베어링 6205',
      quantity: 10,
      unit: 'EA',
      date: '2024-01-13',
      time: '13:30',
      reason: '생산출고',
      user: '이생산',
      reference: 'WO-2024-004',
      location: 'B-01-05',
    },
    {
      id: 'MOV006',
      type: 'in',
      item: '고무 패킹',
      quantity: 500,
      unit: 'EA',
      date: '2024-01-13',
      time: '10:15',
      reason: '구매입고',
      user: '김구매',
      reference: 'PO-2024-003',
      location: 'D-01-01',
    },
    {
      id: 'MOV007',
      type: 'out',
      item: '스프링 와셔',
      quantity: 300,
      unit: 'EA',
      date: '2024-01-12',
      time: '15:45',
      reason: '생산출고',
      user: '이생산',
      reference: 'WO-2024-003',
      location: 'B-03-02',
    },
    {
      id: 'MOV008',
      type: 'adjust',
      item: '절삭유',
      quantity: 20,
      unit: 'L',
      date: '2024-01-12',
      time: '08:30',
      reason: '재고조정',
      user: '박관리',
      reference: 'ADJ-2024-002',
      location: 'E-01-01',
    },
    {
      id: 'MOV009',
      type: 'in',
      item: '체인 10B',
      quantity: 25,
      unit: 'M',
      date: '2024-01-11',
      time: '14:20',
      reason: '구매입고',
      user: '김구매',
      reference: 'PO-2024-004',
      location: 'C-02-03',
    },
    {
      id: 'MOV010',
      type: 'out',
      item: '전선 2.5sq',
      quantity: 100,
      unit: 'M',
      date: '2024-01-11',
      time: '11:10',
      reason: '생산출고',
      user: '이생산',
      reference: 'WO-2024-002',
      location: 'F-01-02',
    },
  ];

  const getMovementIcon = (type: string) => {
    const icons = {
      in: 'ri-arrow-down-line',
      out: 'ri-arrow-up-line',
      adjust: 'ri-edit-line',
    };
    return icons[type as keyof typeof icons];
  };

  const getMovementColor = (type: string) => {
    const colors = {
      in: 'text-green-600 bg-green-100',
      out: 'text-red-600 bg-red-100',
      adjust: 'text-blue-600 bg-blue-100',
    };
    return colors[type as keyof typeof colors];
  };

  const getMovementLabel = (type: string) => {
    const labels = {
      in: '입고',
      out: '출고',
      adjust: '조정',
    };
    return labels[type as keyof typeof labels];
  };

  const displayedMovements = showAllMovements ? movements : movements.slice(0, 5);

  return (
    <div className="bg-white rounded-lg border border border-gray-200">
      <div className="p-4 border-b border-gray-200">
        <div className="flex items-center justify-between">
          <h3 className="text-lg font-semibold text-gray-900">최근 재고 이동</h3>
          <button
            onClick={() => setShowAllMovements(!showAllMovements)}
            className="text-sm text-blue-600 hover:text-blue-500 cursor-pointer"
          >
            {showAllMovements ? '간단히 보기' : '전체 보기'} →
          </button>
        </div>
      </div>

      <div className="p-4">
        <div className="space-y-3">
          {displayedMovements.map((movement) => (
            <div
              key={movement.id}
              className="flex items-center gap-3 p-3 hover:bg-gray-50 rounded-lg transition-colors"
            >
              <div
                className={`w-8 h-8 rounded-full flex items-center justify-center ${getMovementColor(movement.type)}`}
              >
                <i className={`${getMovementIcon(movement.type)} text-sm`}></i>
              </div>

              <div className="flex-1 min-w-0">
                <div className="flex items-center gap-2">
                  <span
                    className={`px-2 py-1 text-xs font-medium rounded-full ${getMovementColor(movement.type)}`}
                  >
                    {getMovementLabel(movement.type)}
                  </span>
                  <span className="text-sm font-medium text-gray-900">
                    {Math.abs(movement.quantity)} {movement.unit}
                  </span>
                </div>
                <div className="text-sm text-gray-600 truncate">{movement.item}</div>
                <div className="text-xs text-gray-500">
                  {movement.date} {movement.time} · {movement.user}
                  {showAllMovements && (
                    <>
                      <br />
                      <span className="text-blue-600">{movement.reference}</span> · 위치:{' '}
                      {movement.location}
                    </>
                  )}
                </div>
              </div>
            </div>
          ))}
        </div>

        {showAllMovements && (
          <div className="mt-6 pt-4 border-t border-gray-200">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <div className="bg-green-50 p-4 rounded-lg">
                <div className="flex items-center space-x-2">
                  <i className="ri-arrow-down-line text-green-600"></i>
                  <span className="text-sm font-medium text-green-700">총 입고</span>
                </div>
                <div className="text-2xl font-bold text-green-600 mt-2">695 건</div>
                <div className="text-xs text-green-600">이번 주</div>
              </div>

              <div className="bg-red-50 p-4 rounded-lg">
                <div className="flex items-center space-x-2">
                  <i className="ri-arrow-up-line text-red-600"></i>
                  <span className="text-sm font-medium text-red-700">총 출고</span>
                </div>
                <div className="text-2xl font-bold text-red-600 mt-2">610 건</div>
                <div className="text-xs text-red-600">이번 주</div>
              </div>

              <div className="bg-blue-50 p-4 rounded-lg">
                <div className="flex items-center space-x-2">
                  <i className="ri-edit-line text-blue-600"></i>
                  <span className="text-sm font-medium text-blue-700">재고 조정</span>
                </div>
                <div className="text-2xl font-bold text-blue-600 mt-2">15 건</div>
                <div className="text-xs text-blue-600">이번 주</div>
              </div>
            </div>
          </div>
        )}

        <div className="mt-4 pt-3 border-t border-gray-200">
          <div className="flex items-center justify-between text-sm">
            <span className="text-gray-600">오늘 총 이동</span>
            <div className="flex gap-4">
              <span className="text-green-600">입고 150</span>
              <span className="text-red-600">출고 210</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
