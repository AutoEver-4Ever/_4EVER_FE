'use client';

const AccountingSummary = () => {
  const accountData = [
    {
      category: '자산',
      accounts: [
        {
          name: '현금 및 현금성자산',
          balance: '₩180,000,000',
          change: '+5.8%',
          changeType: 'increase',
        },
        { name: '매출채권', balance: '₩25,000,000', change: '-3.2%', changeType: 'decrease' },
        { name: '재고자산', balance: '₩45,000,000', change: '+12.1%', changeType: 'increase' },
        { name: '유형자산', balance: '₩350,000,000', change: '+2.5%', changeType: 'increase' },
      ],
    },
    {
      category: '부채',
      accounts: [
        { name: '매입채무', balance: '₩18,000,000', change: '-8.1%', changeType: 'decrease' },
        { name: '단기차입금', balance: '₩50,000,000', change: '0%', changeType: 'neutral' },
        { name: '장기차입금', balance: '₩120,000,000', change: '-5.2%', changeType: 'decrease' },
      ],
    },
    {
      category: '자본',
      accounts: [
        { name: '자본금', balance: '₩200,000,000', change: '0%', changeType: 'neutral' },
        { name: '이익잉여금', balance: '₩212,000,000', change: '+18.5%', changeType: 'increase' },
      ],
    },
  ];

  const getChangeColor = (changeType: string) => {
    switch (changeType) {
      case 'increase':
        return 'text-green-600';
      case 'decrease':
        return 'text-red-600';
      default:
        return 'text-gray-600';
    }
  };

  const getChangeIcon = (changeType: string) => {
    switch (changeType) {
      case 'increase':
        return 'ri-arrow-up-line';
      case 'decrease':
        return 'ri-arrow-down-line';
      default:
        return 'ri-subtract-line';
    }
  };

  return (
    <div className="space-y-6">
      <div className="bg-white rounded-lg border border-gray-200 p-6">
        <div className="flex items-center space-x-2 mb-6">
          <i className="ri-pie-chart-line text-blue-600 text-lg"></i>
          <h2 className="text-lg font-semibold text-gray-900">재무상태표 요약</h2>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {accountData.map((category, categoryIndex) => (
            <div key={categoryIndex} className="space-y-4">
              <h3 className="text-lg font-semibold text-gray-900 border-b border-gray-200 pb-2">
                {category.category}
              </h3>
              <div className="space-y-3">
                {category.accounts.map((account, accountIndex) => (
                  <div
                    key={accountIndex}
                    className="flex items-center justify-between p-3 bg-gray-50 rounded-lg"
                  >
                    <div className="flex-1">
                      <div className="text-sm font-medium text-gray-900">{account.name}</div>
                      <div className="text-lg font-bold text-gray-900 mt-1">{account.balance}</div>
                    </div>
                    <div
                      className={`flex items-center text-sm font-medium ${getChangeColor(account.changeType)}`}
                    >
                      <i className={`${getChangeIcon(account.changeType)} mr-1`}></i>
                      {account.change}
                    </div>
                  </div>
                ))}
              </div>
            </div>
          ))}
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div className="bg-white rounded-lg border border-gray-200 p-6">
          <div className="flex items-center space-x-2 mb-4">
            <i className="ri-funds-line text-green-600 text-lg"></i>
            <h3 className="text-lg font-semibold text-gray-900">수익성 지표</h3>
          </div>
          <div className="space-y-4">
            <div className="flex justify-between items-center">
              <span className="text-sm text-gray-600">매출총이익률</span>
              <span className="text-sm font-medium text-gray-900">32.0%</span>
            </div>
            <div className="flex justify-between items-center">
              <span className="text-sm text-gray-600">영업이익률</span>
              <span className="text-sm font-medium text-gray-900">18.5%</span>
            </div>
            <div className="flex justify-between items-center">
              <span className="text-sm text-gray-600">순이익률</span>
              <span className="text-sm font-medium text-gray-900">15.2%</span>
            </div>
            <div className="flex justify-between items-center">
              <span className="text-sm text-gray-600">ROE</span>
              <span className="text-sm font-medium text-gray-900">9.7%</span>
            </div>
          </div>
        </div>

        <div className="bg-white rounded-lg border border-gray-200 p-6">
          <div className="flex items-center space-x-2 mb-4">
            <i className="ri-shield-check-line text-blue-600 text-lg"></i>
            <h3 className="text-lg font-semibold text-gray-900">안정성 지표</h3>
          </div>
          <div className="space-y-4">
            <div className="flex justify-between items-center">
              <span className="text-sm text-gray-600">유동비율</span>
              <span className="text-sm font-medium text-gray-900">148.8%</span>
            </div>
            <div className="flex justify-between items-center">
              <span className="text-sm text-gray-600">당좌비율</span>
              <span className="text-sm font-medium text-gray-900">121.4%</span>
            </div>
            <div className="flex justify-between items-center">
              <span className="text-sm text-gray-600">부채비율</span>
              <span className="text-sm font-medium text-gray-900">45.6%</span>
            </div>
            <div className="flex justify-between items-center">
              <span className="text-sm text-gray-600">자기자본비율</span>
              <span className="text-sm font-medium text-gray-900">68.7%</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AccountingSummary;
