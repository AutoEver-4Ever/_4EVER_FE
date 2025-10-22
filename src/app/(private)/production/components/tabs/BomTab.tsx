'use client';

import IconButton from '@/app/components/common/IconButton';
import { useState } from 'react';
import { BomItem } from '@/app/(private)/production/types/BomType';
import BomDetailModal from '@/app/(private)/production/components/modals/BomDetailModal';
import BomFormModal from '@/app/(private)/production/components/modals/BomFormModal';

export default function BomTab() {
  const [selectedBom, setSelectedBom] = useState<BomItem | null>(null);
  const [showModal, setShowModal] = useState(false);
  const [showCreateModal, setShowCreateModal] = useState(false);
  const [editingBom, setEditingBom] = useState<BomItem | null>(null);

  const bomItems: BomItem[] = [
    {
      id: '1',
      productCode: 'PRD-001',
      productName: '스마트폰 케이스',
      version: 'v1.2',
      status: '활성',
      createdDate: '2024-01-15',
      lastModified: '2024-01-20',
      components: [
        {
          id: '1',
          code: 'MAT-001',
          type: '원자재',
          name: 'TPU 소재',
          quantity: 1,
          unit: 'EA',
          level: 1,
          material: '플라스틱',
          supplier: '공급사C',
          process: '사출성형',
        },
        {
          id: '2',
          code: 'MAT-002',
          type: '부품',
          name: '실리콘 패드',
          quantity: 2,
          unit: 'EA',
          level: 2,
          material: '고무',
          supplier: '공급사D',
          process: '조립',
        },
        {
          id: '3',
          code: 'MAT-003',
          type: '부품',
          name: '포장재',
          quantity: 1,
          unit: 'SET',
          level: 1,
          material: '플라스틱',
          supplier: '공급사C',
          process: '검사',
        },
      ],
      processes: [
        {
          id: '1',
          sequence: 10,
          name: '사출성형',
          workCenter: 'WC-001',
          setupTime: 30,
          runTime: 5,
        },
        { id: '2', sequence: 20, name: '조립', workCenter: 'WC-002', setupTime: 15, runTime: 3 },
        { id: '3', sequence: 30, name: '포장', workCenter: 'WC-003', setupTime: 10, runTime: 2 },
      ],
    },
    {
      id: '2',
      productCode: 'PRD-002',
      productName: '무선 이어폰',
      version: 'v2.0',
      status: '활성',
      createdDate: '2024-01-10',
      lastModified: '2024-01-18',
      components: [
        {
          id: '4',
          code: 'ELE-001',
          type: '부품',
          name: '블루투스 칩',
          quantity: 1,
          unit: 'EA',
          level: 1,
          material: '전자부품',
          supplier: '공급사B',
          process: '조립',
        },
        {
          id: '5',
          code: 'ELE-002',
          type: '부품',
          name: '배터리',
          quantity: 2,
          unit: 'EA',
          level: 1,
          material: '전자부품',
          supplier: '공급사C',
          process: '검사',
        },
        {
          id: '6',
          code: 'MAT-004',
          type: '원자재',
          name: '플라스틱 하우징',
          quantity: 2,
          unit: 'EA',
          level: 2,
          material: '플라스틱',
          supplier: '공급사D',
          process: '사출성형',
        },
      ],
      processes: [
        {
          id: '4',
          sequence: 10,
          name: 'PCB 조립',
          workCenter: 'WC-004',
          setupTime: 45,
          runTime: 8,
        },
        {
          id: '5',
          sequence: 20,
          name: '하우징 조립',
          workCenter: 'WC-005',
          setupTime: 20,
          runTime: 4,
        },
        { id: '6', sequence: 30, name: '테스트', workCenter: 'WC-006', setupTime: 10, runTime: 5 },
      ],
    },
  ];

  const handleViewDetail = (bom: BomItem) => {
    setSelectedBom(bom);
    setShowModal(true);
  };

  const handleEdit = (bom: BomItem) => {
    setEditingBom(bom);
    setShowCreateModal(true);
  };

  const handleDelete = (bomId: string) => {
    if (confirm('정말로 이 BOM을 삭제하시겠습니까?')) {
      console.log('BOM 삭제:', bomId);
      alert('BOM이 삭제되었습니다.');
    }
  };

  const handleCreate = () => {
    setEditingBom(null);
    setShowCreateModal(true);
  };

  const handleSubmit = (data: Partial<BomItem>) => {
    console.log('BOM 데이터:', data);
    alert(editingBom ? 'BOM이 수정되었습니다.' : 'BOM이 생성되었습니다.');
    setShowCreateModal(false);
  };

  return (
    <div>
      <div className="flex justify-between items-center mb-6">
        <h3 className="text-lg font-semibold text-gray-900">BOM 목록</h3>
        <IconButton label="BOM 생성" icon="ri-add-line" onClick={handleCreate} />
      </div>

      <div className="overflow-x-auto">
        <table className="min-w-full divide-y divide-gray-200">
          <thead className="bg-gray-50">
            <tr>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                제품 정보
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                버전
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                상태
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                최종 수정일
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                작업
              </th>
            </tr>
          </thead>
          <tbody className="bg-white divide-y divide-gray-200">
            {bomItems.map((bom) => (
              <tr key={bom.id} className="hover:bg-gray-50">
                <td className="px-6 py-4 whitespace-nowrap">
                  <div>
                    <div className="text-sm font-medium text-gray-900">{bom.productName}</div>
                    <div className="text-sm text-gray-500">{bom.productCode}</div>
                  </div>
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">{bom.version}</td>
                <td className="px-6 py-4 whitespace-nowrap">
                  <span
                    className={`inline-flex px-2 py-1 text-xs font-semibold rounded-full ${
                      bom.status === '활성'
                        ? 'bg-green-100 text-green-800'
                        : 'bg-gray-100 text-gray-800'
                    }`}
                  >
                    {bom.status}
                  </span>
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                  {bom.lastModified}
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm font-medium space-x-2">
                  <button
                    onClick={() => handleViewDetail(bom)}
                    className="text-blue-600 hover:text-blue-900 cursor-pointer"
                  >
                    상세보기
                  </button>
                  <button
                    onClick={() => handleEdit(bom)}
                    className="text-green-600 hover:text-green-900 cursor-pointer"
                  >
                    수정
                  </button>
                  <button
                    onClick={() => handleDelete(bom.id)}
                    className="text-red-600 hover:text-red-900 cursor-pointer"
                  >
                    삭제
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* BOM 상세보기 모달 */}
      {showModal && selectedBom && (
        <BomDetailModal bom={selectedBom} onClose={() => setShowModal(false)} />
      )}

      {/* BOM 생성/수정 모달 */}
      {showCreateModal && (
        <BomFormModal
          editingBom={editingBom}
          onClose={() => setShowCreateModal(false)}
          onSubmit={handleSubmit}
        />
      )}
    </div>
  );
}
