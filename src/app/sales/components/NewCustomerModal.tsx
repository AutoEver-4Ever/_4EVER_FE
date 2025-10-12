'use client';

import { useState } from 'react';
import { CustomerData, NewCustomerModalProps } from '@/app/sales/types/NewCustomerModalType';

const NewCustomerModal = ({ $showCustomerModal, $setShowCustomerModal }: NewCustomerModalProps) => {
  const [customerData, setCustomerData] = useState<CustomerData>({
    companyName: '',
    businessNumber: '',
    representative: '',
    contactPerson: '',
    position: '',
    phone: '',
    mobile: '',
    email: '',
    address: '',
    detailAddress: '',
    zipCode: '',
    notes: '',
  });

  const handleCustomerSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // 고객번호 생성
    const customerNumber = `CUS-${new Date().getFullYear()}-${String(
      Math.floor(Math.random() * 1000) + 1,
    ).padStart(3, '0')}`;

    alert(
      `신규 고객이 성공적으로 등록되었습니다!\n고객번호: ${customerNumber}\n회사명: ${customerData.companyName}\n담당자: ${customerData.contactPerson}`,
    );

    $setShowCustomerModal(false);
    // 폼 초기화
    setCustomerData({
      companyName: '',
      businessNumber: '',
      representative: '',
      contactPerson: '',
      position: '',
      phone: '',
      mobile: '',
      email: '',
      address: '',
      detailAddress: '',
      zipCode: '',
      notes: '',
    });
  };

  const updateCustomerData = <K extends keyof CustomerData>(field: K, value: CustomerData[K]) => {
    setCustomerData((prev) => ({ ...prev, [field]: value }));
  };
  return (
    <>
      {/* 고객 등록 모달 */}
      {$showCustomerModal && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50">
          <div className="bg-white rounded-lg p-6 w-full max-w-4xl mx-4 max-h-[90vh] overflow-y-auto">
            <div className="flex items-center justify-between mb-6">
              <h3 className="text-xl font-semibold text-gray-900">신규 고객 등록</h3>
              <button
                onClick={() => $setShowCustomerModal(false)}
                className="text-gray-400 hover:text-gray-600 cursor-pointer"
              >
                <i className="ri-close-line text-2xl"></i>
              </button>
            </div>

            <form onSubmit={handleCustomerSubmit} className="space-y-6">
              {/* 기본 정보 */}
              <div className="bg-gray-50 rounded-lg p-4">
                <h4 className="text-lg font-medium text-gray-900 mb-4">기본 정보</h4>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">회사명 *</label>
                    <input
                      type="text"
                      value={customerData.companyName}
                      onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
                        updateCustomerData('companyName', e.target.value)
                      }
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                      placeholder="회사명을 입력하세요"
                      required
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      사업자등록번호
                    </label>
                    <input
                      type="text"
                      value={customerData.businessNumber}
                      onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
                        updateCustomerData('businessNumber', e.target.value)
                      }
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                      placeholder="000-00-00000"
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">대표자명</label>
                    <input
                      type="text"
                      value={customerData.representative}
                      onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
                        updateCustomerData('representative', e.target.value)
                      }
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                      placeholder="대표자명을 입력하세요"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      전화번호 *
                    </label>
                    <input
                      type="tel"
                      value={customerData.phone}
                      onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
                        updateCustomerData('phone', e.target.value)
                      }
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                      placeholder="02-0000-0000"
                      required
                    />
                  </div>
                </div>
              </div>

              {/* 담당자 정보 */}
              <div className="bg-gray-50 rounded-lg p-4">
                <h4 className="text-lg font-medium text-gray-900 mb-4">담당자 정보</h4>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      담당자명 *
                    </label>
                    <input
                      type="text"
                      value={customerData.contactPerson}
                      onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
                        updateCustomerData('contactPerson', e.target.value)
                      }
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                      placeholder="담당자명을 입력하세요"
                      required
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">휴대폰</label>
                    <input
                      type="tel"
                      value={customerData.mobile}
                      onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
                        updateCustomerData('mobile', e.target.value)
                      }
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                      placeholder="010-0000-0000"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">이메일 *</label>
                    <input
                      type="email"
                      value={customerData.email}
                      onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
                        updateCustomerData('email', e.target.value)
                      }
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                      placeholder="example@company.com"
                      required
                    />
                  </div>
                </div>
              </div>

              {/* 주소 정보 */}
              <div className="bg-gray-50 rounded-lg p-4">
                <h4 className="text-lg font-medium text-gray-900 mb-4">주소 정보</h4>
                <div className="grid grid-cols-1 gap-4">
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">
                        우편번호
                      </label>
                      <input
                        type="text"
                        value={customerData.zipCode}
                        onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
                          updateCustomerData('zipCode', e.target.value)
                        }
                        className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                        placeholder="00000"
                      />
                    </div>
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">주소</label>
                    <input
                      type="text"
                      value={customerData.address}
                      onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
                        updateCustomerData('address', e.target.value)
                      }
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                      placeholder="기본 주소를 입력하세요"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">상세주소</label>
                    <input
                      type="text"
                      value={customerData.detailAddress}
                      onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
                        updateCustomerData('detailAddress', e.target.value)
                      }
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                      placeholder="상세 주소를 입력하세요"
                    />
                  </div>
                </div>
              </div>

              {/* 비고 */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">비고</label>
                <textarea
                  value={customerData.notes}
                  onChange={(e: React.ChangeEvent<HTMLTextAreaElement>) =>
                    updateCustomerData('notes', e.target.value)
                  }
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  rows={3}
                  placeholder="고객에 대한 추가 정보나 특이사항을 입력하세요"
                />
              </div>

              {/* 버튼 */}
              <div className="flex gap-3 pt-6 border-t border-gray-200">
                <button
                  type="button"
                  onClick={() => $setShowCustomerModal(false)}
                  className="flex-1 px-4 py-2 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 transition-colors font-medium cursor-pointer whitespace-nowrap"
                >
                  취소
                </button>
                <button
                  type="submit"
                  className="px-6 py-2 bg-[#2563EB] text-white rounded-lg hover:bg-blue-600 transition-colors font-medium cursor-pointer whitespace-nowrap"
                >
                  고객 등록
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </>
  );
};

export default NewCustomerModal;
