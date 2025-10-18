'use client';

import { useState } from 'react';

export default function QuotationTab() {
  const [selectedQuotes, setSelectedQuotes] = useState<string[]>([]);
  const [showSimulationModal, setShowSimulationModal] = useState(false);
  const [showMpsPreviewModal, setShowMpsPreviewModal] = useState(false);
  const [simulationResult, setSimulationResult] = useState<any>(null);

  const quotes = [
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
      status: 'SIMULATED',
    },
  ];

  const getStatusBadge = (status: string) => {
    const statusConfig = {
      NEW: { label: '신규', class: 'bg-blue-100 text-blue-800' },
      SIMULATED: { label: '시뮬레이션', class: 'bg-yellow-100 text-yellow-800' },
      COMMITTED: { label: '확정', class: 'bg-green-100 text-green-800' },
      REJECTED: { label: '거절', class: 'bg-red-100 text-red-800' },
    };
    const config = statusConfig[status as keyof typeof statusConfig];
    return (
      <span className={`px-2 py-1 rounded-full text-xs font-medium ${config.class}`}>
        {config.label}
      </span>
    );
  };

  const getStockStatusBadge = (status: string) => {
    const statusConfig = {
      PASS: { label: '충족', class: 'bg-green-100 text-green-800' },
      FAIL: { label: '부족', class: 'bg-red-100 text-red-800' },
      NOT_CHECKED: { label: '미확인', class: 'bg-gray-100 text-gray-800' },
    };
    const config = statusConfig[status as keyof typeof statusConfig];
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
    const result = {
      selectedQuotes: failQuotes,
      mpsResult: failQuotes.map((id) => {
        const quote = quotes.find((q) => q.id === id);
        return {
          quoteId: id,
          customer: quote?.customer,
          product: quote?.product,
          quantity: quote?.requestQuantity,
          requestDelivery: quote?.requestDelivery,
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

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h3 className="text-lg font-semibold text-gray-900">견적 관리</h3>
        <div className="flex gap-2">
          <button
            onClick={handleSimulation}
            disabled={selectedQuotes.length === 0}
            className={`px-4 py-2 rounded-lg text-sm font-medium whitespace-nowrap transition-colors ${
              selectedQuotes.length > 0
                ? 'bg-purple-600 text-white hover:bg-purple-700 cursor-pointer'
                : 'bg-gray-300 text-gray-500 cursor-not-allowed'
            }`}
          >
            <i className="ri-play-line mr-1"></i>
            시뮬레이션 실행
          </button>
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
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white rounded-lg p-6 w-full max-w-4xl mx-4 max-h-[90vh] overflow-y-auto">
            <div className="flex items-center justify-between mb-6">
              <h3 className="text-xl font-semibold">MPS/MRP 시뮬레이션 결과</h3>
              <button
                onClick={() => setShowSimulationModal(false)}
                className="text-gray-400 hover:text-gray-600 cursor-pointer"
              >
                <i className="ri-close-line text-xl"></i>
              </button>
            </div>

            <div className="space-y-6">
              {simulationResult.mpsResult.map((result: any, index: number) => (
                <div key={index} className="border border-gray-200 rounded-lg p-4">
                  <div className="flex items-center justify-between mb-4">
                    <div>
                      <h4 className="text-lg font-semibold text-gray-900">{result.quoteId}</h4>
                      <p className="text-sm text-gray-600">
                        {result.customer} - {result.product}
                      </p>
                    </div>
                    <div className="text-right">
                      <div className="text-sm text-gray-600">수량: {result.quantity}EA</div>
                      <div className="text-sm text-gray-600">
                        요청 납기: {result.requestDelivery}
                      </div>
                      <div className="text-sm font-medium text-blue-600">
                        제안 납기: {result.proposedDelivery}
                      </div>
                    </div>
                  </div>

                  <div className="bg-red-50 border border-red-200 rounded-lg p-3">
                    <h5 className="text-sm font-semibold text-red-800 mb-2">부족 자재</h5>
                    <div className="space-y-1">
                      {result.materials.map((material: any, idx: number) => (
                        <div key={idx} className="flex justify-between text-sm">
                          <span className="text-red-700">{material.name}</span>
                          <span className="text-red-700 font-medium">
                            부족: {material.shortage} (필요: {material.required}, 보유:{' '}
                            {material.available})
                          </span>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              ))}

              <div className="flex gap-3 pt-4">
                <button
                  onClick={() => setShowSimulationModal(false)}
                  className="flex-1 px-4 py-2 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 transition-colors text-sm font-medium cursor-pointer"
                >
                  취소
                </button>
                <button
                  onClick={handleConfirmProposedDelivery}
                  className="flex-1 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors text-sm font-medium cursor-pointer"
                >
                  제안 납기 확정
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* MPS 생성 Preview 모달 */}
      {showMpsPreviewModal && simulationResult && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white rounded-lg p-6 w-full max-w-5xl mx-4 max-h-[90vh] overflow-y-auto">
            <div className="flex items-center justify-between mb-6">
              <h3 className="text-xl font-semibold">MPS 생성 Preview</h3>
              <button
                onClick={() => setShowMpsPreviewModal(false)}
                className="text-gray-400 hover:text-gray-600 cursor-pointer"
              >
                <i className="ri-close-line text-xl"></i>
              </button>
            </div>

            <div className="space-y-6">
              {simulationResult.mpsResult.map((result: any, index: number) => (
                <div key={index} className="border border-gray-200 rounded-lg p-4">
                  <h4 className="text-lg font-semibold text-gray-900 mb-4">
                    {result.product} - {result.customer}
                  </h4>

                  <div className="overflow-x-auto">
                    <table className="min-w-full border-collapse border border-gray-300">
                      <thead>
                        <tr className="bg-gray-50">
                          <th className="border border-gray-300 px-4 py-3 text-left text-sm font-medium text-gray-900">
                            구분
                          </th>
                          <th className="border border-gray-300 px-4 py-3 text-center text-sm font-medium text-gray-900">
                            2월 3주차
                          </th>
                          <th className="border border-gray-300 px-4 py-3 text-center text-sm font-medium text-gray-900">
                            2월 4주차
                          </th>
                          <th className="border border-gray-300 px-4 py-3 text-center text-sm font-medium text-gray-900">
                            3월 1주차
                          </th>
                          <th className="border border-gray-300 px-4 py-3 text-center text-sm font-medium text-gray-900">
                            3월 2주차
                          </th>
                        </tr>
                      </thead>
                      <tbody>
                        <tr>
                          <td className="border border-gray-300 px-4 py-3 text-sm font-medium text-gray-900 bg-gray-50">
                            수요
                          </td>
                          <td className="border border-gray-300 px-4 py-3 text-center text-sm text-gray-900">
                            0
                          </td>
                          <td className="border border-gray-300 px-4 py-3 text-center text-sm text-gray-900">
                            0
                          </td>
                          <td className="border border-gray-300 px-4 py-3 text-center text-sm text-gray-900">
                            {result.quantity}
                          </td>
                          <td className="border border-gray-300 px-4 py-3 text-center text-sm text-gray-900">
                            0
                          </td>
                        </tr>
                        <tr>
                          <td className="border border-gray-300 px-4 py-3 text-sm font-medium text-gray-900 bg-gray-50">
                            재고 필요량
                          </td>
                          <td className="border border-gray-300 px-4 py-3 text-center text-sm text-gray-900">
                            0
                          </td>
                          <td className="border border-gray-300 px-4 py-3 text-center text-sm text-gray-900">
                            0
                          </td>
                          <td className="border border-gray-300 px-4 py-3 text-center text-sm text-gray-900">
                            {result.quantity}
                          </td>
                          <td className="border border-gray-300 px-4 py-3 text-center text-sm text-gray-900">
                            0
                          </td>
                        </tr>
                        <tr>
                          <td className="border border-gray-300 px-4 py-3 text-sm font-medium text-gray-900 bg-gray-50">
                            생산 소요량
                          </td>
                          <td className="border border-gray-300 px-4 py-3 text-center text-sm text-gray-900">
                            {Math.floor(result.quantity * 0.6)}
                          </td>
                          <td className="border border-gray-300 px-4 py-3 text-center text-sm text-gray-900">
                            {Math.floor(result.quantity * 0.4)}
                          </td>
                          <td className="border border-gray-300 px-4 py-3 text-center text-sm text-gray-900">
                            0
                          </td>
                          <td className="border border-gray-300 px-4 py-3 text-center text-sm text-gray-900">
                            0
                          </td>
                        </tr>
                        <tr>
                          <td className="border border-gray-300 px-4 py-3 text-sm font-medium text-gray-900 bg-blue-50">
                            계획 생산 (MPS)
                          </td>
                          <td className="border border-gray-300 px-4 py-3 text-center text-sm font-semibold text-blue-700 bg-blue-50">
                            {Math.floor(result.quantity * 0.6)}
                          </td>
                          <td className="border border-gray-300 px-4 py-3 text-center text-sm font-semibold text-blue-700 bg-blue-50">
                            {Math.floor(result.quantity * 0.4)}
                          </td>
                          <td className="border border-gray-300 px-4 py-3 text-center text-sm font-semibold text-blue-700 bg-blue-50">
                            0
                          </td>
                          <td className="border border-gray-300 px-4 py-3 text-center text-sm font-semibold text-blue-700 bg-blue-50">
                            0
                          </td>
                        </tr>
                      </tbody>
                    </table>
                  </div>
                </div>
              ))}

              <div className="flex gap-3 pt-4">
                <button
                  onClick={() => setShowMpsPreviewModal(false)}
                  className="flex-1 px-4 py-2 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 transition-colors text-sm font-medium cursor-pointer"
                >
                  취소
                </button>
                <button
                  onClick={handleConfirmMps}
                  className="flex-1 px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 transition-colors text-sm font-medium cursor-pointer"
                >
                  MPS 확정
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
