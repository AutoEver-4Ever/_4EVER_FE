'use client';

import { CustomerDetailModalProps } from '@/app/sales/types/CustomerDetailModalType';
import { useState } from 'react';
import { SalesCustomerDetailType } from '../types/SalesCustomerDetailType';
import CustomerEditModal from './CustomerEditModal';
// import { Customer } from '@/app/sales/types/SalesCustomerList';

const CustomerDetailModal = ({
  $showDetailModal,
  $setShowDetailModal,
  $selectedCustomerId,
  $getStatusColor,
  $setShowEditModal,
  $setEditFormData,
}: CustomerDetailModalProps) => {
  const [mockCustomer] = useState<SalesCustomerDetailType>({
    id: 'C-001',
    name: '삼성전자',
    ceo: '이재용',
    businessNumber: '123-45-67890',
    status: '활성',
    dealInfo: {
      totalOrders: '45',
      totalAmount: '₩1,250,000,000',
      notes: '주요 고객사, 정기 거래처',
    },
    manager: {
      name: '김철수',
      email: 'kim@samsung.com',
      mobile: '010-1234-5678',
    },
    contact: {
      phone: '02-1234-5678',
      email: 'contact@samsung.com',
      address: '서울시 강남구 테헤란로 123',
    },
  });

  return (
    <>
      {$showDetailModal && mockCustomer && (
        <div className="fixed inset-0  bg-black/50 flex items-center justify-center z-50">
          <div className="bg-white rounded-lg p-6 w-full max-w-4xl mx-4 max-h-[90vh] overflow-y-auto">
            <div className="flex items-center justify-between mb-6">
              <h3 className="text-xl font-semibold text-gray-900">고객 상세 정보</h3>
              <button
                onClick={() => $setShowDetailModal(false)}
                className="text-gray-400 hover:text-gray-600 cursor-pointer"
              >
                <i className="ri-close-line text-2xl"></i>
              </button>
            </div>

            <div className="space-y-6">
              {/* 기본 정보 */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="space-y-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">고객코드</label>
                    <div className="text-lg font-semibold text-gray-900">{mockCustomer.id}</div>
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">대표이사</label>
                    <div className="text-gray-900">{mockCustomer.ceo}</div>
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">상태</label>
                    <span
                      className={`px-2 py-1 rounded text-xs font-medium ${$getStatusColor(mockCustomer.status)}`}
                    >
                      {mockCustomer.status}
                    </span>
                  </div>
                </div>
                <div className="space-y-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">고객명</label>
                    <div className="text-gray-900">{mockCustomer.name}</div>
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      사업자번호
                    </label>
                    <div className="text-gray-900">{mockCustomer.businessNumber}</div>
                  </div>
                </div>
              </div>

              {/* 연락처 정보 */}
              <div className="border-t border-gray-200 pt-6">
                <h4 className="text-lg font-semibold text-gray-900 mb-4">연락처 정보</h4>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div className="space-y-4">
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">
                        대표전화
                      </label>
                      <div className="flex items-center space-x-2">
                        <i className="ri-phone-line text-green-600 mb-1"></i>
                        <span className="text-gray-900">{mockCustomer.contact.phone}</span>
                      </div>
                    </div>

                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">이메일</label>
                      <div className="text-blue-600">{mockCustomer.contact.email}</div>
                    </div>
                  </div>
                  <div className="space-y-4">
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">주소</label>
                      <div className="text-gray-900">{mockCustomer.contact.address}</div>
                    </div>
                  </div>
                </div>
              </div>

              {/* 담당자 정보 */}
              <div className="border-t border-gray-200 pt-6">
                <h4 className="text-lg font-semibold text-gray-900 mb-4">담당자 정보</h4>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div className="space-y-4">
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">
                        담당자명
                      </label>
                      <div className="text-gray-900">{mockCustomer.manager.name}</div>
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">이메일</label>
                      <div className="text-blue-600">{mockCustomer.manager.email}</div>
                    </div>
                  </div>
                  <div className="space-y-4">
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">휴대폰</label>
                      <div className="flex items-center space-x-2">
                        <i className="ri-phone-line text-green-600 mb-1"></i>
                        <span className="text-gray-900">{mockCustomer.manager.mobile}</span>
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              {/* 거래 정보 */}
              <div className="border-t border-gray-200 pt-6">
                <h4 className="text-lg font-semibold text-gray-900 mb-4">거래 정보</h4>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div className="space-y-4">
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">
                        총 주문건수
                      </label>
                      <div className="text-gray-900">{mockCustomer.dealInfo.totalOrders}건</div>
                    </div>
                  </div>
                  <div className="space-y-4">
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">
                        총 거래금액
                      </label>
                      <div className="text-green-600 font-semibold">
                        {mockCustomer.dealInfo.totalAmount}
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              {/* 비고 */}
              <div className="border-t border-gray-200 pt-6">
                <label className="block text-sm font-medium text-gray-700 mb-1">비고</label>
                <div className="text-gray-900 bg-gray-50 p-3 rounded-lg">
                  {mockCustomer.dealInfo.notes}
                </div>
              </div>

              {/* 버튼 */}
              <div className="flex gap-3 pt-6 border-t border-gray-200">
                <button
                  onClick={() => $setShowDetailModal(false)}
                  className="flex-1 px-4 py-2 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 transition-colors font-medium cursor-pointer whitespace-nowrap"
                >
                  닫기
                </button>
                <button
                  onClick={() => {
                    $setEditFormData(mockCustomer);
                    $setShowEditModal(true);
                  }}
                  className="px-6 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors font-medium cursor-pointer whitespace-nowrap"
                >
                  수정
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default CustomerDetailModal;
