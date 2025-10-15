'use client';

import { useState } from 'react';
import FinanceHeader from '@/app/finance/components/FinanceHeader';
import FinanceTabNavigation from './components/FinanceTabNavigation';
import FinanceStats from './components/FinanceStats';

export default function FinancePage() {
  const [showVoucherModal, setShowVoucherModal] = useState(false);
  const [accountRows, setAccountRows] = useState([
    { id: 1, account: '', description: '', debit: 0, credit: 0 },
    { id: 2, account: '', description: '', debit: 0, credit: 0 },
  ]);
  const [selectedCompany, setSelectedCompany] = useState('');

  const calculateTotals = () => {
    const totalDebit = accountRows.reduce((sum, row) => sum + (Number(row.debit) || 0), 0);
    const totalCredit = accountRows.reduce((sum, row) => sum + (Number(row.credit) || 0), 0);
    return { totalDebit, totalCredit };
  };

  const { totalDebit, totalCredit } = calculateTotals();
  const isBalanced = totalDebit === totalCredit && totalDebit > 0;

  const handleVoucherSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!isBalanced) {
      alert('차변과 대변의 합계가 일치하지 않습니다.');
      return;
    }
    if (!selectedCompany) {
      alert('거래처를 선택해주세요.');
      return;
    }
    alert('전표가 성공적으로 작성되었습니다.');
    setShowVoucherModal(false);
    setSelectedCompany('');
    setAccountRows([
      { id: 1, account: '', description: '', debit: 0, credit: 0 },
      { id: 2, account: '', description: '', debit: 0, credit: 0 },
    ]);
  };

  const handleModalClose = () => {
    setShowVoucherModal(false);
    setSelectedCompany('');
    setAccountRows([
      { id: 1, account: '', description: '', debit: 0, credit: 0 },
      { id: 2, account: '', description: '', debit: 0, credit: 0 },
    ]);
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* 페이지 헤더 */}
        <FinanceHeader />

        {/* 탭 네비게이션 */}
        <FinanceTabNavigation />
      </main>
    </div>
  );
}
