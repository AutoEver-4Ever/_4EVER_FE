'use client';

import DateRangePicker from '@/app/components/common/DateRangePicker';
import Dropdown from '@/app/components/common/Dropdown';
import { useState } from 'react';
import { PRODUCTS } from '@/app/(private)/production/constants';
import {
  ProductionDataMap,
  ProductType,
  WeeklyProductionData,
  DemandSource,
} from '@/app/(private)/production/types/MpsType';
import DemandSourceModal from '@/app/(private)/production/components/modals/DemandSourceModal';

export default function MpsTab() {
  const [selectedProduct, setSelectedProduct] = useState<ProductType>('ALL');
  const [showDemandModal, setShowDemandModal] = useState(false);
  const [selectedWeek, setSelectedWeek] = useState<WeeklyProductionData | null>(null);

  const [startDate, setStartDate] = useState('');
  const [endDate, setEndDate] = useState('');

  // 제품별 주차별 데이터
  const productionData: ProductionDataMap = {
    DOOR_PANEL: {
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
    HOOD_PANEL: {
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
    FENDER_PANEL: {
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
    TRUNK_LID: {
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
    ROOF_PANEL: {
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

  // ALL이 아닌 경우만 데이터 표시
  const currentData = selectedProduct !== 'ALL' ? productionData[selectedProduct] : null;

  const handleWeekClick = (weekData: WeeklyProductionData) => {
    if (weekData.demand > 0) {
      setSelectedWeek(weekData);
      setShowDemandModal(true);
    }
  };

  const getDemandSource = (week: string): DemandSource[] => {
    // 실제로는 API에서 가져와야 하지만, 지금은 더미 데이터
    const sources: DemandSource[] = [
      { quote: 'Q-2024-001', customer: '현대자동차', quantity: 300 },
      { quote: 'Q-2024-002', customer: '기아자동차', quantity: 200 },
    ];
    return sources;
  };

  const getProductName = (productType: ProductType): string => {
    const product = PRODUCTS.find((p) => p.key === productType);
    return product?.value || productType;
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h3 className="text-lg font-semibold text-gray-900">주생산계획 (MPS)</h3>
      </div>

      {/* 제품 선택 드롭다운 */}
      <div className="flex justify-between gap-4">
        <Dropdown
          items={PRODUCTS}
          value={selectedProduct}
          onChange={(product: ProductType) => {
            setSelectedProduct(product);
          }}
        />

        <DateRangePicker
          startDate={startDate}
          onStartDateChange={setStartDate}
          endDate={endDate}
          onEndDateChange={setEndDate}
        />
      </div>

      {/* 생산계획 표 */}
      {currentData ? (
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
      ) : (
        <div className="bg-white border border-gray-200 rounded-lg p-12 text-center">
          <i className="ri-folder-open-line text-6xl text-gray-300 mb-4"></i>
          <p className="text-gray-500 text-lg">제품을 선택해주세요</p>
        </div>
      )}

      {/* 수요 출처 모달 */}
      {showDemandModal && selectedWeek && (
        <DemandSourceModal
          selectedWeek={selectedWeek}
          productName={getProductName(selectedProduct)}
          demandSources={getDemandSource(selectedWeek.week)}
          onClose={() => setShowDemandModal(false)}
        />
      )}
    </div>
  );
}
