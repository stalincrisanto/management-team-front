'use client';

import type { PeriodApiResponse } from '@/modules/period/types/period.types';
import { ArrowRightIcon } from '@phosphor-icons/react';

import CustomAccordion from '@/components/CustomAccordion';
import { CustomButton } from '@/components/CustomButton';

import PeriodAccordionSummary from './PeriodAccordionSummary';
import PeriodMetricsGrid from './PeriodMetricsGrid';
import { useRouter } from 'next/navigation';

interface PeriodAccordionProps {
  period: PeriodApiResponse;
  expanded: boolean;
  onChange: () => void;
}

const PeriodAccordion = ({ period, expanded, onChange }: PeriodAccordionProps) => {
  const router = useRouter();

  return (
    <CustomAccordion
      id={`period-${period.id}`}
      expanded={expanded}
      onChange={onChange}
      summary={<PeriodAccordionSummary period={period} />}
    >
      <PeriodMetricsGrid period={period} />
      <CustomButton
        endIcon={<ArrowRightIcon size={16} />}
        fullWidth
        size="small"
        variant="text"
        onClick={() => router.push(`/treasury/reports/${period.id}`)}
      >
        Ver detalle de ingresos y gastos
      </CustomButton>
    </CustomAccordion>
  );
};

export default PeriodAccordion;
