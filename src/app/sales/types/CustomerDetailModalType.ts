import { Customer } from '@/app/sales/types/SalesCustomerList';

export interface CustomerDetailModalProps {
  $showDetailModal: boolean;
  $setShowDetailModal: React.Dispatch<React.SetStateAction<boolean>>;
  $selectedCustomer: Customer | null;
  $getStatusColor: (status: string) => string;
  $handlePhoneClick: (phoneNumber: string) => void;
  $handleEditClick: (customer: Customer) => void;
}
