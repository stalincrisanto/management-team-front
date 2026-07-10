'use client';

import { useMemo } from 'react';
import { useRouter } from 'next/navigation';
import { useSeasonActive } from '@/modules/season/hooks/useSeasonActive';
import { Stack } from '@mui/material';

import { ContentCard } from '@/components/ContentCard';
import { CustomButton } from '@/components/CustomButton';
import { SelectOption } from '@/components/CustomSelectField';
import { SectionHeader } from '@/components/SectionHeader';

import { useCreatePeriod } from '../../hooks/usePeriodMutations';
import { PeriodFormValues } from '../../schema/period.schema';
import PeriodForm from '../form/PeriodForm';

const NewPeriodView = () => {
  const router = useRouter();

  const { data: activeSeason, isLoading: isLoadingSeason } = useSeasonActive();
  const { createPeriod, isPending } = useCreatePeriod();

  const seasonOptions = useMemo<SelectOption[]>(() => {
    if (!activeSeason) return [];

    return [
      {
        value: activeSeason.id,
        label: `${activeSeason.name} · Activa`,
      },
    ];
  }, [activeSeason]);

  const initialValues = useMemo<PeriodFormValues>(() => {
    return {
      seasonId: activeSeason?.id ?? '',
      title: '',
      periodDate: '',
      opponent: '',
      observations: '',
    };
  }, [activeSeason]);

  const handleSubmit = (values: PeriodFormValues) => {
    createPeriod(values, {
      onSuccess: (data) => {
        router.push(`/treasury/periods/${data.id}`);
      },
      onError: (error) => {
        // setServerError(error.message);
        alert(error);
      },
    });
  };

  return (
    <Stack spacing={3} sx={{ maxWidth: 900 }}>
      <SectionHeader title="Nueva jornada" subtitle="Registro rápido del partido." />
      <ContentCard title="Datos del partido">
        <PeriodForm
          formId="period-form"
          seasonOptions={seasonOptions}
          initialValues={initialValues}
          disabled={isPending || isLoadingSeason}
          //   serverError={serverError}
          onSubmit={handleSubmit}
        />
      </ContentCard>
      <Stack direction="row" spacing={2} justifyContent="flex-end" sx={{ mt: 3 }}>
        <CustomButton
          variant="outlined"
          onClick={() => router.push('/treasury/periods')}
          disabled={isPending}
        >
          Cancelar
        </CustomButton>

        <CustomButton
          type="submit"
          form="period-form"
          variant="contained"
          isLoading={isPending}
          loadingText="Guardando..."
        >
          Guardar jornada
        </CustomButton>
      </Stack>
    </Stack>
  );
};

export default NewPeriodView;
