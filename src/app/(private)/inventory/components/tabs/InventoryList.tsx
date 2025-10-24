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

const InventoryList = () => {
  const [selectedItems, setSelectedItems] = useState<string[]>([]);
  const [showStockModal, setShowStockModal] = useState(false);
  const [showMoveModal, setShowMoveModal] = useState(false);
  const [showDetailModal, setShowDetailModal] = useState(false);
  const [selectedItem, setSelectedItem] = useState<any>(null);
  const [showExportDropdown, setShowExportDropdown] = useState(false);
  const [showAllItems, setShowAllItems] = useState(false);
  const [showSafetyStockModal, setShowSafetyStockModal] = useState(false);
  const [category, setCategory] = useState('');
  const [warehouse, setWarehouse] = useState('');
  const [statusFilter, setStatusFilter] = useState('ALL');
  const [itemName, setItemName] = useState('');
  const [debouncedCategory] = useDebounce(category, 200);
  const [debouncedWarehouse] = useDebounce(warehouse, 200);
  const [debouncedItemName] = useDebounce(itemName, 200);

  const handleItemDetail = (item: any) => {
    setSelectedItem(item);
    setShowDetailModal(true);
  };

  const handleStockMove = (item: any) => {
    setSelectedItem(item);
    setShowMoveModal(true);
  };

  const handleSafetyStockEdit = (item: any) => {
    setSelectedItem(item);
    setShowSafetyStockModal(true);
  };

  const toggleSelectItem = (itemId: string) => {
    setSelectedItems((prev) =>
      prev.includes(itemId) ? prev.filter((id) => id !== itemId) : [...prev, itemId],
    );
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

      {/* 안전재고 수정 모달 */}
      {showSafetyStockModal && selectedItem && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white rounded-lg p-6 w-full max-w-md mx-4">
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-lg font-semibold">안전 재고 수정</h3>
              <button
                onClick={() => setShowSafetyStockModal(false)}
                className="text-gray-400 hover:text-gray-600 cursor-pointer"
              >
                <i className="ri-close-line text-xl"></i>
              </button>
            </div>

            <div className="mb-4 p-3 bg-gray-50 rounded-lg">
              <div className="text-sm font-medium text-gray-900">{selectedItem.name}</div>
              <div className="text-sm text-gray-500">{selectedItem.code}</div>
              <div className="text-sm text-gray-600 mt-1">
                현재 안전재고: {selectedItem.safetyStock} {selectedItem.unit}
              </div>
            </div>

            <form className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  새 안전재고 수량
                </label>
                <input
                  type="number"
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent text-sm"
                  placeholder="안전재고 수량"
                  defaultValue={selectedItem.safetyStock}
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">수정 사유</label>
                <textarea
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent text-sm"
                  rows={3}
                  placeholder="수정 사유를 입력하세요"
                ></textarea>
              </div>

              <div className="flex gap-3 pt-4">
                <button
                  type="button"
                  onClick={() => setShowSafetyStockModal(false)}
                  className="flex-1 px-4 py-2 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 transition-colors text-sm font-medium cursor-pointer"
                >
                  취소
                </button>
                <button
                  type="submit"
                  className="flex-1 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors text-sm font-medium cursor-pointer"
                >
                  수정
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* 재고 이동 모달 */}
      {showMoveModal && selectedItem && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white rounded-lg p-6 w-full max-w-md mx-4">
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-lg font-semibold">재고 이동</h3>
              <button
                onClick={() => setShowMoveModal(false)}
                className="text-gray-400 hover:text-gray-600 cursor-pointer"
              >
                <i className="ri-close-line text-xl"></i>
              </button>
            </div>

            <div className="mb-4 p-3 bg-gray-50 rounded-lg">
              <div className="text-sm font-medium text-gray-900">{selectedItem.name}</div>
              <div className="text-sm text-gray-500">{selectedItem.code}</div>
              <div className="text-sm text-gray-600 mt-1">
                현재 위치: {selectedItem.warehouse} ({selectedItem.location})
              </div>
              <div className="text-sm text-gray-600">
                현재 재고: {selectedItem.currentStock} {selectedItem.unit}
              </div>
            </div>

            <form className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">이동할 창고</label>
                <select className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent text-sm pr-8">
                  <option value="">창고를 선택하세요</option>
                  {/* {warehouses.map((warehouse) => (
                    <option key={warehouse.id} value={warehouse.id}>
                      {warehouse.name} ({warehouse.type})
                    </option>
                  ))} */}
                </select>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">이동할 위치</label>
                <input
                  type="text"
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent text-sm"
                  placeholder="예: A-01-01"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">이동 수량</label>
                <input
                  type="number"
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent text-sm"
                  placeholder="이동할 수량을 입력하세요"
                  max={selectedItem.currentStock}
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">이동 사유</label>
                <textarea
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent text-sm"
                  rows={3}
                  placeholder="이동 사유를 입력하세요"
                ></textarea>
              </div>

              <div className="flex gap-3 pt-4">
                <button
                  type="button"
                  onClick={() => setShowMoveModal(false)}
                  className="flex-1 px-4 py-2 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 transition-colors text-sm font-medium cursor-pointer"
                >
                  취소
                </button>
                <button
                  type="submit"
                  className="flex-1 px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 transition-colors text-sm font-medium cursor-pointer"
                >
                  이동
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* 재고 상세보기 모달 */}
      {showDetailModal && selectedItem && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white rounded-lg p-6 w-full max-w-4xl mx-4 max-h-[90vh] overflow-y-auto">
            <div className="flex items-center justify-between mb-6">
              <h3 className="text-xl font-semibold">재고 상세 정보</h3>
              <button
                onClick={() => setShowDetailModal(false)}
                className="text-gray-400 hover:text-gray-600 cursor-pointer"
              >
                <i className="ri-close-line text-xl"></i>
              </button>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              {/* 기본 정보 */}
              <div className="space-y-6">
                <div className="bg-gray-50 p-4 rounded-lg">
                  <h4 className="text-lg font-semibold text-gray-900 mb-3">기본 정보</h4>
                  <div className="space-y-3">
                    <div className="flex justify-between">
                      <span className="text-sm text-gray-600">품목명:</span>
                      <span className="text-sm font-medium text-gray-900">{selectedItem.name}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-sm text-gray-600">품목코드:</span>
                      <span className="text-sm font-medium text-gray-900">{selectedItem.code}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-sm text-gray-600">카테고리:</span>
                      <span className="text-sm font-medium text-gray-900">
                        {selectedItem.category}
                      </span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-sm text-gray-600">공급업체:</span>
                      <span className="text-sm font-medium text-gray-900">
                        {selectedItem.supplier}
                      </span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-sm text-gray-600">상태:</span>
                      {/* <StatusLabel $statusCode={inventory.statusCode} /> */}
                    </div>
                  </div>
                </div>

                <div className="bg-blue-50 p-4 rounded-lg">
                  <h4 className="text-lg font-semibold text-gray-900 mb-3">재고 정보</h4>
                  <div className="space-y-3">
                    <div className="flex justify-between">
                      <span className="text-sm text-gray-600">현재 재고:</span>
                      <span className="text-sm font-medium text-blue-600">
                        {selectedItem.currentStock} {selectedItem.unit}
                      </span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-sm text-gray-600">안전 재고:</span>
                      <span className="text-sm font-medium text-gray-900">
                        {selectedItem.safetyStock} {selectedItem.unit}
                      </span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-sm text-gray-600">단가:</span>
                      <span className="text-sm font-medium text-gray-900">
                        ₩{selectedItem.unitPrice.toLocaleString()}
                      </span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-sm text-gray-600">총 가치:</span>
                      <span className="text-sm font-medium text-green-600">
                        ₩{selectedItem.totalValue.toLocaleString()}
                      </span>
                    </div>
                  </div>
                </div>

                <div className="bg-green-50 p-4 rounded-lg">
                  <h4 className="text-lg font-semibold text-gray-900 mb-3">위치 정보</h4>
                  <div className="space-y-3">
                    <div className="flex justify-between">
                      <span className="text-sm text-gray-600">창고:</span>
                      <span className="text-sm font-medium text-gray-900">
                        {selectedItem.warehouse}
                      </span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-sm text-gray-600">위치:</span>
                      <span className="text-sm font-medium text-gray-900">
                        {selectedItem.location}
                      </span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-sm text-gray-600">최종 수정:</span>
                      <span className="text-sm font-medium text-gray-900">
                        {selectedItem.lastUpdated}
                      </span>
                    </div>
                  </div>
                </div>
              </div>

              {/* 재고 이동 기록 */}
              <div>
                <div className="bg-white border border-gray-200 rounded-lg">
                  <div className="p-4 border-b border-gray-200">
                    <h4 className="text-lg font-semibold text-gray-900">재고 이동 기록</h4>
                  </div>
                  <div className="p-4">
                    <div className="space-y-4">
                      {/* {stockMovements
                        .filter((movement) => movement.itemId === selectedItem.id)
                        .map((movement) => (
                          <div
                            key={movement.id}
                            className="flex items-start gap-3 p-3 bg-gray-50 rounded-lg"
                          >
                            <div
                              className={`w-8 h-8 rounded-full flex items-center justify-center ${getMovementColor(movement.type)}`}
                            >
                              <i className={`${getMovementIcon(movement.type)} text-sm`}></i>
                            </div>

                            <div className="flex-1">
                              <div className="flex items-center gap-2 mb-1">
                                <span
                                  className={`px-2 py-1 text-xs font-medium rounded-full ${getMovementColor(movement.type)}`}
                                >
                                  {getMovementLabel(movement.type)}
                                </span>
                                <span className="text-sm font-medium text-gray-900">
                                  {movement.quantity} {selectedItem.unit}
                                </span>
                              </div>

                              {movement.type === 'transfer' && (
                                <div className="text-sm text-gray-600 mb-1">
                                  {movement.fromWarehouse} ({movement.fromLocation}) →{' '}
                                  {movement.toWarehouse} ({movement.toLocation})
                                </div>
                              )}

                              {movement.type === 'in' && (
                                <div className="text-sm text-gray-600 mb-1">
                                  → {movement.toWarehouse} ({movement.toLocation})
                                </div>
                              )}

                              {movement.type === 'out' && (
                                <div className="text-sm text-gray-600 mb-1">
                                  {movement.fromWarehouse} ({movement.fromLocation}) →
                                </div>
                              )}

                              <div className="text-xs text-gray-500">
                                {movement.date} {movement.time} · {movement.user}
                              </div>
                              <div className="text-xs text-blue-600">
                                {movement.reference} · {movement.reason}
                              </div>
                              {movement.notes && (
                                <div className="text-xs text-gray-500 mt-1">{movement.notes}</div>
                              )}
                            </div>
                          </div>
                        ))} */}
                    </div>
                  </div>
                </div>

                <div className="mt-6 flex gap-3">
                  <button
                    onClick={() => {
                      setShowDetailModal(false);
                      handleStockMove(selectedItem);
                    }}
                    className="flex-1 px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 transition-colors text-sm font-medium cursor-pointer"
                  >
                    <i className="ri-arrow-left-right-line mr-1"></i>
                    재고 이동
                  </button>
                  <button
                    onClick={() => {
                      setShowDetailModal(false);
                      handleSafetyStockEdit(selectedItem);
                    }}
                    className="flex-1 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors text-sm font-medium cursor-pointer"
                  >
                    <i className="ri-edit-line mr-1"></i>
                    안전 재고 수정
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default InventoryList;
