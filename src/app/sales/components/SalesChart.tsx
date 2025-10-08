'use client';

import {
  AreaChart,
  Area,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  BarChart,
  Bar,
  PieChart,
  Pie,
  Cell,
} from 'recharts';

const SalesChart = () => {
  const monthlyData = [
    { month: '1월', sales: 420000000, orders: 85, customers: 45 },
    { month: '2월', sales: 380000000, orders: 78, customers: 42 },
    { month: '3월', sales: 450000000, orders: 92, customers: 48 },
    { month: '4월', sales: 520000000, orders: 105, customers: 52 },
    { month: '5월', sales: 480000000, orders: 98, customers: 49 },
    { month: '6월', sales: 550000000, orders: 112, customers: 55 },
    { month: '7월', sales: 485000000, orders: 127, customers: 58 },
  ];

  const productData = [
    { name: '스테인리스 강판', value: 35, amount: 180000000 },
    { name: '알루미늄 합금', value: 25, amount: 125000000 },
    { name: '탄소강', value: 20, amount: 95000000 },
    { name: '구리 파이프', value: 12, amount: 58000000 },
    { name: '특수강', value: 8, amount: 42000000 },
  ];

  const customerData = [
    { name: '삼성전자', orders: 45, amount: 1250000000 },
    { name: 'LG화학', orders: 32, amount: 890000000 },
    { name: '현대자동차', orders: 28, amount: 720000000 },
    { name: 'SK하이닉스', orders: 24, amount: 650000000 },
    { name: 'POSCO', orders: 20, amount: 580000000 },
  ];

  const COLORS = ['#3B82F6', '#10B981', '#F59E0B', '#EF4444', '#8B5CF6'];

  const formatCurrency = (value: number) => {
    return `₩${(value / 100000000).toFixed(1)}억`;
  };

  return (
    <div className="space-y-6">
      {/* 월별 매출 추이 */}
      <div className="bg-white rounded-lg border border-gray-200 p-6">
        <div className="flex items-center justify-between mb-6">
          <h3 className="text-lg font-semibold text-gray-900">월별 매출 추이</h3>
          <div className="flex items-center space-x-4">
            <div className="flex items-center space-x-2">
              <div className="w-3 h-3 bg-blue-500 rounded-full"></div>
              <span className="text-sm text-gray-600">매출액</span>
            </div>
            <div className="flex items-center space-x-2">
              <div className="w-3 h-3 bg-green-500 rounded-full"></div>
              <span className="text-sm text-gray-600">주문건수</span>
            </div>
          </div>
        </div>
        <div className="h-80">
          <ResponsiveContainer width="100%" height="100%">
            <AreaChart data={monthlyData}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="month" />
              <YAxis yAxisId="left" tickFormatter={formatCurrency} />
              <YAxis yAxisId="right" orientation="right" />
              <Tooltip
                formatter={(value, name) => [
                  name === 'sales' ? formatCurrency(Number(value)) : `${value}건`,
                  name === 'sales' ? '매출액' : '주문건수',
                ]}
              />
              <Area
                yAxisId="left"
                type="monotone"
                dataKey="sales"
                stroke="#3B82F6"
                fill="#3B82F6"
                fillOpacity={0.1}
              />
              <Area
                yAxisId="right"
                type="monotone"
                dataKey="orders"
                stroke="#10B981"
                fill="#10B981"
                fillOpacity={0.1}
              />
            </AreaChart>
          </ResponsiveContainer>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* 제품별 매출 비중 */}
        <div className="bg-white rounded-lg border border-gray-200 p-6">
          <h3 className="text-lg font-semibold text-gray-900 mb-6">제품별 매출 비중</h3>
          <div className="h-64">
            <ResponsiveContainer width="100%" height="100%">
              <PieChart>
                <Pie
                  data={productData}
                  cx="50%"
                  cy="50%"
                  innerRadius={60}
                  outerRadius={100}
                  paddingAngle={5}
                  dataKey="value"
                >
                  {productData.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                  ))}
                </Pie>
                <Tooltip formatter={(value) => [`${value}%`, '비중']} />
              </PieChart>
            </ResponsiveContainer>
          </div>
          <div className="mt-4 space-y-2">
            {productData.map((item, index) => (
              <div key={item.name} className="flex items-center justify-between">
                <div className="flex items-center space-x-2">
                  <div
                    className={`w-3 h-3 rounded-full`}
                    style={{ backgroundColor: COLORS[index] }}
                  ></div>
                  <span className="text-sm text-gray-700">{item.name}</span>
                </div>
                <div className="text-sm font-medium text-gray-900">
                  {item.value}% ({formatCurrency(item.amount)})
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* 주요 고객별 매출 */}
        <div className="bg-white rounded-lg border border-gray-200 p-6">
          <h3 className="text-lg font-semibold text-gray-900 mb-6">주요 고객별 매출</h3>
          <div className="h-64">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={customerData} layout="horizontal">
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis type="number" tickFormatter={formatCurrency} />
                <YAxis dataKey="name" type="category" width={80} />
                <Tooltip formatter={(value) => [formatCurrency(Number(value)), '매출액']} />
                <Bar dataKey="amount" fill="#3B82F6" />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </div>
      </div>

      {/* 매출 성과 지표 */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <div className="bg-white rounded-lg border border-gray-200 p-6">
          <div className="flex items-center space-x-3 mb-4">
            <div className="w-10 h-10 bg-blue-100 rounded-lg flex items-center justify-center">
              <i className="ri-line-chart-line text-blue-600 text-lg"></i>
            </div>
            <h3 className="font-semibold text-gray-900">매출 성장률</h3>
          </div>
          <div className="text-2xl font-bold text-gray-900 mb-1">+12.5%</div>
          <div className="text-sm text-gray-500">전월 대비</div>
        </div>

        <div className="bg-white rounded-lg border border-gray-200 p-6">
          <div className="flex items-center space-x-3 mb-4">
            <div className="w-10 h-10 bg-green-100 rounded-lg flex items-center justify-center">
              <i className="ri-shopping-cart-line text-green-600 text-lg"></i>
            </div>
            <h3 className="font-semibold text-gray-900">평균 주문액</h3>
          </div>
          <div className="text-2xl font-bold text-gray-900 mb-1">₩3.8M</div>
          <div className="text-sm text-gray-500">건당 평균</div>
        </div>

        <div className="bg-white rounded-lg border border-gray-200 p-6">
          <div className="flex items-center space-x-3 mb-4">
            <div className="w-10 h-10 bg-purple-100 rounded-lg flex items-center justify-center">
              <i className="ri-user-3-line text-purple-600 text-lg"></i>
            </div>
            <h3 className="font-semibold text-gray-900">고객 유지율</h3>
          </div>
          <div className="text-2xl font-bold text-gray-900 mb-1">94.2%</div>
          <div className="text-sm text-gray-500">재주문 고객</div>
        </div>

        <div className="bg-white rounded-lg border border-gray-200 p-6">
          <div className="flex items-center space-x-3 mb-4">
            <div className="w-10 h-10 bg-orange-100 rounded-lg flex items-center justify-center">
              <i className="ri-time-line text-orange-600 text-lg"></i>
            </div>
            <h3 className="font-semibold text-gray-900">평균 납기</h3>
          </div>
          <div className="text-2xl font-bold text-gray-900 mb-1">8.5일</div>
          <div className="text-sm text-gray-500">주문-출하</div>
        </div>
      </div>
    </div>
  );
};

export default SalesChart;
