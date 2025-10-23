'use client';

import { useState } from 'react';

const InventoryList = () => {
  const [selectedItems, setSelectedItems] = useState<string[]>([]);
  const [showStockModal, setShowStockModal] = useState(false);
  const [showMoveModal, setShowMoveModal] = useState(false);
  const [showDetailModal, setShowDetailModal] = useState(false);
  const [selectedItem, setSelectedItem] = useState<any>(null);
  const [showExportDropdown, setShowExportDropdown] = useState(false);
  const [showAllItems, setShowAllItems] = useState(false);
  const [showSafetyStockModal, setShowSafetyStockModal] = useState(false);

  const inventoryItems = [
    {
      id: 'INV001',
      name: '스테인리스 스틸 파이프',
      code: 'SS-PIPE-001',
      category: '원자재',
      currentStock: 150,
      safetyStock: 50,
      unit: 'EA',
      unitPrice: 25000,
      totalValue: 3750000,
      location: 'A-01-01',
      warehouse: '제1창고',
      warehouseCode: 'WH-A',
      lastUpdated: '2024-01-15',
      status: 'normal',
      supplier: '스테인리스코리아',
      description: '고품질 스테인리스 스틸 파이프, 내식성 우수',
      specifications: '직경 50mm, 두께 3mm, 길이 6m',
    },
    {
      id: 'INV002',
      name: '볼트 M8x20',
      code: 'BOLT-M8-20',
      category: '부품',
      currentStock: 110,
      safetyStock: 100,
      unit: 'EA',
      unitPrice: 500,
      totalValue: 55000,
      location: 'B-02-15',
      warehouse: '제3창고',
      warehouseCode: 'WH-C',
      lastUpdated: '2024-01-14',
      status: 'warning',
      supplier: '패스너코리아',
      description: '고강도 볼트, 아연도금 처리',
      specifications: 'M8 x 20mm, 강도등급 8.8',
    },
    {
      id: 'INV003',
      name: '산업용 모터 5HP',
      code: 'MOTOR-5HP-001',
      category: '부품',
      currentStock: 5,
      safetyStock: 10,
      unit: 'EA',
      unitPrice: 850000,
      totalValue: 4250000,
      location: 'C-01-05',
      warehouse: '제2창고',
      warehouseCode: 'WH-B',
      lastUpdated: '2024-01-15',
      status: 'critical',
      supplier: '모터테크',
      description: '고효율 산업용 모터, 3상 380V',
      specifications: '5HP, 1800RPM, IP55 등급',
    },
    {
      id: 'INV004',
      name: '용접봉 3.2mm',
      code: 'WELD-ROD-32',
      category: '원자재',
      currentStock: 5,
      safetyStock: 20,
      unit: 'KG',
      unitPrice: 8000,
      totalValue: 40000,
      location: 'D-03-08',
      warehouse: '제1창고',
      warehouseCode: 'WH-A',
      lastUpdated: '2024-01-13',
      status: 'critical',
      supplier: '용접재료상사',
      description: '일반구조용 피복아크 용접봉',
      specifications: '3.2mm x 350mm, AWS E6013',
    },
    {
      id: 'INV005',
      name: '알루미늄 프로파일',
      code: 'AL-PROF-001',
      category: '원자재',
      currentStock: 200,
      safetyStock: 80,
      unit: 'M',
      unitPrice: 15000,
      totalValue: 3000000,
      location: 'A-02-10',
      warehouse: '제1창고',
      warehouseCode: 'WH-A',
      lastUpdated: '2024-01-15',
      status: 'normal',
      supplier: '알루텍',
      description: '산업용 알루미늄 프로파일, 경량 고강도',
      specifications: '40x40mm, T-슬롯 타입',
    },
    {
      id: 'INV006',
      name: '베어링 6205',
      code: 'BEAR-6205',
      category: '부품',
      currentStock: 45,
      safetyStock: 30,
      unit: 'EA',
      unitPrice: 12000,
      totalValue: 540000,
      location: 'B-01-20',
      warehouse: '제3창고',
      warehouseCode: 'WH-C',
      lastUpdated: '2024-01-14',
      status: 'normal',
      supplier: '베어링코리아',
      description: '고정밀 볼베어링, 밀폐형',
      specifications: '내경 25mm, 외경 52mm, 폭 15mm',
    },
  ];

  // 재고 이동 기록 데이터
  const stockMovements = [
    {
      id: 'MOV001',
      itemId: 'INV001',
      type: 'in',
      quantity: 50,
      fromWarehouse: null,
      toWarehouse: '제1창고',
      fromLocation: null,
      toLocation: 'A-01-01',
      date: '2024-01-15',
      time: '14:30',
      reason: '구매입고',
      user: '김구매',
      reference: 'PO-2024-001',
      notes: '정기 구매입고',
    },
    {
      id: 'MOV002',
      itemId: 'INV001',
      type: 'transfer',
      quantity: 20,
      fromWarehouse: '제1창고',
      toWarehouse: '제2창고',
      fromLocation: 'A-01-01',
      toLocation: 'C-02-05',
      date: '2024-01-12',
      time: '11:20',
      reason: '창고간 이동',
      user: '이관리',
      reference: 'TR-2024-001',
      notes: '생산 라인 공급을 위한 이동',
    },
    {
      id: 'MOV003',
      itemId: 'INV001',
      type: 'out',
      quantity: 30,
      fromWarehouse: '제1창고',
      toWarehouse: null,
      fromLocation: 'A-01-01',
      toLocation: null,
      date: '2024-01-10',
      time: '09:15',
      reason: '생산출고',
      user: '박생산',
      reference: 'WO-2024-005',
      notes: '제품 생산을 위한 출고',
    },
  ];

  const warehouses = [
    { id: 'WH-A', name: '제1창고', type: '원자재' },
    { id: 'WH-B', name: '제2창고', type: '완제품' },
    { id: 'WH-C', name: '제3창고', type: '부품' },
    { id: 'WH-D', name: '냉동창고', type: '특수보관' },
    { id: 'WH-E', name: '임시창고', type: '임시보관' },
  ];

  const displayedItems = showAllItems ? inventoryItems : inventoryItems.slice(0, 6);

  // 안전재고에 따른 상태 계산
  const getStockStatus = (currentStock: number, safetyStock: number) => {
    const ratio = currentStock / safetyStock;
    if (ratio < 1.1) return 'critical';
    if (ratio <= 1.3) return 'warning';
    return 'normal';
  };

  const getStatusBadge = (currentStock: number, safetyStock: number) => {
    const status = getStockStatus(currentStock, safetyStock);
    const statusConfig = {
      normal: { label: '정상', class: 'bg-green-100 text-green-800' },
      warning: { label: '주의', class: 'bg-yellow-100 text-yellow-800' },
      critical: { label: '긴급', class: 'bg-red-100 text-red-800' },
    };
    const config = statusConfig[status as keyof typeof statusConfig];
    return (
      <span className={`px-2 py-1 rounded-full text-xs font-medium ${config.class}`}>
        {config.label}
      </span>
    );
  };

  const handleItemDetail = (item: any) => {
    setSelectedItem(item);
    setShowDetailModal(true);
  };

  const handleStockMove = (item: any) => {
    setSelectedItem(item);
    setShowMoveModal(true);
  };

  const handleSafetyStockEdit = (item: any) => {
    setSelectedItem(item);
    setShowSafetyStockModal(true);
  };

  const toggleSelectItem = (itemId: string) => {
    setSelectedItems((prev) =>
      prev.includes(itemId) ? prev.filter((id) => id !== itemId) : [...prev, itemId],
    );
  };

  const handleExportExcel = () => {
    const csvContent = [
      [
        '품목',
        '품목코드',
        '카테고리',
        '현재재고',
        '안전재고',
        '단가',
        '총가치',
        '창고위치',
        '상태',
      ],
      ...inventoryItems.map((item) => [
        item.name,
        item.code,
        item.category,
        item.currentStock,
        item.safetyStock,
        item.unitPrice,
        item.totalValue,
        `${item.warehouse}/${item.location}`,
        getStockStatus(item.currentStock, item.safetyStock) === 'normal'
          ? '정상'
          : getStockStatus(item.currentStock, item.safetyStock) === 'warning'
            ? '주의'
            : '긴급',
      ]),
    ]
      .map((row) => row.join(','))
      .join('\n');

    const blob = new Blob(['\uFEFF' + csvContent], { type: 'text/csv;charset=utf-8;' });
    const link = document.createElement('a');
    const url = URL.createObjectURL(blob);
    link.setAttribute('href', url);
    link.setAttribute('download', `재고목록_${new Date().toISOString().split('T')[0]}.csv`);
    link.style.visibility = 'hidden';
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    setShowExportDropdown(false);
  };

  const handleExportPDF = () => {
    alert('PDF 내보내기 기능은 준비 중입니다.');
    setShowExportDropdown(false);
  };

  const getMovementIcon = (type: string) => {
    const icons = {
      in: 'ri-arrow-down-line',
      out: 'ri-arrow-up-line',
      transfer: 'ri-arrow-left-right-line',
    };
    return icons[type as keyof typeof icons];
  };

  const getMovementColor = (type: string) => {
    const colors = {
      in: 'text-green-600 bg-green-100',
      out: 'text-red-600 bg-red-100',
      transfer: 'text-blue-600 bg-blue-100',
    };
    return colors[type as keyof typeof colors];
  };

  const getMovementLabel = (type: string) => {
    const labels = {
      in: '입고',
      out: '출고',
      transfer: '이동',
    };
    return labels[type as keyof typeof labels];
  };

  return (
    <div className="bg-white rounded-lg border border-gray-200 mt-6">
      <div className="p-6 border-b border-gray-200">
        <div className="flex items-center justify-between">
          <div className="flex items-center justify-between w-full">
            <h2 className="text-lg font-semibold text-gray-900">재고 목록</h2>
            <div className="flex items-center gap-4">
              <button
                onClick={() => setShowAllItems(!showAllItems)}
                className="text-sm text-blue-600 hover:text-blue-500 cursor-pointer"
              >
                {showAllItems ? '간단히 보기' : '전체 보기'} →
              </button>
              <div className="flex gap-2">
                <div className="relative">
                  <button
                    onClick={() => setShowExportDropdown(!showExportDropdown)}
                    className="px-3 py-2 text-sm border border-gray-300 rounded-lg hover:bg-gray-50 transition-colors cursor-pointer flex items-center"
                  >
                    <i className="ri-download-line mr-1"></i>
                    내보내기
                    <i className="ri-arrow-down-s-line ml-1"></i>
                  </button>

                  {showExportDropdown && (
                    <div className="absolute right-0 mt-2 w-48 bg-white rounded-lg shadow-lg border border-gray-200 z-50">
                      <div className="py-1">
                        <button
                          onClick={handleExportExcel}
                          className="w-full px-4 py-2 text-left text-sm text-gray-700 hover:bg-gray-100 cursor-pointer flex items-center"
                        >
                          <i className="ri-file-excel-2-line mr-3 text-green-600"></i>
                          Excel로 내보내기
                        </button>
                        <button
                          onClick={handleExportPDF}
                          className="w-full px-4 py-2 text-left text-sm text-gray-700 hover:bg-gray-100 cursor-pointer flex items-center"
                        >
                          <i className="ri-file-pdf-line mr-3 text-red-600"></i>
                          PDF로 내보내기
                        </button>
                      </div>
                    </div>
                  )}
                </div>
                <button className="px-3 py-2 text-sm bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors cursor-pointer">
                  <i className="ri-refresh-line mr-1"></i>
                  새로고침
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="overflow-x-auto">
        <table className="w-full">
          <thead className="bg-gray-50">
            <tr>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                <input
                  type="checkbox"
                  className="rounded border-gray-300 text-blue-600 focus:ring-blue-500"
                  onChange={(e) => {
                    if (e.target.checked) {
                      setSelectedItems(displayedItems.map((item) => item.id));
                    } else {
                      setSelectedItems([]);
                    }
                  }}
                />
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                품목
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                카테고리
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                현재재고
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                안전재고
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                단가
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                총 가치
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                창고 위치
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                상태
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                작업
              </th>
            </tr>
          </thead>
          <tbody className="bg-white divide-y divide-gray-200">
            {displayedItems.map((item) => (
              <tr key={item.id} className="hover:bg-gray-50">
                <td className="px-6 py-4 whitespace-nowrap">
                  <input
                    type="checkbox"
                    className="rounded border-gray-300 text-blue-600 focus:ring-blue-500"
                    checked={selectedItems.includes(item.id)}
                    onChange={() => toggleSelectItem(item.id)}
                  />
                </td>
                <td className="px-6 py-4 whitespace-nowrap">
                  <div>
                    <div className="text-sm font-medium text-gray-900">{item.name}</div>
                    <div className="text-sm text-gray-500">{item.code}</div>
                  </div>
                </td>
                <td className="px-6 py-4 whitespace-nowrap">
                  <span className="px-2 py-1 text-xs font-medium bg-gray-100 text-gray-800 rounded-full">
                    {item.category}
                  </span>
                </td>
                <td className="px-6 py-4 whitespace-nowrap">
                  <div className="text-sm text-gray-900">
                    {item.currentStock.toLocaleString()} {item.unit}
                  </div>
                </td>
                <td className="px-6 py-4 whitespace-nowrap">
                  <div className="text-sm text-gray-500">
                    {item.safetyStock.toLocaleString()} {item.unit}
                  </div>
                </td>
                <td className="px-6 py-4 whitespace-nowrap">
                  <div className="text-sm text-gray-900">₩{item.unitPrice.toLocaleString()}</div>
                </td>
                <td className="px-6 py-4 whitespace-nowrap">
                  <div className="text-sm font-medium text-gray-900">
                    ₩{item.totalValue.toLocaleString()}
                  </div>
                </td>
                <td className="px-6 py-4 whitespace-nowrap">
                  <div className="text-sm text-gray-900">{item.warehouse}</div>
                  <div className="text-sm text-gray-500">{item.location}</div>
                </td>
                <td className="px-6 py-4 whitespace-nowrap">
                  {getStatusBadge(item.currentStock, item.safetyStock)}
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                  <button
                    onClick={() => handleItemDetail(item)}
                    className="text-blue-600 hover:text-blue-900 cursor-pointer"
                  >
                    상세보기
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {!showAllItems && inventoryItems.length > 6 && (
        <div className="p-4 border-t border-gray-200 text-center">
          <button
            onClick={() => setShowAllItems(true)}
            className="text-sm text-blue-600 hover:text-blue-500 cursor-pointer font-medium"
          >
            {inventoryItems.length - 6}개 항목 더 보기
          </button>
        </div>
      )}

      {/* 안전재고 수정 모달 */}
      {showSafetyStockModal && selectedItem && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white rounded-lg p-6 w-full max-w-md mx-4">
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-lg font-semibold">안전 재고 수정</h3>
              <button
                onClick={() => setShowSafetyStockModal(false)}
                className="text-gray-400 hover:text-gray-600 cursor-pointer"
              >
                <i className="ri-close-line text-xl"></i>
              </button>
            </div>

            <div className="mb-4 p-3 bg-gray-50 rounded-lg">
              <div className="text-sm font-medium text-gray-900">{selectedItem.name}</div>
              <div className="text-sm text-gray-500">{selectedItem.code}</div>
              <div className="text-sm text-gray-600 mt-1">
                현재 안전재고: {selectedItem.safetyStock} {selectedItem.unit}
              </div>
            </div>

            <form className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  새 안전재고 수량
                </label>
                <input
                  type="number"
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent text-sm"
                  placeholder="안전재고 수량"
                  defaultValue={selectedItem.safetyStock}
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">수정 사유</label>
                <textarea
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent text-sm"
                  rows={3}
                  placeholder="수정 사유를 입력하세요"
                ></textarea>
              </div>

              <div className="flex gap-3 pt-4">
                <button
                  type="button"
                  onClick={() => setShowSafetyStockModal(false)}
                  className="flex-1 px-4 py-2 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 transition-colors text-sm font-medium cursor-pointer"
                >
                  취소
                </button>
                <button
                  type="submit"
                  className="flex-1 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors text-sm font-medium cursor-pointer"
                >
                  수정
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* 재고 이동 모달 */}
      {showMoveModal && selectedItem && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white rounded-lg p-6 w-full max-w-md mx-4">
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-lg font-semibold">재고 이동</h3>
              <button
                onClick={() => setShowMoveModal(false)}
                className="text-gray-400 hover:text-gray-600 cursor-pointer"
              >
                <i className="ri-close-line text-xl"></i>
              </button>
            </div>

            <div className="mb-4 p-3 bg-gray-50 rounded-lg">
              <div className="text-sm font-medium text-gray-900">{selectedItem.name}</div>
              <div className="text-sm text-gray-500">{selectedItem.code}</div>
              <div className="text-sm text-gray-600 mt-1">
                현재 위치: {selectedItem.warehouse} ({selectedItem.location})
              </div>
              <div className="text-sm text-gray-600">
                현재 재고: {selectedItem.currentStock} {selectedItem.unit}
              </div>
            </div>

            <form className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">이동할 창고</label>
                <select className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent text-sm pr-8">
                  <option value="">창고를 선택하세요</option>
                  {warehouses.map((warehouse) => (
                    <option key={warehouse.id} value={warehouse.id}>
                      {warehouse.name} ({warehouse.type})
                    </option>
                  ))}
                </select>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">이동할 위치</label>
                <input
                  type="text"
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent text-sm"
                  placeholder="예: A-01-01"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">이동 수량</label>
                <input
                  type="number"
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent text-sm"
                  placeholder="이동할 수량을 입력하세요"
                  max={selectedItem.currentStock}
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">이동 사유</label>
                <textarea
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent text-sm"
                  rows={3}
                  placeholder="이동 사유를 입력하세요"
                ></textarea>
              </div>

              <div className="flex gap-3 pt-4">
                <button
                  type="button"
                  onClick={() => setShowMoveModal(false)}
                  className="flex-1 px-4 py-2 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 transition-colors text-sm font-medium cursor-pointer"
                >
                  취소
                </button>
                <button
                  type="submit"
                  className="flex-1 px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 transition-colors text-sm font-medium cursor-pointer"
                >
                  이동
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* 재고 상세보기 모달 */}
      {showDetailModal && selectedItem && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white rounded-lg p-6 w-full max-w-4xl mx-4 max-h-[90vh] overflow-y-auto">
            <div className="flex items-center justify-between mb-6">
              <h3 className="text-xl font-semibold">재고 상세 정보</h3>
              <button
                onClick={() => setShowDetailModal(false)}
                className="text-gray-400 hover:text-gray-600 cursor-pointer"
              >
                <i className="ri-close-line text-xl"></i>
              </button>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              {/* 기본 정보 */}
              <div className="space-y-6">
                <div className="bg-gray-50 p-4 rounded-lg">
                  <h4 className="text-lg font-semibold text-gray-900 mb-3">기본 정보</h4>
                  <div className="space-y-3">
                    <div className="flex justify-between">
                      <span className="text-sm text-gray-600">품목명:</span>
                      <span className="text-sm font-medium text-gray-900">{selectedItem.name}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-sm text-gray-600">품목코드:</span>
                      <span className="text-sm font-medium text-gray-900">{selectedItem.code}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-sm text-gray-600">카테고리:</span>
                      <span className="text-sm font-medium text-gray-900">
                        {selectedItem.category}
                      </span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-sm text-gray-600">공급업체:</span>
                      <span className="text-sm font-medium text-gray-900">
                        {selectedItem.supplier}
                      </span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-sm text-gray-600">상태:</span>
                      {getStatusBadge(selectedItem.currentStock, selectedItem.safetyStock)}
                    </div>
                  </div>
                </div>

                <div className="bg-blue-50 p-4 rounded-lg">
                  <h4 className="text-lg font-semibold text-gray-900 mb-3">재고 정보</h4>
                  <div className="space-y-3">
                    <div className="flex justify-between">
                      <span className="text-sm text-gray-600">현재 재고:</span>
                      <span className="text-sm font-medium text-blue-600">
                        {selectedItem.currentStock} {selectedItem.unit}
                      </span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-sm text-gray-600">안전 재고:</span>
                      <span className="text-sm font-medium text-gray-900">
                        {selectedItem.safetyStock} {selectedItem.unit}
                      </span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-sm text-gray-600">단가:</span>
                      <span className="text-sm font-medium text-gray-900">
                        ₩{selectedItem.unitPrice.toLocaleString()}
                      </span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-sm text-gray-600">총 가치:</span>
                      <span className="text-sm font-medium text-green-600">
                        ₩{selectedItem.totalValue.toLocaleString()}
                      </span>
                    </div>
                  </div>
                </div>

                <div className="bg-green-50 p-4 rounded-lg">
                  <h4 className="text-lg font-semibold text-gray-900 mb-3">위치 정보</h4>
                  <div className="space-y-3">
                    <div className="flex justify-between">
                      <span className="text-sm text-gray-600">창고:</span>
                      <span className="text-sm font-medium text-gray-900">
                        {selectedItem.warehouse}
                      </span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-sm text-gray-600">위치:</span>
                      <span className="text-sm font-medium text-gray-900">
                        {selectedItem.location}
                      </span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-sm text-gray-600">최종 수정:</span>
                      <span className="text-sm font-medium text-gray-900">
                        {selectedItem.lastUpdated}
                      </span>
                    </div>
                  </div>
                </div>
              </div>

              {/* 재고 이동 기록 */}
              <div>
                <div className="bg-white border border-gray-200 rounded-lg">
                  <div className="p-4 border-b border-gray-200">
                    <h4 className="text-lg font-semibold text-gray-900">재고 이동 기록</h4>
                  </div>
                  <div className="p-4">
                    <div className="space-y-4">
                      {stockMovements
                        .filter((movement) => movement.itemId === selectedItem.id)
                        .map((movement) => (
                          <div
                            key={movement.id}
                            className="flex items-start gap-3 p-3 bg-gray-50 rounded-lg"
                          >
                            <div
                              className={`w-8 h-8 rounded-full flex items-center justify-center ${getMovementColor(movement.type)}`}
                            >
                              <i className={`${getMovementIcon(movement.type)} text-sm`}></i>
                            </div>

                            <div className="flex-1">
                              <div className="flex items-center gap-2 mb-1">
                                <span
                                  className={`px-2 py-1 text-xs font-medium rounded-full ${getMovementColor(movement.type)}`}
                                >
                                  {getMovementLabel(movement.type)}
                                </span>
                                <span className="text-sm font-medium text-gray-900">
                                  {movement.quantity} {selectedItem.unit}
                                </span>
                              </div>

                              {movement.type === 'transfer' && (
                                <div className="text-sm text-gray-600 mb-1">
                                  {movement.fromWarehouse} ({movement.fromLocation}) →{' '}
                                  {movement.toWarehouse} ({movement.toLocation})
                                </div>
                              )}

                              {movement.type === 'in' && (
                                <div className="text-sm text-gray-600 mb-1">
                                  → {movement.toWarehouse} ({movement.toLocation})
                                </div>
                              )}

                              {movement.type === 'out' && (
                                <div className="text-sm text-gray-600 mb-1">
                                  {movement.fromWarehouse} ({movement.fromLocation}) →
                                </div>
                              )}

                              <div className="text-xs text-gray-500">
                                {movement.date} {movement.time} · {movement.user}
                              </div>
                              <div className="text-xs text-blue-600">
                                {movement.reference} · {movement.reason}
                              </div>
                              {movement.notes && (
                                <div className="text-xs text-gray-500 mt-1">{movement.notes}</div>
                              )}
                            </div>
                          </div>
                        ))}
                    </div>
                  </div>
                </div>

                <div className="mt-6 flex gap-3">
                  <button
                    onClick={() => {
                      setShowDetailModal(false);
                      handleStockMove(selectedItem);
                    }}
                    className="flex-1 px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 transition-colors text-sm font-medium cursor-pointer"
                  >
                    <i className="ri-arrow-left-right-line mr-1"></i>
                    재고 이동
                  </button>
                  <button
                    onClick={() => {
                      setShowDetailModal(false);
                      handleSafetyStockEdit(selectedItem);
                    }}
                    className="flex-1 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors text-sm font-medium cursor-pointer"
                  >
                    <i className="ri-edit-line mr-1"></i>
                    안전 재고 수정
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default InventoryList;
