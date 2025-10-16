import { PurchaseOrder } from '@/app/purchase/types/PurchaseOrderType';

type SortField = 'orderDate' | 'deliveryDate' | '';

export interface PurchaseOrderTableProps {
  currentOrders: PurchaseOrder[];
  handleSort: (field: SortField) => void;
  getSortIcon: (field: SortField) => string;
  handleViewDetail: (order: PurchaseOrder) => void;
  handleApprove: (orderId: string) => void;
  handleReject: (orderId: string) => void;
  getStatusColor: (status: string) => string;
  getStatusText: (status: string) => string;
}
