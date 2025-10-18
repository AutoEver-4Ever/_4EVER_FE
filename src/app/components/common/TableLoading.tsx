'use client';

interface TableLoadingProps {
  $isLoading: boolean;
  $message: string;
}

const TableLoading = ({ $isLoading, $message }: TableLoadingProps) => {
  return (
    <>
      {$isLoading && (
        <div className="flex flex-col items-center justify-center h-64 space-y-3">
          <div className="w-10 h-10 border-4 border-blue-500 border-t-transparent rounded-full animate-spin" />
          <p className="text-gray-600 text-sm font-medium">{$message}</p>
        </div>
      )}
    </>
  );
};

export default TableLoading;
