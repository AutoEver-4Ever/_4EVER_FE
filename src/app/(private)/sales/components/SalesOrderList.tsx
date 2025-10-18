'use client';

import { useMemo, useState } from 'react';
import SalesOrderDetailModal from '@/app/(private)/sales/components/SalesOrderDetailModal';
import { Order, OrderQueryParams } from '@/app/(private)/sales/types/SalesOrderListType';
import { useQuery } from '@tanstack/react-query';
import { useDebounce } from 'use-debounce';
import { getOrderList } from '../service';
import TableStatusBox from '@/app/components/common/TableStatusBox';
import { ORDER_LIST_TABLE_HEADERS } from '@/app/(private)/sales/constant';

type statusType =
  | 'ALL'
  | 'MATERIAL_PREPARATION'
  | 'IN_PRODUCTION'
  | 'READY_FOR_SHIPMENT'
  | 'DELIVERING'
  | 'DELIVERED';

const SalesOrderList = () => {
  const [showOrderDetailModal, setShowOrderDetailModal] = useState(false);
  const [selectedOrderId, setSelectedOrderId] = useState<number>(0);
  const [searchTerm, setSearchTerm] = useState('');
  const [statusFilter, setStatusFilter] = useState<statusType>('ALL');

  const [startDate, setStartDate] = useState('');
  const [endDate, setEndDate] = useState('');
  const [debouncedSearchTerm] = useDebounce(searchTerm, 200);
  const [currentPage, setCurrentPage] = useState(1);

  const queryParams = useMemo(
    () => ({
      start: startDate || '',
      end: endDate || '',
      page: currentPage - 1,
      size: 10,
      keyword: debouncedSearchTerm || '',
      status: statusFilter || 'ALL',
    }),
    [startDate, endDate, currentPage, statusFilter, debouncedSearchTerm],
  );
  const {
    data: orderRes,
    isLoading,
    isError,
  } = useQuery({
    queryKey: ['orderList', queryParams],
    queryFn: ({ queryKey }) => getOrderList(queryKey[1] as OrderQueryParams),
  });

  const orders = orderRes?.data ?? [];
  const pageInfo = orderRes?.pageData;

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'IN_PRODUCTION':
        return 'bg-blue-100 text-blue-700';
      case 'MATERIAL_PREPARATION':
        return 'bg-green-100 text-green-700';
      case 'READY_FOR_SHIPMENT':
        return 'bg-yellow-100 text-yellow-700';
      case 'DELIVERING':
        return 'bg-purple-100 text-purple-700';
      case 'DELIVERED':
        return 'bg-gray-100 text-gray-700';
      default:
        return 'bg-gray-100 text-gray-700';
    }
  };

  const getStatusText = (status: string) => {
    switch (status) {
      case 'IN_PRODUCTION':
        return '생산중';
      case 'MATERIAL_PREPARATION':
        return '자재 준비중';
      case 'READY_FOR_SHIPMENT':
        return '출하 준비 완료';
      case 'DELIVERING':
        return '배송중';
      case 'DELIVERED':
        return '배송완료';

      default:
        return status;
    }
  };

  const handleViewOrder = (id: number) => {
    setSelectedOrderId(id);
    setShowOrderDetailModal(true);
  };

  const totalPages = pageInfo?.totalPages ?? 1;

  const maxVisible = 5;
  const getPageRange = () => {
    const pages: (number | string)[] = [];

    if (totalPages <= maxVisible) {
      for (let i = 1; i <= totalPages; i++) pages.push(i);
    } else {
      const start = Math.max(1, currentPage - 2);
      const end = Math.min(totalPages, start + maxVisible - 1);

      if (start > 1) {
        pages.push(1);
        if (start > 2) pages.push('...');
      }

      for (let i = start; i <= end; i++) pages.push(i);

      if (end < totalPages) {
        if (end < totalPages - 1) pages.push('...');
        pages.push(totalPages);
      }
    }
    return pages;
  };

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
                value={searchTerm}
                onChange={(e: React.ChangeEvent<HTMLInputElement>) => setSearchTerm(e.target.value)}
                placeholder="주문번호, 고객명, 담당자로 검색"
                className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>
          </div>

          {/* 상태 필터 */}
          <select
            value={statusFilter}
            onChange={(e: React.ChangeEvent<HTMLSelectElement>) =>
              setStatusFilter(e.target.value as statusType)
            }
            className="px-3 py-2 border border-gray-300 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 pr-8"
          >
            <option value="ALL">전체 상태</option>
            <option value="IN_PRODUCTION">생산중</option>
            <option value="READY_FOR_SHIPMENT">출하 준비 완료</option>
            <option value="DELIVERING">배송중</option>
            <option value="DELIVERED">배송완료</option>
          </select>
        </div>
      </div>

      {/* 테이블 */}
      <div className="overflow-x-auto">
        {isLoading ? (
          <TableStatusBox $type="loading" $message="주문 목록을 불러오는 중입니다..." />
        ) : isError ? (
          <TableStatusBox $type="error" $message="주문 목록을 불러오는 중 오류가 발생했습니다." />
        ) : !orders || orders.length === 0 ? (
          <TableStatusBox $type="empty" $message="등록된 주문서가 없습니다." />
        ) : (
          <table className="w-full">
            <thead className="bg-gray-50">
              <tr>
                {ORDER_LIST_TABLE_HEADERS.map((header) => (
                  <th
                    key={header}
                    className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                  >
                    {header}
                  </th>
                ))}
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {orders.map((order) => (
                <tr key={order.soId} className="hover:bg-gray-50 transition-colors duration-200">
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="text-sm font-medium text-gray-900">{order.soNumber}</div>
                  </td>
                  <td className="px-6 py-4">
                    <div className="text-sm font-medium text-gray-900">{order.customerName}</div>
                    <div className="text-sm text-gray-500">
                      {order.manager.managerName} · {order.manager.managerPhone}
                    </div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                    {order.orderDate}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                    {order.deliveryDate}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                    ₩{order.totalAmount.toLocaleString()}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <span
                      className={`px-2 py-1 text-xs font-medium rounded-full ${getStatusColor(
                        order.statusCode,
                      )}`}
                    >
                      {getStatusText(order.statusCode)}
                    </span>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                    <button
                      onClick={() => handleViewOrder(order.soId)}
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
        )}
      </div>
      {/* 페이지네이션 */}
      {isError || isLoading ? null : (
        <div className="px-6 py-4 border-t border-gray-200">
          <div className="flex items-center justify-between">
            <div className="text-sm text-gray-700">
              총 <span className="font-medium">{pageInfo?.totalElements}</span>명의 고객
            </div>

            <div className="flex justify-center items-center space-x-2 mt-6">
              <button
                disabled={currentPage === 1}
                onClick={() => setCurrentPage((prev) => prev - 1)}
                className={`px-3 py-1 border rounded-md text-sm transition-colors ${
                  currentPage === 1
                    ? 'bg-gray-100 text-gray-400 cursor-not-allowed border-gray-200'
                    : 'border-gray-300 text-gray-700 hover:bg-gray-50 cursor-pointer'
                }`}
              >
                이전
              </button>

              {getPageRange().map((p, index) =>
                p === '...' ? (
                  <span key={index} className="px-2 text-gray-400">
                    ...
                  </span>
                ) : (
                  <button
                    key={index}
                    onClick={() => setCurrentPage(p as number)}
                    className={`px-3 py-1 rounded-md text-sm ${
                      currentPage === p
                        ? 'bg-blue-600 text-white'
                        : 'border border-gray-300 text-gray-700 hover:bg-gray-50 cursor-pointer'
                    }`}
                  >
                    {p}
                  </button>
                ),
              )}

              <button
                disabled={currentPage === totalPages}
                onClick={() => setCurrentPage((prev) => prev + 1)}
                className={`px-3 py-1 border rounded-md text-sm transition-colors ${
                  currentPage === totalPages
                    ? 'bg-gray-100 text-gray-400 cursor-not-allowed border-gray-200'
                    : 'border-gray-300 text-gray-700 hover:bg-gray-50 cursor-pointer'
                }`}
              >
                다음
              </button>
            </div>
          </div>
        </div>
      )}

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
