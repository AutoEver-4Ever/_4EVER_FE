import { Page } from '@/types/Page';
import { SupplierStatus } from '@/app/purchase/constants';

// 자재 정보
export interface Material {
  materialName: string; // 제품명
  uomCode: string; // 단위
  unitPrice: number; // 단가
}

// 공급업체 입력
export interface CreateSupplierRequest {
  supplierInfo: {
    supplierName: string;
    supplierEmail: string;
    supplierBaseAddress: string;
    supplierDetailAddress?: string | null;
    category: string;
    deliveryLeadTime: number;
  };
  managerInfo: ManagerInfo;
  materialList: Material[];
}

// 공급업체 정보
export interface SupplierInfo {
  supplierId: string;
  supplierName: string;
  supplierCode: string;
  supplierEmail: string;
  supplierPhone: string;
  supplierBaseAddress: string;
  supplierDetailAddress: string | null;
  supplierStatus: SupplierStatus; // 상태값이 정해져 있으면 enum으로도 가능
  category: string; // 예: 'MATERIAL', 'SERVICE' 등
  deliveryLeadTime: number; // 납기일 (단위: 일)
}

// 공급업체 담당자 정보
export interface ManagerInfo {
  managerName: string;
  managerPhone: string;
  managerEmail: string;
}

// 공급업체 리스트
export interface SupplierResponse {
  statusCode: string; // 삭제 예정
  supplierInfo: SupplierInfo;
}

// 공급업체 상세정보 최상위 응답 타입
export interface SupplierDetailResponse {
  supplierInfo: SupplierInfo;
  managerInfo: ManagerInfo;
}

// 공급업체 리스트 최상위 응답 타입
export interface SupplierListResponse {
  content: SupplierResponse[];
  page: Page;
}
