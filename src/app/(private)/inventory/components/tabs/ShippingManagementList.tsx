'use client';

import { useState } from 'react';

const ShippingManagementList = () => {
  const [selectedStatus, setSelectedStatus] = useState('production');
  const [showShipModal, setShowShipModal] = useState(false);
  const [selectedOrder, setSelectedOrder] = useState<any>(null);

  const statusTabs = [
    { id: 'production', name: '생산중', count: 12 },
    { id: 'ready', name: '출고 준비 완료', count: 8 },
  ];

  const shippingOrders = [
    {
      id: 'SO-2024-001',
      customer: '대한제철',
      orderDate: '2024-01-10',
      dueDate: '2024-01-20',
      status: 'production',
      amount: 15750000,
      items: [
        { name: '스테인리스 파이프', quantity: 100, unit: 'EA' },
        { name: '알루미늄 프로파일', quantity: 50, unit: 'M' },
      ],
    },
    {
      id: 'SO-2024-002',
      customer: '현대건설',
      orderDate: '2024-01-12',
      dueDate: '2024-01-22',
      status: 'ready',
      amount: 8900000,
      items: [
        { name: '볼트 M8x20', quantity: 500, unit: 'EA' },
        { name: '베어링 6205', quantity: 20, unit: 'EA' },
      ],
    },
  ];

  const filteredOrders = shippingOrders.filter((order) => order.status === selectedStatus);

  const getStatusBadge = (status: string) => {
    const statusConfig = {
      production: { label: '생산중', class: 'bg-blue-100 text-blue-800' },
      ready: { label: '출고 준비 완료', class: 'bg-green-100 text-green-800' },
    };
    const config = statusConfig[status as keyof typeof statusConfig];
    return (
      <span className={`px-2 py-1 rounded-full text-xs font-medium ${config.class}`}>
        {config.label}
      </span>
    );
  };

  return (
    <div className="bg-white rounded-lg border border-gray-200 mt-6">
      <div className="p-6 border-b border-gray-200">
        <h2 className="text-lg font-semibold text-gray-900">출고 관리</h2>
      </div>

      <div className="p-6">
        <div className="flex space-x-1 bg-gray-100 rounded-lg p-1 mb-6">
          {statusTabs.map((tab) => (
            <button
              key={tab.id}
              onClick={() => setSelectedStatus(tab.id)}
              className={`flex-1 px-4 py-2 rounded-md text-sm font-medium transition-colors duration-200 cursor-pointer whitespace-nowrap ${
                selectedStatus === tab.id
                  ? 'bg-white text-blue-600 shadow-sm'
                  : 'text-gray-600 hover:text-gray-900'
              }`}
            >
              {tab.name} ({tab.count})
            </button>
          ))}
        </div>

        <div className="overflow-x-auto">
          <table className="w-full">
            <thead className="bg-gray-50">
              <tr>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  주문 번호
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  고객 정보
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  주문일
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  납기일
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  주문 금액
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  상태
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  작업
                </th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {filteredOrders.map((order) => (
                <tr key={order.id} className="hover:bg-gray-50">
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="text-sm font-medium text-gray-900">{order.id}</div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="text-sm text-gray-900">{order.customer}</div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="text-sm text-gray-900">{order.orderDate}</div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="text-sm text-gray-900">{order.dueDate}</div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="text-sm font-medium text-gray-900">
                      ₩{order.amount.toLocaleString()}
                    </div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">{getStatusBadge(order.status)}</td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                    <button
                      onClick={() => {
                        setSelectedOrder(order);
                        setShowShipModal(true);
                      }}
                      className="text-blue-600 hover:text-blue-900 cursor-pointer"
                    >
                      상세보기
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* 상세보기 모달 */}
      {showShipModal && selectedOrder && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white rounded-lg p-6 w-full max-w-2xl mx-4 max-h-[90vh] overflow-y-auto">
            <div className="flex items-center justify-between mb-6">
              <h3 className="text-xl font-semibold">주문 상세 - {selectedOrder.id}</h3>
              <button
                onClick={() => setShowShipModal(false)}
                className="text-gray-400 hover:text-gray-600 cursor-pointer"
              >
                <i className="ri-close-line text-xl"></i>
              </button>
            </div>

            <div className="space-y-6">
              <div className="grid grid-cols-2 gap-4 p-4 bg-gray-50 rounded-lg">
                <div>
                  <span className="text-sm text-gray-600">고객:</span>
                  <div className="font-medium text-gray-900">{selectedOrder.customer}</div>
                </div>
                <div>
                  <span className="text-sm text-gray-600">납기일:</span>
                  <div className="font-medium text-gray-900">{selectedOrder.dueDate}</div>
                </div>
              </div>

              <div>
                <h4 className="text-lg font-semibold text-gray-900 mb-4">주문 품목</h4>
                <div className="space-y-2">
                  {selectedOrder.items.map((item: any, index: number) => (
                    <div
                      key={index}
                      className="flex justify-between items-center p-3 bg-gray-50 rounded-lg"
                    >
                      <span className="font-medium text-gray-900">{item.name}</span>
                      <span className="text-sm text-gray-600">
                        {item.quantity} {item.unit}
                      </span>
                    </div>
                  ))}
                </div>
              </div>

              {selectedOrder.status === 'production' && (
                <div className="flex gap-3 pt-4">
                  <button
                    onClick={() => setShowShipModal(false)}
                    className="flex-1 px-4 py-2 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 transition-colors text-sm font-medium cursor-pointer"
                  >
                    닫기
                  </button>
                  <button
                    onClick={() => {
                      alert('출고 준비 완료로 상태가 변경되었습니다.');
                      setShowShipModal(false);
                    }}
                    className="flex-1 px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 transition-colors text-sm font-medium cursor-pointer"
                  >
                    출고 준비 완료로 변경
                  </button>
                </div>
              )}
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default ShippingManagementList;
