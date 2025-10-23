'use client';

import Dropdown from '@/app/components/common/Dropdown';
import { useEffect, useState } from 'react';
import {
  AVAILABLE_STOCK_STATUS,
  AvailableStockStatus,
  QUOTATIONS_STATUS,
  QuotationStatus,
} from '@/app/(private)/production/constants';
import IconButton from '@/app/components/common/IconButton';
import { Quote } from '@/app/(private)/production/types/QuotationType';
import SimulationResultModal from '@/app/(private)/production/components/modals/SimulationResultModal';
import MpsPreviewModal from '@/app/(private)/production/components/modals/MpsPreviewModal';
import { fetchQuotationSimulationResult } from '@/app/(private)/production/api/production.api';
import { useQueries } from '@tanstack/react-query';
import { QuotationSimulationResponse } from '@/app/(private)/production/types/QuotationSimulationApiType';
import { QuotationPreviewResponse } from '@/app/(private)/production/types/QuotationPreviewApiType'; // 타입은 여전히 필요

const quotes: Quote[] = [
  {
    id: '1',
    customer: '현대자동차',
    product: '도어패널',
    requestQuantity: 500,
    requestDelivery: '2024-02-15',
    stockStatus: 'NOT_CHECKED',
    proposedDelivery: '2024-02-20',
    status: 'NEW',
  },
  {
    id: '2',
    customer: '기아자동차',
    product: 'Hood Panel',
    requestQuantity: 300,
    requestDelivery: '2024-02-10',
    stockStatus: 'NOT_CHECKED',
    proposedDelivery: '2024-02-10',
    status: 'COMMITTED',
  },
  {
    id: '3',
    customer: '삼성전자',
    product: 'Fender Panel',
    requestQuantity: 200,
    requestDelivery: '2024-02-25',
    stockStatus: 'NOT_CHECKED',
    proposedDelivery: '',
    status: 'NEW',
  },
  {
    id: '4',
    customer: 'LG전자',
    product: 'Trunk Lid',
    requestQuantity: 150,
    requestDelivery: '2024-03-01',
    stockStatus: 'NOT_CHECKED',
    proposedDelivery: '',
    status: 'NEW',
  },
  {
    id: '5',
    customer: '포스코',
    product: 'Roof Panel',
    requestQuantity: 400,
    requestDelivery: '2024-02-28',
    stockStatus: 'NOT_CHECKED',
    proposedDelivery: '2024-03-05',
    status: 'COMMITTED',
  },
];

