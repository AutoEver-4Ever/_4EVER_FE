import axios from 'axios';
import { FINANCE_ENDPOINTS, ApiResponse } from '@/app/api';
import { PageType } from '@/app/(private)/sales/types/SalesCustomerListType';
import { FinanceStatCard, FinanceStatData } from '@/app/(private)/finance/types/FinanceStatsType';
import { StatementList, StatementQueryParams } from './types/StatementListType';
import { StatementDetail } from './types/StatementDetailModalType';

// ----------------------- 통계 지표 -----------------------
export const getFinanceStatistics = async (): Promise<Record<string, FinanceStatCard[]>> => {
  const res = await axios.get<ApiResponse<FinanceStatData>>(FINANCE_ENDPOINTS.STATISTICS);
  const datas = res.data.data;

  return Object.entries(datas).reduce(
    (acc, [period, stats]) => {
      const cards: FinanceStatCard[] = [
        {
          title: '총 매출 (AR)',
          value: `₩${stats.totalSales.toLocaleString()}`,
          change: `${stats.totalSalesChange > 0 ? '+' : ''}${stats.totalSalesChange}%`,
          changeType: stats.totalSalesChange >= 0 ? 'increase' : 'decrease',
          icon: 'ri-arrow-up-circle-line',
          iconBg: 'text-green-600',
          iconColor: 'bg-green-100',
        },
        {
          title: '총 매입 (AP)',
          value: `₩${stats.totalPurchases.toLocaleString()}`,
          change: `${stats.totalPurchasesChange > 0 ? '+' : ''}${stats.totalPurchasesChange}%`,
          changeType: stats.totalPurchasesChange >= 0 ? 'increase' : 'decrease',
          icon: 'ri-arrow-down-circle-line',
          iconColor: 'text-red-600',
          iconBg: 'bg-red-100',
        },
        {
          title: '순이익',
          value: `₩${stats.netProfit.toLocaleString()}`,
          change: `${stats.netProfitChange > 0 ? '+' : ''}${stats.netProfitChange}%`,
          changeType: stats.netProfitChange >= 0 ? 'increase' : 'decrease',
          icon: 'ri-money-dollar-circle-line',
          iconColor: 'text-blue-600',
          iconBg: 'bg-blue-100',
        },
        {
          title: '미수금',
          value: `₩${stats.accountsReceivable.toLocaleString()}`,
          change: `${stats.accountsReceivableChange > 0 ? '+' : ''}${stats.accountsReceivableChange}%`,
          changeType: stats.accountsReceivableChange >= 0 ? 'increase' : 'decrease',
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
export const getPurchaseStatementsList = async (
  params?: StatementQueryParams,
): Promise<{ data: StatementList[]; pageData: PageType }> => {
  const query = new URLSearchParams({
    ...(params?.status && { status: params.status }),
    ...(params?.page && { page: String(params.page) }),
    ...(params?.size && { size: String(params.size) }),
  }).toString();

  const res = await axios.get<ApiResponse<{ content: StatementList[]; page: PageType }>>(
    `${FINANCE_ENDPOINTS.PURCHASE_STATEMENTS_LIST}?${query}`,
  );
  return { data: res.data.data.content, pageData: res.data.data.page };
};

export const getStatementDetail = async (statementId: number): Promise<StatementDetail> => {
  const res = await axios.get<ApiResponse<StatementDetail>>(
    FINANCE_ENDPOINTS.PURCHASE_STATEMENT_DETAIL(statementId),
  );
  return res.data.data;
};

// ----------------------- 매출 전표(AS) -----------------------
export const getSalesStatementsList = async (
  params?: StatementQueryParams,
): Promise<{ data: StatementList[]; pageData: PageType }> => {
  const query = new URLSearchParams({
    ...(params?.status && { status: params.status }),
    ...(params?.page && { page: String(params.page) }),
    ...(params?.size && { size: String(params.size) }),
  }).toString();

  const res = await axios.get<ApiResponse<{ content: StatementList[]; page: PageType }>>(
    `${FINANCE_ENDPOINTS.SALES_STATEMENTS_LIST}?${query}`,
  );
  return { data: res.data.data.content, pageData: res.data.data.page };
};

export const getSalesStatementDetail = async (statementId: number): Promise<StatementDetail> => {
  const res = await axios.get<ApiResponse<StatementDetail>>(
    FINANCE_ENDPOINTS.SALES_STATEMENT_DETAIL(statementId),
  );
  return res.data.data;
};
