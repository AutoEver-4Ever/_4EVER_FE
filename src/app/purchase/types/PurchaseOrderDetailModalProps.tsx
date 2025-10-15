import { PurchaseOrder } from '@/app/purchase/types/PurchaseOrderType';
import { PurchaseOrderStatus } from '@/app/purchase/constants';

export interface PurchaseOrderDetailModalProps {
  order: PurchaseOrder;
  onClose: () => void;
  getStatusColor: (status: PurchaseOrderStatus) => string;
  getStatusText: (status: string) => string;
}
