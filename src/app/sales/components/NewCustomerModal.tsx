'use client';

import { useState } from 'react';
import { CustomerData, NewCustomerModalProps } from '@/app/sales/types/NewCustomerModalType';

const NewCustomerModal = ({ $showCustomerModal, $setShowCustomerModal }: NewCustomerModalProps) => {
  const [customerData, setCustomerData] = useState<CustomerData>({
    companyName: '',
    businessType: '',
    businessNumber: '',
    representative: '',
    contactPerson: '',
    position: '',
    phone: '',
    mobile: '',
    email: '',
    fax: '',
    website: '',
    address: '',
    detailAddress: '',
    zipCode: '',
    industry: '',
    customerType: '일반고객',
    creditRating: 'A',
    paymentTerms: '30일 후 결제',
    taxType: '과세',
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
      businessType: '',
      businessNumber: '',
      representative: '',
      contactPerson: '',
      position: '',
      phone: '',
      mobile: '',
      email: '',
      fax: '',
      website: '',
      address: '',
      detailAddress: '',
      zipCode: '',
      industry: '',
      customerType: '일반고객',
      creditRating: 'A',
      paymentTerms: '30일 후 결제',
      taxType: '과세',
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
                    <label className="block text-sm font-medium text-gray-700 mb-1">업종</label>
                    <input
                      type="text"
                      value={customerData.industry}
                      onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
                        updateCustomerData('industry', e.target.value)
                      }
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                      placeholder="업종을 입력하세요"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      사업자 유형
                    </label>
                    <select
                      value={customerData.businessType}
                      onChange={(e: React.ChangeEvent<HTMLSelectElement>) =>
                        updateCustomerData('businessType', e.target.value)
                      }
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent pr-8"
                    >
                      <option value="">선택하세요</option>
                      <option value="법인">법인</option>
                      <option value="개인사업자">개인사업자</option>
                      <option value="개인">개인</option>
                    </select>
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
                    <label className="block text-sm font-medium text-gray-700 mb-1">웹사이트</label>
                    <input
                      type="url"
                      value={customerData.website}
                      onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
                        updateCustomerData('website', e.target.value)
                      }
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                      placeholder="https://www.example.com"
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
                    <label className="block text-sm font-medium text-gray-700 mb-1">직책</label>
                    <input
                      type="text"
                      value={customerData.position}
                      onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
                        updateCustomerData('position', e.target.value)
                      }
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                      placeholder="직책을 입력하세요"
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
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">팩스</label>
                    <input
                      type="tel"
                      value={customerData.fax}
                      onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
                        updateCustomerData('fax', e.target.value)
                      }
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                      placeholder="02-0000-0000"
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

              {/* 거래 조건 */}
              <div className="bg-gray-50 rounded-lg p-4">
                <h4 className="text-lg font-medium text-gray-900 mb-4">거래 조건</h4>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      고객 유형
                    </label>
                    <select
                      value={customerData.customerType}
                      onChange={(e: React.ChangeEvent<HTMLSelectElement>) =>
                        updateCustomerData(
                          'customerType',
                          e.target.value as CustomerData['customerType'],
                        )
                      }
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent pr-8"
                    >
                      <option value="일반고객">일반고객</option>
                      <option value="VIP고객">VIP고객</option>
                      <option value="대량고객">대량고객</option>
                      <option value="신규고객">신규고객</option>
                    </select>
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">신용등급</label>
                    <select
                      value={customerData.creditRating}
                      onChange={(e: React.ChangeEvent<HTMLSelectElement>) =>
                        updateCustomerData(
                          'creditRating',
                          e.target.value as CustomerData['creditRating'],
                        )
                      }
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent pr-8"
                    >
                      <option value="A">A등급 (우수)</option>
                      <option value="B">B등급 (양호)</option>
                      <option value="C">C등급 (보통)</option>
                      <option value="D">D등급 (주의)</option>
                    </select>
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      결제 조건
                    </label>
                    <select
                      value={customerData.paymentTerms}
                      onChange={(e: React.ChangeEvent<HTMLSelectElement>) =>
                        updateCustomerData(
                          'paymentTerms',
                          e.target.value as CustomerData['paymentTerms'],
                        )
                      }
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent pr-8"
                    >
                      <option value="즉시 결제">즉시 결제</option>
                      <option value="15일 후 결제">15일 후 결제</option>
                      <option value="30일 후 결제">30일 후 결제</option>
                      <option value="45일 후 결제">45일 후 결제</option>
                      <option value="60일 후 결제">60일 후 결제</option>
                      <option value="월말 결제">월말 결제</option>
                    </select>
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      세금 유형
                    </label>
                    <select
                      value={customerData.taxType}
                      onChange={(e: React.ChangeEvent<HTMLSelectElement>) =>
                        updateCustomerData('taxType', e.target.value as CustomerData['taxType'])
                      }
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent pr-8"
                    >
                      <option value="과세">과세</option>
                      <option value="면세">면세</option>
                      <option value="영세율">영세율</option>
                    </select>
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
