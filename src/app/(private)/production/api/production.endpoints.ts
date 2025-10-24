import { API_BASE_URL } from '@/app/types/api';

export const PRODUCTION_BASE_PATH = `${API_BASE_URL}/api/scm-pp/pp`;

export const PRODUCTION_ENDPOINTS = {
  // BOM 관련
  BOMS: `${PRODUCTION_BASE_PATH}/boms`, // BOM 목록 조회, 생성
  BOM_DETAIL: (bomId: string) => `${PRODUCTION_BASE_PATH}/boms/${bomId}`, // BOM 상세 조회, 수정, 삭제

  // MES 작업 목록
  MES_WORK_ORDERS: `${PRODUCTION_BASE_PATH}/mes/work-orders`, // MES 작업 목록 조회
  MES_WORK_ORDER_DETAIL: (mesId: string) => `${PRODUCTION_BASE_PATH}/mes/work-orders/${mesId}`, // MES 작업 상세 조회
  MES_WORK_ORDERS_SUMMARY: `${PRODUCTION_BASE_PATH}/mes/work-orders/summary`, // 생산관리 페이지 카드뷰 데이터 조회

  // MPS 계획
  MPS_PLANS: `${PRODUCTION_BASE_PATH}/mps/plans`, // 제품별 MPS 조회

  // MRP 순소요 목록
  MRP_ORDERS: `${PRODUCTION_BASE_PATH}/mrp/orders`, // MRP 순소요 목록 조회
  MRP_PLANNED_ORDER_DETAIL: (plannedId: string) =>
    `${PRODUCTION_BASE_PATH}/mrp/planned-orders/detail/${plannedId}`, // MRP 계획 주문 상세 조회
  MRP_PLANNED_ORDERS_LIST: `${PRODUCTION_BASE_PATH}/mrp/planned-orders/list`, // MRP 계획 주문 목록 조회
  MRP_REQUEST_SUMMARY: `${PRODUCTION_BASE_PATH}/mrp/request-summary`, // MRP 자재 구매 요청 리스트

  // 견적
  QUOTATIONS: `${PRODUCTION_BASE_PATH}/quotations`,
  QUOTATION_PREVIEW: (quotationId: string) =>
    `${PRODUCTION_BASE_PATH}/quotations/${quotationId}/preview`, // 제안납기 확정 프리뷰
  QUOTATION_SIMULATE: `${PRODUCTION_BASE_PATH}/quotations/simulate`, // 견적에 대한 ATP + MPS + MRP 시뮬레이션 실행

  // PP 통계
  STATISTICS: `${PRODUCTION_BASE_PATH}/statistics`, // PP 통계 조회
};
