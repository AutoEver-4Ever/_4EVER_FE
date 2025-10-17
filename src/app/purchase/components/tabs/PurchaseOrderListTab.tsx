'use client';

import { useState } from 'react';
import PurchaseOrderDetailModal from '@/app/purchase/components/modals/PurchaseOrderDetailModal';
import PurchaseOrderTable from '@/app/purchase/components/sections/PurchaseOrderTableSection';
import { PurchaseOrder } from '@/app/purchase/types/PurchaseOrderType';
import { useMutation, useQuery } from '@tanstack/react-query';
import {
  fetchPurchaseOrderList,
  postApprovePurchaseOrder,
  postRejectPurchaseOrder,
} from '@/app/purchase/api/purchase.api';
import { PURCHASE_ORDER_STATUS, PurchaseOrderStatus } from '@/app/purchase/constants';
import Dropdown from '@/app/components/common/Dropdown';
import DateRangePicker from '@/app/components/common/DateRangePicker';
import { getQueryClient } from '@/lib/queryClient';

type SortField = 'orderDate' | 'deliveryDate' | '';
type SortDirection = 'asc' | 'desc';

// 상태 색상 유틸리티 함수
const getStatusColor = (status: PurchaseOrderStatus): string => {
  switch (status) {
    case 'PENDING':
      return 'bg-yellow-100 text-yellow-700';
    case 'APPROVED':
      return 'bg-green-100 text-green-700';
    case 'REJECTED':
      return 'bg-red-100 text-red-700';
    case 'DELIVERED':
      return 'bg-purple-100 text-purple-700';
    default:
      return 'bg-gray-100 text-gray-700';
  }
};

// 상태 텍스트 유틸리티 함수
const getStatusText = (key: PurchaseOrderStatus): string => {
  const status = PURCHASE_ORDER_STATUS.find((item) => item.key === key);
  return status ? status.value : '전체';
};

