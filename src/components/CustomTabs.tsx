'use client';

import type { ReactNode, SyntheticEvent } from 'react';
import { Box, Tab, Tabs } from '@mui/material';

export interface CustomTabItem {
  value: string;
  label: string;
  content: ReactNode;
}

interface CustomTabsProps {
  items: CustomTabItem[];
  value: string;
  onChange: (value: string) => void;
  ariaLabel: string;
  idPrefix: string;
}

const CustomTabs = ({ items, value, onChange, ariaLabel, idPrefix }: CustomTabsProps) => {
  const handleChange = (_: SyntheticEvent, newValue: string) => {
    onChange(newValue);
  };

  const getTabId = (v: string) => `${idPrefix}-tab-${v}`;
  const getPanelId = (v: string) => `${idPrefix}-panel-${v}`;

  return (
    <Box>
      <Box sx={{ borderBottom: '1px solid', borderColor: 'divider' }}>
        <Tabs aria-label={ariaLabel} onChange={handleChange} value={value} variant="fullWidth">
          {items.map((item) => (
            <Tab
              key={item.value}
              aria-controls={getPanelId(item.value)}
              id={getTabId(item.value)}
              label={item.label}
              value={item.value}
            />
          ))}
        </Tabs>
      </Box>

      {items.map((item) => (
        <Box
          key={item.value}
          aria-labelledby={getTabId(item.value)}
          hidden={value !== item.value}
          id={getPanelId(item.value)}
          role="tabpanel"
        >
          {value === item.value ? item.content : null}
        </Box>
      ))}
    </Box>
  );
};

export default CustomTabs;
