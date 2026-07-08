'use client';

import { FormControl, FormHelperText, OutlinedInput, Stack, Typography } from '@mui/material';
import type { Control, FieldValues, Path } from 'react-hook-form';
import { Controller } from 'react-hook-form';

interface CustomNumberInputProps<T extends FieldValues> {
  control: Control<T>;
  name: Path<T>;
  label: string;
  placeholder?: string;
  required?: boolean;
  disabled?: boolean;
  min?: number;
  step?: number;
}

export const CustomNumberInput = <T extends FieldValues>({
  control,
  name,
  label,
  placeholder,
  required = false,
  disabled = false,
  min = 0,
  step = 0.01,
}: CustomNumberInputProps<T>) => {
  const labelText = required ? `${label} *` : label;

  return (
    <Controller
      control={control}
      name={name}
      render={({ field, fieldState }) => (
        <FormControl fullWidth error={Boolean(fieldState.error)}>
          <Stack spacing={1}>
            <Typography variant="subtitle2">{labelText}</Typography>

            <OutlinedInput
              value={field.value ?? 0}
              placeholder={placeholder}
              type="number"
              disabled={disabled}
              inputProps={{
                min,
                step,
              }}
              onBlur={field.onBlur}
              onChange={(event) => {
                field.onChange(Number(event.target.value));
              }}
            />

            {fieldState.error ? <FormHelperText>{fieldState.error.message}</FormHelperText> : null}
          </Stack>
        </FormControl>
      )}
    />
  );
}
