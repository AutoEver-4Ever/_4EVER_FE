export interface CustomerData {
  companyName: string;
  businessType: string;
  businessNumber: string;
  representative: string;
  contactPerson: string;
  position: string;
  phone: string;
  mobile: string;
  email: string;
  fax: string;
  website: string;
  address: string;
  detailAddress: string;
  zipCode: string;
  industry: string;
  customerType: '일반고객' | 'VIP고객' | '대량고객' | '신규고객';
  creditRating: 'A' | 'B' | 'C' | 'D';
  paymentTerms: string;
  taxType: '과세' | '면세' | '영세율';
  notes: string;
}

export interface NewCustomerModalProps {
  $showCustomerModal: boolean;
  $setShowCustomerModal: React.Dispatch<React.SetStateAction<boolean>>;
}
