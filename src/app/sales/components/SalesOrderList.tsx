'use client';

import { useState } from 'react';
import NewOrderModal from '@/app/sales/components/NewOrderModal';
import SalesOrderDetailModal from '@/app/sales/components/SalesOrderDetailModal';
import { Order } from '@/app/sales/types/SalesOrderListType';
import { SalesOrder } from '@/app/sales/types/SalesOrderType';

const SalesOrderList = () => {
  const [selectedStatus, setSelectedStatus] = useState('all');
  const [showNewOrderModal, setShowNewOrderModal] = useState(false);
  const [selectedOrderId, setSelectedOrderId] = useState('');
  const [showOrderDetailModal, setShowOrderDetailModal] = useState(false);

  const [selectedDealer, setSelectedDealer] = useState('');

  const [startDate, setStartDate] = useState('');
  const [endDate, setEndDate] = useState('');
  const [searchQuery, setSearchQuery] = useState('');

  const orders: Order[] = [
    {
      id: 'SO-2024-001',
      customer: '(주)테크솔루션',
      contact: '김영수',
      phone: '02-1234-5678',
      email: 'techsolution@company.com',
      address: '서울시 강남구 테헤란로 123',
      orderDate: '2024-01-15',
      deliveryDate: '2024-01-25',
      amount: '₩15,500,000',
      status: 'production',
      priority: 'high',
      items: [
        {
          name: '산업용 모터 5HP',
          quantity: 5,
          unitPrice: 850000,
          totalPrice: 4250000,
        },
        {
          name: '제어판넬',
          quantity: 2,
          unitPrice: 1200000,
          totalPrice: 2400000,
        },
      ],
      notes: '긴급 주문 - 우선 처리 요청',
      paymentMethod: '월말 정산',
      deliveryAddress: '경기도 성남시 분당구 판교역로 166',
    },
    {
      id: 'SO-2024-002',
      customer: '대한제조',
      contact: '이민정',
      phone: '031-9876-5432',
      email: 'daehan@manufacturing.co.kr',
      address: '경기도 수원시 영통구 광교로 154',
      orderDate: '2024-01-16',
      deliveryDate: '2024-01-30',
      amount: '₩8,750,000',
      status: 'ready',
      priority: 'medium',
      items: [
        {
          name: '컨베이어 벨트',
          quantity: 3,
          unitPrice: 2500000,
          totalPrice: 7500000,
        },
        {
          name: '센서 모듈',
          quantity: 10,
          unitPrice: 125000,
          totalPrice: 1250000,
        },
      ],
      notes: '정기 주문',
      paymentMethod: '현금',
      deliveryAddress: '경기도 수원시 영통구 광교로 154',
    },
    {
      id: 'SO-2024-003',
      customer: '글로벌산업',
      contact: '박철수',
      phone: '051-5555-7777',
      email: 'global@industry.com',
      address: '부산시 해운대구 센텀중앙로 79',
      orderDate: '2024-01-17',
      deliveryDate: '2024-02-05',
      amount: '₩22,300,000',
      status: 'shipping',
      priority: 'high',
      items: [
        {
          name: '자동화 라인',
          quantity: 1,
          unitPrice: 20000000,
          totalPrice: 20000000,
        },
        {
          name: '품질검사 장비',
          quantity: 1,
          unitPrice: 2300000,
          totalPrice: 2300000,
        },
      ],
      notes: '설치 지원 필요',
      paymentMethod: '카드',
      deliveryAddress: '부산시 강서구 공항진입로 108',
    },
    {
      id: 'SO-2024-004',
      customer: '스마트팩토리',
      contact: '정수연',
      phone: '032-3333-9999',
      email: 'smart@factory.kr',
      address: '인천시 연수구 컨벤시아대로 165',
      orderDate: '2024-01-18',
      deliveryDate: '2024-02-10',
      amount: '₩12,800,000',
      status: 'delivered',
      priority: 'medium',
      items: [
        {
          name: 'IoT 센서',
          quantity: 50,
          unitPrice: 80000,
          totalPrice: 4000000,
        },
        {
          name: '데이터 수집 장치',
          quantity: 4,
          unitPrice: 2200000,
          totalPrice: 8800000,
        },
      ],
      notes: '기술 지원 포함',
      paymentMethod: '계좌이체',
      deliveryAddress: '인천시 연수구 컨벤시아대로 165',
    },
    {
      id: 'SO-2024-005',
      customer: '미래기술',
      contact: '최영희',
      phone: '042-7777-8888',
      email: 'future@tech.co.kr',
      address: '대전시 유성구 대학로 291',
      orderDate: '2024-01-19',
      deliveryDate: '2024-02-15',
      amount: '₩9,200,000',
      status: 'confirmed',
      priority: 'low',
      items: [
        {
          name: '제어 시스템',
          quantity: 2,
          unitPrice: 4600000,
          totalPrice: 9200000,
        },
      ],
      notes: '표준 주문',
      paymentMethod: '월말 정산',
      deliveryAddress: '대전시 유성구 대학로 291',
    },
  ];

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'production':
        return 'bg-blue-100 text-blue-700';
      case 'ready':
        return 'bg-green-100 text-green-700';
      case 'shipping':
        return 'bg-yellow-100 text-yellow-700';
      case 'delivered':
        return 'bg-purple-100 text-purple-700';
      case 'confirmed':
        return 'bg-gray-100 text-gray-700';
      default:
        return 'bg-gray-100 text-gray-700';
    }
  };

  const getStatusText = (status: string) => {
    switch (status) {
      case 'production':
        return '생산중';
      case 'ready':
        return '출고 준비 완료';
      case 'shipping':
        return '배송중';
      case 'delivered':
        return '배송완료';
      case 'confirmed':
        return '구매확정';
      default:
        return status;
    }
  };

  const handleViewOrder = (order: Order) => {
    // const salesOrder: SalesOrder = {
    //   id: order.id,
    //   customer: order.customerInfo.name,
    //   contact: order.customerInfo.contact ?? '',
    //   phone: order.customerInfo.phone ?? '',
    //   email: order.customerInfo.email ?? '',
    //   address: order.customerInfo.address ?? '',
    //   orderDate: order.orderDate,
    //   deliveryDate: order.deliveryDate,
    //   amount: order.amount,
    //   status: order.status,
    //   priority: order.priority,
    //   items: order.items.map((item) => ({
    //     name: item.name,
    //     quantity: item.quantity,
    //     unitPrice: item.unitPrice,
    //     totalPrice: item.totalPrice ?? item.unitPrice * item.quantity,
    //   })),
    //   notes: order.notes ?? '',
    //   paymentMethod: order.paymentMethod ?? '',
    //   deliveryAddress: order.deliveryAddress ?? '',
    // };

    // setSelectedOrder(salesOrder);
    setShowOrderDetailModal(true);
  };
  const filteredOrders = orders.filter((order) => {
    const matchesStatus = selectedStatus === 'all' || order.status === selectedStatus;
    const matchesSearch =
      searchQuery === '' ||
      order.id.toLowerCase().includes(searchQuery.toLowerCase()) ||
      order.customer.toLowerCase().includes(searchQuery.toLowerCase()) ||
      order.contact.toLowerCase().includes(searchQuery.toLowerCase());

    let matchesDate = true;
    if (startDate && endDate) {
      const orderDate = new Date(order.orderDate);
      const start = new Date(startDate);
      const end = new Date(endDate);
      matchesDate = orderDate >= start && orderDate <= end;
    }

    return matchesStatus && matchesSearch && matchesDate;
  });
  return (
    <div className="bg-white rounded-lg border border-gray-200 mt-6">
      {/* 헤더 */}
      <div className="p-6 border-b border-gray-200">
        <div className="flex items-center justify-between mb-4">
          <h3 className="text-lg font-semibold text-gray-900">주문 품목</h3>
        </div>

        {/* 필터링 및 검색 */}
        <div className="flex flex-wrap items-center gap-4">
          {/* 날짜 필터 */}
          <div className="flex items-center space-x-2">
            <input
              type="date"
              value={startDate}
              onChange={(e: React.ChangeEvent<HTMLInputElement>) => setStartDate(e.target.value)}
              className="px-3 py-2 border border-gray-300 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
              placeholder="시작날짜"
            />
            <span className="text-gray-500">~</span>
            <input
              type="date"
              value={endDate}
              onChange={(e: React.ChangeEvent<HTMLInputElement>) => setEndDate(e.target.value)}
              className="px-3 py-2 border border-gray-300 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
              placeholder="끝날짜"
            />
          </div>

          {/* 검색 */}
          <div className="flex-1 max-w-md">
            <div className="relative">
              <i className="ri-search-line absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400"></i>
              <input
                type="text"
                value={searchQuery}
                onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
                  setSearchQuery(e.target.value)
                }
                placeholder="주문번호, 고객명, 담당자로 검색"
                className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>
          </div>

          {/* 상태 필터 */}
          <select
            value={selectedStatus}
            onChange={(e: React.ChangeEvent<HTMLSelectElement>) =>
              setSelectedStatus(e.target.value)
            }
            className="px-3 py-2 border border-gray-300 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 pr-8"
          >
            <option value="all">전체 상태</option>
            <option value="production">생산중</option>
            <option value="ready">출고 준비 완료</option>
            <option value="shipping">배송중</option>
            <option value="delivered">배송완료</option>
            <option value="confirmed">구매확정</option>
          </select>
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
                  <div className="text-sm font-medium text-gray-900">{order.customer}</div>
                  <div className="text-sm text-gray-500">
                    {order.contact} · {order.phone}
                  </div>
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                  {order.orderDate}
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                  {order.deliveryDate}
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                  {order.amount}
                </td>
                <td className="px-6 py-4 whitespace-nowrap">
                  <span
                    className={`px-2 py-1 text-xs font-medium rounded-full ${getStatusColor(
                      order.status,
                    )}`}
                  >
                    {getStatusText(order.status)}
                  </span>
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                  <button
                    onClick={() => setShowOrderDetailModal(true)}
                    className="text-blue-600 hover:text-blue-900 cursor-pointer"
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
      <SalesOrderDetailModal
        $showOrderDetailModal={showOrderDetailModal}
        $setShowOrderDetailModal={setShowOrderDetailModal}
        $selectedOrderId={selectedOrderId}
        $getStatusColor={getStatusColor}
        $getStatusText={getStatusText}
      />
    </div>
  );
};

export default SalesOrderList;
