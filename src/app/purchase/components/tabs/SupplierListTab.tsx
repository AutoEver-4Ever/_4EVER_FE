'use client';

import { useState } from 'react';
import { useQuery } from '@tanstack/react-query';
import SupplierAddModal from '@/app/purchase/components/modals/SupplierAddModal';
import SupplierDetailModal from '@/app/purchase/components/modals/SupplierDetailModal';
import { SupplierListResponse, SupplierResponse } from '@/app/purchase/types/SupplierType';
import IconButton from '@/app/components/common/IconButton';
import { fetchSupplierList } from '@/app/purchase/api/purchase.api';
import Dropdown from '@/app/components/common/Dropdown';
import {
  SupplierStatus,
  SUPPLIER_CATEGORY_ITEMS,
  SUPPLIER_STATUS_ITEMS,
  SupplierCategory,
} from '@/app/purchase/constants';

export default function SupplierListTab() {
  const [showAddSupplierModal, setShowAddSupplierModal] = useState(false);
  const [showSupplierDetailModal, setShowSupplierDetailModal] = useState(false);

  const [selectedSupplierId, setSelectedSupplierId] = useState<number>(-1);
  const [selectedCategory, setSelectedCategory] = useState<string>('');
  const [selectedSupplierStatus, setSelectedSupplierStatus] = useState<string>('');

  const [currentPage, setCurrentPage] = useState(0);
  const [pageSize] = useState(10);

  const categories = ['전체', '철강/금속', '화학/소재', '전자부품', '기계부품', '포장재', '소모품'];

  // React Query로 데이터 가져오기 - 쿼리 파라미터 전달
  const {
    data: supplierData,
    isLoading,
    isError,
    error,
    refetch,
  } = useQuery<SupplierListResponse>({
    queryKey: ['suppliers', currentPage, pageSize, selectedCategory, selectedSupplierStatus],
    queryFn: () =>
      fetchSupplierList({
        page: currentPage,
        size: pageSize,
        category: selectedCategory || undefined,
        status: selectedSupplierStatus || undefined,
      }),
  });

  const suppliers = supplierData?.content || [];
  const pageInfo = supplierData?.page;
  const isFirstPage = currentPage === 0; // 0부터 시작이면
  const isLastPage = pageInfo ? currentPage === pageInfo.totalPages - 1 : true;

  const handelSupplierStatusChange = (status: SupplierStatus) => {
    setSelectedSupplierStatus(status);
    setCurrentPage(0);
  };

  const handleSupplierCategoryChange = (category: SupplierCategory) => {
    setSelectedCategory(category);
    setCurrentPage(0); // 첫 페이지로
  };

  const handlePageChange = (page: number): void => {
    setCurrentPage(page);
  };

  const handlePrevPage = (): void => {
    if (pageInfo && currentPage > 0) {
      setCurrentPage(currentPage - 1);
    }
  };

  const handleNextPage = (): void => {
    if (pageInfo && currentPage < pageInfo.totalPages - 1) {
      setCurrentPage(currentPage + 1);
    }
  };

  const handleViewDetail = (supplier: SupplierResponse) => {
    setSelectedSupplierId(supplier.vendorId);
    setShowSupplierDetailModal(true);
  };

  const handleCloseDetail = () => {
    setShowSupplierDetailModal(false);
    setSelectedSupplierId(-1);
  };

  const handleAddSupplier = async (newSupplierData: Partial<SupplierResponse>) => {
    // TODO: 실제 API 호출로 공급업체 등록
    // await createSupplier(newSupplierData);

    setShowAddSupplierModal(false);
    refetch();
    alert('공급업체가 성공적으로 등록되었습니다.');
  };

  const getStatusBadge = (status: string) => {
    const baseClasses = 'px-2 py-1 rounded-full text-xs font-medium';
    if (status === 'ACTIVE') {
      return `${baseClasses} bg-green-100 text-green-800`;
    }
    return `${baseClasses} bg-red-100 text-red-800`;
  };
  const getStatusText = (status: string) => (status === 'ACTIVE' ? '활성' : '비활성');

  const getSatusValue = (): string => {
    const item = SUPPLIER_STATUS_ITEMS.find((s) => s.key === selectedSupplierStatus);
    return item?.value || '전체';
  };

  const getCategoryValue = (): string => {
    const item = SUPPLIER_CATEGORY_ITEMS.find((s) => s.key === selectedCategory);
    return item?.value || '전체';
  };

  // 로딩 상태
  if (isLoading) {
    return (
      <div className="bg-white rounded-lg shadow p-8">
        <div className="flex items-center justify-center">
          <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-600"></div>
          <span className="ml-3 text-gray-600">데이터를 불러오는 중...</span>
        </div>
      </div>
    );
  }

  // 에러 상태
  if (isError) {
    return (
      <div className="bg-white rounded-lg shadow p-8">
        <div className="text-center">
          <i className="ri-error-warning-line text-4xl text-red-500 mb-4"></i>
          <p className="text-gray-600 mb-4">데이터를 불러오는데 실패했습니다.</p>
          <p className="text-sm text-gray-500 mb-4">{error?.message}</p>
          <button
            onClick={() => refetch()}
            className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700"
          >
            다시 시도
          </button>
        </div>
      </div>
    );
  }

  return (
    <>
      <div className="bg-white rounded-lg shadow">
        <div className="p-6 border-b border-gray-200">
          <div className="flex justify-between items-center">
            <h3 className="text-lg font-semibold text-gray-900">공급업체 목록</h3>
            <div className="flex items-center space-x-4">
              {/* 공급업체 카테고리 드롭다운 */}
              <Dropdown
                label={getCategoryValue()}
                items={SUPPLIER_CATEGORY_ITEMS}
                onChange={handleSupplierCategoryChange}
              />
              {/* 공급업체 상태 드롭다운 */}
              <Dropdown
                label={getSatusValue()}
                items={SUPPLIER_STATUS_ITEMS}
                onChange={handelSupplierStatusChange}
              />
              <IconButton icon="ri-add-line" onClick={() => setShowAddSupplierModal(true)}>
                공급업체 등록
              </IconButton>
            </div>
          </div>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full">
            <thead className="bg-gray-50">
              <tr className="text-center">
                <th className="px-6 py-3 text-xs font-medium text-gray-500 uppercase tracking-wider">
                  공급업체 코드
                </th>
                <th className="px-6 py-3 text-xs font-medium text-gray-500 uppercase tracking-wider">
                  업체명
                </th>
                <th className="px-6 py-3 text-xs font-medium text-gray-500 uppercase tracking-wider">
                  연락처
                </th>
                <th className="px-6 py-3 text-xs font-medium text-gray-500 uppercase tracking-wider">
                  카테고리
                </th>
                <th className="px-6 py-3 text-xs font-medium text-gray-500 uppercase tracking-wider">
                  배송 기간
                </th>
                <th className="px-6 py-3 text-xs font-medium text-gray-500 uppercase tracking-wider">
                  상태
                </th>
                <th className="px-6 py-3 text-xs font-medium text-gray-500 uppercase tracking-wider">
                  작업
                </th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {suppliers.map((supplier) => (
                <tr key={supplier.vendorId} className="hover:bg-gray-50 text-center">
                  <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                    {supplier.vendorCode}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                    {supplier.companyName}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                    <div>
                      <div>{supplier.managerPhone}</div>
                      <div className="text-xs text-gray-400">{supplier.managerEmail}</div>
                    </div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                    {supplier.category}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                    {supplier.leadTimeDays}일
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <span className={getStatusBadge(supplier.statusCode)}>
                      {getStatusText(supplier.statusCode)}
                    </span>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                    <div className="flex space-x-2">
                      <button
                        onClick={() => handleViewDetail(supplier)}
                        className="w-8 h-8 flex items-center justify-center text-blue-500 hover:bg-blue-50 rounded cursor-pointer"
                        title="상세보기"
                      >
                        <i className="ri-eye-line"></i>
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
              {suppliers.length === 0 && (
                <tr>
                  <td colSpan={7} className="px-6 py-8 text-center text-gray-500 text-sm">
                    공급업체가 없습니다.
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>

        {/* 페이지네이션 */}
        {pageInfo && (
          <div className="p-6 flex items-center justify-between border-t border-gray-200">
            <div className="text-sm text-gray-600">
              총 {pageInfo.totalElements}건 ({pageInfo.size * currentPage + 1}-
              {Math.min(pageInfo.size * (currentPage + 1), pageInfo.totalElements)} 표시)
            </div>
            <div className="flex items-center space-x-2">
              <button
                onClick={handlePrevPage}
                disabled={isFirstPage}
                className={`px-3 py-1 border border-gray-300 rounded-lg text-sm ${
                  isFirstPage
                    ? 'text-gray-400 bg-gray-50 cursor-not-allowed'
                    : 'text-gray-700 hover:bg-gray-100'
                }`}
              >
                이전
              </button>

              {Array.from({ length: pageInfo.totalPages }, (_, i) => i).map((page) => (
                <button
                  key={page}
                  onClick={() => handlePageChange(page)}
                  className={`px-3 py-1 rounded-lg text-sm font-medium ${
                    currentPage === page
                      ? 'bg-blue-600 text-white'
                      : 'border border-gray-300 text-gray-700 hover:bg-gray-100'
                  }`}
                >
                  {page + 1}
                </button>
              ))}

              <button
                onClick={handleNextPage}
                disabled={isLastPage}
                className={`px-3 py-1 border border-gray-300 rounded-lg text-sm ${
                  isLastPage
                    ? 'text-gray-400 bg-gray-50 cursor-not-allowed'
                    : 'text-gray-700 hover:bg-gray-100'
                }`}
              >
                다음
              </button>
            </div>
          </div>
        )}
      </div>

      {showAddSupplierModal && (
        <SupplierAddModal
          onClose={() => setShowAddSupplierModal(false)}
          onAddSupplier={handleAddSupplier}
          categories={categories}
        />
      )}

      {showSupplierDetailModal && (
        <SupplierDetailModal vendorId={selectedSupplierId} onClose={handleCloseDetail} />
      )}
    </>
  );
}
