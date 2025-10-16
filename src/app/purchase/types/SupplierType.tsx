import { Material } from '@/app/purchase/types/MaterialType';

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
  id: string; // 업체 id
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
