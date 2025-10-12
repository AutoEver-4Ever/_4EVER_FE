'use client';

import { useState } from 'react';

interface Supplier {
  id: string;
  name: string;
  contact: string;
  email: string;
  category: string;
  deliveryDays: number;
  status: 'active' | 'inactive';
  materials: string[];
}

interface SupplierListProps {
  onAddSupplier: () => void;
}

export default function SupplierList({ onAddSupplier }: SupplierListProps) {
  const [suppliers] = useState<Supplier[]>([
    {
      id: 'SUP001',
      name: '한국철강',
      contact: '02-1234-5678',
      email: 'contact@koreasteel.com',
      category: '원자재',
      deliveryDays: 3,
      status: 'active',
      materials: ['철강재', '스테인리스', '알루미늄'],
    },
    {
      id: 'SUP002',
      name: '대한전자부품',
      contact: '031-987-6543',
      email: 'sales@dahanelec.com',
      category: '전자부품',
      deliveryDays: 1,
      status: 'active',
      materials: ['반도체', '저항', '콘덴서', 'IC칩'],
    },
    {
      id: 'SUP003',
      name: '글로벌화학',
      contact: '051-555-0123',
      email: 'info@globalchem.co.kr',
      category: '화학',
      deliveryDays: 5,
      status: 'inactive',
      materials: ['용매', '접착제', '코팅제'],
    },
    {
      id: 'SUP004',
      name: '프리미엄플라스틱',
      contact: '032-777-8888',
      email: 'order@premiumplastic.com',
      category: '플라스틱',
      deliveryDays: 2,
      status: 'active',
      materials: ['ABS', 'PC', 'PVC', 'PE'],
    },
    {
      id: 'SUP005',
      name: '스마트로지스틱스',
      contact: '02-9999-1111',
      email: 'service@smartlogistics.kr',
      category: '기타',
      deliveryDays: 0,
      status: 'active',
      materials: ['포장재', '운송서비스', '창고관리'],
    },
  ]);

  const [selectedSupplier, setSelectedSupplier] = useState<Supplier | null>(null);
  const [isDetailModalOpen, setIsDetailModalOpen] = useState(false);
  const [isEditMode, setIsEditMode] = useState(false);
  const [editForm, setEditForm] = useState<Supplier | null>(null);

  const handleViewDetail = (supplier: Supplier) => {
    setSelectedSupplier(supplier);
    setEditForm(supplier);
    setIsEditMode(false);
    setIsDetailModalOpen(true);
  };

  const handleEdit = () => {
    setIsEditMode(true);
  };

  const handleSaveEdit = () => {
    if (editForm) {
      // 여기서 실제 저장 로직 구현
      console.log('공급업체 정보 수정:', editForm);
      setSelectedSupplier(editForm);
      setIsEditMode(false);
    }
  };

  const handleCancelEdit = () => {
    setEditForm(selectedSupplier);
    setIsEditMode(false);
  };

  const closeModal = () => {
    setIsDetailModalOpen(false);
    setSelectedSupplier(null);
    setEditForm(null);
    setIsEditMode(false);
  };

  const getStatusBadge = (status: string) => {
    const baseClasses = 'px-2 py-1 rounded-full text-xs font-medium';
    if (status === 'active') {
      return `${baseClasses} bg-green-100 text-green-800`;
    }
    return `${baseClasses} bg-red-100 text-red-800`;
  };

  const getStatusText = (status: string) => {
    return status === 'active' ? '활성' : '비활성';
  };

  const getDeliveryText = (days: number) => {
    if (days === 0) return '당일 배송';
    return `${days}일`;
  };

  return (
    <>
      <div className="bg-white rounded-lg shadow">
        <div className="p-6 border-b border-gray-200">
          <div className="flex justify-between items-center">
            <h3 className="text-lg font-semibold text-gray-900">공급업체 목록</h3>
            <button
              onClick={onAddSupplier}
              className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition-colors whitespace-nowrap cursor-pointer"
            >
              <i className="ri-add-line mr-2"></i>
              신규 등록
            </button>
          </div>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full">
            <thead className="bg-gray-50">
              <tr>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  공급업체 ID
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  업체명
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  연락처
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  카테고리
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  배송 기간
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  상태
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  작업
                </th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {suppliers.map((supplier) => (
                <tr key={supplier.id} className="hover:bg-gray-50">
                  <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                    {supplier.id}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                    {supplier.name}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                    <div>
                      <div>{supplier.contact}</div>
                      <div className="text-xs text-gray-400">{supplier.email}</div>
                    </div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                    {supplier.category}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                    {getDeliveryText(supplier.deliveryDays)}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <span className={getStatusBadge(supplier.status)}>
                      {getStatusText(supplier.status)}
                    </span>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                    <div className="flex space-x-2">
                      <button
                        onClick={() => handleViewDetail(supplier)}
                        className="w-8 h-8 flex items-center justify-center text-blue-600 hover:bg-blue-50 rounded cursor-pointer"
                        title="상세보기"
                      >
                        <i className="ri-eye-line"></i>
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* 상세보기/수정 모달 */}
      {isDetailModalOpen && selectedSupplier && editForm && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white rounded-lg shadow-xl w-full max-w-2xl mx-4 max-h-[90vh] overflow-y-auto">
            <div className="p-6 border-b border-gray-200">
              <div className="flex justify-between items-center">
                <h3 className="text-lg font-semibold text-gray-900">
                  {isEditMode ? '공급업체 수정' : '공급업체 상세정보'}
                </h3>
                <button
                  onClick={closeModal}
                  className="text-gray-400 hover:text-gray-600 cursor-pointer"
                >
                  <i className="ri-close-line text-xl"></i>
                </button>
              </div>
            </div>

            <div className="p-6 space-y-6">
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    공급업체 ID
                  </label>
                  <input
                    type="text"
                    value={editForm.id}
                    disabled
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg bg-gray-50 text-gray-500"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">업체명</label>
                  <input
                    type="text"
                    value={editForm.name}
                    onChange={(e) => setEditForm({ ...editForm, name: e.target.value })}
                    disabled={!isEditMode}
                    className={`w-full px-3 py-2 border border-gray-300 rounded-lg ${
                      isEditMode ? 'bg-white' : 'bg-gray-50 text-gray-500'
                    }`}
                  />
                </div>
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">연락처</label>
                  <input
                    type="text"
                    value={editForm.contact}
                    onChange={(e) => setEditForm({ ...editForm, contact: e.target.value })}
                    disabled={!isEditMode}
                    className={`w-full px-3 py-2 border border-gray-300 rounded-lg ${
                      isEditMode ? 'bg-white' : 'bg-gray-50 text-gray-500'
                    }`}
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">이메일</label>
                  <input
                    type="email"
                    value={editForm.email}
                    onChange={(e) => setEditForm({ ...editForm, email: e.target.value })}
                    disabled={!isEditMode}
                    className={`w-full px-3 py-2 border border-gray-300 rounded-lg ${
                      isEditMode ? 'bg-white' : 'bg-gray-50 text-gray-500'
                    }`}
                  />
                </div>
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">카테고리</label>
                  {isEditMode ? (
                    <select
                      value={editForm.category}
                      onChange={(e) => setEditForm({ ...editForm, category: e.target.value })}
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg bg-white pr-8"
                    >
                      <option value="원자재">원자재</option>
                      <option value="전자부품">전자부품</option>
                      <option value="화학">화학</option>
                      <option value="플라스틱">플라스틱</option>
                      <option value="기타">기타</option>
                    </select>
                  ) : (
                    <input
                      type="text"
                      value={editForm.category}
                      disabled
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg bg-gray-50 text-gray-500"
                    />
                  )}
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    배송 기간 (일)
                  </label>
                  <input
                    type="number"
                    min="0"
                    value={editForm.deliveryDays}
                    onChange={(e) =>
                      setEditForm({ ...editForm, deliveryDays: parseInt(e.target.value) || 0 })
                    }
                    disabled={!isEditMode}
                    className={`w-full px-3 py-2 border border-gray-300 rounded-lg ${
                      isEditMode ? 'bg-white' : 'bg-gray-50 text-gray-500'
                    }`}
                  />
                  {!isEditMode && (
                    <p className="text-xs text-gray-500 mt-1">
                      {editForm.deliveryDays === 0
                        ? '당일 배송 가능'
                        : `${editForm.deliveryDays}일 소요`}
                    </p>
                  )}
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">상태</label>
                {isEditMode ? (
                  <select
                    value={editForm.status}
                    onChange={(e) =>
                      setEditForm({ ...editForm, status: e.target.value as 'active' | 'inactive' })
                    }
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg bg-white pr-8"
                  >
                    <option value="active">활성</option>
                    <option value="inactive">비활성</option>
                  </select>
                ) : (
                  <span className={getStatusBadge(editForm.status)}>
                    {getStatusText(editForm.status)}
                  </span>
                )}
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  제공 가능한 자재 목록
                </label>
                {isEditMode ? (
                  <div className="space-y-2">
                    {editForm.materials.map((material, index) => (
                      <div key={index} className="flex items-center space-x-2">
                        <input
                          type="text"
                          value={material}
                          onChange={(e) => {
                            const newMaterials = [...editForm.materials];
                            newMaterials[index] = e.target.value;
                            setEditForm({ ...editForm, materials: newMaterials });
                          }}
                          className="flex-1 px-3 py-2 border border-gray-300 rounded-lg"
                        />
                        <button
                          onClick={() => {
                            const newMaterials = editForm.materials.filter((_, i) => i !== index);
                            setEditForm({ ...editForm, materials: newMaterials });
                          }}
                          className="w-8 h-8 flex items-center justify-center text-red-600 hover:bg-red-50 rounded cursor-pointer"
                        >
                          <i className="ri-delete-bin-line"></i>
                        </button>
                      </div>
                    ))}
                    <button
                      onClick={() => {
                        setEditForm({ ...editForm, materials: [...editForm.materials, ''] });
                      }}
                      className="w-full px-3 py-2 border-2 border-dashed border-gray-300 rounded-lg text-gray-500 hover:border-gray-400 hover:text-gray-600 cursor-pointer"
                    >
                      <i className="ri-add-line mr-2"></i>
                      자재 추가
                    </button>
                  </div>
                ) : (
                  <div className="flex flex-wrap gap-2">
                    {editForm.materials.map((material, index) => (
                      <span
                        key={index}
                        className="px-3 py-1 bg-blue-100 text-blue-800 rounded-full text-sm"
                      >
                        {material}
                      </span>
                    ))}
                  </div>
                )}
              </div>
            </div>

            <div className="p-6 border-t border-gray-200 flex justify-end space-x-3">
              {isEditMode ? (
                <>
                  <button
                    onClick={handleCancelEdit}
                    className="px-4 py-2 text-gray-700 bg-gray-100 rounded-lg hover:bg-gray-200 cursor-pointer whitespace-nowrap"
                  >
                    취소
                  </button>
                  <button
                    onClick={handleSaveEdit}
                    className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 cursor-pointer whitespace-nowrap"
                  >
                    저장
                  </button>
                </>
              ) : (
                <>
                  <button
                    onClick={closeModal}
                    className="px-4 py-2 text-gray-700 bg-gray-100 rounded-lg hover:bg-gray-200 cursor-pointer whitespace-nowrap"
                  >
                    닫기
                  </button>
                  <button
                    onClick={handleEdit}
                    className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 cursor-pointer whitespace-nowrap"
                  >
                    <i className="ri-edit-line mr-2"></i>
                    수정
                  </button>
                </>
              )}
            </div>
          </div>
        </div>
      )}
    </>
  );
}
