'use client';

import type { ReactNode } from 'react';
import { FormControl, FormHelperText, OutlinedInput, Stack, Typography } from '@mui/material';
import type { OutlinedInputProps } from '@mui/material/OutlinedInput';
import type { Control, FieldValues, Path } from 'react-hook-form';
import { Controller } from 'react-hook-form';

interface CustomTextInputProps<T extends FieldValues> {
  control: Control<T>;
  name: Path<T>;
  label: string;
  placeholder?: string;
  type?: string;
  required?: boolean;
  disabled?: boolean;
  autoComplete?: string;
  startAdornment?: ReactNode;
  endAdornment?: ReactNode;
  inputProps?: OutlinedInputProps['inputProps'];
}

export const CustomTextInput = <T extends FieldValues>({
  control,
  name,
  label,
  placeholder,
  type = 'text',
  required = false,
  disabled = false,
  autoComplete,
  startAdornment,
  endAdornment,
  inputProps,
}: CustomTextInputProps<T>) => {
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
              {...field}
              value={field.value ?? ''}
              placeholder={placeholder}
              type={type}
              disabled={disabled}
              autoComplete={autoComplete}
              startAdornment={startAdornment}
              endAdornment={endAdornment}
              inputProps={inputProps}
            />

            {fieldState.error ? <FormHelperText>{fieldState.error.message}</FormHelperText> : null}
          </Stack>
        </FormControl>
      )}
    />
  );
};
