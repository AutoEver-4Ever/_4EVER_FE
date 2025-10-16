'use client';

import { PurchaseOrderDetailModalProps } from '@/app/purchase/types/PurchaseOrderDetailModalProps';

export default function PurchaseOrderDetailModal({
  order,
  onClose,
  getStatusColor,
  getStatusText,
}: PurchaseOrderDetailModalProps) {
  return (
    <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50">
      <div className="bg-white rounded-lg p-6 w-full max-w-4xl mx-4 max-h-[90vh] overflow-y-auto">
        <div className="flex items-center justify-between mb-6">
          <h3 className="text-xl font-semibold text-gray-900">발주서 상세 정보</h3>
          <button onClick={onClose} className="text-gray-400 hover:text-gray-600 cursor-pointer">
            <i className="ri-close-line text-2xl"></i>
          </button>
        </div>

        <div className="space-y-6">
          {/* 기본 정보 */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">발주번호</label>
                <div className="text-lg font-semibold text-gray-900">{order.id}</div>
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">공급업체</label>
                <div className="text-gray-900">{order.details.supplierInfo.name}</div>
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">연락처</label>
                <div className="text-gray-900">{order.details.supplierInfo.contact}</div>
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">이메일</label>
                <div className="text-blue-600">{order.details.supplierInfo.email}</div>
              </div>
            </div>

            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">주문일자</label>
                <div className="text-gray-900">{order.orderDate}</div>
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">납기일</label>
                <div className="text-gray-900">{order.deliveryDate}</div>
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">상태</label>
                <span
                  className={`px-2 py-1 rounded text-xs font-medium ${getStatusColor(order.status)}`}
                >
                  {getStatusText(order.status)}
                </span>
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">총 금액</label>
                <div className="text-lg font-semibold text-green-600">{order.totalAmount}</div>
              </div>
            </div>
          </div>

          {/* 주문 품목 */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-3">주문 품목</label>
            <div className="overflow-x-auto">
              <table className="w-full border border-gray-300 rounded-lg">
                <thead className="bg-gray-50">
                  <tr>
                    <th className="px-4 py-3 text-sm font-medium text-gray-700">품목명</th>
                    <th className="px-4 py-3 text-sm font-medium text-gray-700">수량</th>
                    <th className="px-4 py-3 text-sm font-medium text-gray-700">단위</th>
                    <th className="px-4 py-3 text-sm font-medium text-gray-700">단가</th>
                    <th className="px-4 py-3 text-sm font-medium text-gray-700">금액</th>
                  </tr>
                </thead>
                <tbody>
                  {order.details.orderItems.map((item, index) => (
                    <tr key={index} className="border-b">
                      <td className="px-4 py-3 text-sm text-gray-900">{item.item}</td>
                      <td className="px-4 py-3 text-sm text-gray-900 text-right">
                        {item.quantity.toLocaleString()}
                      </td>
                      <td className="px-4 py-3 text-sm text-gray-900">{item.unit}</td>
                      <td className="px-4 py-3 text-sm text-gray-900 text-right">
                        ₩{item.unitPrice.toLocaleString()}
                      </td>
                      <td className="px-4 py-3 text-sm font-medium text-gray-900 text-right">
                        ₩{item.amount.toLocaleString()}
                      </td>
                    </tr>
                  ))}
                </tbody>
                <tfoot className="bg-gray-50">
                  <tr>
                    <td colSpan={5} className="px-4 py-3 text-right font-medium text-gray-900">
                      총 금액
                    </td>
                    <td className="px-4 py-3 text-right font-medium text-green-600">
                      ₩
                      {order.details.orderItems
                        .reduce((sum, item) => sum + item.amount, 0)
                        .toLocaleString()}
                    </td>
                  </tr>
                </tfoot>
              </table>
            </div>
          </div>

          {/* 메모 */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">메모</label>
            <div className="text-gray-900 bg-gray-50 p-3 rounded-lg">{order.details.notes}</div>
          </div>

          {/* 닫기 버튼 */}
          <div className="flex gap-3 pt-6 border-t border-gray-200">
            <button
              onClick={onClose}
              className="flex-1 px-4 py-2 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 transition-colors font-medium cursor-pointer whitespace-nowrap"
            >
              닫기
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
