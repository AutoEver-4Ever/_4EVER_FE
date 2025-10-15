'use client';

import { useQuery } from '@tanstack/react-query';
import { useMemo, useState } from 'react';
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
import { getAnalytics } from '../service';
import { AnalyticsQueryParams, SalesAnalysis } from '@/app/sales/types/SalesChartType';

const SalesChart = () => {
  const [startDate, setStartDate] = useState('');
  const [endDate, setEndDate] = useState('');

  const queryParams = useMemo(
    () => ({
      start: startDate || '',
      end: endDate || '',
    }),
    [startDate, endDate],
  );

  const {
    data: analyticsData,
    isLoading,
    isError,
  } = useQuery<SalesAnalysis>({
    queryKey: ['analytics', queryParams],
    queryFn: ({ queryKey }) => getAnalytics(queryKey[1] as AnalyticsQueryParams),

    staleTime: 1000,
  });

  // const monthlyData = [
  //   { month: '1월', sales: 420000000, orders: 85, customers: 45 },
  //   { month: '2월', sales: 380000000, orders: 78, customers: 42 },
  //   { month: '3월', sales: 450000000, orders: 92, customers: 48 },
  //   { month: '4월', sales: 520000000, orders: 105, customers: 52 },
  //   { month: '5월', sales: 480000000, orders: 98, customers: 49 },
  //   { month: '6월', sales: 550000000, orders: 112, customers: 55 },
  //   { month: '7월', sales: 485000000, orders: 127, customers: 58 },
  // ];

  // const weeklyData = [
  //   { week: '12월 1주차', sales: 120000000, orders: 22, customers: 12 },
  //   { week: '12월 2주차', sales: 145000000, orders: 27, customers: 15 },
  //   { week: '12월 3주차', sales: 132000000, orders: 25, customers: 13 },
  //   { week: '12월 4주차', sales: 155000000, orders: 31, customers: 17 },
  //   { week: '1월 1주차', sales: 120000000, orders: 31, customers: 17 },
  //   { week: '1월 2주차', sales: 145000000, orders: 31, customers: 17 },
  //   { week: '1월 3주차', sales: 132000000, orders: 31, customers: 17 },
  //   { week: '1월 4주차', sales: 155000000, orders: 31, customers: 17 },
  //   { week: '2월 1주차', sales: 120000000, orders: 31, customers: 17 },
  //   { week: '2월 2주차', sales: 145000000, orders: 31, customers: 17 },
  //   { week: '2월 3주차', sales: 132000000, orders: 31, customers: 17 },
  //   { week: '2월 4주차', sales: 155000000, orders: 31, customers: 17 },
  // ];

  // const productData = [
  //   { name: '스테인리스 강판', value: 35, amount: 180000000 },
  //   { name: '알루미늄 합금', value: 25, amount: 125000000 },
  //   { name: '탄소강', value: 20, amount: 95000000 },
  //   { name: '구리 파이프', value: 12, amount: 58000000 },
  //   { name: '특수강', value: 8, amount: 42000000 },
  // ];

  // const customerData = [
  //   {
  //     id: 'C-001',
  //     name: '삼성전자',
  //     manager: '김철수',
  //     orders: 45,
  //     amount: 1250000000,
  //     status: '활성',
  //   },
  //   {
  //     id: 'C-002',
  //     name: 'LG화학',
  //     manager: '박영희',
  //     orders: 32,
  //     amount: 890000000,
  //     status: '활성',
  //   },
  //   {
  //     id: 'C-003',
  //     name: '현대자동차',
  //     manager: '이민수',
  //     orders: 28,
  //     amount: 720000000,
  //     status: '활성',
  //   },
  //   {
  //     id: 'C-004',
  //     name: 'SK하이닉스',
  //     manager: '정유진',
  //     orders: 24,
  //     amount: 650000000,
  //     status: '활성',
  //   },
  //   {
  //     id: 'C-005',
  //     name: 'POSCO',
  //     manager: '최정호',
  //     orders: 20,
  //     amount: 580000000,
  //     status: '비활성',
  //   },
  // ];

  const COLORS = ['#3B82F6', '#10B981', '#F59E0B', '#EF4444', '#8B5CF6'];

  const formatCurrency = (value: number) => {
    return `₩${(value / 100000000).toFixed(1)}억`;
  };

  // trend → 주차별 매출 추이 데이터
  const weeklyData = useMemo(() => {
    if (!analyticsData) return [];
    return analyticsData.trend.map((t) => ({
      week: `${t.month}월 ${t.week}주차`,
      sales: t.sale,
      orders: t.orderCount,
    }));
  }, [analyticsData]);

  // productShare → 제품별 매출 비중
  const productData = useMemo(() => {
    if (!analyticsData) return [];
    return analyticsData.productShare.map((p) => ({
      name: p.productName,
      value: p.saleShare,
      amount: p.sale,
    }));
  }, [analyticsData]);

  // topCustomers → 주요 고객별 매출
  const customerData = useMemo(() => {
    if (!analyticsData) return [];
    return analyticsData.topCustomers.map((c) => ({
      id: c.customerCode,
      name: c.customerName,
      orders: c.orderCount,
      amount: c.sale,
      status: '활성', // 필요 시 상태 추가
    }));
  }, [analyticsData]);

  return (
    <div className="space-y-6 mt-6">
      <div className="flex items-center space-x-4">
        <div className="flex items-center space-x-2">
          <label className="text-sm font-medium text-gray-700">시작날짜:</label>
          <input
            type="date"
            value={startDate}
            onChange={(e: React.ChangeEvent<HTMLInputElement>) => setStartDate(e.target.value)}
            className="px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent text-sm bg-white"
          />
        </div>
        <div className="flex items-center space-x-2">
          <label className="text-sm font-medium text-gray-700">끝날짜:</label>
          <input
            type="date"
            value={endDate}
            onChange={(e: React.ChangeEvent<HTMLInputElement>) => setEndDate(e.target.value)}
            className="bg-white px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent text-sm"
          />
        </div>
      </div>
      {/* 월별 매출 추이 */}
      <div className="bg-white rounded-lg border border-gray-200 p-6">
        <div className=" flex items-center justify-between mb-6">
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
            <AreaChart data={weeklyData}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="week" />
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
                      // fill={c.status === '활성' ? 'url(#barActive)' : 'url(#barInactive)'}
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
