import { Material } from '@/app/purchase/types/MaterialType';
import { Page } from '@/types/Page';

export interface SupplierRequest {
  id: string;
  name: string;
  category: string;
  managerName: string;
  managerPhone: string;
  email: string;
  deliveryDays: string;
  address: string;
  materials: Material[];
}

// 벤더(공급업체) 한 항목의 타입
interface BaseSupplier {
  vendorId: number;
  vendorCode: string; // 공급업체 코드
  companyName: string; // 업체명
  managerPhone: string; // 연락처
  managerEmail: string; // 이메일
  category: string; // 카테고리
  leadTimeDays: number; // 배송기간
  statusCode: string; // 배송 상태
  actions: string[];
  createdAt: string; // ISO 형식의 날짜 문자열
  updatedAt: string;
}

// 리스트 응답용
export interface SupplierResponse extends BaseSupplier {
  actions: string[];
}

// 상세 응답용
export interface SupplierDetailResponse extends BaseSupplier {
  materials: Material[];
}

// 최상위 응답 타입
export interface SupplierListResponse {
  content: SupplierResponse[];
  page: Page;
}
