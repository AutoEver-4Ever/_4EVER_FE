'use client';

import { useEffect, useMemo, useState } from 'react';
import { getChitStatusColor, getChitStatusText } from '@/app/(private)/finance/utils';
import {
  VOUCHER_LIST_TABLE_HEADERS,
  VOUCHER_STATUS_OPTIONS,
} from '@/app/(private)/finance/constants';
import { InvoiceStatus } from '@/app/(private)/finance/types/InvoiceListType';
import { useMutation, useQuery } from '@tanstack/react-query';
import {
  getPurchaseInvoicesList,
  getSalesInvoicesList,
  postApInvoice,
  postArInvoice,
} from '@/app/(private)/finance/finance.api';
import Pagination from '@/app/components/common/Pagination';
import { useSearchParams } from 'next/navigation';
import TableStatusBox from '@/app/components/common/TableStatusBox';
import InvoiceDetailModal from '@/app/(private)/finance/components/modals/InvoiceDetailModal';

const InvoiceList = () => {
  const searchParams = useSearchParams();
  const currentTab = searchParams.get('tab') || 'sales';
  const [showDetailModal, setShowDetailModal] = useState(false);
  const [selectedInvoiceId, setSelectedInvoiceId] = useState<number>(0);

  const [statusFilter, setStatusFilter] = useState<InvoiceStatus>('ALL');
  const [currentPage, setCurrentPage] = useState(1);

  const queryParams = useMemo(
    () => ({
      page: currentPage - 1,
      size: 10,
      status: statusFilter || 'ALL',
    }),
    [currentPage, statusFilter],
  );

  // const queryParams = {
  //   page: currentPage - 1,
  //   size: 10,
  //   status: statusFilter || 'ALL',
  // };

  const queryFn =
    currentTab === 'sales'
      ? () => getSalesInvoicesList(queryParams)
      : () => getPurchaseInvoicesList(queryParams);

  const queryKey = [
    currentTab === 'sales' ? 'salesInvoiceList' : 'purchaseInvoiceList',
    queryParams,
  ];

  const {
    data: invoiceReq,
    isLoading,
    isError,
  } = useQuery({
    queryKey: queryKey,
    queryFn: queryFn,
    staleTime: 1000,
  });

  const invoices = invoiceReq?.data ?? [];
  const pageInfo = invoiceReq?.pageData;
  const totalPages = pageInfo?.totalPages ?? 1;

  const mutationFn =
    currentTab === 'sales'
      ? () => postArInvoice(selectedInvoiceId)
      : () => postApInvoice(selectedInvoiceId);

  const { mutate: sendReq, isPending } = useMutation({
    mutationFn: mutationFn,
    onSuccess: (data) => {
      alert(`${data.status} : ${data.message}
        `);
    },
    onError: (error) => {
      alert(` 등록 중 오류가 발생했습니다. ${error}`);
    },
  });

  // ----------------------------------------------------------
  const handleViewDetail = (id: number) => {
    setShowDetailModal(true);
    setSelectedInvoiceId(id);
  };
  const handleSelectVoucher = (voucherId: number, checked: boolean) => {
    if (checked) {
      setSelectedInvoiceId(voucherId);
    } else {
      setSelectedInvoiceId(0);
    }
  };

  useEffect(() => {
    console.log(selectedInvoiceId);
  }, [selectedInvoiceId]);

  const handleReceivableComplete = () => {
    sendReq();
  };

  return (
    <div className="bg-white rounded-lg border border-gray-200 p-6">
      <div className="flex items-center justify-between mb-6">
        <div className="flex items-center space-x-2">
          <i className="ri-shopping-cart-line text-blue-600 text-lg"></i>
          <h2 className="text-lg font-semibold text-gray-900">
            {currentTab === 'sales' ? '매출 전표 목록' : '매입 전표 목록'}
          </h2>
        </div>

        <div className="flex items-center space-x-4">
          <div className="flex items-center space-x-2">
            <label className="text-sm text-gray-600">상태:</label>

            <select
              value={statusFilter}
              onChange={(e) => setStatusFilter(e.target.value as InvoiceStatus)}
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
            disabled={selectedInvoiceId ? false : true}
            className={`px-4 py-2 rounded-lg transition-colors font-medium text-sm whitespace-nowrap cursor-pointer ${
              selectedInvoiceId
                ? 'bg-green-600 text-white hover:bg-green-700'
                : 'bg-gray-300 text-gray-500 cursor-not-allowed'
            }`}
          >
            미수 처리 신청
          </button>
        </div>
      </div>

      <div className="overflow-x-auto">
        {isLoading ? (
          <TableStatusBox $type="loading" $message="전표 목록을 불러오는 중입니다..." />
        ) : isError ? (
          <TableStatusBox $type="error" $message="전표 목록을 불러오는 중 오류가 발생했습니다." />
        ) : !invoices || invoices.length === 0 ? (
          <TableStatusBox $type="empty" $message="등록된 전표가 없습니다." />
        ) : (
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
              {invoices.map((invoice) => (
                <tr
                  key={invoice.invoiceId}
                  className="hover:bg-gray-50 transition-colors duration-200"
                >
                  <td className="py-3 px-4">
                    <input
                      type="checkbox"
                      checked={selectedInvoiceId === invoice.invoiceId}
                      onChange={(e) => handleSelectVoucher(invoice.invoiceId, e.target.checked)}
                      className="rounded border-gray-300 text-blue-600 focus:ring-blue-500"
                    />
                  </td>
                  <td className="py-3 px-4 text-sm font-medium text-gray-900">
                    {invoice.invoiceCode}
                  </td>
                  <td className="py-3 px-4 text-sm text-gray-900">
                    {invoice.connection.connectionName}
                  </td>
                  <td className="py-3 px-4 text-sm font-medium text-gray-900 text-right">
                    ₩{invoice.totalAmount.toLocaleString()}
                  </td>
                  <td className="py-3 px-4 text-sm text-gray-500">{invoice.issueDate}</td>
                  <td className="py-3 px-4 text-sm text-gray-500">{invoice.dueDate}</td>
                  <td className="py-3 px-4">
                    <span
                      className={`px-2 py-1 rounded text-xs font-medium ${getChitStatusColor(invoice.status)}`}
                    >
                      {getChitStatusText(invoice.status)}
                    </span>
                  </td>
                  <td className="py-3 px-4 text-sm text-blue-600 hover:text-blue-500 cursor-pointer">
                    {invoice.reference.referenceCode}
                  </td>
                  <td className="py-3 px-4 text-center">
                    <div className="flex items-center justify-center space-x-2">
                      <button
                        onClick={() => handleViewDetail(invoice.invoiceId)}
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
        )}
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
      {showDetailModal && (
        <InvoiceDetailModal
          $setShowDetailModal={setShowDetailModal}
          $selectedInvoiceId={selectedInvoiceId}
          $setSelectedInvoiceId={setSelectedInvoiceId}
        />
      )}
    </div>
  );
};

export default InvoiceList;
