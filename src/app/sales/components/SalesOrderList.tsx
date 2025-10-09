'use client';

import { useState } from 'react';
import NewOrderModal from '@/app/sales/components/NewOrderModal';
import SalesOrderDetailModal from '@/app/sales/components/SalesOrderDetailModal';
import { Order } from '@/app/sales/types/SalesOrderListType';
import { SalesOrder } from '@/app/sales/types/SalesOrderType';

const SalesOrderList = () => {
  const [selectedStatus, setSelectedStatus] = useState('all');
  const [showNewOrderModal, setShowNewOrderModal] = useState(false);
  const [selectedOrder, setSelectedOrder] = useState<SalesOrder | null>(null);
  const [showDetailModal, setShowDetailModal] = useState(false);
  const orders: Order[] = [
    {
      id: 'SO-2024-001',
      orderNumber: 'SO-2024-001',
      orderDate: '2024-01-15',
      deliveryDate: '2024-01-25',
      amount: 15500000,
      status: 'confirmed',
      priority: 'high',
      paymentTerms: '30일 후 결제',
      notes: '',
      customerInfo: {
        name: '(주)테크솔루션',
        contact: '김영수',
        phone: '02-1234-5678',
        email: 'test@test.com',
        address: '서울시 강남구',
      },
      items: [
        { name: '산업용 모터 5HP', quantity: 5, unitPrice: 850000, total: 4250000 },
        { name: '제어판넬', quantity: 2, unitPrice: 1200000, total: 2400000 },
      ],
    },
    {
      id: 'SO-2024-002',
      orderNumber: 'SO-2024-002',
      orderDate: '2024-01-16',
      deliveryDate: '2024-01-30',
      amount: 8750000,
      status: 'pending',
      priority: 'medium',
      paymentTerms: '30일 후 결제',
      notes: '',
      customerInfo: {
        name: '대한제조',
        contact: '이민정',
        phone: '031-9876-5432',
        email: 'dahan@company.com',
        address: '경기도 수원시',
      },
      items: [
        { name: '컨베이어 벨트', quantity: 3, unitPrice: 2500000, total: 7500000 },
        { name: '센서 모듈', quantity: 10, unitPrice: 125000, total: 1250000 },
      ],
    },
    {
      id: 'SO-2024-003',
      orderNumber: 'SO-2024-003',
      orderDate: '2024-01-17',
      deliveryDate: '2024-02-05',
      amount: 22300000,
      status: 'shipped',
      priority: 'high',
      paymentTerms: '30일 후 결제',
      notes: '',
      customerInfo: {
        name: '글로벌산업',
        contact: '박철수',
        phone: '051-5555-7777',
        email: 'global@industry.com',
        address: '부산광역시 해운대구',
      },
      items: [
        { name: '자동화 라인', quantity: 1, unitPrice: 20000000, total: 20000000 },
        { name: '품질검사 장비', quantity: 1, unitPrice: 2300000, total: 2300000 },
      ],
    },
    {
      id: 'SO-2024-004',
      orderNumber: 'SO-2024-004',
      orderDate: '2024-01-18',
      deliveryDate: '2024-02-10',
      amount: 12800000,
      status: 'processing',
      priority: 'medium',
      paymentTerms: '30일 후 결제',
      notes: '',
      customerInfo: {
        name: '스마트팩토리',
        contact: '정수연',
        phone: '032-3333-9999',
        email: 'smart@factory.com',
        address: '인천광역시 남동구',
      },
      items: [
        { name: 'IoT 센서', quantity: 50, unitPrice: 80000, total: 4000000 },
        { name: '데이터 수집 장치', quantity: 4, unitPrice: 2200000, total: 8800000 },
      ],
    },
  ];

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'confirmed':
        return 'bg-blue-100 text-blue-700';
      case 'pending':
        return 'bg-yellow-100 text-yellow-700';
      case 'processing':
        return 'bg-purple-100 text-purple-700';
      case 'shipped':
        return 'bg-green-100 text-green-700';
      case 'delivered':
        return 'bg-gray-100 text-gray-700';
      case 'cancelled':
        return 'bg-red-100 text-red-700';
      default:
        return 'bg-gray-100 text-gray-700';
    }
  };

  const getStatusText = (status: string) => {
    switch (status) {
      case 'confirmed':
        return '주문확인';
      case 'pending':
        return '검토중';
      case 'processing':
        return '처리중';
      case 'shipped':
        return '배송중';
      case 'delivered':
        return '배송완료';
      case 'cancelled':
        return '취소됨';
      default:
        return status;
    }
  };

  const handleViewOrder = (order: Order) => {
    const salesOrder: SalesOrder = {
      id: order.id,
      orderNumber: order.orderNumber,
      customer: order.customerInfo.name,
      date: order.orderDate,
      amount: order.amount,
      status: order.status,
      items: order.items.map((item) => ({
        ...item,
        total: item.total ?? item.unitPrice * item.quantity,
      })),
      customerInfo: {
        name: order.customerInfo.name,
        contact: order.customerInfo.contact,
        address: order.customerInfo.address ?? '',
        email: order.customerInfo.email ?? '',
      },
      deliveryDate: order.deliveryDate,
      paymentTerms: order.paymentTerms,
      notes: order.notes ?? 'ds',
    };

    setSelectedOrder(salesOrder);
    setShowDetailModal(true);
  };
  const filteredOrders =
    selectedStatus === 'all' ? orders : orders.filter((order) => order.status === selectedStatus);

  return (
    <div className="bg-white rounded-lg border border-gray-200">
      {/* 헤더 */}
      <div className="p-6 border-b border-gray-200">
        <div className="flex items-center justify-between">
          <h3 className="text-lg font-semibold text-gray-900">주문 목록</h3>
          <div className="flex items-center space-x-4">
            <select
              value={selectedStatus}
              onChange={(e) => setSelectedStatus(e.target.value)}
              className="px-3 py-2 border border-gray-300 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 pr-8"
            >
              <option value="all">전체 상태</option>
              <option value="pending">검토중</option>
              <option value="confirmed">주문확인</option>
              <option value="processing">처리중</option>
              <option value="shipped">배송중</option>
              <option value="delivered">배송완료</option>
              <option value="cancelled">취소됨</option>
            </select>
            <button
              onClick={() => setShowNewOrderModal(true)}
              className="px-4 py-2 bg-blue-600 text-white font-medium rounded-lg hover:bg-blue-700 transition-colors duration-200 cursor-pointer whitespace-nowrap flex items-center space-x-2"
            >
              <i className="ri-add-line"></i>
              <span>신규 견적 요청</span>
            </button>
          </div>
        </div>
      </div>

      {/* 테이블 */}
      <div className="overflow-x-auto">
        <table className="w-full">
          <thead className="bg-gray-50">
            <tr>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                주문번호
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                고객정보
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                주문일
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                납기일
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                주문금액
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
              <tr key={order.id} className="hover:bg-gray-50 transition-colors duration-200">
                <td className="px-6 py-4 whitespace-nowrap">
                  <div className="text-sm font-medium text-gray-900">{order.id}</div>
                </td>
                <td className="px-6 py-4">
                  <div className="text-sm font-medium text-gray-900">{order.customerInfo.name}</div>
                  <div className="text-sm text-gray-500">
                    {order.customerInfo.contact} · {order.customerInfo.phone}
                  </div>
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                  {order.orderDate}
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                  {order.deliveryDate}
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                  ₩{order.amount.toLocaleString()}
                </td>
                <td className="px-6 py-4 whitespace-nowrap">
                  <span
                    className={`px-2 py-1 text-xs font-medium rounded-full ${getStatusColor(order.status)}`}
                  >
                    {getStatusText(order.status)}
                  </span>
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                  <div className="flex items-center space-x-2">
                    <button
                      className="text-blue-600 hover:text-blue-900 cursor-pointer"
                      onClick={() => handleViewOrder(order)}
                    >
                      보기
                    </button>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      <NewOrderModal
        $showNewOrderModal={showNewOrderModal}
        $setShowNewOrderModal={setShowNewOrderModal}
      />
      <SalesOrderDetailModal
        $showDetailModal={showDetailModal}
        $setShowDetailModal={setShowDetailModal}
        $selectedOrder={selectedOrder}
        $getStatusColor={getStatusColor}
        $getStatusText={getStatusText}
      />
    </div>
  );
};

export default SalesOrderList;
