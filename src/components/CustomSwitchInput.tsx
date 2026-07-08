'use client';

import { FormControl, FormControlLabel, FormHelperText, Switch } from '@mui/material';
import type { Control, FieldValues, Path } from 'react-hook-form';
import { Controller } from 'react-hook-form';

interface CustomSwitchInputProps<T extends FieldValues> {
  control: Control<T>;
  name: Path<T>;
  label: string;
  disabled?: boolean;
}

export const CustomSwitchInput = <T extends FieldValues>({
  control,
  name,
  label,
  disabled = false,
}: CustomSwitchInputProps<T>) => {
  return (
    <Controller
      control={control}
      name={name}
      render={({ field, fieldState }) => (
        <FormControl error={Boolean(fieldState.error)}>
          <FormControlLabel
            control={
              <Switch
                checked={Boolean(field.value)}
                disabled={disabled}
                onChange={(_, checked) => field.onChange(checked)}
              />
            }
            label={label}
          />

          {fieldState.error ? <FormHelperText>{fieldState.error.message}</FormHelperText> : null}
        </FormControl>
      )}
    />
  );
};
