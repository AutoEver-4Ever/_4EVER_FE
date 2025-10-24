'use client';

import { useEffect, useState } from 'react';
import InventoryMoveModal from './InventoryMoveModal';
import InventorySafetyModal from './InventorySafetyModal';
import {
  InventoryDetailModalProps,
  InventoryDetailResponse,
} from '../../types/InventoryDetailType';
import { useQuery } from '@tanstack/react-query';
import { getInventoryDetail } from '../../inventory.api';
import ModalStatusBox from '@/app/components/common/ModalStatusBox';
import StatusLabel from '@/app/components/common/StatusLabel';
import { getMovementColor, getMovementIcon } from '../../inventory.utils';

const InventoryDetailModal = ({
  $selectedItemId,
  $setSelectedItemId,
  $setShowDetailModal,
}: InventoryDetailModalProps) => {
  const [showMoveModal, setShowMoveModal] = useState(false);
  const [showSafetyStockModal, setShowSafetyStockModal] = useState(false);
  const [selectedStock, setSelectedStock] = useState({
    itemName: '',
    itemNumber: '',
    warehouseName: '',
    warehouseNumber: '',
    currentStock: 0,
    uomName: '',
  });

  const handleStockMove = (itemId: string) => {
    $setSelectedItemId(itemId);
    setSelectedStock({
      itemName: inventoryDetailRes?.itemName || '',
      itemNumber: inventoryDetailRes?.itemNumber || '',
      warehouseName: inventoryDetailRes?.warehouseName || '',
      warehouseNumber: inventoryDetailRes?.warehouseNumber || '',
      currentStock: inventoryDetailRes?.currentStock || 0,
      uomName: inventoryDetailRes?.uomName || '',
    });
    setShowMoveModal(true);
  };

  const {
    data: inventoryDetailRes,
    isLoading,
    isError,
  } = useQuery<InventoryDetailResponse>({
    queryKey: ['customerDetail', $selectedItemId],
    queryFn: () => getInventoryDetail($selectedItemId),
    enabled: !!$selectedItemId,
  });
  const [errorModal, setErrorModal] = useState(false);
  useEffect(() => {
    setErrorModal(isError);
  }, [isError]);

  if (isLoading)
    return <ModalStatusBox $type="loading" $message="재고 상세 데이터를 불러오는 중입니다..." />;

  if (errorModal)
    return (
      <ModalStatusBox
        $type="error"
        $message="재고 상세 데이터를 불러오는 중 오류가 발생했습니다."
        $onClose={() => setErrorModal(false)}
      />
    );

  const handleSafetyStockEdit = (itemId: string) => {
    $setSelectedItemId(itemId);
    setShowSafetyStockModal(true);
  };

  const formatDateTime = (iso: string) => {
    const d = new Date(iso);
    const [y, m, day] = [d.getFullYear(), d.getMonth() + 1, d.getDate()].map((v, i) =>
      i === 1 || i === 2 ? String(v).padStart(2, '0') : v,
    );
    const h = d.getHours();
    const period = h >= 12 ? '오후' : '오전';
    return `${y}-${m}-${day} ${period} ${h % 12 || 12}:${String(d.getMinutes()).padStart(2, '0')}`;
  };
  return (
    <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50">
      <div className="bg-white rounded-lg p-6 w-full max-w-4xl mx-4 max-h-[90vh] overflow-y-auto">
        <div className="flex items-center justify-between mb-6">
          <h3 className="text-xl font-semibold">재고 상세 정보</h3>
          <button
            onClick={() => $setShowDetailModal(false)}
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
                  <span className="text-sm font-medium text-gray-900">
                    {inventoryDetailRes?.itemName}
                  </span>
                </div>
                <div className="flex justify-between">
                  <span className="text-sm text-gray-600">품목코드:</span>
                  <span className="text-sm font-medium text-gray-900">
                    {inventoryDetailRes?.itemNumber}
                  </span>
                </div>
                <div className="flex justify-between">
                  <span className="text-sm text-gray-600">카테고리:</span>
                  <span className="text-sm font-medium text-gray-900">
                    {inventoryDetailRes?.category}
                  </span>
                </div>
                <div className="flex justify-between">
                  <span className="text-sm text-gray-600">공급업체:</span>
                  <span className="text-sm font-medium text-gray-900">
                    {inventoryDetailRes?.supplierCompanyName}
                  </span>
                </div>
                <div className="flex justify-between">
                  <span className="text-sm text-gray-600">상태:</span>
                  <StatusLabel $statusCode={inventoryDetailRes?.statusCode || ''} />
                </div>
              </div>
            </div>

            <div className="bg-blue-50 p-4 rounded-lg">
              <h4 className="text-lg font-semibold text-gray-900 mb-3">재고 정보</h4>
              <div className="space-y-3">
                <div className="flex justify-between">
                  <span className="text-sm text-gray-600">현재 재고:</span>
                  <span className="text-sm font-medium text-blue-600">
                    {inventoryDetailRes?.currentStock} {inventoryDetailRes?.uomName}
                  </span>
                </div>
                <div className="flex justify-between">
                  <span className="text-sm text-gray-600">안전 재고:</span>
                  <span className="text-sm font-medium text-gray-900">
                    {/* {inventoryDetailRes?.safetyStock} {inventoryDetailRes?.unit} */}
                  </span>
                </div>
                <div className="flex justify-between">
                  <span className="text-sm text-gray-600">단가:</span>
                  <span className="text-sm font-medium text-gray-900">
                    ₩{inventoryDetailRes?.unitPrice.toLocaleString()}
                  </span>
                </div>
                <div className="flex justify-between">
                  <span className="text-sm text-gray-600">총 가치:</span>
                  <span className="text-sm font-medium text-green-600">
                    ₩{inventoryDetailRes?.totalAmount.toLocaleString()}
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
                    {inventoryDetailRes?.warehouseName}
                  </span>
                </div>
                <div className="flex justify-between">
                  <span className="text-sm text-gray-600">위치:</span>
                  <span className="text-sm font-medium text-gray-900">
                    {inventoryDetailRes?.warehouseNumber}
                  </span>
                </div>
                <div className="flex justify-between">
                  <span className="text-sm text-gray-600">최종 수정:</span>
                  <span className="text-sm font-medium text-gray-900">
                    {inventoryDetailRes?.lastModified.slice(0, 10) ?? ''}
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
                  {inventoryDetailRes?.stockMovements.map((movement) => (
                    <div
                      key={movement.referenceNumber}
                      className="flex items-start gap-3 p-3 bg-gray-50 rounded-lg"
                    >
                      <div
                        className={`w-8 h-8 rounded-full flex items-center justify-center ${getMovementColor(movement.type)}`}
                      >
                        <i className={`${getMovementIcon(movement.type)} text-sm`}></i>
                      </div>

                      <div className="flex-1">
                        <div className="flex items-center gap-2 mb-1">
                          <StatusLabel $statusCode={movement.type} />
                          <span className="text-sm font-medium text-gray-900">
                            {movement.quantity} {movement.uomName}
                          </span>
                        </div>

                        {movement.type === '이동' && (
                          <div className="text-sm text-gray-600 mb-1">
                            {movement.from} → {movement.to}
                          </div>
                        )}

                        {movement.type === '입고' && (
                          <div className="text-sm text-gray-600 mb-1">→ {movement.to}</div>
                        )}

                        {movement.type === '출고' && (
                          <div className="text-sm text-gray-600 mb-1">{movement.from} →</div>
                        )}

                        <div className="text-xs text-gray-500">
                          {movement.movementDate.replace('T', ' ').slice(0, 16)} ·{' '}
                          {movement.managerName}
                        </div>
                        <div className="text-xs text-blue-600">
                          {movement.referenceNumber} · {movement.note}
                        </div>
                        {/* {movement.note && ( */}
                        <div className="text-xs text-gray-500 mt-1">{movement.note}</div>
                        {/* )} */}
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>

            <div className="mt-6 flex gap-3">
              <button
                onClick={() => {
                  //   $setShowDetailModal(false);
                  handleStockMove(inventoryDetailRes?.itemId ?? '');
                }}
                className="flex-1 px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 transition-colors text-sm font-medium cursor-pointer"
              >
                <i className="ri-arrow-left-right-line mr-1"></i>
                재고 이동
              </button>
              <button
                onClick={() => {
                  $setShowDetailModal(false);
                  //   handleSafetyStockEdit(selectedItem);
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
      {/* 재고 이동 모달 */}
      {showMoveModal && (
        <InventoryMoveModal $setShowMoveModal={setShowMoveModal} $selectedStock={selectedStock} />
      )}
      {/* 안전재고 수정 모달 */}
      {showSafetyStockModal && <InventorySafetyModal />}
    </div>
  );
};

export default InventoryDetailModal;
