import { ProductionStatResponse } from '@/app/(private)/production/types/ProductionStatsType';
import { ApiResponse } from '@/app/types/api';
import { PRODUCTION_ENDPOINTS } from '@/app/(private)/production/api/production.endpoints';
import axios from 'axios';
import { QuotationSimulationResponse } from '@/app/(private)/production/types/QuotationSimulationApiType';
import { QuotationPreviewResponse } from '@/app/(private)/production/types/QuotationPreviewApiType';
import { MpsListParams, MpsListResponse } from '@/app/(private)/production/types/MpsApiType';

// 구매 관리 지표
export const fetchProductionStats = async (): Promise<ProductionStatResponse | null> => {
  try {
    const res = await axios.get<ApiResponse<ProductionStatResponse>>(
      `${PRODUCTION_ENDPOINTS.STATISTICS}`,
    );
    console.log(res);
    return res.data.data;
  } catch (error) {
    console.log(error);
    return null;
  }
};

// 견적에 대한 ATP(Available to Promise), MPS, MRP 시뮬레이션 실행 결과
export const fetchQuotationSimulationResult = async (
  quotationId: string,
): Promise<QuotationSimulationResponse> => {
  const res = await axios.get<ApiResponse<QuotationSimulationResponse>>(
    `${PRODUCTION_ENDPOINTS.QUOTATION_SIMULATE(quotationId)}`,
  );
  return res.data.data;
};

// 제안 납기 계획 프리뷰 조회
export const fetchQuotationPreviewResult = async (
  quotationId: string,
): Promise<QuotationPreviewResponse> => {
  const res = await axios.get<ApiResponse<QuotationPreviewResponse>>(
    `${PRODUCTION_ENDPOINTS.QUOTATION_PREVIEW(quotationId)}`,
  );
  return res.data.data;
};

// 제품별 Master Production Schedule(MPS) 정보를 조회
export const fetchMpsListResult = async (params: MpsListParams): Promise<MpsListResponse> => {
  const { itemId, startdate, enddate } = params;

  const res = await axios.get<ApiResponse<MpsListResponse>>(`${PRODUCTION_ENDPOINTS.MPS_PLANS}`, {
    params: {
      ...(itemId && { itemId }),
      ...(startdate && { startdate }),
      ...(enddate && { enddate }),
    },
  });
  return res.data.data;
};
