import { SalesCustomerDetailType } from '@/app/sales/types/SalesCustomerDetailType';

export interface CustomerDetailModalProps {
  $showDetailModal: boolean;
  $setShowDetailModal: React.Dispatch<React.SetStateAction<boolean>>;
  $selectedCustomerId: string;
  $getStatusColor: (status: string) => string;
  $setShowEditModal: (show: boolean) => void;
  $setEditFormData: React.Dispatch<React.SetStateAction<SalesCustomerDetailType | null>>;
}
