'use client';

import { useEffect } from 'react';
import { zodResolver } from '@hookform/resolvers/zod';
import { Alert, Stack } from '@mui/material';
import { useForm } from 'react-hook-form';

import CustomSelectField, { SelectOption } from '@/components/CustomSelectField';
import { CustomTextInput } from '@/components/CustomTextInput';

import { periodDefaultValues, PeriodFormValues, periodSchema } from '../../schema/period.schema';

interface PeriodFormProps {
  formId: string;
  seasonOptions: SelectOption[];
  initialValues?: PeriodFormValues;
  disabled?: boolean;
  serverError?: string | null;
  onSubmit: (values: PeriodFormValues) => void;
}

const PeriodForm = ({
  formId,
  seasonOptions,
  initialValues = periodDefaultValues,
  disabled = false,
  serverError = null,
  onSubmit,
}: PeriodFormProps) => {
  const { control, handleSubmit, reset } = useForm<PeriodFormValues>({
    defaultValues: initialValues,
    resolver: zodResolver(periodSchema),
  });

  useEffect(() => {
    reset(initialValues);
  }, [initialValues, reset]);

  return (
    <Stack id={formId} component="form" spacing={3} onSubmit={handleSubmit(onSubmit)} noValidate>
      <CustomSelectField
        control={control}
        name="seasonId"
        label="Temporada"
        options={seasonOptions}
        required
        disabled={disabled}
      />
      <Stack direction={{ xs: 'column', md: 'row' }} spacing={2}>
        <CustomTextInput
          control={control}
          name="title"
          label="Título"
          placeholder="Jornada 3"
          required
          disabled={disabled}
        />
        <CustomTextInput
          control={control}
          name="periodDate"
          label="Fecha"
          type="date"
          required
          disabled={disabled}
        />
      </Stack>
      <CustomTextInput
        control={control}
        name="opponent"
        label="Rival"
        placeholder="Ej. Taurus"
        required
        disabled={disabled}
      />
      {serverError ? <Alert color="error">{serverError}</Alert> : null}
    </Stack>
  );
};

export default PeriodForm;
