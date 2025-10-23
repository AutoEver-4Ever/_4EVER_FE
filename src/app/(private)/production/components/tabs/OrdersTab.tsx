'use client';
import { useState } from 'react';
import Button from '@/app/components/common/Button';

// 필요한 타입 정의
interface PlannedOrder {
  id: string;
  referenceQuote: string;
  material: string;
  quantity: number;
  procurementStartDate: string;
  deliveryDate: string;
  status: string;
}

export default function OrdersTab() {
  const [selectedOrders, setSelectedOrders] = useState<string[]>([]);

  // 더미 데이터 (실제로는 props나 상태관리로 받아와야 함)
  const plannedOrders: PlannedOrder[] = [
    {
      id: 'order-1',
      referenceQuote: 'Q-2024-001',
      material: '자재A',
      quantity: 500,
      procurementStartDate: '2024-10-25',
      deliveryDate: '2024-11-05',
      status: '대기',
    },
    {
      id: 'order-2',
      referenceQuote: 'Q-2024-002',
      material: '자재B',
      quantity: 300,
      procurementStartDate: '2024-10-26',
      deliveryDate: '2024-11-06',
      status: '진행중',
    },
    // 더 많은 데이터...
  ];

  const handleSelectAllOrders = () => {
    if (selectedOrders.length === plannedOrders.length) {
      setSelectedOrders([]);
    } else {
      setSelectedOrders(plannedOrders.map((order) => order.id));
    }
  };

  const handleOrderSelection = (id: string) => {
    setSelectedOrders((prev) =>
      prev.includes(id) ? prev.filter((orderId) => orderId !== id) : [...prev, id],
    );
  };

  const handlePurchaseRequest = () => {
    console.log('자재 구매 요청:', selectedOrders);
    // 실제 로직 구현
  };

  const getOrderStatusBadge = (status: string) => {
    const statusConfig: Record<string, { bg: string; text: string }> = {
      대기: { bg: 'bg-gray-100', text: 'text-gray-800' },
      진행중: { bg: 'bg-blue-100', text: 'text-blue-800' },
      완료: { bg: 'bg-green-100', text: 'text-green-800' },
      취소: { bg: 'bg-red-100', text: 'text-red-800' },
    };
    const config = statusConfig[status] || statusConfig['대기'];
    return (
      <span
        className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${config.bg} ${config.text}`}
      >
        {status}
      </span>
    );
  };

  return (
    <div className="bg-white border border-gray-200 rounded-lg overflow-hidden">
      <div className="p-4 bg-gray-50 border-b border-gray-200 flex items-center justify-between">
        <h4 className="text-md font-semibold text-gray-900">
          계획 주문 - 무엇을 언제 발주 지시할까?
        </h4>
        <Button
          label="자재 구매 요청"
          onClick={handlePurchaseRequest}
          disabled={selectedOrders.length === 0}
        />
      </div>
      <div className="overflow-x-auto">
        <table className="min-w-full divide-y divide-gray-200">
          <thead className="bg-gray-50">
            <tr>
              <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                <input
                  type="checkbox"
                  checked={selectedOrders.length === plannedOrders.length}
                  onChange={handleSelectAllOrders}
                  className="rounded border-gray-300 text-purple-600 focus:ring-purple-500 cursor-pointer"
                />
              </th>
              <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                참조 견적서
              </th>
              <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                자재
              </th>
              <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                수량
              </th>
              <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                조달 시작일
              </th>
              <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                납기일
              </th>
              <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                상태
              </th>
              <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                작업
              </th>
            </tr>
          </thead>
          <tbody className="bg-white divide-y divide-gray-200">
            {plannedOrders.map((order) => (
              <tr key={order.id} className="hover:bg-gray-50">
                <td className="px-4 py-3">
                  <input
                    type="checkbox"
                    checked={selectedOrders.includes(order.id)}
                    onChange={() => handleOrderSelection(order.id)}
                    className="rounded border-gray-300 text-purple-600 focus:ring-purple-500 cursor-pointer"
                  />
                </td>
                <td className="px-4 py-3 text-sm font-medium text-blue-600">
                  {order.referenceQuote}
                </td>
                <td className="px-4 py-3 text-sm text-gray-900">{order.material}</td>
                <td className="px-4 py-3 text-sm text-gray-900">
                  {order.quantity.toLocaleString()}
                </td>
                <td className="px-4 py-3 text-sm text-gray-900">{order.procurementStartDate}</td>
                <td className="px-4 py-3 text-sm text-gray-900">{order.deliveryDate}</td>
                <td className="px-4 py-3">{getOrderStatusBadge(order.status)}</td>
                <td className="px-4 py-3">
                  <button
                    className="text-blue-600 hover:text-blue-800 cursor-pointer"
                    title="상세보기"
                  >
                    <i className="ri-eye-line"></i>
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