export default function PurchaseOrderListTab() {
  const [selectedStatus, setSelectedStatus] = useState<PurchaseOrderStatus>('ALL');
  const [showDetailModal, setShowDetailModal] = useState<boolean>(false);
  const [selectedOrder, setSelectedOrder] = useState<PurchaseOrder | null>(null);
  const [sortField, setSortField] = useState<SortField>('');
  const [sortDirection, setSortDirection] = useState<SortDirection>('asc');
  const [currentPage, setCurrentPage] = useState<number>(0); // 0부터 시작
  const [pageSize] = useState(10);

  const [startDate, setStartDate] = useState('');
  const [endDate, setEndDate] = useState('');

  const queryClient = getQueryClient();

  const {
    data: orderData,
    isLoading,
    isError,
  } = useQuery({
    queryKey: ['purchase-orders', currentPage, pageSize, selectedStatus],
    queryFn: () =>
      fetchPurchaseOrderList({
        page: currentPage,
        size: pageSize,
        status: selectedStatus || undefined,
      }),
  });

  // 승인 mutation
  const { mutate: approvePurchaseOrder } = useMutation({
    mutationFn: (poId: number) => postApprovePurchaseOrder(poId),
    onSuccess: () => {
      alert('발주서 승인 완료되었습니다.');
      queryClient.invalidateQueries({ queryKey: ['purchase-order-detail'] });
    },
    onError: (error) => {
      alert(`발주서 승인 중 오류가 발생했습니다. ${error}`);
    },
  });

  const { mutate: rejectPurhcaseOrder } = useMutation({
    mutationFn: (poId: number) => postRejectPurchaseOrder(poId),
    onSuccess: () => {
      alert('반려 처리되었습니다.');
      queryClient.invalidateQueries({ queryKey: ['purchaseReqeust"'] });
    },
    onError: (error) => {
      alert(`반려 중 오류가 발생했습니다. ${error}`);
    },
  });

  if (isLoading) return <p>불러오는 중...</p>;
  if (isError || !orderData) return <p>데이터를 불러오지 못했습니다.</p>;

  const orders = orderData.content || [];
  const pageInfo = orderData.page;

  const handleApprove = (poId: number) => {
    if (confirm('해당 요청을 승인하시겠습니까?')) {
      approvePurchaseOrder(poId);
    }
  };

  const handleReject = (poId: number) => {
    if (confirm('해당 요청을 반려하시겠습니까?')) {
      rejectPurhcaseOrder(poId);
    }
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

  // 페이지네이션 계산
  const isFirstPage = currentPage === 0;
  const isLastPage = pageInfo ? currentPage === pageInfo.totalPages - 1 : true;
  const startIndex = pageInfo.size * currentPage + 1;
  const endIndex = Math.min(pageInfo.size * (currentPage + 1), pageInfo.totalElements);

  // 페이지 변경 핸들러
  const handlePageChange = (page: number): void => {
    setCurrentPage(page);
  };

  const handlePrevPage = (): void => {
    if (!isFirstPage) {
      setCurrentPage(currentPage - 1);
    }
  };

  const handleNextPage = (): void => {
    if (!isLastPage) {
      setCurrentPage(currentPage + 1);
    }
  };

  // 상세 보기 모달 핸들러
  const handleViewDetail = (order: PurchaseOrder): void => {
    setSelectedOrder(order);
    setShowDetailModal(true);
  };

  // 정렬 아이콘 반환 함수
  const getSortIcon = (field: SortField): string => {
    if (sortField !== field) {
      return 'ri-arrow-up-down-line text-gray-400';
    }
    return sortDirection === 'asc'
      ? 'ri-arrow-up-line text-blue-600'
      : 'ri-arrow-down-line text-blue-600';
  };

  const handleStatusChange = (status: string) => {
    setSelectedStatus(status as PurchaseOrderStatus);
    setCurrentPage(0); // 첫 페이지로
  };

  const getStatusValue = (): string => {
    const item = PURCHASE_ORDER_STATUS.find((s) => s.key === selectedStatus);
    return item?.value || '전체';
  };

  return (
    <div className="bg-white rounded-lg border border-gray-200 p-6">
      <div className="flex items-center justify-between mb-6">
        <div className="flex items-center space-x-2">
          <i className="ri-file-list-3-line text-blue-600 text-lg"></i>
          <h3 className="text-lg font-semibold text-gray-900">발주서 목록</h3>
        </div>

        <DateRangePicker
          startDate={startDate}
          onStartDateChange={setStartDate}
          endDate={endDate}
          onEndDateChange={setEndDate}
        />

        {/* 상태 필터 */}
        <Dropdown
          label={getStatusValue()}
          items={PURCHASE_ORDER_STATUS}
          onChange={handleStatusChange}
        />
      </div>

      {/* 테이블 컴포넌트 */}
      <PurchaseOrderTable
        currentOrders={sortedOrders}
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
          총 {pageInfo.totalElements}건의 발주서 ({startIndex}-{endIndex} 표시)
        </div>
        <div className="flex items-center space-x-2">
          <button
            onClick={handlePrevPage}
            disabled={isFirstPage}
            className={`px-3 py-1 border border-gray-300 rounded-md text-sm ${
              isFirstPage
                ? 'text-gray-400 bg-gray-50 cursor-not-allowed'
                : 'text-gray-700 hover:bg-gray-50 cursor-pointer'
            }`}
          >
            이전
          </button>

          {Array.from({ length: pageInfo.totalPages }, (_, i) => i).map((page) => (
            <button
              key={page}
              onClick={() => handlePageChange(page)}
              className={`px-3 py-1 rounded-md text-sm cursor-pointer ${
                currentPage === page
                  ? 'bg-blue-600 text-white'
                  : 'border border-gray-300 text-gray-700 hover:bg-gray-50'
              }`}
            >
              {page + 1}
            </button>
          ))}

          <button
            onClick={handleNextPage}
            disabled={isLastPage}
            className={`px-3 py-1 border border-gray-300 rounded-md text-sm ${
              isLastPage
                ? 'text-gray-400 bg-gray-50 cursor-not-allowed'
                : 'text-gray-700 hover:bg-gray-50 cursor-pointer'
            }`}
          >
            다음
          </button>
        </div>
      </div>

      {/* 발주서 상세 정보 모달 */}
      {showDetailModal && selectedOrder && (
        <PurchaseOrderDetailModal
          purchaseId={selectedOrder.id}
          onClose={() => setShowDetailModal(false)}
        />
      )}
    </div>
  );
}
