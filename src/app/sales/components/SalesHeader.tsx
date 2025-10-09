'use client';

import { useState } from 'react';

const SalesHeader = () => {
  const [showNewOrderModal, setShowNewOrderModal] = useState(false);
  const [showCustomerModal, setShowCustomerModal] = useState(false);

  const handleNewOrderClick = () => {
    setShowNewOrderModal(true);
  };

  const handleCustomerRegisterClick = () => {
    setShowCustomerModal(true);
  };

  return (
    <div className="mb-8">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-gray-900">영업관리</h1>
          <p className="text-gray-600 mt-2">주문 및 고객 관리 시스템</p>
        </div>

        <div className="flex items-center space-x-3">
          <button
            onClick={handleCustomerRegisterClick}
            className="px-4 py-2 bg-blue-600 text-white font-medium rounded-lg hover:bg-blue-700 transition-colors duration-200 cursor-pointer whitespace-nowrap flex items-center space-x-2"
          >
            <i className="ri-user-add-line"></i>
            <span>고객 등록</span>
          </button>
        </div>
      </div>
    </div>
  );
};

export default SalesHeader;
