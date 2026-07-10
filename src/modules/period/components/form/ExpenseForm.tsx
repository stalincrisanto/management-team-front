'use client';

import { useEffect } from 'react';
import { zodResolver } from '@hookform/resolvers/zod';
import { Alert, Stack } from '@mui/material';
import { useForm } from 'react-hook-form';

import { CustomNumberInput } from '@/components/CustomNumberInput';
import CustomSelectField, { SelectOption } from '@/components/CustomSelectField';
import { CustomTextInput } from '@/components/CustomTextInput';

import {
  expenseDefaultValues,
  ExpenseFormValues,
  expenseSchema,
} from '../../schema/expense.schema';

interface ExpenseFormProps {
  formId: string;
  initialValues: ExpenseFormValues;
  disabled?: boolean;
  serverError?: string | null;
  onSubmit: (values: ExpenseFormValues) => void;
  expenseCategoryOptions: SelectOption[];
}

const ExpenseForm = ({
  formId,
  initialValues = expenseDefaultValues,
  disabled = false,
  serverError = null,
  onSubmit,
  expenseCategoryOptions,
}: ExpenseFormProps) => {
  const { control, handleSubmit, reset } = useForm<ExpenseFormValues>({
    defaultValues: initialValues,
    resolver: zodResolver(expenseSchema),
  });

  useEffect(() => {
    reset(initialValues);
  }, [initialValues, reset]);

  return (
    <Stack id={formId} component="form" spacing={2.5} onSubmit={handleSubmit(onSubmit)} noValidate>
      <CustomTextInput
        control={control}
        name="concept"
        label="Concepto"
        placeholder="Ej. Árbitro, hidratación..."
        required
        disabled={disabled}
      />
      <CustomSelectField
        control={control}
        name="expenseCategoryId"
        label="Tipo de egreso"
        options={expenseCategoryOptions}
        required
        disabled={disabled}
      />
      <CustomNumberInput
        control={control}
        name="amount"
        label="Valor (USD)"
        required
        disabled={disabled}
      />
      {serverError ? <Alert color="error">{serverError}</Alert> : null}
    </Stack>
  );
};

export default ExpenseForm;
