// 'use client';

// const CashFlow = () => {
//   const cashFlowData = [
//     {
//       category: '영업활동 현금흐름',
//       items: [
//         { name: '당기순이익', amount: '₩40,000,000', type: 'positive' },
//         { name: '감가상각비', amount: '₩8,500,000', type: 'positive' },
//         { name: '매출채권 증가', amount: '₩-2,000,000', type: 'negative' },
//         { name: '재고자산 증가', amount: '₩-5,000,000', type: 'negative' },
//         { name: '매입채무 감소', amount: '₩-1,500,000', type: 'negative' },
//       ],
//       total: '₩40,000,000',
//       totalType: 'positive',
//     },
//     {
//       category: '투자활동 현금흐름',
//       items: [
//         { name: '유형자산 취득', amount: '₩-15,000,000', type: 'negative' },
//         { name: '무형자산 취득', amount: '₩-2,000,000', type: 'negative' },
//         { name: '투자자산 처분', amount: '₩3,000,000', type: 'positive' },
//       ],
//       total: '₩-14,000,000',
//       totalType: 'negative',
//     },
//     {
//       category: '재무활동 현금흐름',
//       items: [
//         { name: '단기차입금 상환', amount: '₩-10,000,000', type: 'negative' },
//         { name: '배당금 지급', amount: '₩-5,000,000', type: 'negative' },
//         { name: '자본금 증자', amount: '₩0', type: 'neutral' },
//       ],
//       total: '₩-15,000,000',
//       totalType: 'negative',
//     },
//   ];

//   const getAmountColor = (type: string) => {
//     switch (type) {
//       case 'positive':
//         return 'text-green-600';
//       case 'negative':
//         return 'text-red-600';
//       default:
//         return 'text-gray-600';
//     }
//   };

//   const getTotalBgColor = (type: string) => {
//     switch (type) {
//       case 'positive':
//         return 'bg-green-50 border-green-200';
//       case 'negative':
//         return 'bg-red-50 border-red-200';
//       default:
//         return 'bg-gray-50 border-gray-200';
//     }
//   };

//   return (
//     <div className="space-y-6">
//       <div className="bg-white rounded-lg border border-gray-200 p-6">
//         <div className="flex items-center space-x-2 mb-6">
//           <i className="ri-line-chart-line text-blue-600 text-lg"></i>
//           <h2 className="text-lg font-semibold text-gray-900">현금흐름표</h2>
//         </div>

//         <div className="space-y-8">
//           {cashFlowData.map((section, sectionIndex) => (
//             <div key={sectionIndex} className="space-y-4">
//               <h3 className="text-lg font-semibold text-gray-900 border-b border-gray-200 pb-2">
//                 {section.category}
//               </h3>

//               <div className="space-y-2">
//                 {section.items.map((item, itemIndex) => (
//                   <div
//                     key={itemIndex}
//                     className="flex justify-between items-center py-2 px-4 hover:bg-gray-50 rounded-lg"
//                   >
//                     <span className="text-sm text-gray-700">{item.name}</span>
//                     <span className={`text-sm font-medium ${getAmountColor(item.type)}`}>
//                       {item.amount}
//                     </span>
//                   </div>
//                 ))}
//               </div>

//               <div
//                 className={`flex justify-between items-center py-3 px-4 rounded-lg border ${getTotalBgColor(section.totalType)}`}
//               >
//                 <span className="text-sm font-semibold text-gray-900">{section.category} 소계</span>
//                 <span className={`text-sm font-bold ${getAmountColor(section.totalType)}`}>
//                   {section.total}
//                 </span>
//               </div>
//             </div>
//           ))}

//           <div className="border-t-2 border-gray-300 pt-4">
//             <div className="flex justify-between items-center py-4 px-4 bg-blue-50 rounded-lg border border-blue-200">
//               <span className="text-lg font-bold text-gray-900">현금 및 현금성자산 순증가</span>
//               <span className="text-lg font-bold text-green-600">₩11,000,000</span>
//             </div>
//           </div>
//         </div>
//       </div>

//       <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
//         <div className="bg-white rounded-lg border border-gray-200 p-6">
//           <div className="flex items-center space-x-3 mb-4">
//             <div className="w-10 h-10 bg-green-100 rounded-lg flex items-center justify-center">
//               <i className="ri-arrow-up-circle-line text-green-600 text-lg"></i>
//             </div>
//             <h3 className="font-semibold text-gray-900">영업 현금흐름</h3>
//           </div>
//           <div className="text-2xl font-bold text-green-600 mb-1">₩40,000,000</div>
//           <div className="text-sm text-gray-500">전월 대비 +8.5%</div>
//         </div>

//         <div className="bg-white rounded-lg border border-gray-200 p-6">
//           <div className="flex items-center space-x-3 mb-4">
//             <div className="w-10 h-10 bg-red-100 rounded-lg flex items-center justify-center">
//               <i className="ri-arrow-down-circle-line text-red-600 text-lg"></i>
//             </div>
//             <h3 className="font-semibold text-gray-900">투자 현금흐름</h3>
//           </div>
//           <div className="text-2xl font-bold text-red-600 mb-1">₩-14,000,000</div>
//           <div className="text-sm text-gray-500">전월 대비 -12.3%</div>
//         </div>

//         <div className="bg-white rounded-lg border border-gray-200 p-6">
//           <div className="flex items-center space-x-3 mb-4">
//             <div className="w-10 h-10 bg-blue-100 rounded-lg flex items-center justify-center">
//               <i className="ri-bank-card-line text-blue-600 text-lg"></i>
//             </div>
//             <h3 className="font-semibold text-gray-900">현금 잔액</h3>
//           </div>
//           <div className="text-2xl font-bold text-blue-600 mb-1">₩180,000,000</div>
//           <div className="text-sm text-gray-500">전월 대비 +6.5%</div>
//         </div>
//       </div>
//     </div>
//   );
// };

// export default CashFlow;
