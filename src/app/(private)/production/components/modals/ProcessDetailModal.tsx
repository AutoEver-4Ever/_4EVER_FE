import { ProductionOrder } from '@/app/(private)/production/types/MesType';

interface ProcessDetailModalProps {
  order: ProductionOrder;
  onClose: () => void;
}

export default function ProcessDetailModal({ order, onClose }: ProcessDetailModalProps) {
  const getStatusBadge = (status: string) => {
    const statusConfig = {
      pending: { label: '대기', class: 'bg-yellow-100 text-yellow-800' },
      in_progress: { label: '진행중', class: 'bg-blue-100 text-blue-800' },
      completed: { label: '완료', class: 'bg-green-100 text-green-800' },
      on_hold: { label: '보류', class: 'bg-red-100 text-red-800' },
    };
    const config = statusConfig[status as keyof typeof statusConfig];
    return (
      <span className={`px-2 py-1 rounded-full text-xs font-medium ${config.class}`}>
        {config.label}
      </span>
    );
  };

  const getProcessStatusIcon = (status: string) => {
    const icons = {
      completed: 'ri-checkbox-circle-fill text-green-600',
      in_progress: 'ri-play-circle-fill text-blue-600',
      pending: 'ri-time-line text-gray-400',
    };
    return icons[status as keyof typeof icons];
  };

  const calculateDuration = (startTime: string | null, endTime: string | null): string => {
    if (!startTime || !endTime) return '-';
    // 실제로는 시간 계산 로직 필요
    return '3.5시간';
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
      <div className="bg-white rounded-lg p-6 w-full max-w-3xl mx-4 max-h-[90vh] overflow-y-auto">
        <div className="flex items-center justify-between mb-6">
          <h3 className="text-xl font-semibold">공정 상세 현황</h3>
          <button onClick={onClose} className="text-gray-400 hover:text-gray-600 cursor-pointer">
            <i className="ri-close-line text-xl"></i>
          </button>
        </div>

        <div className="space-y-6">
          <div className="bg-gray-50 p-4 rounded-lg">
            <h4 className="text-lg font-semibold text-gray-900 mb-3">작업지시 정보</h4>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
              <div>
                <div className="text-xs text-gray-500">작업지시번호</div>
                <div className="text-sm font-medium text-gray-900">{order.id}</div>
              </div>
              <div>
                <div className="text-xs text-gray-500">제품명</div>
                <div className="text-sm font-medium text-gray-900">{order.productName}</div>
              </div>
              <div>
                <div className="text-xs text-gray-500">수량</div>
                <div className="text-sm font-medium text-gray-900">{order.quantity} EA</div>
              </div>
              <div>
                <div className="text-xs text-gray-500">진행률</div>
                <div className="text-sm font-medium text-blue-600">{order.progress}%</div>
              </div>
            </div>
          </div>

          <div>
            <h4 className="text-lg font-semibold text-gray-900 mb-3">공정별 상세 현황</h4>
            <div className="space-y-3">
              {order.processes.map((process, index) => (
                <div key={process.code} className="border border-gray-200 rounded-lg p-4">
                  <div className="flex items-center justify-between mb-2">
                    <div className="flex items-center gap-3">
                      <i className={`${getProcessStatusIcon(process.status)} text-lg`}></i>
                      <div>
                        <div className="text-sm font-medium text-gray-900">
                          {process.code} - {process.name}
                        </div>
                        <div className="text-xs text-gray-500">공정 {index + 1}</div>
                      </div>
                    </div>
                    {getStatusBadge(process.status)}
                  </div>

                  <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mt-3">
                    <div>
                      <div className="text-xs text-gray-500">시작시간</div>
                      <div className="text-sm text-gray-900">{process.startTime || '-'}</div>
                    </div>
                    <div>
                      <div className="text-xs text-gray-500">종료시간</div>
                      <div className="text-sm text-gray-900">{process.endTime || '-'}</div>
                    </div>
                    <div>
                      <div className="text-xs text-gray-500">소요시간</div>
                      <div className="text-sm text-gray-900">
                        {calculateDuration(process.startTime, process.endTime)}
                      </div>
                    </div>
                    <div>
                      <div className="text-xs text-gray-500">담당자</div>
                      <div className="text-sm text-gray-900">김작업</div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
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
