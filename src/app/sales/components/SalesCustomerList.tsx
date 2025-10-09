'use client';

import { useState } from 'react';
import { Customer } from '@/app/sales/types/SalesCustomerList';
import CustomerDetailModal from '@/app/sales/components/CustomerDetailModal';
import CustomerEditModal from '@/app/sales/components/CustomerEditModal';
import NewCustomerModal from '@/app/sales/components/NewCustomerModal';
export default function CustomerList() {
  const [selectedType, setSelectedType] = useState('전체');
  const [searchTerm, setSearchTerm] = useState('');
  const [showDetailModal, setShowDetailModal] = useState(false);
  const [showEditModal, setShowEditModal] = useState(false);
  const [selectedCustomer, setSelectedCustomer] = useState<Customer | null>(null);
  const [editFormData, setEditFormData] = useState<Customer | null>(null);
  const [showCustomerModal, setShowCustomerModal] = useState(false);
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
  const handleCustomerRegisterClick = () => {
    setShowCustomerModal(true);
  };

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

  return (
    <div className="bg-white rounded-lg border border-gray-200">
      {/* 헤더 */}
      <div className="p-6 border-b border-gray-200">
        <div className="flex items-center justify-between mb-4">
          <h2 className="text-lg font-semibold text-gray-900">고객 관리</h2>
          <button
            onClick={handleCustomerRegisterClick}
            className="px-4 py-2 bg-blue-600 text-white font-medium rounded-lg hover:bg-blue-700 transition-colors duration-200 cursor-pointer whitespace-nowrap flex items-center space-x-2"
          >
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
      <CustomerDetailModal
        $showDetailModal={showDetailModal}
        $setShowDetailModal={setShowDetailModal}
        $selectedCustomer={selectedCustomer}
        $getStatusColor={getStatusColor}
        $handlePhoneClick={handlePhoneClick}
        $handleEditClick={handleEditClick}
      />

      {/* 고객 수정 모달 */}
      <CustomerEditModal
        $showEditModal={showEditModal}
        $setShowEditModal={setShowEditModal}
        $editFormData={editFormData}
        $setEditFormData={setEditFormData}
        $setCustomers={setCustomers}
      />
      <NewCustomerModal
        $showCustomerModal={showCustomerModal}
        $setShowCustomerModal={setShowCustomerModal}
      />
    </div>
  );
}
