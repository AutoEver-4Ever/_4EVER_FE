import { PurchaseOrder } from '@/app/purchase/types/PurchaseOrderType';
import { PurchaseOrderStatus } from '@/app/purchase/constants';

type SortField = 'orderDate' | 'deliveryDate' | '';

export interface PurchaseOrderTableProps {
  currentOrders: PurchaseOrder[];
  handleSort: (field: SortField) => void;
  getSortIcon: (field: SortField) => string;
  handleViewDetail: (order: PurchaseOrder) => void;
  handleApprove: (orderId: number) => void;
  handleReject: (orderId: number) => void;
  getStatusColor: (status: PurchaseOrderStatus) => string;
  getStatusText: (status: PurchaseOrderStatus) => string;
}
