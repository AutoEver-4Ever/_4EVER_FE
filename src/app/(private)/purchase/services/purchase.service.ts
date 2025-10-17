// services/purchase.ts
import { PurchaseStatsData } from '@/app/(private)/purchase/types/PurchaseStatsType';
import { StatCard } from '@/types/StatCardType';

export const mapPurchaseStatsToCards = (data: PurchaseStatsData): Record<string, StatCard[]> => {
  return Object.entries(data).reduce(
    (acc, [period, stats]) => {
      const cards: StatCard[] = [
        {
          title: '구매 요청',
          value: `${stats.purchase_request_count.value}건`,
          change: `${stats.purchase_request_count.delta_rate > 0 ? '+' : ''}${(stats.purchase_request_count.delta_rate * 100).toFixed(1)}%`,
          changeType: stats.purchase_request_count.delta_rate >= 0 ? 'increase' : 'decrease',
        },
        {
          title: '구매 승인 대기',
          value: `${stats.purchase_approval_pending_count.value}건`,
          change: `${stats.purchase_approval_pending_count.delta_rate > 0 ? '+' : ''}${(stats.purchase_approval_pending_count.delta_rate * 100).toFixed(1)}%`,
          changeType:
            stats.purchase_approval_pending_count.delta_rate >= 0 ? 'increase' : 'decrease',
        },
        {
          title: '발주 금액',
          value: `₩${stats.purchase_order_amount.value.toLocaleString()}`,
          change: `${stats.purchase_order_amount.delta_rate > 0 ? '+' : ''}${(stats.purchase_order_amount.delta_rate * 100).toFixed(1)}%`,
          changeType: stats.purchase_order_amount.delta_rate >= 0 ? 'increase' : 'decrease',
        },
        {
          title: '발주 승인 대기',
          value: `${stats.purchase_order_approval_pending_count.value.toLocaleString()}`,
          change: `${stats.purchase_order_approval_pending_count.delta_rate > 0 ? '+' : ''}${(stats.purchase_order_approval_pending_count.delta_rate * 100).toFixed(1)}%`,
          changeType:
            stats.purchase_order_approval_pending_count.delta_rate >= 0 ? 'increase' : 'decrease',
        },
      ];
      acc[period] = cards;
      return acc;
    },
    {} as Record<string, StatCard[]>,
  );
};
