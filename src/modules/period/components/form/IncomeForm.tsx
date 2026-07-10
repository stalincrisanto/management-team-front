'use client';

import { useEffect } from 'react';
import { zodResolver } from '@hookform/resolvers/zod';
import { Alert, Stack } from '@mui/material';
import { useForm } from 'react-hook-form';

import { CustomNumberInput } from '@/components/CustomNumberInput';
import CustomSelectField, { SelectOption } from '@/components/CustomSelectField';
import { CustomTextInput } from '@/components/CustomTextInput';

import { incomeDefaultValues, IncomeFormValues, incomeSchema } from '../../schema/income.schema';

interface IncomeFormProps {
  formId: string;
  initialValues: IncomeFormValues;
  disabled?: boolean;
  serverError?: string | null;
  onSubmit: (values: IncomeFormValues) => void;
  incomeTypesOptions: SelectOption[];
}

const IncomeForm = ({
  formId,
  initialValues = incomeDefaultValues,
  disabled = false,
  serverError = null,
  onSubmit,
  incomeTypesOptions
}: IncomeFormProps) => {
  const { control, handleSubmit, reset } = useForm<IncomeFormValues>({
    defaultValues: initialValues,
    resolver: zodResolver(incomeSchema),
  });

  useEffect(() => {
    reset(initialValues);
  }, [initialValues, reset]);

  return (
    <Stack id={formId} component="form" spacing={2.5} onSubmit={handleSubmit(onSubmit)} noValidate>
      <CustomTextInput
        control={control}
        name="sourceName"
        label="Fuente / aportante"
        placeholder="Ej. Stalin, Hostal Capricornio..."
        required
        disabled={disabled}
      />

      <CustomSelectField
        control={control}
        name="incomeTypeId"
        label="Tipo de ingreso"
        options={incomeTypesOptions}
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

export default IncomeForm;
