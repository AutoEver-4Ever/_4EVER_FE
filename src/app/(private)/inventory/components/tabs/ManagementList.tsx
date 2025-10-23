'use client';

import { useSearchParams } from 'next/navigation';
import { useEffect, useState } from 'react';
import { RECEIVING_TABLE_HEADERS, SHIPPING_TABLE_HEADERS } from '../../inventory.constants';
const ManagementList = () => {
  const [startDate, setStartDate] = useState('');
  const [endDate, setEndDate] = useState('');
  const searchParams = useSearchParams();
  const currentTab = searchParams.get('tab') || 'shipping';
  const [selectedSubTab, setSelectedSubTab] = useState('');
  const shippingStatusTabs = [
    { id: 'producing', name: '생산중', count: 5 },
    { id: 'standBy', name: '출고 대기 완료', count: 15 },
  ];
  const receivingStatusTabs = [
    { id: 'waiting', name: '입고 대기', count: 8 },
    { id: 'completed', name: '입고 완료', count: 15 },
  ];

  const receivingOrders = [
    {
      id: 'PO-2024-001',
      supplier: '스테인리스코리아',
      orderDate: '2024-01-10',
      dueDate: '2024-01-16',
      status: 'waiting',
      amount: 4250000,
    },
    {
      id: 'PO-2024-002',
      supplier: '패스너코리아',
      orderDate: '2024-01-12',
      dueDate: '2024-01-18',
      status: 'completed',
      amount: 490000,
    },
  ];

  useEffect(() => {
    setSelectedSubTab(currentTab === 'shipping' ? 'producing' : 'waiting');
  }, [currentTab]);

  const filteredOrders = receivingOrders.filter((order) => order.status === selectedSubTab);

  const getTableHeaderTitle = () => {
    return currentTab === 'shipping' ? '출고 관리' : '입고 관리';
  };

  const getStatusTabs = () => {
    return currentTab === 'shipping' ? shippingStatusTabs : receivingStatusTabs;
  };

  const getStatusHeader = () => {
    return currentTab === 'shipping' ? SHIPPING_TABLE_HEADERS : RECEIVING_TABLE_HEADERS;
  };

  const renderReceivingRows = (orders: typeof receivingOrders) =>
    orders.map((order) => (
      <tr key={order.id} className="hover:bg-gray-50">
        <td className="px-6 py-4 text-sm font-medium text-gray-900">{order.id}</td>
        <td className="px-6 py-4 text-sm text-gray-900">{order.supplier}</td>
        <td className="px-6 py-4 text-sm text-gray-900">{order.orderDate}</td>
        <td className="px-6 py-4 text-sm text-gray-900">{order.dueDate}</td>
        <td className="px-6 py-4 text-sm font-medium text-gray-900">
          ₩{order.amount.toLocaleString()}
        </td>
        <td className="px-6 py-4">{order.status}</td>
      </tr>
    ));

  const renderShippingRows = (orders: any[]) =>
    orders.map((order) => (
      <tr key={order.id} className="hover:bg-gray-50">
        <td className="px-6 py-4 text-sm font-medium text-gray-900">{order.id}</td>
        <td className="px-6 py-4 text-sm text-gray-900">{order.product}</td>
        <td className="px-6 py-4 text-sm text-gray-900">{order.quantity}</td>
        <td className="px-6 py-4 text-sm text-gray-900">{order.status}</td>
      </tr>
    ));

  return (
    <div className="bg-white rounded-lg border border-gray-200 mt-6">
      <div className="p-6 border-b border-gray-200">
        <div className="flex items-center justify-between">
          <h2 className="text-lg font-semibold text-gray-900">{getTableHeaderTitle()}</h2>

          {/* 필터링 */}
          {currentTab === 'receiving' && (
            <div className="flex items-center gap-4">
              <div className="flex items-center gap-2">
                <input
                  type="date"
                  value={startDate}
                  onChange={(e) => setStartDate(e.target.value)}
                  className="px-3 py-2 border border-gray-300 rounded-lg text-sm"
                />
                <span className="text-gray-500">~</span>
                <input
                  type="date"
                  value={endDate}
                  onChange={(e) => setEndDate(e.target.value)}
                  className="px-3 py-2 border border-gray-300 rounded-lg text-sm"
                />
              </div>
            </div>
          )}
        </div>
      </div>

      <div className="p-6">
        <div className="flex space-x-1 bg-gray-100 rounded-lg p-1 mb-6">
          {getStatusTabs().map((tab) => (
            <button
              key={tab.id}
              onClick={() => setSelectedSubTab(tab.id)}
              className={`flex-1 px-4 py-2 rounded-md text-sm font-medium transition-colors duration-200 cursor-pointer whitespace-nowrap ${
                selectedSubTab === tab.id
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
                {getStatusHeader().map((header) => (
                  <th
                    key={header}
                    className="py-3 px-4 text-xs font-medium text-gray-500 uppercase tracking-wider text-left"
                  >
                    {header}
                  </th>
                ))}
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {currentTab === 'shipping'
                ? renderShippingRows(filteredOrders)
                : renderReceivingRows(filteredOrders)}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default ManagementList;
