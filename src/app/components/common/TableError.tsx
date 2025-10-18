'use client';

interface TableErrorProps {
  $isError: boolean;
  $message: string;
}

const TableLoading = ({ $isError, $message }: TableErrorProps) => {
  return (
    <>
      {$isError && (
        <div className="flex flex-col items-center justify-center h-64 space-y-3 text-red-600">
          <i className="ri-error-warning-line text-4xl" />
          <p className="font-medium">{$message}</p>
        </div>
      )}
    </>
  );
};

export default TableLoading;
