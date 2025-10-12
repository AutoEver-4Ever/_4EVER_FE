// app/purchase/components/PurchaseRequestList.tsx
'use client';

import { useState } from 'react';
import PurchaseRequestModal from '@/app/purchase/components/modals/PurchaseRequestModal';
import PurchaseRequestDetailModal from '@/app/purchase/components/modals/PurchaseRequestDetailModal';
import { PurchaseRequestResult } from '@/app/purchase/types/PurchaseRequestResultType';
import { PURCHASE_LIST_TABLE_HEADERS } from '@/app/purchase/constants';

const getStatusColor = (status: string): string => {
  switch (status) {
    case 'approved':
      return 'bg-green-100 text-green-700';
    case 'pending':
      return 'bg-yellow-100 text-yellow-700';
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
    case 'approved':
      return '승인';
    case 'pending':
      return '대기';
    case 'waiting':
      return '대기';
    case 'rejected':
      return '반려';
    default:
      return status;
  }
};

export default function PurchaseRequestList() {
  const [selectedStatus, setSelectedStatus] = useState('all');
  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage] = useState(5);
  const [showRequestModal, setShowRequestModal] = useState(false);
  const [showDetailModal, setShowDetailModal] = useState(false);
  const [selectedRequest, setSelectedRequest] = useState<PurchaseRequestResult | null>(null); // 선택된 구매 요청

  const [requests, setRequests] = useState<PurchaseRequestResult[]>([
    {
      id: 'PR-2024-001',
      requester: '김철수',
      department: '생산팀',
      requestDate: '2024-01-15',
      dueDate: '2024-01-25',
      totalAmount: '₩2,500,000',
      status: 'approved',
      items: [
        { name: '강판', quantity: '500', unit: 'EA', price: '5,000' },
        { name: '볼트', quantity: '100', unit: 'EA', price: '500' },
      ],
    },
    {
      id: 'PR-2024-002',
      requester: '이영희',
      department: '품질팀',
      requestDate: '2024-01-16',
      dueDate: '2024-01-26',
      totalAmount: '₩1,800,000',
      status: 'pending',
      items: [{ name: '알루미늄', quantity: '200', unit: 'EA', price: '9,000' }],
    },
    {
      id: 'PR-2024-003',
      requester: '박민수',
      department: '조립팀',
      requestDate: '2024-01-17',
      dueDate: '2024-01-27',
      totalAmount: '₩350,000',
      status: 'waiting',
      items: [{ name: '볼트', quantity: '1000', unit: 'EA', price: '350' }],
    },
    {
      id: 'PR-2024-004',
      requester: '최지영',
      department: '용접팀',
      requestDate: '2024-01-18',
      dueDate: '2024-01-28',
      totalAmount: '₩750,000',
      status: 'rejected',
      items: [{ name: '용접봉', quantity: '50', unit: '박스', price: '15,000' }],
    },
  ]);

  const filteredRequests =
    selectedStatus === 'all'
      ? requests
      : requests.filter((request) => request.status === selectedStatus);

  // 페이지네이션 계산
  const totalPages = Math.ceil(filteredRequests.length / itemsPerPage);
  const startIndex = (currentPage - 1) * itemsPerPage;
  const endIndex = startIndex + itemsPerPage;
  const currentRequests = filteredRequests.slice(startIndex, endIndex);

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
    setSelectedStatus(status);
    setCurrentPage(1);
  };

  const handleApprove = (requestId: string): void => {
    setRequests(
      requests.map((request) =>
        request.id === requestId ? { ...request, status: 'approved' } : request,
      ),
    );
    alert('구매 요청이 승인되었습니다.');
  };

  const handleReject = (requestId: string): void => {
    setRequests(
      requests.map((request) =>
        request.id === requestId ? { ...request, status: 'rejected' } : request,
      ),
    );
    alert('구매 요청이 반려되었습니다.');
  };

  const handleViewDetail = (request: PurchaseRequestResult): void => {
    setSelectedRequest(request);
    setShowDetailModal(true);
  };

  return (
    <>
      <div className="bg-white rounded-lg border border-gray-200">
        {/* 필터 */}
        <div className="p-6 border-b border-gray-200">
          <div className="flex items-center justify-between">
            <h3 className="text-lg font-semibold text-gray-900">구매 요청 목록</h3>
            <div className="flex items-center space-x-4">
              <select
                value={selectedStatus}
                onChange={(e) => handleStatusChange(e.target.value)}
                className="px-3 py-2 border border-gray-300 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 pr-8"
              >
                <option value="all">전체 상태</option>
                <option value="waiting">대기</option>
                <option value="approved">승인</option>
                <option value="rejected">반려</option>
              </select>

              {/* 구매 요청 작성 버튼 */}
              <button
                onClick={() => setShowRequestModal(true)}
                className="px-4 py-2 bg-blue-600 text-white font-medium rounded-lg hover:bg-blue-700 transition-colors duration-200 cursor-pointer whitespace-nowrap flex items-center space-x-2"
              >
                <i className="ri-add-line"></i>
                <span>구매 요청 작성</span>
              </button>
            </div>
          </div>
        </div>

        {/* 구매 품목 목록 테이블 */}
        <div className="overflow-x-auto">
          <table className="w-full">
            {/* 테이블 헤더: 요청번호, 요청자, 요청일, 총금액, 상태, 작업 */}
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
            {/* 테이블 바디 */}
            <tbody className="bg-white divide-y divide-gray-200">
              {currentRequests.map((request) => (
                <tr key={request.id} className="hover:bg-gray-50 transition-colors duration-200">
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="text-sm font-medium text-gray-900">{request.id}</div>
                    <div className="text-sm text-gray-500">{request.department}</div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="text-sm font-medium text-gray-900">{request.requester}</div>
                    <div className="text-sm text-gray-500">납기: {request.dueDate}</div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                    {request.requestDate}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                    {request.totalAmount}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <span
                      className={`px-2 py-1 text-xs font-medium rounded-full ${getStatusColor(request.status)}`}
                    >
                      {getStatusText(request.status)}
                    </span>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                    <div className="flex items-center space-x-2">
                      {/* 상세보기(눈 아이콘) */}
                      <button
                        onClick={() => handleViewDetail(request)}
                        className="text-blue-600 hover:text-blue-900 cursor-pointer"
                        title="상세보기"
                      >
                        <i className="ri-eye-line"></i>
                      </button>
                      {request.status === 'pending' || request.status === 'waiting' ? (
                        <>
                          {/* 승인(체크 아이콘) */}
                          <button
                            onClick={() => handleApprove(request.id)}
                            className="text-green-600 hover:text-green-900 cursor-pointer"
                            title="승인"
                          >
                            <i className="ri-check-line"></i>
                          </button>
                          {/* 반려(x 아이콘) */}
                          <button
                            onClick={() => handleReject(request.id)}
                            className="text-red-600 hover:text-red-900 cursor-pointer"
                            title="반려"
                          >
                            <i className="ri-close-line"></i>
                          </button>
                        </>
                      ) : null}
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {/* 페이지네이션 */}
        <div className="px-6 py-4 border-t border-gray-200">
          <div className="flex items-center justify-between">
            <div className="text-sm text-gray-700">
              총 <span className="font-medium">{filteredRequests.length}</span>건 ({startIndex + 1}-
              {Math.min(endIndex, filteredRequests.length)} 표시)
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
        </div>
      </div>

      {/* 구매 요청 작성 모달 */}
      <PurchaseRequestModal isOpen={showRequestModal} onClose={() => setShowRequestModal(false)} />

      {/* 구매 요청 상세 정보 모달 */}
      <PurchaseRequestDetailModal
        isOpen={showDetailModal}
        request={selectedRequest}
        onClose={() => setShowDetailModal(false)}
      />
    </>
  );
}
