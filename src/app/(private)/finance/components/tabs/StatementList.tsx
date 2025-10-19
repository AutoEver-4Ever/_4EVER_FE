'use client';

import { useMemo, useState } from 'react';
import { getChitStatusColor, getChitStatusText } from '@/app/(private)/finance/utils';
import {
  VOUCHER_LIST_TABLE_HEADERS,
  VOUCHER_STATUS_OPTIONS,
} from '@/app/(private)/finance/constants';
// import StatementDetailModal from '@/app/(private)/finance/components/modals/StatementDetailModal';
import {
  StatementQueryParams,
  StatementStatus,
} from '@/app/(private)/finance/types/StatementListType';
import { useQuery } from '@tanstack/react-query';
import {
  getPurchaseStatementsList,
  getSalesStatementsList,
} from '@/app/(private)/finance/finance.service';
import Pagination from '@/app/components/common/Pagination';
import { useSearchParams } from 'next/navigation';

const VoucherList = () => {
  const searchParams = useSearchParams();
  const currentTab = searchParams.get('tab') || 'sales';
  const [showDetailModal, setShowDetailModal] = useState(false);
  const [selectedStatementId, setSelectedStatementId] = useState<number>(0);

  const [statusFilter, setStatusFilter] = useState<StatementStatus>('ALL');
  const [currentPage, setCurrentPage] = useState(1);
  const [selectedStatements, setSelectedStatements] = useState<string[]>([]);

  const queryParams = useMemo(
    () => ({
      page: currentPage - 1,
      size: 10,
      status: statusFilter || 'ALL',
    }),
    [currentPage, statusFilter],
  );

  const queryFn =
    currentTab === 'sales'
      ? () => getSalesStatementsList(queryParams)
      : () => getPurchaseStatementsList(queryParams);

  const queryKey = [
    currentTab === 'sales' ? 'salesStatementList' : 'purchaseStatementList',
    queryParams,
  ];

  const {
    data: statementRes,
    isLoading,
    isError,
  } = useQuery({
    queryKey: queryKey,
    queryFn: queryFn,
  });

  const statements = statementRes?.data ?? [];
  const pageInfo = statementRes?.pageData;
  const totalPages = pageInfo?.totalPages ?? 1;

  const handleViewDetail = (id: number) => {
    setShowDetailModal(true);
    setSelectedStatementId(id);
    console.log(showDetailModal);
  };

  const handleSelectVoucher = (voucherId: number, checked: boolean) => {
    if (checked) {
      setSelectedStatementId(voucherId);
    } else {
      setSelectedStatementId(0);
    }
  };

  const handleReceivableComplete = () => {
    if (selectedStatements.length === 0) {
      alert('처리할 전표를 선택해주세요.');
      return;
    }
    alert(`미수 처리가 완료되었습니다.`);
    setSelectedStatements([]);
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
              value={statusFilter}
              onChange={(e) => setStatusFilter(e.target.value as StatementStatus)}
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
            disabled={selectedStatementId ? false : true}
            className={`px-4 py-2 rounded-lg transition-colors font-medium text-sm whitespace-nowrap cursor-pointer ${
              selectedStatementId
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
            {statements.map((statement) => (
              <tr
                key={statement.statementId}
                className="hover:bg-gray-50 transition-colors duration-200"
              >
                <td className="py-3 px-4">
                  <input
                    type="checkbox"
                    checked={selectedStatementId === statement.statementId}
                    onChange={(e) => handleSelectVoucher(statement.statementId, e.target.checked)}
                    className="rounded border-gray-300 text-blue-600 focus:ring-blue-500"
                  />
                </td>
                <td className="py-3 px-4 text-sm font-medium text-gray-900">
                  {statement.statementCode}
                </td>
                <td className="py-3 px-4 text-sm text-gray-900">
                  {statement.connection.connectionName}
                </td>
                <td className="py-3 px-4 text-sm font-medium text-gray-900 text-right">
                  ₩{statement.totalAmount.toLocaleString()}
                </td>
                <td className="py-3 px-4 text-sm text-gray-500">{statement.issueDate}</td>
                <td className="py-3 px-4 text-sm text-gray-500">{statement.dueDate}</td>
                <td className="py-3 px-4">
                  <span
                    className={`px-2 py-1 rounded text-xs font-medium ${getChitStatusColor(statement.status)}`}
                  >
                    {getChitStatusText(statement.status)}
                  </span>
                </td>
                <td className="py-3 px-4 text-sm text-blue-600 hover:text-blue-500 cursor-pointer">
                  {statement.reference.referenceCode}
                </td>
                <td className="py-3 px-4 text-center">
                  <div className="flex items-center justify-center space-x-2">
                    <button
                      onClick={() => handleViewDetail(statement.statementId)}
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
      {/* 페이지네이션 */}
      {isError || isLoading ? null : (
        <Pagination
          currentPage={currentPage}
          totalPages={totalPages}
          totalElements={pageInfo?.totalElements}
          onPageChange={(page) => setCurrentPage(page)}
        />
      )}

      {/* 전표 상세 모달 */}
      {/* {showDetailModal && (
        <StatementDetailModal
          $setShowDetailModal={setShowDetailModal}
          $selectedStatementId={selectedStatementId}
          $setSelectedStatementId={setSelectedStatementId}
        />
      )} */}
    </div>
  );
};

export default VoucherList;
