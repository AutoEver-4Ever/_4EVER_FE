import { SalesOrder } from '@/app/sales/types/SalesOrderType';

export interface SalesOrderDetailProps {
  $showDetailModal: boolean;
  $setShowDetailModal: (show: boolean) => void;
  $selectedOrder: SalesOrder | null;
  $getStatusColor: (status: string) => string;
  $getStatusText: (status: string) => string;
}
