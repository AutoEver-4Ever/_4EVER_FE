'use client';

import {
  VoucherDetailType,
  VoucherItem,
  VourcherDetailModalProps,
} from '@/app/(private)/finance/types/VoucherDetailModalType';
import { getChitStatusColor, getChitStatusText } from '../../utils';
import { ITEM_LIST_TABLE_HEADERS } from '../../constants';

const VourcherDetailModal = ({
  $setShowDetailModal,
  $selectedVoucherId,
  $setSelectedVoucherId,
}: VourcherDetailModalProps) => {
  const mockVouchers: VoucherDetailType = {
    id: 1,
    voucherId: 'AP-2024-001',
    type: 'AP',
    description: '강판 구매 - 대한철강',
    amount: '₩5,000,000',
    date: '2024-01-18',
    dueDate: '2024-02-17',
    status: 'unpaid',
    reference: 'PO-2024-001',
    vendor: '대한철강',
    details: {
      voucherType: '매입전표',
      memo: '1월 생산용 강판 구매',
      items: [
        {
          name: '강판 A급',
          spec: '1200x2400x3mm',
          quantity: 50,
          unit: '매',
          unitPrice: 80000,
          amount: 4000000,
        },
        {
          name: '강판 B급',
          spec: '1000x2000x2mm',
          quantity: 25,
          unit: '매',
          unitPrice: 40000,
          amount: 1000000,
        },
      ],
    },
  };

  const onClose = () => {
    $setSelectedVoucherId(0);
    $setShowDetailModal(false);
  };

  return (
    <>
      <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50">
        <div className="bg-white rounded-lg p-6 w-full max-w-4xl mx-4 max-h-[90vh] overflow-y-auto">
          <div className="flex items-center justify-between mb-6">
            <h3 className="text-xl font-semibold text-gray-900">전표 상세 정보</h3>
            <button onClick={onClose} className="text-gray-400 hover:text-gray-600 cursor-pointer">
              <i className="ri-close-line text-2xl"></i>
            </button>
          </div>

          <div className="space-y-6">
            {/* 기본 정보 */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="space-y-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">전표번호</label>
                  <div className="text-lg font-semibold text-gray-900">
                    {mockVouchers.voucherId}
                  </div>
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">전표유형</label>
                  <div className="text-gray-900">{mockVouchers.id}</div>
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">거래처</label>
                  <div className="text-gray-900">{mockVouchers.vendor}</div>
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">메모</label>
                  <div className="text-gray-900">{mockVouchers.details.memo}</div>
                </div>
              </div>
              <div className="space-y-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    전표 발생일
                  </label>
                  <div className="text-gray-900">{mockVouchers.date}</div>
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">만기일</label>
                  <div className="text-gray-900">{mockVouchers.dueDate}</div>
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">상태</label>
                  <span
                    className={`px-2 py-1 rounded text-xs font-medium ${getChitStatusColor(mockVouchers.status)}`}
                  >
                    {getChitStatusText(mockVouchers.status)}
                  </span>
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
                      {ITEM_LIST_TABLE_HEADERS.map((header) => (
                        <th
                          key={header}
                          className={`px-4 py-3 text-sm font-medium text-gray-700 border-b ${
                            header === '품목'
                              ? 'text-left'
                              : header === '수량' || header === '단위'
                                ? 'text-center'
                                : 'text-right'
                          }`}
                        >
                          {header}
                        </th>
                      ))}
                    </tr>
                  </thead>
                  <tbody>
                    {mockVouchers.details.items.map((item: VoucherItem, index: number) => (
                      <tr key={index} className="border-b">
                        <td className="px-4 py-3 text-sm text-gray-900">{item.name}</td>
                        <td className="px-4 py-3 text-sm text-gray-900 text-center">
                          {item.quantity}
                        </td>
                        <td className="px-4 py-3 text-sm text-gray-900 text-center">{item.unit}</td>
                        <td className="px-4 py-3 text-sm text-gray-900 text-right">
                          ₩{item.unitPrice.toLocaleString()}
                        </td>
                        <td className="px-4 py-3 text-sm text-gray-900 text-right">
                          ₩{item.amount.toLocaleString()}
                        </td>
                      </tr>
                    ))}
                  </tbody>
                  <tfoot className="bg-gray-50">
                    <tr>
                      <td colSpan={4} className="px-4 py-3 text-right font-medium text-gray-900">
                        총 금액
                      </td>
                      <td className="px-4 py-3 text-right font-medium text-green-600">
                        ₩
                        {mockVouchers.details.items
                          .reduce((sum: number, item: VoucherItem) => sum + item.amount, 0)
                          .toLocaleString()}
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
                className="flex-1 px-4 py-2 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 transition-colors font-medium cursor-pointer"
              >
                닫기
              </button>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default VourcherDetailModal;
