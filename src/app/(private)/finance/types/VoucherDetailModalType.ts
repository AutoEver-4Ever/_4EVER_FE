export interface VourcherDetailModalProps {
  $showDetailModal: boolean;
  $setShowDetailModal: (show: boolean) => void;
  $selectedVoucherId: number;
  $setSelectedVoucherId: (id: number) => void;
  $getStatusColor: (status: string) => string;
  $getStatusText: (status: string) => string;
}

// 현재 VoucherDetailModalType과 VoucherListType의 타입이 같음!
// api 연동 시 변경!

export interface VoucherItem {
  name: string;
  spec: string;
  quantity: number;
  unit: string;
  unitPrice: number;
  amount: number;
}

export interface VoucherDetails {
  voucherType: string;
  memo: string;
  items: VoucherItem[];
}

export interface VoucherDetailType {
  id: number;
  voucherId: string;
  type: string;
  description: string;
  amount: string;
  date: string;
  dueDate: string;
  status: string;
  reference: string;
  vendor: string;
  details: VoucherDetails;
}
