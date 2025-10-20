'use client';

import { useState } from 'react';
import VourcherDetailModal from '../modals/VoucherDetailModal';
import { getChitStatusColor, getChitStatusText } from '../../utils';
import { VOUCHER_LIST_TABLE_HEADERS, VOUCHER_STATUS_OPTIONS } from '../../constants';

const VoucherList = () => {
  const [selectedStatus, setSelectedStatus] = useState('all');
  const [showDetailModal, setShowDetailModal] = useState(false);
  const [selectedVoucherId, setSelectedVoucherId] = useState<number>(0);

  const [currentPage, setCurrentPage] = useState(1);
  const [selectedVouchers, setSelectedVouchers] = useState<string[]>([]);

  const vouchers = [
    {
      id: 1,
      ProductId: 'AP-2024-001',
      type: 'AP',
      description: '강판 구매 - 대한철강',
      amount: '₩5,000,000',
      date: '2024-01-18',
      dueDate: '2024-02-17',
      status: 'unpaid',
      reference: 'PO-2024-001',
      vendor: '대한철강',
      details: {
        voucherType: '매입전표',
        memo: '1월 생산용 강판 구매',
        items: [
          {
            name: '강판 A급',
            spec: '1200x2400x3mm',
            quantity: 50,
            unit: '매',
            unitPrice: 80000,
            amount: 4000000,
          },
          {
            name: '강판 B급',
            spec: '1000x2000x2mm',
            quantity: 25,
            unit: '매',
            unitPrice: 40000,
            amount: 1000000,
          },
        ],
      },
    },
    {
      id: 2,
      ProductId: 'AP-2024-001',
      type: 'AP',
      description: '강판 구매 - 대한철강',
      amount: '₩5,000,000',
      date: '2024-01-18',
      dueDate: '2024-02-17',
      status: 'unpaid',
      reference: 'PO-2024-001',
      vendor: '대한철강',
      details: {
        voucherType: '매입전표',
        memo: '1월 생산용 강판 구매',
        items: [
          {
            name: '강판 A급',
            spec: '1200x2400x3mm',
            quantity: 50,
            unit: '매',
            unitPrice: 80000,
            amount: 4000000,
          },
          {
            name: '강판 B급',
            spec: '1000x2000x2mm',
            quantity: 25,
            unit: '매',
            unitPrice: 40000,
            amount: 1000000,
          },
        ],
      },
    },
    {
      id: 3,
      ProductId: 'AP-2024-001',
      type: 'AP',
      description: '강판 구매 - 대한철강',
      amount: '₩5,000,000',
      date: '2024-01-18',
      dueDate: '2024-02-17',
      status: 'unpaid',
      reference: 'PO-2024-001',
      vendor: '대한철강',
      details: {
        voucherType: '매입전표',
        memo: '1월 생산용 강판 구매',
        items: [
          {
            name: '강판 A급',
            spec: '1200x2400x3mm',
            quantity: 50,
            unit: '매',
            unitPrice: 80000,
            amount: 4000000,
          },
          {
            name: '강판 B급',
            spec: '1000x2000x2mm',
            quantity: 25,
            unit: '매',
            unitPrice: 40000,
            amount: 1000000,
          },
        ],
      },
    },
  ];

  const handleViewDetail = (id: number) => {
    setShowDetailModal(true);
    setSelectedVoucherId(id);
    console.log(showDetailModal);
  };

  const handleSelectVoucher = (voucherId: number, checked: boolean) => {
    if (checked) {
      setSelectedVoucherId(voucherId);
    } else {
      setSelectedVoucherId(0);
    }
  };

  const handleReceivableComplete = () => {
    if (selectedVouchers.length === 0) {
      alert('처리할 전표를 선택해주세요.');
      return;
    }
    alert(`미수 처리가 완료되었습니다.`);
    setSelectedVouchers([]);
  };

  return (
    <div className="bg-white rounded-lg border border-gray-200 p-6">
      <div className="flex items-center justify-between mb-6">
        <div className="flex items-center space-x-2">
          <i className="ri-shopping-cart-line text-blue-600 text-lg"></i>
          <h2 className="text-lg font-semibold text-gray-900">매입 전표 목록</h2>
        </div>

        <div className="flex items-center space-x-4">
          <div className="flex items-center space-x-2">
            <label className="text-sm text-gray-600">상태:</label>

            <select
              value={selectedStatus}
              onChange={(e) => setSelectedStatus(e.target.value)}
              className="px-3 py-1 border border-gray-300 rounded-md text-sm cursor-pointer pr-8"
            >
              {VOUCHER_STATUS_OPTIONS.map(({ key, value }) => (
                <option key={key} value={key}>
                  {value}
                </option>
              ))}
            </select>
          </div>

          <button
            onClick={handleReceivableComplete}
            disabled={selectedVoucherId ? false : true}
            className={`px-4 py-2 rounded-lg transition-colors font-medium text-sm whitespace-nowrap cursor-pointer ${
              selectedVoucherId
                ? 'bg-green-600 text-white hover:bg-green-700'
                : 'bg-gray-300 text-gray-500 cursor-not-allowed'
            }`}
          >
            미수 처리 완료
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
                  disabled
                  className="rounded border-gray-300 text-blue-600 focus:ring-blue-500"
                />
              </th>
              {VOUCHER_LIST_TABLE_HEADERS.map((header) => (
                <th
                  key={header}
                  className="py-3 px-4 text-xs font-medium text-gray-500 uppercase tracking-wider text-left"
                >
                  {header}
                </th>
              ))}
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-200">
            {vouchers.map((voucher) => (
              <tr key={voucher.id} className="hover:bg-gray-50 transition-colors duration-200">
                <td className="py-3 px-4">
                  <input
                    type="checkbox"
                    checked={selectedVoucherId === voucher.id}
                    onChange={(e) => handleSelectVoucher(voucher.id, e.target.checked)}
                    className="rounded border-gray-300 text-blue-600 focus:ring-blue-500"
                  />
                </td>
                <td className="py-3 px-4 text-sm font-medium text-gray-900">{voucher.id}</td>
                <td className="py-3 px-4 text-sm text-gray-900">{voucher.vendor}</td>
                <td className="py-3 px-4 text-sm font-medium text-gray-900 text-right">
                  {voucher.amount}
                </td>
                <td className="py-3 px-4 text-sm text-gray-500">{voucher.date}</td>
                <td className="py-3 px-4 text-sm text-gray-500">{voucher.dueDate}</td>
                <td className="py-3 px-4">
                  <span
                    className={`px-2 py-1 rounded text-xs font-medium ${getChitStatusColor(voucher.status)}`}
                  >
                    {getChitStatusText(voucher.status)}
                  </span>
                </td>
                <td className="py-3 px-4 text-sm text-blue-600 hover:text-blue-500 cursor-pointer">
                  {voucher.reference}
                </td>
                <td className="py-3 px-4 text-center">
                  <div className="flex items-center justify-center space-x-2">
                    <button
                      onClick={() => handleViewDetail(voucher.id)}
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
        <div className="text-sm text-gray-500">총 0건의 전표 0 - 0 표시</div>
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

          {Array.from({ length: 2 }, (_, i) => i + 1).map((page) => (
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
            onClick={() => setCurrentPage(Math.min(2, currentPage + 1))}
            disabled={currentPage === 2}
            className={`px-3 py-1 border border-gray-300 rounded-md text-sm cursor-pointer ${
              currentPage === 2
                ? 'text-gray-400 bg-gray-50 cursor-not-allowed'
                : 'text-gray-600 hover:bg-gray-50'
            }`}
          >
            다음
          </button>
        </div>
      </div>
      {/* 전표 상세 모달 */}
      {showDetailModal && (
        <VourcherDetailModal
          $setShowDetailModal={setShowDetailModal}
          $selectedVoucherId={selectedVoucherId}
          $setSelectedVoucherId={setSelectedVoucherId}
        />
      )}
    </div>
  );
};

export default VoucherList;
