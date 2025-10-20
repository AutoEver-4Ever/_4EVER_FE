'use client';

import { useState } from 'react';

interface BomItem {
  id: string;
  productCode: string;
  productName: string;
  version: string;
  status: string;
  createdDate: string;
  lastModified: string;
  components: Array<{
    id: string;
    code: string;
    type: string;
    name: string;
    quantity: number;
    unit: string;
    level: number;
    material: string;
    supplier: string;
    process: string;
  }>;
  processes: Array<{
    id: string;
    sequence: number;
    name: string;
    workCenter: string;
    setupTime: number;
    runTime: number;
  }>;
}

interface ComponentRow {
  id: string;
  code: string;
  type: string;
  name: string;
  quantity: number;
  unit: string;
  level: number;
  material: string;
  supplier: string;
  process: string;
}

export default function BomTab() {
  const [selectedBom, setSelectedBom] = useState<BomItem | null>(null);
  const [showModal, setShowModal] = useState(false);
  const [showCreateModal, setShowCreateModal] = useState(false);
  const [editingBom, setEditingBom] = useState<BomItem | null>(null);
  const [componentRows, setComponentRows] = useState<ComponentRow[]>([
    {
      id: '1',
      code: '',
      type: '부품',
      name: '',
      quantity: 1,
      unit: '',
      level: 1,
      material: '',
      supplier: '',
      process: '',
    },
  ]);

  // 드롭다운 옵션들
  const typeOptions = ['부품', '원자재'];
  const levelOptions = [1, 2, 3];
  const materialOptions = ['스틸', '알루미늄', '플라스틱', '고무', '전자부품', '화학소재'];
  const supplierOptions = ['공급사A', '공급사B', '공급사C', '공급사D'];
  const processOptions = ['사출성형', '절삭가공', '용접', '조립', '도장', '검사'];

  // 자재별 공급사 매핑
  const materialSupplierMap: Record<string, string[]> = {
    스틸: ['공급사A', '공급사B'],
    알루미늄: ['공급사B', '공급사C'],
    플라스틱: ['공급사C', '공급사D'],
    고무: ['공급사A', '공급사D'],
    전자부품: ['공급사B', '공급사C'],
    화학소재: ['공급사A', '공급사C'],
  };

  // 공급사별 공정 매핑
  const supplierProcessMap: Record<string, string[]> = {
    공급사A: ['사출성형', '용접'],
    공급사B: ['절삭가공', '조립'],
    공급사C: ['도장', '검사'],
    공급사D: ['사출성형', '조립'],
  };

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
    setComponentRows(bom.components.map((comp) => ({ ...comp })));
    setShowCreateModal(true);
  };

  const handleDelete = (bomId: string) => {
    if (confirm('정말로 이 BOM을 삭제하시겠습니까?')) {
      console.log('BOM 삭제:', bomId);
    }
  };

  const handleCreate = () => {
    setEditingBom(null);
    setComponentRows([
      {
        id: '1',
        code: '',
        type: '부품',
        name: '',
        quantity: 1,
        unit: '',
        level: 1,
        material: '',
        supplier: '',
        process: '',
      },
    ]);
    setShowCreateModal(true);
  };

  const addComponentRow = () => {
    const newRow: ComponentRow = {
      id: Date.now().toString(),
      code: '',
      type: '부품',
      name: '',
      quantity: 1,
      unit: '',
      level: 1,
      material: '',
      supplier: '',
      process: '',
    };
    setComponentRows([...componentRows, newRow]);
  };

  const removeComponentRow = (id: string) => {
    if (componentRows.length > 1) {
      setComponentRows(componentRows.filter((row) => row.id !== id));
    }
  };

  // const updateComponentRow = (id: string, field: keyof ComponentRow, value: any) => {
  //   setComponentRows(
  //     componentRows.map((row) => {
  //       if (row.id === id) {
  //         const updatedRow = { ...row, [field]: value };

  //         // 자재 변경 시 공급사와 공정 초기화
  //         if (field === 'material') {
  //           updatedRow.supplier = '';
  //           updatedRow.process = '';
  //         }

  //         // 공급사 변경 시 공정 초기화
  //         if (field === 'supplier') {
  //           updatedRow.process = '';
  //         }

  //         return updatedRow;
  //       }
  //       return row;
  //     }),
  //   );
  // };

  const getAvailableSuppliers = (material: string) => {
    return materialSupplierMap[material] || [];
  };

  const getAvailableProcesses = (supplier: string) => {
    return supplierProcessMap[supplier] || [];
  };

  const renderLevelStructure = (components: BomItem['components']) => {
    const levels = components.reduce(
      (acc, comp) => {
        if (!acc[comp.level]) acc[comp.level] = [];
        acc[comp.level].push(comp);
        return acc;
      },
      {} as Record<number, typeof components>,
    );

    return (
      <div className="space-y-4">
        {Object.entries(levels).map(([level, comps]) => (
          <div key={level} className="ml-4" style={{ marginLeft: `${parseInt(level) * 20}px` }}>
            <div className="text-sm font-medium text-gray-600 mb-2">Level {level}</div>
            {comps.map((comp) => (
              <div key={comp.id} className="flex items-center space-x-2 p-2 bg-gray-50 rounded">
                <i className="ri-arrow-right-s-line text-gray-400"></i>
                <span className="font-medium">{comp.code}</span>
                <span>{comp.name}</span>
                <span className="text-sm text-gray-500">
                  ({comp.quantity} {comp.unit})
                </span>
              </div>
            ))}
          </div>
        ))}
      </div>
    );
  };

  return (
    <div>
      <div className="flex justify-between items-center mb-6">
        <h3 className="text-lg font-semibold text-gray-900">BOM 목록</h3>
        <button
          onClick={handleCreate}
          className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 flex items-center space-x-2 whitespace-nowrap"
        >
          <i className="ri-add-line"></i>
          <span>BOM 생성</span>
        </button>
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
                    className="text-blue-600 hover:text-blue-900"
                  >
                    상세보기
                  </button>
                  <button
                    onClick={() => handleEdit(bom)}
                    className="text-green-600 hover:text-green-900"
                  >
                    수정
                  </button>
                  <button
                    onClick={() => handleDelete(bom.id)}
                    className="text-red-600 hover:text-red-900"
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
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white rounded-lg max-w-6xl w-full mx-4 max-h-[90vh] overflow-y-auto">
            <div className="p-6 border-b border-gray-200">
              <div className="flex justify-between items-center">
                <h3 className="text-lg font-semibold text-gray-900">BOM 상세 정보</h3>
                <button
                  onClick={() => setShowModal(false)}
                  className="text-gray-400 hover:text-gray-600"
                >
                  <i className="ri-close-line text-xl"></i>
                </button>
              </div>
            </div>

            <div className="p-6 space-y-6">
              {/* 제품 기본 정보 */}
              <div>
                <h4 className="text-md font-semibold text-gray-900 mb-4">제품 기본 정보</h4>
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="text-sm font-medium text-gray-500">제품명</label>
                    <p className="text-sm text-gray-900">{selectedBom.productName}</p>
                  </div>
                  <div>
                    <label className="text-sm font-medium text-gray-500">제품 코드</label>
                    <p className="text-sm text-gray-900">{selectedBom.productCode}</p>
                  </div>
                  <div>
                    <label className="text-sm font-medium text-gray-500">버전</label>
                    <p className="text-sm text-gray-900">{selectedBom.version}</p>
                  </div>
                  <div>
                    <label className="text-sm font-medium text-gray-500">상태</label>
                    <p className="text-sm text-gray-900">{selectedBom.status}</p>
                  </div>
                </div>
              </div>

              {/* 구성품 리스트 */}
              <div>
                <h4 className="text-md font-semibold text-gray-900 mb-4">구성품 리스트</h4>
                <div className="overflow-x-auto">
                  <table className="min-w-full divide-y divide-gray-200">
                    <thead className="bg-gray-50">
                      <tr>
                        <th className="px-4 py-2 text-left text-xs font-medium text-gray-500 uppercase">
                          제품 코드
                        </th>
                        <th className="px-4 py-2 text-left text-xs font-medium text-gray-500 uppercase">
                          타입
                        </th>
                        <th className="px-4 py-2 text-left text-xs font-medium text-gray-500 uppercase">
                          품목명
                        </th>
                        <th className="px-4 py-2 text-left text-xs font-medium text-gray-500 uppercase">
                          수량
                        </th>
                        <th className="px-4 py-2 text-left text-xs font-medium text-gray-500 uppercase">
                          단위
                        </th>
                        <th className="px-4 py-2 text-left text-xs font-medium text-gray-500 uppercase">
                          레벨
                        </th>
                        <th className="px-4 py-2 text-left text-xs font-medium text-gray-500 uppercase">
                          자재
                        </th>
                        <th className="px-4 py-2 text-left text-xs font-medium text-gray-500 uppercase">
                          공급사
                        </th>
                        <th className="px-4 py-2 text-left text-xs font-medium text-gray-500 uppercase">
                          공정
                        </th>
                      </tr>
                    </thead>
                    <tbody className="bg-white divide-y divide-gray-200">
                      {selectedBom.components.map((comp) => (
                        <tr key={comp.id}>
                          <td className="px-4 py-2 text-sm text-gray-900">{comp.code}</td>
                          <td className="px-4 py-2 text-sm text-gray-900">{comp.type}</td>
                          <td className="px-4 py-2 text-sm text-gray-900">{comp.name}</td>
                          <td className="px-4 py-2 text-sm text-gray-900">{comp.quantity}</td>
                          <td className="px-4 py-2 text-sm text-gray-900">{comp.unit}</td>
                          <td className="px-4 py-2 text-sm text-gray-900">Level {comp.level}</td>
                          <td className="px-4 py-2 text-sm text-gray-900">{comp.material}</td>
                          <td className="px-4 py-2 text-sm text-gray-900">{comp.supplier}</td>
                          <td className="px-4 py-2 text-sm text-gray-900">{comp.process}</td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>

              {/* 레벨 구조 */}
              <div>
                <h4 className="text-md font-semibold text-gray-900 mb-4">레벨 구조</h4>
                {renderLevelStructure(selectedBom.components)}
              </div>

              {/* 공정 라우팅 정보 */}
              <div>
                <h4 className="text-md font-semibold text-gray-900 mb-4">공정 라우팅 정보</h4>
                <div className="overflow-x-auto">
                  <table className="min-w-full divide-y divide-gray-200">
                    <thead className="bg-gray-50">
                      <tr>
                        <th className="px-4 py-2 text-left text-xs font-medium text-gray-500 uppercase">
                          순서
                        </th>
                        <th className="px-4 py-2 text-left text-xs font-medium text-gray-500 uppercase">
                          공정명
                        </th>
                        <th className="px-4 py-2 text-left text-xs font-medium text-gray-500 uppercase">
                          작업장
                        </th>
                        <th className="px-4 py-2 text-left text-xs font-medium text-gray-500 uppercase">
                          준비시간(분)
                        </th>
                        <th className="px-4 py-2 text-left text-xs font-medium text-gray-500 uppercase">
                          가동시간(분)
                        </th>
                      </tr>
                    </thead>
                    <tbody className="bg-white divide-y divide-gray-200">
                      {selectedBom.processes.map((process) => (
                        <tr key={process.id}>
                          <td className="px-4 py-2 text-sm text-gray-900">{process.sequence}</td>
                          <td className="px-4 py-2 text-sm text-gray-900">{process.name}</td>
                          <td className="px-4 py-2 text-sm text-gray-900">{process.workCenter}</td>
                          <td className="px-4 py-2 text-sm text-gray-900">{process.setupTime}</td>
                          <td className="px-4 py-2 text-sm text-gray-900">{process.runTime}</td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* BOM 생성/수정 모달 */}
      {showCreateModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white rounded-lg max-w-7xl w-full mx-4 max-h-[90vh] overflow-y-auto">
            <div className="p-6 border-b border-gray-200">
              <div className="flex justify-between items-center">
                <h3 className="text-lg font-semibold text-gray-900">
                  {editingBom ? 'BOM 수정' : 'BOM 생성'}
                </h3>
                <button
                  onClick={() => setShowCreateModal(false)}
                  className="text-gray-400 hover:text-gray-600"
                >
                  <i className="ri-close-line text-xl"></i>
                </button>
              </div>
            </div>

            <div className="p-6">
              <form className="space-y-6">
                {/* 제품 기본 정보 */}
                <div>
                  <h4 className="text-md font-semibold text-gray-900 mb-4">제품 기본 정보</h4>
                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">
                        제품 코드
                      </label>
                      <input
                        type="text"
                        className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                        defaultValue={editingBom?.productCode || ''}
                        placeholder="PRD-001"
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">제품명</label>
                      <input
                        type="text"
                        className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                        defaultValue={editingBom?.productName || ''}
                        placeholder="제품명을 입력하세요"
                      />
                    </div>
                  </div>
                </div>

                {/* 구성품 리스트 */}
                <div>
                  <div className="flex justify-between items-center mb-4">
                    <h4 className="text-md font-semibold text-gray-900">구성품 리스트</h4>
                    <button
                      type="button"
                      onClick={addComponentRow}
                      className="bg-green-600 text-white px-3 py-1 rounded-md hover:bg-green-700 flex items-center space-x-1 text-sm whitespace-nowrap"
                    >
                      <i className="ri-add-line"></i>
                      <span>추가</span>
                    </button>
                  </div>

                  <div className="overflow-x-auto">
                    <table className="min-w-full divide-y divide-gray-200">
                      <thead className="bg-gray-50">
                        <tr>
                          <th className="px-3 py-2 text-left text-xs font-medium text-gray-500 uppercase">
                            제품 코드
                          </th>
                          <th className="px-3 py-2 text-left text-xs font-medium text-gray-500 uppercase">
                            타입
                          </th>
                          <th className="px-3 py-2 text-left text-xs font-medium text-gray-500 uppercase">
                            품목명
                          </th>
                          <th className="px-3 py-2 text-left text-xs font-medium text-gray-500 uppercase">
                            수량
                          </th>
                          <th className="px-3 py-2 text-left text-xs font-medium text-gray-500 uppercase">
                            단위
                          </th>
                          <th className="px-3 py-2 text-left text-xs font-medium text-gray-500 uppercase">
                            레벨
                          </th>
                          <th className="px-3 py-2 text-left text-xs font-medium text-gray-500 uppercase">
                            자재
                          </th>
                          <th className="px-3 py-2 text-left text-xs font-medium text-gray-500 uppercase">
                            공급사
                          </th>
                          <th className="px-3 py-2 text-left text-xs font-medium text-gray-500 uppercase">
                            공정
                          </th>
                          <th className="px-3 py-2 text-left text-xs font-medium text-gray-500 uppercase">
                            작업
                          </th>
                        </tr>
                      </thead>
                      <tbody className="bg-white divide-y divide-gray-200">
                        {componentRows.map((row) => (
                          <tr key={row.id}>
                            <td className="px-3 py-2">
                              <input
                                type="text"
                                value={row.code}
                                // onChange={(e) => updateComponentRow(row.id, 'code', e.target.value)}
                                className="w-full px-2 py-1 border border-gray-300 rounded text-sm focus:outline-none focus:ring-1 focus:ring-blue-500"
                                placeholder="MAT-001"
                              />
                            </td>
                            <td className="px-3 py-2">
                              <select
                                value={row.type}
                                // onChange={(e) => updateComponentRow(row.id, 'type', e.target.value)}
                                className="w-full px-2 py-1 border border-gray-300 rounded text-sm focus:outline-none focus:ring-1 focus:ring-blue-500 pr-8"
                              >
                                {typeOptions.map((type) => (
                                  <option key={type} value={type}>
                                    {type}
                                  </option>
                                ))}
                              </select>
                            </td>
                            <td className="px-3 py-2">
                              <input
                                type="text"
                                value={row.name}
                                // onChange={(e) => updateComponentRow(row.id, 'name', e.target.value)}
                                className="w-full px-2 py-1 border border-gray-300 rounded text-sm focus:outline-none focus:ring-1 focus:ring-blue-500"
                                placeholder="품목명"
                              />
                            </td>
                            <td className="px-3 py-2">
                              <input
                                type="number"
                                value={row.quantity}
                                // onChange={(e) =>
                                //   // updateComponentRow(
                                //   //   row.id,
                                //   //   'quantity',
                                //   //   parseInt(e.target.value) || 1,
                                //   // )
                                // }
                                className="w-full px-2 py-1 border border-gray-300 rounded text-sm focus:outline-none focus:ring-1 focus:ring-blue-500"
                                min="1"
                              />
                            </td>
                            <td className="px-3 py-2">
                              <input
                                type="text"
                                value={row.unit}
                                // onChange={(e) => updateComponentRow(row.id, 'unit', e.target.value)}
                                className="w-full px-2 py-1 border border-gray-300 rounded text-sm focus:outline-none focus:ring-1 focus:ring-blue-500"
                                placeholder="EA"
                              />
                            </td>
                            <td className="px-3 py-2">
                              <select
                                value={row.level}
                                // onChange={(e) =>
                                //   // updateComponentRow(row.id, 'level', parseInt(e.target.value))
                                // }
                                className="w-full px-2 py-1 border border-gray-300 rounded text-sm focus:outline-none focus:ring-1 focus:ring-blue-500 pr-8"
                              >
                                {levelOptions.map((level) => (
                                  <option key={level} value={level}>
                                    Level {level}
                                  </option>
                                ))}
                              </select>
                            </td>
                            <td className="px-3 py-2">
                              <select
                                value={row.material}
                                // onChange={(e) =>
                                //   // updateComponentRow(row.id, 'material', e.target.value)
                                // }
                                className="w-full px-2 py-1 border border-gray-300 rounded text-sm focus:outline-none focus:ring-1 focus:ring-blue-500 pr-8"
                              >
                                <option value="">선택</option>
                                {materialOptions.map((material) => (
                                  <option key={material} value={material}>
                                    {material}
                                  </option>
                                ))}
                              </select>
                            </td>
                            <td className="px-3 py-2">
                              <select
                                value={row.supplier}
                                // onChange={(e) =>
                                //   // updateComponentRow(row.id, 'supplier', e.target.value)
                                // }
                                className="w-full px-2 py-1 border border-gray-300 rounded text-sm focus:outline-none focus:ring-1 focus:ring-blue-500 pr-8"
                                disabled={!row.material}
                              >
                                <option value="">선택</option>
                                {getAvailableSuppliers(row.material).map((supplier) => (
                                  <option key={supplier} value={supplier}>
                                    {supplier}
                                  </option>
                                ))}
                              </select>
                            </td>
                            <td className="px-3 py-2">
                              <select
                                value={row.process}
                                // onChange={(e) =>
                                //   // updateComponentRow(row.id, 'process', e.target.value)
                                // }
                                className="w-full px-2 py-1 border border-gray-300 rounded text-sm focus:outline-none focus:ring-1 focus:ring-blue-500 pr-8"
                                disabled={!row.supplier}
                              >
                                <option value="">선택</option>
                                {getAvailableProcesses(row.supplier).map((process) => (
                                  <option key={process} value={process}>
                                    {process}
                                  </option>
                                ))}
                              </select>
                            </td>
                            <td className="px-3 py-2">
                              <button
                                type="button"
                                onClick={() => removeComponentRow(row.id)}
                                className="text-red-600 hover:text-red-800 disabled:text-gray-400"
                                disabled={componentRows.length === 1}
                              >
                                <i className="ri-delete-bin-line"></i>
                              </button>
                            </td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>
                </div>

                <div className="flex justify-end space-x-3 pt-4">
                  <button
                    type="button"
                    onClick={() => setShowCreateModal(false)}
                    className="px-4 py-2 text-gray-700 bg-gray-200 rounded-md hover:bg-gray-300 whitespace-nowrap"
                  >
                    취소
                  </button>
                  <button
                    type="submit"
                    className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 whitespace-nowrap"
                  >
                    {editingBom ? '수정' : '생성'}
                  </button>
                </div>
              </form>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
