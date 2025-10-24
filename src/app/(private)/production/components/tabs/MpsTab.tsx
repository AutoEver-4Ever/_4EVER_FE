'use client';

import DateRangePicker from '@/app/components/common/DateRangePicker';
import Dropdown from '@/app/components/common/Dropdown';
import { useMemo, useState } from 'react';
import { PRODUCTS } from '@/app/(private)/production/constants';
import { ProductType } from '@/app/(private)/production/types/MpsType';

import { useQuery } from '@tanstack/react-query';
import { fetchMpsList } from '@/app/(private)/production/api/production.api';
import { MpsListResponse } from '@/app/(private)/production/types/MpsApiType';

export default function MpsTab() {
  const [selectedProduct, setSelectedProduct] = useState<ProductType>('ALL');
  const [startDate, setStartDate] = useState('');
  const [endDate, setEndDate] = useState('');

  // React Query를 사용하여 MPS 데이터 조회
  const queryParams = useMemo(
    () => ({
      itemId: selectedProduct !== 'ALL' ? selectedProduct : undefined,
      startdate: startDate,
      enddate: endDate,
    }),
    [selectedProduct, startDate, endDate],
  );

  const {
    data: currentData,
    isLoading,
    isError,
    refetch,
  } = useQuery<MpsListResponse>({
    queryKey: ['mpsList', queryParams],
    queryFn: () => fetchMpsList(queryParams),
    enabled: selectedProduct !== 'ALL',
  });

  // 테이블 데이터를 렌더링하는 헬퍼 함수
  const renderTableRow = (
    label: string,
    dataArray: (number | null)[],
    isClickable: boolean,
    isHighlight: boolean = false,
  ) => {
    return (
      <tr className="hover:bg-gray-50">
        <td
          className={`border border-gray-300 px-4 py-3 text-sm font-medium text-gray-900 ${isHighlight ? 'bg-blue-50' : 'bg-gray-50'}`}
        >
          {label}
        </td>
        {currentData!.periods.map((week, index) => {
          const value = dataArray[index];
          const isDemandClickable = isClickable && value && value > 0;

          return (
            <td
              key={`${label}-${index}`}
              className={`border border-gray-300 px-4 py-3 text-center text-sm ${
                isHighlight ? 'font-semibold text-blue-700 bg-blue-50' : 'text-gray-900'
              } ${isDemandClickable ? 'cursor-pointer hover:bg-blue-50' : ''}`}
            >
              {value !== null ? value : '-'}
            </td>
          );
        })}
      </tr>
    );
  };

  // 리드 타임 배열은 API에 없으므로 별도 헬퍼 함수로 처리
  const renderLeadTimeRow = () => {
    // API에 리드 타임 데이터가 없으므로, 임시로 2주를 하드코딩하거나
    // 이 정보를 다른 API에서 가져와야 합니다.
    const fixedLeadTime = 2; // 임시 리드 타임

    if (!currentData) return null;

    return (
      <tr className="hover:bg-gray-50">
        <td className="border border-gray-300 px-4 py-3 text-sm font-medium text-gray-900 bg-gray-50">
          생산 리드 타임
        </td>
        {currentData.periods.map((week, index) => (
          <td
            key={`leadtime-${index}`}
            className="border border-gray-300 px-4 py-3 text-center text-sm text-gray-900"
          >
            {fixedLeadTime}주
          </td>
        ))}
      </tr>
    );
  };

  return (
    <div className="bg-white rounded-2xl p-6 space-y-6 shadow-sm">
      <div className="flex items-center justify-between">
        <h3 className="text-lg font-semibold text-gray-900">주생산계획 (MPS)</h3>
      </div>

      {/* 제품 선택 드롭다운 및 날짜 선택 */}
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

      {/* 로딩 및 에러 상태 처리 */}
      {isLoading && (
        <div className="bg-white border border-gray-200 rounded-lg p-12 text-center">
          <i className="ri-loader-4-line animate-spin text-4xl text-blue-500 mb-4"></i>
          <p className="text-gray-500 text-lg">MPS 데이터를 불러오는 중입니다...</p>
        </div>
      )}

      {isError && (
        <div className="bg-white border border-gray-200 rounded-lg p-12 text-center text-red-600">
          <i className="ri-error-warning-line text-4xl mb-4"></i>
          <p className="text-lg">데이터를 불러오는 데 실패했습니다.</p>
          <button
            onClick={() => refetch()}
            className="mt-4 px-4 py-2 bg-red-500 text-white rounded hover:bg-red-600"
          >
            다시 시도
          </button>
        </div>
      )}

      {/* 생산계획 표 (데이터 로드 성공 시) */}
      {!isLoading && !isError && currentData ? (
        <div className="bg-white border border-gray-200 rounded-lg overflow-hidden">
          <div className="overflow-x-auto">
            <table className="min-w-full border-collapse border border-gray-300">
              <thead>
                <tr className="bg-gray-50">
                  <th className="border border-gray-300 px-4 py-3 text-left text-sm font-medium text-gray-900">
                    구분
                  </th>
                  {currentData.periods.map((week, index) => (
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
                {/* 1. 수요 (Demand) */}
                {renderTableRow('수요', currentData.demand, true)}

                {/* 2. 재고 필요량 (Required Inventory) */}
                {renderTableRow('재고 필요량', currentData.requiredInventory, false)}

                {/* 3. 생산 소요량 (Production Needed) */}
                {renderTableRow('생산 소요량', currentData.productionNeeded, false)}

                {/* 4. 계획 생산 (Planned Production / MPS) */}
                {renderTableRow('계획 생산 (MPS)', currentData.plannedProduction, false, true)}

                {/* 5. 생산 리드 타임 (Lead Time) */}
                {renderLeadTimeRow()}
              </tbody>
            </table>
          </div>
        </div>
      ) : (
        !isLoading &&
        !isError &&
        selectedProduct !== 'ALL' && (
          <div className="bg-white border border-gray-200 rounded-lg p-12 text-center">
            <i className="ri-search-line text-6xl text-gray-300 mb-4"></i>
            <p className="text-gray-500 text-lg">조회된 MPS 데이터가 없습니다.</p>
          </div>
        )
      )}

      {/* '제품을 선택해주세요' 메시지 (selectedProduct === 'ALL'일 때) */}
      {selectedProduct === 'ALL' && (
        <div className="bg-white border border-gray-200 rounded-lg p-12 text-center">
          <i className="ri-folder-open-line text-6xl text-gray-300 mb-4"></i>
          <p className="text-gray-500 text-lg">제품을 선택해주세요</p>
        </div>
      )}
    </div>
  );
}
