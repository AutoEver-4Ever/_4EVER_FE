'use client';

import { useState } from 'react';
import Link from 'next/link';

interface Quote {
  id: string;
  customer: string;
  contact: string;
  date: string;
  deliveryDate: string;
  amount: number;
  status: string;
}

interface InventoryItem {
  product: string;
  currentStock: number;
  requiredStock: number;
  available: boolean;
}

interface StockCheckResult {
  hasStock: boolean;
  items: InventoryItem[];
  checkDate: string;
  deliveryPossible: boolean;
}

interface QuoteReviewModalProps {
  $isOpen: boolean;
  $onClose: () => void;
}

const QuoteReviewModal = ({ $isOpen, $onClose }: QuoteReviewModalProps) => {
  const [isChecking, setIsChecking] = useState(false);
  const [stockCheckResult, setStockCheckResult] = useState<StockCheckResult | null>(null);

  const mockInventory: InventoryItem[] = [
    { product: '제품 A', currentStock: 15, requiredStock: 10, available: true },
    { product: '제품 B', currentStock: 3, requiredStock: 5, available: false },
    { product: '제품 C', currentStock: 20, requiredStock: 8, available: true },
  ];

  const handleStockCheck = async () => {
    setIsChecking(true);

    setTimeout(() => {
      const hasInsufficientStock = mockInventory.some((item) => !item.available);

      setStockCheckResult({
        hasStock: !hasInsufficientStock,
        items: mockInventory,
        checkDate: new Date().toISOString().split('T')[0],
        deliveryPossible: !hasInsufficientStock,
      });

      setIsChecking(false);
    }, 2000);
  };

  const quote: Quote = {
    id: 'Q-2025-1016',
    customer: '삼성전자',
    contact: '김철수 대리',
    date: '2025-10-10',
    deliveryDate: '2025-10-20',
    amount: 23500000,
    status: '검토중',
  };

  const handleDirectDelivery = () => {
    alert(
      `견적 ${quote?.id}의 제품이 즉시 납품 처리되었습니다.\n고객: ${quote?.customer}\n납기일: ${quote?.deliveryDate}`,
    );
    $onClose();
  };

  if (!$isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50">
      <div className="bg-white rounded-lg p-6 w-full max-w-4xl mx-4 max-h-[90vh] overflow-y-auto">
        <div className="flex items-center justify-between mb-6">
          <h3 className="text-xl font-semibold text-gray-900">견적 검토 요청 - {quote?.id}</h3>
          <button onClick={$onClose} className="text-gray-400 hover:text-gray-600 cursor-pointer">
            <i className="ri-close-line text-2xl"></i>
          </button>
        </div>

        <div className="space-y-6">
          {/* 견적 정보 요약 */}
          <div className="bg-blue-50 rounded-lg p-4">
            <h4 className="text-lg font-semibold text-gray-900 mb-3">견적 정보</h4>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="space-y-2">
                <div className="flex justify-between">
                  <span className="text-gray-600">고객명:</span>
                  <span className="font-medium">{quote?.customer}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-600">담당자:</span>
                  <span className="font-medium">{quote?.contact}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-600">견적일자:</span>
                  <span className="font-medium">{quote?.date}</span>
                </div>
              </div>
              <div className="space-y-2">
                <div className="flex justify-between">
                  <span className="text-gray-600">납기일:</span>
                  <span className="font-medium">{quote?.deliveryDate}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-600">견적금액:</span>
                  <span className="font-medium text-blue-600">
                    ₩{quote?.amount?.toLocaleString()}
                  </span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-600">상태:</span>
                  <span className="inline-flex px-2 py-1 text-xs font-medium rounded-full bg-yellow-100 text-yellow-800">
                    {quote?.status}
                  </span>
                </div>
              </div>
            </div>
          </div>

          {/* 재고 확인 섹션 */}
          <div className="border border-gray-200 rounded-lg p-4">
            <div className="flex items-center justify-between mb-4">
              <h4 className="text-lg font-semibold text-gray-900">재고 확인</h4>
              {!stockCheckResult && (
                <button
                  onClick={handleStockCheck}
                  disabled={isChecking}
                  className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors cursor-pointer whitespace-nowrap flex items-center space-x-2 disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  {isChecking ? (
                    <>
                      <i className="ri-loader-4-line animate-spin"></i>
                      <span>확인 중...</span>
                    </>
                  ) : (
                    <>
                      <i className="ri-search-line"></i>
                      <span>재고 확인</span>
                    </>
                  )}
                </button>
              )}
            </div>

            {isChecking && (
              <div className="text-center py-8">
                <div className="inline-flex items-center space-x-3">
                  <i className="ri-loader-4-line text-2xl text-blue-600 animate-spin"></i>
                  <span className="text-gray-600">재고 상태를 확인하고 있습니다...</span>
                </div>
              </div>
            )}

            {stockCheckResult && (
              <div className="space-y-4">
                {/* 재고 확인 결과 헤더 */}
                <div
                  className={`p-4 rounded-lg ${stockCheckResult.hasStock ? 'bg-green-50 border border-green-200' : 'bg-red-50 border border-red-200'}`}
                >
                  <div className="flex items-center space-x-3">
                    <i
                      className={`text-2xl ${stockCheckResult.hasStock ? 'ri-check-circle-line text-green-600' : 'ri-error-warning-line text-red-600'}`}
                    ></i>
                    <div>
                      <h5
                        className={`font-semibold ${stockCheckResult.hasStock ? 'text-green-800' : 'text-red-800'}`}
                      >
                        {stockCheckResult.hasStock ? '재고 충족' : '재고 부족'}
                      </h5>
                      <p
                        className={`text-sm ${stockCheckResult.hasStock ? 'text-green-600' : 'text-red-600'}`}
                      >
                        {stockCheckResult.hasStock
                          ? `요청하신 납기일(${quote?.deliveryDate})에 모든 제품의 재고가 충분합니다.`
                          : '일부 제품의 재고가 부족하여 생산 계획 검토가 필요합니다.'}
                      </p>
                    </div>
                  </div>
                </div>

                {/* 재고 상세 정보 */}
                <div className="overflow-x-auto">
                  <table className="w-full border border-gray-300 rounded-lg">
                    <thead className="bg-gray-50">
                      <tr>
                        <th className="px-4 py-3 text-left text-sm font-medium text-gray-700 border-b">
                          제품명
                        </th>
                        <th className="px-4 py-3 text-center text-sm font-medium text-gray-700 border-b">
                          필요 수량
                        </th>
                        <th className="px-4 py-3 text-center text-sm font-medium text-gray-700 border-b">
                          현재 재고
                        </th>
                        <th className="px-4 py-3 text-center text-sm font-medium text-gray-700 border-b">
                          상태
                        </th>
                      </tr>
                    </thead>
                    <tbody>
                      {stockCheckResult.items.map((item: InventoryItem, index: number) => (
                        <tr key={index} className="border-b">
                          <td className="px-4 py-3 text-sm font-medium">{item.product}</td>
                          <td className="px-4 py-3 text-sm text-center">{item.requiredStock}</td>
                          <td className="px-4 py-3 text-sm text-center">{item.currentStock}</td>
                          <td className="px-4 py-3 text-center">
                            <span
                              className={`inline-flex px-2 py-1 text-xs font-medium rounded-full ${
                                item.available
                                  ? 'bg-green-100 text-green-800'
                                  : 'bg-red-100 text-red-800'
                              }`}
                            >
                              {item.available ? '충족' : '부족'}
                            </span>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>

                {/* 확인 일시 */}
                <div className="text-sm text-gray-500 text-right">
                  재고 확인 일시: {stockCheckResult.checkDate} {new Date().toLocaleTimeString()}
                </div>
              </div>
            )}
          </div>

          {/* 액션 버튼 */}
          {stockCheckResult && (
            <div className="bg-gray-50 rounded-lg p-4">
              <h4 className="text-lg font-semibold text-gray-900 mb-4">다음 단계</h4>

              {stockCheckResult.hasStock ? (
                <div className="space-y-3">
                  <p className="text-green-700 bg-green-50 p-3 rounded-lg border border-green-200">
                    <i className="ri-check-circle-line mr-2"></i>
                    모든 제품의 재고가 충족되어 즉시 납품이 가능합니다.
                  </p>
                  <div className="flex gap-3">
                    <button
                      onClick={handleDirectDelivery}
                      className="px-6 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 transition-colors cursor-pointer whitespace-nowrap flex items-center space-x-2"
                    >
                      <i className="ri-truck-line"></i>
                      <span>즉시 납품 처리</span>
                    </button>
                  </div>
                </div>
              ) : (
                <div className="space-y-3">
                  <p className="text-red-700 bg-red-50 p-3 rounded-lg border border-red-200">
                    <i className="ri-error-warning-line mr-2"></i>
                    재고 부족으로 인해 생산 계획 검토가 필요합니다.
                  </p>
                  <div className="flex gap-3">
                    <Link
                      href="/bom"
                      className="px-6 py-2 bg-orange-600 text-white rounded-lg hover:bg-orange-700 transition-colors cursor-pointer whitespace-nowrap flex items-center space-x-2"
                      onClick={$onClose}
                    >
                      <i className="ri-settings-3-line"></i>
                      <span>생산관리에서 검토</span>
                    </Link>
                  </div>
                </div>
              )}
            </div>
          )}

          {/* 하단 버튼 */}
          <div className="flex gap-3 pt-6 border-t border-gray-200">
            <button
              onClick={$onClose}
              className="flex-1 px-4 py-2 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 transition-colors font-medium cursor-pointer whitespace-nowrap"
            >
              닫기
            </button>
            {!stockCheckResult && (
              <button
                onClick={handleStockCheck}
                disabled={isChecking}
                className="px-6 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors font-medium cursor-pointer whitespace-nowrap disabled:opacity-50 disabled:cursor-not-allowed"
              >
                재고 확인 시작
              </button>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default QuoteReviewModal;
