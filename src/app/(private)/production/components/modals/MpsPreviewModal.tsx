import { SimulationResult } from '@/app/(private)/production/types/QuotationType';

interface MpsPreviewModalProps {
  simulationResult: SimulationResult;
  onClose: () => void;
  onConfirm: () => void;
}

export default function MpsPreviewModal({
  simulationResult,
  onClose,
  onConfirm,
}: MpsPreviewModalProps) {
  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
      <div className="bg-white rounded-lg p-6 w-full max-w-5xl mx-4 max-h-[90vh] overflow-y-auto">
        <div className="flex items-center justify-between mb-6">
          <h3 className="text-xl font-semibold">MPS 생성 Preview</h3>
          <button onClick={onClose} className="text-gray-400 hover:text-gray-600 cursor-pointer">
            <i className="ri-close-line text-xl"></i>
          </button>
        </div>

        <div className="space-y-6">
          {simulationResult.mpsResult.map((result, index) => (
            <div key={index} className="border border-gray-200 rounded-lg p-4">
              <h4 className="text-lg font-semibold text-gray-900 mb-4">
                {result.product} - {result.customer}
              </h4>

              <div className="overflow-x-auto">
                <table className="min-w-full border-collapse border border-gray-300">
                  <thead>
                    <tr className="bg-gray-50">
                      <th className="border border-gray-300 px-4 py-3 text-left text-sm font-medium text-gray-900">
                        구분
                      </th>
                      <th className="border border-gray-300 px-4 py-3 text-center text-sm font-medium text-gray-900">
                        2월 3주차
                      </th>
                      <th className="border border-gray-300 px-4 py-3 text-center text-sm font-medium text-gray-900">
                        2월 4주차
                      </th>
                      <th className="border border-gray-300 px-4 py-3 text-center text-sm font-medium text-gray-900">
                        3월 1주차
                      </th>
                      <th className="border border-gray-300 px-4 py-3 text-center text-sm font-medium text-gray-900">
                        3월 2주차
                      </th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr>
                      <td className="border border-gray-300 px-4 py-3 text-sm font-medium text-gray-900 bg-gray-50">
                        수요
                      </td>
                      <td className="border border-gray-300 px-4 py-3 text-center text-sm text-gray-900">
                        0
                      </td>
                      <td className="border border-gray-300 px-4 py-3 text-center text-sm text-gray-900">
                        0
                      </td>
                      <td className="border border-gray-300 px-4 py-3 text-center text-sm text-gray-900">
                        {result.quantity}
                      </td>
                      <td className="border border-gray-300 px-4 py-3 text-center text-sm text-gray-900">
                        0
                      </td>
                    </tr>
                    <tr>
                      <td className="border border-gray-300 px-4 py-3 text-sm font-medium text-gray-900 bg-gray-50">
                        재고 필요량
                      </td>
                      <td className="border border-gray-300 px-4 py-3 text-center text-sm text-gray-900">
                        0
                      </td>
                      <td className="border border-gray-300 px-4 py-3 text-center text-sm text-gray-900">
                        0
                      </td>
                      <td className="border border-gray-300 px-4 py-3 text-center text-sm text-gray-900">
                        {result.quantity}
                      </td>
                      <td className="border border-gray-300 px-4 py-3 text-center text-sm text-gray-900">
                        0
                      </td>
                    </tr>
                    <tr>
                      <td className="border border-gray-300 px-4 py-3 text-sm font-medium text-gray-900 bg-gray-50">
                        생산 소요량
                      </td>
                      <td className="border border-gray-300 px-4 py-3 text-center text-sm text-gray-900">
                        {Math.floor(result.quantity * 0.6)}
                      </td>
                      <td className="border border-gray-300 px-4 py-3 text-center text-sm text-gray-900">
                        {Math.floor(result.quantity * 0.4)}
                      </td>
                      <td className="border border-gray-300 px-4 py-3 text-center text-sm text-gray-900">
                        0
                      </td>
                      <td className="border border-gray-300 px-4 py-3 text-center text-sm text-gray-900">
                        0
                      </td>
                    </tr>
                    <tr>
                      <td className="border border-gray-300 px-4 py-3 text-sm font-medium text-gray-900 bg-blue-50">
                        계획 생산 (MPS)
                      </td>
                      <td className="border border-gray-300 px-4 py-3 text-center text-sm font-semibold text-blue-700 bg-blue-50">
                        {Math.floor(result.quantity * 0.6)}
                      </td>
                      <td className="border border-gray-300 px-4 py-3 text-center text-sm font-semibold text-blue-700 bg-blue-50">
                        {Math.floor(result.quantity * 0.4)}
                      </td>
                      <td className="border border-gray-300 px-4 py-3 text-center text-sm font-semibold text-blue-700 bg-blue-50">
                        0
                      </td>
                      <td className="border border-gray-300 px-4 py-3 text-center text-sm font-semibold text-blue-700 bg-blue-50">
                        0
                      </td>
                    </tr>
                  </tbody>
                </table>
              </div>
            </div>
          ))}

          <div className="flex gap-3 pt-4">
            <button
              onClick={onClose}
              className="flex-1 px-4 py-2 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 transition-colors text-sm font-medium cursor-pointer"
            >
              취소
            </button>
            <button
              onClick={onConfirm}
              className="flex-1 px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 transition-colors text-sm font-medium cursor-pointer"
            >
              MPS 확정
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
