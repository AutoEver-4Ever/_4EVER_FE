// src/config/purchaseEndpoints.ts
import { PURCHASE_BASE_PATH } from '@/config/api';

export const PURCHASE_ENDPOINTS = {
  // 발주서
  PURCHASE_ORDERS: `${PURCHASE_BASE_PATH}/purchase-orders`, // 발주서 목록 조회
  PURCHASE_ORDER_APPROVE: (poId: string) => `${PURCHASE_BASE_PATH}/purchase-orders/${poId}/approve`, // 발주서 승인
  PURCHASE_ORDER_REJECT: (poId: string) => `${PURCHASE_BASE_PATH}/purchase-orders/${poId}/reject`, // 발주서 반려
  PURCHASE_ORDER_DETAIL: (purchaseId: string) =>
    `${PURCHASE_BASE_PATH}/purchase-orders/${purchaseId}`, // 발주서 상세 조회

  // 구매 요청
  PURCHASE_REQUISITIONS: `${PURCHASE_BASE_PATH}/purchase-requisitions`, // 구매 요청 목록 조회, 비재고성 자재 구매 요청서 생성
  PURCHASE_REQUISITION_DETAIL: (prId: number) =>
    `${PURCHASE_BASE_PATH}/purchase-requisitions/${prId}`, // 구매 요청서 상세조회, 수정
  PURCHASE_REQUISITION_REJECT: (prId: number) =>
    `${PURCHASE_BASE_PATH}/purchase-requisitions/${prId}/reject`, // 구매요청서 반려
  PURCHASE_REQUISITION_RELEASE: (prId: number) =>
    `${PURCHASE_BASE_PATH}/purchase-requisitions/${prId}/release`, // 구매요청서 승인
  // PURCHASE_REQUISITION_BY_PURCHASE: (purchaseId: number) =>
  //   `${PURCHASE_BASE_PATH}/purchase-requisitions/${purchaseId}`, // 구매요청 상세 조회

  // 통계
  STATISTICS: `${PURCHASE_BASE_PATH}/statistics`, // MM 통계 조회

  // 공급업체
  VENDORS: `${PURCHASE_BASE_PATH}/vendors`, // 공급업체 목록 조회, 등록
  VENDOR_DETAIL: (vendorId: number) => `${PURCHASE_BASE_PATH}/vendors/${vendorId}`, // 공급업체 상세 조회, 수정
  VENDOR_ACCOUNT: (vendorId: number) => `${PURCHASE_BASE_PATH}/vendors/${vendorId}/account`, // 공급업체 계정 생성
};
