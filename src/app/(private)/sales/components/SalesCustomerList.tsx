'use client';

import { useMemo, useState } from 'react';
import CustomerDetailModal from '@/app/(private)/sales/components/CustomerDetailModal';
import NewCustomerModal from '@/app/(private)/sales/components/NewCustomerModal';
import { CustomerQueryParams } from '@/app/(private)/sales/types/SalesCustomerListType';
import CustomerEditModal from './CustomerEditModal';
import { useQuery } from '@tanstack/react-query';
import { getCustomerList } from '../service';
import { useDebounce } from 'use-debounce';
import { CustomerDetail } from '../types/SalesCustomerDetailType';
import TableError from '@/app/components/common/TableError';
import TableLoading from '@/app/components/common/TableLoading';

type statusType = 'ALL' | 'ACTIVE' | 'DEACTIVE';
const CustomerList = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [statusFilter, setStatusFilter] = useState<statusType>('ALL');
  const [showDetailModal, setShowDetailModal] = useState(false);
  const [selectedCustomerId, setSelectedCustomerId] = useState<number>(0);
  const [showCustomerModal, setShowCustomerModal] = useState(false);
  const [debouncedSearchTerm] = useDebounce(searchTerm, 200);
  const [currentPage, setCurrentPage] = useState(1);

  const handleCustomerRegisterClick = () => {
    setShowCustomerModal(true);
  };

  const getStatusColor = (status: string) => {
    return status === '활성' ? 'bg-green-100 text-green-800' : 'bg-gray-100 text-gray-800';
  };

  const queryParams = useMemo(
    () => ({
      page: currentPage - 1,
      size: 10,
      status: statusFilter || 'ALL',
      keyword: debouncedSearchTerm || '',
    }),
    [currentPage, statusFilter, debouncedSearchTerm],
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

  const totalPages = pageInfo?.totalPages ?? 1;

  const maxVisible = 5;

  const getPageRange = () => {
    const pages: (number | string)[] = [];

    if (totalPages <= maxVisible) {
      for (let i = 1; i <= totalPages; i++) pages.push(i);
    } else {
      const start = Math.max(1, currentPage - 2);
      const end = Math.min(totalPages, start + maxVisible - 1);

      if (start > 1) {
        pages.push(1);
        if (start > 2) pages.push('...');
      }

      for (let i = start; i <= end; i++) pages.push(i);

      if (end < totalPages) {
        if (end < totalPages - 1) pages.push('...');
        pages.push(totalPages);
      }
    }
    return pages;
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
              onChange={(e) => setStatusFilter(e.target.value as statusType)}
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
                  <div className="text-sm text-gray-900 max-w-xs truncate">{customer.address}</div>
                </td>
                <td className="px-6 py-4 whitespace-nowrap">
                  <div className="text-sm font-medium text-gray-900">
                    ₩{customer.transactionAmount.toLocaleString()}
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
        <TableError $isError={isError} $message="고객 목록을 불러오는 중 오류가 발생했습니다." />
        <TableLoading $isLoading={isLoading} $message="고객 목록을 불러오는 중입니다..." />
      </div>

      {/* 페이지네이션 */}
      {isError || isLoading ? null : (
        <div className="px-6 py-4 border-t border-gray-200">
          <div className="flex items-center justify-between">
            <div className="text-sm text-gray-700">
              총 <span className="font-medium">{pageInfo?.totalElements}</span>명의 고객
            </div>

            <div className="flex justify-center items-center space-x-2 mt-6">
              <button
                disabled={currentPage === 1}
                onClick={() => setCurrentPage((prev) => prev - 1)}
                className={`px-3 py-1 border rounded-md text-sm transition-colors ${
                  currentPage === 1
                    ? 'bg-gray-100 text-gray-400 cursor-not-allowed border-gray-200'
                    : 'border-gray-300 text-gray-700 hover:bg-gray-50 cursor-pointer'
                }`}
              >
                이전
              </button>

              {getPageRange().map((p, index) =>
                p === '...' ? (
                  <span key={index} className="px-2 text-gray-400">
                    ...
                  </span>
                ) : (
                  <button
                    key={index}
                    onClick={() => setCurrentPage(p as number)}
                    className={`px-3 py-1 rounded-md text-sm ${
                      currentPage === p
                        ? 'bg-blue-600 text-white'
                        : 'border border-gray-300 text-gray-700 hover:bg-gray-50 cursor-pointer'
                    }`}
                  >
                    {p}
                  </button>
                ),
              )}

              <button
                disabled={currentPage === totalPages}
                onClick={() => setCurrentPage((prev) => prev + 1)}
                className={`px-3 py-1 border rounded-md text-sm transition-colors ${
                  currentPage === totalPages
                    ? 'bg-gray-100 text-gray-400 cursor-not-allowed border-gray-200'
                    : 'border-gray-300 text-gray-700 hover:bg-gray-50 cursor-pointer'
                }`}
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
