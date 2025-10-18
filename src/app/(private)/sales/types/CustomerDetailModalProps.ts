import { CustomerDetail } from '@/app/(private)/sales/types/SalesCustomerDetailType';

export interface CustomerDetailModalProps {
  $setShowDetailModal: React.Dispatch<React.SetStateAction<boolean>>;
  $selectedCustomerId: number;
  $setShowEditModal: (show: boolean) => void;
  $setEditFormData: React.Dispatch<React.SetStateAction<CustomerDetail | null>>;
}