export default function QuotationTab() {
  // 모달 open 여부
  const [showSimulationModal, setShowSimulationModal] = useState(false);
  const [showMpsPreviewModal, setShowMpsPreviewModal] = useState(false);

  // 필터링 상태
  const [selectedStockStatus, setSelectedStockStatus] = useState<AvailableStockStatus>('ALL');
  const [selectedQuotationsStatus, setSelectedQuotationsStatus] = useState<QuotationStatus>('ALL');

  // 선택된 견적
  const [selectedQuotes, setSelectedQuotes] = useState<string[]>([]);

  // 시뮬레이션 실행 여부를 관리하는 state (첫 번째 쿼리 트리거)
  const [isSimulationTriggered, setIsSimulationTriggered] = useState(false);

  // MPS 프리뷰 결과를 저장할 state (모달에서 결과를 받기 위해)
  const [mpsPreviewData, setMpsPreviewData] = useState<QuotationPreviewResponse[]>([]);

  // **시뮬레이션 쿼리 (Step 1)**
  const simulationQueries = useQueries({
    queries: selectedQuotes.map((quoteId) => ({
      queryKey: ['quotationSimulation', quoteId],
      queryFn: () => fetchQuotationSimulationResult(quoteId),
      enabled: isSimulationTriggered && selectedQuotes.length > 0,
      staleTime: 0,
      retry: 1,
    })),
  });

  const isLoading = simulationQueries.some((query) => query.isLoading);
  const isError = simulationQueries.some((query) => query.isError);
  const allSuccess = simulationQueries.every((query) => query.isSuccess);

  const simulationResults: QuotationSimulationResponse[] = simulationQueries
    .filter((query) => query.data)
    .map((query) => query.data as QuotationSimulationResponse);

  const getStatusBadge = (status: Quote['status']) => {
    const statusConfig = {
      NEW: { label: '신규', class: 'bg-blue-100 text-blue-800' },
      COMMITTED: { label: '확정', class: 'bg-green-100 text-green-800' },
      REJECTED: { label: '거절', class: 'bg-red-100 text-red-800' },
    };
    const config = statusConfig[status];
    return (
      <span className={`px-2 py-1 rounded-full text-xs font-medium ${config.class}`}>
        {config.label}
      </span>
    );
  };

  const getStockStatusBadge = (status: Quote['stockStatus']) => {
    const statusConfig = {
      PASS: { label: '충족', class: 'bg-green-100 text-green-800' },
      FAIL: { label: '부족', class: 'bg-red-100 text-red-800' },
      NOT_CHECKED: { label: '미확인', class: 'bg-gray-100 text-gray-800' },
    };
    const config = statusConfig[status];
    return (
      <span className={`px-2 py-1 rounded-full text-xs font-medium ${config.class}`}>
        {config.label}
      </span>
    );
  };

  const handleQuoteSelect = (quoteId: string) => {
    setSelectedQuotes((prev) =>
      prev.includes(quoteId) ? prev.filter((id) => id !== quoteId) : [...prev, quoteId],
    );
  };

  const handleSimulation = () => {
    if (selectedQuotes.length === 0) {
      alert('시뮬레이션을 실행할 견적을 선택해주세요');
      return;
    }

    const unCheckedQuotes = selectedQuotes.filter((id) => {
      const quote = quotes.find((q) => q.id === id);
      return quote?.stockStatus === 'NOT_CHECKED';
    });

    if (unCheckedQuotes.length === 0) {
      alert("가용 재고가 '미확인'인 견적을 선택해주세요.");
      return;
    }

    // React Query 트리거
    setIsSimulationTriggered(true);
  };

  // 시뮬레이션 결과 수신 후 모달 열기
  useEffect(() => {
    if (isSimulationTriggered && allSuccess && simulationResults.length > 0) {
      setShowSimulationModal(true);
      setIsSimulationTriggered(false); // 재트리거 방지
    }

    if (isSimulationTriggered && isError) {
      alert('시뮬레이션 결과를 가져오는데 실패했습니다.');
      setIsSimulationTriggered(false);
    }
  }, [isSimulationTriggered, allSuccess, isError, simulationResults.length]);

  // SimulationResultModal에서 다음 단계 데이터 (MPS Preview)를 받아와 두 번째 모달 열기
  const handleConfirmProposedDelivery = (previewData: QuotationPreviewResponse[]) => {
    setShowSimulationModal(false);
    setMpsPreviewData(previewData); // 데이터를 저장
    setShowMpsPreviewModal(true); // 두 번째 모달 열기
  };

  const handleConfirmMps = () => {
    setShowMpsPreviewModal(false);
    alert('MRP 실행이 시작되었습니다. MRP 탭에서 결과를 확인하세요.');
  };

  return (
    <div className="bg-white rounded-2xl p-6 space-y-6 shadow-sm">
      {/* ... (UI 및 테이블 렌더링은 동일) */}
      <div className="flex items-center justify-between">
        <h3 className="text-lg font-semibold text-gray-900">견적 관리</h3>
        <div className="flex items-center">
          <div className="flex gap-3 pr-5">
            <Dropdown
              items={AVAILABLE_STOCK_STATUS}
              value={selectedStockStatus}
              onChange={(status: AvailableStockStatus) => {
                setSelectedStockStatus(status);
              }}
            />
            <Dropdown
              items={QUOTATIONS_STATUS}
              value={selectedQuotationsStatus}
              onChange={(status: QuotationStatus) => {
                setSelectedQuotationsStatus(status);
              }}
            />
          </div>

          <IconButton
            label={isLoading ? '시뮬레이션 중...' : '시뮬레이션 실행'}
            icon={isLoading ? 'ri-loader-4-line animate-spin' : 'ri-play-line'}
            onClick={handleSimulation}
            disabled={selectedQuotes.length === 0 || isLoading}
          />
        </div>
      </div>

      <div className="bg-white border border-gray-200 rounded-lg overflow-hidden">
        <div className="overflow-x-auto">
          <table className="min-w-full divide-y divide-gray-200">
            <thead className="bg-gray-50">
              {/* ... (테이블 헤더) */}
              <tr>
                <th className="w-12 px-4 py-3">
                  <input
                    type="checkbox"
                    className="rounded border-gray-300 text-blue-600 focus:ring-blue-500"
                    onChange={(e) => {
                      if (e.target.checked) {
                        setSelectedQuotes(quotes.map((q) => q.id));
                      } else {
                        setSelectedQuotes([]);
                      }
                    }}
                  />
                </th>
                <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  견적 번호
                </th>
                <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  고객사
                </th>
                <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  제품
                </th>
                <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  요청 수량
                </th>
                <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  요청 납기
                </th>
                <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  가용 재고
                </th>
                <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  제안 납기
                </th>
                <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  상태
                </th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {quotes.map((quote) => (
                <tr key={quote.id} className="hover:bg-gray-50">
                  <td className="px-4 py-3">
                    <input
                      type="checkbox"
                      className="rounded border-gray-300 text-blue-600 focus:ring-blue-500"
                      checked={selectedQuotes.includes(quote.id)}
                      onChange={() => handleQuoteSelect(quote.id)}
                    />
                  </td>
                  <td className="px-4 py-3 text-sm font-medium text-gray-900">{quote.id}</td>
                  <td className="px-4 py-3 text-sm text-gray-900">{quote.customer}</td>
                  <td className="px-4 py-3 text-sm text-gray-900">{quote.product}</td>
                  <td className="px-4 py-3 text-sm text-gray-900">
                    {quote.requestQuantity.toLocaleString()}EA
                  </td>
                  <td className="px-4 py-3 text-sm text-gray-900">{quote.requestDelivery}</td>
                  <td className="px-4 py-3">{getStockStatusBadge(quote.stockStatus)}</td>
                  <td className="px-4 py-3 text-sm text-gray-900">
                    {quote.proposedDelivery || '-'}
                  </td>
                  <td className="px-4 py-3">{getStatusBadge(quote.status)}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* 시뮬레이션 결과 모달 (onConfirm에 데이터 전달 콜백 추가) */}
      {showSimulationModal && simulationResults.length > 0 && (
        <SimulationResultModal
          simulationResults={simulationResults}
          onClose={() => setShowSimulationModal(false)}
          onConfirm={handleConfirmProposedDelivery} // 콜백 함수
        />
      )}

      {/* MPS 생성 Preview 모달 (mpsPreviewData를 사용) */}
      {showMpsPreviewModal && mpsPreviewData.length > 0 && (
        <MpsPreviewModal
          previewResults={mpsPreviewData} // 새로운 state 사용
          onClose={() => setShowMpsPreviewModal(false)}
          onConfirm={handleConfirmMps}
        />
      )}
    </div>
  );
}
