// components/modals/EditSupplierModal.tsx

interface Supplier {
  id: string;
  name: string;
  category: string;
  contact: string;
  email: string;
  address: string;
  manager: string;
  managerPhone: string;
  rating: number;
  contractValue: string;
  lastOrderDate: string;
  status: 'active' | 'inactive';
  paymentTerms: string;
  deliveryTime: string;
  qualityScore: number;
  notes: string;
}

interface EditSupplierModalProps {
  isOpen: boolean;
  onClose: () => void;
  supplier: Supplier;
  onSave: (supplier: Supplier) => void;
  onSupplierChange: (supplier: Supplier) => void;
  categories: string[];
}

export default function EditSupplierModal({
  isOpen,
  onClose,
  supplier,
  onSave,
  onSupplierChange,
  categories,
}: EditSupplierModalProps) {
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSave(supplier);
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
      <div className="bg-white rounded-lg p-6 w-full max-w-2xl max-h-[90vh] overflow-y-auto">
        <div className="flex items-center justify-between mb-6">
          <h3 className="text-xl font-semibold text-gray-900">공급업체 수정</h3>
          <button onClick={onClose} className="text-gray-400 hover:text-gray-600 cursor-pointer">
            <i className="ri-close-line text-2xl"></i>
          </button>
        </div>

        <form onSubmit={handleSubmit} className="space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">공급업체명</label>
              <input
                type="text"
                value={supplier.name}
                onChange={(e) => onSupplierChange({ ...supplier, name: e.target.value })}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">카테고리</label>
              <select
                value={supplier.category}
                onChange={(e) => onSupplierChange({ ...supplier, category: e.target.value })}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent pr-8"
              >
                {categories.slice(1).map((category) => (
                  <option key={category} value={category}>
                    {category}
                  </option>
                ))}
              </select>
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">대표전화</label>
              <input
                type="text"
                value={supplier.contact}
                onChange={(e) => onSupplierChange({ ...supplier, contact: e.target.value })}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">이메일</label>
              <input
                type="email"
                value={supplier.email}
                onChange={(e) => onSupplierChange({ ...supplier, email: e.target.value })}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">담당자명</label>
              <input
                type="text"
                value={supplier.manager}
                onChange={(e) => onSupplierChange({ ...supplier, manager: e.target.value })}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">담당자 연락처</label>
              <input
                type="text"
                value={supplier.managerPhone}
                onChange={(e) => onSupplierChange({ ...supplier, managerPhone: e.target.value })}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">결제조건</label>
              <input
                type="text"
                value={supplier.paymentTerms}
                onChange={(e) => onSupplierChange({ ...supplier, paymentTerms: e.target.value })}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">배송기간</label>
              <input
                type="text"
                value={supplier.deliveryTime}
                onChange={(e) => onSupplierChange({ ...supplier, deliveryTime: e.target.value })}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">평점 (1-5)</label>
              <input
                type="number"
                min="1"
                max="5"
                step="0.1"
                value={supplier.rating}
                onChange={(e) =>
                  onSupplierChange({
                    ...supplier,
                    rating: parseFloat(e.target.value),
                  })
                }
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                품질점수 (0-100)
              </label>
              <input
                type="number"
                min="0"
                max="100"
                value={supplier.qualityScore}
                onChange={(e) =>
                  onSupplierChange({
                    ...supplier,
                    qualityScore: parseInt(e.target.value),
                  })
                }
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">상태</label>
              <select
                value={supplier.status}
                onChange={(e) =>
                  onSupplierChange({
                    ...supplier,
                    status: e.target.value as 'active' | 'inactive',
                  })
                }
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent pr-8"
              >
                <option value="active">활성</option>
                <option value="inactive">비활성</option>
              </select>
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">계약금액</label>
              <input
                type="text"
                value={supplier.contractValue}
                onChange={(e) => onSupplierChange({ ...supplier, contractValue: e.target.value })}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              />
            </div>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">주소</label>
            <textarea
              value={supplier.address}
              onChange={(e) => onSupplierChange({ ...supplier, address: e.target.value })}
              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              rows={2}
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">메모</label>
            <textarea
              value={supplier.notes}
              onChange={(e) => onSupplierChange({ ...supplier, notes: e.target.value })}
              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              rows={3}
            />
          </div>

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
              저장
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
