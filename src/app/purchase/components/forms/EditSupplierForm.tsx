import { SupplierResponse } from '@/app/purchase/types/SupplierType';
import { useState } from 'react';

interface EditSupplierProps {
  supplier: SupplierResponse;
  setEditForm: (form: SupplierResponse) => void;
  onCancel: () => void;
  onSave: () => void;
}

const categories = ['철강/금속', '화학/소재', '전자부품', '기계부품', '포장재', '소모품'];
const statuses = [
  { value: 'active', label: '활성' },
  { value: 'inactive', label: '비활성' },
];

export default function EditSupplierForm({
  supplier,
  setEditForm,
  onCancel,
  onSave,
}: EditSupplierProps) {
  const [form, setForm] = useState<SupplierResponse>(supplier);

  const handleInputChange = (field: keyof SupplierResponse, value: string) => {
    const updated = { ...form, [field]: value };
    setForm(updated);
    setEditForm(updated);
  };

  const handleSave = (e: React.FormEvent) => {
    e.preventDefault();
    if (
      !form.name ||
      !form.category ||
      !form.managerName ||
      !form.managerPhone ||
      !form.managerEmail ||
      !form.address ||
      !form.deliveryDays
    ) {
      alert('필수 항목을 입력해주세요');
      return;
    }
    onSave();
    alert('공급업체 정보가 수정되었습니다.');
  };

  return (
    <form onSubmit={handleSave} className="space-y-8">
      {/* 기본 정보 */}
      <div>
        <h4 className="text-lg font-semibold text-gray-900 mb-4">기본 정보</h4>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">업체 ID</label>
            <input
              type="text"
              value={form.id}
              disabled
              className="w-full px-3 py-2 border border-gray-300 rounded-lg bg-gray-50 text-gray-500"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              업체명 <span className="text-red-500">*</span>
            </label>
            <input
              type="text"
              value={form.name}
              onChange={(e) => handleInputChange('name', e.target.value)}
              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              required
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              카테고리 <span className="text-red-500">*</span>
            </label>
            <select
              value={form.category}
              onChange={(e) => handleInputChange('category', e.target.value)}
              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent pr-8"
              required
            >
              <option value="">카테고리 선택</option>
              {categories.map((c) => (
                <option key={c} value={c}>
                  {c}
                </option>
              ))}
            </select>
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              상태 <span className="text-red-500">*</span>
            </label>
            <select
              value={form.status}
              onChange={(e) => handleInputChange('status', e.target.value as 'active' | 'inactive')}
              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent pr-8"
              required
            >
              {statuses.map((s) => (
                <option key={s.value} value={s.value}>
                  {s.label}
                </option>
              ))}
            </select>
          </div>
        </div>
      </div>

      {/* 담당자 정보 */}
      <div>
        <h4 className="text-lg font-semibold text-gray-900 mb-4">담당자 정보</h4>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              담당자명 <span className="text-red-500">*</span>
            </label>
            <input
              type="text"
              value={form.managerName}
              onChange={(e) => handleInputChange('managerName', e.target.value)}
              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              required
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              담당자 전화번호 <span className="text-red-500">*</span>
            </label>
            <input
              type="text"
              value={form.managerPhone}
              onChange={(e) => handleInputChange('managerPhone', e.target.value)}
              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              required
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              담당자 이메일 <span className="text-red-500">*</span>
            </label>
            <input
              type="email"
              value={form.managerEmail}
              onChange={(e) => handleInputChange('managerEmail', e.target.value)}
              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              required
            />
          </div>
        </div>
      </div>

      {/* 배송 정보 */}
      <div>
        <h4 className="text-lg font-semibold text-gray-900 mb-4">배송 정보</h4>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              주소 <span className="text-red-500">*</span>
            </label>
            <input
              value={form.address}
              onChange={(e) => handleInputChange('address', e.target.value)}
              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              required
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              배송기간(일) <span className="text-red-500">*</span>
            </label>
            <input
              type="text"
              value={form.deliveryDays}
              onChange={(e) => handleInputChange('deliveryDays', e.target.value)}
              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              required
            />
          </div>
        </div>
      </div>

      {/* 버튼 */}
      <div className="flex gap-3 pt-6 border-t border-gray-200">
        <button
          type="button"
          onClick={onCancel}
          className="flex-1 px-4 py-2 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 transition-colors font-medium cursor-pointer whitespace-nowrap"
        >
          취소
        </button>
        <button
          type="submit"
          className="flex-1 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors font-medium cursor-pointer whitespace-nowrap"
        >
          저장
        </button>
      </div>
    </form>
  );
}
