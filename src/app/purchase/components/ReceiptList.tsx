'use client';

import { useState } from 'react';
import Link from 'next/link';

export default function ReceiptList() {
  const [selectedStatus, setSelectedStatus] = useState('all');
  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage] = useState(5);

  const receipts = [
    {
      id: 'GRN-2024-001',
      poNumber: 'PO-2024-001',
      supplier: '대한철강',
      item: '강판 300EA',
      orderedQty: 500,
      receivedQty: 300,
      receiptDate: '2024-01-20',
      inspector: '김검수',
      status: 'partial',
      quality: 'passed',
    },
    {
      id: 'GRN-2024-002',
      poNumber: 'PO-2024-002',
      supplier: '한국알루미늄',
      item: '알루미늄 200EA',
      orderedQty: 200,
      receivedQty: 200,
      receiptDate: '2024-01-21',
      inspector: '이검수',
      status: 'completed',
      quality: 'passed',
    },
    {
      id: 'GRN-2024-003',
      poNumber: 'PO-2024-003',
      supplier: '부품공급사',
      item: '볼트 800EA',
      orderedQty: 1000,
      receivedQty: 800,
      receiptDate: '2024-01-22',
      inspector: '박검수',
      status: 'partial',
      quality: 'failed',
    },
    {
      id: 'GRN-2024-004',
      poNumber: 'PO-2024-004',
      supplier: '용접자재',
      item: '용접봉 50박스',
      orderedQty: 50,
      receivedQty: 0,
      receiptDate: null,
      inspector: null,
      status: 'pending',
      quality: null,
    },
    {
      id: 'GRN-2024-005',
      poNumber: 'PO-2024-005',
      supplier: '포스코',
      item: '스틸 250EA',
      orderedQty: 300,
      receivedQty: 250,
      receiptDate: '2024-01-23',
      inspector: '최검수',
      status: 'partial',
      quality: 'passed',
    },
    {
      id: 'GRN-2024-006',
      poNumber: 'PO-2024-006',
      supplier: '현대제철',
      item: '철근 400EA',
      orderedQty: 400,
      receivedQty: 400,
      receiptDate: '2024-01-24',
      inspector: '정검수',
      status: 'completed',
      quality: 'passed',
    },
  ];

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'completed':
        return 'bg-green-100 text-green-700';
      case 'partial':
        return 'bg-yellow-100 text-yellow-700';
      case 'pending':
        return 'bg-gray-100 text-gray-700';
      default:
        return 'bg-gray-100 text-gray-700';
    }
  };

  const getStatusText = (status: string) => {
    switch (status) {
      case 'completed':
        return '입고완료';
      case 'partial':
        return '부분입고';
      case 'pending':
        return '입고대기';
      default:
        return status;
    }
  };

  const getQualityColor = (quality: string | null) => {
    switch (quality) {
      case 'passed':
        return 'bg-green-100 text-green-700';
      case 'failed':
        return 'bg-red-100 text-red-700';
      default:
        return 'bg-gray-100 text-gray-700';
    }
  };

  const getQualityText = (quality: string | null) => {
    switch (quality) {
      case 'passed':
        return '합격';
      case 'failed':
        return '불합격';
      default:
        return '미검사';
    }
  };

  const filteredReceipts =
    selectedStatus === 'all'
      ? receipts
      : receipts.filter((receipt) => receipt.status === selectedStatus);

  // 페이지네이션 계산
  const totalPages = Math.ceil(filteredReceipts.length / itemsPerPage);
  const startIndex = (currentPage - 1) * itemsPerPage;
  const endIndex = startIndex + itemsPerPage;
  const currentReceipts = filteredReceipts.slice(startIndex, endIndex);

  const handlePageChange = (page: number) => {
    setCurrentPage(page);
  };

  const handlePrevPage = () => {
    if (currentPage > 1) {
      setCurrentPage(currentPage - 1);
    }
  };

  const handleNextPage = () => {
    if (currentPage < totalPages) {
      setCurrentPage(currentPage + 1);
    }
  };

  // 필터 변경 시 첫 페이지로 이동
  const handleStatusChange = (status: string) => {
    setSelectedStatus(status);
    setCurrentPage(1);
  };

  return (
    <div className="bg-white rounded-lg border border-gray-200">
      {/* 필터 */}
      <div className="p-6 border-b border-gray-200">
        <div className="flex items-center justify-between">
          <h3 className="text-lg font-semibold text-gray-900">입고 관리 목록</h3>
          <div className="flex items-center space-x-4">
            <select
              value={selectedStatus}
              onChange={(e) => handleStatusChange(e.target.value)}
              className="px-3 py-2 border border-gray-300 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 pr-8"
            >
              <option value="all">전체 상태</option>
              <option value="pending">입고대기</option>
              <option value="partial">부분입고</option>
              <option value="completed">입고완료</option>
            </select>
            <Link
              href="/purchase/receipt/new"
              className="px-4 py-2 bg-blue-600 text-white font-medium rounded-lg hover:bg-blue-700 transition-colors duration-200 cursor-pointer whitespace-nowrap flex items-center space-x-2"
            >
              <i className="ri-add-line"></i>
              <span>입고 처리</span>
            </Link>
          </div>
        </div>
      </div>

      {/* 테이블 */}
      <div className="overflow-x-auto">
        <table className="w-full">
          <thead className="bg-gray-50">
            <tr>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                입고번호
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                발주번호
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                공급업체
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                품목
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                수량
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                입고일
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                검수자
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                상태
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                품질검사
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                작업
              </th>
            </tr>
          </thead>
          <tbody className="bg-white divide-y divide-gray-200">
            {currentReceipts.map((receipt) => (
              <tr key={receipt.id} className="hover:bg-gray-50 transition-colors duration-200">
                <td className="px-6 py-4 whitespace-nowrap">
                  <div className="text-sm font-medium text-gray-900">{receipt.id}</div>
                </td>
                <td className="px-6 py-4 whitespace-nowrap">
                  <Link
                    href={`/purchase/order/${receipt.poNumber}`}
                    className="text-sm text-blue-600 hover:text-blue-900 cursor-pointer"
                  >
                    {receipt.poNumber}
                  </Link>
                </td>
                <td className="px-6 py-4 whitespace-nowrap">
                  <div className="text-sm font-medium text-gray-900">{receipt.supplier}</div>
                </td>
                <td className="px-6 py-4">
                  <div className="text-sm font-medium text-gray-900">{receipt.item}</div>
                </td>
                <td className="px-6 py-4 whitespace-nowrap">
                  <div className="text-sm text-gray-900">
                    <span className="font-medium">{receipt.receivedQty}</span>
                    <span className="text-gray-500"> / {receipt.orderedQty}</span>
                  </div>
                  <div className="text-xs text-gray-500">
                    {Math.round((receipt.receivedQty / receipt.orderedQty) * 100)}% 입고
                  </div>
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                  {receipt.receiptDate || '-'}
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                  {receipt.inspector || '-'}
                </td>
                <td className="px-6 py-4 whitespace-nowrap">
                  <span
                    className={`px-2 py-1 text-xs font-medium rounded-full ${getStatusColor(receipt.status)}`}
                  >
                    {getStatusText(receipt.status)}
                  </span>
                </td>
                <td className="px-6 py-4 whitespace-nowrap">
                  <span
                    className={`px-2 py-1 text-xs font-medium rounded-full ${getQualityColor(receipt.quality)}`}
                  >
                    {getQualityText(receipt.quality)}
                  </span>
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                  <div className="flex items-center space-x-2">
                    <Link
                      href={`/purchase/receipt/${receipt.id}`}
                      className="text-blue-600 hover:text-blue-900 cursor-pointer"
                    >
                      보기
                    </Link>
                    {receipt.status === 'pending' && (
                      <>
                        <span className="text-gray-300">|</span>
                        <Link
                          href={`/purchase/receipt/${receipt.id}/process`}
                          className="text-green-600 hover:text-green-900 cursor-pointer"
                        >
                          입고처리
                        </Link>
                      </>
                    )}
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
            총 <span className="font-medium">{filteredReceipts.length}</span>건 ({startIndex + 1}-
            {Math.min(endIndex, filteredReceipts.length)} 표시)
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

            {/* 페이지 번호 버튼들 */}
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
  );
}
