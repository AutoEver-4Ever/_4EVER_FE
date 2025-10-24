'use client';

interface InventoryMoveModalProps {
  $setShowMoveModal: (show: boolean) => void;
  $selectedStock: {
    itemName: string;
    itemNumber: string;
    warehouseName: string;
    warehouseNumber: string;
    currentStock: number;
    uomName: string;
  };
}

const InventoryMoveModal = ({ $setShowMoveModal, $selectedStock }: InventoryMoveModalProps) => {
  return (
    <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50">
      <div className="bg-white rounded-lg p-6 w-full max-w-md mx-4">
        <div className="flex items-center justify-between mb-4">
          <h3 className="text-lg font-semibold">재고 이동</h3>
          <button
            onClick={() => $setShowMoveModal(false)}
            className="text-gray-400 hover:text-gray-600 cursor-pointer"
          >
            <i className="ri-close-line text-xl"></i>
          </button>
        </div>

        <div className="mb-4 p-3 bg-gray-50 rounded-lg">
          <div className="text-sm font-medium text-gray-900">{$selectedStock.itemName}</div>
          <div className="text-sm text-gray-500">{$selectedStock.itemNumber}</div>
          <div className="text-sm text-gray-600 mt-1">
            현재 위치: {$selectedStock.warehouseName} ({$selectedStock.warehouseNumber})
          </div>
          <div className="text-sm text-gray-600">
            현재 재고: {$selectedStock.currentStock} {$selectedStock.uomName}
          </div>
        </div>

        <form className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">이동할 창고</label>
            <select className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent text-sm pr-8">
              <option value="">창고를 선택하세요</option>
              {/* {warehouses.map((warehouse) => (
                <option key={warehouse.id} value={warehouse.id}>
                  {warehouse.name} ({warehouse.type})
                </option>
              ))} */}
            </select>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">이동할 위치</label>
            <input
              type="text"
              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent text-sm"
              placeholder="예: A-01-01"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">이동 수량</label>
            <input
              type="number"
              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent text-sm"
              placeholder="이동할 수량을 입력하세요"
              max={$selectedStock.currentStock}
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">이동 사유</label>
            <textarea
              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent text-sm"
              rows={3}
              placeholder="이동 사유를 입력하세요"
            ></textarea>
          </div>

          <div className="flex gap-3 pt-4">
            <button
              type="button"
              onClick={() => $setShowMoveModal(false)}
              className="flex-1 px-4 py-2 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 transition-colors text-sm font-medium cursor-pointer"
            >
              취소
            </button>
            <button
              type="submit"
              className="flex-1 px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 transition-colors text-sm font-medium cursor-pointer"
            >
              이동
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default InventoryMoveModal;
