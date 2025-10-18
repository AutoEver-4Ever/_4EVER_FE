import { PeriodFilterProps } from '@/app/purchase/types/PeriodFilterType';
import { STAT_PERIODS } from '@/app/purchase/constants';

export default function PeriodFilterSection({ selectedPeriod, onPeriodChange }: PeriodFilterProps) {
  return (
    <div className="inline-flex gap-1 items-center bg-white rounded-lg border border-gray-300 p-1">
      {STAT_PERIODS.map((period) => (
        <button
          key={period.key}
          onClick={() => onPeriodChange(period.key)}
          className={`px-4 py-2 rounded-md text-sm font-medium transition-colors duration-200 whitespace-nowrap cursor-pointer ${
            selectedPeriod === period.key
              ? 'bg-blue-600 text-white'
              : 'text-gray-700 hover:text-gray-900 hover:bg-gray-100'
          }`}
        >
          {period.value}
        </button>
      ))}
    </div>
  );
}
