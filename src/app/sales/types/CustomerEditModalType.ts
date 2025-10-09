import { Customer } from './SalesCustomerList';
export interface CustomerEditModalProps {
  $showEditModal: boolean;
  $setShowEditModal: (show: boolean) => void;
  $editFormData: Customer | null;
  $setEditFormData: React.Dispatch<React.SetStateAction<Customer | null>>;
  $setCustomers: React.Dispatch<React.SetStateAction<Customer[]>>;
}
