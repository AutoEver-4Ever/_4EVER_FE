export const getMovementIcon = (type: string) => {
  const icons = {
    in: 'ri-arrow-down-line',
    out: 'ri-arrow-up-line',
    transfer: 'ri-arrow-left-right-line',
  };
  return icons[type as keyof typeof icons];
};

export const getMovementColor = (type: string) => {
  const colors = {
    in: 'text-green-600 bg-green-100',
    out: 'text-red-600 bg-red-100',
    transfer: 'text-blue-600 bg-blue-100',
  };
  return colors[type as keyof typeof colors];
};

export const getMovementLabel = (type: string) => {
  const labels = {
    in: '입고',
    out: '출고',
    transfer: '이동',
  };
  return labels[type as keyof typeof labels];
};
