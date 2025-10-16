import React from 'react';

interface DateRangePickerProps {
  startDate: string;
  endDate: string;
  onStartDateChange: (value: string) => void;
  onEndDateChange: (value: string) => void;
}

export default function DateRangePicker({
  startDate,
  endDate,
  onStartDateChange,
  onEndDateChange,
}: DateRangePickerProps) {
  return (
    <div className={`flex items-center space-x-4`}>
      <div className="flex items-center space-x-2">
        <label className="text-sm font-medium text-gray-700">시작날짜:</label>
        <input
          type="date"
          value={startDate}
          onChange={(e) => onStartDateChange(e.target.value)}
          className="px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent text-sm bg-white"
        />
      </div>
      <div className="flex items-center space-x-2">
        <label className="text-sm font-medium text-gray-700">끝날짜:</label>
        <input
          type="date"
          value={endDate}
          onChange={(e) => onEndDateChange(e.target.value)}
          className="px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent text-sm bg-white"
        />
      </div>
    </div>
  );
}
