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

  const weeklyData = [
    { week: '12월 1주차', sales: 120000000, orders: 22, customers: 12 },
    { week: '12월 2주차', sales: 145000000, orders: 27, customers: 15 },
    { week: '12월 3주차', sales: 132000000, orders: 25, customers: 13 },
    { week: '12월 4주차', sales: 155000000, orders: 31, customers: 17 },
    { week: '1월 1주차', sales: 120000000, orders: 31, customers: 17 },
    { week: '1월 2주차', sales: 145000000, orders: 31, customers: 17 },
    { week: '1월 3주차', sales: 132000000, orders: 31, customers: 17 },
    { week: '1월 4주차', sales: 155000000, orders: 31, customers: 17 },
    { week: '2월 1주차', sales: 120000000, orders: 31, customers: 17 },
    { week: '2월 2주차', sales: 145000000, orders: 31, customers: 17 },
    { week: '2월 3주차', sales: 132000000, orders: 31, customers: 17 },
    { week: '2월 4주차', sales: 155000000, orders: 31, customers: 17 },
  ];

  const productData = [
    { name: '스테인리스 강판', value: 35, amount: 180000000 },
    { name: '알루미늄 합금', value: 25, amount: 125000000 },
    { name: '탄소강', value: 20, amount: 95000000 },
    { name: '구리 파이프', value: 12, amount: 58000000 },
    { name: '특수강', value: 8, amount: 42000000 },
  ];

  const customerData = [
    {
      id: 'C-001',
      name: '삼성전자',
      manager: '김철수',
      orders: 45,
      amount: 1250000000,
      status: '활성',
    },
    {
      id: 'C-002',
      name: 'LG화학',
      manager: '박영희',
      orders: 32,
      amount: 890000000,
      status: '활성',
    },
    {
      id: 'C-003',
      name: '현대자동차',
      manager: '이민수',
      orders: 28,
      amount: 720000000,
      status: '활성',
    },
    {
      id: 'C-004',
      name: 'SK하이닉스',
      manager: '정유진',
      orders: 24,
      amount: 650000000,
      status: '활성',
    },
    {
      id: 'C-005',
      name: 'POSCO',
      manager: '최정호',
      orders: 20,
      amount: 580000000,
      status: '비활성',
    },
  ];

  const COLORS = ['#3B82F6', '#10B981', '#F59E0B', '#EF4444', '#8B5CF6'];

  const formatCurrency = (value: number) => {
    return `₩${(value / 100000000).toFixed(1)}억`;
  };

  return (
    <div className="space-y-6 mt-6">
      {/* 월별 매출 추이 */}
      <div className="bg-white rounded-lg border border-gray-200 p-6">
        <div className=" flex items-center justify-between mb-6">
          <h3 className="text-lg font-semibold text-gray-900">월별 매출 추이</h3>
          {/* 기간 선택 셀렉트 박스 */}
          <div className="flex items-center space-x-2 pl-120">
            {/* 시작 연도 */}
            <select className="min-w-[90px] px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent text-sm bg-white">
              <option>2024</option>
              <option>2025</option>
              <option>2026</option>
            </select>

            {/* 시작 월 */}
            <select className="min-w-[90px] px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent text-sm bg-white">
              {[...Array(12)].map((_, i) => (
                <option key={i}>{i + 1}월</option>
              ))}
            </select>

            <span className="text-sm text-gray-500">~</span>

            {/* 종료 연도 */}
            <select className="min-w-[90px] px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent text-sm bg-white">
              <option>2024</option>
              <option>2025</option>
              <option>2026</option>
            </select>

            {/* 종료 월 */}
            <select className="min-w-[90px] px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent text-sm bg-white">
              {[...Array(12)].map((_, i) => (
                <option key={i}>{i + 1}월</option>
              ))}
            </select>
          </div>
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
          {/* <ResponsiveContainer width="100%" height="100%">
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
          </ResponsiveContainer> */}
          <ResponsiveContainer width="100%" height="100%">
            <AreaChart data={weeklyData}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="week" /> {/* ✅ month → week 로 변경 */}
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
        <div className="bg-white rounded-lg border border-gray-200 p-6">
          <div className="flex flex-row items-center  justify-between mb-6">
            <h3 className="flex items-center text-lg font-semibold text-gray-900 mb-0">
              제품별 매출 비중
            </h3>
            <div className="flex  w-48 justify-between">
              <select className="min-w-[90px] px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent text-sm bg-white">
                <option>2024</option>
                <option>2025</option>
                <option>2026</option>
              </select>
              <select className="min-w-[90px] px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent text-sm bg-white">
                {[...Array(12)].map((_, i) => (
                  <option key={i}>{i + 1}월</option>
                ))}
              </select>
            </div>
          </div>

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

        <div className="bg-white rounded-lg border border-gray-200 p-6">
          <div className="flex flex-row items-center  justify-between mb-6">
            <h3 className="flex items-center text-lg font-semibold text-gray-900 mb-0">
              주요 고객별 매출
            </h3>
            <div className="flex  w-48 justify-between">
              <select className="min-w-[90px] px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent text-sm bg-white">
                <option>2024</option>
                <option>2025</option>
                <option>2026</option>
              </select>

              <select className="min-w-[90px] px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent text-sm bg-white">
                {[...Array(12)].map((_, i) => (
                  <option key={i}>{i + 1}월</option>
                ))}
              </select>
            </div>
          </div>
          <div className="h-74 mt-15">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={customerData} layout="vertical">
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis type="number" tickFormatter={formatCurrency} />
                <YAxis dataKey="name" type="category" width={80} />
                <Tooltip
                  formatter={(value, name, props) => {
                    const customer = customerData.find((c) => c.name === props.payload.name);
                    return [
                      `₩${(Number(value) / 100000000).toFixed(1)}억 (${customer?.orders ?? 0}건)`,
                      '매출액',
                    ];
                  }}
                />
                <defs>
                  <linearGradient id="barActive" x1="0" y1="0" x2="1" y2="0">
                    <stop offset="0%" stopColor="#60A5FA" />
                    <stop offset="100%" stopColor="#2563EB" />
                  </linearGradient>
                  <linearGradient id="barInactive" x1="0" y1="0" x2="1" y2="0">
                    <stop offset="0%" stopColor="#D1D5DB" />
                    <stop offset="100%" stopColor="#9CA3AF" />
                  </linearGradient>
                </defs>

                <Bar dataKey="amount">
                  {customerData.map((c, i) => (
                    <Cell
                      key={i}
                      fill={c.status === '활성' ? 'url(#barActive)' : 'url(#barInactive)'}
                    />
                  ))}
                </Bar>
              </BarChart>
            </ResponsiveContainer>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SalesChart;
