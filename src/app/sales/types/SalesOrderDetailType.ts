export interface SalesOrderDetailProps {
  $showOrderDetailModal: boolean;
  $setShowOrderDetailModal: (show: boolean) => void;
  $selectedOrderId: string;
  $getStatusColor: (status: string) => string;
  $getStatusText: (status: string) => string;
}
