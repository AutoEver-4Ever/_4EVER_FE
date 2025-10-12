'use client';

import { useState } from 'react';
import CustomerDetailModal from '@/app/sales/components/CustomerDetailModal';
import NewCustomerModal from '@/app/sales/components/NewCustomerModal';
import { SalesCustomerDetailType } from '@/app/sales/types/SalesCustomerDetailType';
import { SalesCustomerListType } from '@/app/sales/types/SalesCustomerListType';
import CustomerEditModal from './CustomerEditModal';
const CustomerList = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [showDetailModal, setShowDetailModal] = useState(false);
  const [selectedCustomerId, setSelectedCustomerId] = useState('');
  const [showCustomerModal, setShowCustomerModal] = useState(false);
  const [customers, setCustomers] = useState<SalesCustomerListType[]>([
    {
      id: 'C-001',
      name: '삼성전자',
      manager: {
        name: '김철수',
        email: 'kim@samsung.com',
        mobile: '010-1234-5678',
      },
      address: '서울시 강남구 테헤란로 123',
      dealInfo: {
        totalOrders: 45,
        totalAmount: '₩1,250,000,000',
      },
      status: '활성',
    },
    {
      id: 'C-002',
      name: 'LG화학',
      manager: {
        name: '박영희',
        email: 'park@lgchem.com',
        mobile: '010-2345-6789',
      },
      address: '서울시 영등포구 여의도동 456',
      dealInfo: {
        totalOrders: 32,
        totalAmount: '₩890,000,000',
      },
      status: '활성',
    },
    {
      id: 'C-003',
      name: '현대자동차',
      manager: {
        name: '이민수',
        email: 'lee@hyundai.com',
        mobile: '010-3456-7890',
      },
      address: '서울시 서초구 양재동 789',
      dealInfo: {
        totalOrders: 28,
        totalAmount: '₩720,000,000',
      },
      status: '활성',
    },
    {
      id: 'C-004',
      name: '대한철강',
      manager: {
        name: '최정호',
        email: 'choi@dksteel.com',
        mobile: '010-4567-8901',
      },
      address: '경기도 안산시 단원구 123',
      dealInfo: {
        totalOrders: 18,
        totalAmount: '₩420,000,000',
      },
      status: '활성',
    },
    {
      id: 'C-005',
      name: '한국금속',
      manager: {
        name: '김수진',
        email: 'kim@kmetal.com',
        mobile: '010-5678-9012',
      },
      address: '인천시 남동구 구월동 456',
      dealInfo: {
        totalOrders: 12,
        totalAmount: '₩180,000,000',
      },
      status: '비활성',
    },
  ]);
  const handleCustomerRegisterClick = () => {
    setShowCustomerModal(true);
  };

  const getStatusColor = (status: string) => {
    return status === '활성' ? 'bg-green-100 text-green-800' : 'bg-gray-100 text-gray-800';
  };

  const filteredCustomers = customers.filter((customer) => {
    const matchesSearch =
      customer.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      customer.manager.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      customer.id.toLowerCase().includes(searchTerm.toLowerCase());
    return matchesSearch;
  });

  const handleViewClick = (id: string) => {
    setSelectedCustomerId(id);
    setShowDetailModal(true);
  };

  const [showEditModal, setShowEditModal] = useState(false);
  const [editFormData, setEditFormData] = useState<SalesCustomerDetailType | null>(null);
  const handleEditClick = (customer: SalesCustomerDetailType) => {
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
            {filteredCustomers.map((customer) => (
              <tr key={customer.id} className="hover:bg-gray-50">
                <td className="px-6 py-4 whitespace-nowrap">
                  <div className="flex items-center">
                    <div>
                      <div className="text-sm font-medium text-gray-900">{customer.name}</div>
                      <div className="text-xs text-gray-500">{customer.id}</div>
                    </div>
                  </div>
                </td>

                <td className="px-6 py-4">
                  <div className="text-sm text-gray-900">{customer.manager.name}</div>
                  <div className="text-xs text-gray-500">{customer.manager.mobile}</div>
                  <div className="text-xs text-gray-500">{customer.manager.email}</div>
                </td>
                <td className="px-6 py-4">
                  <div className="text-sm text-gray-900 max-w-xs truncate">{customer.address}</div>
                </td>
                <td className="px-6 py-4 whitespace-nowrap">
                  <div className="text-sm font-medium text-gray-900">
                    {customer.dealInfo.totalAmount}
                  </div>
                  <div className="text-xs text-gray-500">{customer.dealInfo.totalOrders}건</div>
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
                      onClick={() => handleViewClick(customer.id)}
                      className="text-gray-600 hover:text-gray-500 cursor-pointer"
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
