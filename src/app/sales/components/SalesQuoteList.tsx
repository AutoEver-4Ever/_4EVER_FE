'use client';

import { useState } from 'react';
import {
  QuoteStatus,
  Quote,
  QuoteFormData,
  QuoteFormItem,
} from '@/app/sales/types/NewQuoteListType';
import NewQuoteModal from './NewQuoteModal';
import QuoteDetailModal from './QuoteDetailModal';

const SalesQuoteList = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [statusFilter, setStatusFilter] = useState<'all' | QuoteStatus>('all');
  const [showQuoteModal, setShowQuoteModal] = useState(false);
  const [selectedQuote, setSelectedQuote] = useState<Quote | null>(null);
  const [showNewQuoteModal, setShowNewQuoteModal] = useState(false);
  const [selectedQuotes, setSelectedQuotes] = useState<string[]>([]);

  const [startDate, setStartDate] = useState('');
  const [endDate, setEndDate] = useState('');

  const [quotes, setQuotes] = useState<Quote[]>([
    {
      id: 'Q2024001',
      customer: '삼성전자',
      contact: '김철수',
      date: '2024-01-15',
      deliveryDate: '2024-02-15',
      amount: 15000000,
      status: '대기',
    },
    {
      id: 'Q2024002',
      customer: 'LG전자',
      contact: '이영희',
      date: '2024-01-16',
      deliveryDate: '2024-02-20',
      amount: 8500000,
      status: '검토',
    },
    {
      id: 'Q2024003',
      customer: '현대자동차',
      contact: '박민수',
      date: '2024-01-17',
      deliveryDate: '2024-03-01',
      amount: 25000000,
      status: '승인',
    },
    {
      id: 'Q2024004',
      customer: 'SK하이닉스',
      contact: '정수진',
      date: '2024-01-18',
      deliveryDate: '2024-02-28',
      amount: 12000000,
      status: '반려',
    },
    {
      id: 'Q2024005',
      customer: '네이버',
      contact: '최동훈',
      date: '2024-01-19',
      deliveryDate: '2024-03-15',
      amount: 6800000,
      status: '대기',
    },
  ]);
  const getStatusColor = (status: QuoteStatus) => {
    switch (status) {
      case 'draft':
        return 'bg-gray-100 text-gray-800';
      case 'pending':
        return 'bg-yellow-100 text-yellow-800';
      case 'approved':
        return 'bg-green-100 text-green-800';
      case 'rejected':
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
      case 'draft':
        return '대기';
      case 'pending':
        return '검토';
      case 'approved':
        return '승인';
      case 'rejected':
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

  const filteredQuotes = quotes.filter((quote) => {
    const matchesSearch =
      quote.customer.toLowerCase().includes(searchTerm.toLowerCase()) ||
      quote.id.toLowerCase().includes(searchTerm.toLowerCase()) ||
      quote.contact.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesStatus = statusFilter === 'all' || quote.status === statusFilter;
    return matchesSearch && matchesStatus;
  });

  const handleViewQuote = (quote: Quote) => {
    setSelectedQuote(quote);
    setShowQuoteModal(true);
  };

  const handleSelectAll = () => {
    if (selectedQuotes.length === filteredQuotes.length) {
      setSelectedQuotes([]);
    } else {
      setSelectedQuotes(filteredQuotes.map((quote) => quote.id));
    }
  };

  const handleCheckboxChange = (quoteId: string) => {
    setSelectedQuotes((prev) =>
      prev.includes(quoteId) ? prev.filter((id) => id !== quoteId) : [...prev, quoteId],
    );
  };

  const handleDownloadPDF = (quote: Quote) => {
    const element = document.createElement('a');
    const content = `견적서 ${quote.id}\n고객: ${quote.customer}\n금액: ₩${quote.amount.toLocaleString()}`;
    const file = new Blob([content], { type: 'text/plain' });
    element.href = URL.createObjectURL(file);
    element.download = `견적서_${quote.id}.txt`;
    document.body.appendChild(element);
    element.click();
    document.body.removeChild(element);

    alert(`견적서 ${quote.id}가 다운로드되었습니다.`);
  };

  const handleDeleteQuote = (quote: Quote) => {
    if (confirm(`견적서 ${quote.id}를 정말 삭제하시겠습니까?\n이 작업은 되돌릴 수 없습니다.`)) {
      setQuotes((prevQuotes) => prevQuotes.filter((q) => q.id !== quote.id));
      alert(`견적서 ${quote.id}가 삭제되었습니다.`);
    }
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
              className="px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent text-sm"
            />
          </div>
          <div className="flex items-center space-x-2">
            <label className="text-sm font-medium text-gray-700">끝날짜:</label>
            <input
              type="date"
              value={endDate}
              onChange={(e: React.ChangeEvent<HTMLInputElement>) => setEndDate(e.target.value)}
              className="px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent text-sm"
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
                className="pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent w-80"
              />
            </div>

            <select
              value={statusFilter}
              onChange={(e: React.ChangeEvent<HTMLSelectElement>) =>
                setStatusFilter(e.target.value as 'all' | QuoteStatus)
              }
              className="px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent pr-8"
            >
              <option value="all">전체 상태</option>
              <option value="대기">대기</option>
              <option value="검토">검토</option>
              <option value="승인">승인</option>
              <option value="반려">반려</option>
            </select>
          </div>

          <button
            onClick={() => setShowNewQuoteModal(true)}
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
          <table className="w-full">
            <thead className="bg-gray-50">
              <tr>
                <th className="px-6 py-3 text-left">
                  <input
                    type="checkbox"
                    checked={
                      selectedQuotes.length === filteredQuotes.length && filteredQuotes.length > 0
                    }
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
              {filteredQuotes.map((quote) => (
                <tr key={quote.id} className="hover:bg-gray-50">
                  <td className="px-6 py-4 whitespace-nowrap">
                    <input
                      type="checkbox"
                      checked={selectedQuotes.includes(quote.id)}
                      onChange={() => handleCheckboxChange(quote.id)}
                      className="rounded border-gray-300 text-blue-600 focus:ring-blue-500"
                    />
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                    {quote.id}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                    {quote.customer}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                    {quote.contact}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                    {quote.date}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                    {quote.deliveryDate}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                    {quote.amount.toLocaleString()}원
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                    <span
                      className={`inline-flex px-2 py-1 text-xs font-medium rounded-full ${getStatusColor(quote.status)}`}
                    >
                      {getStatusText(quote.status)}
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
        </div>
        {/* 신규 견적서 작성 모달 */}
        {/* <NewQuoteModal
          $showNewQuoteModal={showNewQuoteModal}
          $setShowNewQuoteModal={setShowNewQuoteModal}
        /> */}
        {/* 견적서 상세보기 모달 */}
        <QuoteDetailModal
          $showQuoteModal={showQuoteModal}
          $setShowQuoteModal={setShowQuoteModal}
          $selectedQuote={selectedQuote}
          $getStatusColor={getStatusColor}
          $getStatusText={getStatusText}
        />
      </div>
    </div>
  );
};

export default SalesQuoteList;
