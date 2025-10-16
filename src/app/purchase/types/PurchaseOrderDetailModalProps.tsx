import { PurchaseOrder } from '@/app/purchase/types/PurchaseOrderType';

export interface PurchaseOrderDetailModalProps {
  order: PurchaseOrder;
  onClose: () => void;
  getStatusColor: (status: string) => string;
  getStatusText: (status: string) => string;
}
