'use client';
import { OrderDetail, SalesOrderDetailProps } from '@/app/sales/types/SalesOrderDetailType';
import { useQuery } from '@tanstack/react-query';
import { useEffect, useState } from 'react';
import { getOrderDetail } from '@/app/sales/service';

const SalesOrderDetailModal = ({
  $showOrderDetailModal,
  $setShowOrderDetailModal,
  $selectedOrderId,
  $getStatusColor,
  $getStatusText,
}: SalesOrderDetailProps) => {
  const {
    data: orderDetailRes,
    isLoading,
    isError,
  } = useQuery<OrderDetail>({
    queryKey: ['orderDetail', $selectedOrderId],
    queryFn: () => getOrderDetail($selectedOrderId),
    enabled: !!$selectedOrderId && $showOrderDetailModal,
  });
  const [errorModal, setErrorModal] = useState(false);
  useEffect(() => {
    setErrorModal(isError);
    $setShowOrderDetailModal(false);
  }, [isError]);

  if (isLoading)
    return (
      <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50">
        <div className="bg-white rounded-lg p-6 w-96 text-center">
          <div className="w-10 h-10 border-4 border-blue-500 border-t-transparent rounded-full animate-spin mx-auto mb-4" />
          <p className="text-gray-600 text-sm font-medium">
            주문 상세 데이터를 불러오는 중입니다...
          </p>
        </div>
      </div>
    );

  if (errorModal)
    return (
      <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50">
        <div className="bg-white rounded-lg p-6 w-96 text-center text-red-600">
          <i className="ri-error-warning-line text-4xl mb-2" />
          <p className="font-medium">주문 상세 데이터를 불러오는 중 오류가 발생했습니다.</p>
          <button
            onClick={() => {
              setErrorModal(false);
            }}
            className="mt-4 px-4 py-2 bg-gray-200 text-gray-800 rounded-lg hover:bg-gray-300"
          >
            닫기
          </button>
        </div>
      </div>
    );

  const order = orderDetailRes?.order;
  const customer = orderDetailRes?.customer;
  const items = orderDetailRes?.items;

  return (
    <>
      {$showOrderDetailModal && (
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

            {orderDetailRes && (
              <>
                {/* 모달 내용 */}
                <div className="p-6">
                  {/* 기본 정보 */}
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
                    <div>
                      <h3 className="text-lg font-medium text-gray-900 mb-4">주문 정보</h3>
                      <div className="space-y-3">
                        <div>
                          <label className="text-sm font-medium text-gray-500">주문번호</label>
                          <p className="text-sm text-gray-900">{order?.soNumber}</p>
                        </div>
                        <div>
                          <label className="text-sm font-medium text-gray-500">주문일</label>
                          <p className="text-sm text-gray-900">{order?.orderDate}</p>
                        </div>
                        <div>
                          <label className="text-sm font-medium text-gray-500">납기일</label>
                          <p className="text-sm text-gray-900">{order?.deliveryDate}</p>
                        </div>
                        <div>
                          <label className="text-sm font-medium text-gray-500">상태</label>
                          <span
                            className={`inline-block px-2 py-1 text-xs font-medium rounded-full ${$getStatusColor(
                              order!.statusCode,
                            )}`}
                          >
                            {$getStatusText(order!.statusCode)}
                          </span>
                        </div>
                      </div>
                    </div>

                    <div>
                      <h3 className="text-lg font-medium text-gray-900 mb-4">고객 정보</h3>
                      <div className="space-y-3">
                        <div>
                          <label className="text-sm font-medium text-gray-500">회사명</label>
                          <p className="text-sm text-gray-900">{customer?.customerName}</p>
                        </div>
                        <div>
                          <label className="text-sm font-medium text-gray-500">담당자</label>
                          <p className="text-sm text-gray-900">{customer?.manager.name}</p>
                        </div>
                        <div>
                          <label className="text-sm font-medium text-gray-500">연락처</label>
                          <p className="text-sm text-gray-900">{customer?.manager.mobile}</p>
                        </div>
                        <div>
                          <label className="text-sm font-medium text-gray-500">이메일</label>
                          <p className="text-sm text-gray-900">{customer?.manager.email}</p>
                        </div>
                        <div>
                          <label className="text-sm font-medium text-gray-500">주소</label>
                          <p className="text-sm text-gray-900">{customer?.address}</p>
                        </div>
                      </div>
                    </div>
                  </div>

                  {/* 배송 정보 */}
                  <div className="mb-8">
                    <h3 className="text-lg font-medium text-gray-900 mb-4">배송 정보</h3>
                    <div>
                      <label className="text-sm font-medium text-gray-500">배송지 주소</label>
                      <p className="text-sm text-gray-900">{customer?.address}</p>
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
                          {items?.map((item, index) => (
                            <tr key={`${item.productName}-${index}`}>
                              <td className="px-4 py-3 text-sm text-gray-900">{item.unit}</td>
                              <td className="px-4 py-3 text-sm text-gray-900">
                                {item.quantity.toLocaleString()}개
                              </td>
                              <td className="px-4 py-3 text-sm text-gray-900">
                                ₩{item.unitPrice.toLocaleString()}
                              </td>
                              <td className="px-4 py-3 text-sm font-medium text-gray-900">
                                ₩{item.amount.toLocaleString()}
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
                              {order!.totalAmount}
                            </td>
                          </tr>
                        </tfoot>
                      </table>
                    </div>
                  </div>

                  {/* 특이사항 */}
                  {orderDetailRes!.note && (
                    <div className="mb-6">
                      <h3 className="text-lg font-medium text-gray-900 mb-4">특이사항</h3>
                      <div className="bg-gray-50 rounded-lg p-4">
                        <p className="text-sm text-gray-700">{orderDetailRes!.note}</p>
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
              </>
            )}
          </div>
        </div>
      )}
    </>
  );
};

export default SalesOrderDetailModal;
