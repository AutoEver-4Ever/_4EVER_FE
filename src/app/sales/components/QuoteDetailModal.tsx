import { QuoteDetailModalProps } from '@/app/sales/types/QuoteDetailModalType';

const QuoteDetailModal = ({
  $showQuoteModal,
  $setShowQuoteModal,
  $selectedQuote,
  $getStatusColor,
  $getStatusText,
}: QuoteDetailModalProps) => {
  return (
    <>
      {$showQuoteModal && $selectedQuote && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50">
          <div className="bg-white rounded-lg p-6 w-full max-w-4xl mx-4 max-h-[90vh] overflow-y-auto">
            <div className="flex items-center justify-between mb-6">
              <h3 className="text-xl font-semibold text-gray-900">견적서 상세정보</h3>
              <button
                onClick={() => $setShowQuoteModal(false)}
                className="text-gray-400 hover:text-gray-600 cursor-pointer"
              >
                <i className="ri-close-line text-2xl"></i>
              </button>
            </div>

            <div className="space-y-6">
              {/* 견적 기본 정보 */}
              <div className="bg-gray-50 rounded-lg p-4">
                <h4 className="text-lg font-medium text-gray-900 mb-4">견적 정보</h4>
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700">견적번호</label>
                    <p className="text-sm text-gray-900 mt-1">{$selectedQuote.id}</p>
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700">견적일자</label>
                    <p className="text-sm text-gray-900 mt-1">{$selectedQuote.quoteDate}</p>
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700">유효기간</label>
                    <p className="text-sm text-gray-900 mt-1">{$selectedQuote.validUntil || '-'}</p>
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700">상태</label>
                    <span
                      className={`inline-flex px-2 py-1 text-xs font-medium rounded-full mt-1 ${$getStatusColor($selectedQuote.status)}`}
                    >
                      {$getStatusText($selectedQuote.status)}
                    </span>
                  </div>
                </div>
              </div>

              {/* 고객 정보 */}
              <div className="bg-gray-50 rounded-lg p-4">
                <h4 className="text-lg font-medium text-gray-900 mb-4">고객 정보</h4>
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700">고객명</label>
                    <p className="text-sm text-gray-900 mt-1">{$selectedQuote.customer}</p>
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700">담당자</label>
                    <p className="text-sm text-gray-900 mt-1">{$selectedQuote.contact}</p>
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700">이메일</label>
                    <p className="text-sm text-gray-900 mt-1">{$selectedQuote.email}</p>
                  </div>
                </div>
              </div>

              {/* 견적 품목 */}
              <div>
                <h4 className="text-lg font-medium text-gray-900 mb-4">견적 품목</h4>
                <div className="overflow-x-auto">
                  <table className="w-full border border-gray-200 rounded-lg">
                    <thead className="bg-gray-50">
                      <tr>
                        <th className="px-4 py-3 text-left text-sm font-medium text-gray-700 border-b border-gray-200">
                          제품명
                        </th>
                        <th className="px-4 py-3 text-left text-sm font-medium text-gray-700 border-b border-gray-200">
                          사양
                        </th>
                        <th className="px-4 py-3 text-center text-sm font-medium text-gray-700 border-b border-gray-200">
                          수량
                        </th>
                        <th className="px-4 py-3 text-right text-sm font-medium text-gray-700 border-b border-gray-200">
                          단가
                        </th>
                        <th className="px-4 py-3 text-right text-sm font-medium text-gray-700 border-b border-gray-200">
                          금액
                        </th>
                      </tr>
                    </thead>
                    <tbody>
                      {$selectedQuote.items.map((item, index) => (
                        <tr key={index} className="border-b  border-gray-200">
                          <td className="px-4 py-3 text-sm">{item.product}</td>
                          <td className="px-4 py-3 text-sm">{item.specification}</td>
                          <td className="px-4 py-3 text-center text-sm">{item.quantity}</td>
                          <td className="px-4 py-3 text-right text-sm">
                            ₩{item.unitPrice.toLocaleString()}
                          </td>
                          <td className="px-4 py-3 text-right text-sm font-medium">
                            ₩{(item.quantity * item.unitPrice).toLocaleString()}
                          </td>
                        </tr>
                      ))}
                    </tbody>
                    <tfoot className="bg-gray-50">
                      <tr>
                        <td colSpan={4} className="px-4 py-3 text-right font-medium text-gray-900">
                          총 견적금액
                        </td>
                        <td className="px-4 py-3 text-right font-bold text-lg text-blue-600">
                          ₩{$selectedQuote.amount.toLocaleString()}
                        </td>
                      </tr>
                    </tfoot>
                  </table>
                </div>
              </div>

              {/* 버튼 */}
              <div className="flex gap-3 pt-6 border-t border-gray-200">
                <button
                  onClick={() => $setShowQuoteModal(false)}
                  className="flex-1 px-4 py-2 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 transition-colors font-medium cursor-pointer whitespace-nowrap"
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

export default QuoteDetailModal;
