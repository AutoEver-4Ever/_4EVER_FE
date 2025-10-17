import { CustomerDetail } from '@/app/sales/types/SalesCustomerDetailType';

export interface CustomerDetailModalProps {
  $showDetailModal: boolean;
  $setShowDetailModal: React.Dispatch<React.SetStateAction<boolean>>;
  $selectedCustomerId: number;
  $getStatusColor: (status: string) => string;
  $setShowEditModal: (show: boolean) => void;
  $setEditFormData: React.Dispatch<React.SetStateAction<CustomerDetail | null>>;
}
