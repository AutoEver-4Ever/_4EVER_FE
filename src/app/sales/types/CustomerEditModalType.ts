import { CustomerDetail } from '@/app/sales/types/SalesCustomerDetailType';

export interface CustomerEditModalProps {
  $showEditModal: boolean;
  $setShowEditModal: (show: boolean) => void;
  $editFormData: CustomerDetail | null;
  $setEditFormData: React.Dispatch<React.SetStateAction<CustomerDetail | null>>;
  $setShowDetailModal: (show: boolean) => void;
}
