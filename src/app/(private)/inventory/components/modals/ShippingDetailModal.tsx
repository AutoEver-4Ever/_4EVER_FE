'use client';

import { ShippingDetailModalProps } from '../../types/ShippingDetailType';

const ShippingDetailModal = ({
  $selectedSubTab,
  $setShowShipDetailModal,
}: ShippingDetailModalProps) => {
  return (
    <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50">
      <div className="bg-white rounded-lg p-6 w-full max-w-2xl mx-4 max-h-[90vh] overflow-y-auto">
        <div className="flex items-center justify-between mb-6">
          {/* <h3 className="text-xl font-semibold">주문 상세 - {selectedOrder.id}</h3> */}
          <button
            onClick={() => $setShowShipDetailModal(false)}
            className="text-gray-400 hover:text-gray-600 cursor-pointer"
          >
            <i className="ri-close-line text-xl"></i>
          </button>
        </div>

        <div className="space-y-6">
          <div className="grid grid-cols-2 gap-4 p-4 bg-gray-50 rounded-lg">
            <div>
              <span className="text-sm text-gray-600">고객:</span>
              {/* <div className="font-medium text-gray-900">{selectedOrder.customer}</div> */}
            </div>
            <div>
              <span className="text-sm text-gray-600">납기일:</span>
              {/* <div className="font-medium text-gray-900">{selectedOrder.dueDate}</div> */}
            </div>
          </div>

          <div>
            <h4 className="text-lg font-semibold text-gray-900 mb-4">주문 품목</h4>
            <div className="space-y-2">
              {/* {selectedOrder.items.map((item: any, index: number) => (
                <div
                  key={index}
                  className="flex justify-between items-center p-3 bg-gray-50 rounded-lg"
                >
                  <span className="font-medium text-gray-900">{item.name}</span>
                  <span className="text-sm text-gray-600">
                    {item.quantity} {item.unit}
                  </span>
                </div>
              ))} */}
            </div>
          </div>

          {$selectedSubTab !== 'producing' && (
            <div className="flex gap-3 pt-4">
              <button
                onClick={() => $setShowShipDetailModal(false)}
                className="flex-1 px-4 py-2 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 transition-colors text-sm font-medium cursor-pointer"
              >
                닫기
              </button>
              <button
                onClick={() => {
                  alert('출고 준비 완료로 상태가 변경되었습니다.');
                  $setShowShipDetailModal(false);
                }}
                className="flex-1 px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 transition-colors text-sm font-medium cursor-pointer"
              >
                출고 준비 완료로 변경
              </button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default ShippingDetailModal;
