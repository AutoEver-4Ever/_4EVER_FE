'use client';

import Button from '@/app/components/common/Button';
import { useState } from 'react';
import PurchaseRequestModal from '@/app/(private)/production/components/modals/PurchaseRequestModal';
import { NetRequirement, PlannedOrder } from '@/app/(private)/production/types/MrpType';
import Dropdown from '@/app/components/common/Dropdown';
import { KeyValueItem } from '@/app/types/CommonType';
import { PRODUCTS } from '@/app/(private)/production/constants';

type SubTab = 'requirements' | 'orders';

export default function MrpTab() {
  const [activeSubTab, setActiveSubTab] = useState<SubTab>('requirements');
  const [selectedProduct, setSelectedProduct] = useState('ALL');
  const [selectedQuote, setSelectedQuote] = useState('ALL');
  const [selectedRequirements, setSelectedRequirements] = useState<string[]>([]);
  const [selectedOrders, setSelectedOrders] = useState<string[]>([]);
  const [showPurchaseRequestModal, setShowPurchaseRequestModal] = useState(false);

  // 견적 목록
  const quotes: KeyValueItem[] = [
    { key: 'ALL', value: '전체 견적' },
    { key: 'Q_2024_001', value: 'Q-2024-001' },
    { key: 'Q_2024_002', value: 'Q-2024-002' },
    { key: 'Q_2024_003', value: 'Q-2024-003' },
    { key: 'Q_2024_004', value: 'Q-2024-004' },
    { key: 'Q_2024_005', value: 'Q-2024-005' },
  ];

  const netRequirements: NetRequirement[] = [
    {
      id: 'REQ-001',
      material: '스테인리스 스틸',
      requiredQuantity: 500,
      currentStock: 200,
      safetyStock: 50,
      availableStock: 150,
      availableStatus: 'SHORTAGE',
      shortageQuantity: 350,
      materialType: '구매품',
      procurementStartDate: '2024-02-01',
      expectedArrivalDate: '2024-02-08',
      supplier: '포스코',
    },
    {
      id: 'REQ-002',
      material: '구리선',
      requiredQuantity: 800,
      currentStock: 300,
      safetyStock: 100,
      availableStock: 200,
      availableStatus: 'SHORTAGE',
      shortageQuantity: 600,
      materialType: '구매품',
      procurementStartDate: '2024-02-02',
      expectedArrivalDate: '2024-02-09',
      supplier: 'LS전선',
    },
    {
      id: 'REQ-003',
      material: '베어링 6205',
      requiredQuantity: 200,
      currentStock: 150,
      safetyStock: 30,
      availableStock: 120,
      availableStatus: 'SHORTAGE',
      shortageQuantity: 80,
      materialType: '구매품',
      procurementStartDate: '2024-02-03',
      expectedArrivalDate: '2024-02-07',
      supplier: 'SKF코리아',
    },
    {
      id: 'REQ-004',
      material: '볼트 M8x20',
      requiredQuantity: 1000,
      currentStock: 1200,
      safetyStock: 200,
      availableStock: 1000,
      availableStatus: 'SUFFICIENT',
      shortageQuantity: 0,
      materialType: '구매품',
      procurementStartDate: '',
      expectedArrivalDate: '',
      supplier: '동양볼트',
    },
    {
      id: 'REQ-005',
      material: '알루미늄 프로파일',
      requiredQuantity: 300,
      currentStock: 100,
      safetyStock: 50,
      availableStock: 50,
      availableStatus: 'SHORTAGE',
      shortageQuantity: 250,
      materialType: '구매품',
      procurementStartDate: '2024-02-01',
      expectedArrivalDate: '2024-02-10',
      supplier: '한국알루미늄',
    },
  ];

  const plannedOrders: PlannedOrder[] = [
    {
      id: 'PO-2024-001',
      referenceQuote: 'Q-2024-001',
      material: '스테인리스 스틸',
      quantity: 400,
      procurementStartDate: '2024-02-01',
      deliveryDate: '2024-02-08',
      status: 'PLANNED',
      supplier: '포스코',
      unitPrice: 1200,
      totalPrice: 480000,
    },
    {
      id: 'PO-2024-002',
      referenceQuote: 'Q-2024-002',
      material: '구리선',
      quantity: 600,
      procurementStartDate: '2024-02-02',
      deliveryDate: '2024-02-09',
      status: 'WAITING',
      supplier: 'LS전선',
      unitPrice: 800,
      totalPrice: 480000,
    },
    {
      id: 'PO-2024-003',
      referenceQuote: 'Q-2024-001',
      material: '베어링 6205',
      quantity: 100,
      procurementStartDate: '2024-02-03',
      deliveryDate: '2024-02-07',
      status: 'APPROVED',
      supplier: 'SKF코리아',
      unitPrice: 15000,
      totalPrice: 1500000,
    },
    {
      id: 'PO-2024-004',
      referenceQuote: 'Q-2024-003',
      material: '알루미늄 프로파일',
      quantity: 300,
      procurementStartDate: '2024-02-01',
      deliveryDate: '2024-02-10',
      status: 'REJECTED',
      supplier: '한국알루미늄',
      unitPrice: 2500,
      totalPrice: 750000,
    },
  ];

  const getAvailableStatusBadge = (status: NetRequirement['availableStatus']) => {
    const statusConfig = {
      SUFFICIENT: { label: '충족', class: 'bg-green-100 text-green-800' },
      SHORTAGE: { label: '부족', class: 'bg-red-100 text-red-800' },
      WARNING: { label: '주의', class: 'bg-yellow-100 text-yellow-800' },
    };
    const config = statusConfig[status];
    return (
      <span className={`px-2 py-1 rounded-full text-xs font-medium ${config.class}`}>
        {config.label}
      </span>
    );
  };

  const getOrderStatusBadge = (status: PlannedOrder['status']) => {
    const statusConfig = {
      PLANNED: { label: '계획', class: 'bg-blue-100 text-blue-800' },
      WAITING: { label: '대기', class: 'bg-yellow-100 text-yellow-800' },
      APPROVED: { label: '승인', class: 'bg-green-100 text-green-800' },
      REJECTED: { label: '반려', class: 'bg-red-100 text-red-800' },
    };
    const config = statusConfig[status];
    return (
      <span className={`px-2 py-1 rounded-full text-xs font-medium ${config.class}`}>
        {config.label}
      </span>
    );
  };

  const handleRequirementSelection = (reqId: string) => {
    setSelectedRequirements((prev) =>
      prev.includes(reqId) ? prev.filter((id) => id !== reqId) : [...prev, reqId],
    );
  };

  const handleSelectAllRequirements = () => {
    if (selectedRequirements.length === netRequirements.length) {
      setSelectedRequirements([]);
    } else {
      setSelectedRequirements(netRequirements.map((req) => req.id));
    }
  };

  const handleConvertToPlannedOrder = () => {
    const selectedReqs = netRequirements.filter((req) => selectedRequirements.includes(req.id));

    if (selectedReqs.length === 0) {
      alert('계획 주문으로 전환할 항목을 선택해주세요.');
      return;
    }

    setActiveSubTab('orders');
    alert(`${selectedReqs.length}개 항목이 계획 주문으로 전환되었습니다.`);
    setSelectedRequirements([]);
  };

  const handleOrderSelection = (orderId: string) => {
    setSelectedOrders((prev) =>
      prev.includes(orderId) ? prev.filter((id) => id !== orderId) : [...prev, orderId],
    );
  };

  const handleSelectAllOrders = () => {
    if (selectedOrders.length === plannedOrders.length) {
      setSelectedOrders([]);
    } else {
      setSelectedOrders(plannedOrders.map((order) => order.id));
    }
  };

  const handlePurchaseRequest = () => {
    if (selectedOrders.length === 0) {
      alert('구매 요청할 항목을 선택해주세요.');
      return;
    }
    setShowPurchaseRequestModal(true);
  };

  const handleConfirmPurchaseRequest = (updatedOrders: PlannedOrder[]) => {
    alert('자재 구매 요청이 완료되었습니다.');
    setShowPurchaseRequestModal(false);
    setSelectedOrders([]);
  };

  const selectedOrdersData = plannedOrders.filter((order) => selectedOrders.includes(order.id));

  const subTabs = [
    { id: 'requirements' as SubTab, name: '순소요', icon: 'ri-file-list-3-line' },
    { id: 'orders' as SubTab, name: '계획 주문', icon: 'ri-shopping-cart-line' },
  ];

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h3 className="text-lg font-semibold text-gray-900">자재소요계획 (MRP)</h3>
      </div>

      {/* 서브 탭 */}
      <div className="border-b border-gray-200">
        <nav className="flex space-x-8">
          {subTabs.map((tab) => (
            <button
              key={tab.id}
              onClick={() => setActiveSubTab(tab.id)}
              className={`py-2 px-1 border-b-2 font-medium text-sm whitespace-nowrap flex items-center space-x-2 ${
                activeSubTab === tab.id
                  ? 'border-purple-500 text-purple-600'
                  : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
              }`}
            >
              <i className={`${tab.icon} text-lg`}></i>
              <span>{tab.name}</span>
            </button>
          ))}
        </nav>
      </div>

      {/* 순소요 탭 */}
      {activeSubTab === 'requirements' && (
        <div className="space-y-4">
          {/* 필터 영역 */}

          <div className="bg-white border border-gray-200 rounded-lg overflow-hidden">
            <div className="flex justify-between items-center p-4 bg-gray-50 border-b border-gray-200">
              <h2 className="text-md font-semibold text-gray-900">
                순소요 - 무엇이 얼마나 부족한가?
              </h2>
              <div className="flex gap-4 justify-end">
                <Dropdown
                  items={PRODUCTS}
                  value={selectedProduct}
                  onChange={(product: string) => {
                    setSelectedProduct(product);
                  }}
                />
                <Dropdown
                  items={quotes}
                  value={selectedQuote}
                  onChange={(quote: string) => {
                    setSelectedQuote(quote);
                  }}
                />
                <Button
                  label="계획 주문 전환"
                  onClick={handleConvertToPlannedOrder}
                  disabled={selectedRequirements.length === 0}
                />
              </div>
            </div>
            <div className="overflow-x-auto">
              <table className="min-w-full divide-y divide-gray-200">
                <thead className="bg-gray-50">
                  <tr>
                    <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      <input
                        type="checkbox"
                        checked={selectedRequirements.length === netRequirements.length}
                        onChange={handleSelectAllRequirements}
                        className="rounded border-gray-300 text-purple-600 focus:ring-purple-500 cursor-pointer"
                      />
                    </th>
                    <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      자재
                    </th>
                    <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      소요 수량
                    </th>
                    <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      현재 재고
                    </th>
                    <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      안전 재고
                    </th>
                    <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      가용 재고
                    </th>
                    <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      가용 재고 상태
                    </th>
                    <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      부족 재고
                    </th>
                    <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      자재 유형
                    </th>
                    <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      조달 시작일
                    </th>
                    <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      예상 도착일
                    </th>
                    <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      공급사
                    </th>
                  </tr>
                </thead>
                <tbody className="bg-white divide-y divide-gray-200">
                  {netRequirements.map((item) => (
                    <tr key={item.id} className="hover:bg-gray-50">
                      <td className="px-4 py-3">
                        <input
                          type="checkbox"
                          checked={selectedRequirements.includes(item.id)}
                          onChange={() => handleRequirementSelection(item.id)}
                          className="rounded border-gray-300 text-purple-600 focus:ring-purple-500 cursor-pointer"
                        />
                      </td>
                      <td className="px-4 py-3 text-sm font-medium text-gray-900">
                        {item.material}
                      </td>
                      <td className="px-4 py-3 text-sm text-gray-900">
                        {item.requiredQuantity.toLocaleString()}
                      </td>
                      <td className="px-4 py-3 text-sm text-gray-900">
                        {item.currentStock.toLocaleString()}
                      </td>
                      <td className="px-4 py-3 text-sm text-gray-900">
                        {item.safetyStock.toLocaleString()}
                      </td>
                      <td className="px-4 py-3 text-sm text-gray-900">
                        {item.availableStock.toLocaleString()}
                      </td>
                      <td className="px-4 py-3">{getAvailableStatusBadge(item.availableStatus)}</td>
                      <td className="px-4 py-3 text-sm">
                        {item.shortageQuantity > 0 ? (
                          <span className="text-red-600 font-medium">
                            {item.shortageQuantity.toLocaleString()}
                          </span>
                        ) : (
                          <span className="text-green-600">-</span>
                        )}
                      </td>
                      <td className="px-4 py-3 text-sm text-gray-900">{item.materialType}</td>
                      <td className="px-4 py-3 text-sm text-gray-900">
                        {item.procurementStartDate || '-'}
                      </td>
                      <td className="px-4 py-3 text-sm text-gray-900">
                        {item.expectedArrivalDate || '-'}
                      </td>
                      <td className="px-4 py-3 text-sm text-gray-900">{item.supplier}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      )}

      {/* 계획 주문 탭 */}
      {activeSubTab === 'orders' && (
        <div className="bg-white border border-gray-200 rounded-lg overflow-hidden">
          <div className="p-4 bg-gray-50 border-b border-gray-200 flex items-center justify-between">
            <h4 className="text-md font-semibold text-gray-900">
              계획 주문 - 무엇을 언제 발주 지시할까?
            </h4>
            <Button
              label={`자재 구매 요청`}
              onClick={handlePurchaseRequest}
              disabled={selectedOrders.length === 0}
            />
          </div>
          <div className="overflow-x-auto">
            <table className="min-w-full divide-y divide-gray-200">
              <thead className="bg-gray-50">
                <tr>
                  <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    <input
                      type="checkbox"
                      checked={selectedOrders.length === plannedOrders.length}
                      onChange={handleSelectAllOrders}
                      className="rounded border-gray-300 text-purple-600 focus:ring-purple-500 cursor-pointer"
                    />
                  </th>
                  <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    참조 견적서
                  </th>
                  <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    자재
                  </th>
                  <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    수량
                  </th>
                  <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    조달 시작일
                  </th>
                  <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    납기일
                  </th>
                  <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    상태
                  </th>
                  <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    작업
                  </th>
                </tr>
              </thead>
              <tbody className="bg-white divide-y divide-gray-200">
                {plannedOrders.map((order) => (
                  <tr key={order.id} className="hover:bg-gray-50">
                    <td className="px-4 py-3">
                      <input
                        type="checkbox"
                        checked={selectedOrders.includes(order.id)}
                        onChange={() => handleOrderSelection(order.id)}
                        className="rounded border-gray-300 text-purple-600 focus:ring-purple-500 cursor-pointer"
                      />
                    </td>
                    <td className="px-4 py-3 text-sm font-medium text-blue-600">
                      {order.referenceQuote}
                    </td>
                    <td className="px-4 py-3 text-sm text-gray-900">{order.material}</td>
                    <td className="px-4 py-3 text-sm text-gray-900">
                      {order.quantity.toLocaleString()}
                    </td>
                    <td className="px-4 py-3 text-sm text-gray-900">
                      {order.procurementStartDate}
                    </td>
                    <td className="px-4 py-3 text-sm text-gray-900">{order.deliveryDate}</td>
                    <td className="px-4 py-3">{getOrderStatusBadge(order.status)}</td>
                    <td className="px-4 py-3">
                      <button
                        className="text-blue-600 hover:text-blue-800 cursor-pointer"
                        title="상세보기"
                      >
                        <i className="ri-eye-line"></i>
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      )}

      {/* 자재 구매 요청 모달 */}
      {showPurchaseRequestModal && (
        <PurchaseRequestModal
          orders={selectedOrdersData}
          onClose={() => setShowPurchaseRequestModal(false)}
          onConfirm={handleConfirmPurchaseRequest}
        />
      )}
    </div>
  );
}
