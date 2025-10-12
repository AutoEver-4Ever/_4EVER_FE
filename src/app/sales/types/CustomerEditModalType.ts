import { SalesCustomerDetailType } from '@/app/sales/types/SalesCustomerDetailType';

export interface CustomerEditModalProps {
  $showEditModal: boolean;
  $setShowEditModal: (show: boolean) => void;
  $editFormData: SalesCustomerDetailType | null;
  $setEditFormData: React.Dispatch<React.SetStateAction<SalesCustomerDetailType | null>>;
  $setShowDetailModal: (show: boolean) => void;
}
