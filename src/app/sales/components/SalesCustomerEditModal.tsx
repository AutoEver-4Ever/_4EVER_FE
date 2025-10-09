import { ChangeEvent, FormEvent, useEffect, useState } from 'react';
import { Customer } from '@/app/sales/types/SalesCustomerList';

interface SalesCustomerEditModalProps {
  customer: Customer;
  onClose: () => void;
  onSubmit: (customer: Customer) => void;
}

export function SalesCustomerEditModal({ customer, onClose, onSubmit }: SalesCustomerEditModalProps) {
  const [formData, setFormData] = useState<Customer>({ ...customer });

  useEffect(() => {
    setFormData({ ...customer });
  }, [customer]);

  const updateFormData = <K extends keyof Customer>(field: K, value: Customer[K]) => {
    setFormData((prev) => ({ ...prev, [field]: value }));
  };

  const updateFormDetails = <K extends keyof Customer['details']>(
    field: K,
    value: Customer['details'][K],
  ) => {
    setFormData((prev) => ({
      ...prev,
      details: {
        ...prev.details,
        [field]: value,
      },
    }));
  };

  const updateManagerInfo = <K extends keyof Customer['details']['manager']>(
    field: K,
    value: Customer['details']['manager'][K],
  ) => {
    setFormData((prev) => ({
      ...prev,
      details: {
        ...prev.details,
        manager: {
          ...prev.details.manager,
          [field]: value,
        },
      },
    }));
  };

  const handleSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    onSubmit(formData);
  };

  return (
    <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50">
      <div className="bg-white rounded-lg p-6 w-full max-w-4xl mx-4 max-h-[90vh] overflow-y-auto">
        <div className="flex items-center justify-between mb-6">
          <h3 className="text-xl font-semibold text-gray-900">고객 정보 수정</h3>
          <button onClick={onClose} className="text-gray-400 hover:text-gray-600 cursor-pointer">
            <i className="ri-close-line text-2xl"></i>
          </button>
        </div>

        <form onSubmit={handleSubmit} className="space-y-6">
          {/* 기본 정보 수정 */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">고객코드</label>
                <input
                  type="text"
                  value={formData.id}
                  readOnly
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg bg-gray-50 text-gray-500"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">고객명</label>
                <input
                  type="text"
                  value={formData.name}
                  onChange={(e: ChangeEvent<HTMLInputElement>) => updateFormData('name', e.target.value)}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg"
                  required
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">고객유형</label>
                <select
                  value={formData.type}
                  onChange={(e: ChangeEvent<HTMLSelectElement>) => updateFormData('type', e.target.value)}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg pr-8"
                >
                  <option value="대기업">대기업</option>
                  <option value="중견기업">중견기업</option>
                  <option value="중소기업">중소기업</option>
                  <option value="개인">개인</option>
                </select>
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">사업자번호</label>
                <input
                  type="text"
                  value={formData.details.businessNumber}
                  onChange={(e: ChangeEvent<HTMLInputElement>) => updateFormDetails('businessNumber', e.target.value)}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">대표이사</label>
                <input
                  type="text"
                  value={formData.details.ceo}
                  onChange={(e: ChangeEvent<HTMLInputElement>) => updateFormDetails('ceo', e.target.value)}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg"
                />
              </div>
            </div>
            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">업종</label>
                <input
                  type="text"
                  value={formData.details.industry}
                  onChange={(e: ChangeEvent<HTMLInputElement>) => updateFormDetails('industry', e.target.value)}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">직원수</label>
                <input
                  type="number"
                  value={formData.details.employees}
                  onChange={(e: ChangeEvent<HTMLInputElement>) =>
                    updateFormDetails('employees', Number(e.target.value))
                  }
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">웹사이트</label>
                <input
                  type="url"
                  value={formData.details.website}
                  onChange={(e: ChangeEvent<HTMLInputElement>) => updateFormDetails('website', e.target.value)}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">상태</label>
                <select
                  value={formData.status}
                  onChange={(e: ChangeEvent<HTMLSelectElement>) => updateFormData('status', e.target.value)}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg pr-8"
                >
                  <option value="활성">활성</option>
                  <option value="비활성">비활성</option>
                </select>
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">설립일</label>
                <input
                  type="date"
                  value={formData.details.establishedDate}
                  onChange={(e: ChangeEvent<HTMLInputElement>) =>
                    updateFormDetails('establishedDate', e.target.value)
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
                  <label className="block text-sm font-medium text-gray-700 mb-1">대표전화</label>
                  <input
                    type="tel"
                    value={formData.phone}
                    onChange={(e: ChangeEvent<HTMLInputElement>) => updateFormData('phone', e.target.value)}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg"
                    required
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">팩스</label>
                  <input
                    type="tel"
                    value={formData.details.fax}
                    onChange={(e: ChangeEvent<HTMLInputElement>) => updateFormDetails('fax', e.target.value)}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">이메일</label>
                  <input
                    type="email"
                    value={formData.email}
                    onChange={(e: ChangeEvent<HTMLInputElement>) => updateFormData('email', e.target.value)}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg"
                    required
                  />
                </div>
              </div>
              <div className="space-y-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">주소</label>
                  <textarea
                    value={formData.address}
                    onChange={(e: ChangeEvent<HTMLTextAreaElement>) => updateFormData('address', e.target.value)}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg"
                    rows={3}
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
                  <label className="block text-sm font-medium text-gray-700 mb-1">담당자명</label>
                  <input
                    type="text"
                    value={formData.details.manager.name}
                    onChange={(e: ChangeEvent<HTMLInputElement>) => updateManagerInfo('name', e.target.value)}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">직책</label>
                  <input
                    type="text"
                    value={formData.details.manager.position}
                    onChange={(e: ChangeEvent<HTMLInputElement>) => updateManagerInfo('position', e.target.value)}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">부서</label>
                  <input
                    type="text"
                    value={formData.details.manager.department}
                    onChange={(e: ChangeEvent<HTMLInputElement>) => updateManagerInfo('department', e.target.value)}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg"
                  />
                </div>
              </div>
              <div className="space-y-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">휴대폰</label>
                  <input
                    type="tel"
                    value={formData.details.manager.mobile}
                    onChange={(e: ChangeEvent<HTMLInputElement>) => updateManagerInfo('mobile', e.target.value)}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">직통전화</label>
                  <input
                    type="tel"
                    value={formData.details.manager.directPhone}
                    onChange={(e: ChangeEvent<HTMLInputElement>) => updateManagerInfo('directPhone', e.target.value)}
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
                <label className="block text-sm font-medium text-gray-700 mb-1">결제조건</label>
                <select
                  value={formData.details.paymentTerms}
                  onChange={(e: ChangeEvent<HTMLSelectElement>) => updateFormDetails('paymentTerms', e.target.value)}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg pr-8"
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
                  <label className="block text-sm font-medium text-gray-700 mb-1">신용한도</label>
                  <input
                    type="text"
                    value={formData.details.creditLimit}
                    onChange={(e: ChangeEvent<HTMLInputElement>) => updateFormDetails('creditLimit', e.target.value)}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg"
                  />
                </div>
              </div>
              <div className="space-y-4">
                <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">과세유형</label>
                <select
                  value={formData.details.taxType}
                  onChange={(e: ChangeEvent<HTMLSelectElement>) => updateFormDetails('taxType', e.target.value)}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg pr-8"
                >
                  <option value="일반과세">일반과세</option>
                  <option value="간이과세">간이과세</option>
                  <option value="면세">면세</option>
                  </select>
                </div>
              </div>
            </div>
          </div>

          {/* 비고 수정 */}
          <div className="border-t border-gray-200 pt-6">
            <label className="block text-sm font-medium text-gray-700 mb-1">비고</label>
            <textarea
              value={formData.details.notes}
              onChange={(e: ChangeEvent<HTMLTextAreaElement>) => updateFormDetails('notes', e.target.value)}
              className="w-full px-3 py-2 border border-gray-300 rounded-lg"
              rows={3}
            />
          </div>

          {/* 버튼 */}
          <div className="flex gap-3 pt-6 border-t border-gray-200">
            <button
              type="button"
              onClick={onClose}
              className="flex-1 px-4 py-2 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 transition-colors font-medium cursor-pointer whitespace-nowrap"
            >
              취소
            </button>
            <button
              type="button"
              className="px-6 py-2 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 transition-colors font-medium cursor-pointer whitespace-nowrap"
            >
              임시저장
            </button>
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
  );
}
