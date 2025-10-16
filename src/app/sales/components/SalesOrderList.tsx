'use client';

import { useMemo, useState } from 'react';
import SalesOrderDetailModal from '@/app/sales/components/SalesOrderDetailModal';
import { Order, OrderQueryParams } from '@/app/sales/types/SalesOrderListType';
import { useQuery } from '@tanstack/react-query';
import { useDebounce } from 'use-debounce';
import { getOrderList } from '../service';

type statusType =
  | 'ALL'
  | 'MATERIAL_PREPARATION'
  | 'PRODUCTION'
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

  const queryParams = useMemo(
    () => ({
      start: startDate || '',
      end: endDate || '',
      page: 0,
      size: 10,
      keyword: debouncedSearchTerm || '',
      status: statusFilter || 'ALL',
    }),
    [startDate, endDate, statusFilter, debouncedSearchTerm],
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
      case 'PRODUCTION':
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
      case 'PRODUCTION':
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
            <option value="PRODUCTION">생산중</option>
            <option value="READY_FOR_SHIPMENT">출하 준비 완료</option>
            <option value="DELIVERING">배송중</option>
            <option value="DELIVERED">배송완료</option>
          </select>
        </div>
      </div>

      {/* 테이블 */}
      <div className="overflow-x-auto">
        {isError ? (
          <div className="flex flex-col items-center justify-center h-64 space-y-3 text-red-600">
            <i className="ri-error-warning-line text-4xl" />
            <p className="font-medium">고객 목록을 불러오는 중 오류가 발생했습니다.</p>
          </div>
        ) : isLoading ? (
          <div className="flex flex-col items-center justify-center h-64 space-y-3">
            <div className="w-10 h-10 border-4 border-blue-500 border-t-transparent rounded-full animate-spin" />
            <p className="text-gray-600 text-sm font-medium">고객 목록을 불러오는 중입니다...</p>
          </div>
        ) : (
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
              {orders.map((order) => (
                <tr key={order.id} className="hover:bg-gray-50 transition-colors duration-200">
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="text-sm font-medium text-gray-900">{order.soNumber}</div>
                  </td>
                  <td className="px-6 py-4">
                    <div className="text-sm font-medium text-gray-900">{order.customerName}</div>
                    <div className="text-sm text-gray-500">
                      {order.contactName} · {order.contactPhone}
                    </div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                    {order.orderDate}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                    {order.deliveryDate}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                    {order.totalAmount}
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
                      onClick={() => handleViewOrder(order.id)}
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
