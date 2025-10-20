// 현재 VoucherDetailModalType과 VoucherListType의 타입이 같음!
// api 연동 시 변경!

export type InvoiceStatus = 'ALL' | 'UNPAID' | 'PENDING' | 'PAID';

export interface InvoiceListRes {
  invoiceId: number;
  invoiceCode: string;
  connection: {
    connectionId: number;
    connectionCode: string;
    connectionName: string;
  };
  totalAmount: number;
  issueDate: string;
  dueDate: string;
  status: string;
  referenceCode: string;
  reference: {
    referenceId: number;
    referenceCode: string;
  };
}

export interface InvoiceQueryParams {
  status: string;
  page: number;
  size: number;
}
