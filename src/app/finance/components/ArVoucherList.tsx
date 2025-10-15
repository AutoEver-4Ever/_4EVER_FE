'use client';

import { useState } from 'react';

export interface ArVoucherItem {
  name: string;
  spec: string;
  quantity: number;
  unit: string;
  unitPrice: number;
  amount: number;
}

export interface ArVoucherDetails {
  voucherType: string;
  memo: string;
  items: ArVoucherItem[];
}

export interface ArVoucher {
  id: string;
  type: string;
  description: string;
  amount: string;
  date: string;
  dueDate: string;
  status: string;
  reference: string;
  vendor: string;
  details: ArVoucherDetails;
}

const ArVoucherList = () => {
  const [selectedStatus, setSelectedStatus] = useState('all');
  const [showDetailModal, setShowDetailModal] = useState(false);
  const [showEditModal, setShowEditModal] = useState(false);
  const [selectedVoucher, setSelectedVoucher] = useState<ArVoucher | null>(null);
  const [editFormData, setEditFormData] = useState<ArVoucher | null>(null);
  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage] = useState(5);
  const [selectedVouchers, setSelectedVouchers] = useState<string[]>([]);

  const vouchers = [
    {
      id: 'AR-2024-001',
      type: 'AR',
      description: '도어 패널 판매 - 현대자동차',
      amount: '₩10,000,000',
      date: '2024-01-17',
      dueDate: '2024-02-16',
      status: 'pending',
      reference: 'SO-2024-001',
      vendor: '현대자동차',
      details: {
        voucherType: '매출전표',
        memo: '도어 패널 100개 납품',
        items: [
          {
            name: '도어 패널 좌측',
            spec: 'DP-L-001',
            quantity: 50,
            unit: '개',
            unitPrice: 120000,
            amount: 6000000,
          },
          {
            name: '도어 패널 우측',
            spec: 'DP-R-001',
            quantity: 50,
            unit: '개',
            unitPrice: 80000,
            amount: 4000000,
          },
        ],
      },
    },
    {
      id: 'AR-2024-002',
      type: 'AR',
      description: '범퍼 판매 - 기아자동차',
      amount: '₩7,500,000',
      date: '2024-01-15',
      dueDate: '2024-02-14',
      status: 'paid',
      reference: 'SO-2024-002',
      vendor: '기아자동차',
      details: {
        voucherType: '매출전표',
        memo: '범퍼 75개 납품',
        items: [
          {
            name: '전면 범퍼',
            spec: 'FB-KIA-001',
            quantity: 75,
            unit: '개',
            unitPrice: 100000,
            amount: 7500000,
          },
        ],
      },
    },
    {
      id: 'AR-2024-003',
      type: 'AR',
      description: '후드 판매 - 쌍용자동차',
      amount: '₩6,200,000',
      date: '2024-01-13',
      dueDate: '2024-02-12',
      status: 'paid',
      reference: 'SO-2024-003',
      vendor: '쌍용자동차',
      details: {
        voucherType: '매출전표',
        memo: '후드 50개 납품 완료',
        items: [
          {
            name: '엔진 후드',
            spec: 'EH-SY-001',
            quantity: 50,
            unit: '개',
            unitPrice: 124000,
            amount: 6200000,
          },
        ],
      },
    },
  ];

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'unpaid':
        return 'bg-red-100 text-red-700';
      case 'pending':
        return 'bg-yellow-100 text-yellow-700';
      case 'paid':
        return 'bg-green-100 text-green-700';
      default:
        return 'bg-gray-100 text-gray-700';
    }
  };

  const getStatusText = (status: string) => {
    switch (status) {
      case 'unpaid':
        return '미납';
      case 'pending':
        return '확인대기';
      case 'paid':
        return '완납';
      default:
        return status;
    }
  };

  const filteredVouchers = vouchers.filter((voucher) => {
    const statusMatch = selectedStatus === 'all' || voucher.status === selectedStatus;
    return statusMatch;
  });

  // 페이지네이션 계산
  const totalPages = Math.ceil(filteredVouchers.length / itemsPerPage);
  const startIndex = (currentPage - 1) * itemsPerPage;
  const endIndex = startIndex + itemsPerPage;
  const currentVouchers = filteredVouchers.slice(startIndex, endIndex);

  // 체크박스 관련 함수
  const handleSelectAll = (checked: boolean) => {
    if (checked) {
      setSelectedVouchers(currentVouchers.map((voucher) => voucher.id));
    } else {
      setSelectedVouchers([]);
    }
  };

  const handleSelectVoucher = (voucherId: string, checked: boolean) => {
    if (checked) {
      setSelectedVouchers((prev) => [...prev, voucherId]);
    } else {
      setSelectedVouchers((prev) => prev.filter((id) => id !== voucherId));
    }
  };

  const handleReceivableComplete = () => {
    if (selectedVouchers.length === 0) {
      alert('처리할 전표를 선택해주세요.');
      return;
    }
    alert(`${selectedVouchers.length}건의 미수 처리가 완료되었습니다.`);
    setSelectedVouchers([]);
  };

  const handleViewDetail = (voucher: ArVoucher) => {
    setSelectedVoucher(voucher);
    setShowDetailModal(true);
  };

  const handleEditVoucher = (voucher: ArVoucher) => {
    setEditFormData({
      ...voucher,
      details: { ...voucher.details },
    });
    setShowDetailModal(false);
    setShowEditModal(true);
  };

  const handleSaveEdit = (e: React.FormEvent) => {
    e.preventDefault();
    alert('전표가 성공적으로 수정되었습니다.');
    setShowEditModal(false);
    setEditFormData(null);
  };

  const updateEditFormData = <K extends keyof ArVoucher>(field: K, value: ArVoucher[K]) => {
    setEditFormData((prev) => (prev ? { ...prev, [field]: value } : prev));
  };

  const updateEditFormDetails = <K extends keyof ArVoucherDetails>(
    field: K,
    value: ArVoucherDetails[K],
  ) => {
    setEditFormData((prev) =>
      prev
        ? {
            ...prev,
            details: {
              ...prev.details,
              [field]: value,
            },
          }
        : prev,
    );
  };

  return (
    <div className="bg-white rounded-lg border border-gray-200 p-6">
      <div className="flex items-center justify-between mb-6">
        <div className="flex items-center space-x-2">
          <i className="ri-money-dollar-circle-line text-blue-600 text-lg"></i>
          <h2 className="text-lg font-semibold text-gray-900">매출 전표 목록</h2>
        </div>

        <div className="flex items-center space-x-4">
          <div className="flex items-center space-x-2">
            <label className="text-sm text-gray-600">상태:</label>
            <select
              value={selectedStatus}
              onChange={(e) => setSelectedStatus(e.target.value)}
              className="px-3 py-1 border border-gray-300 rounded-md text-sm cursor-pointer pr-8"
            >
              <option value="all">전체</option>
              <option value="unpaid">미납</option>
              <option value="pending">확인대기</option>
              <option value="paid">완납</option>
            </select>
          </div>

          <button
            onClick={handleReceivableComplete}
            disabled={selectedVouchers.length === 0}
            className={`px-4 py-2 rounded-lg transition-colors font-medium text-sm whitespace-nowrap cursor-pointer ${
              selectedVouchers.length > 0
                ? 'bg-green-600 text-white hover:bg-green-700'
                : 'bg-gray-300 text-gray-500 cursor-not-allowed'
            }`}
          >
            미수 처리 완료 ({selectedVouchers.length})
          </button>
        </div>
      </div>

      <div className="overflow-x-auto">
        <table className="w-full">
          <thead>
            <tr className="border-b border-gray-200">
              <th className="text-left py-3 px-4 text-xs font-medium text-gray-500 uppercase tracking-wider">
                <input
                  type="checkbox"
                  checked={
                    currentVouchers.length > 0 && selectedVouchers.length === currentVouchers.length
                  }
                  onChange={(e) => handleSelectAll(e.target.checked)}
                  className="rounded border-gray-300 text-blue-600 focus:ring-blue-500"
                />
              </th>
              <th className="text-left py-3 px-4 text-xs font-medium text-gray-500 uppercase tracking-wider">
                전표번호
              </th>
              <th className="text-left py-3 px-4 text-xs font-medium text-gray-500 uppercase tracking-wider">
                내용
              </th>
              <th className="text-left py-3 px-4 text-xs font-medium text-gray-500 uppercase tracking-wider">
                거래처
              </th>
              <th className="text-right py-3 px-4 text-xs font-medium text-gray-500 uppercase tracking-wider">
                금액
              </th>
              <th className="text-left py-3 px-4 text-xs font-medium text-gray-500 uppercase tracking-wider">
                전표 발생일
              </th>
              <th className="text-left py-3 px-4 text-xs font-medium text-gray-500 uppercase tracking-wider">
                만기일
              </th>
              <th className="text-left py-3 px-4 text-xs font-medium text-gray-500 uppercase tracking-wider">
                상태
              </th>
              <th className="text-left py-3 px-4 text-xs font-medium text-gray-500 uppercase tracking-wider">
                참조번호
              </th>
              <th className="text-center py-3 px-4 text-xs font-medium text-gray-500 uppercase tracking-wider">
                작업
              </th>
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-200">
            {currentVouchers.map((voucher) => (
              <tr key={voucher.id} className="hover:bg-gray-50 transition-colors duration-200">
                <td className="py-3 px-4">
                  <input
                    type="checkbox"
                    checked={selectedVouchers.includes(voucher.id)}
                    onChange={(e) => handleSelectVoucher(voucher.id, e.target.checked)}
                    className="rounded border-gray-300 text-blue-600 focus:ring-blue-500"
                  />
                </td>
                <td className="py-3 px-4 text-sm font-medium text-gray-900">{voucher.id}</td>
                <td className="py-3 px-4 text-sm text-gray-900">{voucher.description}</td>
                <td className="py-3 px-4 text-sm text-gray-900">{voucher.vendor}</td>
                <td className="py-3 px-4 text-sm font-medium text-gray-900 text-right">
                  {voucher.amount}
                </td>
                <td className="py-3 px-4 text-sm text-gray-500">{voucher.date}</td>
                <td className="py-3 px-4 text-sm text-gray-500">{voucher.dueDate}</td>
                <td className="py-3 px-4">
                  <span
                    className={`px-2 py-1 rounded text-xs font-medium ${getStatusColor(voucher.status)}`}
                  >
                    {getStatusText(voucher.status)}
                  </span>
                </td>
                <td className="py-3 px-4 text-sm text-blue-600 hover:text-blue-500 cursor-pointer">
                  {voucher.reference}
                </td>
                <td className="py-3 px-4 text-center">
                  <div className="flex items-center justify-center space-x-2">
                    <button
                      onClick={() => handleViewDetail(voucher)}
                      className="text-blue-600 hover:text-blue-500 cursor-pointer"
                    >
                      <i className="ri-eye-line"></i>
                    </button>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      <div className="mt-6 flex items-center justify-between">
        <div className="text-sm text-gray-500">
          총 {filteredVouchers.length}건의 전표 ({startIndex + 1}-
          {Math.min(endIndex, filteredVouchers.length)} 표시)
        </div>
        <div className="flex items-center space-x-2">
          <button
            onClick={() => setCurrentPage(Math.max(1, currentPage - 1))}
            disabled={currentPage === 1}
            className={`px-3 py-1 border border-gray-300 rounded-md text-sm cursor-pointer ${
              currentPage === 1
                ? 'text-gray-400 bg-gray-50 cursor-not-allowed'
                : 'text-gray-600 hover:bg-gray-50'
            }`}
          >
            이전
          </button>

          {Array.from({ length: totalPages }, (_, i) => i + 1).map((page) => (
            <button
              key={page}
              onClick={() => setCurrentPage(page)}
              className={`px-3 py-1 rounded-md text-sm cursor-pointer ${
                currentPage === page
                  ? 'bg-blue-600 text-white'
                  : 'border border-gray-300 text-gray-600 hover:bg-gray-50'
              }`}
            >
              {page}
            </button>
          ))}

          <button
            onClick={() => setCurrentPage(Math.min(totalPages, currentPage + 1))}
            disabled={currentPage === totalPages}
            className={`px-3 py-1 border border-gray-300 rounded-md text-sm cursor-pointer ${
              currentPage === totalPages
                ? 'text-gray-400 bg-gray-50 cursor-not-allowed'
                : 'text-gray-600 hover:bg-gray-50'
            }`}
          >
            다음
          </button>
        </div>
      </div>

      {/* 전표 상세 모달 */}
      {showDetailModal && selectedVoucher && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white rounded-lg p-6 w-full max-w-4xl mx-4 max-h-[90vh] overflow-y-auto">
            <div className="flex items-center justify-between mb-6">
              <h3 className="text-xl font-semibold text-gray-900">전표 상세 정보</h3>
              <button
                onClick={() => setShowDetailModal(false)}
                className="text-gray-400 hover:text-gray-600 cursor-pointer"
              >
                <i className="ri-close-line text-2xl"></i>
              </button>
            </div>

            <div className="space-y-6">
              {/* 기본 정보 */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="space-y-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">전표번호</label>
                    <div className="text-lg font-semibold text-gray-900">{selectedVoucher.id}</div>
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">전표유형</label>
                    <div className="text-gray-900">{selectedVoucher.details.voucherType}</div>
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">거래처</label>
                    <div className="text-gray-900">{selectedVoucher.vendor}</div>
                  </div>
                </div>
                <div className="space-y-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      전표 발생일
                    </label>
                    <div className="text-gray-900">{selectedVoucher.date}</div>
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">만기일</label>
                    <div className="text-gray-900">{selectedVoucher.dueDate}</div>
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">상태</label>
                    <span
                      className={`px-2 py-1 rounded text-xs font-medium ${getStatusColor(selectedVoucher.status)}`}
                    >
                      {getStatusText(selectedVoucher.status)}
                    </span>
                  </div>
                </div>
              </div>

              {/* 적요 및 메모 */}
              <div className="space-y-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">적요</label>
                  <div className="text-gray-900">{selectedVoucher.description}</div>
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">메모</label>
                  <div className="text-gray-900">{selectedVoucher.details.memo}</div>
                </div>
              </div>

              {/* 주문 품목 */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-3">주문 품목</label>
                <div className="overflow-x-auto">
                  <table className="w-full border border-gray-300 rounded-lg">
                    <thead className="bg-gray-50">
                      <tr>
                        <th className="px-4 py-3 text-left text-sm font-medium text-gray-700 border-b">
                          품목
                        </th>
                        <th className="px-4 py-3 text-left text-sm font-medium text-gray-700 border-b">
                          규격
                        </th>
                        <th className="px-4 py-3 text-center text-sm font-medium text-gray-700 border-b">
                          수량
                        </th>
                        <th className="px-4 py-3 text-center text-sm font-medium text-gray-700 border-b">
                          단위
                        </th>
                        <th className="px-4 py-3 text-right text-sm font-medium text-gray-700 border-b">
                          단가
                        </th>
                        <th className="px-4 py-3 text-right text-sm font-medium text-gray-700 border-b">
                          금액
                        </th>
                      </tr>
                    </thead>
                    <tbody>
                      {selectedVoucher.details.items.map((item: ArVoucherItem, index: number) => (
                        <tr key={index} className="border-b">
                          <td className="px-4 py-3 text-sm text-gray-900">{item.name}</td>
                          <td className="px-4 py-3 text-sm text-gray-900">{item.spec}</td>
                          <td className="px-4 py-3 text-sm text-gray-900 text-center">
                            {item.quantity}
                          </td>
                          <td className="px-4 py-3 text-sm text-gray-900 text-center">
                            {item.unit}
                          </td>
                          <td className="px-4 py-3 text-sm text-gray-900 text-right">
                            ₩{item.unitPrice.toLocaleString()}
                          </td>
                          <td className="px-4 py-3 text-sm text-gray-900 text-right">
                            ₩{item.amount.toLocaleString()}
                          </td>
                        </tr>
                      ))}
                    </tbody>
                    <tfoot className="bg-gray-50">
                      <tr>
                        <td colSpan={5} className="px-4 py-3 text-right font-medium text-gray-900">
                          총 금액
                        </td>
                        <td className="px-4 py-3 text-right font-medium text-green-600">
                          ₩
                          {selectedVoucher.details.items
                            .reduce((sum: number, item: ArVoucherItem) => sum + item.amount, 0)
                            .toLocaleString()}
                        </td>
                      </tr>
                    </tfoot>
                  </table>
                </div>
              </div>

              {/* 버튼 */}
              <div className="flex gap-3 pt-6 border-t border-gray-200">
                <button
                  onClick={() => setShowDetailModal(false)}
                  className="flex-1 px-4 py-2 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 transition-colors font-medium cursor-pointer"
                >
                  닫기
                </button>
                <button
                  onClick={() => handleEditVoucher(selectedVoucher)}
                  className="px-6 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors font-medium cursor-pointer"
                >
                  수정
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* 전표 수정 모달 */}
      {showEditModal && editFormData && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white rounded-lg p-6 w-full max-w-4xl mx-4 max-h-[90vh] overflow-y-auto">
            <div className="flex items-center justify-between mb-6">
              <h3 className="text-xl font-semibold text-gray-900">전표 수정</h3>
              <button
                onClick={() => setShowEditModal(false)}
                className="text-gray-400 hover:text-gray-600 cursor-pointer"
              >
                <i className="ri-close-line text-2xl"></i>
              </button>
            </div>

            <form onSubmit={handleSaveEdit} className="space-y-6">
              {/* 기본 정보 수정 */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="space-y-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">전표번호</label>
                    <input
                      type="text"
                      value={editFormData.id}
                      readOnly
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg bg-gray-50 text-gray-500"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">전표유형</label>
                    <select
                      value={editFormData.details.voucherType}
                      onChange={(e) => updateEditFormDetails('voucherType', e.target.value)}
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg pr-8"
                    >
                      <option value="매출전표">매출전표</option>
                      <option value="매입전표">매입전표</option>
                      <option value="일반전표">일반전표</option>
                      <option value="현금전표">현금전표</option>
                    </select>
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">거래처</label>
                    <input
                      type="text"
                      value={editFormData.vendor}
                      onChange={(e) => updateEditFormData('vendor', e.target.value)}
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg"
                    />
                  </div>
                </div>
                <div className="space-y-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      전표 발생일
                    </label>
                    <input
                      type="date"
                      value={editFormData.date}
                      onChange={(e) => updateEditFormData('date', e.target.value)}
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">만기일</label>
                    <input
                      type="date"
                      value={editFormData.dueDate}
                      onChange={(e) => updateEditFormData('dueDate', e.target.value)}
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">상태</label>
                    <select
                      value={editFormData.status}
                      onChange={(e) => updateEditFormData('status', e.target.value)}
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg pr-8"
                    >
                      <option value="unpaid">미납</option>
                      <option value="pending">확인대기</option>
                      <option value="paid">완납</option>
                    </select>
                  </div>
                </div>
              </div>

              {/* 적요 및 메모 수정 */}
              <div className="space-y-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">적요</label>
                  <input
                    type="text"
                    value={editFormData.description}
                    onChange={(e) => updateEditFormData('description', e.target.value)}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">메모</label>
                  <textarea
                    value={editFormData.details.memo}
                    onChange={(e) => updateEditFormDetails('memo', e.target.value)}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg"
                    rows={3}
                  />
                </div>
              </div>

              {/* 참조번호 수정 */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">참조번호</label>
                <input
                  type="text"
                  value={editFormData.reference}
                  onChange={(e) => updateEditFormData('reference', e.target.value)}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg"
                />
              </div>

              {/* 버튼 */}
              <div className="flex gap-3 pt-6 border-t border-gray-200">
                <button
                  type="button"
                  onClick={() => setShowEditModal(false)}
                  className="flex-1 px-4 py-2 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 transition-colors font-medium cursor-pointer"
                >
                  취소
                </button>
                <button
                  type="button"
                  className="px-6 py-2 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 transition-colors font-medium cursor-pointer"
                >
                  임시저장
                </button>
                <button
                  type="submit"
                  className="px-6 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors font-medium cursor-pointer"
                >
                  저장
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};

export default ArVoucherList;
