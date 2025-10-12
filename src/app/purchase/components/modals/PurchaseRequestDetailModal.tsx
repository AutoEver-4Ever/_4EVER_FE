'use client';

import { PURCHASE_ITEM_TABLE_HEADERS } from '@/constants/purchase';
import { PurchaseRequestDetailModalProps } from '@/app/purchase/types/PurchaseRequestDetailModalType';

// 상태별 색상
const getStatusColor = (status: string): string => {
  switch (status) {
    case 'approved': // 승인
      return 'bg-green-100 text-green-700';
    case 'pending':
      return 'bg-yellow-100 text-yellow-700';
    case 'waiting': // 대기중
      return 'bg-blue-100 text-blue-700';
    case 'rejected': // 반려
      return 'bg-red-100 text-red-700';
    default:
      return 'bg-gray-100 text-gray-700';
  }
};

// 상태: 영어 > 한글로 매핑
const getStatusText = (status: string): string => {
  switch (status) {
    case 'approved':
      return '승인';
    case 'pending':
      return '대기';
    case 'waiting':
      return '대기';
    case 'rejected':
      return '반려';
    default:
      return status;
  }
};

export default function PurchaseRequestDetailModal({
  isOpen,
  request,
  onClose,
}: PurchaseRequestDetailModalProps) {
  if (!isOpen || !request) return null;

  return (
    <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50">
      <div className="bg-white rounded-lg w-full max-w-4xl mx-4 max-h-[90vh] overflow-y-auto">
        <div className="flex items-center justify-between p-6 border-b border-gray-200 sticky top-0 bg-white">
          <h3 className="text-xl font-semibold text-gray-900">구매 요청 상세 정보</h3>
          <button onClick={onClose} className="text-gray-400 hover:text-gray-600 cursor-pointer">
            <i className="ri-close-line text-2xl"></i>
          </button>
        </div>

        <div className="p-6 space-y-6">
          {/* 기본 정보 */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">요청번호</label>
                <div className="text-lg font-semibold text-gray-900">{request.id}</div>
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">요청자</label>
                <div className="text-gray-900">{request.requester}</div>
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">부서</label>
                <div className="text-gray-900">{request.department}</div>
              </div>
            </div>
            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">요청일</label>
                <div className="text-gray-900">{request.requestDate}</div>
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">희망 납기일</label>
                <div className="text-gray-900">{request.dueDate}</div>
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">상태</label>
                <span
                  className={`px-2 py-1 rounded text-xs font-medium ${getStatusColor(request.status)}`}
                >
                  {getStatusText(request.status)}
                </span>
              </div>
            </div>
          </div>

          {/* 주문 자재 목록 테이블 */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-3">주문 자재 목록</label>
            <div className="overflow-x-auto">
              <table className="w-full border border-gray-300 rounded-lg">
                {/* 테이블 헤더: 품목명, 수량, 단위, 단가 */}
                <thead className="bg-gray-50">
                  <tr>
                    {PURCHASE_ITEM_TABLE_HEADERS.map((header) => (
                      <th
                        key={header}
                        className="px-4 py-3 text-left text-sm font-medium text-gray-700 border-b border-gray-300"
                      >
                        {header}
                      </th>
                    ))}
                  </tr>
                </thead>
                {/* 테이블 바디 */}
                <tbody>
                  {request.items.map((item, index) => (
                    <tr key={index} className="border-b border-gray-200 hover:bg-gray-50">
                      <td className="px-4 py-3 text-sm text-gray-900">{item.name}</td>
                      <td className="px-4 py-3 text-sm text-gray-900">{item.quantity}</td>
                      <td className="px-4 py-3 text-sm text-gray-900">{item.unit}</td>
                      <td className="px-4 py-3 text-sm text-gray-900">₩{item.price}</td>
                    </tr>
                  ))}
                </tbody>
                <tfoot className="bg-gray-50">
                  <tr>
                    <td colSpan={3} className="px-4 py-3 text-right font-medium text-gray-900">
                      총 금액
                    </td>
                    <td className="px-4 py-3 text-right font-medium text-green-600">
                      {request.totalAmount}
                    </td>
                  </tr>
                </tfoot>
              </table>
            </div>
          </div>

          {/* 버튼 */}
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
