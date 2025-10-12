'use client';

import { useState } from 'react';

interface Supplier {
  id: string;
  name: string;
  category: string;
  contact: string;
  email: string;
  address: string;
  manager: string;
  managerPhone: string;
  rating: number;
  contractValue: string;
  lastOrderDate: string;
  status: 'active' | 'inactive';
  paymentTerms: string;
  deliveryTime: string;
  qualityScore: number;
  notes: string;
}

export default function SuppliersPage() {
  const [selectedCategory, setSelectedCategory] = useState('전체');
  const [searchTerm, setSearchTerm] = useState('');
  const [showAddModal, setShowAddModal] = useState(false);
  const [showDetailModal, setShowDetailModal] = useState(false);
  const [showEditModal, setShowEditModal] = useState(false);
  const [selectedSupplier, setSelectedSupplier] = useState<Supplier | null>(null);
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
      rating: 4.5,
      contractValue: '₩15,000,000,000',
      lastOrderDate: '2024-01-18',
      status: 'active',
      paymentTerms: '월말 결제',
      deliveryTime: '7-10일',
      qualityScore: 95,
      notes: '주요 철강재 공급업체, 품질 우수',
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
      rating: 4.2,
      contractValue: '₩8,500,000,000',
      lastOrderDate: '2024-01-17',
      status: 'active',
      paymentTerms: '30일 후 결제',
      deliveryTime: '5-7일',
      qualityScore: 92,
      notes: '알루미늄 전문 공급업체',
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
      rating: 4.8,
      contractValue: '₩25,000,000,000',
      lastOrderDate: '2024-01-16',
      status: 'active',
      paymentTerms: '즉시 결제',
      deliveryTime: '3-5일',
      qualityScore: 98,
      notes: '국내 최대 철강업체, 신뢰성 높음',
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
      rating: 4.0,
      contractValue: '₩3,200,000,000',
      lastOrderDate: '2024-01-15',
      status: 'active',
      paymentTerms: '45일 후 결제',
      deliveryTime: '10-14일',
      qualityScore: 88,
      notes: '화학 원료 전문 공급업체',
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
      rating: 4.3,
      contractValue: '₩5,800,000,000',
      lastOrderDate: '2024-01-14',
      status: 'active',
      paymentTerms: '월말 결제',
      deliveryTime: '7-10일',
      qualityScore: 90,
      notes: '전자부품 전문, 기술지원 우수',
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
      rating: 4.1,
      contractValue: '₩2,100,000,000',
      lastOrderDate: '2024-01-13',
      status: 'active',
      paymentTerms: '30일 후 결제',
      deliveryTime: '5-7일',
      qualityScore: 87,
      notes: '볼트, 너트 등 체결부품 전문',
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
      rating: 3.8,
      contractValue: '₩1,500,000,000',
      lastOrderDate: '2024-01-12',
      status: 'active',
      paymentTerms: '월말 결제',
      deliveryTime: '3-5일',
      qualityScore: 85,
      notes: '포장재 전문, 친환경 제품 보유',
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
      rating: 3.9,
      contractValue: '₩800,000,000',
      lastOrderDate: '2024-01-11',
      status: 'active',
      paymentTerms: '15일 후 결제',
      deliveryTime: '1-3일',
      qualityScore: 82,
      notes: '사무용품 및 소모품 전문',
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
      rating: 4.4,
      contractValue: '₩4,200,000,000',
      lastOrderDate: '2024-01-10',
      status: 'inactive',
      paymentTerms: '60일 후 결제',
      deliveryTime: '14-21일',
      qualityScore: 89,
      notes: '기술 솔루션 제공, 현재 계약 검토 중',
    },
  ]);

  const [newSupplier, setNewSupplier] = useState<Partial<Supplier>>({
    name: '',
    category: '',
    contact: '',
    email: '',
    address: '',
    manager: '',
    managerPhone: '',
    rating: 0,
    contractValue: '',
    paymentTerms: '',
    deliveryTime: '',
    qualityScore: 0,
    notes: '',
    status: 'active',
  });

  const getStatusColor = (status: string) => {
    return status === 'active' ? 'bg-green-100 text-green-800' : 'bg-gray-100 text-gray-800';
  };

  const getCategoryColor = (category: string) => {
    const colors: { [key: string]: string } = {
      '철강/금속': 'bg-blue-100 text-blue-800',
      '화학/소재': 'bg-purple-100 text-purple-800',
      전자부품: 'bg-green-100 text-green-800',
      기계부품: 'bg-orange-100 text-orange-800',
      포장재: 'bg-yellow-100 text-yellow-800',
      소모품: 'bg-gray-100 text-gray-800',
    };
    return colors[category] || 'bg-gray-100 text-gray-800';
  };

  const getRatingStars = (rating: number) => {
    const stars = [];
    const fullStars = Math.floor(rating);
    const hasHalfStar = rating % 1 !== 0;

    for (let i = 0; i < fullStars; i++) {
      stars.push(<i key={i} className="ri-star-fill text-yellow-400"></i>);
    }
    if (hasHalfStar) {
      stars.push(<i key="half" className="ri-star-half-fill text-yellow-400"></i>);
    }
    const emptyStars = 5 - Math.ceil(rating);
    for (let i = 0; i < emptyStars; i++) {
      stars.push(<i key={`empty-${i}`} className="ri-star-line text-gray-300"></i>);
    }
    return stars;
  };

  const filteredSuppliers = suppliers.filter((supplier) => {
    const matchesCategory = selectedCategory === '전체' || supplier.category === selectedCategory;
    const matchesSearch =
      supplier.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      supplier.manager.toLowerCase().includes(searchTerm.toLowerCase()) ||
      supplier.id.toLowerCase().includes(searchTerm.toLowerCase());
    return matchesCategory && matchesSearch;
  });

  // 페이지네이션 계산
  const totalPages = Math.ceil(filteredSuppliers.length / itemsPerPage);
  const startIndex = (currentPage - 1) * itemsPerPage;
  const endIndex = startIndex + itemsPerPage;
  const currentSuppliers = filteredSuppliers.slice(startIndex, endIndex);

  const handlePageChange = (page: number) => {
    setCurrentPage(page);
  };

  const handleCategoryChange = (category: string) => {
    setSelectedCategory(category);
    setCurrentPage(1);
  };

  const handleSearchChange = (term: string) => {
    setSearchTerm(term);
    setCurrentPage(1);
  };

  const handleAddSupplier = (e: React.FormEvent) => {
    e.preventDefault();
    const id = `SUP-${String(suppliers.length + 1).padStart(3, '0')}`;
    const supplier: Supplier = {
      ...(newSupplier as Supplier),
      id,
      lastOrderDate: '-',
    };
    setSuppliers([...suppliers, supplier]);
    setNewSupplier({
      name: '',
      category: '',
      contact: '',
      email: '',
      address: '',
      manager: '',
      managerPhone: '',
      rating: 0,
      contractValue: '',
      paymentTerms: '',
      deliveryTime: '',
      qualityScore: 0,
      notes: '',
      status: 'active',
    });
    setShowAddModal(false);
    alert('공급업체가 성공적으로 등록되었습니다.');
  };

  const handleViewDetail = (supplier: Supplier) => {
    setSelectedSupplier(supplier);
    setShowDetailModal(true);
  };

  const handleEditSupplier = (supplier: Supplier) => {
    setSelectedSupplier(supplier);
    setShowDetailModal(false);
    setShowEditModal(true);
  };

  const handleSaveEdit = (e: React.FormEvent) => {
    e.preventDefault();
    if (selectedSupplier) {
      setSuppliers(suppliers.map((s) => (s.id === selectedSupplier.id ? selectedSupplier : s)));
      setShowEditModal(false);
      setSelectedSupplier(null);
      alert('공급업체 정보가 성공적으로 수정되었습니다.');
    }
  };

  const handleDeleteSupplier = (supplierId: string) => {
    if (confirm('정말로 이 공급업체를 삭제하시겠습니까?')) {
      setSuppliers(suppliers.filter((s) => s.id !== supplierId));
      alert('공급업체가 삭제되었습니다.');
    }
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* 페이지 헤더 */}
        <div className="mb-8">
          <div className="flex items-center space-x-2 text-sm text-gray-500 mb-4">
            <span>구매관리</span>
            <i className="ri-arrow-right-s-line"></i>
            <span className="text-gray-900">공급업체 관리</span>
          </div>
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-3xl font-bold text-gray-900">공급업체 관리</h1>
              <p className="text-gray-600 mt-2">공급업체 정보를 관리하고 평가합니다</p>
            </div>
            <button
              onClick={() => setShowAddModal(true)}
              className="px-4 py-2 bg-blue-600 text-white font-medium rounded-lg hover:bg-blue-700 transition-colors duration-200 cursor-pointer whitespace-nowrap flex items-center space-x-2"
            >
              <i className="ri-building-add-line"></i>
              <span>공급업체 등록</span>
            </button>
          </div>
        </div>

        {/* 필터 및 검색 */}
        <div className="bg-white rounded-lg border border-gray-200 p-6 mb-6">
          <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between space-y-4 lg:space-y-0">
            <div className="flex items-center space-x-4">
              <span className="text-sm font-medium text-gray-700">카테고리:</span>
              <div className="flex items-center space-x-1 bg-gray-100 rounded-lg p-1">
                {categories.map((category) => (
                  <button
                    key={category}
                    onClick={() => handleCategoryChange(category)}
                    className={`px-3 py-1 rounded-md text-sm font-medium transition-colors duration-200 cursor-pointer whitespace-nowrap ${
                      selectedCategory === category
                        ? 'bg-white text-gray-900 shadow-sm'
                        : 'text-gray-600 hover:text-gray-900'
                    }`}
                  >
                    {category}
                  </button>
                ))}
              </div>
            </div>

            <div className="flex items-center space-x-4">
              <div className="relative">
                <i className="ri-search-line absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400"></i>
                <input
                  type="text"
                  placeholder="공급업체명, 담당자명으로 검색..."
                  value={searchTerm}
                  onChange={(e) => handleSearchChange(e.target.value)}
                  className="pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent text-sm w-80"
                />
              </div>
            </div>
          </div>
        </div>

        {/* 공급업체 카드 그리드 */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6 mb-6">
          {currentSuppliers.map((supplier) => (
            <div
              key={supplier.id}
              className="bg-white rounded-lg border border-gray-200 p-6 hover:shadow-md transition-shadow duration-200"
            >
              <div className="flex items-start justify-between mb-4">
                <div className="flex items-center space-x-3">
                  <div className="w-12 h-12 bg-blue-100 rounded-lg flex items-center justify-center">
                    <i className="ri-building-line text-blue-600 text-lg"></i>
                  </div>
                  <div>
                    <h3 className="font-semibold text-gray-900">{supplier.name}</h3>
                    <p className="text-xs text-gray-500">{supplier.id}</p>
                  </div>
                </div>
                <span
                  className={`inline-flex px-2 py-1 text-xs font-semibold rounded-full ${getStatusColor(supplier.status)}`}
                >
                  {supplier.status === 'active' ? '활성' : '비활성'}
                </span>
              </div>

              <div className="space-y-3">
                <div>
                  <span
                    className={`inline-flex px-2 py-1 text-xs font-medium rounded-full ${getCategoryColor(supplier.category)}`}
                  >
                    {supplier.category}
                  </span>
                </div>

                <div className="flex items-center space-x-1">
                  {getRatingStars(supplier.rating)}
                  <span className="text-sm text-gray-600 ml-2">{supplier.rating}</span>
                </div>

                <div className="text-sm text-gray-600">
                  <div className="flex items-center space-x-2 mb-1">
                    <i className="ri-user-line text-gray-400"></i>
                    <span>{supplier.manager}</span>
                  </div>
                  <div className="flex items-center space-x-2 mb-1">
                    <i className="ri-phone-line text-gray-400"></i>
                    <span>{supplier.contact}</span>
                  </div>
                  <div className="flex items-center space-x-2">
                    <i className="ri-calendar-line text-gray-400"></i>
                    <span>최근주문: {supplier.lastOrderDate}</span>
                  </div>
                </div>

                <div className="pt-3 border-t border-gray-200">
                  <div className="text-sm font-medium text-gray-900 mb-1">계약금액</div>
                  <div className="text-lg font-bold text-blue-600">{supplier.contractValue}</div>
                </div>

                <div className="flex items-center justify-between pt-3">
                  <div className="flex items-center space-x-2">
                    <button
                      onClick={() => handleViewDetail(supplier)}
                      className="text-blue-600 hover:text-blue-500 cursor-pointer"
                      title="상세보기"
                    >
                      <i className="ri-eye-line"></i>
                    </button>
                    <button
                      onClick={() => handleEditSupplier(supplier)}
                      className="text-green-600 hover:text-green-500 cursor-pointer"
                      title="수정"
                    >
                      <i className="ri-edit-line"></i>
                    </button>
                    <button
                      onClick={() => handleDeleteSupplier(supplier.id)}
                      className="text-red-600 hover:text-red-500 cursor-pointer"
                      title="삭제"
                    >
                      <i className="ri-delete-bin-line"></i>
                    </button>
                  </div>
                  <div className="text-xs text-gray-500">품질점수: {supplier.qualityScore}점</div>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* 페이지네이션 */}
        <div className="flex items-center justify-between">
          <div className="text-sm text-gray-700">
            총 <span className="font-medium">{filteredSuppliers.length}</span>개 공급업체 (
            {startIndex + 1}-{Math.min(endIndex, filteredSuppliers.length)} 표시)
          </div>
          <div className="flex items-center space-x-2">
            <button
              onClick={() => handlePageChange(Math.max(1, currentPage - 1))}
              disabled={currentPage === 1}
              className={`px-3 py-1 border border-gray-300 rounded-md text-sm cursor-pointer ${
                currentPage === 1
                  ? 'text-gray-400 bg-gray-50 cursor-not-allowed'
                  : 'text-gray-700 hover:bg-gray-50'
              }`}
            >
              이전
            </button>

            {Array.from({ length: totalPages }, (_, i) => i + 1).map((page) => (
              <button
                key={page}
                onClick={() => handlePageChange(page)}
                className={`px-3 py-1 rounded-md text-sm cursor-pointer ${
                  currentPage === page
                    ? 'bg-blue-600 text-white'
                    : 'border border-gray-300 text-gray-700 hover:bg-gray-50'
                }`}
              >
                {page}
              </button>
            ))}

            <button
              onClick={() => handlePageChange(Math.min(totalPages, currentPage + 1))}
              disabled={currentPage === totalPages}
              className={`px-3 py-1 border border-gray-300 rounded-md text-sm cursor-pointer ${
                currentPage === totalPages
                  ? 'text-gray-400 bg-gray-50 cursor-not-allowed'
                  : 'text-gray-700 hover:bg-gray-50'
              }`}
            >
              다음
            </button>
          </div>
        </div>

        {/* 공급업체 등록 모달 */}
        {showAddModal && (
          <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
            <div className="bg-white rounded-lg p-6 w-full max-w-2xl max-h-[90vh] overflow-y-auto">
              <div className="flex items-center justify-between mb-6">
                <h3 className="text-xl font-semibold text-gray-900">공급업체 등록</h3>
                <button
                  onClick={() => setShowAddModal(false)}
                  className="text-gray-400 hover:text-gray-600 cursor-pointer"
                >
                  <i className="ri-close-line text-2xl"></i>
                </button>
              </div>

              <form onSubmit={handleAddSupplier} className="space-y-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      공급업체명 <span className="text-red-500">*</span>
                    </label>
                    <input
                      type="text"
                      value={newSupplier.name}
                      onChange={(e) => setNewSupplier({ ...newSupplier, name: e.target.value })}
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                      required
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      카테고리 <span className="text-red-500">*</span>
                    </label>
                    <select
                      value={newSupplier.category}
                      onChange={(e) => setNewSupplier({ ...newSupplier, category: e.target.value })}
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent pr-8"
                      required
                    >
                      <option value="">카테고리 선택</option>
                      {categories.slice(1).map((category) => (
                        <option key={category} value={category}>
                          {category}
                        </option>
                      ))}
                    </select>
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      대표전화 <span className="text-red-500">*</span>
                    </label>
                    <input
                      type="text"
                      value={newSupplier.contact}
                      onChange={(e) => setNewSupplier({ ...newSupplier, contact: e.target.value })}
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                      required
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      이메일 <span className="text-red-500">*</span>
                    </label>
                    <input
                      type="email"
                      value={newSupplier.email}
                      onChange={(e) => setNewSupplier({ ...newSupplier, email: e.target.value })}
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                      required
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      담당자명 <span className="text-red-500">*</span>
                    </label>
                    <input
                      type="text"
                      value={newSupplier.manager}
                      onChange={(e) => setNewSupplier({ ...newSupplier, manager: e.target.value })}
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                      required
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      담당자 연락처 <span className="text-red-500">*</span>
                    </label>
                    <input
                      type="text"
                      value={newSupplier.managerPhone}
                      onChange={(e) =>
                        setNewSupplier({ ...newSupplier, managerPhone: e.target.value })
                      }
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                      required
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">결제조건</label>
                    <input
                      type="text"
                      value={newSupplier.paymentTerms}
                      onChange={(e) =>
                        setNewSupplier({ ...newSupplier, paymentTerms: e.target.value })
                      }
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                      placeholder="예: 월말 결제, 30일 후 결제"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">배송기간</label>
                    <input
                      type="text"
                      value={newSupplier.deliveryTime}
                      onChange={(e) =>
                        setNewSupplier({ ...newSupplier, deliveryTime: e.target.value })
                      }
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                      placeholder="예: 3-5일, 1-2주"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      평점 (1-5)
                    </label>
                    <input
                      type="number"
                      min="1"
                      max="5"
                      step="0.1"
                      value={newSupplier.rating}
                      onChange={(e) =>
                        setNewSupplier({ ...newSupplier, rating: parseFloat(e.target.value) })
                      }
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      품질점수 (0-100)
                    </label>
                    <input
                      type="number"
                      min="0"
                      max="100"
                      value={newSupplier.qualityScore}
                      onChange={(e) =>
                        setNewSupplier({ ...newSupplier, qualityScore: parseInt(e.target.value) })
                      }
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    주소 <span className="text-red-500">*</span>
                  </label>
                  <textarea
                    value={newSupplier.address}
                    onChange={(e) => setNewSupplier({ ...newSupplier, address: e.target.value })}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    rows={2}
                    required
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">계약금액</label>
                  <input
                    type="text"
                    value={newSupplier.contractValue}
                    onChange={(e) =>
                      setNewSupplier({ ...newSupplier, contractValue: e.target.value })
                    }
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    placeholder="예: ₩10,000,000,000"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">메모</label>
                  <textarea
                    value={newSupplier.notes}
                    onChange={(e) => setNewSupplier({ ...newSupplier, notes: e.target.value })}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    rows={3}
                    placeholder="공급업체에 대한 추가 정보나 특이사항을 입력하세요"
                  />
                </div>

                <div className="flex gap-3 pt-6 border-t border-gray-200">
                  <button
                    type="button"
                    onClick={() => setShowAddModal(false)}
                    className="flex-1 px-4 py-2 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 transition-colors font-medium cursor-pointer whitespace-nowrap"
                  >
                    취소
                  </button>
                  <button
                    type="submit"
                    className="flex-1 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors font-medium cursor-pointer whitespace-nowrap"
                  >
                    등록
                  </button>
                </div>
              </form>
            </div>
          </div>
        )}

        {/* 공급업체 상세 모달 */}
        {showDetailModal && selectedSupplier && (
          <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
            <div className="bg-white rounded-lg p-6 w-full max-w-3xl max-h-[90vh] overflow-y-auto">
              <div className="flex items-center justify-between mb-6">
                <h3 className="text-xl font-semibold text-gray-900">공급업체 상세 정보</h3>
                <button
                  onClick={() => setShowDetailModal(false)}
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
                      <label className="block text-sm font-medium text-gray-700 mb-1">
                        공급업체명
                      </label>
                      <div className="text-lg font-semibold text-gray-900">
                        {selectedSupplier.name}
                      </div>
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">
                        공급업체 ID
                      </label>
                      <div className="text-gray-900">{selectedSupplier.id}</div>
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">
                        카테고리
                      </label>
                      <span
                        className={`inline-flex px-2 py-1 text-sm font-medium rounded-full ${getCategoryColor(selectedSupplier.category)}`}
                      >
                        {selectedSupplier.category}
                      </span>
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">상태</label>
                      <span
                        className={`inline-flex px-2 py-1 text-sm font-semibold rounded-full ${getStatusColor(selectedSupplier.status)}`}
                      >
                        {selectedSupplier.status === 'active' ? '활성' : '비활성'}
                      </span>
                    </div>
                  </div>
                  <div className="space-y-4">
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">평점</label>
                      <div className="flex items-center space-x-2">
                        <div className="flex items-center space-x-1">
                          {getRatingStars(selectedSupplier.rating)}
                        </div>
                        <span className="text-gray-600">{selectedSupplier.rating}</span>
                      </div>
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">
                        품질점수
                      </label>
                      <div className="text-gray-900">{selectedSupplier.qualityScore}점</div>
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">
                        계약금액
                      </label>
                      <div className="text-lg font-semibold text-blue-600">
                        {selectedSupplier.contractValue}
                      </div>
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">
                        최근 주문일
                      </label>
                      <div className="text-gray-900">{selectedSupplier.lastOrderDate}</div>
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
                        <div className="text-gray-900">{selectedSupplier.contact}</div>
                      </div>
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">
                          이메일
                        </label>
                        <div className="text-blue-600">{selectedSupplier.email}</div>
                      </div>
                    </div>
                    <div className="space-y-4">
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">
                          담당자
                        </label>
                        <div className="text-gray-900">{selectedSupplier.manager}</div>
                      </div>
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">
                          담당자 연락처
                        </label>
                        <div className="text-gray-900">{selectedSupplier.managerPhone}</div>
                      </div>
                    </div>
                  </div>
                  <div className="mt-4">
                    <label className="block text-sm font-medium text-gray-700 mb-1">주소</label>
                    <div className="text-gray-900">{selectedSupplier.address}</div>
                  </div>
                </div>

                {/* 거래 조건 */}
                <div className="border-t border-gray-200 pt-6">
                  <h4 className="text-lg font-semibold text-gray-900 mb-4">거래 조건</h4>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">
                        결제조건
                      </label>
                      <div className="text-gray-900">{selectedSupplier.paymentTerms}</div>
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">
                        배송기간
                      </label>
                      <div className="text-gray-900">{selectedSupplier.deliveryTime}</div>
                    </div>
                  </div>
                </div>

                {/* 메모 */}
                <div className="border-t border-gray-200 pt-6">
                  <label className="block text-sm font-medium text-gray-700 mb-1">메모</label>
                  <div className="text-gray-900 bg-gray-50 p-3 rounded-lg">
                    {selectedSupplier.notes}
                  </div>
                </div>

                {/* 버튼 */}
                <div className="flex gap-3 pt-6 border-t border-gray-200">
                  <button
                    onClick={() => setShowDetailModal(false)}
                    className="flex-1 px-4 py-2 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 transition-colors font-medium cursor-pointer whitespace-nowrap"
                  >
                    닫기
                  </button>
                  <button
                    onClick={() => handleEditSupplier(selectedSupplier)}
                    className="px-6 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors font-medium cursor-pointer whitespace-nowrap"
                  >
                    수정
                  </button>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* 공급업체 수정 모달 */}
        {showEditModal && selectedSupplier && (
          <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
            <div className="bg-white rounded-lg p-6 w-full max-w-2xl max-h-[90vh] overflow-y-auto">
              <div className="flex items-center justify-between mb-6">
                <h3 className="text-xl font-semibold text-gray-900">공급업체 수정</h3>
                <button
                  onClick={() => setShowEditModal(false)}
                  className="text-gray-400 hover:text-gray-600 cursor-pointer"
                >
                  <i className="ri-close-line text-2xl"></i>
                </button>
              </div>

              <form onSubmit={handleSaveEdit} className="space-y-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      공급업체명
                    </label>
                    <input
                      type="text"
                      value={selectedSupplier.name}
                      onChange={(e) =>
                        setSelectedSupplier({ ...selectedSupplier, name: e.target.value })
                      }
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">카테고리</label>
                    <select
                      value={selectedSupplier.category}
                      onChange={(e) =>
                        setSelectedSupplier({ ...selectedSupplier, category: e.target.value })
                      }
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent pr-8"
                    >
                      {categories.slice(1).map((category) => (
                        <option key={category} value={category}>
                          {category}
                        </option>
                      ))}
                    </select>
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">대표전화</label>
                    <input
                      type="text"
                      value={selectedSupplier.contact}
                      onChange={(e) =>
                        setSelectedSupplier({ ...selectedSupplier, contact: e.target.value })
                      }
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">이메일</label>
                    <input
                      type="email"
                      value={selectedSupplier.email}
                      onChange={(e) =>
                        setSelectedSupplier({ ...selectedSupplier, email: e.target.value })
                      }
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">담당자명</label>
                    <input
                      type="text"
                      value={selectedSupplier.manager}
                      onChange={(e) =>
                        setSelectedSupplier({ ...selectedSupplier, manager: e.target.value })
                      }
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      담당자 연락처
                    </label>
                    <input
                      type="text"
                      value={selectedSupplier.managerPhone}
                      onChange={(e) =>
                        setSelectedSupplier({ ...selectedSupplier, managerPhone: e.target.value })
                      }
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">결제조건</label>
                    <input
                      type="text"
                      value={selectedSupplier.paymentTerms}
                      onChange={(e) =>
                        setSelectedSupplier({ ...selectedSupplier, paymentTerms: e.target.value })
                      }
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">배송기간</label>
                    <input
                      type="text"
                      value={selectedSupplier.deliveryTime}
                      onChange={(e) =>
                        setSelectedSupplier({ ...selectedSupplier, deliveryTime: e.target.value })
                      }
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      평점 (1-5)
                    </label>
                    <input
                      type="number"
                      min="1"
                      max="5"
                      step="0.1"
                      value={selectedSupplier.rating}
                      onChange={(e) =>
                        setSelectedSupplier({
                          ...selectedSupplier,
                          rating: parseFloat(e.target.value),
                        })
                      }
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      품질점수 (0-100)
                    </label>
                    <input
                      type="number"
                      min="0"
                      max="100"
                      value={selectedSupplier.qualityScore}
                      onChange={(e) =>
                        setSelectedSupplier({
                          ...selectedSupplier,
                          qualityScore: parseInt(e.target.value),
                        })
                      }
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">상태</label>
                    <select
                      value={selectedSupplier.status}
                      onChange={(e) =>
                        setSelectedSupplier({
                          ...selectedSupplier,
                          status: e.target.value as 'active' | 'inactive',
                        })
                      }
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent pr-8"
                    >
                      <option value="active">활성</option>
                      <option value="inactive">비활성</option>
                    </select>
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">계약금액</label>
                    <input
                      type="text"
                      value={selectedSupplier.contractValue}
                      onChange={(e) =>
                        setSelectedSupplier({ ...selectedSupplier, contractValue: e.target.value })
                      }
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">주소</label>
                  <textarea
                    value={selectedSupplier.address}
                    onChange={(e) =>
                      setSelectedSupplier({ ...selectedSupplier, address: e.target.value })
                    }
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    rows={2}
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">메모</label>
                  <textarea
                    value={selectedSupplier.notes}
                    onChange={(e) =>
                      setSelectedSupplier({ ...selectedSupplier, notes: e.target.value })
                    }
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    rows={3}
                  />
                </div>

                <div className="flex gap-3 pt-6 border-t border-gray-200">
                  <button
                    type="button"
                    onClick={() => setShowEditModal(false)}
                    className="flex-1 px-4 py-2 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 transition-colors font-medium cursor-pointer whitespace-nowrap"
                  >
                    취소
                  </button>
                  <button
                    type="submit"
                    className="flex-1 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors font-medium cursor-pointer whitespace-nowrap"
                  >
                    저장
                  </button>
                </div>
              </form>
            </div>
          </div>
        )}
      </main>
    </div>
  );
}
