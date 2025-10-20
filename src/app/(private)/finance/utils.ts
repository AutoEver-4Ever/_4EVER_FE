// 전표 상태에 따른 색상
export const getChitStatusColor = (status: string) => {
  switch (status) {
    case 'unpaid':
      return 'bg-red-100 text-red-700';
    case 'pending':
      return 'bg-yellow-100 text-yellow-700';
    case 'paid':
      return 'bg-green-100 text-green-700';
    default:
      return 'bg-gray-100 text-gray-700';
  }
};

// 전표 상태에 따른 텍스트
export const getChitStatusText = (status: string) => {
  switch (status) {
    case 'unpaid':
      return '미납';
    case 'pending':
      return '확인대기';
    case 'paid':
      return '완납';
    default:
      return status;
  }
};
