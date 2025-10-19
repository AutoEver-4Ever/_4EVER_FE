import axios from 'axios';
import { FINANCE_ENDPOINTS, ApiResponse } from '@/app/api';
import { PageType } from '@/app/(private)/sales/types/SalesCustomerListType';
import { FinanceStats } from '@/app/(private)/finance/types/FinanceStatsType';
import { StatementList } from './types/StatementListType';
import { StatementDetail } from './types/StatementDetailModalType';

// ----------------------- 재무 통계 -----------------------
export const getFinanceStatistics = async (): Promise<FinanceStats> => {
  const res = await axios.get<ApiResponse<FinanceStats>>(FINANCE_ENDPOINTS.STATISTICS);
  return res.data.data;
};

// ----------------------- 매입 전표(AP) -----------------------
export const getPurchaseStatements = async (
  params?: Record<string, string | number>,
): Promise<{ data: StatementList[]; pageData: PageType }> => {
  const query = new URLSearchParams(
    Object.entries(params || {}).reduce((acc, [key, val]) => ({ ...acc, [key]: String(val) }), {}),
  ).toString();

  const res = await axios.get<ApiResponse<{ items: StatementList[]; page: PageType }>>(
    `${FINANCE_ENDPOINTS.PURCHASE_STATEMENTS_LIST}?${query}`,
  );
  return { data: res.data.data.items, pageData: res.data.data.page };
};

export const getPurchaseStatementDetail = async (statementId: number): Promise<StatementDetail> => {
  const res = await axios.get<ApiResponse<StatementDetail>>(
    FINANCE_ENDPOINTS.PURCHASE_STATEMENT_DETAIL(statementId),
  );
  return res.data.data;
};

// ----------------------- 매출 전표(AS) -----------------------
export const getSalesStatements = async (
  params?: Record<string, string | number>,
): Promise<{ data: StatementList[]; pageData: PageType }> => {
  const query = new URLSearchParams(
    Object.entries(params || {}).reduce((acc, [key, val]) => ({ ...acc, [key]: String(val) }), {}),
  ).toString();

  const res = await axios.get<ApiResponse<{ items: StatementList[]; page: PageType }>>(
    `${FINANCE_ENDPOINTS.SALES_STATEMENTS_LIST}?${query}`,
  );
  return { data: res.data.data.items, pageData: res.data.data.page };
};

export const getSalesStatementDetail = async (statementId: number): Promise<StatementDetail> => {
  const res = await axios.get<ApiResponse<StatementDetail>>(
    FINANCE_ENDPOINTS.SALES_STATEMENT_DETAIL(statementId),
  );
  return res.data.data;
};
