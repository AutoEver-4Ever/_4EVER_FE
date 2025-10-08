'use client';

import { useState } from 'react';

const SalesOrderList = () => {
  const [selectedStatus, setSelectedStatus] = useState('all');
  const [showNewOrderModal, setShowNewOrderModal] = useState(false);
  const [selectedDealer, setSelectedDealer] = useState('');
  const [orderItems, setOrderItems] = useState([
    {
      id: 1,
      productName: '',
      quantity: 1,
      unitPrice: 0,
      totalPrice: 0,
      deliveryDate: '',
    },
  ]);

  // 대리점 목업 데이터
  const dealers = [
    {
      id: 'dealer1',
      name: '서울 강남 대리점',
      customerName: '김대리',
      phone: '02-1234-5678',
      email: 'gangnam@dealer.com',
    },
    {
      id: 'dealer2',
      name: '부산 해운대 대리점',
      customerName: '이부장',
      phone: '051-9876-5432',
      email: 'haeundae@dealer.com',
    },
    {
      id: 'dealer3',
      name: '대구 수성 대리점',
      customerName: '박과장',
      phone: '053-5555-7777',
      email: 'suseong@dealer.com',
    },
    {
      id: 'dealer4',
      name: '광주 서구 대리점',
      customerName: '최팀장',
      phone: '062-3333-9999',
      email: 'seogu@dealer.com',
    },
  ];

  // 제품 목업 데이터
  const products = [
    { id: 'prod1', name: '도어패널', price: 150000 },
    { id: 'prod2', name: 'Hood Panel', price: 200000 },
    { id: 'prod3', name: 'Fender Panel', price: 180000 },
    { id: 'prod4', name: 'Trunk Lid', price: 220000 },
    { id: 'prod5', name: 'Roof Panel', price: 300000 },
  ];

  const [formData, setFormData] = useState({
    dealerId: '',
    customerName: '',
    phone: '',
    email: '',
    notes: '',
  });

  const orders = [
    {
      id: 'SO-2024-001',
      customer: '(주)테크솔루션',
      contact: '김영수',
      phone: '02-1234-5678',
      orderDate: '2024-01-15',
      deliveryDate: '2024-01-25',
      amount: '₩15,500,000',
      status: 'confirmed',
      priority: 'high',
      items: [
        { name: '산업용 모터 5HP', quantity: 5, unitPrice: 850000 },
        { name: '제어판넬', quantity: 2, unitPrice: 1200000 },
      ],
    },
    {
      id: 'SO-2024-002',
      customer: '대한제조',
      contact: '이민정',
      phone: '031-9876-5432',
      orderDate: '2024-01-16',
      deliveryDate: '2024-01-30',
      amount: '₩8,750,000',
      status: 'pending',
      priority: 'medium',
      items: [
        { name: '컨베이어 벨트', quantity: 3, unitPrice: 2500000 },
        { name: '센서 모듈', quantity: 10, unitPrice: 125000 },
      ],
    },
    {
      id: 'SO-2024-003',
      customer: '글로벌산업',
      contact: '박철수',
      phone: '051-5555-7777',
      orderDate: '2024-01-17',
      deliveryDate: '2024-02-05',
      amount: '₩22,300,000',
      status: 'shipped',
      priority: 'high',
      items: [
        { name: '자동화 라인', quantity: 1, unitPrice: 20000000 },
        { name: '품질검사 장비', quantity: 1, unitPrice: 2300000 },
      ],
    },
    {
      id: 'SO-2024-004',
      customer: '스마트팩토리',
      contact: '정수연',
      phone: '032-3333-9999',
      orderDate: '2024-01-18',
      deliveryDate: '2024-02-10',
      amount: '₩12,800,000',
      status: 'processing',
      priority: 'medium',
      items: [
        { name: 'IoT 센서', quantity: 50, unitPrice: 80000 },
        { name: '데이터 수집 장치', quantity: 4, unitPrice: 2200000 },
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

  const filteredOrders =
    selectedStatus === 'all' ? orders : orders.filter((order) => order.status === selectedStatus);

  const handleDealerChange = (dealerId: string) => {
    setSelectedDealer(dealerId);
    const dealer = dealers.find((d) => d.id === dealerId);
    if (dealer) {
      setFormData({
        ...formData,
        dealerId,
        customerName: dealer.customerName,
        phone: dealer.phone,
        email: dealer.email,
      });
    } else {
      setFormData({
        ...formData,
        dealerId: '',
        customerName: '',
        phone: '',
        email: '',
      });
    }
  };

  const handleProductChange = (itemIndex: number, productId: string) => {
    const product = products.find((p) => p.id === productId);
    if (product) {
      const updatedItems = [...orderItems];
      updatedItems[itemIndex] = {
        ...updatedItems[itemIndex],
        productName: product.name,
        unitPrice: product.price,
        totalPrice: updatedItems[itemIndex].quantity * product.price,
      };
      setOrderItems(updatedItems);
    }
  };

  const handleQuantityChange = (itemIndex: number, quantity: number) => {
    const updatedItems = [...orderItems];
    updatedItems[itemIndex] = {
      ...updatedItems[itemIndex],
      quantity,
      totalPrice: quantity * updatedItems[itemIndex].unitPrice,
    };
    setOrderItems(updatedItems);
  };

  const handleDeliveryDateChange = (itemIndex: number, deliveryDate: string) => {
    const updatedItems = [...orderItems];
    updatedItems[itemIndex] = {
      ...updatedItems[itemIndex],
      deliveryDate,
    };
    setOrderItems(updatedItems);
  };

  const addOrderItem = () => {
    setOrderItems([
      ...orderItems,
      {
        id: orderItems.length + 1,
        productName: '',
        quantity: 1,
        unitPrice: 0,
        totalPrice: 0,
        deliveryDate: '',
      },
    ]);
  };

  const removeOrderItem = (itemIndex: number) => {
    if (orderItems.length > 1) {
      setOrderItems(orderItems.filter((_, index) => index !== itemIndex));
    }
  };

  const getTotalAmount = () => {
    return orderItems.reduce((sum, item) => sum + item.totalPrice, 0);
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    alert('신규 견적 요청이 등록되었습니다.');
    setShowNewOrderModal(false);
    // 폼 초기화
    setFormData({
      dealerId: '',
      customerName: '',
      phone: '',
      email: '',
      notes: '',
    });
    setSelectedDealer('');
    setOrderItems([
      {
        id: 1,
        productName: '',
        quantity: 1,
        unitPrice: 0,
        totalPrice: 0,
        deliveryDate: '',
      },
    ]);
  };

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
                    className={`px-2 py-1 text-xs font-medium rounded-full ${getStatusColor(order.status)}`}
                  >
                    {getStatusText(order.status)}
                  </span>
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                  <div className="flex items-center space-x-2">
                    <button className="text-blue-600 hover:text-blue-900 cursor-pointer">
                      보기
                    </button>
                    <span className="text-gray-300">|</span>
                    <button className="text-gray-600 hover:text-gray-900 cursor-pointer">
                      수정
                    </button>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* 신규 견적 요청 모달 */}
      {showNewOrderModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white rounded-lg p-6 w-full max-w-4xl mx-4 max-h-[90vh] overflow-y-auto">
            <div className="flex items-center justify-between mb-6">
              <h3 className="text-xl font-semibold text-gray-900">신규 견적 요청</h3>
              <button
                onClick={() => setShowNewOrderModal(false)}
                className="text-gray-400 hover:text-gray-600 cursor-pointer"
              >
                <i className="ri-close-line text-xl"></i>
              </button>
            </div>

            <form onSubmit={handleSubmit} className="space-y-6">
              {/* 대리점 선택 */}
              <div className="bg-blue-50 p-4 rounded-lg">
                <h4 className="text-lg font-semibold text-gray-900 mb-4">대리점 선택</h4>
                <div className="grid grid-cols-1 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">대리점 *</label>
                    <select
                      value={selectedDealer}
                      onChange={(e) => handleDealerChange(e.target.value)}
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent text-sm pr-8"
                      required
                    >
                      <option value="">대리점을 선택하세요</option>
                      {dealers.map((dealer) => (
                        <option key={dealer.id} value={dealer.id}>
                          {dealer.name}
                        </option>
                      ))}
                    </select>
                  </div>
                </div>
              </div>

              {/* 고객 정보 */}
              <div className="bg-gray-50 p-4 rounded-lg">
                <h4 className="text-lg font-semibold text-gray-900 mb-4">고객 정보</h4>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">고객명 *</label>
                    <input
                      type="text"
                      value={formData.customerName}
                      onChange={(e) => setFormData({ ...formData, customerName: e.target.value })}
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent text-sm"
                      required
                      readOnly={selectedDealer !== ''}
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">연락처 *</label>
                    <input
                      type="tel"
                      value={formData.phone}
                      onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent text-sm"
                      required
                      readOnly={selectedDealer !== ''}
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">이메일 *</label>
                    <input
                      type="email"
                      value={formData.email}
                      onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent text-sm"
                      required
                      readOnly={selectedDealer !== ''}
                    />
                  </div>
                </div>
              </div>

              {/* 주문 품목 */}
              <div className="bg-green-50 p-4 rounded-lg">
                <div className="flex items-center justify-between mb-4">
                  <h4 className="text-lg font-semibold text-gray-900">주문 품목</h4>
                  <button
                    type="button"
                    onClick={addOrderItem}
                    className="px-3 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 transition-colors cursor-pointer text-sm flex items-center space-x-1"
                  >
                    <i className="ri-add-line"></i>
                    <span>품목 추가</span>
                  </button>
                </div>

                <div className="space-y-4">
                  {orderItems.map((item, index) => (
                    <div key={item.id} className="bg-white p-4 rounded-lg border border-gray-200">
                      <div className="grid grid-cols-1 md:grid-cols-5 gap-4">
                        <div>
                          <label className="block text-sm font-medium text-gray-700 mb-2">
                            제품명 *
                          </label>
                          <select
                            value={products.find((p) => p.name === item.productName)?.id || ''}
                            onChange={(e) => handleProductChange(index, e.target.value)}
                            className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent text-sm pr-8"
                            required
                          >
                            <option value="">제품을 선택하세요</option>
                            {products.map((product) => (
                              <option key={product.id} value={product.id}>
                                {product.name}
                              </option>
                            ))}
                          </select>
                        </div>
                        <div>
                          <label className="block text-sm font-medium text-gray-700 mb-2">
                            수량 *
                          </label>
                          <input
                            type="number"
                            value={item.quantity}
                            onChange={(e) =>
                              handleQuantityChange(index, parseInt(e.target.value) || 1)
                            }
                            className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent text-sm"
                            min="1"
                            required
                          />
                        </div>
                        <div>
                          <label className="block text-sm font-medium text-gray-700 mb-2">
                            단가
                          </label>
                          <input
                            type="text"
                            value={`₩${item.unitPrice.toLocaleString()}`}
                            className="w-full px-3 py-2 border border-gray-300 rounded-lg bg-gray-50 text-sm"
                            readOnly
                          />
                        </div>
                        <div>
                          <label className="block text-sm font-medium text-gray-700 mb-2">
                            납기일 *
                          </label>
                          <input
                            type="date"
                            value={item.deliveryDate}
                            onChange={(e) => handleDeliveryDateChange(index, e.target.value)}
                            className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent text-sm"
                            required
                          />
                        </div>
                        <div className="flex items-end">
                          <div className="flex-1">
                            <label className="block text-sm font-medium text-gray-700 mb-2">
                              금액
                            </label>
                            <input
                              type="text"
                              value={`₩${item.totalPrice.toLocaleString()}`}
                              className="w-full px-3 py-2 border border-gray-300 rounded-lg bg-gray-50 text-sm font-medium"
                              readOnly
                            />
                          </div>
                          {orderItems.length > 1 && (
                            <button
                              type="button"
                              onClick={() => removeOrderItem(index)}
                              className="ml-2 p-2 text-red-600 hover:text-red-800 cursor-pointer"
                            >
                              <i className="ri-delete-bin-line"></i>
                            </button>
                          )}
                        </div>
                      </div>
                    </div>
                  ))}
                </div>

                <div className="mt-4 p-4 bg-white rounded-lg border-2 border-blue-200">
                  <div className="flex justify-between items-center">
                    <span className="text-lg font-semibold text-gray-900">총 주문 금액</span>
                    <span className="text-xl font-bold text-blue-600">
                      ₩{getTotalAmount().toLocaleString()}
                    </span>
                  </div>
                </div>
              </div>

              {/* 비고 */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">비고</label>
                <textarea
                  value={formData.notes}
                  onChange={(e) => setFormData({ ...formData, notes: e.target.value })}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent text-sm"
                  rows={3}
                  placeholder="추가 요청사항이나 특이사항을 입력하세요"
                ></textarea>
              </div>

              {/* 버튼 */}
              <div className="flex justify-end space-x-4 pt-4">
                <button
                  type="button"
                  onClick={() => setShowNewOrderModal(false)}
                  className="px-6 py-2 border border-gray-300 text-gray-700 font-medium rounded-lg hover:bg-gray-50 transition-colors duration-200 cursor-pointer whitespace-nowrap"
                >
                  취소
                </button>
                <button
                  type="submit"
                  className="px-6 py-2 bg-blue-600 text-white font-medium rounded-lg hover:bg-blue-700 transition-colors duration-200 cursor-pointer whitespace-nowrap"
                >
                  견적 요청 등록
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};

export default SalesOrderList;
