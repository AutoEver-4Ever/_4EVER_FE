'use client';

import { useState } from 'react';
import SupplierAddModal from '@/app/purchase/components/modals/SupplierAddModal';
import SupplierDetailModal from '@/app/purchase/components/modals/SupplierDetailModal';
import { SupplierResponse } from '@/app/purchase/types/SupplierType';

export default function SupplierListTab() {
  const [showAddSupplierModal, setShowAddSupplierModal] = useState(false);
  const [isDetailModalOpen, setIsDetailModalOpen] = useState(false);
  const [selectedSupplier, setSelectedSupplier] = useState<SupplierResponse | null>(null);
  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage] = useState(5);
  const [selectedCategory, setSelectedCategory] = useState<'전체' | string>('전체');

  const categories = ['전체', '철강/금속', '화학/소재', '전자부품', '기계부품', '포장재', '소모품'];

  const initialSuppliers: SupplierResponse[] = [
    {
      id: 'SUP-001',
      name: '대한철강',
      category: '철강/금속',
      status: 'active',
      managerName: '김철수',
      managerPhone: '010-1234-5678',
      managerEmail: 'order@steel.co.kr',
      address: '서울시 강남구 테헤란로 123',
      deliveryDays: '7',
      materials: [
        { id: 'MAT-001', productName: '철근', spec: 'D16', unitPrice: '₩1,200' },
        { id: 'MAT-002', productName: '형강', spec: 'H-100', unitPrice: '₩15,000' },
      ],
    },
    {
      id: 'SUP-002',
      name: '한국알루미늄',
      category: '철강/금속',
      status: 'active',
      managerName: '이영희',
      managerPhone: '010-2345-6789',
      managerEmail: 'sales@aluminum.co.kr',
      address: '경기도 수원시 영통구 산업로 789',
      deliveryDays: '5',
      materials: [
        { id: 'MAT-003', productName: '알루미늄 판재', spec: '5T', unitPrice: '₩25,000' },
        { id: 'MAT-004', productName: '알루미늄 봉', spec: 'Φ20', unitPrice: '₩8,000' },
      ],
    },
    {
      id: 'SUP-003',
      name: '포스코',
      category: '철강/금속',
      status: 'active',
      managerName: '박민수',
      managerPhone: '010-3456-7890',
      managerEmail: 'order@posco.co.kr',
      address: '경북 포항시 남구 동해안로 6261',
      deliveryDays: '3',
      materials: [
        { id: 'MAT-005', productName: '후판', spec: '10T', unitPrice: '₩30,000' },
        { id: 'MAT-006', productName: '강판', spec: '3T', unitPrice: '₩12,000' },
      ],
    },
    {
      id: 'SUP-004',
      name: '케미칼솔루션',
      category: '화학/소재',
      status: 'active',
      managerName: '최지영',
      managerPhone: '010-4567-8901',
      managerEmail: 'info@chemical.co.kr',
      address: '인천시 남동구 논현로 456',
      deliveryDays: '10',
      materials: [
        { id: 'MAT-007', productName: '폴리에틸렌', spec: 'PE100', unitPrice: '₩2,500' },
        { id: 'MAT-008', productName: '폴리프로필렌', spec: 'PP50', unitPrice: '₩3,000' },
      ],
    },
    {
      id: 'SUP-005',
      name: '일렉트로닉스코리아',
      category: '전자부품',
      status: 'active',
      managerName: '정수진',
      managerPhone: '010-5678-9012',
      managerEmail: 'sales@electronics.co.kr',
      address: '경기도 성남시 분당구 판교로 123',
      deliveryDays: '7',
      materials: [
        { id: 'MAT-009', productName: '저항', spec: '10Ω', unitPrice: '₩50' },
        { id: 'MAT-010', productName: '콘덴서', spec: '100μF', unitPrice: '₩120' },
      ],
    },
    {
      id: 'SUP-006',
      name: '패스너코리아',
      category: '기계부품',
      status: 'active',
      managerName: '김영수',
      managerPhone: '010-6789-0123',
      managerEmail: 'order@fastener.co.kr',
      address: '경남 창원시 의창구 공단로 789',
      deliveryDays: '5',
      materials: [
        { id: 'MAT-011', productName: '볼트', spec: 'M10', unitPrice: '₩200' },
        { id: 'MAT-012', productName: '너트', spec: 'M10', unitPrice: '₩100' },
      ],
    },
    {
      id: 'SUP-007',
      name: '글로벌패키징',
      category: '포장재',
      status: 'active',
      managerName: '이하늘',
      managerPhone: '010-7890-1234',
      managerEmail: 'info@packaging.co.kr',
      address: '서울시 금천구 가산디지털로 456',
      deliveryDays: '3',
      materials: [
        { id: 'MAT-013', productName: '골판지', spec: 'A4', unitPrice: '₩500' },
        { id: 'MAT-014', productName: '포장용 테이프', spec: '48mm', unitPrice: '₩300' },
      ],
    },
    {
      id: 'SUP-008',
      name: '오피스서플라이',
      category: '소모품',
      status: 'active',
      managerName: '박지영',
      managerPhone: '010-8901-2345',
      managerEmail: 'sales@office.co.kr',
      address: '서울시 마포구 월드컵로 123',
      deliveryDays: '1',
      materials: [
        { id: 'MAT-015', productName: 'A4 용지', spec: '80g', unitPrice: '₩4,000' },
        { id: 'MAT-016', productName: '잉크 카트리지', spec: 'BK', unitPrice: '₩25,000' },
      ],
    },
    {
      id: 'SUP-009',
      name: '테크솔루션',
      category: '전자부품',
      status: 'inactive',
      managerName: '최민석',
      managerPhone: '010-9012-3456',
      managerEmail: 'tech@solution.co.kr',
      address: '경기도 안양시 동안구 시민대로 789',
      deliveryDays: '14',
      materials: [
        { id: 'MAT-017', productName: '마이크로컨트롤러', spec: 'STM32F103', unitPrice: '₩3,500' },
        { id: 'MAT-018', productName: '센서 모듈', spec: '온도/습도', unitPrice: '₩8,000' },
      ],
    },
    {
      id: 'SUP-010',
      name: '미래화학',
      category: '화학/소재',
      status: 'active',
      managerName: '김미래',
      managerPhone: '010-9876-5432',
      managerEmail: 'info@futurechem.co.kr',
      address: '경기도 화성시 동탄대로 100',
      deliveryDays: '5',
      materials: [{ id: 'MAT-019', productName: '레진', spec: 'Epoxy', unitPrice: '₩15,000' }],
    },
    {
      id: 'SUP-011',
      name: '정밀기계',
      category: '기계부품',
      status: 'active',
      managerName: '이정밀',
      managerPhone: '010-8765-4321',
      managerEmail: 'sales@precision.co.kr',
      address: '울산광역시 남구 산업로 200',
      deliveryDays: '1',
      materials: [{ id: 'MAT-020', productName: '베어링', spec: '608ZZ', unitPrice: '₩500' }],
    },
  ];

  const [allSuppliers, setAllSuppliers] = useState<SupplierResponse[]>(initialSuppliers);

  // **필터링 로직**
  const filteredSuppliers = allSuppliers.filter((supplier) => {
    return selectedCategory === '전체' || supplier.category === selectedCategory;
  });

  const handleCategoryChange = (category: string) => {
    setSelectedCategory(category);
    setCurrentPage(1); // 카테고리 변경 시 1페이지로 리셋
  };

  // **페이지네이션 로직**
  const totalPages = Math.ceil(filteredSuppliers.length / itemsPerPage);
  const startIndex = (currentPage - 1) * itemsPerPage;
  const endIndex = startIndex + itemsPerPage;
  const currentSuppliers = filteredSuppliers.slice(startIndex, endIndex);

  const handlePageChange = (page: number): void => {
    setCurrentPage(page);
  };

  const handlePrevPage = (): void => {
    if (currentPage > 1) {
      setCurrentPage(currentPage - 1);
    }
  };

  const handleNextPage = (): void => {
    if (currentPage < totalPages) {
      setCurrentPage(currentPage + 1);
    }
  };

  // **이하 기존 로직 유지 및 수정**

  const handleViewDetail = (supplier: SupplierResponse) => {
    setSelectedSupplier(supplier);
    setIsDetailModalOpen(true);
  };

  const handleCloseDetail = () => {
    setIsDetailModalOpen(false);
    setSelectedSupplier(null);
  };

  const handleAddSupplier = (newSupplierData: Partial<SupplierResponse>) => {
    const id = `SUP-${String(allSuppliers.length + 1).padStart(3, '0')}`;
    const supplier: SupplierResponse = {
      id,
      // newSupplierData의 속성을 사용하고, 없는 경우 기본값을 설정하여 타입 불일치 방지
      name: newSupplierData.name || '미정',
      category: newSupplierData.category || '기타',
      managerName: newSupplierData.managerName || '미정',
      managerPhone: newSupplierData.managerPhone || '미정',
      managerEmail: newSupplierData.managerEmail || '미정',
      address: newSupplierData.address || '미정',
      deliveryDays: newSupplierData.deliveryDays || '0',
      // 필수 필드는 기본값 설정
      status: 'active',
      materials: [],
    };
    setAllSuppliers([...allSuppliers, supplier]);
    setShowAddSupplierModal(false);
    alert('공급업체가 성공적으로 등록되었습니다.');
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

  return (
    <>
      <div className="bg-white rounded-lg shadow">
        <div className="p-6 border-b border-gray-200">
          <div className="flex justify-between items-center">
            <h3 className="text-lg font-semibold text-gray-900">공급업체 목록</h3>
            <div className="flex items-center space-x-4">
              {/* 카테고리 필터 섹션 */}
              <select
                value={selectedCategory}
                onChange={(e) => handleCategoryChange(e.target.value)}
                className="px-3 py-2 border border-gray-300 rounded-lg text-sm cursor-pointer"
              >
                {categories.map((category) => (
                  <option key={category} value={category}>
                    {category}
                  </option>
                ))}
              </select>

              <button
                onClick={() => setShowAddSupplierModal(true)}
                className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition-colors whitespace-nowrap cursor-pointer"
              >
                <i className="ri-add-line mr-2"></i>
                신규 등록
              </button>
            </div>
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
              {currentSuppliers.map((supplier) => (
                <tr key={supplier.id} className="hover:bg-gray-50">
                  <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                    {supplier.id}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                    {supplier.name}
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
                    {supplier.deliveryDays}일
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
                        className="w-8 h-8 flex items-center justify-center text-blue-500 hover:bg-blue-50 rounded cursor-pointer"
                        title="상세보기"
                      >
                        <i className="ri-eye-line"></i>
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
              {currentSuppliers.length === 0 && (
                <tr>
                  <td colSpan={7} className="px-6 py-8 text-center text-gray-500 text-sm">
                    선택하신 카테고리에 해당하는 공급업체가 없습니다.
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>

        {/* 페이지네이션 섹션 */}
        <div className="p-6 flex items-center justify-between border-t border-gray-200">
          <div className="text-sm text-gray-600">
            총 {filteredSuppliers.length}건 ({startIndex + 1}-
            {Math.min(endIndex, filteredSuppliers.length)} 표시)
          </div>
          <div className="flex items-center space-x-2">
            <button
              onClick={handlePrevPage}
              disabled={currentPage === 1}
              className={`px-3 py-1 border border-gray-300 rounded-lg text-sm ${
                currentPage === 1
                  ? 'text-gray-400 bg-gray-50 cursor-not-allowed'
                  : 'text-gray-700 hover:bg-gray-100'
              }`}
            >
              이전
            </button>

            {Array.from({ length: totalPages }, (_, i) => i + 1).map((page) => (
              <button
                key={page}
                onClick={() => handlePageChange(page)}
                className={`px-3 py-1 rounded-lg text-sm font-medium ${
                  currentPage === page
                    ? 'bg-blue-600 text-white'
                    : 'border border-gray-300 text-gray-700 hover:bg-gray-100'
                }`}
              >
                {page}
              </button>
            ))}

            <button
              onClick={handleNextPage}
              disabled={currentPage === totalPages}
              className={`px-3 py-1 border border-gray-300 rounded-lg text-sm ${
                currentPage === totalPages
                  ? 'text-gray-400 bg-gray-50 cursor-not-allowed'
                  : 'text-gray-700 hover:bg-gray-100'
              }`}
            >
              다음
            </button>
          </div>
        </div>
      </div>

      {/* 공급업체 신규 등록 모달 */}
      <SupplierAddModal
        isOpen={showAddSupplierModal}
        onClose={() => setShowAddSupplierModal(false)}
        onAddSupplier={handleAddSupplier}
        categories={categories.slice(1)} // '전체' 제외하고 전달
      />

      {/* 공급업체 상세 정보 모달 */}
      <SupplierDetailModal
        isOpen={isDetailModalOpen}
        supplier={selectedSupplier}
        onClose={handleCloseDetail}
      />
    </>
  );
}
