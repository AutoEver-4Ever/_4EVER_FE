'use client';

const SalesStats = () => {
  const stats = [
    {
      title: '이번 달 매출',
      value: '₩485,200,000',
      change: '+12.5%',
      changeType: 'increase',
      icon: 'ri-money-dollar-circle-line',
      color: 'blue',
    },
    {
      title: '신규 주문',
      value: '127건',
      change: '+8.2%',
      changeType: 'increase',
      icon: 'ri-shopping-cart-line',
      color: 'green',
    },
    {
      title: '활성 고객',
      value: '2,847명',
      change: '+15.3%',
      changeType: 'increase',
      icon: 'ri-user-3-line',
      color: 'purple',
    },
    {
      title: '평균 주문액',
      value: '₩3,820,000',
      change: '-2.1%',
      changeType: 'decrease',
      icon: 'ri-bar-chart-line',
      color: 'orange',
    },
  ];

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
      {stats.map((stat, index) => (
        <div
          key={index}
          className="bg-white rounded-lg border border-gray-200 p-6 hover:shadow-md transition-shadow duration-200"
        >
          <div className="flex items-center justify-between mb-4">
            <div
              className={`w-12 h-12 rounded-lg flex items-center justify-center ${
                stat.color === 'blue'
                  ? 'bg-blue-100'
                  : stat.color === 'green'
                    ? 'bg-green-100'
                    : stat.color === 'purple'
                      ? 'bg-purple-100'
                      : 'bg-orange-100'
              }`}
            >
              <i
                className={`${stat.icon} text-xl ${
                  stat.color === 'blue'
                    ? 'text-blue-600'
                    : stat.color === 'green'
                      ? 'text-green-600'
                      : stat.color === 'purple'
                        ? 'text-purple-600'
                        : 'text-orange-600'
                }`}
              ></i>
            </div>
            <div
              className={`flex items-center space-x-1 text-sm font-medium ${
                stat.changeType === 'increase' ? 'text-green-600' : 'text-red-600'
              }`}
            >
              <i
                className={`${
                  stat.changeType === 'increase' ? 'ri-arrow-up-line' : 'ri-arrow-down-line'
                } text-xs`}
              ></i>
              <span>{stat.change}</span>
            </div>
          </div>

          <div>
            <h3 className="text-sm font-medium text-gray-600 mb-1">{stat.title}</h3>
            <p className="text-2xl font-bold text-gray-900">{stat.value}</p>
          </div>
        </div>
      ))}
    </div>
  );
};

export default SalesStats;
