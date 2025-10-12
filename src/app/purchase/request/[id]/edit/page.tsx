import EditPurchaseRequestForm from '@/app/purchase/request/[id]/edit/components/EditPurchaseRequestForm';
export async function generateStaticParams() {
  return [
    { id: 'PR-2024-001' },
    { id: 'PR-2024-002' },
    { id: 'PR-2024-003' },
    { id: 'PR-2024-004' },
    { id: 'PR-2024-005' },
  ];
}

export default function EditPurchaseRequestPage({ params }: { params: { id: string } }) {
  return <EditPurchaseRequestForm requestId={params.id} />;
}
