// '@/app/(private)/production/components/modals/SimulationResultModal'

'use client';

import { useQueries } from '@tanstack/react-query';
import { QuotationSimulationData } from '@/app/(private)/production/types/QuotationSimulationApiType';
import { fetchQuotationPreview } from '@/app/(private)/production/api/production.api';
import { QuotationPreviewResponse } from '@/app/(private)/production/types/QuotationPreviewApiType'; // 타입 임포트
import { useState, useEffect } from 'react';
import Button from '@/app/components/common/Button';

interface SimulationResultModalProps {
  simulationResults: QuotationSimulationData[];
  onClose: () => void;
  // MPS Preview 데이터를 부모에게 전달
  onConfirm: (previewData: QuotationPreviewResponse[]) => void;
}

export default function SimulationResultModal({
  simulationResults,
  onClose,
  onConfirm,
}: SimulationResultModalProps) {
  // MPS Preview 쿼리 실행을 위한 로컬 상태
  const [isPreviewTriggered, setIsPreviewTriggered] = useState(false);

  // MPS Preview 쿼리 로직
  const previewQueries = useQueries({
    queries: simulationResults.map((result) => ({
      queryKey: ['quotationPreview', result.quotationId],
      queryFn: () => fetchQuotationPreview(result.quotationId),
      // 모달 내에서만 쿼리 실행 제어
      enabled: isPreviewTriggered,
      staleTime: 0,
      retry: 1,
    })),
  });

  const previewLoading = previewQueries.some((query) => query.isLoading);
  const previewError = previewQueries.some((query) => query.isError);
  const allPreviewSuccess = previewQueries.every((q) => q.isSuccess);

  const previewResults: QuotationPreviewResponse[] = previewQueries
    .filter((query) => query.data)
    .map((query) => query.data as QuotationPreviewResponse);

  // 쿼리 결과 감지 및 부모 컴포넌트에 데이터 전달
  useEffect(() => {
    if (isPreviewTriggered && allPreviewSuccess && previewResults.length > 0) {
      // 쿼리 성공 시, 데이터를 담아 부모의 onConfirm 함수 호출
      onConfirm(previewResults);
      setIsPreviewTriggered(false); // 재트리거 방지
    }

    if (isPreviewTriggered && previewError) {
      alert('MPS 프리뷰 데이터를 가져오는데 실패했습니다.');
      setIsPreviewTriggered(false);
    }
  }, [isPreviewTriggered, allPreviewSuccess, previewError, previewResults, onConfirm]);

  const handleConfirmClick = () => {
    // 버튼 클릭 시 쿼리 실행 트리거
    setIsPreviewTriggered(true);
  };

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto">
      <div className="flex items-center justify-center min-h-screen px-4">
        {/* 배경 오버레이 */}
        <div className="fixed inset-0 bg-black/50" onClick={onClose}></div>

        {/* 모달 컨텐츠 */}
        <div className="relative bg-white rounded-lg shadow-xl max-w-4xl w-full max-h-[90vh] overflow-y-auto">
          <div className="p-6">
            <div className="flex items-center justify-between mb-4">
              <h2 className="text-xl font-semibold text-gray-900">시뮬레이션 결과</h2>
              <button onClick={onClose} className="text-gray-400 hover:text-gray-600">
                <i className="ri-close-line text-2xl"></i>
              </button>
            </div>

            {/* 시뮬레이션 결과 표시 */}
            <div className="space-y-6">
              {simulationResults.map((result) => (
                <div key={result.quotationId} className="border border-gray-200 rounded-lg p-4">
                  {/* 견적 정보 */}
                  <div className="mb-4">
                    <h3 className="text-lg font-semibold text-gray-900">
                      견적 {result.quotationCode}
                    </h3>
                    <div className="mt-2 grid grid-cols-2 gap-4 text-sm">
                      <div>
                        <span className="text-gray-500">고객사:</span>
                        <span className="ml-2 text-gray-900">{result.customerCompanyId}</span>
                      </div>
                      <div>
                        <span className="text-gray-500">제품:</span>
                        <span className="ml-2 text-gray-900">{result.productName}</span>
                      </div>
                      <div>
                        <span className="text-gray-500">요청 수량:</span>
                        <span className="ml-2 text-gray-900">
                          {result.requestQuantity.toLocaleString()}EA
                        </span>
                      </div>
                      <div>
                        <span className="text-gray-500">요청 납기:</span>
                        <span className="ml-2 text-gray-900">
                          {new Date(result.requestDueDate).toLocaleDateString()}
                        </span>
                      </div>
                    </div>
                  </div>

                  {/* 시뮬레이션 정보 */}
                  <div className="mb-4 bg-blue-50 p-3 rounded">
                    <div className="grid grid-cols-3 gap-4 text-sm">
                      <div>
                        <span className="text-gray-600">가용 수량:</span>
                        <span className="ml-2 font-semibold text-blue-600">
                          {result.simulation.availableQuantity.toLocaleString()}EA
                        </span>
                      </div>
                      <div>
                        <span className="text-gray-600">제안 납기:</span>
                        <span className="ml-2 font-semibold text-blue-600">
                          {new Date(result.simulation.suggestedDueDate).toLocaleDateString()}
                        </span>
                      </div>
                      <div>
                        <span className="text-gray-600">상태:</span>
                        <span
                          className={`ml-2 font-semibold ${
                            result.simulation.status === 'PASS' ? 'text-green-600' : 'text-red-600'
                          }`}
                        >
                          {result.simulation.status === 'PASS' ? '충족' : '부족'}
                        </span>
                      </div>
                    </div>
                  </div>

                  {/* 부족 재고 테이블 */}
                  {result.shortages.length > 0 && (
                    <div>
                      <h4 className="text-sm font-semibold text-gray-700 mb-2">부족 재고 목록</h4>
                      <div className="overflow-x-auto">
                        <table className="min-w-full divide-y divide-gray-200">
                          <thead className="bg-gray-50">
                            <tr>
                              <th className="px-4 py-2 text-left text-xs font-medium text-gray-500">
                                자재명
                              </th>
                              <th className="px-4 py-2 text-left text-xs font-medium text-gray-500">
                                필요 수량
                              </th>
                              <th className="px-4 py-2 text-left text-xs font-medium text-gray-500">
                                현재 재고
                              </th>
                              <th className="px-4 py-2 text-left text-xs font-medium text-gray-500">
                                부족 수량
                              </th>
                            </tr>
                          </thead>
                          <tbody className="bg-white divide-y divide-gray-200">
                            {result.shortages.map((shortage, index) => (
                              <tr key={index}>
                                <td className="px-4 py-2 text-sm text-gray-900">
                                  {shortage.itemName}
                                </td>
                                <td className="px-4 py-2 text-sm text-gray-900">
                                  {shortage.requiredQuantity.toLocaleString()}
                                </td>
                                <td className="px-4 py-2 text-sm text-gray-900">
                                  {shortage.currentStock.toLocaleString()}
                                </td>
                                <td className="px-4 py-2 text-sm font-semibold text-red-600">
                                  {shortage.shortQuantity.toLocaleString()}
                                </td>
                              </tr>
                            ))}
                          </tbody>
                        </table>
                      </div>
                    </div>
                  )}
                </div>
              ))}
            </div>

            {/* 액션 버튼 */}
            <div className="flex justify-end pt-4 border-t">
              <Button
                label={previewLoading ? 'MPS 프리뷰 로딩 중...' : '제안 납기 확정'}
                onClick={handleConfirmClick}
                disabled={previewLoading}
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
