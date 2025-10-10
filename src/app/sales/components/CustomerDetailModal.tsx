'use client';

import { CustomerDetailModalProps } from '@/app/sales/types/CustomerDetailModalType';

const CustomerDetailModal = ({
  $showDetailModal,
  $setShowDetailModal,
  $selectedCustomer,
  $getStatusColor,
  $handlePhoneClick,
  $handleEditClick,
}: CustomerDetailModalProps) => {
  return (
    <>
      {$showDetailModal && $selectedCustomer && (
        <div className="fixed inset-0  bg-black/50 flex items-center justify-center z-50">
          <div className="bg-white rounded-lg p-6 w-full max-w-4xl mx-4 max-h-[90vh] overflow-y-auto">
            <div className="flex items-center justify-between mb-6">
              <h3 className="text-xl font-semibold text-gray-900">고객 상세 정보</h3>
              <button
                onClick={() => $setShowDetailModal(false)}
                className="text-gray-400 hover:text-gray-600 cursor-pointer"
              >
                <i className="ri-close-line text-2xl"></i>
              </button>
            </div>

            <div className="space-y-6">
              {/* 기본 정보 */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="space-y-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">고객코드</label>
                    <div className="text-lg font-semibold text-gray-900">
                      {$selectedCustomer.id}
                    </div>
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">고객명</label>
                    <div className="text-gray-900">{$selectedCustomer.name}</div>
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      사업자번호
                    </label>
                    <div className="text-gray-900">{$selectedCustomer.details.businessNumber}</div>
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">대표이사</label>
                    <div className="text-gray-900">{$selectedCustomer.details.ceo}</div>
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">설립일</label>
                    <div className="text-gray-900">{$selectedCustomer.details.establishedDate}</div>
                  </div>
                </div>
                <div className="space-y-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">업종</label>
                    <div className="text-gray-900">{$selectedCustomer.details.industry}</div>
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">직원수</label>
                    <div className="text-gray-900">
                      {$selectedCustomer.details.employees.toLocaleString()}명
                    </div>
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">웹사이트</label>
                    <div className="text-blue-600 cursor-pointer hover:underline">
                      {$selectedCustomer.details.website}
                    </div>
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">상태</label>
                    <span
                      className={`px-2 py-1 rounded text-xs font-medium ${$getStatusColor($selectedCustomer.status)}`}
                    >
                      {$selectedCustomer.status}
                    </span>
                  </div>
                </div>
              </div>

              {/* 연락처 정보 */}
              <div className="border-t border-gray-200 pt-6">
                <h4 className="text-lg font-semibold text-gray-900 mb-4">연락처 정보</h4>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div className="space-y-4">
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">
                        대표전화
                      </label>
                      <div className="flex items-center space-x-2">
                        <span className="text-gray-900">{$selectedCustomer.phone}</span>
                        <button
                          onClick={() => $handlePhoneClick($selectedCustomer.phone)}
                          className="text-green-600 hover:text-green-500 cursor-pointer"
                          title="전화걸기"
                        >
                          <i className="ri-phone-line"></i>
                        </button>
                      </div>
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">팩스</label>
                      <div className="text-gray-900">{$selectedCustomer.details.fax}</div>
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">이메일</label>
                      <div className="text-blue-600">{$selectedCustomer.email}</div>
                    </div>
                  </div>
                  <div className="space-y-4">
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">주소</label>
                      <div className="text-gray-900">{$selectedCustomer.address}</div>
                    </div>
                  </div>
                </div>
              </div>

              {/* 담당자 정보 */}
              <div className="border-t border-gray-200 pt-6">
                <h4 className="text-lg font-semibold text-gray-900 mb-4">담당자 정보</h4>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div className="space-y-4">
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">
                        담당자명
                      </label>
                      <div className="text-gray-900">{$selectedCustomer.details.manager.name}</div>
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">직책</label>
                      <div className="text-gray-900">
                        {$selectedCustomer.details.manager.position}
                      </div>
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">부서</label>
                      <div className="text-gray-900">
                        {$selectedCustomer.details.manager.department}
                      </div>
                    </div>
                  </div>
                  <div className="space-y-4">
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">휴대폰</label>
                      <div className="flex items-center space-x-2">
                        <span className="text-gray-900">
                          {$selectedCustomer.details.manager.mobile}
                        </span>
                        <button
                          onClick={() =>
                            $handlePhoneClick($selectedCustomer.details.manager.mobile)
                          }
                          className="text-green-600 hover:text-green-500 cursor-pointer"
                          title="전화걸기"
                        >
                          <i className="ri-phone-line"></i>
                        </button>
                      </div>
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">
                        직통전화
                      </label>
                      <div className="flex items-center space-x-2">
                        <span className="text-gray-900">
                          {$selectedCustomer.details.manager.directPhone}
                        </span>
                        <button
                          onClick={() =>
                            $handlePhoneClick($selectedCustomer.details.manager.directPhone)
                          }
                          className="text-green-600 hover:text-green-500 cursor-pointer"
                          title="전화걸기"
                        >
                          <i className="ri-phone-line"></i>
                        </button>
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              {/* 거래 정보 */}
              <div className="border-t border-gray-200 pt-6">
                <h4 className="text-lg font-semibold text-gray-900 mb-4">거래 정보</h4>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div className="space-y-4">
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">
                        총 주문건수
                      </label>
                      <div className="text-gray-900">{$selectedCustomer.totalOrders}건</div>
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">
                        총 거래금액
                      </label>
                      <div className="text-green-600 font-semibold">
                        {$selectedCustomer.totalAmount}
                      </div>
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">
                        최근 주문일
                      </label>
                      <div className="text-gray-900">{$selectedCustomer.lastOrder}</div>
                    </div>
                  </div>
                  <div className="space-y-4">
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">
                        결제조건
                      </label>
                      <div className="text-gray-900">{$selectedCustomer.details.paymentTerms}</div>
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">
                        신용한도
                      </label>
                      <div className="text-gray-900">{$selectedCustomer.details.creditLimit}</div>
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">
                        과세유형
                      </label>
                      <div className="text-gray-900">{$selectedCustomer.details.taxType}</div>
                    </div>
                  </div>
                </div>
              </div>

              {/* 비고 */}
              <div className="border-t border-gray-200 pt-6">
                <label className="block text-sm font-medium text-gray-700 mb-1">비고</label>
                <div className="text-gray-900 bg-gray-50 p-3 rounded-lg">
                  {$selectedCustomer.details.notes}
                </div>
              </div>

              {/* 버튼 */}
              <div className="flex gap-3 pt-6 border-t border-gray-200">
                <button
                  onClick={() => $setShowDetailModal(false)}
                  className="flex-1 px-4 py-2 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 transition-colors font-medium cursor-pointer whitespace-nowrap"
                >
                  닫기
                </button>
                <button
                  onClick={() => {
                    $setShowDetailModal(false);
                    $handleEditClick($selectedCustomer);
                  }}
                  className="px-6 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors font-medium cursor-pointer whitespace-nowrap"
                >
                  수정
                </button>
                <button
                  onClick={() => $handlePhoneClick($selectedCustomer.phone)}
                  className="px-6 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 transition-colors font-medium cursor-pointer whitespace-nowrap"
                >
                  전화걸기
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default CustomerDetailModal;
