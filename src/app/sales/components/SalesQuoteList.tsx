'use client';

import { useEffect, useMemo, useState } from 'react';
import { QuoteStatus, Quote, QuoteQueryParams } from '@/app/sales/types/SalesQuoteListType';
import QuoteDetailModal from './QuoteDetailModal';
import { useQuery } from '@tanstack/react-query';
import { getQuoteList } from '@/app/sales/service';
import { useDebounce } from 'use-debounce';
import QuoteReviewModal from './QuoteReviewModal';

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
    isFetching,
    isRefetching,
  } = useQuery({
    queryKey: ['quoteList', queryParams],
    queryFn: ({ queryKey }) => getQuoteList(queryKey[1] as QuoteQueryParams),
    staleTime: 1000,
  });

  const quotes = quoteRes?.data ?? [];
  const pageInfo = quoteRes?.pageData;

  useEffect(() => {
    if ('scrollRestoration' in history) {
      history.scrollRestoration = 'auto';
    }

    window.addEventListener('load', () => {
      const savedY = sessionStorage.getItem('scrollY');
      if (savedY) window.scrollTo(0, parseInt(savedY));
    });

    window.addEventListener('scroll', () => {
      sessionStorage.setItem('scrollY', String(window.scrollY));
    });

    return () => {
      window.removeEventListener('scroll', () => {});
      window.removeEventListener('load', () => {});
    };
  }, []);

  // useEffect(() => {
  //   console.log(
  //     `%c[Query 상태]%c isFetching=${isFetching}, isRefetching=${isRefetching}, isLoading=${isLoading}`,
  //     'color: orange; font-weight: bold;',
  //     'color: white; background: #222; padding: 2px 4px; border-radius: 3px;',
  //   );
  // }, [isFetching, isRefetching, isLoading]);

  const getStatusColor = (status: QuoteStatus) => {
    switch (status) {
      case 'PENDING':
        return 'bg-gray-100 text-gray-800';
      case 'REVIEW':
        return 'bg-yellow-100 text-yellow-800';
      case 'APPROVED':
        return 'bg-green-100 text-green-800';
      case 'ALL':
        return 'bg-red-100 text-red-800';
      case '승인':
        return 'bg-green-100 text-green-800';
      case '검토':
        return 'bg-yellow-100 text-yellow-800';
      case '대기':
        return 'bg-gray-100 text-gray-800';
      case '반려':
        return 'bg-red-100 text-red-800';
      default:
        return 'bg-gray-100 text-gray-800';
    }
  };

  const getStatusText = (status: QuoteStatus) => {
    switch (status) {
      case 'PENDING':
        return '대기';
      case 'REVIEW':
        return '검토';
      case 'APPROVED':
        return '승인';
      case 'REJECTED':
        return '반려';
      case '승인':
        return '승인';
      case '검토':
        return '검토';
      case '대기':
        return '대기';
      case '반려':
        return '반려';
      default:
        return status;
    }
  };

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

  const maxVisible = 5;
  const getPageRange = () => {
    const pages: (number | string)[] = [];

    if (totalPages <= maxVisible) {
      for (let i = 1; i <= totalPages; i++) pages.push(i);
    } else {
      const start = Math.max(1, currentPage - 2);
      const end = Math.min(totalPages, start + maxVisible - 1);

      if (start > 1) {
        pages.push(1);
        if (start > 2) pages.push('...');
      }

      for (let i = start; i <= end; i++) pages.push(i);

      if (end < totalPages) {
        if (end < totalPages - 1) pages.push('...');
        pages.push(totalPages);
      }
    }
    return pages;
  };

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
              <option value="ALL">전체 상태</option>
              <option value="PENDING">대기</option>
              <option value="REVIEW">검토</option>
              <option value="APPROVED">승인</option>
              <option value="REJECTED">반려</option>
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
          {isError ? (
            <div className="flex flex-col items-center justify-center h-64 space-y-3 text-red-600">
              <i className="ri-error-warning-line text-4xl" />
              <p className="font-medium">견적서 목록을 불러오는 중 오류가 발생했습니다.</p>
            </div>
          ) : isLoading ? (
            <div className="flex flex-col items-center justify-center h-64 space-y-3">
              <div className="w-10 h-10 border-4 border-blue-500 border-t-transparent rounded-full animate-spin" />
              <p className="text-gray-600 text-sm font-medium">견적서를 불러오는 중입니다...</p>
            </div>
          ) : (
            <table className="w-full">
              <thead className="bg-gray-50">
                <tr>
                  <th className="px-6 py-3 text-left">
                    <input
                      type="checkbox"
                      checked={selectedQuotes.length === quotes.length && quotes.length > 0}
                      onChange={handleSelectAll}
                      className="rounded border-gray-300 text-blue-600 focus:ring-blue-500"
                    />
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    견적번호
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    고객명
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    담당자
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    견적일자
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    납기일
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    견적금액
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
                        className={`inline-flex px-2 py-1 text-xs font-medium rounded-full ${getStatusColor(quote.statusCode)}`}
                      >
                        {getStatusText(quote.statusCode)}
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
          <div className="px-6 py-4 border-t border-gray-200">
            <div className="flex items-center justify-between">
              <div className="text-sm text-gray-700">
                총 <span className="font-medium">{pageInfo?.totalElements}</span>명의 고객
              </div>

              <div className="flex justify-center items-center space-x-2 mt-6">
                <button
                  disabled={currentPage === 1}
                  onClick={() => setCurrentPage((prev) => prev - 1)}
                  className={`px-3 py-1 border rounded-md text-sm transition-colors ${
                    currentPage === 1
                      ? 'bg-gray-100 text-gray-400 cursor-not-allowed border-gray-200'
                      : 'border-gray-300 text-gray-700 hover:bg-gray-50 cursor-pointer'
                  }`}
                >
                  이전
                </button>

                {getPageRange().map((p, index) =>
                  p === '...' ? (
                    <span key={index} className="px-2 text-gray-400">
                      ...
                    </span>
                  ) : (
                    <button
                      key={index}
                      onClick={() => setCurrentPage(p as number)}
                      className={`px-3 py-1 rounded-md text-sm ${
                        currentPage === p
                          ? 'bg-blue-600 text-white'
                          : 'border border-gray-300 text-gray-700 hover:bg-gray-50 cursor-pointer'
                      }`}
                    >
                      {p}
                    </button>
                  ),
                )}

                <button
                  disabled={currentPage === totalPages}
                  onClick={() => setCurrentPage((prev) => prev + 1)}
                  className={`px-3 py-1 border rounded-md text-sm transition-colors ${
                    currentPage === totalPages
                      ? 'bg-gray-100 text-gray-400 cursor-not-allowed border-gray-200'
                      : 'border-gray-300 text-gray-700 hover:bg-gray-50 cursor-pointer'
                  }`}
                >
                  다음
                </button>
              </div>
            </div>
          </div>
        )}

        {/* 신규 견적서 작성 모달 */}
        {/* <NewQuoteModal
          $showNewQuoteModal={showNewQuoteModal}
          $setShowNewQuoteModal={setShowNewQuoteModal}
        /> */}
        {/* 견적서 상세보기 모달 */}
        <QuoteDetailModal
          $showQuoteModal={showQuoteModal}
          $setShowQuoteModal={setShowQuoteModal}
          $selectedQuoteId={selectedQuoteId}
          $getStatusColor={getStatusColor}
          $getStatusText={getStatusText}
        />

        <QuoteReviewModal
          $isOpen={showReviewModal}
          $onClose={() => {
            setShowReviewModal(false);
          }}
        />
      </div>
    </div>
  );
};

export default SalesQuoteList;
