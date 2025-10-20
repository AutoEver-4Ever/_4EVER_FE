'use client';

import { useState } from 'react';

export default function MesTab() {
  const [showProcessModal, setShowProcessModal] = useState(false);
  const [statusFilter, setStatusFilter] = useState('전체');
  const [quoteFilter, setQuoteFilter] = useState('전체');
  const [processFilter, setProcessFilter] = useState('전체');

  const statusOptions = ['전체', '대기', '진행중'];
  const quoteOptions = [
    '전체',
    'Q-2024-001',
    'Q-2024-002',
    'Q-2024-003',
    'Q-2024-004',
    'Q-2024-005',
  ];
  const processOptions = ['전체', 'OP10', 'OP20', 'OP30', 'OP40', 'OP50', 'OP60'];

  const productionOrders = [
    {
      id: 'WO-2024-001',
      productName: '산업용 모터 5HP',
      quantity: 50,
      status: 'in_progress',
      progress: 65,
      startDate: '2024-01-15',
      dueDate: '2024-02-10',
      currentProcess: 'OP30',
      quote: 'Q-2024-001',
      processes: [
        {
          code: 'OP10',
          name: '재료 준비',
          status: 'completed',
          startTime: '09:00',
          endTime: '10:30',
        },
        { code: 'OP20', name: '가공', status: 'completed', startTime: '10:30', endTime: '14:00' },
        { code: 'OP30', name: '조립', status: 'in_progress', startTime: '14:00', endTime: null },
        { code: 'OP40', name: '테스트', status: 'pending', startTime: null, endTime: null },
        { code: 'OP50', name: '포장', status: 'pending', startTime: null, endTime: null },
        { code: 'OP60', name: '출하', status: 'pending', startTime: null, endTime: null },
      ],
    },
    {
      id: 'WO-2024-002',
      productName: '알루미늄 프레임',
      quantity: 100,
      status: 'pending',
      progress: 0,
      startDate: '2024-01-20',
      dueDate: '2024-02-15',
      currentProcess: 'OP10',
      quote: 'Q-2024-002',
      processes: [
        { code: 'OP10', name: '재료 준비', status: 'pending', startTime: null, endTime: null },
        { code: 'OP20', name: '절단', status: 'pending', startTime: null, endTime: null },
        { code: 'OP30', name: '용접', status: 'pending', startTime: null, endTime: null },
        { code: 'OP40', name: '표면처리', status: 'pending', startTime: null, endTime: null },
        { code: 'OP50', name: '검사', status: 'pending', startTime: null, endTime: null },
        { code: 'OP60', name: '포장', status: 'pending', startTime: null, endTime: null },
      ],
    },
    {
      id: 'WO-2024-003',
      productName: '제어판넬',
      quantity: 30,
      status: 'in_progress',
      progress: 40,
      startDate: '2024-01-18',
      dueDate: '2024-02-12',
      currentProcess: 'OP20',
      quote: 'Q-2024-003',
      processes: [
        {
          code: 'OP10',
          name: '재료 준비',
          status: 'completed',
          startTime: '08:00',
          endTime: '09:30',
        },
        { code: 'OP20', name: '조립', status: 'in_progress', startTime: '09:30', endTime: null },
        { code: 'OP30', name: '배선', status: 'pending', startTime: null, endTime: null },
        { code: 'OP40', name: '테스트', status: 'pending', startTime: null, endTime: null },
        { code: 'OP50', name: '포장', status: 'pending', startTime: null, endTime: null },
      ],
    },
  ];

  const getStatusBadge = (status: string) => {
    const statusConfig = {
      pending: { label: '대기', class: 'bg-yellow-100 text-yellow-800' },
      in_progress: { label: '진행중', class: 'bg-blue-100 text-blue-800' },
      completed: { label: '완료', class: 'bg-green-100 text-green-800' },
      on_hold: { label: '보류', class: 'bg-red-100 text-red-800' },
    };
    const config = statusConfig[status as keyof typeof statusConfig];
    return (
      <span className={`px-2 py-1 rounded-full text-xs font-medium ${config.class}`}>
        {config.label}
      </span>
    );
  };

  const getProcessStatusIcon = (status: string) => {
    const icons = {
      completed: 'ri-checkbox-circle-fill text-green-600',
      in_progress: 'ri-play-circle-fill text-blue-600',
      pending: 'ri-time-line text-gray-400',
    };
    return icons[status as keyof typeof icons];
  };

  const filteredOrders = productionOrders.filter((order) => {
    const statusMatch =
      statusFilter === '전체' ||
      (statusFilter === '대기' && order.status === 'pending') ||
      (statusFilter === '진행중' && order.status === 'in_progress');

    const quoteMatch = quoteFilter === '전체' || order.quote === quoteFilter;

    const processMatch = processFilter === '전체' || order.currentProcess === processFilter;

    return statusMatch && quoteMatch && processMatch;
  });

  return (
    <div className="bg-white rounded-lg shadow-sm border">
      <div className="p-6 border-b border-gray-200">
        <div className="flex items-center justify-between">
          <h2 className="text-lg font-semibold text-gray-900">제조실행시스템 (MES)</h2>
        </div>
      </div>

      {/* 필터 영역 */}
      <div className="p-6 border-b border-gray-200">
        <div className="flex gap-4 items-end">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">상태</label>
            <select
              className="w-32 px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-transparent text-sm pr-8"
              value={statusFilter}
              onChange={(e) => setStatusFilter(e.target.value)}
            >
              {statusOptions.map((status) => (
                <option key={status} value={status}>
                  {status}
                </option>
              ))}
            </select>
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">견적</label>
            <select
              className="w-40 px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-transparent text-sm pr-8"
              value={quoteFilter}
              onChange={(e) => setQuoteFilter(e.target.value)}
            >
              {quoteOptions.map((quote) => (
                <option key={quote} value={quote}>
                  {quote}
                </option>
              ))}
            </select>
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">공정</label>
            <select
              className="w-32 px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-transparent text-sm pr-8"
              value={processFilter}
              onChange={(e) => setProcessFilter(e.target.value)}
            >
              {processOptions.map((process) => (
                <option key={process} value={process}>
                  {process}
                </option>
              ))}
            </select>
          </div>
        </div>
      </div>

      <div className="p-6">
        <div className="space-y-4">
          {filteredOrders.map((order) => (
            <div key={order.id} className="border border-gray-200 rounded-lg p-4 hover:bg-gray-50">
              <div className="flex items-center justify-between mb-3">
                <div>
                  <div className="text-sm font-medium text-gray-900">{order.id}</div>
                  <div className="text-xs text-gray-500">
                    {order.productName} ({order.quantity}EA)
                  </div>
                  <div className="text-xs text-blue-600 mt-1">견적: {order.quote}</div>
                </div>
                {getStatusBadge(order.status)}
              </div>

              <div className="grid grid-cols-2 md:grid-cols-3 gap-4 mb-3">
                <div>
                  <div className="text-xs text-gray-500">현재 공정</div>
                  <div className="text-sm font-medium text-gray-900">{order.currentProcess}</div>
                </div>
                <div>
                  <div className="text-xs text-gray-500">시작일</div>
                  <div className="text-sm text-gray-900">{order.startDate}</div>
                </div>
                <div>
                  <div className="text-xs text-gray-500">완료 예정일</div>
                  <div className="text-sm text-gray-900">{order.dueDate}</div>
                </div>
              </div>

              {order.status === 'in_progress' && (
                <div className="mb-3">
                  <div className="flex items-center justify-between mb-1">
                    <span className="text-xs text-gray-500">진행률</span>
                    <span className="text-xs font-medium text-gray-900">{order.progress}%</span>
                  </div>
                  <div className="w-full bg-gray-200 rounded-full h-2">
                    <div
                      className="bg-blue-600 h-2 rounded-full transition-all duration-300"
                      style={{ width: `${order.progress}%` }}
                    ></div>
                  </div>
                </div>
              )}

              <div className="mb-3">
                <div className="text-xs text-gray-500 mb-2">공정 현황</div>
                <div className="flex items-center gap-2 overflow-x-auto">
                  {order.processes.map((process, index) => (
                    <div key={process.code} className="flex items-center gap-1 whitespace-nowrap">
                      <i className={`${getProcessStatusIcon(process.status)} text-sm`}></i>
                      <span
                        className={`text-xs ${
                          process.status === 'completed'
                            ? 'text-green-600'
                            : process.status === 'in_progress'
                              ? 'text-blue-600'
                              : 'text-gray-500'
                        }`}
                      >
                        {process.code}
                      </span>
                      {index < order.processes.length - 1 && (
                        <i className="ri-arrow-right-line text-xs text-gray-300 mx-1"></i>
                      )}
                    </div>
                  ))}
                </div>
              </div>

              <div className="flex gap-2">
                <button
                  onClick={() => setShowProcessModal(true)}
                  className="text-xs text-blue-600 hover:text-blue-800 cursor-pointer"
                >
                  <i className="ri-eye-line mr-1"></i>공정상세
                </button>
              </div>
            </div>
          ))}
        </div>

        {filteredOrders.length === 0 && (
          <div className="text-center py-8 text-gray-500">
            선택한 조건에 해당하는 작업지시가 없습니다.
          </div>
        )}
      </div>

      {/* 공정 상세 모달 */}
      {showProcessModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white rounded-lg p-6 w-full max-w-3xl mx-4 max-h-[90vh] overflow-y-auto">
            <div className="flex items-center justify-between mb-6">
              <h3 className="text-xl font-semibold">공정 상세 현황</h3>
              <button
                onClick={() => setShowProcessModal(false)}
                className="text-gray-400 hover:text-gray-600 cursor-pointer"
              >
                <i className="ri-close-line text-xl"></i>
              </button>
            </div>

            <div className="space-y-6">
              <div className="bg-gray-50 p-4 rounded-lg">
                <h4 className="text-lg font-semibold text-gray-900 mb-3">작업지시 정보</h4>
                <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                  <div>
                    <div className="text-xs text-gray-500">작업지시번호</div>
                    <div className="text-sm font-medium text-gray-900">WO-2024-001</div>
                  </div>
                  <div>
                    <div className="text-xs text-gray-500">제품명</div>
                    <div className="text-sm font-medium text-gray-900">산업용 모터 5HP</div>
                  </div>
                  <div>
                    <div className="text-xs text-gray-500">수량</div>
                    <div className="text-sm font-medium text-gray-900">50 EA</div>
                  </div>
                  <div>
                    <div className="text-xs text-gray-500">진행률</div>
                    <div className="text-sm font-medium text-blue-600">65%</div>
                  </div>
                </div>
              </div>

              <div>
                <h4 className="text-lg font-semibold text-gray-900 mb-3">공정별 상세 현황</h4>
                <div className="space-y-3">
                  {productionOrders[0].processes.map((process, index) => (
                    <div key={process.code} className="border border-gray-200 rounded-lg p-4">
                      <div className="flex items-center justify-between mb-2">
                        <div className="flex items-center gap-3">
                          <i className={`${getProcessStatusIcon(process.status)} text-lg`}></i>
                          <div>
                            <div className="text-sm font-medium text-gray-900">
                              {process.code} - {process.name}
                            </div>
                            <div className="text-xs text-gray-500">공정 {index + 1}</div>
                          </div>
                        </div>
                        {getStatusBadge(process.status)}
                      </div>

                      <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mt-3">
                        <div>
                          <div className="text-xs text-gray-500">시작시간</div>
                          <div className="text-sm text-gray-900">{process.startTime || '-'}</div>
                        </div>
                        <div>
                          <div className="text-xs text-gray-500">종료시간</div>
                          <div className="text-sm text-gray-900">{process.endTime || '-'}</div>
                        </div>
                        <div>
                          <div className="text-xs text-gray-500">소요시간</div>
                          <div className="text-sm text-gray-900">
                            {process.startTime && process.endTime ? '3.5시간' : '-'}
                          </div>
                        </div>
                        <div>
                          <div className="text-xs text-gray-500">담당자</div>
                          <div className="text-sm text-gray-900">김작업</div>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>

            <div className="flex justify-end mt-6">
              <button
                onClick={() => setShowProcessModal(false)}
                className="px-4 py-2 bg-gray-600 text-white rounded-lg hover:bg-gray-700 transition-colors text-sm font-medium cursor-pointer"
              >
                닫기
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
