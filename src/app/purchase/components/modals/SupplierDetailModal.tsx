'use client';

import { useState, useEffect } from 'react';
import { SupplierDetailResponse } from '@/app/purchase/types/SupplierType';
import ReadSupplierFormSection from '@/app/purchase/components/sections/SupplierTableSection';
import EditSupplierFormSection from '@/app/purchase/components/sections/EditSupplierFormSection';
import { useQuery } from '@tanstack/react-query';
import { fetchSupplierDetail } from '../../api/purchase.api';

interface DetailSupplierModalProps {
  vendorId: number;
  onClose: () => void;
}

export default function SupplierDetailModal({ vendorId, onClose }: DetailSupplierModalProps) {
  const [isEditMode, setIsEditMode] = useState(false);
  const [editForm, setEditForm] = useState<SupplierDetailResponse | null>();

  const {
    data: supplier,
    isLoading,
    isError,
    error,
  } = useQuery<SupplierDetailResponse>({
    queryKey: ['suppliers-detail'],
    queryFn: () => fetchSupplierDetail(vendorId),
  });

  useEffect(() => {
    if (supplier) setEditForm(supplier);
  }, [supplier]);

  if (isLoading) return <div>로딩 중...</div>;
  if (isError) return <div>에러 발생: {error?.message}</div>;

  return (
    <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50">
      <div className="bg-white rounded-lg p-8 w-full max-w-4xl max-h-[90vh] overflow-y-auto">
        {isEditMode && (
          <EditSupplierFormSection
            supplier={editForm}
            setEditForm={setEditForm}
            onCancel={() => setIsEditMode(false)}
            onSave={() => setIsEditMode(false)}
          />
        )}
        {supplier && !isEditMode && (
          <ReadSupplierFormSection
            supplier={supplier}
            onEdit={() => setIsEditMode(true)}
            onClose={onClose}
          />
        )}
      </div>
    </div>
  );
}
