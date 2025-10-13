'use client';

import { useState } from 'react';
import { SupplierRequest } from '@/app/purchase/types/SupplierType';

interface AddSupplierModalProps {
  isOpen: boolean;
  onClose: () => void;
  onAddSupplier: (supplier: Partial<SupplierRequest>) => void;
  categories: string[];
}

export default function AddSupplierModal({
  isOpen,
  onClose,
  onAddSupplier,
  categories,
}: AddSupplierModalProps) {
  const [newSupplier, setNewSupplier] = useState<SupplierRequest>({
    name: '',
    category: '',
    managerName: '',
    managerPhone: '',
    email: '',
    deliveryDays: 0,
    address: '',
    materials: [],
  });

  const [materialRows, setMaterialRows] = useState<Array<Omit<Material, 'id'>>>([
    {
      productName: '',
      spec: '',
      unitPrice: '',
    },
  ]);

  const handleAddMaterialRow = () => {
    setMaterialRows([
      ...materialRows,
      {
        productName: '',
        spec: '',
        unitPrice: '',
      },
    ]);
  };

  const handleRemoveMaterialRow = (index: number) => {
    setMaterialRows(materialRows.filter((_, i) => i !== index));
  };

  const handleMaterialChange = (
    index: number,
    field: keyof Omit<Material, 'id'>,
    value: string,
  ) => {
    const updated = [...materialRows];
    updated[index] = {
      ...updated[index],
      [field]: value,
    };
    setMaterialRows(updated);
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    // 필수 기본 정보 검증
    if (!newSupplier.name || !newSupplier.category || !newSupplier.managerName) {
      alert('필수 항목을 입력해주세요');
      return;
    }

    // 입력된 자재만 필터링
    const filteredMaterials = materialRows
      .filter((m) => m.productName && m.spec && m.unitPrice)
      .map((m) => ({
        id: `MAT-${Date.now()}-${Math.random()}`,
        ...m,
      }));

    // 자재 검증
    if (filteredMaterials.length === 0) {
      alert('최소 하나의 자재를 입력해주세요');
      return;
    }

    // 제출
    onAddSupplier({
      ...newSupplier,
      materials: filteredMaterials,
    });

    // 초기화
    setNewSupplier({
      name: '',
      category: '',
      manager: '',
      managerPhone: '',
      email: '',
      deliveryDays: 0,
      address: '',
      materials: [],
    });
    setMaterialRows([
      {
        productName: '',
        spec: '',
        unitPrice: '',
      },
    ]);
  };

  if (!isOpen) return null;

  const getDeliveryLabel = (days: number) => {
    if (days === 0) return '당일 배송';
    if (days === 1) return '1일 배송';
    return `${days}일 배송`;
  };

  const filledMaterialCount = materialRows.filter(
    (m) => m.productName && m.spec && m.unitPrice,
  ).length;

  return (
    <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50">
      <div className="bg-white rounded-lg p-6 w-full max-w-5xl max-h-[95vh] overflow-y-auto">
        <div className="flex items-center justify-between mb-6">
          <h3 className="text-xl font-semibold text-gray-900">공급업체 등록</h3>
          <button onClick={onClose} className="text-gray-400 hover:text-gray-600 cursor-pointer">
            <i className="ri-close-line text-2xl"></i>
          </button>
        </div>

        <form onSubmit={handleSubmit} className="space-y-8">
          {/* 기본 정보 섹션 */}
          <div>
            <h4 className="text-lg font-semibold text-gray-900 mb-4">기본 정보</h4>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  업체명 <span className="text-red-500">*</span>
                </label>
                <input
                  type="text"
                  value={newSupplier.name}
                  onChange={(e) => setNewSupplier({ ...newSupplier, name: e.target.value })}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  required
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  카테고리 <span className="text-red-500">*</span>
                </label>
                <select
                  value={newSupplier.category}
                  onChange={(e) => setNewSupplier({ ...newSupplier, category: e.target.value })}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent pr-8"
                  required
                >
                  <option value="">카테고리 선택</option>
                  {categories.slice(1).map((category) => (
                    <option key={category} value={category}>
                      {category}
                    </option>
                  ))}
                </select>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  담당자명 <span className="text-red-500">*</span>
                </label>
                <input
                  type="text"
                  value={newSupplier.manager}
                  onChange={(e) => setNewSupplier({ ...newSupplier, manager: e.target.value })}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  required
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  전화번호 <span className="text-red-500">*</span>
                </label>
                <input
                  type="text"
                  value={newSupplier.managerPhone}
                  onChange={(e) => setNewSupplier({ ...newSupplier, managerPhone: e.target.value })}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  required
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  이메일 <span className="text-red-500">*</span>
                </label>
                <input
                  type="email"
                  value={newSupplier.email}
                  onChange={(e) => setNewSupplier({ ...newSupplier, email: e.target.value })}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  required
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  배송기간(일) <span className="text-red-500">*</span>
                </label>
                <div className="flex items-center gap-2">
                  <input
                    type="number"
                    min="0"
                    value={newSupplier.deliveryDays}
                    onChange={(e) =>
                      setNewSupplier({
                        ...newSupplier,
                        deliveryDays: parseInt(e.target.value) || 0,
                      })
                    }
                    className="flex-1 px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    required
                  />
                  <span className="text-sm text-gray-600 whitespace-nowrap">
                    ({getDeliveryLabel(newSupplier.deliveryDays || 0)})
                  </span>
                </div>
              </div>
            </div>

            <div className="mt-6">
              <label className="block text-sm font-medium text-gray-700 mb-2">
                주소 <span className="text-red-500">*</span>
              </label>
              <textarea
                value={newSupplier.address}
                onChange={(e) => setNewSupplier({ ...newSupplier, address: e.target.value })}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                rows={2}
                required
              />
            </div>
          </div>

          {/* 제공 가능한 자재 섹션 */}
          <div>
            <div className="flex items-center justify-between mb-4">
              <h4 className="text-lg font-semibold text-gray-900">제공 가능한 자재목록</h4>
              {/* 행 추가 버튼 */}
              <button
                type="button"
                onClick={handleAddMaterialRow}
                className="mt-3 px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 transition-colors font-medium cursor-pointer text-sm flex items-center gap-2"
              >
                <i className="ri-add-line"></i>
                자재 행 추가
              </button>
            </div>

            {/* 자재 테이블 형식 입력 */}
            <div className="overflow-x-auto border border-gray-200 rounded-lg">
              <table className="w-full">
                {/* 자재 테이블 형식 입력 */}
                <thead className="bg-gray-100 border-b border-gray-200">
                  <tr>
                    <th className="px-4 py-3 text-sm font-semibold text-gray-900">제품명</th>
                    <th className="px-4 py-3 text-sm font-semibold text-gray-900">사양</th>
                    <th className="px-4 py-3 text-sm font-semibold text-gray-900">단가</th>
                    <th className="px-4 py-3 text-sm font-semibold text-gray-900"></th>
                  </tr>
                </thead>
                <tbody>
                  {materialRows.map((material, index) => (
                    <tr key={index} className="border-b border-gray-200 hover:bg-gray-50">
                      <td className="px-4 py-3">
                        <input
                          type="text"
                          value={material.productName}
                          onChange={(e) =>
                            handleMaterialChange(index, 'productName', e.target.value)
                          }
                          placeholder="예: 철강봉"
                          className="w-full px-2 py-1 border border-gray-300 rounded text-sm focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                        />
                      </td>
                      <td className="px-4 py-3">
                        <input
                          type="text"
                          value={material.spec}
                          onChange={(e) => handleMaterialChange(index, 'spec', e.target.value)}
                          placeholder="예: φ10×1000mm"
                          className="w-full px-2 py-1 border border-gray-300 rounded text-sm focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                        />
                      </td>
                      <td className="px-4 py-3">
                        <input
                          type="text"
                          value={material.unitPrice}
                          onChange={(e) => handleMaterialChange(index, 'unitPrice', e.target.value)}
                          placeholder="예: ₩10,000"
                          className="w-full px-2 py-1 border border-gray-300 rounded text-sm focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                        />
                      </td>
                      <td className="px-4 py-3 text-center">
                        <button
                          type="button"
                          onClick={() => handleRemoveMaterialRow(index)}
                          className="text-red-600 hover:text-red-700 cursor-pointer"
                          title="행 삭제"
                        >
                          <i className="ri-delete-bin-line"></i>
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
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
              type="submit"
              className="flex-1 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors font-medium cursor-pointer whitespace-nowrap"
            >
              일괄 저장
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
