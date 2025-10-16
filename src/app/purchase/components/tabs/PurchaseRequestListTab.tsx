'use client';

import { useState } from 'react';
import { useQuery } from '@tanstack/react-query';
import PurchaseRequestModal from '@/app/purchase/components/modals/PurchaseRequestModal';
import PurchaseRequestDetailModal from '@/app/purchase/components/modals/PurchaseRequestDetailModal';
import { fetchPurchaseReqList } from '@/app/purchase/api/purchase.api';
import { PURCHASE_LIST_TABLE_HEADERS, PURCHASE_REQ_STATUS } from '@/app/purchase/constants';
import IconButton from '@/app/components/common/IconButton';
import Dropdown from '@/app/components/common/Dropdown';
import { PurchaseReqListResponse, PurchaseReqResponse } from '@/app/purchase/types/PurchaseReqType';
import DateRangePicker from '@/app/components/common/DateRangePicker';

const getStatusColor = (status: string): string => {
  switch (status) {
    case 'APPROVED':
      return 'bg-green-100 text-green-700';
    case 'waiting':
      return 'bg-blue-100 text-blue-700';
    case 'rejected':
      return 'bg-red-100 text-red-700';
    default:
      return 'bg-gray-100 text-gray-700';
  }
};

const getStatusText = (status: string): string => {
  switch (status) {
    case 'APPROVED':
      return '승인';
    case 'waiting':
      return '대기';
    case 'rejected':
      return '반려';
    default:
      return status;
  }
};

