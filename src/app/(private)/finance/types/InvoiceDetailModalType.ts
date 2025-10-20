export interface InvoiceDetailModalProps {
  $setShowDetailModal: (show: boolean) => void;
  $selectedInvoiceId: number;
  $setSelectedInvoiceId: (id: number) => void;
}

export interface InvoicetDetailRes {
  invoiceId: number;
  invoiceCode: string | null;
  statusCode: string;
  issueDate: string;
  dueDate: string;
  customerName: string;
  ceoName: string;
  ownerName: string;
  reference: {
    type: string;
    quotationId: number;
    quotationCode: string;
    quotationDate: string;
    dueDate: string;
  };
  items: {
    itemId: number;
    itemName: string;
    quantity: number;
    uomName: string;
    unitPrice: number;
    amount: number;
  }[];
  totalAmount: number;
  note: string;
}
