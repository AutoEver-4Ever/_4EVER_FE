'use client';

import { useState } from 'react';
import PurchaseOrderDetailModal from '@/app/purchase/components/modals/PurchaseOrderDetailModal';
import PurchaseOrderTable from '@/app/purchase/components/sections/PurchaseOrderTableSection';
import { PurchaseOrder } from '@/app/purchase/types/PurchaseOrderType';

type SortField = 'orderDate' | 'deliveryDate' | '';
type SortDirection = 'asc' | 'desc';

// 상태 색상 유틸리티 함수 (PurchaseOrderTable로 props로 전달)
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

// 상태 텍스트 유틸리티 함수 (PurchaseOrderTable로 props로 전달)
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
            quantity: 500,
            unit: 'kg',
            unitPrice: 8000,
            amount: 4000000,
          },
          {
            item: '알루미늄',
            quantity: 300,
            unit: 'kg',
            unitPrice: 3333,
            amount: 1000000,
          },
        ],
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
            quantity: 200,
            unit: '매',
            unitPrice: 16000,
            amount: 3200000,
          },
        ],
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
            quantity: 1000,
            unit: 'kg',
            unitPrice: 4800,
            amount: 4800000,
          },
        ],
        notes: '범퍼 생산용 고강도 스틸',
      },
    },
  ]);

  // 발주서 승인 핸들러
  const handleApprove = (orderId: string): void => {
    setOrders(
      orders.map((order) =>
        order.id === orderId ? { ...order, status: 'approved' as const } : order,
      ),
    );
    alert('발주서가 승인되었습니다.');
  };

  // 발주서 반려 핸들러
  const handleReject = (orderId: string): void => {
    setOrders(
      orders.map((order) =>
        order.id === orderId ? { ...order, status: 'rejected' as const } : order,
      ),
    );
    alert('발주서가 반려되었습니다.');
  };

  // 정렬 핸들러
  const handleSort = (field: SortField): void => {
    if (sortField === field) {
      setSortDirection(sortDirection === 'asc' ? 'desc' : 'asc');
    } else {
      setSortField(field);
      setSortDirection('asc');
    }
  };

  // 정렬된 발주서 목록 계산
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

  // 필터링된 발주서 목록 계산
  const filteredOrders: PurchaseOrder[] = sortedOrders.filter((order) => {
    return selectedStatus === 'all' || order.status === selectedStatus;
  });

  // 페이지네이션 계산
  const totalPages = Math.ceil(filteredOrders.length / itemsPerPage);
  const startIndex = (currentPage - 1) * itemsPerPage;
  const endIndex = startIndex + itemsPerPage;
  const currentOrders = filteredOrders.slice(startIndex, endIndex);

  // 페이지 변경 핸들러
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

  // 상태 필터 변경 핸들러
  const handleStatusChange = (status: string): void => {
    setSelectedStatus(status as 'all' | 'pending' | 'approved' | 'rejected');
    setCurrentPage(1); // 상태 변경 시 첫 페이지로 이동
  };

  // 상세 보기 모달 핸들러
  const handleViewDetail = (order: PurchaseOrder): void => {
    setSelectedOrder(order);
    setShowDetailModal(true);
  };

  // 정렬 아이콘 반환 함수 (PurchaseOrderTable로 props로 전달)
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

        {/* 상태 필터 */}
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

      {/* 테이블 컴포넌트 사용: 데이터, 정렬 및 작업 관련 함수들을 props로 전달 */}
      <PurchaseOrderTable
        currentOrders={currentOrders}
        handleSort={handleSort}
        getSortIcon={getSortIcon}
        handleViewDetail={handleViewDetail}
        handleApprove={handleApprove}
        handleReject={handleReject}
        getStatusColor={getStatusColor}
        getStatusText={getStatusText}
      />

      {/* 페이지네이션 섹션 */}
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

      {/* 발주서 상세 정보 모달 */}
      {showDetailModal && selectedOrder && (
        <PurchaseOrderDetailModal
          order={selectedOrder}
          onClose={() => setShowDetailModal(false)}
          getStatusColor={getStatusColor}
          getStatusText={getStatusText}
        />
      )}
    </div>
  );
}
