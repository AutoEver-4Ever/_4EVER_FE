'use client';

import { useState } from 'react';

interface SupplierInfo {
  name: string;
  contact: string;
  email: string;
  address: string;
}

interface OrderItem {
  item: string;
  specification: string;
  quantity: number;
  unit: string;
  unitPrice: number;
  amount: number;
}

interface DeliveryInfo {
  warehouse: string;
  requestDate: string;
  specialInstructions: string;
}

interface OrderDetails {
  supplierInfo: SupplierInfo;
  orderItems: OrderItem[];
  deliveryInfo: DeliveryInfo;
  notes: string;
}

interface PurchaseOrder {
  id: string;
  supplier: string;
  items: string;
  totalAmount: string;
  orderDate: string;
  deliveryDate: string;
  status: 'pending' | 'approved' | 'rejected';
  details: OrderDetails;
}

type SortField = 'orderDate' | 'deliveryDate' | '';
type SortDirection = 'asc' | 'desc';

const getStatusColor = (status: string): string => {
  switch (status) {
    case 'pending':
      return 'bg-yellow-100 text-yellow-700';
    case 'approved':
      return 'bg-green-100 text-green-700';
    case 'rejected':
      return 'bg-red-100 text-red-700';
    default:
      return 'bg-gray-100 text-gray-700';
  }
};

const getStatusText = (status: string): string => {
  switch (status) {
    case 'pending':
      return '대기';
    case 'approved':
      return '승인';
    case 'rejected':
      return '반려';
    default:
      return status;
  }
};

