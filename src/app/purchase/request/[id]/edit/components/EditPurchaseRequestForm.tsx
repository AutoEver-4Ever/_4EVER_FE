'use client';

import { useState } from 'react';
import Link from 'next/link';

interface EditPurchaseRequestFormProps {
  requestId: string;
}

export default function EditPurchaseRequestForm({ requestId }: EditPurchaseRequestFormProps) {
  const [formData, setFormData] = useState({
    requestNumber: requestId,
    requestDate: '2024-01-15',
    requester: '김철수',
    department: '개발팀',
    purpose: '개발 장비 구매',
    priority: '보통',
    expectedDate: '2024-02-01',
    items: [
      {
        id: 1,
        category: '전자제품',
        name: '노트북',
        specification: 'MacBook Pro 16인치, M3 Pro, 18GB RAM, 512GB SSD',
        quantity: 2,
        unitPrice: 3500000,
        totalPrice: 7000000,
        supplier: '애플코리아',
        note: '개발용',
      },
      {
        id: 2,
        category: '사무용품',
        name: '모니터',
        specification: '27인치 4K USB-C 모니터',
        quantity: 2,
        unitPrice: 450000,
        totalPrice: 900000,
        supplier: 'LG전자',
        note: '듀얼 모니터 구성',
      },
    ],
    totalAmount: 7900000,
    note: '신규 개발자 입사에 따른 개발 환경 구축을 위한 장비 구매 요청입니다.',
  });

  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [deleteItemId, setDeleteItemId] = useState<number | null>(null);

  const handleInputChange = (field: string, value: string | number) => {
    setFormData((prev) => ({
      ...prev,
      [field]: value,
    }));
  };

  const handleItemChange = (itemId: number, field: string, value: string | number) => {
    setFormData((prev) => ({
      ...prev,
      items: prev.items.map((item) => {
        if (item.id === itemId) {
          const updatedItem = { ...item, [field]: value };
          if (field === 'quantity' || field === 'unitPrice') {
            updatedItem.totalPrice = updatedItem.quantity * updatedItem.unitPrice;
          }
          return updatedItem;
        }
        return item;
      }),
    }));

    // 전체 금액 재계산
    setTimeout(() => {
      setFormData((prev) => ({
        ...prev,
        totalAmount: prev.items.reduce((sum, item) => sum + item.totalPrice, 0),
      }));
    }, 0);
  };

  const addItem = () => {
    const newItem = {
      id: Math.max(...formData.items.map((item) => item.id)) + 1,
      category: '',
      name: '',
      specification: '',
      quantity: 1,
      unitPrice: 0,
      totalPrice: 0,
      supplier: '',
      note: '',
    };

    setFormData((prev) => ({
      ...prev,
      items: [...prev.items, newItem],
    }));
  };

  const deleteItem = (itemId: number) => {
    setFormData((prev) => {
      const newItems = prev.items.filter((item) => item.id !== itemId);
      const newTotalAmount = newItems.reduce((sum, item) => sum + item.totalPrice, 0);
      return {
        ...prev,
        items: newItems,
        totalAmount: newTotalAmount,
      };
    });
    setShowDeleteModal(false);
    setDeleteItemId(null);
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    alert('구매요청이 성공적으로 수정되었습니다.');
  };

  const deleteItemToDelete = formData.items.find((item) => item.id === deleteItemId);

  return (
    <div className="min-h-screen bg-gray-50">
      {/* 헤더 */}
      <div className="bg-white shadow-sm border-b border-gray-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16">
            <div className="flex items-center space-x-4">
              <Link href="/purchase" className="text-gray-600 hover:text-gray-900 cursor-pointer">
                <i className="ri-arrow-left-line text-xl"></i>
              </Link>
              <div>
                <h1 className="text-xl font-semibold text-gray-900">구매요청 수정</h1>
                <p className="text-sm text-gray-600">{requestId}</p>
              </div>
            </div>
          </div>
        </div>
      </div>

      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* 브레드크럼 */}
        <nav className="flex mb-8" aria-label="Breadcrumb">
          <ol className="flex items-center space-x-2">
            <li>
              <Link href="/purchase" className="text-gray-500 hover:text-gray-700 cursor-pointer">
                구매관리
              </Link>
            </li>
            <li>
              <i className="ri-arrow-right-s-line text-gray-400"></i>
            </li>
            <li>
              <Link
                href={`/purchase/request/${requestId}`}
                className="text-gray-500 hover:text-gray-700 cursor-pointer"
              >
                구매요청 상세
              </Link>
            </li>
            <li>
              <i className="ri-arrow-right-s-line text-gray-400"></i>
            </li>
            <li className="text-gray-900 font-medium">수정</li>
          </ol>
        </nav>

        <form onSubmit={handleSubmit} className="space-y-8">
          {/* 기본 정보 */}
          <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
            <h2 className="text-lg font-semibold text-gray-900 mb-6">기본 정보</h2>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">요청번호</label>
                <input
                  type="text"
                  value={formData.requestNumber}
                  readOnly
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg bg-gray-50 text-gray-500 text-sm"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">요청일자 *</label>
                <input
                  type="date"
                  value={formData.requestDate}
                  onChange={(e) => handleInputChange('requestDate', e.target.value)}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent text-sm"
                  required
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">요청자 *</label>
                <input
                  type="text"
                  value={formData.requester}
                  onChange={(e) => handleInputChange('requester', e.target.value)}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent text-sm"
                  required
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">부서 *</label>
                <select
                  value={formData.department}
                  onChange={(e) => handleInputChange('department', e.target.value)}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent text-sm pr-8"
                  required
                >
                  <option value="개발팀">개발팀</option>
                  <option value="디자인팀">디자인팀</option>
                  <option value="마케팅팀">마케팅팀</option>
                  <option value="영업팀">영업팀</option>
                  <option value="인사팀">인사팀</option>
                  <option value="재무팀">재무팀</option>
                  <option value="총무팀">총무팀</option>
                </select>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">우선순위 *</label>
                <select
                  value={formData.priority}
                  onChange={(e) => handleInputChange('priority', e.target.value)}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent text-sm pr-8"
                  required
                >
                  <option value="낮음">낮음</option>
                  <option value="보통">보통</option>
                  <option value="높음">높음</option>
                  <option value="긴급">긴급</option>
                </select>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">희망납기일</label>
                <input
                  type="date"
                  value={formData.expectedDate}
                  onChange={(e) => handleInputChange('expectedDate', e.target.value)}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent text-sm"
                />
              </div>
            </div>

            <div className="mt-6">
              <label className="block text-sm font-medium text-gray-700 mb-2">사용목적 *</label>
              <input
                type="text"
                value={formData.purpose}
                onChange={(e) => handleInputChange('purpose', e.target.value)}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent text-sm"
                placeholder="구매 목적을 입력하세요"
                required
              />
            </div>
          </div>

          {/* 품목 정보 */}
          <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
            <div className="flex items-center justify-between mb-6">
              <h2 className="text-lg font-semibold text-gray-900">품목 정보</h2>
              <button
                type="button"
                onClick={addItem}
                className="px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 transition-colors cursor-pointer whitespace-nowrap flex items-center space-x-2"
              >
                <i className="ri-add-line"></i>
                <span>품목 추가</span>
              </button>
            </div>

            <div className="overflow-x-auto">
              <table className="w-full border border-gray-300 rounded-lg">
                <thead className="bg-gray-50">
                  <tr>
                    <th className="px-4 py-3 text-left text-sm font-medium text-gray-700 border-b">
                      분류
                    </th>
                    <th className="px-4 py-3 text-left text-sm font-medium text-gray-700 border-b">
                      품목명
                    </th>
                    <th className="px-4 py-3 text-left text-sm font-medium text-gray-700 border-b">
                      사양
                    </th>
                    <th className="px-4 py-3 text-center text-sm font-medium text-gray-700 border-b">
                      수량
                    </th>
                    <th className="px-4 py-3 text-right text-sm font-medium text-gray-700 border-b">
                      단가
                    </th>
                    <th className="px-4 py-3 text-right text-sm font-medium text-gray-700 border-b">
                      금액
                    </th>
                    <th className="px-4 py-3 text-left text-sm font-medium text-gray-700 border-b">
                      공급업체
                    </th>
                    <th className="px-4 py-3 text-center text-sm font-medium text-gray-700 border-b">
                      작업
                    </th>
                  </tr>
                </thead>
                <tbody>
                  {formData.items.map((item) => (
                    <tr key={item.id} className="border-b">
                      <td className="px-4 py-3">
                        <select
                          value={item.category}
                          onChange={(e) => handleItemChange(item.id, 'category', e.target.value)}
                          className="w-full px-2 py-1 border border-gray-300 rounded text-sm pr-8"
                        >
                          <option value="">선택</option>
                          <option value="전자제품">전자제품</option>
                          <option value="사무용품">사무용품</option>
                          <option value="소프트웨어">소프트웨어</option>
                          <option value="가구">가구</option>
                          <option value="기타">기타</option>
                        </select>
                      </td>
                      <td className="px-4 py-3">
                        <input
                          type="text"
                          value={item.name}
                          onChange={(e) => handleItemChange(item.id, 'name', e.target.value)}
                          className="w-full px-2 py-1 border border-gray-300 rounded text-sm"
                          placeholder="품목명"
                        />
                      </td>
                      <td className="px-4 py-3">
                        <input
                          type="text"
                          value={item.specification}
                          onChange={(e) =>
                            handleItemChange(item.id, 'specification', e.target.value)
                          }
                          className="w-full px-2 py-1 border border-gray-300 rounded text-sm"
                          placeholder="상세 사양"
                        />
                      </td>
                      <td className="px-4 py-3">
                        <input
                          type="number"
                          value={item.quantity}
                          onChange={(e) =>
                            handleItemChange(item.id, 'quantity', Number(e.target.value))
                          }
                          className="w-20 px-2 py-1 border border-gray-300 rounded text-sm text-center"
                          min="1"
                        />
                      </td>
                      <td className="px-4 py-3">
                        <input
                          type="number"
                          value={item.unitPrice}
                          onChange={(e) =>
                            handleItemChange(item.id, 'unitPrice', Number(e.target.value))
                          }
                          className="w-24 px-2 py-1 border border-gray-300 rounded text-sm text-right"
                          min="0"
                        />
                      </td>
                      <td className="px-4 py-3 text-right text-sm font-medium">
                        ₩{item.totalPrice.toLocaleString()}
                      </td>
                      <td className="px-4 py-3">
                        <input
                          type="text"
                          value={item.supplier}
                          onChange={(e) => handleItemChange(item.id, 'supplier', e.target.value)}
                          className="w-full px-2 py-1 border border-gray-300 rounded text-sm"
                          placeholder="공급업체"
                        />
                      </td>
                      <td className="px-4 py-3 text-center">
                        <button
                          type="button"
                          onClick={() => {
                            setDeleteItemId(item.id);
                            setShowDeleteModal(true);
                          }}
                          disabled={formData.items.length <= 1}
                          className={`${
                            formData.items.length <= 1
                              ? 'text-gray-300 cursor-not-allowed'
                              : 'text-red-600 hover:text-red-800 cursor-pointer'
                          }`}
                        >
                          <i className="ri-delete-bin-line"></i>
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
                <tfoot className="bg-gray-50">
                  <tr>
                    <td colSpan={5} className="px-4 py-3 text-right font-medium text-gray-900">
                      총 금액
                    </td>
                    <td className="px-4 py-3 text-right font-bold text-lg text-blue-600">
                      ₩{formData.totalAmount.toLocaleString()}
                    </td>
                    <td colSpan={2}></td>
                  </tr>
                </tfoot>
              </table>
            </div>
          </div>

          {/* 비고 */}
          <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
            <h2 className="text-lg font-semibold text-gray-900 mb-4">비고</h2>
            <textarea
              value={formData.note}
              onChange={(e) => handleInputChange('note', e.target.value)}
              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent text-sm"
              rows={4}
              placeholder="추가 요청사항이나 특이사항을 입력하세요"
            ></textarea>
          </div>

          {/* 버튼 */}
          <div className="flex justify-end space-x-4">
            <Link
              href={`/purchase/request/${requestId}`}
              className="px-6 py-2 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 transition-colors cursor-pointer whitespace-nowrap"
            >
              취소
            </Link>
            <button
              type="submit"
              className="px-6 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors cursor-pointer whitespace-nowrap"
            >
              수정 완료
            </button>
          </div>
        </form>
      </main>

      {/* 품목 삭제 확인 모달 */}
      {showDeleteModal && deleteItemToDelete && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white rounded-lg p-6 w-full max-w-md">
            <div className="flex items-center space-x-3 mb-4">
              <div className="w-10 h-10 bg-red-100 rounded-full flex items-center justify-center">
                <i className="ri-error-warning-line text-red-600 text-xl"></i>
              </div>
              <div>
                <h3 className="text-lg font-semibold text-gray-900">품목 삭제</h3>
                <p className="text-sm text-gray-600">이 품목을 삭제하시겠습니까?</p>
              </div>
            </div>

            <div className="bg-gray-50 rounded-lg p-4 mb-6">
              <div className="space-y-2 text-sm">
                <div>
                  <span className="font-medium">품목명:</span> {deleteItemToDelete.name}
                </div>
                <div>
                  <span className="font-medium">사양:</span> {deleteItemToDelete.specification}
                </div>
                <div>
                  <span className="font-medium">수량:</span> {deleteItemToDelete.quantity}개
                </div>
                <div>
                  <span className="font-medium">금액:</span> ₩
                  {deleteItemToDelete.totalPrice.toLocaleString()}
                </div>
              </div>
            </div>

            <div className="flex space-x-3">
              <button
                onClick={() => {
                  setShowDeleteModal(false);
                  setDeleteItemId(null);
                }}
                className="flex-1 px-4 py-2 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 transition-colors cursor-pointer"
              >
                취소
              </button>
              <button
                onClick={() => deleteItem(deleteItemId!)}
                className="flex-1 px-4 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700 transition-colors cursor-pointer"
              >
                삭제
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
