'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';

interface PurchaseRequestDetailProps {
  requestId: string;
}

export default function PurchaseRequestDetail({ requestId }: PurchaseRequestDetailProps) {
  const router = useRouter();
  const [showApprovalModal, setShowApprovalModal] = useState(false);
  const [showRejectModal, setShowRejectModal] = useState(false);
  const [rejectReason, setRejectReason] = useState('');

  // 실제로는 API에서 데이터를 가져와야 함
  const requestData = {
    'PR-2024-001': {
      id: 'PR-2024-001',
      item: '강판 500EA',
      category: '원자재',
      quantity: '500',
      unit: 'EA',
      estimatedPrice: '5000',
      totalAmount: '2500000',
      requester: '김철수',
      department: '생산팀',
      requestDate: '2024-01-15',
      dueDate: '2024-01-25',
      status: 'approved',
      priority: 'high',
      supplier: '대한철강',
      purpose: '신제품 생산을 위한 원자재 확보',
      specifications: '두께: 5mm, 크기: 1000x2000mm, 재질: SS400, 표면처리: 무처리',
      notes: '품질 검사 필수, 납기일 엄수 요망',
      approver: '이부장',
      approvalDate: '2024-01-16',
      approvalNotes: '생산 계획에 따라 승인',
    },
    'PR-2024-002': {
      id: 'PR-2024-002',
      item: '알루미늄 200EA',
      category: '원자재',
      quantity: '200',
      unit: 'EA',
      estimatedPrice: '9000',
      totalAmount: '1800000',
      requester: '이영희',
      department: '품질팀',
      requestDate: '2024-01-16',
      dueDate: '2024-01-26',
      status: 'pending',
      priority: 'medium',
      supplier: '한국알루미늄',
      purpose: '품질 테스트용 샘플 제작',
      specifications: '두께: 3mm, 크기: 500x1000mm, 재질: AL6061, 표면처리: 아노다이징',
      notes: '테스트 일정에 맞춰 납기 조정 가능',
    },
  };

  const request = requestData[requestId as keyof typeof requestData] || requestData['PR-2024-001'];

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'approved':
        return 'bg-green-100 text-green-700';
      case 'pending':
        return 'bg-yellow-100 text-yellow-700';
      case 'draft':
        return 'bg-gray-100 text-gray-700';
      case 'rejected':
        return 'bg-red-100 text-red-700';
      default:
        return 'bg-gray-100 text-gray-700';
    }
  };

  const getStatusText = (status: string) => {
    switch (status) {
      case 'approved':
        return '승인됨';
      case 'pending':
        return '검토중';
      case 'draft':
        return '작성중';
      case 'rejected':
        return '반려됨';
      default:
        return status;
    }
  };

  const getPriorityColor = (priority: string) => {
    switch (priority) {
      case 'high':
        return 'text-red-600';
      case 'medium':
        return 'text-yellow-600';
      case 'low':
        return 'text-green-600';
      default:
        return 'text-gray-600';
    }
  };

  const getPriorityText = (priority: string) => {
    switch (priority) {
      case 'high':
        return '높음';
      case 'medium':
        return '보통';
      case 'low':
        return '낮음';
      default:
        return priority;
    }
  };

  const handleApprove = () => {
    setShowApprovalModal(false);
    alert('구매 요청이 승인되었습니다.');
    router.push('/purchase');
  };

  const handleReject = () => {
    if (!rejectReason.trim()) {
      alert('반려 사유를 입력해주세요.');
      return;
    }
    setShowRejectModal(false);
    setRejectReason('');
    alert('구매 요청이 반려되었습니다.');
    router.push('/purchase');
  };

  const handlePrint = () => {
    window.print();
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <main className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* 페이지 헤더 */}
        <div className="mb-8">
          <div className="flex items-center space-x-2 text-sm text-gray-500 mb-4">
            <Link href="/purchase" className="hover:text-gray-700 cursor-pointer">
              구매관리
            </Link>
            <i className="ri-arrow-right-s-line"></i>
            <span>구매 요청</span>
            <i className="ri-arrow-right-s-line"></i>
            <span className="text-gray-900">{request.id}</span>
          </div>

          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-3xl font-bold text-gray-900">구매 요청 상세</h1>
              <p className="text-gray-600 mt-2">구매 요청의 상세 정보를 확인합니다</p>
            </div>

            <div className="flex items-center space-x-3">
              <button
                onClick={handlePrint}
                className="px-4 py-2 border border-gray-300 text-gray-700 font-medium rounded-lg hover:bg-gray-50 transition-colors duration-200 cursor-pointer whitespace-nowrap flex items-center space-x-2"
              >
                <i className="ri-printer-line"></i>
                <span>인쇄</span>
              </button>

              {request.status === 'pending' && (
                <>
                  <button
                    onClick={() => setShowRejectModal(true)}
                    className="px-4 py-2 border border-red-300 text-red-700 font-medium rounded-lg hover:bg-red-50 transition-colors duration-200 cursor-pointer whitespace-nowrap flex items-center space-x-2"
                  >
                    <i className="ri-close-line"></i>
                    <span>반려</span>
                  </button>

                  <button
                    onClick={() => setShowApprovalModal(true)}
                    className="px-4 py-2 bg-green-600 text-white font-medium rounded-lg hover:bg-green-700 transition-colors duration-200 cursor-pointer whitespace-nowrap flex items-center space-x-2"
                  >
                    <i className="ri-check-line"></i>
                    <span>승인</span>
                  </button>
                </>
              )}

              <Link
                href={`/purchase/request/${request.id}/edit`}
                className="px-4 py-2 bg-blue-600 text-white font-medium rounded-lg hover:bg-blue-700 transition-colors duration-200 cursor-pointer whitespace-nowrap flex items-center space-x-2"
              >
                <i className="ri-edit-line"></i>
                <span>수정</span>
              </Link>
            </div>
          </div>
        </div>

        {/* 상태 및 기본 정보 */}
        <div className="bg-white rounded-lg border border-gray-200 mb-6">
          <div className="p-6">
            <div className="flex items-center justify-between mb-6">
              <div className="flex items-center space-x-4">
                <span
                  className={`px-3 py-1 text-sm font-medium rounded-full ${getStatusColor(request.status)}`}
                >
                  {getStatusText(request.status)}
                </span>
                <span className={`text-sm font-medium ${getPriorityColor(request.priority)}`}>
                  우선순위: {getPriorityText(request.priority)}
                </span>
              </div>
              <div className="text-sm text-gray-500">요청일: {request.requestDate}</div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <h3 className="text-lg font-semibold text-gray-900 mb-4">요청 정보</h3>
                <dl className="space-y-3">
                  <div>
                    <dt className="text-sm font-medium text-gray-500">요청번호</dt>
                    <dd className="text-sm text-gray-900">{request.id}</dd>
                  </div>
                  <div>
                    <dt className="text-sm font-medium text-gray-500">요청자</dt>
                    <dd className="text-sm text-gray-900">{request.requester}</dd>
                  </div>
                  <div>
                    <dt className="text-sm font-medium text-gray-500">부서</dt>
                    <dd className="text-sm text-gray-900">{request.department}</dd>
                  </div>
                  <div>
                    <dt className="text-sm font-medium text-gray-500">희망 납기일</dt>
                    <dd className="text-sm text-gray-900">{request.dueDate}</dd>
                  </div>
                </dl>
              </div>

              <div>
                <h3 className="text-lg font-semibold text-gray-900 mb-4">품목 정보</h3>
                <dl className="space-y-3">
                  <div>
                    <dt className="text-sm font-medium text-gray-500">품목명</dt>
                    <dd className="text-sm text-gray-900">{request.item}</dd>
                  </div>
                  <div>
                    <dt className="text-sm font-medium text-gray-500">카테고리</dt>
                    <dd className="text-sm text-gray-900">{request.category}</dd>
                  </div>
                  <div>
                    <dt className="text-sm font-medium text-gray-500">수량</dt>
                    <dd className="text-sm text-gray-900">
                      {request.quantity} {request.unit}
                    </dd>
                  </div>
                  <div>
                    <dt className="text-sm font-medium text-gray-500">예상 총액</dt>
                    <dd className="text-sm font-semibold text-gray-900">
                      ₩{parseInt(request.totalAmount).toLocaleString()}
                    </dd>
                  </div>
                </dl>
              </div>
            </div>
          </div>
        </div>

        {/* 상세 정보 */}
        <div className="bg-white rounded-lg border border-gray-200 mb-6">
          <div className="p-6">
            <h3 className="text-lg font-semibold text-gray-900 mb-4">상세 정보</h3>

            <div className="space-y-6">
              <div>
                <dt className="text-sm font-medium text-gray-500 mb-2">사용 목적</dt>
                <dd className="text-sm text-gray-900">{request.purpose}</dd>
              </div>

              <div>
                <dt className="text-sm font-medium text-gray-500 mb-2">상세 사양</dt>
                <dd className="text-sm text-gray-900 whitespace-pre-line">
                  {request.specifications}
                </dd>
              </div>

              {request.supplier && (
                <div>
                  <dt className="text-sm font-medium text-gray-500 mb-2">희망 공급업체</dt>
                  <dd className="text-sm text-gray-900">{request.supplier}</dd>
                </div>
              )}

              {request.notes && (
                <div>
                  <dt className="text-sm font-medium text-gray-500 mb-2">비고</dt>
                  <dd className="text-sm text-gray-900 whitespace-pre-line">{request.notes}</dd>
                </div>
              )}
            </div>
          </div>
        </div>

        {/* 승인 정보 (승인된 경우에만 표시) */}
        {/* {request.status === 'approved' && request.approver && (
          <div className="bg-green-50 rounded-lg border border-green-200 mb-6">
            <div className="p-6">
              <h3 className="text-lg font-semibold text-green-900 mb-4">승인 정보</h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <dt className="text-sm font-medium text-green-700 mb-2">승인자</dt>
                  <dd className="text-sm text-green-900">{request.approver}</dd>
                </div>
                <div>
                  <dt className="text-sm font-medium text-green-700 mb-2">승인일</dt>
                  <dd className="text-sm text-green-900">{request.approvalDate}</dd>
                </div>
                {request.approvalNotes && (
                  <div className="md:col-span-2">
                    <dt className="text-sm font-medium text-green-700 mb-2">승인 의견</dt>
                    <dd className="text-sm text-green-900">{request.approvalNotes}</dd>
                  </div>
                )}
              </div>
            </div>
          </div>
        )} */}

        {/* 하단 버튼 */}
        <div className="flex items-center justify-between">
          <Link
            href="/purchase"
            className="px-6 py-2 border border-gray-300 text-gray-700 font-medium rounded-lg hover:bg-gray-50 transition-colors duration-200 cursor-pointer whitespace-nowrap flex items-center space-x-2"
          >
            <i className="ri-arrow-left-line"></i>
            <span>목록으로</span>
          </Link>

          {request.status === 'approved' && (
            <Link
              href="/purchase/order/new"
              className="px-6 py-2 bg-blue-600 text-white font-medium rounded-lg hover:bg-blue-700 transition-colors duration-200 cursor-pointer whitespace-nowrap flex items-center space-x-2"
            >
              <i className="ri-shopping-bag-3-line"></i>
              <span>발주서 작성</span>
            </Link>
          )}
        </div>
      </main>

      {/* 승인 확인 모달 */}
      {showApprovalModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white rounded-lg p-6 max-w-md w-full mx-4">
            <div className="flex items-center space-x-3 mb-4">
              <div className="w-10 h-10 bg-green-100 rounded-full flex items-center justify-center">
                <i className="ri-check-line text-green-600 text-lg"></i>
              </div>
              <h3 className="text-lg font-semibold text-gray-900">구매 요청 승인</h3>
            </div>

            <p className="text-gray-600 mb-6">
              이 구매 요청을 승인하시겠습니까?
              <br />
              승인 후에는 발주서 작성이 가능합니다.
            </p>

            <div className="flex items-center justify-end space-x-3">
              <button
                onClick={() => setShowApprovalModal(false)}
                className="px-4 py-2 border border-gray-300 text-gray-700 font-medium rounded-lg hover:bg-gray-50 transition-colors duration-200 cursor-pointer whitespace-nowrap"
              >
                취소
              </button>
              <button
                onClick={handleApprove}
                className="px-4 py-2 bg-green-600 text-white font-medium rounded-lg hover:bg-green-700 transition-colors duration-200 cursor-pointer whitespace-nowrap"
              >
                승인
              </button>
            </div>
          </div>
        </div>
      )}

      {/* 반려 모달 */}
      {showRejectModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white rounded-lg p-6 max-w-md w-full mx-4">
            <div className="flex items-center space-x-3 mb-4">
              <div className="w-10 h-10 bg-red-100 rounded-full flex items-center justify-center">
                <i className="ri-close-line text-red-600 text-lg"></i>
              </div>
              <h3 className="text-lg font-semibold text-gray-900">구매 요청 반려</h3>
            </div>

            <div className="mb-4">
              <label className="block text-sm font-medium text-gray-700 mb-2">
                반려 사유 <span className="text-red-500">*</span>
              </label>
              <textarea
                value={rejectReason}
                onChange={(e) => setRejectReason(e.target.value)}
                rows={4}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-red-500 text-sm resize-none"
                placeholder="반려 사유를 입력해주세요"
                maxLength={500}
              />
              <div className="text-xs text-gray-500 mt-1">{rejectReason.length}/500자</div>
            </div>

            <div className="flex items-center justify-end space-x-3">
              <button
                onClick={() => {
                  setShowRejectModal(false);
                  setRejectReason('');
                }}
                className="px-4 py-2 border border-gray-300 text-gray-700 font-medium rounded-lg hover:bg-gray-50 transition-colors duration-200 cursor-pointer whitespace-nowrap"
              >
                취소
              </button>
              <button
                onClick={handleReject}
                className="px-4 py-2 bg-red-600 text-white font-medium rounded-lg hover:bg-red-700 transition-colors duration-200 cursor-pointer whitespace-nowrap"
              >
                반려
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
