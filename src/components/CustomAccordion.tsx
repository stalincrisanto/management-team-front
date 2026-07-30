'use client';

import React, { ReactNode } from 'react';
import { Accordion, AccordionDetails, AccordionSummary } from '@mui/material';
import { CaretRightIcon } from '@phosphor-icons/react';

interface CustomAccordionProps {
  id: string;
  summary: ReactNode;
  children: ReactNode;
  expanded: boolean;
  onChange: () => void;
}

const CustomAccordion = ({ id, summary, children, expanded, onChange }: CustomAccordionProps) => {
  return (
    <Accordion
      disableGutters
      elevation={0}
      expanded={expanded}
      onChange={onChange}
      sx={{
        borderBottom: '1px solid',
        borderColor: 'divider',
        '&::before': { display: 'none' },
        '&:last-of-type': { borderBottom: 0 },
      }}
    >
      <AccordionSummary
        aria-controls={`${id}-content`}
        id={`${id}-header`}
        expandIcon={<CaretRightIcon size={18} weight="bold" />}
        sx={{
          minHeight: { xs: 60, sm: 58 },
          px: { xs: 2, sm: 2.5 },
          '& .MuiAccordionSummary-content': { minWidth: 0, my: 1.25 },
          '& .MuiAccordionSummary-expandIconWrapper': {
            flexShrink: 0,
            ml: 1,
            transition: 'transform 150ms ease',
          },
          '& .MuiAccordionSummary-expandIconWrapper.Mui-expanded': {
            transform: 'rotate(90deg)',
          },
        }}
      >
        {summary}
      </AccordionSummary>
      <AccordionDetails
        id={`${id}-content`}
        sx={{
          bgcolor: 'background.default',
          borderTop: '1px solid',
          borderColor: 'divider',
          p: { xs: 2, sm: 2.5 },
        }}
      >
        {children}
      </AccordionDetails>
    </Accordion>
  );
};

export default CustomAccordion;
