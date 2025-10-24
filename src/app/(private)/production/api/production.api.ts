import { ProductionStatResponse } from '@/app/(private)/production/types/ProductionStatsType';
import { ApiResponse, ApiResponseNoData } from '@/app/types/api';
import { PRODUCTION_ENDPOINTS } from '@/app/(private)/production/api/production.endpoints';
import axios from 'axios';
import { QuotationSimulationResponse } from '@/app/(private)/production/types/QuotationSimulationApiType';
import { QuotationPreviewResponse } from '@/app/(private)/production/types/QuotationPreviewApiType';
import { MpsListParams, MpsListResponse } from '@/app/(private)/production/types/MpsApiType';
import { FetchMesListParams, MesListResponse } from '../types/MesListApiType';
import { MesDetailResponse } from '../types/MesDetailApiType';
import { BomListResponse } from '../types/BomListApiType';
import { BomDetailResponse } from '../types/BomDetailApiType';

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
export const fetchQuotationPreview = async (
  quotationId: string,
): Promise<QuotationPreviewResponse> => {
  const res = await axios.get<ApiResponse<QuotationPreviewResponse>>(
    `${PRODUCTION_ENDPOINTS.QUOTATION_PREVIEW(quotationId)}`,
  );
  return res.data.data;
};

// 제품별 Master Production Schedule(MPS) 정보를 조회
export const fetchMpsList = async (params: MpsListParams): Promise<MpsListResponse> => {
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

// MES(Manufacturing Execution System) 작업 목록 조회
export const fetchMesList = async (params: FetchMesListParams): Promise<MesListResponse> => {
  const res = await axios.get<ApiResponse<MesListResponse>>(
    `${PRODUCTION_ENDPOINTS.MES_WORK_ORDERS}`,
    { params },
  );
  return res.data.data;
};

// MES 작업 상세 정보 조회
export const fetchMesDetail = async (mesId: string) => {
  const res = await axios.get<ApiResponse<MesDetailResponse>>(
    `${PRODUCTION_ENDPOINTS.MES_WORK_ORDER_DETAIL(mesId)}`,
  );
  return res.data.data;
};

// BOM 목록 조회
export const fetchBomList = async (): Promise<BomListResponse> => {
  const res = await axios.get<ApiResponse<BomListResponse>>(`${PRODUCTION_ENDPOINTS.BOMS}`);
  return res.data.data;
};

// BOM 상세 조회
export const fetchBomDetail = async (bomId: string): Promise<BomDetailResponse> => {
  const res = await axios.get<ApiResponse<BomDetailResponse>>(
    `${PRODUCTION_ENDPOINTS.BOM_DETAIL(bomId)}`,
  );
  return res.data.data;
};

// BOM 삭제
export const deletBomItem = async (bomId: string): Promise<ApiResponseNoData> => {
  const res = await axios.delete<ApiResponseNoData>(`${PRODUCTION_ENDPOINTS.BOM_DETAIL(bomId)}`);
  return res.data;
};
