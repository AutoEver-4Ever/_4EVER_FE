'use client';

import { CustomerDetailModalProps } from '@/app/(private)/sales/types/CustomerDetailModalProps';
import { useEffect, useState } from 'react';
import { CustomerDetail } from '@/app/(private)/sales/types/SalesCustomerDetailType';
import CustomerEditModal from './CustomerEditModal';
import { getCustomerDetail } from '../service';
import { useQuery } from '@tanstack/react-query';

const CustomerDetailModal = ({
  $showDetailModal,
  $setShowDetailModal,
  $selectedCustomerId,
  $getStatusColor,
  $setShowEditModal,
  $setEditFormData,
}: CustomerDetailModalProps) => {
  const {
    data: customer,
    isLoading,
    isError,
  } = useQuery<CustomerDetail>({
    queryKey: ['customerDetail', $selectedCustomerId],
    queryFn: () => getCustomerDetail($selectedCustomerId),
    enabled: !!$selectedCustomerId && $showDetailModal,
  });
  const [errorModal, setErrorModal] = useState(false);
  useEffect(() => {
    setErrorModal(isError);
  }, [isError]);

  const getStatusText = (status: string) => {
    switch (status) {
      case 'ACTIVE':
        return '활성';
      case 'DEACTIVE':
        return '비활성';

      default:
        return status;
    }
  };

  if (isLoading)
    return (
      <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50">
        <div className="bg-white rounded-lg p-6 w-96 text-center">
          <div className="w-10 h-10 border-4 border-blue-500 border-t-transparent rounded-full animate-spin mx-auto mb-4" />
          <p className="text-gray-600 text-sm font-medium">견적서를 불러오는 중입니다...</p>
        </div>
      </div>
    );

  if (errorModal)
    return (
      <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50">
        <div className="bg-white rounded-lg p-6 w-96 text-center text-red-600">
          <i className="ri-error-warning-line text-4xl mb-2" />
          <p className="font-medium">고객 상세 데이터를 불러오는 중 오류가 발생했습니다.</p>
          <button
            onClick={() => {
              setErrorModal(false);
            }}
            className="mt-4 px-4 py-2 bg-gray-200 text-gray-800 rounded-lg hover:bg-gray-300"
          >
            닫기
          </button>
        </div>
      </div>
    );
  return (
    <>
      {$showDetailModal && (
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
                    <div className="text-lg font-semibold text-gray-900">
                      {customer!.customerCode}
                    </div>
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">대표이사</label>
                    <div className="text-gray-900">{customer!.ceoName}</div>
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">상태</label>
                    <span
                      className={`px-2 py-1 rounded text-xs font-medium ${$getStatusColor(customer!.statusCode)}`}
                    >
                      {getStatusText(customer!.statusCode)}
                    </span>
                  </div>
                </div>
                <div className="space-y-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">고객명</label>
                    <div className="text-gray-900">{customer?.companyName}</div>
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      사업자번호
                    </label>
                    <div className="text-gray-900">{customer?.businessNumber}</div>
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
                        <span className="text-gray-900">{customer?.contact.phone}</span>
                      </div>
                    </div>

                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">이메일</label>
                      <div className="text-blue-600">{customer?.contact.email}</div>
                    </div>
                  </div>
                  <div className="space-y-4">
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">주소</label>
                      <div className="text-gray-900">{customer?.contact.address}</div>
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
                      <div className="text-gray-900">{customer?.manager.name}</div>
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">이메일</label>
                      <div className="text-blue-600">{customer?.manager.email}</div>
                    </div>
                  </div>
                  <div className="space-y-4">
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">휴대폰</label>
                      <div className="flex items-center space-x-2">
                        <i className="ri-phone-line text-green-600 mb-1"></i>
                        <span className="text-gray-900">{customer?.manager.mobile}</span>
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
                      <div className="text-gray-900">{customer?.transaction.totalOrders}건</div>
                    </div>
                  </div>
                  <div className="space-y-4">
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">
                        총 거래금액
                      </label>
                      <div className="text-green-600 font-semibold">
                        ₩{customer?.transaction.totalAmount.toLocaleString()}
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              {/* 비고 */}
              <div className="border-t border-gray-200 pt-6">
                <label className="block text-sm font-medium text-gray-700 mb-1">비고</label>
                <div className="text-gray-900 bg-gray-50 p-3 rounded-lg">{customer?.note}</div>
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
                    $setEditFormData(customer!);
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
