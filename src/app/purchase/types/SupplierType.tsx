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

export interface SupplierResponse {
  id: string; // 업체 코드
  name: string; // 업체명
  category: string; // 카테고리
  status: 'active' | 'inactive'; // 상태
  managerName: string; // 담당자명
  managerPhone: string; // 담당자 전화번호
  managerEmail: string; // 담당자 이메일
  address: string; // 주소
  deliveryDays: string; // 배송기간
  materials: Material[];
}

// 벤더(공급업체) 한 항목의 타입
export interface SupplierResponse {
  vendorId: number;
  vendorCode: string; // 공급업체 코드
  companyName: string; // 업체명
  contactPhone: string; // 연락처
  contactEmail: string; // 이메일
  category: string; // 카테고리
  leadTimeDays: number;
  leadTimeLabel: string; // 배송기간 라벨
  statusCode: string;
  statusLabel: string; // 배송 상태 라벨
  actions: string[];
  createdAt: string; // ISO 형식의 날짜 문자열
  updatedAt: string;
}

// 최상위 응답 타입
export interface SupplierListResponse {
  content: SupplierResponse[];
  page: Page;
}
