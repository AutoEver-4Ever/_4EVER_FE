// 현재 VoucherDetailModalType과 VoucherListType의 타입이 같음!
// api 연동 시 변경!

export type StatementStatus = 'ALL' | 'UNPAID' | 'PENDING' | 'PAID';

export interface StatementListRes {
  statementId: number;
  statementCode: string;
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

export interface StatementQueryParams {
  status: string;
  page: number;
  size: number;
}
