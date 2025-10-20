export interface InvoiceDetailModalProps {
  $setShowDetailModal: (show: boolean) => void;
  $selectedInvoiceId: number;
  $setSelectedInvoiceId: (id: number) => void;
}

export interface InvoicetDetailRes {
  invoiceId: number;
  invoiceCode: string;
  invoiceType: string;
  statusCode: string;
  issueDate: string;
  dueDate: string;
  name: string;
  referenceCode: string;
  totalAmount: number;
  note: string;
  items: {
    itemName: string;
    quantity: number;
    uomName: string;
    unitPrice: number;
    totalPrice: number;
  }[];
}
