'use client';

import type { PeriodApiResponse } from '@/modules/period/types/period.types';

import CustomAccordion from '@/components/CustomAccordion';

import PeriodAccordionSummary from './PeriodAccordionSummary';
import PeriodMetricsGrid from './PeriodMetricsGrid';

interface PeriodAccordionProps {
  period: PeriodApiResponse;
  expanded: boolean;
  onChange: () => void;
}

const PeriodAccordion = ({ period, expanded, onChange }: PeriodAccordionProps) => {
  return (
    <CustomAccordion
      id={`period-${period.id}`}
      expanded={expanded}
      onChange={onChange}
      summary={<PeriodAccordionSummary period={period} />}
    >
      <PeriodMetricsGrid period={period} />
      {/* Aquí luego irá el botón hacia el detalle de ingresos/gastos */}
    </CustomAccordion>
  );
};

export default PeriodAccordion;
