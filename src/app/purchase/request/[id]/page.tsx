import PurchaseRequestDetail from '@/app/purchase/request/[id]/components/PurchaseRequestDetail';

export async function generateStaticParams() {
  return [
    { id: 'PR-2024-001' },
    { id: 'PR-2024-002' },
    { id: 'PR-2024-003' },
    { id: 'PR-2024-004' },
    { id: 'PR-2024-005' },
    { id: 'PR-2024-006' },
  ];
}

export default function PurchaseRequestDetailPage({ params }: { params: { id: string } }) {
  return <PurchaseRequestDetail requestId={params.id} />;
}
