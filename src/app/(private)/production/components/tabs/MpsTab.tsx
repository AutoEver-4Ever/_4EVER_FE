'use client';

import { useState } from 'react';

export default function MpsTab() {
  const [selectedProduct, setSelectedProduct] = useState('도어패널');
  const [viewType, setViewType] = useState('weekly');
  const [showDemandModal, setShowDemandModal] = useState(false);
  const [selectedWeek, setSelectedWeek] = useState<any>(null);

  const products = ['도어패널', 'Hood Panel', 'Fender Panel', 'Trunk Lid', 'Roof Panel'];

  // 제품별 주차별 데이터
  const productionData = {
    도어패널: {
      weeks: ['9월 1주차', '9월 2주차', '9월 3주차', '9월 4주차', '10월 1주차', '10월 2주차'],
      data: [
        { week: '9월 1주차', demand: 0, inventory: 0, production: 0, mps: 0, leadTime: 2 },
        { week: '9월 2주차', demand: 0, inventory: 0, production: 0, mps: 0, leadTime: 2 },
        { week: '9월 3주차', demand: 0, inventory: 20, production: 20, mps: 20, leadTime: 2 },
        { week: '9월 4주차', demand: 0, inventory: 15, production: 15, mps: 15, leadTime: 2 },
        { week: '10월 1주차', demand: 20, inventory: 20, production: 0, mps: 20, leadTime: 2 },
        { week: '10월 2주차', demand: 15, inventory: 15, production: 0, mps: 15, leadTime: 2 },
      ],
    },
    'Hood Panel': {
      weeks: ['9월 1주차', '9월 2주차', '9월 3주차', '9월 4주차', '10월 1주차', '10월 2주차'],
      data: [
        { week: '9월 1주차', demand: 0, inventory: 0, production: 0, mps: 0, leadTime: 3 },
        { week: '9월 2주차', demand: 0, inventory: 0, production: 0, mps: 0, leadTime: 3 },
        { week: '9월 3주차', demand: 15, inventory: 15, production: 15, mps: 15, leadTime: 3 },
        { week: '9월 4주차', demand: 10, inventory: 10, production: 10, mps: 10, leadTime: 3 },
        { week: '10월 1주차', demand: 25, inventory: 25, production: 0, mps: 25, leadTime: 3 },
        { week: '10월 2주차', demand: 20, inventory: 20, production: 0, mps: 20, leadTime: 3 },
      ],
    },
    'Fender Panel': {
      weeks: ['9월 1주차', '9월 2주차', '9월 3주차', '9월 4주차', '10월 1주차', '10월 2주차'],
      data: [
        { week: '9월 1주차', demand: 0, inventory: 0, production: 0, mps: 0, leadTime: 1 },
        { week: '9월 2주차', demand: 5, inventory: 5, production: 5, mps: 5, leadTime: 1 },
        { week: '9월 3주차', demand: 12, inventory: 12, production: 12, mps: 12, leadTime: 1 },
        { week: '9월 4주차', demand: 8, inventory: 8, production: 8, mps: 8, leadTime: 1 },
        { week: '10월 1주차', demand: 18, inventory: 18, production: 0, mps: 18, leadTime: 1 },
        { week: '10월 2주차', demand: 15, inventory: 15, production: 0, mps: 15, leadTime: 1 },
      ],
    },
    'Trunk Lid': {
      weeks: ['9월 1주차', '9월 2주차', '9월 3주차', '9월 4주차', '10월 1주차', '10월 2주차'],
      data: [
        { week: '9월 1주차', demand: 0, inventory: 0, production: 0, mps: 0, leadTime: 2 },
        { week: '9월 2주차', demand: 0, inventory: 0, production: 0, mps: 0, leadTime: 2 },
        { week: '9월 3주차', demand: 8, inventory: 8, production: 8, mps: 8, leadTime: 2 },
        { week: '9월 4주차', demand: 6, inventory: 6, production: 6, mps: 6, leadTime: 2 },
        { week: '10월 1주차', demand: 12, inventory: 12, production: 0, mps: 12, leadTime: 2 },
        { week: '10월 2주차', demand: 10, inventory: 10, production: 0, mps: 10, leadTime: 2 },
      ],
    },
    'Roof Panel': {
      weeks: ['9월 1주차', '9월 2주차', '9월 3주차', '9월 4주차', '10월 1주차', '10월 2주차'],
      data: [
        { week: '9월 1주차', demand: 0, inventory: 0, production: 0, mps: 0, leadTime: 4 },
        { week: '9월 2주차', demand: 3, inventory: 3, production: 3, mps: 3, leadTime: 4 },
        { week: '9월 3주차', demand: 10, inventory: 10, production: 10, mps: 10, leadTime: 4 },
        { week: '9월 4주차', demand: 7, inventory: 7, production: 7, mps: 7, leadTime: 4 },
        { week: '10월 1주차', demand: 15, inventory: 15, production: 0, mps: 15, leadTime: 4 },
        { week: '10월 2주차', demand: 12, inventory: 12, production: 0, mps: 12, leadTime: 4 },
      ],
    },
  };

  const currentData = productionData[selectedProduct as keyof typeof productionData];

  const handleWeekClick = (weekData: any) => {
    if (weekData.demand > 0) {
      setSelectedWeek(weekData);
      setShowDemandModal(true);
    }
  };

  const getDemandSource = (week: string) => {
    const sources = [
      { quote: 'Q-2024-001', customer: '현대자동차', quantity: 300 },
      { quote: 'Q-2024-002', customer: '기아자동차', quantity: 200 },
    ];
    return sources;
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h3 className="text-lg font-semibold text-gray-900">주생산계획 (MPS)</h3>
        <div className="flex gap-2">
          <button
            onClick={() => setViewType('monthly')}
            className={`px-3 py-1 rounded text-sm font-medium whitespace-nowrap cursor-pointer ${
              viewType === 'monthly'
                ? 'bg-blue-600 text-white'
                : 'bg-gray-200 text-gray-700 hover:bg-gray-300'
            }`}
          >
            월별
          </button>
          <button
            onClick={() => setViewType('weekly')}
            className={`px-3 py-1 rounded text-sm font-medium whitespace-nowrap cursor-pointer ${
              viewType === 'weekly'
                ? 'bg-blue-600 text-white'
                : 'bg-gray-200 text-gray-700 hover:bg-gray-300'
            }`}
          >
            주차별
          </button>
          <button
            onClick={() => setViewType('yearly')}
            className={`px-3 py-1 rounded text-sm font-medium whitespace-nowrap cursor-pointer ${
              viewType === 'yearly'
                ? 'bg-blue-600 text-white'
                : 'bg-gray-200 text-gray-700 hover:bg-gray-300'
            }`}
          >
            연도별
          </button>
        </div>
      </div>

      {/* 제품 선택 드롭다운 */}
      <div className="mb-6">
        <label className="block text-sm font-medium text-gray-700 mb-2">제품 선택</label>
        <select
          className="w-64 px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent text-sm pr-8"
          value={selectedProduct}
          onChange={(e) => setSelectedProduct(e.target.value)}
        >
          {products.map((product) => (
            <option key={product} value={product}>
              {product}
            </option>
          ))}
        </select>
      </div>

      {/* 생산계획 표 */}
      <div className="bg-white border border-gray-200 rounded-lg overflow-hidden">
        <div className="overflow-x-auto">
          <table className="min-w-full border-collapse border border-gray-300">
            <thead>
              <tr className="bg-gray-50">
                <th className="border border-gray-300 px-4 py-3 text-left text-sm font-medium text-gray-900">
                  구분
                </th>
                {currentData.weeks.map((week, index) => (
                  <th
                    key={`week-${index}`}
                    className="border border-gray-300 px-4 py-3 text-center text-sm font-medium text-gray-900"
                  >
                    {week}
                  </th>
                ))}
              </tr>
            </thead>
            <tbody>
              <tr className="hover:bg-gray-50">
                <td className="border border-gray-300 px-4 py-3 text-sm font-medium text-gray-900 bg-gray-50">
                  수요
                </td>
                {currentData.data.map((item, index) => (
                  <td
                    key={`demand-${index}`}
                    className={`border border-gray-300 px-4 py-3 text-center text-sm text-gray-900 ${
                      item.demand > 0 ? 'cursor-pointer hover:bg-blue-50' : ''
                    }`}
                    onClick={() => handleWeekClick(item)}
                  >
                    {item.demand || '-'}
                  </td>
                ))}
              </tr>
              <tr className="hover:bg-gray-50">
                <td className="border border-gray-300 px-4 py-3 text-sm font-medium text-gray-900 bg-gray-50">
                  재고 필요량
                </td>
                {currentData.data.map((item, index) => (
                  <td
                    key={`inventory-${index}`}
                    className="border border-gray-300 px-4 py-3 text-center text-sm text-gray-900"
                  >
                    {item.inventory || '-'}
                  </td>
                ))}
              </tr>
              <tr className="hover:bg-gray-50">
                <td className="border border-gray-300 px-4 py-3 text-sm font-medium text-gray-900 bg-gray-50">
                  생산 소요량
                </td>
                {currentData.data.map((item, index) => (
                  <td
                    key={`production-${index}`}
                    className="border border-gray-300 px-4 py-3 text-center text-sm text-gray-900"
                  >
                    {item.production || '-'}
                  </td>
                ))}
              </tr>
              <tr className="hover:bg-gray-50">
                <td className="border border-gray-300 px-4 py-3 text-sm font-medium text-gray-900 bg-blue-50">
                  계획 생산 (MPS)
                </td>
                {currentData.data.map((item, index) => (
                  <td
                    key={`mps-${index}`}
                    className="border border-gray-300 px-4 py-3 text-center text-sm font-semibold text-blue-700 bg-blue-50"
                  >
                    {item.mps || '-'}
                  </td>
                ))}
              </tr>
              <tr className="hover:bg-gray-50">
                <td className="border border-gray-300 px-4 py-3 text-sm font-medium text-gray-900 bg-gray-50">
                  생산 리드 타임
                </td>
                {currentData.data.map((item, index) => (
                  <td
                    key={`leadtime-${index}`}
                    className="border border-gray-300 px-4 py-3 text-center text-sm text-gray-900"
                  >
                    {item.leadTime}주
                  </td>
                ))}
              </tr>
            </tbody>
          </table>
        </div>
      </div>

      {/* 수요 출처 모달 */}
      {showDemandModal && selectedWeek && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white rounded-lg p-6 w-full max-w-2xl mx-4 max-h-[90vh] overflow-y-auto">
            <div className="flex items-center justify-between mb-6">
              <h3 className="text-xl font-semibold">{selectedWeek.week} 수요 출처</h3>
              <button
                onClick={() => setShowDemandModal(false)}
                className="text-gray-400 hover:text-gray-600 cursor-pointer"
              >
                <i className="ri-close-line text-xl"></i>
              </button>
            </div>

            <div className="space-y-4">
              <div className="bg-blue-50 p-4 rounded-lg">
                <h4 className="font-medium text-blue-900 mb-2">수요 요약</h4>
                <div className="grid grid-cols-2 gap-4 text-sm">
                  <div>
                    <span className="text-blue-600">제품:</span>
                    <span className="ml-2 font-medium">{selectedProduct}</span>
                  </div>
                  <div>
                    <span className="text-blue-600">총 수요량:</span>
                    <span className="ml-2 font-medium">{selectedWeek.demand}EA</span>
                  </div>
                </div>
              </div>

              <div className="overflow-x-auto">
                <table className="min-w-full divide-y divide-gray-200">
                  <thead className="bg-gray-50">
                    <tr>
                      <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                        견적서 번호
                      </th>
                      <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                        고객사
                      </th>
                      <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                        수량
                      </th>
                      <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                        비율
                      </th>
                    </tr>
                  </thead>
                  <tbody className="bg-white divide-y divide-gray-200">
                    {getDemandSource(selectedWeek.week).map((source, index) => (
                      <tr key={index} className="hover:bg-gray-50">
                        <td className="px-4 py-3 text-sm font-medium text-blue-600">
                          {source.quote}
                        </td>
                        <td className="px-4 py-3 text-sm text-gray-900">{source.customer}</td>
                        <td className="px-4 py-3 text-sm text-gray-900">{source.quantity}EA</td>
                        <td className="px-4 py-3 text-sm text-gray-900">
                          {Math.round((source.quantity / selectedWeek.demand) * 100)}%
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>

            <div className="flex justify-end mt-6">
              <button
                onClick={() => setShowDemandModal(false)}
                className="px-4 py-2 bg-gray-600 text-white rounded-lg hover:bg-gray-700 transition-colors text-sm font-medium cursor-pointer"
              >
                닫기
              </button>
            </div>
          </div>
        </div>
      )}

      {/* 요약 정보 */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <div className="bg-blue-50 p-4 rounded-lg">
          <div className="text-sm text-blue-600 font-medium">총 계획 생산량</div>
          <div className="text-2xl font-bold text-blue-700">
            {currentData.data.reduce((sum, item) => sum + item.mps, 0)}
          </div>
        </div>
        <div className="bg-green-50 p-4 rounded-lg">
          <div className="text-sm text-green-600 font-medium">총 수요량</div>
          <div className="text-2xl font-bold text-green-700">
            {currentData.data.reduce((sum, item) => sum + item.demand, 0)}
          </div>
        </div>
        <div className="bg-yellow-50 p-4 rounded-lg">
          <div className="text-sm text-yellow-600 font-medium">생산 주차</div>
          <div className="text-2xl font-bold text-yellow-700">
            {currentData.data.filter((item) => item.production > 0).length}주
          </div>
        </div>
        <div className="bg-purple-50 p-4 rounded-lg">
          <div className="text-sm text-purple-600 font-medium">평균 리드 타임</div>
          <div className="text-2xl font-bold text-purple-700">
            {Math.round(
              currentData.data.reduce((sum, item) => sum + item.leadTime, 0) /
                currentData.weeks.length,
            )}
            주
          </div>
        </div>
      </div>
    </div>
  );
}
