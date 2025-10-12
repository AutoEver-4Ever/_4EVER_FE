'use client';
import { SalesOrderDetailProps } from '@/app/sales/types/SalesOrderDetailType';
import { useState } from 'react';
import { SalesOrder } from '../types/SalesOrderType';

const SalesOrderDetailModal = ({
  $showOrderDetailModal,
  $setShowOrderDetailModal,
  $selectedOrderId,
  $getStatusColor,
  $getStatusText,
}: SalesOrderDetailProps) => {
  const [mockOrder] = useState<SalesOrder>({
    id: 'SO-2024-001',
    customer: '(주)테크솔루션',
    contact: '김영수',
    phone: '02-1234-5678',
    email: 'techsolution@company.com',
    address: '서울시 강남구 테헤란로 123',
    orderDate: '2024-01-15',
    deliveryDate: '2024-01-25',
    amount: '₩15,500,000',
    status: 'production',
    priority: 'high',
    items: [
      {
        name: '산업용 모터 5HP',
        quantity: 5,
        unitPrice: 850000,
        totalPrice: 4250000,
      },
      {
        name: '제어판넬',
        quantity: 2,
        unitPrice: 1200000,
        totalPrice: 2400000,
      },
    ],
    notes: '긴급 주문 - 우선 처리 요청',
    paymentMethod: '월말 정산',
    deliveryAddress: '경기도 성남시 분당구 판교역로 166',
  });

  return (
    <>
      {/* 주문 상세 보기 모달 */}
      {$showOrderDetailModal && mockOrder && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50">
          <div className="bg-white rounded-lg shadow-xl max-w-4xl w-full mx-4 max-h-[90vh] overflow-y-auto">
            {/* 모달 헤더 */}
            <div className="flex items-center justify-between p-6 border-b border-gray-200">
              <h2 className="text-xl font-semibold text-gray-900">주문 상세정보</h2>
              <button
                onClick={() => $setShowOrderDetailModal(false)}
                className="text-gray-400 hover:text-gray-600 w-6 h-6 flex items-center justify-center"
              >
                <i className="ri-close-line text-xl"></i>
              </button>
            </div>

            {/* 모달 내용 */}
            <div className="p-6">
              {/* 기본 정보 */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
                <div>
                  <h3 className="text-lg font-medium text-gray-900 mb-4">주문 정보</h3>
                  <div className="space-y-3">
                    <div>
                      <label className="text-sm font-medium text-gray-500">주문번호</label>
                      <p className="text-sm text-gray-900">{mockOrder.id}</p>
                    </div>
                    <div>
                      <label className="text-sm font-medium text-gray-500">주문일</label>
                      <p className="text-sm text-gray-900">{mockOrder.orderDate}</p>
                    </div>
                    <div>
                      <label className="text-sm font-medium text-gray-500">납기일</label>
                      <p className="text-sm text-gray-900">{mockOrder.deliveryDate}</p>
                    </div>
                    <div>
                      <label className="text-sm font-medium text-gray-500">상태</label>
                      <span
                        className={`inline-block px-2 py-1 text-xs font-medium rounded-full ${$getStatusColor(
                          mockOrder.status,
                        )}`}
                      >
                        {$getStatusText(mockOrder.status)}
                      </span>
                    </div>
                    <div>
                      <label className="text-sm font-medium text-gray-500">결제방법</label>
                      <p className="text-sm text-gray-900">{mockOrder.paymentMethod}</p>
                    </div>
                  </div>
                </div>

                <div>
                  <h3 className="text-lg font-medium text-gray-900 mb-4">고객 정보</h3>
                  <div className="space-y-3">
                    <div>
                      <label className="text-sm font-medium text-gray-500">회사명</label>
                      <p className="text-sm text-gray-900">{mockOrder.customer}</p>
                    </div>
                    <div>
                      <label className="text-sm font-medium text-gray-500">담당자</label>
                      <p className="text-sm text-gray-900">{mockOrder.contact}</p>
                    </div>
                    <div>
                      <label className="text-sm font-medium text-gray-500">연락처</label>
                      <p className="text-sm text-gray-900">{mockOrder.phone}</p>
                    </div>
                    <div>
                      <label className="text-sm font-medium text-gray-500">이메일</label>
                      <p className="text-sm text-gray-900">{mockOrder.email}</p>
                    </div>
                    <div>
                      <label className="text-sm font-medium text-gray-500">주소</label>
                      <p className="text-sm text-gray-900">{mockOrder.address}</p>
                    </div>
                  </div>
                </div>
              </div>

              {/* 배송 정보 */}
              <div className="mb-8">
                <h3 className="text-lg font-medium text-gray-900 mb-4">배송 정보</h3>
                <div>
                  <label className="text-sm font-medium text-gray-500">배송지 주소</label>
                  <p className="text-sm text-gray-900">{mockOrder.deliveryAddress}</p>
                </div>
              </div>

              {/* 주문 품목 */}
              <div className="mb-8">
                <h3 className="text-lg font-medium text-gray-900 mb-4">주문 품목</h3>
                <div className="overflow-x-auto">
                  <table className="w-full border border-gray-200 rounded-lg">
                    <thead className="bg-gray-50">
                      <tr>
                        <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase">
                          제품명
                        </th>
                        <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase">
                          수량
                        </th>
                        <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase">
                          단가
                        </th>
                        <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase">
                          금액
                        </th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-gray-200">
                      {mockOrder.items.map((item, index) => (
                        <tr key={`${item.name}-${index}`}>
                          <td className="px-4 py-3 text-sm text-gray-900">{item.name}</td>
                          <td className="px-4 py-3 text-sm text-gray-900">
                            {item.quantity.toLocaleString()}개
                          </td>
                          <td className="px-4 py-3 text-sm text-gray-900">
                            ₩{item.unitPrice.toLocaleString()}
                          </td>
                          <td className="px-4 py-3 text-sm font-medium text-gray-900">
                            ₩{item.totalPrice.toLocaleString()}
                          </td>
                        </tr>
                      ))}
                    </tbody>
                    <tfoot className="bg-gray-50">
                      <tr>
                        <td
                          colSpan={3}
                          className="px-4 py-3 text-sm font-medium text-gray-900 text-right"
                        >
                          총 주문금액
                        </td>
                        <td className="px-4 py-3 text-sm font-bold text-gray-900">
                          {mockOrder.amount}
                        </td>
                      </tr>
                    </tfoot>
                  </table>
                </div>
              </div>

              {/* 특이사항 */}
              {mockOrder.notes && (
                <div className="mb-6">
                  <h3 className="text-lg font-medium text-gray-900 mb-4">특이사항</h3>
                  <div className="bg-gray-50 rounded-lg p-4">
                    <p className="text-sm text-gray-700">{mockOrder.notes}</p>
                  </div>
                </div>
              )}
            </div>

            {/* 모달 푸터 */}
            <div className="flex justify-end space-x-3 p-6 border-t border-gray-200">
              <button
                onClick={() => $setShowOrderDetailModal(false)}
                className="px-4 py-2 text-sm font-medium text-gray-700 bg-white border border-gray-300 rounded-lg hover:bg-gray-50 whitespace-nowrap cursor-pointer"
              >
                닫기
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default SalesOrderDetailModal;
