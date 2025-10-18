'use client';

import { useState } from 'react';

export default function MrpCalculation() {
  const [showCalculationModal, setShowCalculationModal] = useState(false);
  const [showDetailModal, setShowDetailModal] = useState(false);
  const [selectedPlan, setSelectedPlan] = useState('');
  const [selectedMrpResult, setSelectedMrpResult] = useState<any>(null);

  const mrpResults = [
    {
      id: 'MRP-001',
      planId: 'MPS-001',
      productName: '산업용 모터 5HP',
      calculationDate: '2024-01-15',
      status: 'completed',
      totalMaterials: 4,
      shortageItems: 1,
      totalCost: 4250000,
      materials: [
        {
          code: 'STEEL-001',
          name: '스테인리스 스틸',
          required: 100,
          available: 150,
          shortage: 0,
          orderDate: '2024-01-18',
          deliveryDate: '2024-01-25',
          unit: 'KG',
        },
        {
          code: 'COPPER-001',
          name: '구리선',
          required: 250,
          available: 200,
          shortage: 50,
          orderDate: '2024-01-16',
          deliveryDate: '2024-01-20',
          unit: 'M',
        },
        {
          code: 'BEARING-001',
          name: '베어링 6205',
          required: 200,
          available: 180,
          shortage: 20,
          orderDate: '2024-01-17',
          deliveryDate: '2024-01-22',
          unit: 'EA',
        },
        {
          code: 'BOLT-001',
          name: '볼트 M8x20',
          required: 600,
          available: 800,
          shortage: 0,
          orderDate: null,
          deliveryDate: null,
          unit: 'EA',
        },
      ],
      mrpSchedule: {
        'STEEL-001': {
          weeks: ['9월 1주차', '9월 2주차', '9월 3주차', '9월 4주차', '10월 1주차', '10월 2주차'],
          data: [
            { type: '필요 수량', values: [40, 0, 0, 0, 0, 0] },
            { type: '필요 시점', values: ['9월 3주차', '', '', '', '', ''] },
            { type: '리드타임', values: ['2주', '', '', '', '', ''] },
            { type: '최소 발주 시점', values: ['9월 1주차', '', '', '', '', ''] },
          ],
        },
        'COPPER-001': {
          weeks: ['9월 1주차', '9월 2주차', '9월 3주차', '9월 4주차', '10월 1주차', '10월 2주차'],
          data: [
            { type: '필요 수량', values: [20, 0, 0, 0, 0, 0] },
            { type: '필요 시점', values: ['9월 3주차', '', '', '', '', ''] },
            { type: '리드타임', values: ['2주', '', '', '', '', ''] },
            { type: '최소 발주 시점', values: ['9월 1주차', '', '', '', '', ''] },
          ],
        },
        'BEARING-001': {
          weeks: ['9월 1주차', '9월 2주차', '9월 3주차', '9월 4주차', '10월 1주차', '10월 2주차'],
          data: [
            { type: '필요 수량', values: [1, 0, 0, 0, 0, 0] },
            { type: '필요 시점', values: ['9월 3주차', '', '', '', '', ''] },
            { type: '리드타임', values: ['1주', '', '', '', '', ''] },
            { type: '최소 발주 시점', values: ['9월 2주차', '', '', '', '', ''] },
          ],
        },
        'BOLT-001': {
          weeks: ['9월 1주차', '9월 2주차', '9월 3주차', '9월 4주차', '10월 1주차', '10월 2주차'],
          data: [
            { type: '필요 수량', values: [0.4, 0, 0, 0, 0, 0] },
            { type: '필요 시점', values: ['9월 3주차', '', '', '', '', ''] },
            { type: '리드타임', values: ['1주', '', '', '', '', ''] },
            { type: '최소 발주 시점', values: ['9월 2주차', '', '', '', '', ''] },
          ],
        },
      },
    },
    {
      id: 'MRP-002',
      planId: 'MPS-002',
      productName: '알루미늄 프레임',
      calculationDate: '2024-01-14',
      status: 'pending',
      totalMaterials: 3,
      shortageItems: 2,
      totalCost: 1750000,
      materials: [
        {
          code: 'AL-001',
          name: '알루미늄 프로파일',
          required: 80,
          available: 60,
          shortage: 20,
          orderDate: '2024-01-16',
          deliveryDate: '2024-01-22',
          unit: 'M',
        },
        {
          code: 'SCREW-001',
          name: '나사 M6x15',
          required: 320,
          available: 200,
          shortage: 120,
          orderDate: '2024-01-17',
          deliveryDate: '2024-01-20',
          unit: 'EA',
        },
        {
          code: 'BRACKET-001',
          name: '브라켓',
          required: 40,
          available: 50,
          shortage: 0,
          orderDate: null,
          deliveryDate: null,
          unit: 'EA',
        },
      ],
      mrpSchedule: {
        'AL-001': {
          weeks: ['9월 1주차', '9월 2주차', '9월 3주차', '9월 4주차', '10월 1주차', '10월 2주차'],
          data: [
            { type: '필요 수량', values: [20, 0, 0, 0, 0, 0] },
            { type: '필요 시점', values: ['9월 3주차', '', '', '', '', ''] },
            { type: '리드타임', values: ['2주', '', '', '', '', ''] },
            { type: '최소 발주 시점', values: ['9월 1주차', '', '', '', '', ''] },
          ],
        },
        'SCREW-001': {
          weeks: ['9월 1주차', '9월 2주차', '9월 3주차', '9월 4주차', '10월 1주차', '10월 2주차'],
          data: [
            { type: '필요 수량', values: [20, 0, 0, 0, 0, 0] },
            { type: '필요 시점', values: ['9월 3주차', '', '', '', '', ''] },
            { type: '리드타임', values: ['1주', '', '', '', '', ''] },
            { type: '최소 발주 시점', values: ['9월 2주차', '', '', '', '', ''] },
          ],
        },
        'BRACKET-001': {
          weeks: ['9월 1주차', '9월 2주차', '9월 3주차', '9월 4주차', '10월 1주차', '10월 2주차'],
          data: [
            { type: '필요 수량', values: [2, 0, 0, 0, 0, 0] },
            { type: '필요 시점', values: ['9월 3주차', '', '', '', '', ''] },
            { type: '리드타임', values: ['1주', '', '', '', '', ''] },
            { type: '최소 발주 시점', values: ['9월 2주차', '', '', '', '', ''] },
          ],
        },
      },
    },
  ];

  const getStatusBadge = (status: string) => {
    const statusConfig = {
      completed: { label: '완료', class: 'bg-green-100 text-green-800' },
      pending: { label: '대기', class: 'bg-yellow-100 text-yellow-800' },
      processing: { label: '처리중', class: 'bg-blue-100 text-blue-800' },
    };
    const config = statusConfig[status as keyof typeof statusConfig];
    return (
      <span className={`px-2 py-1 rounded-full text-xs font-medium ${config.class}`}>
        {config.label}
      </span>
    );
  };

  const handleDetailView = (result: any) => {
    setSelectedMrpResult(result);
    setShowDetailModal(true);
  };

  return (
    <div className="bg-white rounded-lg shadow-sm border">
      <div className="p-6 border-b border-gray-200">
        <div className="flex items-center justify-between">
          <h2 className="text-lg font-semibold text-gray-900">자재소요계획 (MRP)</h2>
          <button
            onClick={() => setShowCalculationModal(true)}
            className="px-3 py-2 bg-purple-600 text-white rounded-lg hover:bg-purple-700 transition-colors cursor-pointer text-sm font-medium whitespace-nowrap"
          >
            <i className="ri-calculator-line mr-1"></i>
            MRP 실행
          </button>
        </div>
      </div>

      <div className="p-6">
        <div className="space-y-4">
          {mrpResults.map((result) => (
            <div key={result.id} className="border border-gray-200 rounded-lg p-4 hover:bg-gray-50">
              <div className="flex items-center justify-between mb-3">
                <div>
                  <div className="text-sm font-medium text-gray-900">{result.id}</div>
                  <div className="text-xs text-gray-500">{result.productName}</div>
                </div>
                {getStatusBadge(result.status)}
              </div>

              <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-3">
                <div>
                  <div className="text-xs text-gray-500">총 자재</div>
                  <div className="text-sm font-medium text-gray-900">{result.totalMaterials}개</div>
                </div>
                <div>
                  <div className="text-xs text-gray-500">부족 품목</div>
                  <div
                    className={`text-sm font-medium ${result.shortageItems > 0 ? 'text-red-600' : 'text-green-600'}`}
                  >
                    {result.shortageItems}개
                  </div>
                </div>
                <div>
                  <div className="text-xs text-gray-500">총 비용</div>
                  <div className="text-sm font-medium text-gray-900">
                    ₩{result.totalCost.toLocaleString()}
                  </div>
                </div>
                <div>
                  <div className="text-xs text-gray-500">계산일</div>
                  <div className="text-sm text-gray-900">{result.calculationDate}</div>
                </div>
              </div>

              {result.shortageItems > 0 && (
                <div className="bg-red-50 border border-red-200 rounded-lg p-3 mb-3">
                  <div className="flex items-center">
                    <i className="ri-alert-line text-red-600 mr-2"></i>
                    <span className="text-sm text-red-800">
                      {result.shortageItems}개 품목에서 재고 부족이 예상됩니다.
                    </span>
                  </div>
                </div>
              )}

              <div className="flex gap-2">
                <button
                  onClick={() => handleDetailView(result)}
                  className="text-xs text-blue-600 hover:text-blue-800 cursor-pointer"
                >
                  <i className="ri-eye-line mr-1"></i>상세보기
                </button>
                <button className="text-xs text-green-600 hover:text-green-800 cursor-pointer">
                  <i className="ri-shopping-cart-line mr-1"></i>발주생성
                </button>
                <button className="text-xs text-purple-600 hover:text-purple-800 cursor-pointer">
                  <i className="ri-refresh-line mr-1"></i>재계산
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* MRP 상세보기 모달 */}
      {showDetailModal && selectedMrpResult && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white rounded-lg p-6 w-full max-w-6xl mx-4 max-h-[90vh] overflow-y-auto">
            <div className="flex items-center justify-between mb-6">
              <h3 className="text-xl font-semibold">MRP 상세 정보 - {selectedMrpResult.id}</h3>
              <button
                onClick={() => setShowDetailModal(false)}
                className="text-gray-400 hover:text-gray-600 cursor-pointer"
              >
                <i className="ri-close-line text-xl"></i>
              </button>
            </div>

            <div className="space-y-6">
              {/* 기본 정보 */}
              <div className="bg-gray-50 p-4 rounded-lg">
                <h4 className="text-lg font-semibold text-gray-900 mb-3">기본 정보</h4>
                <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                  <div>
                    <div className="text-sm text-gray-600">제품명</div>
                    <div className="text-sm font-medium text-gray-900">
                      {selectedMrpResult.productName}
                    </div>
                  </div>
                  <div>
                    <div className="text-sm text-gray-600">계획 ID</div>
                    <div className="text-sm font-medium text-gray-900">
                      {selectedMrpResult.planId}
                    </div>
                  </div>
                  <div>
                    <div className="text-sm text-gray-600">계산일</div>
                    <div className="text-sm font-medium text-gray-900">
                      {selectedMrpResult.calculationDate}
                    </div>
                  </div>
                  <div>
                    <div className="text-sm text-gray-600">상태</div>
                    {getStatusBadge(selectedMrpResult.status)}
                  </div>
                </div>
              </div>

              {/* BOM 목록 */}
              <div>
                <h4 className="text-lg font-semibold text-gray-900 mb-4">BOM 목록</h4>
                <div className="overflow-x-auto">
                  <table className="min-w-full divide-y divide-gray-200">
                    <thead className="bg-gray-50">
                      <tr>
                        <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                          구성품명
                        </th>
                        <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                          코드
                        </th>
                        <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                          필요 수량
                        </th>
                        <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                          단위
                        </th>
                        <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                          보유 재고
                        </th>
                        <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                          부족 수량
                        </th>
                      </tr>
                    </thead>
                    <tbody className="bg-white divide-y divide-gray-200">
                      {selectedMrpResult.materials.map((material: any, index: number) => (
                        <tr key={index}>
                          <td className="px-4 py-3 text-sm text-gray-900">{material.name}</td>
                          <td className="px-4 py-3 text-sm text-gray-500">{material.code}</td>
                          <td className="px-4 py-3 text-sm text-gray-900">{material.required}</td>
                          <td className="px-4 py-3 text-sm text-gray-500">{material.unit}</td>
                          <td className="px-4 py-3 text-sm text-gray-900">{material.available}</td>
                          <td className="px-4 py-3 text-sm">
                            {material.shortage > 0 ? (
                              <span className="text-red-600 font-medium">{material.shortage}</span>
                            ) : (
                              <span className="text-green-600">-</span>
                            )}
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>

              {/* 주차별 MRP */}
              <div>
                <h4 className="text-lg font-semibold text-gray-900 mb-4">주차별 MRP</h4>
                <div className="space-y-6">
                  {Object.entries(selectedMrpResult.mrpSchedule).map(
                    ([materialCode, schedule]: [string, any]) => {
                      const material = selectedMrpResult.materials.find(
                        (m: any) => m.code === materialCode,
                      );
                      return (
                        <div key={materialCode} className="border border-gray-200 rounded-lg p-4">
                          <div className="flex items-center justify-between mb-4">
                            <h5 className="text-md font-semibold text-gray-900">
                              {material?.name}
                            </h5>
                            <span className="text-sm text-gray-500">{materialCode}</span>
                          </div>

                          <div className="overflow-x-auto">
                            <table className="min-w-full">
                              <thead>
                                <tr className="bg-gray-50">
                                  <th className="px-4 py-2 text-left text-xs font-medium text-gray-500 uppercase tracking-wider border-r border-gray-200">
                                    구성품명
                                  </th>
                                  {schedule.weeks.map((week: string, index: number) => (
                                    <th
                                      key={index}
                                      className="px-4 py-2 text-center text-xs font-medium text-gray-500 uppercase tracking-wider border-r border-gray-200 last:border-r-0"
                                    >
                                      {week}
                                    </th>
                                  ))}
                                </tr>
                              </thead>
                              <tbody className="bg-white divide-y divide-gray-200">
                                {schedule.data.map((row: any, rowIndex: number) => (
                                  <tr
                                    key={rowIndex}
                                    className={rowIndex % 2 === 0 ? 'bg-white' : 'bg-gray-50'}
                                  >
                                    <td className="px-4 py-2 text-sm font-medium text-gray-900 border-r border-gray-200">
                                      {row.type}
                                    </td>
                                    {row.values.map((value: any, colIndex: number) => (
                                      <td
                                        key={colIndex}
                                        className="px-4 py-2 text-sm text-center text-gray-900 border-r border-gray-200 last:border-r-0"
                                      >
                                        {value || '-'}
                                      </td>
                                    ))}
                                  </tr>
                                ))}
                              </tbody>
                            </table>
                          </div>
                        </div>
                      );
                    },
                  )}
                </div>
              </div>

              <div className="flex justify-end gap-3 pt-4">
                <button
                  onClick={() => setShowDetailModal(false)}
                  className="px-4 py-2 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 transition-colors text-sm font-medium cursor-pointer"
                >
                  닫기
                </button>
                <button className="px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 transition-colors text-sm font-medium cursor-pointer">
                  <i className="ri-shopping-cart-line mr-1"></i>
                  발주 생성
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* MRP 계산 모달 */}
      {showCalculationModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white rounded-lg p-6 w-full max-w-3xl mx-4 max-h-[90vh] overflow-y-auto">
            <div className="flex items-center justify-between mb-6">
              <h3 className="text-xl font-semibold">MRP 계산 실행</h3>
              <button
                onClick={() => setShowCalculationModal(false)}
                className="text-gray-400 hover:text-gray-600 cursor-pointer"
              >
                <i className="ri-close-line text-xl"></i>
              </button>
            </div>

            <div className="space-y-6">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  생산계획 선택
                </label>
                <select
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent text-sm pr-8"
                  value={selectedPlan}
                  onChange={(e) => setSelectedPlan(e.target.value)}
                >
                  <option value="">생산계획을 선택하세요</option>
                  <option value="MPS-001">MPS-001 - 산업용 모터 5HP (50EA)</option>
                  <option value="MPS-002">MPS-002 - 알루미늄 프레임 (100EA)</option>
                  <option value="MPS-003">MPS-003 - 제어판넬 (25EA)</option>
                </select>
              </div>

              {selectedPlan && (
                <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
                  <h4 className="text-sm font-semibold text-blue-900 mb-3">계산 결과 미리보기</h4>
                  <div className="space-y-3">
                    {mrpResults[0].materials.map((material, index) => (
                      <div
                        key={index}
                        className="flex items-center justify-between py-2 border-b border-blue-200 last:border-b-0"
                      >
                        <div className="flex-1">
                          <div className="text-sm font-medium text-gray-900">{material.name}</div>
                          <div className="text-xs text-gray-500">{material.code}</div>
                        </div>
                        <div className="text-right">
                          <div className="text-sm text-gray-900">
                            필요: {material.required} {material.unit}
                          </div>
                          <div className="text-sm text-gray-600">
                            보유: {material.available} {material.unit}
                          </div>
                          {material.shortage > 0 && (
                            <div className="text-sm text-red-600 font-medium">
                              부족: {material.shortage} {material.unit}
                            </div>
                          )}
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              )}

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    계산 기준일
                  </label>
                  <input
                    type="date"
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent text-sm"
                    defaultValue="2024-01-15"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    리드타임 여유일
                  </label>
                  <input
                    type="number"
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent text-sm"
                    placeholder="3"
                    defaultValue="3"
                  />
                </div>
              </div>

              <div className="space-y-3">
                <label className="block text-sm font-medium text-gray-700">계산 옵션</label>
                <div className="space-y-2">
                  <label className="flex items-center">
                    <input
                      type="checkbox"
                      className="rounded border-gray-300 text-blue-600 focus:ring-blue-500"
                      defaultChecked
                    />
                    <span className="ml-2 text-sm text-gray-700">안전재고 고려</span>
                  </label>
                  <label className="flex items-center">
                    <input
                      type="checkbox"
                      className="rounded border-gray-300 text-blue-600 focus:ring-blue-500"
                      defaultChecked
                    />
                    <span className="ml-2 text-sm text-gray-700">진행중인 발주 반영</span>
                  </label>
                  <label className="flex items-center">
                    <input
                      type="checkbox"
                      className="rounded border-gray-300 text-blue-600 focus:ring-blue-500"
                    />
                    <span className="ml-2 text-sm text-gray-700">자동 발주 생성</span>
                  </label>
                </div>
              </div>

              <div className="flex gap-3 pt-4">
                <button
                  type="button"
                  onClick={() => setShowCalculationModal(false)}
                  className="flex-1 px-4 py-2 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 transition-colors text-sm font-medium cursor-pointer"
                >
                  취소
                </button>
                <button
                  type="submit"
                  className="flex-1 px-4 py-2 bg-purple-600 text-white rounded-lg hover:bg-purple-700 transition-colors text-sm font-medium cursor-pointer"
                  disabled={!selectedPlan}
                >
                  MRP 계산 실행
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
