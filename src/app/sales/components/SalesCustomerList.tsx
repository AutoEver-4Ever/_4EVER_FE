'use client';

import { useMemo, useState } from 'react';
import CustomerDetailModal from '@/app/sales/components/CustomerDetailModal';
import NewCustomerModal from '@/app/sales/components/NewCustomerModal';
import { CustomerQueryParams } from '@/app/sales/types/SalesCustomerListType';
import CustomerEditModal from './CustomerEditModal';
import { useQuery } from '@tanstack/react-query';
import { getCustomerList } from '../service';
import { useDebounce } from 'use-debounce';
import { CustomerDetail } from '../types/SalesCustomerDetailType';
const CustomerList = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [statusFilter, setStatusFilter] = useState<'ALL' | 'ACTIVE' | 'DEACTIVE'>('ALL');
  const [showDetailModal, setShowDetailModal] = useState(false);
  const [selectedCustomerId, setSelectedCustomerId] = useState<number>(0);
  const [showCustomerModal, setShowCustomerModal] = useState(false);
  const [debouncedSearchTerm] = useDebounce(searchTerm, 200);

  const handleCustomerRegisterClick = () => {
    setShowCustomerModal(true);
  };

  const getStatusColor = (status: string) => {
    return status === '활성' ? 'bg-green-100 text-green-800' : 'bg-gray-100 text-gray-800';
  };

  const queryParams = useMemo(
    () => ({
      page: 0,
      size: 10,
      status: statusFilter || 'ALL',
      keyword: debouncedSearchTerm || '',
    }),
    [statusFilter, debouncedSearchTerm],
  );
  const {
    data: customerRes,
    isLoading,
    isError,
  } = useQuery({
    queryKey: ['customerList', queryParams],
    queryFn: ({ queryKey }) => getCustomerList(queryKey[1] as CustomerQueryParams),
  });

  const customers = customerRes?.data ?? [];
  const pageInfo = customerRes?.pageData;

  const handleViewClick = (id: number) => {
    setSelectedCustomerId(id);
    setShowDetailModal(true);
  };

  const [showEditModal, setShowEditModal] = useState(false);
  const [editFormData, setEditFormData] = useState<CustomerDetail | null>(null);
  const handleEditClick = (customer: CustomerDetail) => {
    setEditFormData({ ...customer });
    setShowEditModal(true);
  };
  return (
    <div className="bg-white rounded-lg border border-gray-200 mt-6">
      {/* 헤더 */}
      <div className="p-6 border-b border-gray-200">
        <div className="flex items-center justify-between mb-4">
          <h2 className="text-lg font-semibold text-gray-900">고객 관리</h2>
          <button
            onClick={handleCustomerRegisterClick}
            className="px-4 py-2 bg-[#2563EB] text-white font-medium rounded-lg hover:bg-blue-600 transition-colors duration-200 cursor-pointer whitespace-nowrap flex items-center space-x-2"
          >
            <i className="ri-user-add-line"></i>
            <span>고객 등록</span>
          </button>
        </div>

        {/* 필터 및 검색 */}
        <div className="flex flex-col sm:flex-row space-y-3 sm:space-y-0 sm:space-x-4">
          <div className="flex-1 max-w-md">
            <div className="relative">
              <i className="ri-search-line absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400"></i>
              <input
                type="text"
                placeholder="고객명, 담당자명, 고객코드로 검색..."
                value={searchTerm}
                onChange={(e: React.ChangeEvent<HTMLInputElement>) => setSearchTerm(e.target.value)}
                className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent text-sm"
              />
            </div>
          </div>
          <div className="flex items-center space-x-2">
            <select
              value={statusFilter}
              onChange={(e) => setStatusFilter(e.target.value as 'ALL' | 'ACTIVE' | 'DEACTIVE')}
              className="px-3 py-2 border border-gray-300 rounded-lg text-sm focus:ring-2 focus:ring-blue-500"
            >
              <option value="ALL">전체</option>
              <option value="ACTIVE">활성</option>
              <option value="DEACTIVE">비활성</option>
            </select>
          </div>
        </div>
      </div>

      {/* 테이블 */}
      <div className="overflow-x-auto">
        {isError ? (
          <div className="flex flex-col items-center justify-center h-64 space-y-3 text-red-600">
            <i className="ri-error-warning-line text-4xl" />
            <p className="font-medium">고객 목록을 불러오는 중 오류가 발생했습니다.</p>
          </div>
        ) : isLoading ? (
          <div className="flex flex-col items-center justify-center h-64 space-y-3">
            <div className="w-10 h-10 border-4 border-blue-500 border-t-transparent rounded-full animate-spin" />
            <p className="text-gray-600 text-sm font-medium">고객 목록을 불러오는 중입니다...</p>
          </div>
        ) : (
          <table className="w-full">
            <thead className="bg-gray-50">
              <tr>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  고객정보
                </th>

                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  연락처
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  주소
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  거래실적
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
              {customers.map((customer) => (
                <tr key={customer.customerId} className="hover:bg-gray-50">
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="flex items-center">
                      <div>
                        <div className="text-sm font-medium text-gray-900">
                          {customer.companyName}
                        </div>
                        <div className="text-xs text-gray-500">{customer.customerCode}</div>
                      </div>
                    </div>
                  </td>

                  <td className="px-6 py-4">
                    <div className="text-sm text-gray-900">{customer.contactPerson}</div>
                    <div className="text-xs text-gray-500">{customer.phone}</div>
                    <div className="text-xs text-gray-500">{customer.email}</div>
                  </td>
                  <td className="px-6 py-4">
                    <div className="text-sm text-gray-900 max-w-xs truncate">
                      {customer.address}
                    </div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="text-sm font-medium text-gray-900">
                      {customer.transactionAmount}
                    </div>
                    <div className="text-xs text-gray-500">{customer.orderCount}건</div>
                  </td>

                  <td className="px-6 py-4 whitespace-nowrap">
                    <span
                      className={`inline-flex px-2 py-1 text-xs font-semibold rounded-full ${getStatusColor(customer.status)}`}
                    >
                      {customer.status}
                    </span>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                    <div className="flex items-center space-x-2">
                      <button
                        onClick={() => handleViewClick(customer.customerId)}
                        className="text-blue-600 hover:text-blue-800 cursor-pointer"
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
        )}
      </div>

      {/* 페이지네이션 */}
      {isError || isLoading ? null : (
        <div className="px-6 py-4 border-t border-gray-200">
          <div className="flex items-center justify-between">
            <div className="text-sm text-gray-700">
              총 <span className="font-medium">{pageInfo?.totalElements}</span>명의 고객
            </div>
            <div className="flex items-center space-x-2">
              <button className="px-3 py-1 border border-gray-300 rounded-md text-sm text-gray-700 hover:bg-gray-50 cursor-pointer">
                이전
              </button>
              {Array.from({ length: pageInfo?.totalPages || 1 }, (_, index) => (
                <button
                  key={index}
                  className={`px-3 py-1 rounded-md text-sm cursor-pointer ${
                    pageInfo?.number === index
                      ? 'bg-blue-600 text-white'
                      : 'border border-gray-300 text-gray-700 hover:bg-gray-50'
                  }`}
                >
                  {index + 1}
                </button>
              ))}

              <button
                disabled={pageInfo?.hasNext}
                className={`px-3 py-1 border rounded-md text-sm transition-colors ${
                  !pageInfo?.hasNext
                    ? 'bg-gray-100 text-gray-400 cursor-not-allowed border-gray-200'
                    : 'border-gray-300 text-gray-700 hover:bg-gray-50 cursor-pointer'
                }`}
                // className="px-3 py-1 border border-gray-300 rounded-md text-sm text-gray-700 hover:bg-gray-50 cursor-pointer"
              >
                다음
              </button>
            </div>
          </div>
        </div>
      )}

      {/* 고객 상세보기 모달 */}
      <CustomerDetailModal
        $showDetailModal={showDetailModal}
        $setShowDetailModal={setShowDetailModal}
        $selectedCustomerId={selectedCustomerId}
        $getStatusColor={getStatusColor}
        $setShowEditModal={setShowEditModal}
        $setEditFormData={setEditFormData}
      />

      {/* 고객 수정 모달 */}
      <CustomerEditModal
        $showEditModal={showEditModal}
        $setShowEditModal={setShowEditModal}
        $editFormData={editFormData}
        $setEditFormData={setEditFormData}
        $setShowDetailModal={setShowDetailModal}
      />
      {/* 신규 고객 추가 모달 */}
      <NewCustomerModal
        $showCustomerModal={showCustomerModal}
        $setShowCustomerModal={setShowCustomerModal}
      />
    </div>
  );
};

export default CustomerList;
