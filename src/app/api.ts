// 공통 API Base URL
export const API_BASE_URL = 'https://api.everp.co.kr/api';
export const SALES_BASE_PATH = `${API_BASE_URL}/business/sd`;
export const FINANCE_BASE_PATH = `${API_BASE_URL}/business/fcm`;

// 공통 응답 타입
export interface ApiResponse<T> {
  status: number;
  success: boolean;
  message: string;
  data: T;
}

// ----------------------- SALES -----------------------
export const SALES_ENDPOINTS = {
  STATS: `${SALES_BASE_PATH}/statistics`,
  QUOTES_LIST: `${SALES_BASE_PATH}/quotations`,
  QUOTE_DETAIL: (id: number) => `${SALES_BASE_PATH}/quotations/${id}`,
  ORDERS_LIST: `${SALES_BASE_PATH}/orders`,
  ORDER_DETAIL: (id: number) => `${SALES_BASE_PATH}/orders/${id}`,
  CUSTOMERS_LIST: `${SALES_BASE_PATH}/customers`,
  CUSTOMER_DETAIL: (id: number) => `${SALES_BASE_PATH}/customers/${id}`,
  ANALYTICS: `${SALES_BASE_PATH}/analytics/sales`,
} as const;

export const FINANCE_ENDPOINTS = {
  STATISTICS: `${FINANCE_BASE_PATH}/statictics`,
  PURCHASE_INVOICES_LIST: `${FINANCE_BASE_PATH}/invoice/ap`,
  PURCHASE_INVOICE_DETAIL: (invoiceId: number) => `${FINANCE_BASE_PATH}/invoice/ap/${invoiceId}`,
  SALES_INVOICES_LIST: `${FINANCE_BASE_PATH}/invoice/ar`,
  SALES_INVOICE_DETAIL: (invoiceId: number) => `${FINANCE_BASE_PATH}/invoice/ar/${invoiceId}`,
} as const;
