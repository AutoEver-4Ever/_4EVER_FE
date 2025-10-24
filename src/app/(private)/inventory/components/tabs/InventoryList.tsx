'use client';

import { useMemo, useState } from 'react';
import { INVENTORY_TABLE_HEADERS } from '../../inventory.constants';
import Pagination from '@/app/components/common/Pagination';
import { useDebounce } from 'use-debounce';
import { useQuery } from '@tanstack/react-query';
import { InventoryQueryParams, InventoryResponse } from '../../types/InventoryListType';
import { getInventoryList } from '../../inventory.api';
import { Page } from '@/types/Page';
import StatusLabel from '@/app/components/common/StatusLabel';
import InventoryDetailModal from '../modals/InventoryDetailModal';
import InventoryMoveModal from '../modals/InventoryMoveModal';
import InventorySafetyModal from '../modals/InventorySafetyModal';

const InventoryList = () => {
  const [selectedItems, setSelectedItems] = useState<string[]>([]);
  const [showStockModal, setShowStockModal] = useState(false);
  const [showDetailModal, setShowDetailModal] = useState(false);
  const [selectedItemId, setSelectedItemId] = useState<string>('');
  const [category, setCategory] = useState('');
  const [warehouse, setWarehouse] = useState('');
  const [statusFilter, setStatusFilter] = useState('ALL');
  const [itemName, setItemName] = useState('');
  const [debouncedCategory] = useDebounce(category, 200);
  const [debouncedWarehouse] = useDebounce(warehouse, 200);
  const [debouncedItemName] = useDebounce(itemName, 200);

  const handleItemDetail = (itemId: string) => {
    setSelectedItemId(itemId);
    setShowDetailModal(true);
  };

  const [currentPage, setCurrentPage] = useState(1);

  const queryParams = useMemo(
    () => ({
      page: currentPage - 1,
      size: 10,
      category: debouncedCategory || '',
      warehouse: debouncedWarehouse || '',
      status: statusFilter || 'ALL',
      itemName: debouncedItemName || '',
    }),
    [currentPage, statusFilter, debouncedCategory, debouncedWarehouse, debouncedItemName],
  );

  const {
    data: InventoryRes,
    isLoading,
    isError,
  } = useQuery<{
    data: InventoryResponse[];
    pageData: Page;
  }>({
    queryKey: ['inventoryList', queryParams],
    queryFn: ({ queryKey }) => getInventoryList(queryKey[1] as InventoryQueryParams),
    staleTime: 1000,
  });

  const inventories = InventoryRes?.data || [];
  const pageInfo = InventoryRes?.pageData;
  const totalPages = pageInfo?.totalPages ?? 1;

  return (
    <div className="bg-white rounded-lg border border-gray-200 mt-6">
      <div className="p-6 border-b border-gray-200">
        <div className="flex items-center justify-between">
          <div className="flex items-center justify-between w-full">
            <h2 className="text-lg font-semibold text-gray-900">재고 목록</h2>
            <div className="flex items-center gap-4">
              <div className="flex gap-2"></div>
            </div>
          </div>
        </div>
      </div>
      <div className="overflow-x-auto">
        <table className="w-full">
          <thead className="bg-gray-50">
            <tr>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                <input
                  type="checkbox"
                  className="rounded border-gray-300 text-blue-600 focus:ring-blue-500"
                  // onChange={}
                />
              </th>
              {INVENTORY_TABLE_HEADERS.map((header) => (
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
            {inventories.map((inventory) => (
              <tr key={inventory.itemId} className="hover:bg-gray-50">
                <td className="px-6 py-4 whitespace-nowrap">
                  <input
                    type="checkbox"
                    className="rounded border-gray-300 text-blue-600 focus:ring-blue-500"
                    // checked={selectedItems.includes(item.id)}
                    // onChange={() => toggleSelectItem(item.id)}
                  />
                </td>
                <td className="px-6 py-4 whitespace-nowrap">
                  <div>
                    <div className="text-sm font-medium text-gray-900">{inventory.itemName}</div>
                    <div className="text-sm text-gray-500">{inventory.itemNumber}</div>
                  </div>
                </td>
                <td className="px-6 py-4 whitespace-nowrap">
                  <span className="px-2 py-1 text-xs font-medium bg-gray-100 text-gray-800 rounded-full">
                    {inventory.category}
                  </span>
                </td>
                <td className="px-6 py-4 whitespace-nowrap">
                  <div className="text-sm text-gray-900">
                    {inventory.currentStock.toLocaleString()} {inventory.uomName}
                  </div>
                </td>
                <td className="px-6 py-4 whitespace-nowrap">
                  <div className="text-sm text-gray-500">
                    {inventory.safetyStock.toLocaleString()} {inventory.uomName}
                  </div>
                </td>
                <td className="px-6 py-4 whitespace-nowrap">
                  <div className="text-sm text-gray-900">
                    ₩{inventory.unitPrice.toLocaleString()}
                  </div>
                </td>
                <td className="px-6 py-4 whitespace-nowrap">
                  <div className="text-sm font-medium text-gray-900">
                    ₩{inventory.totalAmount.toLocaleString()}
                  </div>
                </td>
                <td className="px-6 py-4 whitespace-nowrap">
                  <div className="text-sm text-gray-900">{inventory.warehouseName}</div>
                  <div className="text-sm text-gray-500">{inventory.warehouseType}</div>
                </td>
                <td className="px-6 py-4 whitespace-nowrap">
                  <StatusLabel $statusCode={inventory.statusCode} />
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                  <button
                    onClick={() => handleItemDetail(inventory.itemId)}
                    className="text-blue-600 hover:text-blue-900 cursor-pointer"
                  >
                    상세보기
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      {/* 페이지네이션 */}
      {isError || isLoading ? null : (
        <Pagination
          currentPage={currentPage}
          totalPages={totalPages}
          totalElements={pageInfo?.totalElements}
          onPageChange={(page) => setCurrentPage(page)}
        />
      )}
      {/* 재고 상세보기 모달 */}
      {showDetailModal && (
        <InventoryDetailModal
          $selectedItemId={selectedItemId}
          $setSelectedItemId={setSelectedItemId}
          $setShowDetailModal={setShowDetailModal}
        />
      )}
    </div>
  );
};

export default InventoryList;
