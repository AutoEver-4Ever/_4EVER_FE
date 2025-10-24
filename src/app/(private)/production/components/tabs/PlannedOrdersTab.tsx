'use client';
import { useState, useMemo } from 'react';
import Button from '@/app/components/common/Button';
import Dropdown from '@/app/components/common/Dropdown';
import { MRP_PLANNED_ORDER_STATUS_OPTIONS, MrpPlannedOrderStatus } from '../../constants';
import { useQuery } from '@tanstack/react-query';
import { fetchMrpPlannedOrdersList } from '../../api/production.api';
import {
  FetchMrpPlannedOrdersListParams,
  MrpPlannedOrdersListResponse,
} from '../../types/MrpPlannedOrdersListApiType';

export default function PlannedOrdersTab() {
  const [selectedOrders, setSelectedOrders] = useState<string[]>([]);
  const [selectedStatus, setSelectedStatus] = useState<MrpPlannedOrderStatus>('ALL');

  // 쿼리 파라미터 객체 생성
  const queryParams = useMemo<FetchMrpPlannedOrdersListParams>(
    () => ({
      status: selectedStatus,
    }),
    [selectedStatus],
  );

  // API 호출
  const {
    data: plannedOrdersResponse,
    isLoading,
    isError,
  } = useQuery<MrpPlannedOrdersListResponse>({
    queryKey: ['mrpPlannedOrders', queryParams],
    queryFn: ({ queryKey }) =>
      fetchMrpPlannedOrdersList(queryKey[1] as FetchMrpPlannedOrdersListParams),
    staleTime: 1000,
  });

  // content 배열 추출
  const plannedOrders = plannedOrdersResponse?.content || [];

  const handleSelectAllOrders = () => {
    if (selectedOrders.length === plannedOrders.length) {
      setSelectedOrders([]);
    } else {
      setSelectedOrders(plannedOrders.map((order) => order.mrpId));
    }
  };

  const handleOrderSelection = (mrpId: string) => {
    setSelectedOrders((prev) =>
      prev.includes(mrpId) ? prev.filter((id) => id !== mrpId) : [...prev, mrpId],
    );
  };

  const handlePurchaseRequest = () => {
    console.log('자재 구매 요청:', selectedOrders);
    alert(`${selectedOrders.length}개 항목을 자재 구매 요청합니다.`);
    // 실제 로직 구현
  };

  const getOrderStatusBadge = (statusCode: string) => {
    const statusConfig: Record<string, { bg: string; text: string; label: string }> = {
      WAITING: { bg: 'bg-gray-100', text: 'text-gray-800', label: '대기' },
      IN_PROGRESS: { bg: 'bg-blue-100', text: 'text-blue-800', label: '진행중' },
      COMPLETED: { bg: 'bg-green-100', text: 'text-green-800', label: '완료' },
      CANCELLED: { bg: 'bg-red-100', text: 'text-red-800', label: '취소' },
    };
    const config = statusConfig[statusCode] || statusConfig['WAITING'];
    return (
      <span
        className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${config.bg} ${config.text}`}
      >
        {config.label}
      </span>
    );
  };

  return (
    <div className="bg-white border border-gray-200 rounded-lg overflow-hidden">
      <div className="p-4 border-b border-gray-200 flex items-center justify-between">
        <h4 className="text-md font-semibold text-gray-900">
          계획 주문 - 무엇을 언제 발주 지시할까?
        </h4>
        <div className="flex items-center gap-3">
          <Dropdown
            items={MRP_PLANNED_ORDER_STATUS_OPTIONS}
            value={selectedStatus}
            onChange={(status: MrpPlannedOrderStatus) => {
              setSelectedStatus(status);
            }}
          />
          <Button
            label="자재 구매 요청"
            onClick={handlePurchaseRequest}
            disabled={selectedOrders.length === 0}
          />
        </div>
      </div>

      {isLoading ? (
        <div className="text-center py-12">
          <i className="ri-loader-4-line animate-spin text-3xl text-gray-400"></i>
          <p className="mt-3 text-gray-500">로딩 중...</p>
        </div>
      ) : isError ? (
        <div className="text-center py-12">
          <i className="ri-error-warning-line text-3xl text-red-400"></i>
          <p className="mt-3 text-red-500">데이터를 불러오는데 실패했습니다.</p>
        </div>
      ) : plannedOrders.length === 0 ? (
        <div className="text-center py-12 text-gray-500">조회된 계획 주문이 없습니다.</div>
      ) : (
        <div className="overflow-x-auto">
          <table className="min-w-full divide-y divide-gray-200">
            <thead className="bg-gray-50">
              <tr>
                <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  <input
                    type="checkbox"
                    checked={selectedOrders.length === plannedOrders.length}
                    onChange={handleSelectAllOrders}
                    className="rounded border-gray-300 text-purple-600 focus:ring-purple-500 cursor-pointer"
                  />
                </th>
                <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  참조 견적서
                </th>
                <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  자재
                </th>
                <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  수량
                </th>
                <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  조달 시작일
                </th>
                <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  상태
                </th>
                <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  작업
                </th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {plannedOrders.map((order) => (
                <tr key={order.mrpId} className="hover:bg-gray-50">
                  <td className="px-4 py-3">
                    <input
                      type="checkbox"
                      checked={selectedOrders.includes(order.mrpId)}
                      onChange={() => handleOrderSelection(order.mrpId)}
                      className="rounded border-gray-300 text-purple-600 focus:ring-purple-500 cursor-pointer"
                    />
                  </td>
                  <td className="px-4 py-3 text-sm font-medium text-blue-600">
                    {order.quotationNumber}
                  </td>
                  <td className="px-4 py-3 text-sm text-gray-900">{order.itemName}</td>
                  <td className="px-4 py-3 text-sm text-gray-900">
                    {order.quantity.toLocaleString()}
                  </td>
                  <td className="px-4 py-3 text-sm text-gray-900">{order.procurementStartDate}</td>
                  <td className="px-4 py-3">{getOrderStatusBadge(order.statusCode)}</td>
                  <td className="px-4 py-3">
                    <button
                      className="text-blue-600 hover:text-blue-800 cursor-pointer"
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
      )}
    </div>
  );
}
