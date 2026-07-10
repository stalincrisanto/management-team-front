'use client';

import { ReactNode } from 'react';
import { FormControl, FormHelperText, MenuItem, Select, Stack, Typography } from '@mui/material';
import { Control, Controller, FieldValues, Path } from 'react-hook-form';

export interface SelectOption {
  value: string;
  label: ReactNode;
}

interface CustomSelectFieldProps<T extends FieldValues> {
  control: Control<T>;
  name: Path<T>;
  label: string;
  options: SelectOption[];
  required?: boolean;
  disabled?: boolean;
  placeholder?: string;
}

const CustomSelectField = <T extends FieldValues>({
  control,
  name,
  label,
  options,
  required = false,
  disabled = false,
  placeholder,
}: CustomSelectFieldProps<T>) => {
  const labelText = required ? `${label} *` : label;

  return (
    <Controller
      control={control}
      name={name}
      render={({ field, fieldState }) => (
        <FormControl fullWidth error={Boolean(fieldState.error)}>
          <Stack spacing={1}>
            <Typography variant="subtitle2">{labelText}</Typography>

            <Select
              {...field}
              value={field.value ?? ''}
              disabled={disabled}
              displayEmpty={Boolean(placeholder)}
            >
              {placeholder ? (
                <MenuItem value="" disabled>
                  {placeholder}
                </MenuItem>
              ) : null}

              {options.map((option) => (
                <MenuItem key={option.value} value={option.value}>
                  {option.label}
                </MenuItem>
              ))}
            </Select>

            {fieldState.error ? <FormHelperText>{fieldState.error.message}</FormHelperText> : null}
          </Stack>
        </FormControl>
      )}
    />
  );
};

export default CustomSelectField;
