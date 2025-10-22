'use client';

import { useEffect } from 'react';
import { CustomerDetail } from '@/app/(private)/sales/types/SalesCustomerDetailType';
import {
  CustomerEditData,
  CustomerEditModalProps,
  CustomerResponse,
} from '@/app/(private)/sales/types/CustomerEditModalType';
import { CustomerStatus } from '../../types/SalesCustomerListType';
import { useMutation } from '@tanstack/react-query';
import { putCustomer } from '../../sales.api';

const CustomerEditModal = ({
  $onClose,
  $editFormData,
  $setEditFormData,
  $setShowDetailModal,
}: CustomerEditModalProps) => {
  useEffect(() => {
    console.log($editFormData);
  }, [$editFormData]);

  let updatedCustomer = {
    customerName: '',
    ceoName: '',
    businessNumber: '',
    customerPhone: '',
    customerEmail: '',
    baseAddress: '',
    detailAddress: '',
    statusCode: '',
    manager: {
      managerName: '',
      managerPhone: '',
      managerEmail: '',
    },
    note: '',
  };

  const handleEditSave = (e: React.FormEvent) => {
    e.preventDefault();
    if (!$editFormData) return;

    updatedCustomer = {
      customerName: $editFormData.customerName,
      ceoName: $editFormData.ceoName,
      businessNumber: $editFormData.businessNumber,
      customerPhone: $editFormData.customerPhone,
      customerEmail: $editFormData.customerEmail,
      baseAddress: $editFormData.baseAddress,
      detailAddress: $editFormData.detailAddress,
      statusCode: $editFormData.statusCode,
      note: $editFormData.note,
      manager: {
        managerName: $editFormData.manager.managerName,
        managerPhone: $editFormData.manager.managerPhone,
        managerEmail: $editFormData.manager.managerEmail,
      },
    };

    editCustomer({ id: $editFormData.customerId, data: updatedCustomer });
    // alert(`고객 정보가 성공적으로 수정되었습니다.\n\n고객명: ${updatedCustomer.name}`);
    $onClose();
    $setEditFormData(null);
  };
  const { mutate: editCustomer, isPending } = useMutation<
    CustomerResponse,
    Error,
    { id: string; data: CustomerEditData }
  >({
    mutationFn: ({ id, data }) => putCustomer(id, data),
    onSuccess: (data) => {
      alert(`고객 정보가 성공적으로 수정되었습니다.`);
      $onClose();
    },
    onError: (error) => {
      alert(`고객 수정 중 오류가 발생했습니다.`);
    },
  });

  // 필드 업데이트 공통 함수
  const updateEditFormData = <K extends keyof CustomerDetail>(
    field: K,
    value: CustomerDetail[K],
  ) => {
    $setEditFormData((prev: CustomerDetail | null) => {
      if (!prev) return null;
      return { ...prev, [field]: value };
    });
  };

  const updateManagerInfo = <K extends keyof CustomerDetail['manager']>(
    field: K,
    value: CustomerDetail['manager'][K],
  ) => {
    $setEditFormData((prev: CustomerDetail | null) => {
      if (!prev) return null;
      return {
        ...prev,
        manager: {
          ...prev.manager,
          [field]: value,
        },
      };
    });
  };

  return (
    <>
      {$editFormData && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50">
          <div className="bg-white rounded-lg p-6 w-full max-w-4xl mx-4 max-h-[90vh] overflow-y-auto">
            <div className="flex items-center justify-between mb-6">
              <h3 className="text-xl font-semibold text-gray-900">고객 정보 수정</h3>
              <button
                onClick={$onClose}
                className="text-gray-400 hover:text-gray-600 cursor-pointer"
              >
                <i className="ri-close-line text-2xl"></i>
              </button>
            </div>

            <form onSubmit={handleEditSave} className="space-y-6">
              {/* 기본 정보 */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="space-y-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">고객번호</label>
                    <input
                      type="text"
                      value={$editFormData.customerNumber}
                      readOnly
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg bg-gray-50 text-gray-500"
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">고객명</label>
                    <input
                      type="text"
                      value={$editFormData.customerName}
                      onChange={(e) => updateEditFormData('customerName', e.target.value)}
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg"
                      required
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">대표이사</label>
                    <input
                      type="text"
                      value={$editFormData.ceoName}
                      onChange={(e) => updateEditFormData('ceoName', e.target.value)}
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg"
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      사업자번호
                    </label>
                    <input
                      type="text"
                      value={$editFormData.businessNumber}
                      onChange={(e) =>
                        updateEditFormData(
                          'businessNumber',
                          e.target.value.replace(/[^0-9\-]/g, ''),
                        )
                      }
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg"
                    />
                  </div>
                </div>

                <div className="space-y-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">상태</label>
                    <select
                      value={$editFormData.statusCode}
                      onChange={(e) =>
                        updateEditFormData('statusCode', e.target.value as CustomerStatus)
                      }
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg pr-8"
                    >
                      <option value="ACTIVE">활성</option>
                      <option value="INACTIVE">비활성</option>
                    </select>
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">전화번호</label>
                    <input
                      type="tel"
                      value={$editFormData.customerPhone}
                      onChange={(e) =>
                        updateEditFormData('customerPhone', e.target.value.replace(/[^0-9\-]/g, ''))
                      }
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg"
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">이메일</label>
                    <input
                      type="email"
                      value={$editFormData.customerEmail}
                      onChange={(e) => updateEditFormData('customerEmail', e.target.value)}
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg"
                    />
                  </div>
                </div>
              </div>

              {/* 주소 */}
              <div className="border-t border-gray-200 pt-6">
                <h4 className="text-lg font-semibold text-gray-900 mb-4">주소 정보</h4>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      기본 주소
                    </label>
                    <input
                      type="text"
                      value={$editFormData.baseAddress}
                      onChange={(e) => updateEditFormData('baseAddress', e.target.value)}
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg"
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      상세 주소
                    </label>
                    <input
                      type="text"
                      value={$editFormData.detailAddress}
                      onChange={(e) => updateEditFormData('detailAddress', e.target.value)}
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg"
                    />
                  </div>
                </div>
              </div>

              {/* 담당자 */}
              <div className="border-t border-gray-200 pt-6">
                <h4 className="text-lg font-semibold text-gray-900 mb-4">담당자 정보</h4>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">담당자명</label>
                    <input
                      type="text"
                      value={$editFormData.manager.managerName}
                      onChange={(e) => updateManagerInfo('managerName', e.target.value)}
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg"
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      담당자 휴대폰
                    </label>
                    <input
                      type="tel"
                      value={$editFormData.manager.managerPhone}
                      onChange={(e) =>
                        updateManagerInfo('managerPhone', e.target.value.replace(/[^0-9\-]/g, ''))
                      }
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg"
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      담당자 이메일
                    </label>
                    <input
                      type="email"
                      value={$editFormData.manager.managerEmail}
                      onChange={(e) => updateManagerInfo('managerEmail', e.target.value)}
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg"
                    />
                  </div>
                </div>
              </div>

              {/* 거래 정보 */}
              <div className="border-t border-gray-200 pt-6">
                <h4 className="text-lg font-semibold text-gray-900 mb-4">거래 정보</h4>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      총 주문건수
                    </label>
                    <input
                      type="number"
                      value={$editFormData.totalOrders}
                      onChange={(e) => updateEditFormData('totalOrders', Number(e.target.value))}
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg"
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      총 거래금액
                    </label>
                    <input
                      type="number"
                      value={$editFormData.totalTransactionAmount}
                      onChange={(e) =>
                        updateEditFormData('totalTransactionAmount', Number(e.target.value))
                      }
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg"
                    />
                  </div>
                </div>
              </div>

              {/* 비고 */}
              <div className="border-t border-gray-200 pt-6">
                <label className="block text-sm font-medium text-gray-700 mb-1">비고</label>
                <textarea
                  value={$editFormData.note}
                  onChange={(e) => updateEditFormData('note', e.target.value)}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg"
                  rows={3}
                />
              </div>

              {/* 버튼 */}
              <div className="flex gap-3 pt-6 border-t border-gray-200">
                <button
                  type="button"
                  onClick={() => {
                    $setShowDetailModal(true);
                    $onClose();
                  }}
                  className="flex-1 px-4 py-2 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 transition-colors font-medium cursor-pointer whitespace-nowrap"
                >
                  취소
                </button>

                <button
                  onClick={() => {
                    handleEditSave;
                  }}
                  type="submit"
                  className="px-6 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors font-medium cursor-pointer whitespace-nowrap"
                >
                  저장
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </>
  );
};

export default CustomerEditModal;
