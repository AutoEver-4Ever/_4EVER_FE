'use client';
import { useState } from 'react';
import Dropdown from '@/app/components/common/Dropdown';
import Button from '@/app/components/common/Button';
import { PRODUCTS } from '../../constants';
import { KeyValueItem } from '@/app/types/CommonType';

// 필요한 타입 정의
interface NetRequirement {
  id: string;
  material: string;
  requiredQuantity: number;
  currentStock: number;
  safetyStock: number;
  availableStock: number;
  availableStatus: string;
  shortageQuantity: number;
  materialType: string;
  procurementStartDate: string | null;
  expectedArrivalDate: string | null;
  supplier: string;
}

export default function RequirementsTab() {
  const [selectedProduct, setSelectedProduct] = useState('ALL');
  const [selectedQuote, setSelectedQuote] = useState('ALL');
  const [selectedRequirements, setSelectedRequirements] = useState<string[]>([]);

  const netRequirements: NetRequirement[] = [
    {
      id: 'req-1',
      material: '자재A',
      requiredQuantity: 1000,
      currentStock: 800,
      safetyStock: 100,
      availableStock: 700,
      availableStatus: '부족',
      shortageQuantity: 300,
      materialType: '원자재',
      procurementStartDate: '2024-10-25',
      expectedArrivalDate: '2024-11-05',
      supplier: '공급사A',
    },
    {
      id: 'req-2',
      material: '자재B',
      requiredQuantity: 500,
      currentStock: 600,
      safetyStock: 100,
      availableStock: 500,
      availableStatus: '충분',
      shortageQuantity: 0,
      materialType: '원자재',
      procurementStartDate: '2024-10-22',
      expectedArrivalDate: '2024-10-29',
      supplier: '공급사B',
    },
    {
      id: 'req-3',
      material: '반제품C',
      requiredQuantity: 1200,
      currentStock: 400,
      safetyStock: 200,
      availableStock: 200,
      availableStatus: '부족',
      shortageQuantity: 1000,
      materialType: '반제품',
      procurementStartDate: '2024-10-27',
      expectedArrivalDate: '2024-11-08',
      supplier: '협력업체C',
    },
    {
      id: 'req-4',
      material: '완제품D',
      requiredQuantity: 300,
      currentStock: 350,
      safetyStock: 50,
      availableStock: 300,
      availableStatus: '충분',
      shortageQuantity: 0,
      materialType: '완제품',
      procurementStartDate: '2024-10-20',
      expectedArrivalDate: '2024-10-28',
      supplier: '공급사D',
    },
    {
      id: 'req-5',
      material: '자재E',
      requiredQuantity: 2000,
      currentStock: 1200,
      safetyStock: 300,
      availableStock: 900,
      availableStatus: '부족',
      shortageQuantity: 1100,
      materialType: '원자재',
      procurementStartDate: '2024-10-30',
      expectedArrivalDate: '2024-11-12',
      supplier: '공급사E',
    },
    {
      id: 'req-6',
      material: '자재F',
      requiredQuantity: 800,
      currentStock: 900,
      safetyStock: 100,
      availableStock: 800,
      availableStatus: '충분',
      shortageQuantity: 0,
      materialType: '보조자재',
      procurementStartDate: '2024-10-18',
      expectedArrivalDate: '2024-10-25',
      supplier: '공급사F',
    },
    {
      id: 'req-7',
      material: '반제품G',
      requiredQuantity: 600,
      currentStock: 500,
      safetyStock: 100,
      availableStock: 400,
      availableStatus: '부족',
      shortageQuantity: 200,
      materialType: '반제품',
      procurementStartDate: '2024-10-24',
      expectedArrivalDate: '2024-11-02',
      supplier: '협력업체G',
    },
    {
      id: 'req-8',
      material: '자재H',
      requiredQuantity: 1500,
      currentStock: 1600,
      safetyStock: 200,
      availableStock: 1400,
      availableStatus: '충분',
      shortageQuantity: 0,
      materialType: '원자재',
      procurementStartDate: '2024-10-15',
      expectedArrivalDate: '2024-10-22',
      supplier: '공급사H',
    },
    {
      id: 'req-9',
      material: '자재I',
      requiredQuantity: 1000,
      currentStock: 700,
      safetyStock: 200,
      availableStock: 500,
      availableStatus: '부족',
      shortageQuantity: 500,
      materialType: '원자재',
      procurementStartDate: '2024-10-28',
      expectedArrivalDate: '2024-11-10',
      supplier: '공급사I',
    },
    {
      id: 'req-10',
      material: '완제품J',
      requiredQuantity: 400,
      currentStock: 450,
      safetyStock: 50,
      availableStock: 400,
      availableStatus: '충분',
      shortageQuantity: 0,
      materialType: '완제품',
      procurementStartDate: '2024-10-19',
      expectedArrivalDate: '2024-10-26',
      supplier: '공급사J',
    },
  ];

  // 견적 목록
  const quotes: KeyValueItem[] = [
    { key: 'ALL', value: '전체 견적' },
    { key: 'Q_2024_001', value: 'Q-2024-001' },
    { key: 'Q_2024_002', value: 'Q-2024-002' },
    { key: 'Q_2024_003', value: 'Q-2024-003' },
    { key: 'Q_2024_004', value: 'Q-2024-004' },
    { key: 'Q_2024_005', value: 'Q-2024-005' },
  ];

  const handleSelectAllRequirements = () => {
    if (selectedRequirements.length === netRequirements.length) {
      setSelectedRequirements([]);
    } else {
      setSelectedRequirements(netRequirements.map((item) => item.id));
    }
  };

  const handleRequirementSelection = (id: string) => {
    setSelectedRequirements((prev) =>
      prev.includes(id) ? prev.filter((itemId) => itemId !== id) : [...prev, id],
    );
  };

  const handleConvertToPlannedOrder = () => {
    console.log('계획 주문 전환:', selectedRequirements);
    // 실제 로직 구현
  };

  const getAvailableStatusBadge = (status: string) => {
    const statusConfig: Record<string, { bg: string; text: string }> = {
      충분: { bg: 'bg-green-100', text: 'text-green-800' },
      부족: { bg: 'bg-red-100', text: 'text-red-800' },
      보통: { bg: 'bg-yellow-100', text: 'text-yellow-800' },
    };
    const config = statusConfig[status] || statusConfig['보통'];
    return (
      <span
        className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${config.bg} ${config.text}`}
      >
        {status}
      </span>
    );
  };

  return (
    <div className="space-y-4">
      <div className="bg-white border border-gray-200 rounded-lg overflow-hidden">
        <div className="flex justify-between items-center p-4 bg-gray-50 border-b border-gray-200">
          <h2 className="text-md font-semibold text-gray-900">순소요 - 무엇이 얼마나 부족한가?</h2>
          <div className="flex gap-4 justify-end items-center">
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
                  <td className="px-4 py-3 text-sm font-medium text-gray-900">{item.material}</td>
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
  );
}
