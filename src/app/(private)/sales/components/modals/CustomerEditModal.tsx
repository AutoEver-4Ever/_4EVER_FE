'use client';

import { CustomerEditModalProps } from '@/app/(private)/sales/types/CustomerEditModalType';
import {
  CustomerDetail,
  Contact,
  Manager,
  Transaction,
} from '@/app/(private)/sales/types/SalesCustomerDetailType';
import { useEffect } from 'react';

const CustomerEditModal = ({
  $showEditModal,
  $setShowEditModal,
  $editFormData,
  $setEditFormData,
  $setShowDetailModal,
}: CustomerEditModalProps) => {
  useEffect(() => {
    console.log($editFormData);
  }, [$editFormData]);
  const handleEditSave = (e: React.FormEvent) => {
    e.preventDefault();
    if (!$editFormData) return;

    const updatedCustomer = {
      id: $editFormData.customerId,
      name: $editFormData.companyName,
      manager: $editFormData.manager,
      address: $editFormData.contact.address,
      dealInfo: $editFormData.transaction, // 거래 정보 매핑
      status: $editFormData.statusCode,
    };

    alert('고객 정보가 성공적으로 수정되었습니다.');
    $setShowEditModal(false);
    $setEditFormData(null);
  };

  const updateEditFormData = <K extends keyof CustomerDetail>(
    field: K,
    value: CustomerDetail[K],
  ) => {
    $setEditFormData((prev: CustomerDetail | null) => {
      if (!prev) return null;
      return { ...prev, [field]: value };
    });
  };

  const updateContactInfo = <K extends keyof Contact>(field: K, value: Contact[K]) => {
    $setEditFormData((prev: CustomerDetail | null) => {
      if (!prev) return null;
      return {
        ...prev,
        contact: {
          ...prev.contact,
          [field]: value,
        },
      };
    });
  };

  const updateManagerInfo = <K extends keyof Manager>(field: K, value: Manager[K]) => {
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

  const updateTransactionInfo = <K extends keyof Transaction>(field: K, value: Transaction[K]) => {
    $setEditFormData((prev: CustomerDetail | null) => {
      if (!prev) return null;
      return {
        ...prev,
        transaction: {
          ...prev.transaction,
          [field]: value,
        },
      };
    });
  };
  return (
    <>
      {$showEditModal && $editFormData && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50">
          <div className="bg-white rounded-lg p-6 w-full max-w-4xl mx-4 max-h-[90vh] overflow-y-auto">
            <div className="flex items-center justify-between mb-6">
              <h3 className="text-xl font-semibold text-gray-900">고객 정보 수정</h3>
              <button
                onClick={() => $setShowEditModal(false)}
                className="text-gray-400 hover:text-gray-600 cursor-pointer"
              >
                <i className="ri-close-line text-2xl"></i>
              </button>
            </div>

            {/* <form onSubmit={handleEditSave} className="space-y-6"> */}
            <form className="space-y-6">
              {/* 기본 정보 수정 */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="space-y-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">고객코드</label>
                    <input
                      type="text"
                      value={$editFormData.customerCode}
                      readOnly
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg bg-gray-50 text-gray-500"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">대표이사</label>
                    <input
                      type="text"
                      value={$editFormData.ceoName}
                      onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
                        updateEditFormData('ceoName', e.target.value)
                      }
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">상태</label>
                    <select
                      value={$editFormData.statusCode}
                      onChange={(e: React.ChangeEvent<HTMLSelectElement>) =>
                        updateEditFormData('statusCode', e.target.value)
                      }
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg pr-8"
                    >
                      <option value="활성">활성</option>
                      <option value="비활성">비활성</option>
                    </select>
                  </div>
                </div>
                <div className="space-y-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">고객명</label>
                    <input
                      type="text"
                      value={$editFormData.companyName}
                      onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
                        updateEditFormData('companyName', e.target.value)
                      }
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg"
                      required
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      사업자번호
                    </label>
                    <input
                      type="text"
                      value={$editFormData.businessNumber}
                      onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
                        updateEditFormData(
                          'businessNumber',
                          e.target.value.replace(/[^0-9\-]/g, ''),
                        )
                      }
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg"
                    />
                  </div>
                </div>
              </div>

              {/* 연락처 정보 수정 */}
              <div className="border-t border-gray-200 pt-6">
                <h4 className="text-lg font-semibold text-gray-900 mb-4">연락처 정보</h4>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div className="space-y-4">
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">
                        대표전화
                      </label>
                      <input
                        type="tel"
                        inputMode="tel"
                        pattern="[0-9\-]*"
                        value={$editFormData.contact.phone}
                        onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
                          updateContactInfo('phone', e.target.value.replace(/[^0-9\-]/g, ''))
                        }
                        className="w-full px-3 py-2 border border-gray-300 rounded-lg"
                        required
                      />
                    </div>

                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">이메일</label>
                      <input
                        type="email"
                        value={$editFormData.contact.email}
                        onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
                          updateContactInfo('email', e.target.value)
                        }
                        className="w-full px-3 py-2 border border-gray-300 rounded-lg"
                        required
                      />
                    </div>
                  </div>
                  <div className="space-y-4">
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">주소</label>
                      <textarea
                        value={$editFormData.contact.address}
                        onChange={(e: React.ChangeEvent<HTMLTextAreaElement>) =>
                          updateContactInfo('address', e.target.value)
                        }
                        className="w-full px-3 py-2 border border-gray-300 rounded-lg"
                        rows={1}
                        required
                      />
                    </div>
                  </div>
                </div>
              </div>

              {/* 담당자 정보 수정 */}
              <div className="border-t border-gray-200 pt-6">
                <h4 className="text-lg font-semibold text-gray-900 mb-4">담당자 정보</h4>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div className="space-y-4">
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">
                        담당자명
                      </label>
                      <input
                        type="text"
                        value={$editFormData.manager.name}
                        onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
                          updateManagerInfo('name', e.target.value)
                        }
                        className="w-full px-3 py-2 border border-gray-300 rounded-lg"
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">이메일</label>
                      <input
                        type="email"
                        value={$editFormData.contact.email}
                        onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
                          updateContactInfo('email', e.target.value)
                        }
                        className="w-full px-3 py-2 border border-gray-300 rounded-lg"
                      />
                    </div>
                  </div>
                  <div className="space-y-4">
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">휴대폰</label>
                      <input
                        type="tel"
                        value={$editFormData.manager.mobile}
                        onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
                          updateManagerInfo('mobile', e.target.value.replace(/[^0-9\-]/g, ''))
                        }
                        className="w-full px-3 py-2 border border-gray-300 rounded-lg"
                      />
                    </div>
                  </div>
                </div>
              </div>

              {/* 거래 정보 수정 */}
              <div className="border-t border-gray-200 pt-6">
                <h4 className="text-lg font-semibold text-gray-900 mb-4">거래 정보</h4>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div className="space-y-4">
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">
                        총 주문건수
                      </label>
                      <input
                        type="text"
                        inputMode="numeric"
                        value={$editFormData.transaction.totalOrders}
                        onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
                          updateTransactionInfo('totalOrders', Number(e.target.value))
                        }
                        className="w-full px-3 py-2 border border-gray-300 rounded-lg"
                        required
                      />
                    </div>
                  </div>
                  <div className="space-y-4">
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">
                        총 거래금액
                      </label>
                      <input
                        type="number"
                        value={$editFormData.transaction.totalAmount}
                        onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
                          updateTransactionInfo('totalAmount', Number(e.target.value))
                        }
                        className="w-full px-3 py-2 border border-gray-300 rounded-lg"
                      />
                    </div>
                  </div>
                </div>
              </div>

              {/* 비고 수정 */}
              <div className="border-t border-gray-200 pt-6">
                <label className="block text-sm font-medium text-gray-700 mb-1">비고</label>
                <textarea
                  value={$editFormData.note}
                  onChange={(e: React.ChangeEvent<HTMLTextAreaElement>) =>
                    updateEditFormData('note', e.target.value)
                  }
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
                    $setShowEditModal(false);
                  }}
                  className="flex-1 px-4 py-2 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 transition-colors font-medium cursor-pointer whitespace-nowrap"
                >
                  취소
                </button>
                {/* <button
                  type="button"
                  className="px-6 py-2 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 transition-colors font-medium cursor-pointer whitespace-nowrap"
                >
                  임시저장
                </button> */}
                <button
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
