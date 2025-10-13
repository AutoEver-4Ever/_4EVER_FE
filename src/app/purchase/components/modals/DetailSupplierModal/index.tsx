'use client';

import { useState, useEffect } from 'react';
import { SupplierResponse } from '@/app/purchase/types/SupplierType';
import ReadSupplierForm from '@/app/purchase/components/forms/SupplierTable';
import EditSupplierForm from '@/app/purchase/components/forms/EditSupplierForm';

interface DetailSupplierModalProps {
  isOpen: boolean;
  supplier: SupplierResponse | null;
  onClose: () => void;
}

export default function DetailSupplierModal({
  isOpen,
  supplier,
  onClose,
}: DetailSupplierModalProps) {
  const [isEditMode, setIsEditMode] = useState(false);
  const [editForm, setEditForm] = useState<SupplierResponse | null>(supplier);

  useEffect(() => {
    if (supplier) setEditForm(supplier);
  }, [supplier]);

  if (!isOpen || !supplier) return null;

  return (
    <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50">
      <div className="bg-white rounded-lg p-8 w-full max-w-4xl max-h-[90vh] overflow-y-auto">
        {isEditMode ? (
          <EditSupplierForm
            supplier={editForm!}
            setEditForm={setEditForm}
            onCancel={() => setIsEditMode(false)}
            onSave={() => setIsEditMode(false)}
          />
        ) : (
          <ReadSupplierForm
            supplier={supplier}
            onEdit={() => setIsEditMode(true)}
            onClose={onClose}
          />
        )}
      </div>
    </div>
  );
}
