import { BomItem } from '@/app/(private)/production/types/BomType';

interface BomDetailModalProps {
  bom: BomItem;
  onClose: () => void;
}

export default function BomDetailModal({ bom, onClose }: BomDetailModalProps) {
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
    <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50">
      <div className="bg-white rounded-lg max-w-6xl w-full mx-4 max-h-[90vh] overflow-y-auto">
        <div className="p-6 border-b border-gray-200">
          <div className="flex justify-between items-center">
            <h3 className="text-lg font-semibold text-gray-900">BOM 상세 정보</h3>
            <button onClick={onClose} className="text-gray-400 hover:text-gray-600">
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
                <p className="text-sm text-gray-900">{bom.productName}</p>
              </div>
              <div>
                <label className="text-sm font-medium text-gray-500">제품 코드</label>
                <p className="text-sm text-gray-900">{bom.productCode}</p>
              </div>
              <div>
                <label className="text-sm font-medium text-gray-500">버전</label>
                <p className="text-sm text-gray-900">{bom.version}</p>
              </div>
              <div>
                <label className="text-sm font-medium text-gray-500">상태</label>
                <p className="text-sm text-gray-900">{bom.status}</p>
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
                  {bom.components.map((comp) => (
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
            {renderLevelStructure(bom.components)}
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
                  {bom.processes.map((process) => (
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
  );
}
