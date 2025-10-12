export interface CustomerData {
  companyName: string;
  businessNumber: string;
  representative: string;
  contactPerson: string;
  position: string;
  phone: string;
  mobile: string;
  email: string;
  address: string;
  detailAddress: string;
  zipCode: string;
  notes: string;
}

export interface NewCustomerModalProps {
  $showCustomerModal: boolean;
  $setShowCustomerModal: React.Dispatch<React.SetStateAction<boolean>>;
}