export default function PurchaseOrderListTab() {
  const [selectedStatus, setSelectedStatus] = useState<'all' | 'pending' | 'approved' | 'rejected'>(
    'all',
  );
  const [currentPage, setCurrentPage] = useState<number>(1);
  const [itemsPerPage] = useState<number>(5);
  const [showDetailModal, setShowDetailModal] = useState<boolean>(false);
  const [selectedOrder, setSelectedOrder] = useState<PurchaseOrder | null>(null);
  const [sortField, setSortField] = useState<SortField>('');
  const [sortDirection, setSortDirection] = useState<SortDirection>('asc');
  const [orders, setOrders] = useState<PurchaseOrder[]>([
    {
      id: 'PO-2024-001',
      supplier: '대한철강',
      items: '강판 500kg, 알루미늄 300kg',
      totalAmount: '₩5,000,000',
      orderDate: '2024-01-18',
      deliveryDate: '2024-01-25',
      status: 'approved',
      details: {
        supplierInfo: {
          name: '대한철강',
          contact: '02-1234-5678',
          email: 'order@steel.co.kr',
          address: '서울시 강남구 테헤란로 123',
        },
        orderItems: [
          {
            item: '강판',
            specification: 'SS400 10mm',
            quantity: 500,
            unit: 'kg',
            unitPrice: 8000,
            amount: 4000000,
          },
          {
            item: '알루미늄',
            specification: 'A6061 5mm',
            quantity: 300,
            unit: 'kg',
            unitPrice: 3333,
            amount: 1000000,
          },
        ],
        deliveryInfo: {
          warehouse: '본사 창고',
          requestDate: '2024-01-25',
          specialInstructions: '오전 배송 요청',
        },
        notes: '1월 생산용 원자재 주문',
      },
    },
    {
      id: 'PO-2024-002',
      supplier: '한국알루미늄',
      items: '알루미늄 시트 200매',
      totalAmount: '₩3,200,000',
      orderDate: '2024-01-17',
      deliveryDate: '2024-01-24',
      status: 'pending',
      details: {
        supplierInfo: {
          name: '한국알루미늄',
          contact: '031-987-6543',
          email: 'sales@aluminum.co.kr',
          address: '경기도 수원시 영통구 산업로 789',
        },
        orderItems: [
          {
            item: '알루미늄 시트',
            specification: 'A5052 3mm 1000x2000',
            quantity: 200,
            unit: '매',
            unitPrice: 16000,
            amount: 3200000,
          },
        ],
        deliveryInfo: {
          warehouse: '제2창고',
          requestDate: '2024-01-24',
          specialInstructions: '포장 주의',
        },
        notes: '도어 패널 생산용',
      },
    },
    {
      id: 'PO-2024-003',
      supplier: '포스코',
      items: '고강도 스틸 1톤',
      totalAmount: '₩4,800,000',
      orderDate: '2024-01-16',
      deliveryDate: '2024-01-23',
      status: 'rejected',
      details: {
        supplierInfo: {
          name: '포스코',
          contact: '054-220-0114',
          email: 'order@posco.co.kr',
          address: '경북 포항시 남구 동해안로 6261',
        },
        orderItems: [
          {
            item: '고강도 스틸',
            specification: 'SPFC590 2mm',
            quantity: 1000,
            unit: 'kg',
            unitPrice: 4800,
            amount: 4800000,
          },
        ],
        deliveryInfo: {
          warehouse: '본사 창고',
          requestDate: '2024-01-23',
          specialInstructions: '크레인 작업 필요',
        },
        notes: '범퍼 생산용 고강도 스틸',
      },
    },
  ]);

  const handleApprove = (orderId: string): void => {
    setOrders(
      orders.map((order) =>
        order.id === orderId ? { ...order, status: 'approved' as const } : order,
      ),
    );
    alert('발주서가 승인되었습니다.');
  };

  const handleReject = (orderId: string): void => {
    setOrders(
      orders.map((order) =>
        order.id === orderId ? { ...order, status: 'rejected' as const } : order,
      ),
    );
    alert('발주서가 반려되었습니다.');
  };

  const handleSort = (field: SortField): void => {
    if (sortField === field) {
      setSortDirection(sortDirection === 'asc' ? 'desc' : 'asc');
    } else {
      setSortField(field);
      setSortDirection('asc');
    }
  };

  const sortedOrders: PurchaseOrder[] = [...orders].sort((a, b) => {
    if (!sortField) return 0;

    let aValue = '';
    let bValue = '';

    if (sortField === 'orderDate') {
      aValue = a.orderDate;
      bValue = b.orderDate;
    } else if (sortField === 'deliveryDate') {
      aValue = a.deliveryDate;
      bValue = b.deliveryDate;
    }

    if (sortDirection === 'asc') {
      return aValue.localeCompare(bValue);
    } else {
      return bValue.localeCompare(aValue);
    }
  });

  const filteredOrders: PurchaseOrder[] = sortedOrders.filter((order) => {
    return selectedStatus === 'all' || order.status === selectedStatus;
  });

  const totalPages = Math.ceil(filteredOrders.length / itemsPerPage);
  const startIndex = (currentPage - 1) * itemsPerPage;
  const endIndex = startIndex + itemsPerPage;
  const currentOrders = filteredOrders.slice(startIndex, endIndex);

  const handlePageChange = (page: number): void => {
    setCurrentPage(page);
  };

  const handlePrevPage = (): void => {
    if (currentPage > 1) {
      setCurrentPage(currentPage - 1);
    }
  };

  const handleNextPage = (): void => {
    if (currentPage < totalPages) {
      setCurrentPage(currentPage + 1);
    }
  };

  const handleStatusChange = (status: string): void => {
    setSelectedStatus(status as 'all' | 'pending' | 'approved' | 'rejected');
    setCurrentPage(1);
  };

  const handleViewDetail = (order: PurchaseOrder): void => {
    setSelectedOrder(order);
    setShowDetailModal(true);
  };

  const getSortIcon = (field: SortField): string => {
    if (sortField !== field) {
      return 'ri-arrow-up-down-line text-gray-400';
    }
    return sortDirection === 'asc'
      ? 'ri-arrow-up-line text-blue-600'
      : 'ri-arrow-down-line text-blue-600';
  };

  return (
    <div className="bg-white rounded-lg border border-gray-200 p-6">
      <div className="flex items-center justify-between mb-6">
        <div className="flex items-center space-x-2">
          <i className="ri-file-list-3-line text-blue-600 text-lg"></i>
          <h3 className="text-lg font-semibold text-gray-900">발주서 목록</h3>
        </div>

        <div className="flex items-center space-x-2">
          <label className="text-sm text-gray-600">상태:</label>
          <select
            value={selectedStatus}
            onChange={(e) => handleStatusChange(e.target.value)}
            className="px-3 py-1 border border-gray-300 rounded-md text-sm cursor-pointer pr-8"
          >
            <option value="all">전체</option>
            <option value="pending">대기</option>
            <option value="approved">승인</option>
            <option value="rejected">반려</option>
          </select>
        </div>
      </div>

      <div className="overflow-x-auto">
        <table className="w-full">
          <thead>
            <tr className="border-b border-gray-200">
              <th className="text-left py-3 px-4 text-xs font-medium text-gray-500 uppercase tracking-wider">
                발주번호
              </th>
              <th className="text-left py-3 px-4 text-xs font-medium text-gray-500 uppercase tracking-wider">
                공급업체
              </th>
              <th className="text-left py-3 px-4 text-xs font-medium text-gray-500 uppercase tracking-wider">
                주문품목
              </th>
              <th className="text-right py-3 px-4 text-xs font-medium text-gray-500 uppercase tracking-wider">
                총금액
              </th>
              <th
                className="text-left py-3 px-4 text-xs font-medium text-gray-500 uppercase tracking-wider cursor-pointer hover:bg-gray-50"
                onClick={() => handleSort('orderDate')}
              >
                <div className="flex items-center space-x-1">
                  <span>주문일자</span>
                  <i className={getSortIcon('orderDate')}></i>
                </div>
              </th>
              <th
                className="text-left py-3 px-4 text-xs font-medium text-gray-500 uppercase tracking-wider cursor-pointer hover:bg-gray-50"
                onClick={() => handleSort('deliveryDate')}
              >
                <div className="flex items-center space-x-1">
                  <span>납기일</span>
                  <i className={getSortIcon('deliveryDate')}></i>
                </div>
              </th>
              <th className="text-left py-3 px-4 text-xs font-medium text-gray-500 uppercase tracking-wider">
                상태
              </th>
              <th className="text-center py-3 px-4 text-xs font-medium text-gray-500 uppercase tracking-wider">
                작업
              </th>
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-200">
            {currentOrders.map((order) => (
              <tr key={order.id} className="hover:bg-gray-50 transition-colors duration-200">
                <td className="py-3 px-4 text-sm font-medium text-gray-900">{order.id}</td>
                <td className="py-3 px-4 text-sm text-gray-900">{order.supplier}</td>
                <td className="py-3 px-4 text-sm text-gray-900 max-w-xs truncate">{order.items}</td>
                <td className="py-3 px-4 text-sm font-medium text-gray-900 text-right">
                  {order.totalAmount}
                </td>
                <td className="py-3 px-4 text-sm text-gray-500">{order.orderDate}</td>
                <td className="py-3 px-4 text-sm text-gray-500">{order.deliveryDate}</td>
                <td className="py-3 px-4">
                  <span
                    className={`px-2 py-1 rounded text-xs font-medium ${getStatusColor(order.status)}`}
                  >
                    {getStatusText(order.status)}
                  </span>
                </td>
                <td className="py-3 px-4 text-center">
                  <div className="flex items-center justify-center space-x-2">
                    <button
                      onClick={() => handleViewDetail(order)}
                      className="text-blue-600 hover:text-blue-500 cursor-pointer"
                      title="상세보기"
                    >
                      <i className="ri-eye-line"></i>
                    </button>
                    {order.status === 'pending' && (
                      <>
                        <button
                          onClick={() => handleApprove(order.id)}
                          className="text-green-600 hover:text-green-900 cursor-pointer"
                          title="승인"
                        >
                          <i className="ri-check-line"></i>
                        </button>
                        <button
                          onClick={() => handleReject(order.id)}
                          className="text-red-600 hover:text-red-900 cursor-pointer"
                          title="반려"
                        >
                          <i className="ri-close-line"></i>
                        </button>
                      </>
                    )}
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      <div className="mt-6 flex items-center justify-between">
        <div className="text-sm text-gray-500">
          총 {filteredOrders.length}건의 발주서 ({startIndex + 1}-
          {Math.min(endIndex, filteredOrders.length)} 표시)
        </div>
        <div className="flex items-center space-x-2">
          <button
            onClick={handlePrevPage}
            disabled={currentPage === 1}
            className={`px-3 py-1 border border-gray-300 rounded-md text-sm cursor-pointer ${
              currentPage === 1
                ? 'text-gray-400 bg-gray-50 cursor-not-allowed'
                : 'text-gray-700 hover:bg-gray-50'
            }`}
          >
            이전
          </button>

          {Array.from({ length: totalPages }, (_, i) => i + 1).map((page) => (
            <button
              key={page}
              onClick={() => handlePageChange(page)}
              className={`px-3 py-1 rounded-md text-sm cursor-pointer ${
                currentPage === page
                  ? 'bg-blue-600 text-white'
                  : 'border border-gray-300 text-gray-700 hover:bg-gray-50'
              }`}
            >
              {page}
            </button>
          ))}

          <button
            onClick={handleNextPage}
            disabled={currentPage === totalPages}
            className={`px-3 py-1 border border-gray-300 rounded-md text-sm cursor-pointer ${
              currentPage === totalPages
                ? 'text-gray-400 bg-gray-50 cursor-not-allowed'
                : 'text-gray-700 hover:bg-gray-50'
            }`}
          >
            다음
          </button>
        </div>
      </div>

      {/* 발주서 상세 모달 */}
      {showDetailModal && selectedOrder && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50">
          <div className="bg-white rounded-lg p-6 w-full max-w-4xl mx-4 max-h-[90vh] overflow-y-auto">
            <div className="flex items-center justify-between mb-6">
              <h3 className="text-xl font-semibold text-gray-900">발주서 상세 정보</h3>
              <button
                onClick={() => setShowDetailModal(false)}
                className="text-gray-400 hover:text-gray-600 cursor-pointer"
              >
                <i className="ri-close-line text-2xl"></i>
              </button>
            </div>

            <div className="space-y-6">
              {/* 기본 정보 */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="space-y-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">발주번호</label>
                    <div className="text-lg font-semibold text-gray-900">{selectedOrder.id}</div>
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">공급업체</label>
                    <div className="text-gray-900">{selectedOrder.details.supplierInfo.name}</div>
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">연락처</label>
                    <div className="text-gray-900">
                      {selectedOrder.details.supplierInfo.contact}
                    </div>
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">이메일</label>
                    <div className="text-blue-600">{selectedOrder.details.supplierInfo.email}</div>
                  </div>
                </div>
                <div className="space-y-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">주문일자</label>
                    <div className="text-gray-900">{selectedOrder.orderDate}</div>
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">납기일</label>
                    <div className="text-gray-900">{selectedOrder.deliveryDate}</div>
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">상태</label>
                    <span
                      className={`px-2 py-1 rounded text-xs font-medium ${getStatusColor(selectedOrder.status)}`}
                    >
                      {getStatusText(selectedOrder.status)}
                    </span>
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">총 금액</label>
                    <div className="text-lg font-semibold text-green-600">
                      {selectedOrder.totalAmount}
                    </div>
                  </div>
                </div>
              </div>

              {/* 주문 품목 */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-3">주문 품목</label>
                <div className="overflow-x-auto">
                  <table className="w-full border border-gray-300 rounded-lg">
                    <thead className="bg-gray-50">
                      <tr>
                        <th className="px-4 py-3 text-left text-sm font-medium text-gray-700 border-b">
                          품목명
                        </th>
                        <th className="px-4 py-3 text-left text-sm font-medium text-gray-700 border-b">
                          규격
                        </th>
                        <th className="px-4 py-3 text-right text-sm font-medium text-gray-700 border-b">
                          수량
                        </th>
                        <th className="px-4 py-3 text-left text-sm font-medium text-gray-700 border-b">
                          단위
                        </th>
                        <th className="px-4 py-3 text-right text-sm font-medium text-gray-700 border-b">
                          단가
                        </th>
                        <th className="px-4 py-3 text-right text-sm font-medium text-gray-700 border-b">
                          금액
                        </th>
                      </tr>
                    </thead>
                    <tbody>
                      {selectedOrder.details.orderItems.map((item: OrderItem, index: number) => (
                        <tr key={index} className="border-b">
                          <td className="px-4 py-3 text-sm text-gray-900">{item.item}</td>
                          <td className="px-4 py-3 text-sm text-gray-900">{item.specification}</td>
                          <td className="px-4 py-3 text-sm text-gray-900 text-right">
                            {item.quantity.toLocaleString()}
                          </td>
                          <td className="px-4 py-3 text-sm text-gray-900">{item.unit}</td>
                          <td className="px-4 py-3 text-sm text-gray-900 text-right">
                            ₩{item.unitPrice.toLocaleString()}
                          </td>
                          <td className="px-4 py-3 text-sm font-medium text-gray-900 text-right">
                            ₩{item.amount.toLocaleString()}
                          </td>
                        </tr>
                      ))}
                    </tbody>
                    <tfoot className="bg-gray-50">
                      <tr>
                        <td colSpan={5} className="px-4 py-3 text-right font-medium text-gray-900">
                          총 금액
                        </td>
                        <td className="px-4 py-3 text-right font-medium text-green-600">
                          ₩
                          {selectedOrder.details.orderItems
                            .reduce((sum: number, item: OrderItem) => sum + item.amount, 0)
                            .toLocaleString()}
                        </td>
                      </tr>
                    </tfoot>
                  </table>
                </div>
              </div>

              {/* 배송 정보 */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">배송 창고</label>
                  <div className="text-gray-900">
                    {selectedOrder.details.deliveryInfo.warehouse}
                  </div>
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    요청 배송일
                  </label>
                  <div className="text-gray-900">
                    {selectedOrder.details.deliveryInfo.requestDate}
                  </div>
                </div>
                <div className="md:col-span-2">
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    특별 지시사항
                  </label>
                  <div className="text-gray-900">
                    {selectedOrder.details.deliveryInfo.specialInstructions}
                  </div>
                </div>
              </div>

              {/* 메모 */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">메모</label>
                <div className="text-gray-900 bg-gray-50 p-3 rounded-lg">
                  {selectedOrder.details.notes}
                </div>
              </div>

              {/* 버튼 */}
              <div className="flex gap-3 pt-6 border-t border-gray-200">
                <button
                  onClick={() => setShowDetailModal(false)}
                  className="flex-1 px-4 py-2 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 transition-colors font-medium cursor-pointer whitespace-nowrap"
                >
                  닫기
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
