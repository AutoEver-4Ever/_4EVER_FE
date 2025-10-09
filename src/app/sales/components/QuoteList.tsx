'use client';

import { useState } from 'react';

type QuoteStatus =
  | 'draft'
  | 'pending'
  | 'approved'
  | 'rejected'
  | '승인됨'
  | '검토중'
  | '임시저장'
  | '거절됨';

type QuotePriority = '긴급' | '높음' | '보통' | '낮음';

interface QuoteItem {
  product: string;
  specification: string;
  quantity: number;
  unitPrice: number;
}

interface Quote {
  id: string;
  customer: string;
  contact: string;
  email: string;
  quoteDate: string;
  validUntil: string;
  amount: number;
  status: QuoteStatus;
  priority: QuotePriority;
  items: QuoteItem[];
}

interface QuoteFormItem {
  id: number;
  product: string;
  specification: string;
  quantity: number;
  unitPrice: number;
  totalPrice: number;
}

interface QuoteFormData {
  customer: string;
  customerContact: string;
  customerEmail: string;
  quoteDate: string;
  validUntil: string;
  priority: QuotePriority;
  items: QuoteFormItem[];
  totalAmount: number;
  notes: string;
  paymentTerms: string;
  deliveryTerms: string;
  warranty: string;
}

const QuoteList = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [statusFilter, setStatusFilter] = useState<'all' | QuoteStatus>('all');
  const [showQuoteModal, setShowQuoteModal] = useState(false);
  const [selectedQuote, setSelectedQuote] = useState<Quote | null>(null);
  const [showNewQuoteModal, setShowNewQuoteModal] = useState(false);

  const [quotes, setQuotes] = useState<Quote[]>([
    {
      id: 'Q2024001',
      customer: '삼성전자',
      contact: '김철수',
      email: 'kim@samsung.com',
      quoteDate: '2024-01-15',
      validUntil: '2024-02-15',
      amount: 15000000,
      status: '승인됨',
      priority: '높음',
      items: [
        {
          product: '스테인리스 강판',
          specification: 'SUS304 2.0T',
          quantity: 100,
          unitPrice: 150000,
        },
      ],
    },
    {
      id: 'Q2024002',
      customer: 'LG전자',
      contact: '이영희',
      email: 'lee@lge.com',
      quoteDate: '2024-01-16',
      validUntil: '2024-02-20',
      amount: 8500000,
      status: '검토중',
      priority: '긴급',
      items: [
        {
          product: '알루미늄 파이프',
          specification: 'AL6061 Φ50',
          quantity: 200,
          unitPrice: 42500,
        },
      ],
    },
    {
      id: 'Q2024003',
      customer: '현대자동차',
      contact: '박민수',
      email: 'park@hyundai.com',
      quoteDate: '2024-01-17',
      validUntil: '2024-03-01',
      amount: 25000000,
      status: '임시저장',
      priority: '보통',
      items: [
        {
          product: '탄소강 봉재',
          specification: 'S45C Φ30',
          quantity: 500,
          unitPrice: 50000,
        },
      ],
    },
    {
      id: 'Q2024004',
      customer: 'SK하이닉스',
      contact: '정수진',
      email: 'jung@skhynix.com',
      quoteDate: '2024-01-18',
      validUntil: '2024-02-28',
      amount: 12000000,
      status: '거절됨',
      priority: '낮음',
      items: [
        {
          product: '구리 시트',
          specification: 'C1100 1.5T',
          quantity: 80,
          unitPrice: 150000,
        },
      ],
    },
    {
      id: 'Q2024005',
      customer: '네이버',
      contact: '최동훈',
      email: 'choi@naver.com',
      quoteDate: '2024-01-19',
      validUntil: '2024-03-15',
      amount: 6800000,
      status: '승인됨',
      priority: '보통',
      items: [
        {
          product: '클라우드 서버 모듈',
          specification: '고성능 GPU 포함',
          quantity: 20,
          unitPrice: 340000,
        },
      ],
    },
  ]);

  const [newQuoteData, setNewQuoteData] = useState<QuoteFormData>({
    customer: '',
    customerContact: '',
    customerEmail: '',
    quoteDate: new Date().toISOString().split('T')[0],
    validUntil: '',
    priority: '보통',
    items: [
      {
        id: 1,
        product: '',
        specification: '',
        quantity: 1,
        unitPrice: 0,
        totalPrice: 0,
      },
    ],
    totalAmount: 0,
    notes: '',
    paymentTerms: '30일 후 결제',
    deliveryTerms: 'FOB 공장도',
    warranty: '1년',
  });

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
      case '승인됨':
        return 'bg-green-100 text-green-800';
      case '검토중':
        return 'bg-yellow-100 text-yellow-800';
      case '임시저장':
        return 'bg-gray-100 text-gray-800';
      case '거절됨':
        return 'bg-red-100 text-red-800';
      default:
        return 'bg-gray-100 text-gray-800';
    }
  };

  const getStatusText = (status: QuoteStatus) => {
    switch (status) {
      case 'draft':
        return '임시저장';
      case 'pending':
        return '검토중';
      case 'approved':
        return '승인됨';
      case 'rejected':
        return '거절됨';
      case '승인됨':
        return '승인됨';
      case '검토중':
        return '검토중';
      case '임시저장':
        return '임시저장';
      case '거절됨':
        return '거절됨';
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

  const handleNewQuoteSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    const quoteNumber = `QT-${new Date().getFullYear()}-${String(Math.floor(Math.random() * 1000) + 1).padStart(3, '0')}`;

    alert(
      `신규 견적서가 성공적으로 작성되었습니다!\n견적번호: ${quoteNumber}\n고객: ${newQuoteData.customer}\n총 금액: ₩${newQuoteData.totalAmount.toLocaleString()}`,
    );

    setShowNewQuoteModal(false);
    setNewQuoteData({
      customer: '',
      customerContact: '',
      customerEmail: '',
      quoteDate: new Date().toISOString().split('T')[0],
      validUntil: '',
      priority: '보통',
      items: [
        {
          id: 1,
          product: '',
          specification: '',
          quantity: 1,
          unitPrice: 0,
          totalPrice: 0,
        },
      ],
      totalAmount: 0,
      notes: '',
      paymentTerms: '30일 후 결제',
      deliveryTerms: 'FOB 공장도',
      warranty: '1년',
    });
  };

  const updateQuoteData = <K extends keyof QuoteFormData>(field: K, value: QuoteFormData[K]) => {
    setNewQuoteData((prev) => ({
      ...prev,
      [field]: value,
    }));
  };

  const updateQuoteItem = <K extends keyof QuoteFormItem>(
    itemId: number,
    field: K,
    value: QuoteFormItem[K],
  ) => {
    setNewQuoteData((prev) => {
      const updatedItems = prev.items.map((item) => {
        if (item.id !== itemId) {
          return item;
        }
        const nextItem: QuoteFormItem = { ...item, [field]: value } as QuoteFormItem;
        if (field === 'quantity' || field === 'unitPrice') {
          const quantity = field === 'quantity' ? (value as number) : nextItem.quantity;
          const unitPrice = field === 'unitPrice' ? (value as number) : nextItem.unitPrice;
          nextItem.totalPrice = quantity * unitPrice;
        }
        return nextItem;
      });

      const totalAmount = updatedItems.reduce((sum, item) => sum + item.totalPrice, 0);

      return {
        ...prev,
        items: updatedItems,
        totalAmount,
      };
    });
  };

  const addQuoteItem = () => {
    setNewQuoteData((prev) => {
      const nextId = prev.items.length ? Math.max(...prev.items.map((item) => item.id)) + 1 : 1;
      const newItem: QuoteFormItem = {
        id: nextId,
        product: '',
        specification: '',
        quantity: 1,
        unitPrice: 0,
        totalPrice: 0,
      };
      return {
        ...prev,
        items: [...prev.items, newItem],
      };
    });
  };

  const removeQuoteItem = (itemId: number) => {
    setNewQuoteData((prev) => {
      if (prev.items.length <= 1) {
        return prev;
      }
      const items = prev.items.filter((item) => item.id !== itemId);
      const totalAmount = items.reduce((sum, item) => sum + item.totalPrice, 0);
      return {
        ...prev,
        items,
        totalAmount,
      };
    });
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
    <div className="space-y-6">
      {/* 헤더 및 필터 */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 mt-8">
        <div className="flex items-center space-x-4">
          <div className="relative">
            <i className="ri-search-line absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400"></i>
            <input
              type="text"
              placeholder="견적번호, 고객명, 담당자로 검색..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus-border-transparent w-80"
            />
          </div>

          <select
            value={statusFilter}
            onChange={(e) => setStatusFilter(e.target.value as 'all' | QuoteStatus)}
            className="px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus-border-transparent pr-8"
          >
            <option value="all">전체 상태</option>
            <option value="draft">임시저장</option>
            <option value="pending">검토중</option>
            <option value="approved">승인됨</option>
            <option value="rejected">거절됨</option>
          </select>
        </div>

        <button
          onClick={() => setShowNewQuoteModal(true)}
          className="px-4 py-2 bg-blue-600 text-white font-medium rounded-lg hover:bg-blue-700 transition-colors duration-200 cursor-pointer whitespace-nowrap flex items-center space-x-2"
        >
          <i className="ri-add-line"></i>
          <span>견적서 작성</span>
        </button>
      </div>

      {/* 견적 목록 */}
      <div className="bg-white rounded-lg shadow-sm border border-gray-200">
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead className="bg-gray-50">
              <tr>
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
                    {quote.quoteDate}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                    {quote.validUntil || '-'}
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

                      <button
                        onClick={() => handleDownloadPDF(quote)}
                        className="text-purple-600 hover:text-purple-800 cursor-pointer"
                        title="PDF 다운로드"
                      >
                        <i className="ri-download-line"></i>
                      </button>
                      <button
                        onClick={() => handleDeleteQuote(quote)}
                        className="text-red-600 hover:text-red-800 cursor-pointer"
                        title="삭제"
                      >
                        <i className="ri-delete-bin-line"></i>
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {filteredQuotes.length === 0 && (
          <div className="text-center py-12">
            <i className="ri-file-list-3-line text-4xl text-gray-300 mb-4"></i>
            <p className="text-gray-500">검색 조건에 맞는 견적서가 없습니다.</p>
          </div>
        )}
      </div>

      {/* 신규 견적서 작성 모달 */}
      {showNewQuoteModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white rounded-lg p-6 w-full max-w-4xl mx-4 max-h-[90vh] overflow-y-auto">
            <div className="flex items-center justify-between mb-6">
              <h3 className="text-xl font-semibold text-gray-900">견적서 작성</h3>
              <button
                onClick={() => setShowNewQuoteModal(false)}
                className="text-gray-400 hover:text-gray-600 cursor-pointer"
              >
                <i className="ri-close-line text-2xl"></i>
              </button>
            </div>

            <form onSubmit={handleNewQuoteSubmit} className="space-y-6">
              {/* 고객 정보 */}
              <div className="bg-gray-50 rounded-lg p-4">
                <h4 className="text-lg font-medium text-gray-900 mb-4">고객 정보</h4>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">고객명 *</label>
                    <input
                      type="text"
                      value={newQuoteData.customer}
                      onChange={(e) => updateQuoteData('customer', e.target.value)}
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus-border-transparent"
                      placeholder="고객명을 입력하세요"
                      required
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">담당자</label>
                    <input
                      type="text"
                      value={newQuoteData.customerContact}
                      onChange={(e) => updateQuoteData('customerContact', e.target.value)}
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus-border-transparent"
                      placeholder="담당자명을 입력하세요"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">이메일</label>
                    <input
                      type="email"
                      value={newQuoteData.customerEmail}
                      onChange={(e) => updateQuoteData('customerEmail', e.target.value)}
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus-border-transparent"
                      placeholder="이메일을 입력하세요"
                    />
                  </div>
                </div>
              </div>

              {/* 견적 정보 */}
              <div className="bg-gray-50 rounded-lg p-4">
                <h4 className="text-lg font-medium text-gray-900 mb-4">견적 정보</h4>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      견적일자 *
                    </label>
                    <input
                      type="date"
                      value={newQuoteData.quoteDate}
                      onChange={(e) => updateQuoteData('quoteDate', e.target.value)}
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus-border-transparent"
                      required
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      요청 납기 일자
                    </label>
                    <input
                      type="date"
                      value={newQuoteData.validUntil}
                      onChange={(e) => updateQuoteData('validUntil', e.target.value)}
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus-border-transparent"
                    />
                  </div>
                </div>
              </div>

              {/* 견적 품목 */}
              <div>
                <div className="flex items-center justify-between mb-4">
                  <h4 className="text-lg font-medium text-gray-900">견적 품목</h4>
                  <button
                    type="button"
                    onClick={addQuoteItem}
                    className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors cursor-pointer whitespace-nowrap flex items-center space-x-2"
                  >
                    <i className="ri-add-line"></i>
                    <span>품목 추가</span>
                  </button>
                </div>

                <div className="overflow-x-auto">
                  <table className="w-full border border-gray-300 rounded-lg">
                    <thead className="bg-gray-50">
                      <tr>
                        <th className="px-4 py-3 text-left text-sm font-medium text-gray-700 border-b">
                          제품명
                        </th>
                        <th className="px-4 py-3 text-left text-sm font-medium text-gray-700 border-b">
                          사양
                        </th>
                        <th className="px-4 py-3 text-center text-sm font-medium text-gray-700 border-b">
                          수량
                        </th>
                        <th className="px-4 py-3 text-right text-sm font-medium text-gray-700 border-b">
                          단가
                        </th>
                        <th className="px-4 py-3 text-right text-sm font-medium text-gray-700 border-b">
                          금액
                        </th>
                        <th className="px-4 py-3 text-center text-sm font-medium text-gray-700 border-b">
                          작업
                        </th>
                      </tr>
                    </thead>
                    <tbody>
                      {newQuoteData.items.map((item) => (
                        <tr key={item.id} className="border-b">
                          <td className="px-4 py-3">
                            <input
                              type="text"
                              value={item.product}
                              onChange={(e) => updateQuoteItem(item.id, 'product', e.target.value)}
                              className="w-full px-2 py-1 border border-gray-300 rounded text-sm"
                              placeholder="제품명"
                            />
                          </td>
                          <td className="px-4 py-3">
                            <input
                              type="text"
                              value={item.specification}
                              onChange={(e) =>
                                updateQuoteItem(item.id, 'specification', e.target.value)
                              }
                              className="w-full px-2 py-1 border border-gray-300 rounded text-sm"
                              placeholder="상세 사양"
                            />
                          </td>
                          <td className="px-4 py-3">
                            <input
                              type="number"
                              value={item.quantity}
                              onChange={(e) =>
                                updateQuoteItem(item.id, 'quantity', Number(e.target.value))
                              }
                              className="w-20 px-2 py-1 border border-gray-300 rounded text-sm text-center"
                              min="1"
                            />
                          </td>
                          <td className="px-4 py-3">
                            <input
                              type="number"
                              value={item.unitPrice}
                              onChange={(e) =>
                                updateQuoteItem(item.id, 'unitPrice', Number(e.target.value))
                              }
                              className="w-24 px-2 py-1 border border-gray-300 rounded text-sm text-right"
                              min="0"
                            />
                          </td>
                          <td className="px-4 py-3 text-right text-sm font-medium">
                            ₩{item.totalPrice.toLocaleString()}
                          </td>
                          <td className="px-4 py-3 text-center">
                            <button
                              type="button"
                              onClick={() => removeQuoteItem(item.id)}
                              disabled={newQuoteData.items.length <= 1}
                              className={`${
                                newQuoteData.items.length <= 1
                                  ? 'text-gray-300 cursor-not-allowed'
                                  : 'text-red-600 hover:text-red-800 cursor-pointer'
                              }`}
                            >
                              <i className="ri-delete-bin-line"></i>
                            </button>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                    <tfoot className="bg-gray-50">
                      <tr>
                        <td colSpan={4} className="px-4 py-3 text-right font-medium text-gray-900">
                          총 견적금액
                        </td>
                        <td className="px-4 py-3 text-right font-bold text-lg text-blue-600">
                          ₩{newQuoteData.totalAmount.toLocaleString()}
                        </td>
                        <td></td>
                      </tr>
                    </tfoot>
                  </table>
                </div>
              </div>

              {/* 비고 */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">비고</label>
                <textarea
                  value={newQuoteData.notes}
                  onChange={(e) => updateQuoteData('notes', e.target.value)}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus-border-transparent"
                  rows={3}
                  placeholder="추가 요청사항이나 특이사항을 입력하세요"
                />
              </div>

              {/* 버튼 */}
              <div className="flex gap-3 pt-6 border-t border-gray-200">
                <button
                  type="button"
                  onClick={() => setShowNewQuoteModal(false)}
                  className="flex-1 px-4 py-2 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 transition-colors font-medium cursor-pointer whitespace-nowrap"
                >
                  취소
                </button>
                <button
                  type="submit"
                  className="px-6 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors font-medium cursor-pointer whitespace-nowrap"
                >
                  견적서 작성
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* 견적서 상세보기 모달 */}
      {showQuoteModal && selectedQuote && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white rounded-lg p-6 w-full max-w-4xl mx-4 max-h-[90vh] overflow-y-auto">
            <div className="flex items-center justify-between mb-6">
              <h3 className="text-xl font-semibold text-gray-900">견적서 상세정보</h3>
              <button
                onClick={() => setShowQuoteModal(false)}
                className="text-gray-400 hover:text-gray-600 cursor-pointer"
              >
                <i className="ri-close-line text-2xl"></i>
              </button>
            </div>

            <div className="space-y-6">
              {/* 견적 기본 정보 */}
              <div className="bg-gray-50 rounded-lg p-4">
                <h4 className="text-lg font-medium text-gray-900 mb-4">견적 정보</h4>
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700">견적번호</label>
                    <p className="text-sm text-gray-900 mt-1">{selectedQuote.id}</p>
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700">견적일자</label>
                    <p className="text-sm text-gray-900 mt-1">{selectedQuote.quoteDate}</p>
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700">유효기간</label>
                    <p className="text-sm text-gray-900 mt-1">{selectedQuote.validUntil || '-'}</p>
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700">상태</label>
                    <span
                      className={`inline-flex px-2 py-1 text-xs font-medium rounded-full mt-1 ${getStatusColor(selectedQuote.status)}`}
                    >
                      {getStatusText(selectedQuote.status)}
                    </span>
                  </div>
                </div>
              </div>

              {/* 고객 정보 */}
              <div className="bg-gray-50 rounded-lg p-4">
                <h4 className="text-lg font-medium text-gray-900 mb-4">고객 정보</h4>
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700">고객명</label>
                    <p className="text-sm text-gray-900 mt-1">{selectedQuote.customer}</p>
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700">담당자</label>
                    <p className="text-sm text-gray-900 mt-1">{selectedQuote.contact}</p>
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700">이메일</label>
                    <p className="text-sm text-gray-900 mt-1">{selectedQuote.email}</p>
                  </div>
                </div>
              </div>

              {/* 견적 품목 */}
              <div>
                <h4 className="text-lg font-medium text-gray-900 mb-4">견적 품목</h4>
                <div className="overflow-x-auto">
                  <table className="w-full border border-gray-300 rounded-lg">
                    <thead className="bg-gray-50">
                      <tr>
                        <th className="px-4 py-3 text-left text-sm font-medium text-gray-700 border-b">
                          제품명
                        </th>
                        <th className="px-4 py-3 text-left text-sm font-medium text-gray-700 border-b">
                          사양
                        </th>
                        <th className="px-4 py-3 text-center text-sm font-medium text-gray-700 border-b">
                          수량
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
                      {selectedQuote.items.map((item, index) => (
                        <tr key={index} className="border-b">
                          <td className="px-4 py-3 text-sm">{item.product}</td>
                          <td className="px-4 py-3 text-sm">{item.specification}</td>
                          <td className="px-4 py-3 text-center text-sm">{item.quantity}</td>
                          <td className="px-4 py-3 text-right text-sm">
                            ₩{item.unitPrice.toLocaleString()}
                          </td>
                          <td className="px-4 py-3 text-right text-sm font-medium">
                            ₩{(item.quantity * item.unitPrice).toLocaleString()}
                          </td>
                        </tr>
                      ))}
                    </tbody>
                    <tfoot className="bg-gray-50">
                      <tr>
                        <td colSpan={4} className="px-4 py-3 text-right font-medium text-gray-900">
                          총 견적금액
                        </td>
                        <td className="px-4 py-3 text-right font-bold text-lg text-blue-600">
                          ₩{selectedQuote.amount.toLocaleString()}
                        </td>
                      </tr>
                    </tfoot>
                  </table>
                </div>
              </div>

              {/* 버튼 */}
              <div className="flex gap-3 pt-6 border-t border-gray-200">
                <button
                  onClick={() => setShowQuoteModal(false)}
                  className="flex-1 px-4 py-2 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 transition-colors font-medium cursor-pointer whitespace-nowrap"
                >
                  닫기
                </button>
                <button className="px-6 py-2 bg-purple-600 text-white rounded-lg hover:bg-purple-700 transition-colors font-medium cursor-pointer whitespace-nowrap">
                  PDF 다운로드
                </button>
                <button className="px-6 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 transition-colors font-medium cursor-pointer whitespace-nowrap">
                  주문으로 전환
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default QuoteList;
