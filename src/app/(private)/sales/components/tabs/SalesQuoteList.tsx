'use client';

import { useMemo, useState } from 'react';
import {
  QuoteStatus,
  Quote,
  QuoteQueryParams,
} from '@/app/(private)/sales/types/SalesQuoteListType';
import QuoteDetailModal from '../modals/QuoteDetailModal';
import { useQuery } from '@tanstack/react-query';
import { getQuoteList } from '@/app/(private)/sales/sales.service';
import { useDebounce } from 'use-debounce';
import QuoteReviewModal from '../modals/QuoteReviewModal';
import TableStatusBox from '@/app/components/common/TableStatusBox';
import { QUOTE_LIST_TABLE_HEADERS } from '@/app/(private)/sales/constant';
import { QUOTE_STATUS_OPTIONS } from '@/app/(private)/sales/constant';
import { getQuoteStatusColor, getQuoteStatusText } from '../../utils';
import Pagination from '@/app/components/common/Pagination';

const SalesQuoteList = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [statusFilter, setStatusFilter] = useState<QuoteStatus>('ALL');
  const [showQuoteModal, setShowQuoteModal] = useState(false);
  const [showReviewModal, setShowReviewModal] = useState(false);
  const [selectedQuotes, setSelectedQuotes] = useState<number[]>([]);

  const [selectedQuoteId, setSelectedQuoteId] = useState<number>(0);

  const [startDate, setStartDate] = useState('');
  const [endDate, setEndDate] = useState('');
  const [debouncedSearchTerm] = useDebounce(searchTerm, 200);
  const [currentPage, setCurrentPage] = useState(1);

  const queryParams = useMemo(
    () => ({
      page: currentPage - 1,
      size: 10,
      startDate: startDate || '',
      endDate: endDate || '',
      status: statusFilter || 'ALL',
      search: debouncedSearchTerm || '',
    }),
    [startDate, endDate, currentPage, statusFilter, debouncedSearchTerm],
  );

  const {
    data: quoteRes,
    isLoading,
    isError,
  } = useQuery({
    queryKey: ['quoteList', queryParams],
    queryFn: ({ queryKey }) => getQuoteList(queryKey[1] as QuoteQueryParams),
    staleTime: 1000,
  });

  const quotes = quoteRes?.data ?? [];
  const pageInfo = quoteRes?.pageData;

  const handleViewQuote = (quote: Quote) => {
    setSelectedQuoteId(quote.quotationId);
    setShowQuoteModal(true);
  };

  const handleSelectAll = () => {
    if (selectedQuotes.length === quotes.length && quotes.length > 0) {
      setSelectedQuotes([]);
    } else {
      setSelectedQuotes(quotes.map((quote) => quote.quotationId));
    }
  };
  const handleCheckboxChange = (quoteId: number) => {
    setSelectedQuotes((prev) =>
      prev.includes(quoteId) ? prev.filter((id) => id !== quoteId) : [...prev, quoteId],
    );
  };

  const handleDeleteQuote = (quote: Quote) => {
    if (
      confirm(`견적서 ${quote.quotationId}를 정말 삭제하시겠습니까?\n이 작업은 되돌릴 수 없습니다.`)
    ) {
      alert(`견적서 ${quote.quotationId}가 삭제되었습니다.`);
    }
  };

  const totalPages = pageInfo?.totalPages ?? 1;

  return (
    <div className="space-y-6 mt-6">
      {/* 헤더 및 필터 */}
      <div className="flex flex-col space-y-4">
        {/* 날짜 필터링 */}
        <div className="flex items-center space-x-4">
          <div className="flex items-center space-x-2">
            <label className="text-sm font-medium text-gray-700">시작날짜:</label>
            <input
              type="date"
              value={startDate}
              onChange={(e: React.ChangeEvent<HTMLInputElement>) => setStartDate(e.target.value)}
              className="px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent text-sm bg-white"
            />
          </div>
          <div className="flex items-center space-x-2">
            <label className="text-sm font-medium text-gray-700">끝날짜:</label>
            <input
              type="date"
              value={endDate}
              onChange={(e: React.ChangeEvent<HTMLInputElement>) => setEndDate(e.target.value)}
              className="bg-white px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent text-sm"
            />
          </div>
        </div>

        {/* 검색 및 필터 */}
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
          <div className="flex items-center space-x-4">
            <div className="relative">
              <i className="ri-search-line absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400"></i>
              <input
                type="text"
                placeholder="견적번호, 고객명, 담당자로 검색..."
                value={searchTerm}
                onChange={(e: React.ChangeEvent<HTMLInputElement>) => setSearchTerm(e.target.value)}
                className="pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent w-80 bg-white"
              />
            </div>

            <select
              value={statusFilter}
              onChange={(e: React.ChangeEvent<HTMLSelectElement>) =>
                setStatusFilter(e.target.value as QuoteStatus)
              }
              className="bg-white px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent pr-8"
            >
              {QUOTE_STATUS_OPTIONS.map(({ key, value }) => (
                <option key={key} value={key}>
                  {value}
                </option>
              ))}
            </select>
          </div>

          <button
            onClick={() => setShowReviewModal(true)}
            className="px-4 py-2 bg-blue-600 text-white font-medium rounded-lg hover:bg-blue-700 transition-colors duration-200 cursor-pointer whitespace-nowrap flex items-center space-x-2"
          >
            <i className="ri-add-line"></i>
            <span>견적 검토 요청</span>
          </button>
        </div>
      </div>

      {/* 견적 목록 */}
      <div className="bg-white rounded-lg shadow-sm border border-gray-200">
        <div className="overflow-x-auto">
          {isLoading ? (
            <TableStatusBox $type="loading" $message="견적서 목록을 불러오는 중입니다..." />
          ) : isError ? (
            <TableStatusBox
              $type="error"
              $message="견적서 목록을 불러오는 중 오류가 발생했습니다."
            />
          ) : !quotes || quotes.length === 0 ? (
            <TableStatusBox $type="empty" $message="등록된 견적서가 없습니다." />
          ) : (
            <table className="w-full">
              <thead className="bg-gray-50">
                <tr>
                  {QUOTE_LIST_TABLE_HEADERS.map((header) =>
                    header === '선택' ? (
                      <th key={header} className="px-6 py-3 text-left">
                        <input
                          type="checkbox"
                          checked={selectedQuotes.length === quotes.length && quotes.length > 0}
                          onChange={handleSelectAll}
                          className="rounded border-gray-300 text-blue-600 focus:ring-blue-500"
                        />
                      </th>
                    ) : (
                      <th
                        key={header}
                        className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                      >
                        {header}
                      </th>
                    ),
                  )}
                </tr>
              </thead>
              <tbody className="bg-white divide-y divide-gray-200">
                {quotes.map((quote) => (
                  <tr key={quote.quotationId} className="hover:bg-gray-50">
                    <td className="px-6 py-4 whitespace-nowrap">
                      <input
                        type="checkbox"
                        checked={selectedQuotes.includes(quote.quotationId)}
                        onChange={() => handleCheckboxChange(quote.quotationId)}
                        className="rounded border-gray-300 text-blue-600 focus:ring-blue-500"
                      />
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                      {quote.quotationCode}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                      {quote.customerName}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                      {quote.ownerName}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                      {quote.quotationDate}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                      {quote.dueDate}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                      {quote.totalAmount.toLocaleString()}원
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                      <span
                        className={`inline-flex px-2 py-1 text-xs font-medium rounded-full ${getQuoteStatusColor(quote.statusCode)}`}
                      >
                        {getQuoteStatusText(quote.statusCode)}
                      </span>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-center">
                      <div className="flex items-center justify-center space-x-2">
                        <button
                          onClick={() => handleViewQuote(quote)}
                          className="text-blue-600 hover:text-blue-800 cursor-pointer"
                          title="상세보기"
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

        {/* 신규 견적서 작성 모달 */}
        {/* <NewQuoteModal
          $showNewQuoteModal={showNewQuoteModal}
          $setShowNewQuoteModal={setShowNewQuoteModal}
        /> */}
        {/* 견적서 상세보기 모달 */}
        {showQuoteModal && (
          <QuoteDetailModal
            $onClose={() => {
              setShowQuoteModal(false);
            }}
            $selectedQuoteId={selectedQuoteId}
          />
        )}

        {showReviewModal && (
          <QuoteReviewModal
            $onClose={() => {
              setShowReviewModal(false);
            }}
          />
        )}
      </div>
    </div>
  );
};

export default SalesQuoteList;
