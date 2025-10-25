'use client';

import { useEffect, useMemo, useState } from 'react';
import { SHIPPING_TABLE_HEADERS } from '../../inventory.constants';
import { useQuery } from '@tanstack/react-query';
import { getProductionList, getReadyToShipList } from '../../inventory.api';
import { ManageMentCommonQueryParams } from '../../types/InventoryShippingListType';
import StatusLabel from '@/app/components/common/StatusLabel';
import Pagination from '@/app/components/common/Pagination';
const ShippingManagementList = () => {
  const [currentPage, setCurrentPage] = useState(1);
  const [selectedSubTab, setSelectedSubTab] = useState('producing');

  const queryParams = useMemo(
    () => ({
      page: currentPage - 1,
      size: 10,
    }),
    [currentPage],
  );
  const {
    data: ProductionRes,
    isLoading: isProductionLoading,
    isError: isProductionError,
  } = useQuery({
    queryKey: ['productionList', queryParams],
    queryFn: ({ queryKey }) => getProductionList(queryKey[1] as ManageMentCommonQueryParams),
  });

  const {
    data: ReadyToShipRes,
    isLoading: isReadyLoading,
    isError: isReadyError,
  } = useQuery({
    queryKey: ['readyToShipList', queryParams],
    queryFn: ({ queryKey }) => getReadyToShipList(queryKey[1] as ManageMentCommonQueryParams),
  });

  const isCurrentLoading = selectedSubTab === 'producing' ? isProductionLoading : isReadyLoading;
  const isCurrentError = selectedSubTab === 'producing' ? isProductionError : isReadyError;
  const currentRes = selectedSubTab === 'producing' ? ProductionRes : ReadyToShipRes;

  const currentData = currentRes?.data ?? [];
  const pageInfo = currentRes?.pageData;
  const totalPages = pageInfo?.totalPages ?? 1;

  const shippingStatusTabs = [
    { id: 'producing', name: '생산중', count: ProductionRes?.pageData.totalElements },
    { id: 'standBy', name: '출고 대기 완료', count: ReadyToShipRes?.pageData.totalElements },
  ];

  useEffect(() => {
    setCurrentPage(1);
  }, [selectedSubTab]);

  return (
    <div className="bg-white rounded-lg border border-gray-200 mt-6">
      <div className="p-6 border-b border-gray-200">
        <div className="flex items-center justify-between">
          <h2 className="text-lg font-semibold text-gray-900">출고 관리</h2>
        </div>
      </div>

      <div className="p-6">
        <div className="flex space-x-1 bg-gray-100 rounded-lg p-1 mb-6">
          {shippingStatusTabs.map((tab) => (
            <button
              key={tab.id}
              onClick={() => setSelectedSubTab(tab.id)}
              className={`flex-1 px-4 py-2 rounded-md text-sm font-medium transition-colors duration-200 cursor-pointer whitespace-nowrap ${
                selectedSubTab === tab.id
                  ? 'bg-white text-blue-600 shadow-sm'
                  : 'text-gray-600 hover:text-gray-900'
              }`}
            >
              {tab.name} ({tab.count})
            </button>
          ))}
        </div>

        <div className="overflow-x-auto">
          <table className="w-full">
            <thead className="bg-gray-50">
              <tr>
                {SHIPPING_TABLE_HEADERS.map((header) => (
                  <th
                    key={header}
                    className="py-3 px-4 text-xs font-medium text-gray-500 uppercase tracking-wider text-left"
                  >
                    {header}
                  </th>
                ))}
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {currentData.map((production) => (
                <tr key={production.salesOrderId} className="hover:bg-gray-50">
                  <td className="px-6 py-4 text-sm font-medium text-gray-900">
                    {production.salesOrderNumber}
                  </td>
                  <td className="px-6 py-4 text-sm text-gray-900">{production.customerName}</td>
                  <td className="px-6 py-4 text-sm text-gray-900">
                    {production.orderDate.slice(0, 10)}
                  </td>
                  <td className="px-6 py-4 text-sm text-gray-900">
                    {/* {production.dueDate.slice(0, 10)} */}
                  </td>
                  <td className="px-6 py-4 text-sm text-gray-900">
                    ₩{production.totalAmount.toLocaleString()}
                  </td>
                  <td className="px-6 py-4 text-sm text-gray-900">
                    <StatusLabel $statusCode={production.statusCode} />
                  </td>
                  <td className="px-6 py-4 text-sm text-gray-900">
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
        {/* 페이지네이션 */}
        {isCurrentError || isCurrentLoading ? null : (
          <Pagination
            currentPage={currentPage}
            totalPages={totalPages}
            totalElements={pageInfo?.totalElements}
            onPageChange={(page) => setCurrentPage(page)}
          />
        )}
      </div>
    </div>
  );
};

export default ShippingManagementList;
