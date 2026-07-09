'use client';

import { useEffect } from 'react';
import { zodResolver } from '@hookform/resolvers/zod';
import { Alert, Stack } from '@mui/material';
import { useForm } from 'react-hook-form';

import { CustomNumberInput } from '@/components/CustomNumberInput';
import { CustomSwitchInput } from '@/components/CustomSwitchInput';
import { CustomTextInput } from '@/components/CustomTextInput';

import { seasonDefaultValues, SeasonFormValues, seasonSchema } from '../../schema/season.schema';

interface SeasonFormProps {
  formId: string;
  initialValues?: SeasonFormValues;
  disabled?: boolean;
  serverError?: string | null;
  onSubmit: (values: SeasonFormValues) => void;
}

const SeasonForm = ({
  formId,
  initialValues = seasonDefaultValues,
  disabled = false,
  serverError = null,
  onSubmit,
}: SeasonFormProps) => {
  const { control, handleSubmit, reset } = useForm<SeasonFormValues>({
    defaultValues: initialValues,
    resolver: zodResolver(seasonSchema),
  });

  useEffect(() => {
    reset(initialValues);
  }, [initialValues, reset]);

  return (
    <Stack id={formId} component="form" spacing={2.5} onSubmit={handleSubmit(onSubmit)} noValidate>
      <CustomTextInput
        control={control}
        name="name"
        label="Nombre"
        placeholder="Ej. Temporada 2026"
        required
        disabled={disabled}
      />
      <Stack direction={{ xs: 'column', sm: 'row' }} spacing={2}>
        <CustomTextInput
          control={control}
          name="startDate"
          label="Fecha inicio"
          type="date"
          required
          disabled={disabled}
        />
        <CustomTextInput
          control={control}
          name="endDate"
          label="Fecha fin"
          type="date"
          disabled={disabled}
        />
      </Stack>
      <CustomNumberInput
        control={control}
        name="initialBalance"
        label="Saldo inicial (USD)"
        required
        disabled={disabled}
      />
      <CustomSwitchInput
        control={control}
        name="active"
        label="Activar temporada"
        disabled={disabled}
      />
      {serverError ? <Alert color="error">{serverError}</Alert> : null}
    </Stack>
  );
};

export default SeasonForm;
