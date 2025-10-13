'use client';

import { useState } from 'react';
import SupplierAddModal from '@/app/purchase/components/modals/SupplierAddModal';
import SupplierDetailModal from '@/app/purchase/components/modals/SupplierDetailModal';
import { SupplierResponse } from '@/app/purchase/types/SupplierType';

// 업체명
// 카테고리
// 담당자명
// 전화번호
// 이메일
// 배송기간(일) - 0을 입력하면 당일 배송 가능
// 주소
// 제공가능한 자재목록 - 리스트로 자재추가 버튼 누르면 추가되도록
// 입력 요소: 자재명 | 단위 | 단가 | 작업 리스트로

interface Supplier {
  id: string;
  name: string; // 업체명
  category: string; // 카테고리
  manager: string; // 담당자명
  managerPhone: string; // 전화번호
  email: string; // 이메일
  deliveryTime: string;
  address: string; // 주소

  contact: string;
  status: 'active' | 'inactive';
}

export default function SupplierListTab() {
  const [showAddSupplierModal, setShowAddSupplierModal] = useState(false);
  const [isDetailModalOpen, setIsDetailModalOpen] = useState(false);
  const [selectedSupplier, setSelectedSupplier] = useState<SupplierResponse | null>(null);
  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage] = useState(8);

  const categories = ['전체', '철강/금속', '화학/소재', '전자부품', '기계부품', '포장재', '소모품'];

  const [suppliers, setSuppliers] = useState<Supplier[]>([
    {
      id: 'SUP-001',
      name: '대한철강',
      category: '철강/금속',
      contact: '02-1234-5678',
      email: 'order@steel.co.kr',
      address: '서울시 강남구 테헤란로 123',
      manager: '김철수',
      managerPhone: '010-1234-5678',
      deliveryTime: '7',
      status: 'active',
    },
    {
      id: 'SUP-002',
      name: '한국알루미늄',
      category: '철강/금속',
      contact: '031-987-6543',
      email: 'sales@aluminum.co.kr',
      address: '경기도 수원시 영통구 산업로 789',
      manager: '이영희',
      managerPhone: '010-2345-6789',
      deliveryTime: '5',
      status: 'active',
    },
    {
      id: 'SUP-003',
      name: '포스코',
      category: '철강/금속',
      contact: '054-220-0114',
      email: 'order@posco.co.kr',
      address: '경북 포항시 남구 동해안로 6261',
      manager: '박민수',
      managerPhone: '010-3456-7890',
      deliveryTime: '3',
      status: 'active',
    },
    {
      id: 'SUP-004',
      name: '케미칼솔루션',
      category: '화학/소재',
      contact: '032-456-7890',
      email: 'info@chemical.co.kr',
      address: '인천시 남동구 논현로 456',
      manager: '최지영',
      managerPhone: '010-4567-8901',
      deliveryTime: '10',
      status: 'active',
    },
    {
      id: 'SUP-005',
      name: '일렉트로닉스코리아',
      category: '전자부품',
      contact: '031-123-4567',
      email: 'sales@electronics.co.kr',
      address: '경기도 성남시 분당구 판교로 123',
      manager: '정수진',
      managerPhone: '010-5678-9012',
      deliveryTime: '7',
      status: 'active',
    },
    {
      id: 'SUP-006',
      name: '패스너코리아',
      category: '기계부품',
      contact: '055-234-5678',
      email: 'order@fastener.co.kr',
      address: '경남 창원시 의창구 공단로 789',
      manager: '김영수',
      managerPhone: '010-6789-0123',
      deliveryTime: '5',
      status: 'active',
    },
    {
      id: 'SUP-007',
      name: '글로벌패키징',
      category: '포장재',
      contact: '02-345-6789',
      email: 'info@packaging.co.kr',
      address: '서울시 금천구 가산디지털로 456',
      manager: '이하늘',
      managerPhone: '010-7890-1234',
      deliveryTime: '3',
      status: 'active',
    },
    {
      id: 'SUP-008',
      name: '오피스서플라이',
      category: '소모품',
      contact: '02-456-7890',
      email: 'sales@office.co.kr',
      address: '서울시 마포구 월드컵로 123',
      manager: '박지영',
      managerPhone: '010-8901-2345',
      deliveryTime: '1',
      status: 'active',
    },
    {
      id: 'SUP-009',
      name: '테크솔루션',
      category: '전자부품',
      contact: '031-567-8901',
      email: 'tech@solution.co.kr',
      address: '경기도 안양시 동안구 시민대로 789',
      manager: '최민석',
      managerPhone: '010-9012-3456',
      deliveryTime: '14',
      status: 'inactive',
    },
  ]);

  const supplierResponse: SupplierResponse[] = [
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
  ];

  const handleViewDetail = (supplier: SupplierResponse) => {
    setSelectedSupplier(supplier);
    setIsDetailModalOpen(true);
  };

  const handleCloseDetail = () => {
    setIsDetailModalOpen(false);
    setSelectedSupplier(null);
  };

  // const handleSaveSupplier = (updatedSupplier: Supplier) => {
  //   setSuppliers(suppliers.map((s) => (s.id === updatedSupplier.id ? updatedSupplier : s)));
  //   setSelectedSupplier(updatedSupplier);
  //   handleCloseDetail();
  // };

  const handleAddSupplier = (newSupplier: Partial<Supplier>) => {
    const id = `SUP-${String(suppliers.length + 1).padStart(3, '0')}`;
    const supplier: Supplier = {
      ...(newSupplier as Supplier),
      id,
    };
    setSuppliers([...suppliers, supplier]);
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
            <button
              onClick={() => setShowAddSupplierModal(true)}
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
              {supplierResponse.map((supplier) => (
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
            </tbody>
          </table>
        </div>
      </div>

      {/* 공급업체 신규 등록 모달 */}
      <SupplierAddModal
        isOpen={showAddSupplierModal}
        onClose={() => setShowAddSupplierModal(false)}
        onAddSupplier={handleAddSupplier}
        categories={categories}
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
