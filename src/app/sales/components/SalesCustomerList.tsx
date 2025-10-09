'use client';

import { useState } from 'react';
import { Customer, CustomerDetails, Manager } from '@/app/sales/types/SalesCustomerList';

export default function CustomerList() {
  const [selectedType, setSelectedType] = useState('전체');
  const [searchTerm, setSearchTerm] = useState('');
  const [showDetailModal, setShowDetailModal] = useState(false);
  const [showEditModal, setShowEditModal] = useState(false);
  const [selectedCustomer, setSelectedCustomer] = useState<Customer | null>(null);
  const [editFormData, setEditFormData] = useState<Customer | null>(null);

  const typeOptions = ['전체', '대기업', '중견기업', '중소기업', '개인'];

  const [customers, setCustomers] = useState<Customer[]>([
    {
      id: 'C-001',
      name: '삼성전자',
      type: '대기업',
      contact: '김철수',
      phone: '02-1234-5678',
      email: 'kim@samsung.com',
      address: '서울시 강남구 테헤란로 123',
      totalOrders: 45,
      totalAmount: '₩1,250,000,000',
      lastOrder: '2024-01-15',
      status: '활성',
      details: {
        businessNumber: '123-45-67890',
        ceo: '이재용',
        establishedDate: '1969-01-13',
        employees: 267937,
        industry: '전자/반도체',
        website: 'www.samsung.com',
        fax: '02-1234-5679',
        manager: {
          name: '김철수',
          position: '구매팀장',
          department: '구매부',
          mobile: '010-1234-5678',
          directPhone: '02-1234-5680',
        },
        paymentTerms: '30일 후 결제',
        creditLimit: '₩5,000,000,000',
        taxType: '일반과세',
        notes: '주요 고객사, 정기 거래처',
      },
    },
    {
      id: 'C-002',
      name: 'LG화학',
      type: '대기업',
      contact: '박영희',
      phone: '02-2345-6789',
      email: 'park@lgchem.com',
      address: '서울시 영등포구 여의도동 456',
      totalOrders: 32,
      totalAmount: '₩890,000,000',
      lastOrder: '2024-01-14',
      status: '활성',
      details: {
        businessNumber: '234-56-78901',
        ceo: '신학철',
        establishedDate: '1947-02-20',
        employees: 45000,
        industry: '화학/소재',
        website: 'www.lgchem.com',
        fax: '02-2345-6790',
        manager: {
          name: '박영희',
          position: '영업부장',
          department: '영업부',
          mobile: '010-2345-6789',
          directPhone: '02-2345-6791',
        },
        paymentTerms: '45일 후 결제',
        creditLimit: '₩3,000,000,000',
        taxType: '일반과세',
        notes: '화학소재 전문 거래처',
      },
    },
    {
      id: 'C-003',
      name: '현대자동차',
      type: '대기업',
      contact: '이민수',
      phone: '02-3456-7890',
      email: 'lee@hyundai.com',
      address: '서울시 서초구 양재동 789',
      totalOrders: 28,
      totalAmount: '₩720,000,000',
      lastOrder: '2024-01-13',
      status: '활성',
      details: {
        businessNumber: '345-67-89012',
        ceo: '장재훈',
        establishedDate: '1967-12-29',
        employees: 120000,
        industry: '자동차',
        website: 'www.hyundai.com',
        fax: '02-3456-7891',
        manager: {
          name: '이민수',
          position: '구매담당자',
          department: '구매팀',
          mobile: '010-3456-7890',
          directPhone: '02-3456-7892',
        },
        paymentTerms: '월말 결제',
        creditLimit: '₩4,000,000,000',
        taxType: '일반과세',
        notes: '자동차 부품 전문 거래처',
      },
    },
    {
      id: 'C-004',
      name: '대한철강',
      type: '중견기업',
      contact: '최정호',
      phone: '031-1234-5678',
      email: 'choi@dksteel.com',
      address: '경기도 안산시 단원구 123',
      totalOrders: 18,
      totalAmount: '₩420,000,000',
      lastOrder: '2024-01-10',
      status: '활성',
      details: {
        businessNumber: '456-78-90123',
        ceo: '최대한',
        establishedDate: '1985-03-15',
        employees: 850,
        industry: '철강/금속',
        website: 'www.dksteel.com',
        fax: '031-1234-5679',
        manager: {
          name: '최정호',
          position: '영업과장',
          department: '영업팀',
          mobile: '010-4567-8901',
          directPhone: '031-1234-5680',
        },
        paymentTerms: '60일 후 결제',
        creditLimit: '₩1,000,000,000',
        taxType: '일반과세',
        notes: '철강 전문 중견기업',
      },
    },
    {
      id: 'C-005',
      name: '한국금속',
      type: '중소기업',
      contact: '김수진',
      phone: '032-2345-6789',
      email: 'kim@kmetal.com',
      address: '인천시 남동구 구월동 456',
      totalOrders: 12,
      totalAmount: '₩180,000,000',
      lastOrder: '2024-01-08',
      status: '비활성',
      details: {
        businessNumber: '567-89-01234',
        ceo: '김대표',
        establishedDate: '1995-07-10',
        employees: 120,
        industry: '금속가공',
        website: 'www.kmetal.com',
        fax: '032-2345-6790',
        manager: {
          name: '김수진',
          position: '영업담당',
          department: '영업부',
          mobile: '010-5678-9012',
          directPhone: '032-2345-6791',
        },
        paymentTerms: '30일 후 결제',
        creditLimit: '₩500,000,000',
        taxType: '간이과세',
        notes: '소규모 금속가공업체',
      },
    },
  ]);

  const getStatusColor = (status: string) => {
    return status === '활성' ? 'bg-green-100 text-green-800' : 'bg-gray-100 text-gray-800';
  };

  const getTypeColor = (type: string) => {
    switch (type) {
      case '대기업':
        return 'bg-blue-100 text-blue-800';
      case '중견기업':
        return 'bg-purple-100 text-purple-800';
      case '중소기업':
        return 'bg-orange-100 text-orange-800';
      case '개인':
        return 'bg-gray-100 text-gray-800';
      default:
        return 'bg-gray-100 text-gray-800';
    }
  };

  const filteredCustomers = customers.filter((customer) => {
    const matchesType = selectedType === '전체' || customer.type === selectedType;
    const matchesSearch =
      customer.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      customer.contact.toLowerCase().includes(searchTerm.toLowerCase()) ||
      customer.id.toLowerCase().includes(searchTerm.toLowerCase());
    return matchesType && matchesSearch;
  });

  const handleViewClick = (customer: Customer) => {
    setSelectedCustomer(customer);
    setShowDetailModal(true);
  };

  const handleEditClick = (customer: Customer) => {
    setEditFormData({ ...customer });
    setShowEditModal(true);
  };

  const handlePhoneClick = (phone: string) => {
    window.open(`tel:${phone}`);
  };

  const handleEditSave = (e: React.FormEvent) => {
    e.preventDefault();

    setCustomers((prevCustomers) =>
      prevCustomers.map((customer) => (customer.id === editFormData?.id ? editFormData : customer)),
    );

    alert('고객 정보가 성공적으로 수정되었습니다.');
    setShowEditModal(false);
    setEditFormData(null);
  };
  const updateEditFormData = <K extends keyof Customer>(field: K, value: Customer[K]) => {
    setEditFormData((prev) => (prev ? { ...prev, [field]: value } : prev));
  };

  const updateEditFormDetails = <K extends keyof CustomerDetails>(
    field: K,
    value: CustomerDetails[K],
  ) => {
    setEditFormData((prev) =>
      prev ? { ...prev, details: { ...prev.details, [field]: value } } : prev,
    );
  };
  const updateManagerInfo = <K extends keyof Manager>(field: K, value: Manager[K]) => {
    setEditFormData((prev) =>
      prev
        ? {
            ...prev,
            details: {
              ...prev.details,
              manager: { ...prev.details.manager, [field]: value },
            },
          }
        : prev,
    );
  };

  return (
    <div className="bg-white rounded-lg border border-gray-200">
      {/* 헤더 */}
      <div className="p-6 border-b border-gray-200">
        <div className="flex items-center justify-between mb-4">
          <h2 className="text-lg font-semibold text-gray-900">고객 관리</h2>
          <button className="px-4 py-2 bg-blue-600 text-white font-medium rounded-lg hover:bg-blue-700 transition-colors duration-200 cursor-pointer whitespace-nowrap flex items-center space-x-2">
            <i className="ri-user-add-line"></i>
            <span>고객 등록</span>
          </button>
        </div>

        {/* 필터 및 검색 */}
        <div className="flex flex-col sm:flex-row space-y-3 sm:space-y-0 sm:space-x-4">
          <div className="flex items-center space-x-2">
            <span className="text-sm font-medium text-gray-700">유형:</span>
            <div className="flex items-center space-x-1 bg-gray-100 rounded-lg p-1">
              {typeOptions.map((type) => (
                <button
                  key={type}
                  onClick={() => setSelectedType(type)}
                  className={`px-3 py-1 rounded-md text-sm font-medium transition-colors duration-200 cursor-pointer whitespace-nowrap ${
                    selectedType === type
                      ? 'bg-white text-gray-900 shadow-sm'
                      : 'text-gray-600 hover:text-gray-900'
                  }`}
                >
                  {type}
                </button>
              ))}
            </div>
          </div>

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
                유형
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
                최근주문
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
            {filteredCustomers.map((customer) => (
              <tr key={customer.id} className="hover:bg-gray-50">
                <td className="px-6 py-4 whitespace-nowrap">
                  <div className="flex items-center">
                    <div className="w-10 h-10 bg-blue-100 rounded-full flex items-center justify-center mr-3">
                      <i className="ri-building-line text-blue-600"></i>
                    </div>
                    <div>
                      <div className="text-sm font-medium text-gray-900">{customer.name}</div>
                      <div className="text-xs text-gray-500">{customer.id}</div>
                    </div>
                  </div>
                </td>
                <td className="px-6 py-4 whitespace-nowrap">
                  <span
                    className={`inline-flex px-2 py-1 text-xs font-semibold rounded-full ${getTypeColor(customer.type)}`}
                  >
                    {customer.type}
                  </span>
                </td>
                <td className="px-6 py-4">
                  <div className="text-sm text-gray-900">{customer.contact}</div>
                  <div className="text-xs text-gray-500">{customer.phone}</div>
                  <div className="text-xs text-gray-500">{customer.email}</div>
                </td>
                <td className="px-6 py-4">
                  <div className="text-sm text-gray-900 max-w-xs truncate">{customer.address}</div>
                </td>
                <td className="px-6 py-4 whitespace-nowrap">
                  <div className="text-sm font-medium text-gray-900">{customer.totalAmount}</div>
                  <div className="text-xs text-gray-500">{customer.totalOrders}건</div>
                </td>
                <td className="px-6 py-4 whitespace-nowrap">
                  <div className="text-sm text-gray-900">{customer.lastOrder}</div>
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
                      onClick={() => handleEditClick(customer)}
                      className="text-blue-600 hover:text-blue-500 cursor-pointer"
                      title="수정"
                    >
                      <i className="ri-edit-line"></i>
                    </button>
                    <button
                      onClick={() => handleViewClick(customer)}
                      className="text-gray-600 hover:text-gray-500 cursor-pointer"
                      title="상세보기"
                    >
                      <i className="ri-eye-line"></i>
                    </button>
                    <button
                      onClick={() => handlePhoneClick(customer.phone)}
                      className="text-green-600 hover:text-green-500 cursor-pointer"
                      title="전화걸기"
                    >
                      <i className="ri-phone-line"></i>
                    </button>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* 페이지네이션 */}
      <div className="px-6 py-4 border-t border-gray-200">
        <div className="flex items-center justify-between">
          <div className="text-sm text-gray-700">
            총 <span className="font-medium">{filteredCustomers.length}</span>명의 고객
          </div>
          <div className="flex items-center space-x-2">
            <button className="px-3 py-1 border border-gray-300 rounded-md text-sm text-gray-700 hover:bg-gray-50 cursor-pointer">
              이전
            </button>
            <button className="px-3 py-1 bg-blue-600 text-white rounded-md text-sm cursor-pointer">
              1
            </button>
            <button className="px-3 py-1 border border-gray-300 rounded-md text-sm text-gray-700 hover:bg-gray-50 cursor-pointer">
              2
            </button>
            <button className="px-3 py-1 border border-gray-300 rounded-md text-sm text-gray-700 hover:bg-gray-50 cursor-pointer">
              다음
            </button>
          </div>
        </div>
      </div>

      {/* 고객 상세보기 모달 */}
      {showDetailModal && selectedCustomer && (
        <div className="fixed inset-0  bg-black/50 flex items-center justify-center z-50">
          <div className="bg-white rounded-lg p-6 w-full max-w-4xl mx-4 max-h-[90vh] overflow-y-auto">
            <div className="flex items-center justify-between mb-6">
              <h3 className="text-xl font-semibold text-gray-900">고객 상세 정보</h3>
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
                    <label className="block text-sm font-medium text-gray-700 mb-1">고객코드</label>
                    <div className="text-lg font-semibold text-gray-900">{selectedCustomer.id}</div>
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">고객명</label>
                    <div className="text-gray-900">{selectedCustomer.name}</div>
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      사업자번호
                    </label>
                    <div className="text-gray-900">{selectedCustomer.details.businessNumber}</div>
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">대표이사</label>
                    <div className="text-gray-900">{selectedCustomer.details.ceo}</div>
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">설립일</label>
                    <div className="text-gray-900">{selectedCustomer.details.establishedDate}</div>
                  </div>
                </div>
                <div className="space-y-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">업종</label>
                    <div className="text-gray-900">{selectedCustomer.details.industry}</div>
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">직원수</label>
                    <div className="text-gray-900">
                      {selectedCustomer.details.employees.toLocaleString()}명
                    </div>
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">웹사이트</label>
                    <div className="text-blue-600 cursor-pointer hover:underline">
                      {selectedCustomer.details.website}
                    </div>
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">상태</label>
                    <span
                      className={`px-2 py-1 rounded text-xs font-medium ${getStatusColor(selectedCustomer.status)}`}
                    >
                      {selectedCustomer.status}
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
                        <span className="text-gray-900">{selectedCustomer.phone}</span>
                        <button
                          onClick={() => handlePhoneClick(selectedCustomer.phone)}
                          className="text-green-600 hover:text-green-500 cursor-pointer"
                          title="전화걸기"
                        >
                          <i className="ri-phone-line"></i>
                        </button>
                      </div>
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">팩스</label>
                      <div className="text-gray-900">{selectedCustomer.details.fax}</div>
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">이메일</label>
                      <div className="text-blue-600">{selectedCustomer.email}</div>
                    </div>
                  </div>
                  <div className="space-y-4">
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">주소</label>
                      <div className="text-gray-900">{selectedCustomer.address}</div>
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
                      <div className="text-gray-900">{selectedCustomer.details.manager.name}</div>
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">직책</label>
                      <div className="text-gray-900">
                        {selectedCustomer.details.manager.position}
                      </div>
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">부서</label>
                      <div className="text-gray-900">
                        {selectedCustomer.details.manager.department}
                      </div>
                    </div>
                  </div>
                  <div className="space-y-4">
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">휴대폰</label>
                      <div className="flex items-center space-x-2">
                        <span className="text-gray-900">
                          {selectedCustomer.details.manager.mobile}
                        </span>
                        <button
                          onClick={() => handlePhoneClick(selectedCustomer.details.manager.mobile)}
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
                          {selectedCustomer.details.manager.directPhone}
                        </span>
                        <button
                          onClick={() =>
                            handlePhoneClick(selectedCustomer.details.manager.directPhone)
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
                      <div className="text-gray-900">{selectedCustomer.totalOrders}건</div>
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">
                        총 거래금액
                      </label>
                      <div className="text-green-600 font-semibold">
                        {selectedCustomer.totalAmount}
                      </div>
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">
                        최근 주문일
                      </label>
                      <div className="text-gray-900">{selectedCustomer.lastOrder}</div>
                    </div>
                  </div>
                  <div className="space-y-4">
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">
                        결제조건
                      </label>
                      <div className="text-gray-900">{selectedCustomer.details.paymentTerms}</div>
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">
                        신용한도
                      </label>
                      <div className="text-gray-900">{selectedCustomer.details.creditLimit}</div>
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">
                        과세유형
                      </label>
                      <div className="text-gray-900">{selectedCustomer.details.taxType}</div>
                    </div>
                  </div>
                </div>
              </div>

              {/* 비고 */}
              <div className="border-t border-gray-200 pt-6">
                <label className="block text-sm font-medium text-gray-700 mb-1">비고</label>
                <div className="text-gray-900 bg-gray-50 p-3 rounded-lg">
                  {selectedCustomer.details.notes}
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
                  onClick={() => {
                    setShowDetailModal(false);
                    handleEditClick(selectedCustomer);
                  }}
                  className="px-6 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors font-medium cursor-pointer whitespace-nowrap"
                >
                  수정
                </button>
                <button
                  onClick={() => handlePhoneClick(selectedCustomer.phone)}
                  className="px-6 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 transition-colors font-medium cursor-pointer whitespace-nowrap"
                >
                  전화걸기
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* 고객 수정 모달 */}
      {showEditModal && editFormData && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50">
          <div className="bg-white rounded-lg p-6 w-full max-w-4xl mx-4 max-h-[90vh] overflow-y-auto">
            <div className="flex items-center justify-between mb-6">
              <h3 className="text-xl font-semibold text-gray-900">고객 정보 수정</h3>
              <button
                onClick={() => setShowEditModal(false)}
                className="text-gray-400 hover:text-gray-600 cursor-pointer"
              >
                <i className="ri-close-line text-2xl"></i>
              </button>
            </div>

            <form onSubmit={handleEditSave} className="space-y-6">
              {/* 기본 정보 수정 */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="space-y-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">고객코드</label>
                    <input
                      type="text"
                      value={editFormData.id}
                      readOnly
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg bg-gray-50 text-gray-500"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">고객명</label>
                    <input
                      type="text"
                      value={editFormData.name}
                      onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
                        updateEditFormData('name', e.target.value)
                      }
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg"
                      required
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">고객유형</label>
                    <select
                      value={editFormData.type}
                      onChange={(e: React.ChangeEvent<HTMLSelectElement>) =>
                        updateEditFormData('type', e.target.value)
                      }
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg pr-8"
                    >
                      <option value="대기업">대기업</option>
                      <option value="중견기업">중견기업</option>
                      <option value="중소기업">중소기업</option>
                      <option value="개인">개인</option>
                    </select>
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      사업자번호
                    </label>
                    <input
                      type="text"
                      value={editFormData.details.businessNumber}
                      onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
                        updateEditFormDetails('businessNumber', e.target.value)
                      }
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">대표이사</label>
                    <input
                      type="text"
                      value={editFormData.details.ceo}
                      onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
                        updateEditFormDetails('ceo', e.target.value)
                      }
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg"
                    />
                  </div>
                </div>
                <div className="space-y-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">업종</label>
                    <input
                      type="text"
                      value={editFormData.details.industry}
                      onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
                        updateEditFormDetails('industry', e.target.value)
                      }
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">직원수</label>
                    <input
                      type="number"
                      value={editFormData.details.employees}
                      onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
                        updateEditFormDetails('employees', Number(e.target.value))
                      }
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">웹사이트</label>
                    <input
                      type="url"
                      value={editFormData.details.website}
                      onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
                        updateEditFormDetails('website', e.target.value)
                      }
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">상태</label>
                    <select
                      value={editFormData.status}
                      onChange={(e: React.ChangeEvent<HTMLSelectElement>) =>
                        updateEditFormData('status', e.target.value)
                      }
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg pr-8"
                    >
                      <option value="활성">활성</option>
                      <option value="비활성">비활성</option>
                    </select>
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">설립일</label>
                    <input
                      type="date"
                      value={editFormData.details.establishedDate}
                      onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
                        updateEditFormDetails('establishedDate', e.target.value)
                      }
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg"
                    />
                  </div>
                </div>
              </div>

              {/* 연락처 정보 수정 */}
              <div className="border-t border-gray-200 pt-6">
                <h4 className="text-lg font-semibold text-gray-900 mb-4">연락처 정보</h4>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div className="space-y-4">
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">
                        대표전화
                      </label>
                      <input
                        type="tel"
                        value={editFormData.phone}
                        onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
                          updateEditFormData('phone', e.target.value)
                        }
                        className="w-full px-3 py-2 border border-gray-300 rounded-lg"
                        required
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">팩스</label>
                      <input
                        type="tel"
                        value={editFormData.details.fax}
                        onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
                          updateEditFormDetails('fax', e.target.value)
                        }
                        className="w-full px-3 py-2 border border-gray-300 rounded-lg"
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">이메일</label>
                      <input
                        type="email"
                        value={editFormData.email}
                        onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
                          updateEditFormData('email', e.target.value)
                        }
                        className="w-full px-3 py-2 border border-gray-300 rounded-lg"
                        required
                      />
                    </div>
                  </div>
                  <div className="space-y-4">
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">주소</label>
                      <textarea
                        value={editFormData.address}
                        onChange={(e: React.ChangeEvent<HTMLTextAreaElement>) =>
                          updateEditFormData('address', e.target.value)
                        }
                        className="w-full px-3 py-2 border border-gray-300 rounded-lg"
                        rows={3}
                        required
                      />
                    </div>
                  </div>
                </div>
              </div>

              {/* 담당자 정보 수정 */}
              <div className="border-t border-gray-200 pt-6">
                <h4 className="text-lg font-semibold text-gray-900 mb-4">담당자 정보</h4>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div className="space-y-4">
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">
                        담당자명
                      </label>
                      <input
                        type="text"
                        value={editFormData.details.manager.name}
                        onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
                          updateManagerInfo('name', e.target.value)
                        }
                        className="w-full px-3 py-2 border border-gray-300 rounded-lg"
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">직책</label>
                      <input
                        type="text"
                        value={editFormData.details.manager.position}
                        onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
                          updateManagerInfo('position', e.target.value)
                        }
                        className="w-full px-3 py-2 border border-gray-300 rounded-lg"
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">부서</label>
                      <input
                        type="text"
                        value={editFormData.details.manager.department}
                        onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
                          updateManagerInfo('department', e.target.value)
                        }
                        className="w-full px-3 py-2 border border-gray-300 rounded-lg"
                      />
                    </div>
                  </div>
                  <div className="space-y-4">
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">휴대폰</label>
                      <input
                        type="tel"
                        value={editFormData.details.manager.mobile}
                        onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
                          updateManagerInfo('mobile', e.target.value)
                        }
                        className="w-full px-3 py-2 border border-gray-300 rounded-lg"
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">
                        직통전화
                      </label>
                      <input
                        type="tel"
                        value={editFormData.details.manager.directPhone}
                        onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
                          updateManagerInfo('directPhone', e.target.value)
                        }
                        className="w-full px-3 py-2 border border-gray-300 rounded-lg"
                      />
                    </div>
                  </div>
                </div>
              </div>

              {/* 거래 정보 수정 */}
              <div className="border-t border-gray-200 pt-6">
                <h4 className="text-lg font-semibold text-gray-900 mb-4">거래 정보</h4>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div className="space-y-4">
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">
                        결제조건
                      </label>
                      <select
                        value={editFormData.details.paymentTerms}
                        onChange={(e: React.ChangeEvent<HTMLSelectElement>) =>
                          updateEditFormDetails('paymentTerms', e.target.value)
                        }
                        className="w-full px-3 py-2 border border-gray-300 rounded-lg pr-8"
                      >
                        <option value="즉시 결제">즉시 결제</option>
                        <option value="15일 후 결제">15일 후 결제</option>
                        <option value="30일 후 결제">30일 후 결제</option>
                        <option value="45일 후 결제">45일 후 결제</option>
                        <option value="60일 후 결제">60일 후 결제</option>
                        <option value="월말 결제">월말 결제</option>
                      </select>
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">
                        신용한도
                      </label>
                      <input
                        type="text"
                        value={editFormData.details.creditLimit}
                        onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
                          updateEditFormDetails('creditLimit', e.target.value)
                        }
                        className="w-full px-3 py-2 border border-gray-300 rounded-lg"
                      />
                    </div>
                  </div>
                  <div className="space-y-4">
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">
                        과세유형
                      </label>
                      <select
                        value={editFormData.details.taxType}
                        onChange={(e: React.ChangeEvent<HTMLSelectElement>) =>
                          updateEditFormDetails('taxType', e.target.value)
                        }
                        className="w-full px-3 py-2 border border-gray-300 rounded-lg pr-8"
                      >
                        <option value="일반과세">일반과세</option>
                        <option value="간이과세">간이과세</option>
                        <option value="면세">면세</option>
                      </select>
                    </div>
                  </div>
                </div>
              </div>

              {/* 비고 수정 */}
              <div className="border-t border-gray-200 pt-6">
                <label className="block text-sm font-medium text-gray-700 mb-1">비고</label>
                <textarea
                  value={editFormData.details.notes}
                  onChange={(e: React.ChangeEvent<HTMLTextAreaElement>) =>
                    updateEditFormDetails('notes', e.target.value)
                  }
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg"
                  rows={3}
                />
              </div>

              {/* 버튼 */}
              <div className="flex gap-3 pt-6 border-t border-gray-200">
                <button
                  type="button"
                  onClick={() => setShowEditModal(false)}
                  className="flex-1 px-4 py-2 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 transition-colors font-medium cursor-pointer whitespace-nowrap"
                >
                  취소
                </button>
                <button
                  type="button"
                  className="px-6 py-2 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 transition-colors font-medium cursor-pointer whitespace-nowrap"
                >
                  임시저장
                </button>
                <button
                  type="submit"
                  className="px-6 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors font-medium cursor-pointer whitespace-nowrap"
                >
                  저장
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
