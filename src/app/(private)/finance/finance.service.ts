import axios from 'axios';
import { FINANCE_ENDPOINTS, ApiResponse } from '@/app/api';
import { FinanceStatCard, FinanceStatData } from '@/app/(private)/finance/types/FinanceStatsType';
import { InvoiceListRes, InvoiceQueryParams } from './types/InvoiceListType';
import { InvoicetDetailRes } from './types/InvoiceDetailModalType';
import { Page } from '@/types/Page';
import { Period } from '@/types/StatType';

// ----------------------- 통계 지표 -----------------------
export const getFinanceStats = async (): Promise<Record<Period, FinanceStatCard[]>> => {
  const res = await axios.get<ApiResponse<FinanceStatData>>(FINANCE_ENDPOINTS.STATISTICS);
  const datas = res.data.data;

  return Object.entries(datas).reduce(
    (acc, [period, stats]) => {
      const cards: FinanceStatCard[] = [
        {
          title: '총 매출 (AR)',
          value: `₩${stats.total_sales.value.toLocaleString()}`,
          change: `${stats.total_sales.delta_rate > 0 ? '+' : ''}${stats.total_sales.delta_rate}%`,
          changeType: stats.total_sales.delta_rate >= 0 ? 'increase' : 'decrease',
          icon: 'ri-arrow-up-circle-line',
          iconBg: 'text-green-600',
          iconColor: 'bg-green-100',
        },
        {
          title: '총 매입 (AP)',
          value: `₩${stats.total_purchases.value.toLocaleString()}`,
          change: `${stats.total_purchases.delta_rate > 0 ? '+' : ''}${stats.total_purchases.delta_rate}%`,
          changeType: stats.total_purchases.delta_rate >= 0 ? 'increase' : 'decrease',
          icon: 'ri-arrow-down-circle-line',
          iconColor: 'text-red-600',
          iconBg: 'bg-red-100',
        },
        {
          title: '순이익',
          value: `₩${stats.net_profit.value.toLocaleString()}`,
          change: `${stats.net_profit.delta_rate > 0 ? '+' : ''}${stats.net_profit.delta_rate}%`,
          changeType: stats.net_profit.delta_rate >= 0 ? 'increase' : 'decrease',
          icon: 'ri-money-dollar-circle-line',
          iconColor: 'text-blue-600',
          iconBg: 'bg-blue-100',
        },
        {
          title: '미수금',
          value: `₩${stats.accounts_receivable.value.toLocaleString()}`,
          change: `${stats.accounts_receivable.delta_rate > 0 ? '+' : ''}${stats.accounts_receivable.delta_rate}%`,
          changeType: stats.accounts_receivable.delta_rate >= 0 ? 'increase' : 'decrease',
          icon: 'ri-file-text-line',
          iconColor: 'text-orange-600',
          iconBg: 'bg-orange-100',
        },
      ];
      acc[period] = cards;
      return acc;
    },
    {} as Record<string, FinanceStatCard[]>,
  );
};

// ----------------------- 매입 전표(AP) -----------------------
export const getPurchaseInvoicesList = async (
  params?: InvoiceQueryParams,
): Promise<{ data: InvoiceListRes[]; pageData: Page }> => {
  const query = new URLSearchParams({
    ...(params?.status && { status: params.status }),
    ...(params?.page && { page: String(params.page) }),
    ...(params?.size && { size: String(params.size) }),
  }).toString();

  const res = await axios.get<ApiResponse<{ content: InvoiceListRes[]; page: Page }>>(
    `${FINANCE_ENDPOINTS.PURCHASE_INVOICES_LIST}?${query}`,
  );
  return { data: res.data.data.content, pageData: res.data.data.page };
};

export const getPurchaseInvoiceDetail = async (invoiceId: number): Promise<InvoicetDetailRes> => {
  const res = await axios.get<ApiResponse<InvoicetDetailRes>>(
    FINANCE_ENDPOINTS.PURCHASE_INVOICE_DETAIL(invoiceId),
  );
  return res.data.data;
};

// ----------------------- 매출 전표(AS) -----------------------
export const getSalesInvoicesList = async (
  params?: InvoiceQueryParams,
): Promise<{ data: InvoiceListRes[]; pageData: Page }> => {
  const query = new URLSearchParams({
    ...(params?.status && { status: params.status }),
    ...(params?.page && { page: String(params.page) }),
    ...(params?.size && { size: String(params.size) }),
  }).toString();

  const res = await axios.get<ApiResponse<{ content: InvoiceListRes[]; page: Page }>>(
    `${FINANCE_ENDPOINTS.SALES_INVOICES_LIST}?${query}`,
  );
  return { data: res.data.data.content, pageData: res.data.data.page };
};

export const getSalesInvoiceDetail = async (invoiceId: number): Promise<InvoicetDetailRes> => {
  const res = await axios.get<ApiResponse<InvoicetDetailRes>>(
    FINANCE_ENDPOINTS.SALES_INVOICE_DETAIL(invoiceId),
  );
  return res.data.data;
};
