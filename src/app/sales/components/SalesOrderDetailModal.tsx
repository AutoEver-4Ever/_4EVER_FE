'use client';
import { SalesOrder } from '@/app/sales/types/SalesOrderType';

interface SalesOrderDetailProps {
  $showDetailModal: boolean;
  $setShowDetailModal: (show: boolean) => void;
  $selectedOrder: SalesOrder | null;
  $getStatusColor: (status: string) => string;
  $getStatusText: (status: string) => string;
}

const SalesOrderDetailModal = ({
  $showDetailModal,
  $setShowDetailModal,
  $selectedOrder,
  $getStatusColor,
  $getStatusText,
}: SalesOrderDetailProps) => {
  const handleCloseModal = () => {
    $setShowDetailModal(false);
  };
  return (
    <>
      {/* 주문 상세 보기 모달 */}
      {$showDetailModal && $selectedOrder && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white rounded-lg shadow-xl max-w-4xl w-full mx-4 max-h-[90vh] overflow-y-auto">
            <div className="p-6 border-b border-gray-200">
              <div className="flex justify-between items-center">
                <h3 className="text-lg font-semibold text-gray-900">주문 상세 정보</h3>
                <button onClick={handleCloseModal} className="text-gray-400 hover:text-gray-600">
                  <i className="ri-close-line text-xl"></i>
                </button>
              </div>
            </div>

            <div className="p-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
                <div>
                  <h4 className="text-md font-semibold text-gray-900 mb-4">주문 정보</h4>
                  <div className="space-y-3">
                    <div>
                      <span className="text-sm font-medium text-gray-500">주문번호:</span>
                      <span className="ml-2 text-sm text-gray-900">
                        {$selectedOrder.orderNumber}
                      </span>
                    </div>
                    <div>
                      <span className="text-sm font-medium text-gray-500">주문일:</span>
                      <span className="ml-2 text-sm text-gray-900">{$selectedOrder.date}</span>
                    </div>
                    <div>
                      <span className="text-sm font-medium text-gray-500">납기일:</span>
                      <span className="ml-2 text-sm text-gray-900">
                        {$selectedOrder.deliveryDate}
                      </span>
                    </div>
                    <div>
                      <span className="text-sm font-medium text-gray-500">결제조건:</span>
                      <span className="ml-2 text-sm text-gray-900">
                        {$selectedOrder.paymentTerms}
                      </span>
                    </div>
                    <div>
                      <span className="text-sm font-medium text-gray-500">상태:</span>
                      <span
                        className={`ml-2 inline-flex px-2 py-1 text-xs font-semibold rounded-full ${$getStatusColor($selectedOrder.status)}`}
                      >
                        {$getStatusText($selectedOrder.status)}
                      </span>
                    </div>
                  </div>
                </div>

                <div>
                  <h4 className="text-md font-semibold text-gray-900 mb-4">고객 정보</h4>
                  <div className="space-y-3">
                    <div>
                      <span className="text-sm font-medium text-gray-500">회사명:</span>
                      <span className="ml-2 text-sm text-gray-900">
                        {$selectedOrder.customerInfo.name}
                      </span>
                    </div>
                    <div>
                      <span className="text-sm font-medium text-gray-500">연락처:</span>
                      <span className="ml-2 text-sm text-gray-900">
                        {$selectedOrder.customerInfo.contact}
                      </span>
                    </div>
                    <div>
                      <span className="text-sm font-medium text-gray-500">이메일:</span>
                      <span className="ml-2 text-sm text-gray-900">
                        {$selectedOrder.customerInfo.email}
                      </span>
                    </div>
                    <div>
                      <span className="text-sm font-medium text-gray-500">주소:</span>
                      <span className="ml-2 text-sm text-gray-900">
                        {$selectedOrder.customerInfo.address}
                      </span>
                    </div>
                  </div>
                </div>
              </div>

              <div className="mb-6">
                <h4 className="text-md font-semibold text-gray-900 mb-4">주문 품목</h4>
                <div className="overflow-x-auto">
                  <table className="min-w-full divide-y divide-gray-200">
                    <thead className="bg-gray-50">
                      <tr>
                        <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                          품목명
                        </th>
                        <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                          수량
                        </th>
                        <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                          단가
                        </th>
                        <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                          합계
                        </th>
                      </tr>
                    </thead>
                    <tbody className="bg-white divide-y divide-gray-200">
                      {$selectedOrder.items.map((item, index) => (
                        <tr key={index}>
                          <td className="px-4 py-3 text-sm text-gray-900">{item.name}</td>
                          <td className="px-4 py-3 text-sm text-gray-900">
                            {item.quantity.toLocaleString()}
                          </td>
                          <td className="px-4 py-3 text-sm text-gray-900">
                            ₩{item.unitPrice.toLocaleString()}
                          </td>
                          <td className="px-4 py-3 text-sm text-gray-900">
                            ₩{item.total.toLocaleString()}
                          </td>
                        </tr>
                      ))}
                    </tbody>
                    <tfoot className="bg-gray-50">
                      <tr>
                        <td
                          colSpan={3}
                          className="px-4 py-3 text-sm font-semibold text-gray-900 text-right"
                        >
                          총 금액:
                        </td>
                        <td className="px-4 py-3 text-sm font-semibold text-gray-900">
                          ₩{$selectedOrder.amount.toLocaleString()}
                        </td>
                      </tr>
                    </tfoot>
                  </table>
                </div>
              </div>

              {$selectedOrder.notes && (
                <div className="mb-6">
                  <h4 className="text-md font-semibold text-gray-900 mb-4">특이사항</h4>
                  <div className="bg-gray-50 p-4 rounded-lg">
                    <p className="text-sm text-gray-700">{$selectedOrder.notes}</p>
                  </div>
                </div>
              )}

              <div className="flex justify-end space-x-3 pt-4 border-t border-gray-200">
                <button
                  onClick={handleCloseModal}
                  className="px-4 py-2 text-sm font-medium text-gray-700 bg-white border border-gray-300 rounded-md hover:bg-gray-50 whitespace-nowrap cursor-pointer"
                >
                  닫기
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default SalesOrderDetailModal;