export default function PurchaseRequestListTab() {
  const [selectedStatus, setSelectedStatus] = useState<string>('');
  const [currentPage, setCurrentPage] = useState(0);
  const [pageSize] = useState(10);
  const [showRequestModal, setShowRequestModal] = useState(false);
  const [showDetailModal, setShowDetailModal] = useState(false);
  const [selectedRequestId, setSelectedRequestId] = useState<number>(-1);

  const [startDate, setStartDate] = useState('');
  const [endDate, setEndDate] = useState('');

  // React Query로 요청 목록 가져오기
  const {
    data: requestData,
    isLoading,
    isError,
  } = useQuery<PurchaseReqListResponse>({
    queryKey: ['purchaseRequests', currentPage, pageSize, selectedStatus, startDate, endDate],
    queryFn: () =>
      fetchPurchaseReqList({
        page: currentPage,
        size: pageSize,
        status: selectedStatus || undefined,
        createdFrom: startDate,
        createdTo: endDate,
      }),
  });

  if (isLoading) return <p>불러오는 중...</p>;
  if (isError || !requestData) return <p>데이터를 불러오지 못했습니다.</p>;

  const requests = requestData.content || [];
  const pageInfo = requestData.page;

  const isFirstPage = currentPage === 0;
  const isLastPage = pageInfo ? currentPage === pageInfo.totalPages - 1 : true;

  const getStatusValue = (): string => {
    const item = PURCHASE_REQ_STATUS.find((s) => s.key === selectedStatus);
    return item?.value || '전체 상태';
  };

  const handleStatusChange = (status: string): void => {
    setSelectedStatus(status);
    setCurrentPage(0);
  };

  const handlePageChange = (page: number): void => {
    setCurrentPage(page);
  };

  const handlePrevPage = (): void => {
    if (pageInfo && currentPage > 0) {
      setCurrentPage(currentPage - 1);
    }
  };

  const handleNextPage = (): void => {
    if (pageInfo && currentPage < pageInfo.totalPages - 1) {
      setCurrentPage(currentPage + 1);
    }
  };

  const handleViewDetail = (request: PurchaseReqResponse): void => {
    setSelectedRequestId(request.id);
    setShowDetailModal(true);
  };

  const handleCloseDetail = () => {
    setShowDetailModal(false);
    setSelectedRequestId(-1);
  };

  return (
    <>
      <div className="bg-white rounded-lg shadow">
        {/* 필터 헤더 */}
        <div className="p-6 border-b border-gray-200 flex justify-between items-center">
          <h3 className="text-lg font-semibold text-gray-900">구매 요청 목록</h3>
          <div className="flex items-center space-x-4">
            <DateRangePicker
              startDate={startDate}
              onStartDateChange={setStartDate}
              endDate={endDate}
              onEndDateChange={setEndDate}
            />
            <Dropdown
              label={getStatusValue()}
              items={PURCHASE_REQ_STATUS}
              onChange={handleStatusChange}
            />
            <IconButton icon="ri-add-line" onClick={() => setShowRequestModal(true)}>
              구매 요청 작성
            </IconButton>
          </div>
        </div>

        {/* 테이블 */}
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead className="bg-gray-50">
              <tr>
                {PURCHASE_LIST_TABLE_HEADERS.map((header) => (
                  <th
                    key={header}
                    className="px-6 py-3 text-xs font-medium text-gray-500 uppercase tracking-wider text-center"
                  >
                    {header}
                  </th>
                ))}
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {requests.map((request) => (
                <tr key={request.id} className="hover:bg-gray-50 text-center">
                  <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                    <div className="flex flex-col">
                      <span>{request.prNumber}</span>
                      <span>{request.departmentName}</span>
                    </div>
                  </td>
                  <td className="px-6 py-4 text-sm text-gray-500">{request.requesterName}</td>
                  <td className="px-6 py-4 text-sm text-gray-500">{request.requestDate}</td>
                  <td className="px-6 py-4 text-sm text-gray-500">{request.desiredDeliveryDate}</td>
                  <td className="px-6 py-4 text-sm text-gray-500">{request.totalAmount}원</td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <span
                      className={`px-2 py-1 rounded-full text-xs font-medium ${getStatusColor('APPROVED')}`}
                    >
                      {getStatusText('APPROVED')}
                    </span>
                  </td>
                  <td className="px-6 py-4 text-sm text-gray-500">
                    <button
                      onClick={() => handleViewDetail(request)}
                      className="w-8 h-8 flex items-center justify-center text-blue-500 hover:bg-blue-50 rounded cursor-pointer"
                      title="상세보기"
                    >
                      <i className="ri-eye-line"></i>
                    </button>
                  </td>
                </tr>
              ))}
              {requests.length === 0 && (
                <tr>
                  <td colSpan={6} className="px-6 py-8 text-center text-gray-500 text-sm">
                    구매 요청이 없습니다.
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>

        {/* 페이지네이션 */}
        {pageInfo && (
          <div className="p-6 flex items-center justify-between border-t border-gray-200">
            <div className="text-sm text-gray-600">
              총 {pageInfo.totalElements}건 ({pageInfo.size * currentPage + 1}-
              {Math.min(pageInfo.size * (currentPage + 1), pageInfo.totalElements)} 표시)
            </div>
            <div className="flex items-center space-x-2">
              <button
                onClick={handlePrevPage}
                disabled={isFirstPage}
                className={`px-3 py-1 border border-gray-300 rounded-lg text-sm ${
                  isFirstPage
                    ? 'text-gray-400 bg-gray-50 cursor-not-allowed'
                    : 'text-gray-700 hover:bg-gray-100'
                }`}
              >
                이전
              </button>

              {Array.from({ length: pageInfo.totalPages }, (_, i) => i).map((page) => (
                <button
                  key={page}
                  onClick={() => handlePageChange(page)}
                  className={`px-3 py-1 rounded-lg text-sm font-medium ${
                    currentPage === page
                      ? 'bg-blue-600 text-white'
                      : 'border border-gray-300 text-gray-700 hover:bg-gray-100'
                  }`}
                >
                  {page + 1}
                </button>
              ))}

              <button
                onClick={handleNextPage}
                disabled={isLastPage}
                className={`px-3 py-1 border border-gray-300 rounded-lg text-sm ${
                  isLastPage
                    ? 'text-gray-400 bg-gray-50 cursor-not-allowed'
                    : 'text-gray-700 hover:bg-gray-100'
                }`}
              >
                다음
              </button>
            </div>
          </div>
        )}
      </div>

      {/* 구매 요청 작성 모달 */}
      {showRequestModal && (
        <PurchaseRequestModal
          onClose={() => setShowRequestModal(false)}
          // onSubmit={() => {
          //   setShowRequestModal(false);
          //   refetch();
          // }}
        />
      )}

      {/* 구매 요청 상세 모달 */}
      {showDetailModal && (
        <PurchaseRequestDetailModal purchaseId={selectedRequestId} onClose={handleCloseDetail} />
      )}
    </>
  );
}
