import { useState } from 'react';
import SlidingNavBar from '@/app/components/common/SlidingNavBar';
import { Period, StatCardType } from '@/types/StatType';
import StatList from '@/app/components/statCard/StatCardList';
import { STAT_PERIODS } from '@/app/(private)/purchase/constants';

interface StatSectionProps {
  statsData: Record<Period, StatCardType[]>;
}

export default function StatSection({ statsData }: StatSectionProps) {
  const DEFAULT_PERIOD: Period = 'week';
  const [selectedPeriod, setSelectedPeriod] = useState<Period>(DEFAULT_PERIOD);
  const stats = statsData[selectedPeriod];

  return (
    <div className="space-y-4">
      {/* 기간 선택 */}
      <SlidingNavBar
        items={STAT_PERIODS}
        selectedKey={selectedPeriod}
        onSelect={(key) => setSelectedPeriod(key as Period)}
      />

      {/* 선택된 기간에 따른 카드 렌더링 */}
      <StatList stats={stats} period={selectedPeriod} />
    </div>
  );
}
