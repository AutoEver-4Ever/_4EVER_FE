import { PeriodFilterProps } from '@/app/purchase/types/PeriodFilterType';

export default function PeriodFilterSection({
  periods,
  selectedPeriod,
  onPeriodChange,
}: PeriodFilterProps) {
  return (
    <div className="inline-flex gap-1 items-center bg-white rounded-lg border border-gray-300 p-1">
      {periods.map((period) => (
        <button
          key={period}
          onClick={() => onPeriodChange(period)}
          className={`px-4 py-2 rounded-md text-sm font-medium transition-colors duration-200 whitespace-nowrap cursor-pointer ${
            selectedPeriod === period
              ? 'bg-blue-600 text-white'
              : 'text-gray-700 hover:text-gray-900 hover:bg-gray-100'
          }`}
        >
          {period}
        </button>
      ))}
    </div>
  );
}
