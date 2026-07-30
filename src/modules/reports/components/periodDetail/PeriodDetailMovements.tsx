'use client';

import React, { useState } from 'react';
import { PeriodApiResponse } from '@/modules/period/types/period.types';
import { Card } from '@mui/material';

import CustomTabs, { CustomTabItem } from '@/components/CustomTabs';
import FinancialMovementList, { FinancialMovementItem } from '@/components/FinancialMovementList';

type MovementTab = 'incomes' | 'expenses';

interface ReportPeriodMovementsProps {
  period: PeriodApiResponse;
}

const PeriodDetailMovements = ({ period }: ReportPeriodMovementsProps) => {
  const [selectedTab, setSelectedTab] = useState<MovementTab>('incomes');

  const incomeItems: FinancialMovementItem[] = (period.incomes ?? []).map((income) => ({
    id: income.id,
    title: income.sourceName,
    category: income.incomeType.name,
    amount: Number(income.amount),
    description: income.description,
  }));

  const expenseItems: FinancialMovementItem[] = (period.expenses ?? []).map((expense) => ({
    id: expense.id,
    title: expense.concept,
    category: expense.expenseCategory.name,
    amount: Number(expense.amount),
    description: expense.description,
  }));

  const tabs: CustomTabItem[] = [
    {
      value: 'incomes',
      label: `Ingresos (${incomeItems.length})`,
      content: (
        <FinancialMovementList
          emptyMessage="No existen ingresos registrados para esta jornada."
          items={incomeItems}
          pluralLabel="ingresos"
          singularLabel="ingreso"
          tone="success"
          total={Number(period.totalIncome)}
        />
      ),
    },
    {
      value: 'expenses',
      label: `Gastos (${expenseItems.length})`,
      content: (
        <FinancialMovementList
          emptyMessage="No existen gastos registrados para esta jornada."
          items={expenseItems}
          pluralLabel="gastos"
          singularLabel="gasto"
          tone="error"
          total={Number(period.totalExpenses)}
        />
      ),
    },
  ];

  return (
    <Card variant="outlined" sx={{ overflow: 'hidden' }}>
      <CustomTabs
        ariaLabel="Ingresos y gastos de la jornada"
        idPrefix="report-period"
        items={tabs}
        onChange={(value) => setSelectedTab(value as MovementTab)}
        value={selectedTab}
      />
    </Card>
  );
};

export default PeriodDetailMovements;
