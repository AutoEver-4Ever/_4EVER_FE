'use client';

import { useState } from 'react';

export default function WorkflowStatus() {
  const [activeTab, setActiveTab] = useState('purchase');

  const purchaseWorkflows = [
    {
      id: 'PR-2024-001',
      type: '구매 요청',
      item: '강판',
      quantity: '500EA',
      status: 'approved',
      requester: '김철수',
      date: '2024-01-15',
    },
    {
      id: 'PO-2024-001',
      type: '발주서',
      item: '강판',
      quantity: '500EA',
      status: 'released',
      requester: '이영희',
      date: '2024-01-16',
    },
    {
      id: 'GRN-2024-001',
      type: '입고',
      item: '강판',
      quantity: '300EA',
      status: 'pending',
      requester: '박민수',
      date: '2024-01-17',
    },
    {
      id: 'PR-2024-002',
      type: '구매 요청',
      item: '알루미늄',
      quantity: '200EA',
      status: 'draft',
      requester: '최지영',
      date: '2024-01-18',
    },
  ];

  const salesWorkflows = [
    {
      id: 'SO-2024-001',
      type: '주문',
      item: '도어 패널',
      quantity: '50EA',
      status: 'confirmed',
      requester: 'B사',
      date: '2024-01-15',
    },
    {
      id: 'SO-2024-002',
      type: '주문',
      item: '범퍼',
      quantity: '30EA',
      status: 'shipped',
      requester: 'C사',
      date: '2024-01-16',
    },
    {
      id: 'SO-2024-003',
      type: '주문',
      item: '후드',
      quantity: '20EA',
      status: 'pending',
      requester: 'D사',
      date: '2024-01-17',
    },
    {
      id: 'INV-2024-001',
      type: '송장',
      item: '도어 패널',
      quantity: '50EA',
      status: 'issued',
      requester: 'B사',
      date: '2024-01-18',
    },
  ];

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'approved':
      case 'confirmed':
      case 'issued':
        return 'bg-green-100 text-green-700';
      case 'released':
      case 'shipped':
        return 'bg-blue-100 text-blue-700';
      case 'pending':
        return 'bg-yellow-100 text-yellow-700';
      case 'draft':
        return 'bg-gray-100 text-gray-700';
      default:
        return 'bg-gray-100 text-gray-700';
    }
  };

  const getStatusText = (status: string) => {
    switch (status) {
      case 'approved':
        return '승인됨';
      case 'released':
        return '발행됨';
      case 'pending':
        return '대기중';
      case 'draft':
        return '작성중';
      case 'confirmed':
        return '확정됨';
      case 'shipped':
        return '출하됨';
      case 'issued':
        return '발행됨';
      default:
        return status;
    }
  };

  const currentWorkflows = activeTab === 'purchase' ? purchaseWorkflows : salesWorkflows;

  return (
    <div className="bg-white rounded-lg border border-gray-200 p-6">
      <div className="flex items-center justify-between mb-6">
        <div className="flex items-center space-x-2">
          <i className="ri-flow-chart text-blue-600 text-lg"></i>
          <h2 className="text-lg font-semibold text-gray-900">워크플로우 현황</h2>
        </div>

        <div className="flex space-x-1 bg-gray-100 rounded-lg p-1">
          <button
            onClick={() => setActiveTab('purchase')}
            className={`px-4 py-2 rounded-md text-sm font-medium transition-colors duration-200 cursor-pointer whitespace-nowrap ${
              activeTab === 'purchase'
                ? 'bg-white text-blue-600 shadow-sm'
                : 'text-gray-600 hover:text-gray-900'
            }`}
          >
            구매 프로세스
          </button>
          <button
            onClick={() => setActiveTab('sales')}
            className={`px-4 py-2 rounded-md text-sm font-medium transition-colors duration-200 cursor-pointer whitespace-nowrap ${
              activeTab === 'sales'
                ? 'bg-white text-blue-600 shadow-sm'
                : 'text-gray-600 hover:text-gray-900'
            }`}
          >
            영업 프로세스
          </button>
        </div>
      </div>

      <div className="space-y-3">
        {currentWorkflows.map((workflow) => (
          <div
            key={workflow.id}
            className="flex items-center justify-between p-4 border border-gray-200 rounded-lg hover:bg-gray-50 transition-colors duration-200"
          >
            <div className="flex items-center space-x-4">
              <div className="w-10 h-10 bg-gray-100 rounded-lg flex items-center justify-center">
                <i className="ri-file-text-line text-gray-600"></i>
              </div>
              <div>
                <div className="flex items-center space-x-2">
                  <h3 className="text-sm font-medium text-gray-900">
                    {workflow.item} {workflow.type}
                  </h3>
                </div>
                <p className="text-sm text-gray-600 mt-1">
                  {workflow.id} {workflow.quantity}
                </p>
                <p className="text-xs text-gray-500 mt-1">
                  {workflow.requester} • {workflow.date}
                </p>
              </div>
            </div>
            <div
              className={`px-3 py-1 rounded-full text-xs font-medium ${getStatusColor(workflow.status)}`}
            >
              {getStatusText(workflow.status)}
            </div>
          </div>
        ))}
      </div>

      <div className="mt-6 pt-4 border-t border-gray-200">
        <div className="grid grid-cols-3 gap-4 text-center">
          <div>
            <div className="text-lg font-bold text-gray-900">12</div>
            <div className="text-xs text-gray-500">진행중</div>
          </div>
          <div>
            <div className="text-lg font-bold text-gray-900">8</div>
            <div className="text-xs text-gray-500">완료</div>
          </div>
          <div>
            <div className="text-lg font-bold text-gray-900">3</div>
            <div className="text-xs text-gray-500">지연</div>
          </div>
        </div>
      </div>
    </div>
  );
}
