'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';

interface OrderItem {
  id: string;
  itemName: string;
  specification: string;
  quantity: string;
  unit: string;
  unitPrice: string;
  supplier: string;
  notes: string;
}

export default function NewPurchaseOrderPage() {
  const router = useRouter();

  const [orderData, setOrderData] = useState({
    orderId: `PO-${new Date().getFullYear()}-${String(Date.now()).slice(-3)}`,
    orderDate: new Date().toISOString().split('T')[0],
    deliveryDate: '',
    supplier: '',
    priority: 'medium',
    paymentTerms: '',
    deliveryAddress: '경기도 안산시 단원구 공장로 456',
    specialInstructions: '',
    notes: '',
  });

  const [items, setItems] = useState<OrderItem[]>([
    {
      id: '1',
      itemName: '',
      specification: '',
      quantity: '',
      unit: '',
      unitPrice: '',
      supplier: '',
      notes: '',
    },
  ]);

  const suppliers = [
    '대한철강',
    '알루텍',
    '스테인리스코리아',
    '용접재료상사',
    '패스너코리아',
    '포스코',
    '현대제철',
    '동국제강',
    '세아제강',
  ];

  const paymentTermsOptions = [
    '즉시 결제',
    '월말 결제',
    '30일 후 결제',
    '45일 후 결제',
    '60일 후 결제',
  ];

  const addItem = () => {
    const newItem: OrderItem = {
      id: Date.now().toString(),
      itemName: '',
      specification: '',
      quantity: '',
      unit: '',
      unitPrice: '',
      supplier: orderData.supplier,
      notes: '',
    };
    setItems([...items, newItem]);
  };

  const removeItem = (id: string) => {
    if (items.length > 1) {
      setItems(items.filter((item) => item.id !== id));
    }
  };

  const updateItem = (id: string, field: keyof OrderItem, value: string) => {
    setItems(items.map((item) => (item.id === id ? { ...item, [field]: value } : item)));
  };

  const updateOrderData = (field: string, value: string) => {
    setOrderData((prev) => ({ ...prev, [field]: value }));

    // 공급업체가 변경되면 모든 품목의 공급업체도 업데이트
    if (field === 'supplier') {
      setItems(items.map((item) => ({ ...item, supplier: value })));
    }
  };

  const calculateItemTotal = (quantity: string, price: string) => {
    const qty = parseFloat(quantity) || 0;
    const unitPrice = parseFloat(price) || 0;
    return qty * unitPrice;
  };

  const calculateGrandTotal = () => {
    return items.reduce((total, item) => {
      return total + calculateItemTotal(item.quantity, item.unitPrice);
    }, 0);
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    // 필수 필드 검증
    if (!orderData.supplier || !orderData.deliveryDate || !orderData.paymentTerms) {
      alert('공급업체, 납기일, 결제조건을 입력해주세요.');
      return;
    }

    const invalidItems = items.filter(
      (item) =>
        !item.itemName.trim() ||
        !item.specification.trim() ||
        !item.quantity.trim() ||
        !item.unit.trim() ||
        !item.unitPrice.trim(),
    );

    if (invalidItems.length > 0) {
      alert('모든 품목의 필수 항목을 입력해주세요.');
      return;
    }

    // 발주서 데이터 생성
    const purchaseOrderData = {
      ...orderData,
      items: items,
      totalAmount: calculateGrandTotal(),
      status: 'pending',
    };

    console.log('발주서 데이터:', purchaseOrderData);
    alert(`발주서 ${orderData.orderId}가 성공적으로 작성되었습니다.`);
    router.push('/purchase');
  };

  const handleCancel = () => {
    router.push('/purchase');
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* 페이지 헤더 */}
        <div className="mb-8">
          <div className="flex items-center space-x-2 text-sm text-gray-500 mb-4">
            <span>구매관리</span>
            <i className="ri-arrow-right-s-line"></i>
            <span>발주서</span>
            <i className="ri-arrow-right-s-line"></i>
            <span className="text-gray-900">새 발주서 작성</span>
          </div>
          <h1 className="text-3xl font-bold text-gray-900">발주서 작성</h1>
          <p className="text-gray-600 mt-2">공급업체에 발송할 발주서를 작성합니다</p>
        </div>

        {/* 폼 */}
        <form onSubmit={handleSubmit} className="bg-white rounded-lg border border-gray-200">
          {/* 발주 기본 정보 */}
          <div className="p-6 border-b border-gray-200">
            <h2 className="text-lg font-semibold text-gray-900 mb-4">발주 정보</h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">발주번호</label>
                <input
                  type="text"
                  value={orderData.orderId}
                  readOnly
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg bg-gray-50 text-gray-700 text-sm"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">발주일자</label>
                <input
                  type="date"
                  value={orderData.orderDate}
                  onChange={(e) => updateOrderData('orderDate', e.target.value)}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg text-sm focus:outline-none focus:ring-1 focus:ring-blue-500"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  납기일 <span className="text-red-500">*</span>
                </label>
                <input
                  type="date"
                  value={orderData.deliveryDate}
                  onChange={(e) => updateOrderData('deliveryDate', e.target.value)}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg text-sm focus:outline-none focus:ring-1 focus:ring-blue-500"
                  required
                />
              </div>
            </div>
          </div>

          {/* 공급업체 정보 */}
          <div className="p-6 border-b border-gray-200">
            <h2 className="text-lg font-semibold text-gray-900 mb-4">공급업체 정보</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  공급업체 <span className="text-red-500">*</span>
                </label>
                <select
                  value={orderData.supplier}
                  onChange={(e) => updateOrderData('supplier', e.target.value)}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg text-sm focus:outline-none focus:ring-1 focus:ring-blue-500 pr-8"
                  required
                >
                  <option value="">공급업체 선택</option>
                  {suppliers.map((supplier) => (
                    <option key={supplier} value={supplier}>
                      {supplier}
                    </option>
                  ))}
                </select>
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">우선순위</label>
                <select
                  value={orderData.priority}
                  onChange={(e) => updateOrderData('priority', e.target.value)}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg text-sm focus:outline-none focus:ring-1 focus:ring-blue-500 pr-8"
                >
                  <option value="low">낮음</option>
                  <option value="medium">보통</option>
                  <option value="high">높음</option>
                </select>
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  결제조건 <span className="text-red-500">*</span>
                </label>
                <select
                  value={orderData.paymentTerms}
                  onChange={(e) => updateOrderData('paymentTerms', e.target.value)}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg text-sm focus:outline-none focus:ring-1 focus:ring-blue-500 pr-8"
                  required
                >
                  <option value="">결제조건 선택</option>
                  {paymentTermsOptions.map((term) => (
                    <option key={term} value={term}>
                      {term}
                    </option>
                  ))}
                </select>
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">배송주소</label>
                <input
                  type="text"
                  value={orderData.deliveryAddress}
                  onChange={(e) => updateOrderData('deliveryAddress', e.target.value)}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg text-sm focus:outline-none focus:ring-1 focus:ring-blue-500"
                />
              </div>
            </div>
          </div>

          {/* 발주 품목 */}
          <div className="p-6 border-b border-gray-200">
            <div className="flex items-center justify-between mb-4">
              <h2 className="text-lg font-semibold text-gray-900">발주 품목</h2>
              <button
                type="button"
                onClick={addItem}
                className="px-4 py-2 bg-blue-600 text-white font-medium rounded-lg hover:bg-blue-700 transition-colors duration-200 cursor-pointer whitespace-nowrap flex items-center space-x-2"
              >
                <i className="ri-add-line"></i>
                <span>품목 추가</span>
              </button>
            </div>

            {/* 테이블 */}
            <div className="overflow-x-auto">
              <table className="w-full border border-gray-200 rounded-lg">
                <thead className="bg-gray-50">
                  <tr>
                    <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider border-b border-gray-200">
                      품목명 <span className="text-red-500">*</span>
                    </th>
                    <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider border-b border-gray-200">
                      규격/사양 <span className="text-red-500">*</span>
                    </th>
                    <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider border-b border-gray-200">
                      수량 <span className="text-red-500">*</span>
                    </th>
                    <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider border-b border-gray-200">
                      단위 <span className="text-red-500">*</span>
                    </th>
                    <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider border-b border-gray-200">
                      단가 <span className="text-red-500">*</span>
                    </th>
                    <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider border-b border-gray-200">
                      금액
                    </th>
                    <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider border-b border-gray-200">
                      비고
                    </th>
                    <th className="px-4 py-3 text-center text-xs font-medium text-gray-500 uppercase tracking-wider border-b border-gray-200">
                      작업
                    </th>
                  </tr>
                </thead>
                <tbody className="bg-white divide-y divide-gray-200">
                  {items.map((item, index) => (
                    <tr key={item.id} className="hover:bg-gray-50">
                      <td className="px-4 py-3 border-b border-gray-200">
                        <input
                          type="text"
                          value={item.itemName}
                          onChange={(e) => updateItem(item.id, 'itemName', e.target.value)}
                          className="w-full px-2 py-1 border border-gray-300 rounded text-sm focus:outline-none focus:ring-1 focus:ring-blue-500"
                          placeholder="품목명 입력"
                          required
                        />
                      </td>
                      <td className="px-4 py-3 border-b border-gray-200">
                        <input
                          type="text"
                          value={item.specification}
                          onChange={(e) => updateItem(item.id, 'specification', e.target.value)}
                          className="w-full px-2 py-1 border border-gray-300 rounded text-sm focus:outline-none focus:ring-1 focus:ring-blue-500"
                          placeholder="규격/사양"
                          required
                        />
                      </td>
                      <td className="px-4 py-3 border-b border-gray-200">
                        <input
                          type="number"
                          value={item.quantity}
                          onChange={(e) => updateItem(item.id, 'quantity', e.target.value)}
                          className="w-full px-2 py-1 border border-gray-300 rounded text-sm focus:outline-none focus:ring-1 focus:ring-blue-500"
                          placeholder="수량"
                          min="0"
                          step="0.01"
                          required
                        />
                      </td>
                      <td className="px-4 py-3 border-b border-gray-200">
                        <input
                          type="text"
                          value={item.unit}
                          onChange={(e) => updateItem(item.id, 'unit', e.target.value)}
                          className="w-full px-2 py-1 border border-gray-300 rounded text-sm focus:outline-none focus:ring-1 focus:ring-blue-500"
                          placeholder="EA, KG 등"
                          required
                        />
                      </td>
                      <td className="px-4 py-3 border-b border-gray-200">
                        <input
                          type="number"
                          value={item.unitPrice}
                          onChange={(e) => updateItem(item.id, 'unitPrice', e.target.value)}
                          className="w-full px-2 py-1 border border-gray-300 rounded text-sm focus:outline-none focus:ring-1 focus:ring-blue-500"
                          placeholder="단가"
                          min="0"
                          step="1"
                          required
                        />
                      </td>
                      <td className="px-4 py-3 border-b border-gray-200">
                        <div className="text-sm font-medium text-gray-900">
                          ₩{calculateItemTotal(item.quantity, item.unitPrice).toLocaleString()}
                        </div>
                      </td>
                      <td className="px-4 py-3 border-b border-gray-200">
                        <input
                          type="text"
                          value={item.notes}
                          onChange={(e) => updateItem(item.id, 'notes', e.target.value)}
                          className="w-full px-2 py-1 border border-gray-300 rounded text-sm focus:outline-none focus:ring-1 focus:ring-blue-500"
                          placeholder="비고"
                        />
                      </td>
                      <td className="px-4 py-3 border-b border-gray-200 text-center">
                        <button
                          type="button"
                          onClick={() => removeItem(item.id)}
                          disabled={items.length === 1}
                          className={`p-1 rounded cursor-pointer ${
                            items.length === 1
                              ? 'text-gray-300 cursor-not-allowed'
                              : 'text-red-600 hover:text-red-800 hover:bg-red-50'
                          }`}
                          title="품목 삭제"
                        >
                          <i className="ri-delete-bin-line"></i>
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>

            {/* 총합 표시 */}
            <div className="mt-4 flex justify-end">
              <div className="bg-gray-50 rounded-lg p-4 min-w-64">
                <div className="flex items-center justify-between">
                  <span className="text-sm font-medium text-gray-700">총 발주 금액:</span>
                  <span className="text-lg font-bold text-gray-900">
                    ₩{calculateGrandTotal().toLocaleString()}
                  </span>
                </div>
                <div className="flex items-center justify-between mt-1">
                  <span className="text-xs text-gray-500">총 품목 수:</span>
                  <span className="text-sm text-gray-700">{items.length}개</span>
                </div>
              </div>
            </div>
          </div>

          {/* 추가 정보 */}
          <div className="p-6 border-b border-gray-200">
            <h2 className="text-lg font-semibold text-gray-900 mb-4">추가 정보</h2>
            <div className="grid grid-cols-1 gap-6">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  특별 지시사항
                </label>
                <textarea
                  value={orderData.specialInstructions}
                  onChange={(e) => updateOrderData('specialInstructions', e.target.value)}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg text-sm focus:outline-none focus:ring-1 focus:ring-blue-500"
                  rows={3}
                  placeholder="배송, 포장, 품질 등에 대한 특별 요구사항을 입력하세요"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">메모</label>
                <textarea
                  value={orderData.notes}
                  onChange={(e) => updateOrderData('notes', e.target.value)}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg text-sm focus:outline-none focus:ring-1 focus:ring-blue-500"
                  rows={3}
                  placeholder="내부 메모나 기타 참고사항을 입력하세요"
                />
              </div>
            </div>
          </div>

          {/* 버튼 */}
          <div className="px-6 py-4 flex items-center justify-end space-x-4">
            <button
              type="button"
              onClick={handleCancel}
              className="px-6 py-2 border border-gray-300 text-gray-700 font-medium rounded-lg hover:bg-gray-50 transition-colors duration-200 cursor-pointer whitespace-nowrap"
            >
              취소
            </button>
            <button
              type="button"
              className="px-6 py-2 border border-gray-300 text-gray-700 font-medium rounded-lg hover:bg-gray-50 transition-colors duration-200 cursor-pointer whitespace-nowrap"
            >
              임시저장
            </button>
            <button
              type="submit"
              className="px-6 py-2 bg-blue-600 text-white font-medium rounded-lg hover:bg-blue-700 transition-colors duration-200 cursor-pointer whitespace-nowrap"
            >
              발주서 작성 완료
            </button>
          </div>
        </form>
      </main>
    </div>
  );
}
