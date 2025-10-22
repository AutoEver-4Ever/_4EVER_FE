import { SimulationResult } from '@/app/(private)/production/types/QuotationType';

interface SimulationResultModalProps {
  simulationResult: SimulationResult;
  onClose: () => void;
  onConfirm: () => void;
}

export default function SimulationResultModal({
  simulationResult,
  onClose,
  onConfirm,
}: SimulationResultModalProps) {
  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
      <div className="bg-white rounded-lg p-6 w-full max-w-4xl mx-4 max-h-[90vh] overflow-y-auto">
        <div className="flex items-center justify-between mb-6">
          <h3 className="text-xl font-semibold">MPS/MRP 시뮬레이션 결과</h3>
          <button onClick={onClose} className="text-gray-400 hover:text-gray-600 cursor-pointer">
            <i className="ri-close-line text-xl"></i>
          </button>
        </div>

        <div className="space-y-6">
          {simulationResult.mpsResult.map((result, index) => (
            <div key={index} className="border border-gray-200 rounded-lg p-4">
              <div className="flex items-center justify-between mb-4">
                <div>
                  <h4 className="text-lg font-semibold text-gray-900">{result.quoteId}</h4>
                  <p className="text-sm text-gray-600">
                    {result.customer} - {result.product}
                  </p>
                </div>
                <div className="text-right">
                  <div className="text-sm text-gray-600">수량: {result.quantity}EA</div>
                  <div className="text-sm text-gray-600">요청 납기: {result.requestDelivery}</div>
                  <div className="text-sm font-medium text-blue-600">
                    제안 납기: {result.proposedDelivery}
                  </div>
                </div>
              </div>

              <div className="bg-red-50 border border-red-200 rounded-lg p-3">
                <h5 className="text-sm font-semibold text-red-800 mb-2">부족 자재</h5>
                <div className="space-y-1">
                  {result.materials.map((material, idx) => (
                    <div key={idx} className="flex justify-between text-sm">
                      <span className="text-red-700">{material.name}</span>
                      <span className="text-red-700 font-medium">
                        부족: {material.shortage} (필요: {material.required}, 보유:{' '}
                        {material.available})
                      </span>
                    </div>
                  ))}
                </div>
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
              className="flex-1 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors text-sm font-medium cursor-pointer"
            >
              제안 납기 확정
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
