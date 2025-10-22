'use client';

import Dropdown from '@/app/components/common/Dropdown';
import { useState } from 'react';
import {
  AVAILABLE_STOCK_STATUS,
  AvailableStockStatus,
  QUOTATIONS_STATUS,
  QuotationStatus,
} from '@/app/(private)/production/constants';
import IconButton from '@/app/components/common/IconButton';
import { Quote, SimulationResult } from '@/app/(private)/production/types/QuotationType';
import SimulationResultModal from '@/app/(private)/production/components/modals/SimulationResultModal';
import MpsPreviewModal from '@/app/(private)/production/components/modals/MpsPreviewModal';

export default function QuotationTab() {
  const [selectedQuotes, setSelectedQuotes] = useState<string[]>([]);
  const [showSimulationModal, setShowSimulationModal] = useState(false);
  const [showMpsPreviewModal, setShowMpsPreviewModal] = useState(false);
  const [simulationResult, setSimulationResult] = useState<SimulationResult | null>(null);

  const quotes: Quote[] = [
    {
      id: 'Q-2024-001',
      customer: '현대자동차',
      product: '도어패널',
      requestQuantity: 500,
      requestDelivery: '2024-02-15',
      stockStatus: 'NOT_CHECKED',
      proposedDelivery: '2024-02-20',
      status: 'NEW',
    },
    {
      id: 'Q-2024-002',
      customer: '기아자동차',
      product: 'Hood Panel',
      requestQuantity: 300,
      requestDelivery: '2024-02-10',
      stockStatus: 'NOT_CHECKED',
      proposedDelivery: '2024-02-10',
      status: 'COMMITTED',
    },
    {
      id: 'Q-2024-003',
      customer: '삼성전자',
      product: 'Fender Panel',
      requestQuantity: 200,
      requestDelivery: '2024-02-25',
      stockStatus: 'NOT_CHECKED',
      proposedDelivery: '',
      status: 'NEW',
    },
    {
      id: 'Q-2024-004',
      customer: 'LG전자',
      product: 'Trunk Lid',
      requestQuantity: 150,
      requestDelivery: '2024-03-01',
      stockStatus: 'NOT_CHECKED',
      proposedDelivery: '',
      status: 'NEW',
    },
    {
      id: 'Q-2024-005',
      customer: '포스코',
      product: 'Roof Panel',
      requestQuantity: 400,
      requestDelivery: '2024-02-28',
      stockStatus: 'NOT_CHECKED',
      proposedDelivery: '2024-03-05',
      status: 'COMMITTED',
    },
  ];

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
    const failQuotes = selectedQuotes.filter((id) => {
      const quote = quotes.find((q) => q.id === id);
      return quote?.stockStatus === 'FAIL';
    });

    if (failQuotes.length === 0) {
      alert('가용 재고가 FAIL인 견적을 선택해주세요.');
      return;
    }

    // 시뮬레이션 결과 생성
    const result: SimulationResult = {
      selectedQuotes: failQuotes,
      mpsResult: failQuotes.map((id) => {
        const quote = quotes.find((q) => q.id === id);
        return {
          quoteId: id,
          customer: quote?.customer || '',
          product: quote?.product || '',
          quantity: quote?.requestQuantity || 0,
          requestDelivery: quote?.requestDelivery || '',
          proposedDelivery: '2024-03-10',
          materials: [
            { name: '스테인리스 스틸', required: 100, available: 50, shortage: 50 },
            { name: '구리선', required: 200, available: 150, shortage: 50 },
            { name: '베어링', required: 50, available: 30, shortage: 20 },
          ],
        };
      }),
    };

    setSimulationResult(result);
    setShowSimulationModal(true);
  };

  const handleConfirmProposedDelivery = () => {
    setShowSimulationModal(false);
    setShowMpsPreviewModal(true);
  };

  const handleConfirmMps = () => {
    setShowMpsPreviewModal(false);
    alert('MRP 실행이 시작되었습니다. MRP 탭에서 결과를 확인하세요.');
  };

  const [selectedStockStatus, setSelectedStockStatus] = useState<AvailableStockStatus>('ALL');
  const [selectedQuotationsStatus, setSelectedQuotationsStatus] = useState<QuotationStatus>('ALL');

  return (
    <div className="bg-white rounded-2xl p-6 space-y-6 shadow-sm">
      <div className="flex items-center justify-between">
        <h3 className="text-lg font-semibold text-gray-900">견적 관리</h3>
        <div className="flex items-center">
          <div className="flex gap-3 pr-5">
            {/* 가용 재고 상태 드롭다운 */}
            <Dropdown
              items={AVAILABLE_STOCK_STATUS}
              value={selectedStockStatus}
              onChange={(status: AvailableStockStatus) => {
                setSelectedStockStatus(status);
              }}
            />
            {/* 견적 상태 드롭다운 */}
            <Dropdown
              items={QUOTATIONS_STATUS}
              value={selectedQuotationsStatus}
              onChange={(status: QuotationStatus) => {
                setSelectedQuotationsStatus(status);
              }}
            />
          </div>

          <IconButton
            label="시뮬레이션 실행"
            icon="ri-play-line"
            onClick={handleSimulation}
            disabled={selectedQuotes.length === 0}
          />
        </div>
      </div>

      <div className="bg-white border border-gray-200 rounded-lg overflow-hidden">
        <div className="overflow-x-auto">
          <table className="min-w-full divide-y divide-gray-200">
            <thead className="bg-gray-50">
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

      {/* 시뮬레이션 결과 모달 */}
      {showSimulationModal && simulationResult && (
        <SimulationResultModal
          simulationResult={simulationResult}
          onClose={() => setShowSimulationModal(false)}
          onConfirm={handleConfirmProposedDelivery}
        />
      )}

      {/* MPS 생성 Preview 모달 */}
      {showMpsPreviewModal && simulationResult && (
        <MpsPreviewModal
          simulationResult={simulationResult}
          onClose={() => setShowMpsPreviewModal(false)}
          onConfirm={handleConfirmMps}
        />
      )}
    </div>
  );
}
