import { DemandSource, WeeklyProductionData } from '@/app/(private)/production/types/MpsType';

interface DemandSourceModalProps {
  selectedWeek: WeeklyProductionData;
  productName: string;
  demandSources: DemandSource[];
  onClose: () => void;
}

export default function DemandSourceModal({
  selectedWeek,
  productName,
  demandSources,
  onClose,
}: DemandSourceModalProps) {
  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
      <div className="bg-white rounded-lg p-6 w-full max-w-2xl mx-4 max-h-[90vh] overflow-y-auto">
        <div className="flex items-center justify-between mb-6">
          <h3 className="text-xl font-semibold">{selectedWeek.week} 수요 출처</h3>
          <button onClick={onClose} className="text-gray-400 hover:text-gray-600 cursor-pointer">
            <i className="ri-close-line text-xl"></i>
          </button>
        </div>

        <div className="space-y-4">
          <div className="bg-blue-50 p-4 rounded-lg">
            <h4 className="font-medium text-blue-900 mb-2">수요 요약</h4>
            <div className="grid grid-cols-2 gap-4 text-sm">
              <div>
                <span className="text-blue-600">제품:</span>
                <span className="ml-2 font-medium">{productName}</span>
              </div>
              <div>
                <span className="text-blue-600">총 수요량:</span>
                <span className="ml-2 font-medium">{selectedWeek.demand}EA</span>
              </div>
            </div>
          </div>

          <div className="overflow-x-auto">
            <table className="min-w-full divide-y divide-gray-200">
              <thead className="bg-gray-50">
                <tr>
                  <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    견적서 번호
                  </th>
                  <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    고객사
                  </th>
                  <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    수량
                  </th>
                  <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    비율
                  </th>
                </tr>
              </thead>
              <tbody className="bg-white divide-y divide-gray-200">
                {demandSources.map((source, index) => (
                  <tr key={index} className="hover:bg-gray-50">
                    <td className="px-4 py-3 text-sm font-medium text-blue-600">{source.quote}</td>
                    <td className="px-4 py-3 text-sm text-gray-900">{source.customer}</td>
                    <td className="px-4 py-3 text-sm text-gray-900">{source.quantity}EA</td>
                    <td className="px-4 py-3 text-sm text-gray-900">
                      {Math.round((source.quantity / selectedWeek.demand) * 100)}%
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

        <div className="flex justify-end mt-6">
          <button
            onClick={onClose}
            className="px-4 py-2 bg-gray-600 text-white rounded-lg hover:bg-gray-700 transition-colors text-sm font-medium cursor-pointer"
          >
            닫기
          </button>
        </div>
      </div>
    </div>
  );
}
