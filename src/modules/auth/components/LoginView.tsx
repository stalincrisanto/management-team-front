'use client';

import React, { useState } from 'react';
import { zodResolver } from '@hookform/resolvers/zod';
import {
  Alert,
  Box,
  Button,
  FormControl,
  FormHelperText,
  IconButton,
  InputAdornment,
  InputLabel,
  OutlinedInput,
  Stack,
  Typography,
} from '@mui/material';
import { EyeIcon, EyeSlashIcon } from '@phosphor-icons/react';
import { Controller, useForm } from 'react-hook-form';

// import { paths } from '@/paths';
// import { DynamicLogo } from '@/components/core/logo';

import { useLogin } from '../hooks/useLogin';
import { LoginFormValues, loginSchema } from '../schema/login.schema';

export const defaultValues = {
  username: '',
  password: '',
} satisfies LoginFormValues;

const LoginView = () => {
  const { login, isPending } = useLogin();

  const [showPassword, setShowPassword] = useState<boolean>(false);
  const [serverError, setServerError] = useState<string | null>(null);

  const {
    control,
    handleSubmit,
    formState: { errors },
  } = useForm<LoginFormValues>({
    defaultValues,
    resolver: zodResolver(loginSchema),
  });

  //   const onSubmit = useCallback(
  //     (values: LoginFormValues): void => {
  //       setServerError(null);

  //       login(values, {
  //         onError: (message) => {
  //           setServerError(message);
  //         },
  //       });
  //     },
  //     [login],
  //   );

  const onSubmit = (values: LoginFormValues): void => {
    setServerError(null);

    login(values, {
      onError: (message) => {
        setServerError(message);
      },
    });
  };

  return (
    <Box
      sx={{
        display: { xs: 'flex', lg: 'grid' },
        flexDirection: 'column',
        gridTemplateColumns: '1fr 1fr',
        minHeight: '100vh',
      }}
    >
      <Box sx={{ display: 'flex', flex: '1 1 auto', flexDirection: 'column' }}>
        {/* <Box sx={{ p: 3 }}>
          <Box
            // component={RouterLink}
            href={paths.home}
            sx={{ display: 'inline-block', fontSize: 0 }}
          >
            <DynamicLogo colorDark="light" colorLight="dark" height={32} width={122} />
          </Box>
        </Box> */}

        <Box
          sx={{
            alignItems: 'center',
            display: 'flex',
            flex: '1 1 auto',
            justifyContent: 'center',
            p: 3,
          }}
        >
          <Box sx={{ maxWidth: '450px', width: '100%' }}>
            <Stack spacing={4}>
              <Stack spacing={1}>
                <Typography variant="h4">Iniciar sesión</Typography>
                <Typography color="text.secondary" variant="body2">
                  Accede al sistema de tesorería de Canarias B.
                </Typography>
              </Stack>

              <form onSubmit={handleSubmit(onSubmit)} noValidate>
                <Stack spacing={2}>
                  <Controller
                    control={control}
                    name="username"
                    render={({ field }) => (
                      <FormControl error={Boolean(errors.username)}>
                        <InputLabel>Usuario</InputLabel>
                        <OutlinedInput {...field} autoComplete="username" label="Usuario" />
                        {errors.username ? (
                          <FormHelperText>{errors.username.message}</FormHelperText>
                        ) : null}
                      </FormControl>
                    )}
                  />

                  <Controller
                    control={control}
                    name="password"
                    render={({ field }) => (
                      <FormControl error={Boolean(errors.password)}>
                        <InputLabel>Contraseña</InputLabel>
                        <OutlinedInput
                          {...field}
                          autoComplete="current-password"
                          endAdornment={
                            <InputAdornment position="end">
                              <IconButton
                                edge="end"
                                onClick={() => {
                                  setShowPassword((current) => !current);
                                }}
                              >
                                {showPassword ? (
                                  <EyeIcon fontSize="var(--icon-fontSize-md)" />
                                ) : (
                                  <EyeSlashIcon fontSize="var(--icon-fontSize-md)" />
                                )}
                              </IconButton>
                            </InputAdornment>
                          }
                          label="Contraseña"
                          type={showPassword ? 'text' : 'password'}
                        />
                        {errors.password ? (
                          <FormHelperText>{errors.password.message}</FormHelperText>
                        ) : null}
                      </FormControl>
                    )}
                  />

                  {serverError ? <Alert color="error">{serverError}</Alert> : null}

                  <Button disabled={isPending} type="submit" variant="contained">
                    {isPending ? 'Ingresando...' : 'Iniciar sesión'}
                  </Button>
                </Stack>
              </form>

              <Alert color="info">
                Usuario de prueba:{' '}
                <Typography component="span" sx={{ fontWeight: 700 }} variant="inherit">
                  admin
                </Typography>{' '}
                / Contraseña:{' '}
                <Typography component="span" sx={{ fontWeight: 700 }} variant="inherit">
                  Admin123*
                </Typography>
              </Alert>
            </Stack>
          </Box>
        </Box>
      </Box>

      <Box
        sx={{
          alignItems: 'center',
          background:
            'radial-gradient(50% 50% at 50% 50%, var(--mui-palette-secondary-main) 0%, var(--mui-palette-neutral-950) 100%)',
          color: 'var(--mui-palette-common-white)',
          display: { xs: 'none', lg: 'flex' },
          justifyContent: 'center',
          p: 3,
        }}
      >
        <Stack spacing={3} sx={{ maxWidth: 560 }}>
          <Stack spacing={1}>
            <Typography
              color="inherit"
              sx={{
                fontSize: '32px',
                fontWeight: 700,
                lineHeight: '40px',
                textAlign: 'center',
              }}
              variant="h1"
            >
              Canarias B{' '}
              <Box component="span" sx={{ color: 'var(--mui-palette-primary-main)' }}>
                Tesorería
              </Box>
            </Typography>

            <Typography align="center" color="var(--mui-palette-neutral-300)" variant="subtitle1">
              Control de temporadas, jornadas, ingresos, gastos y reportes financieros del club.
            </Typography>
          </Stack>

          <Box
            sx={{
              bgcolor: 'rgba(255, 255, 255, 0.06)',
              border: '1px solid rgba(255, 255, 255, 0.12)',
              borderRadius: 3,
              p: 3,
            }}
          >
            <Stack spacing={2}>
              <Typography color="inherit" variant="h6">
                Gestión deportiva y financiera
              </Typography>
              <Typography color="var(--mui-palette-neutral-300)" variant="body2">
                Administra temporadas, jornadas, aportes, gastos y saldos acumulados desde una sola
                plataforma.
              </Typography>
            </Stack>
          </Box>
        </Stack>
      </Box>
    </Box>
  );
};

export default LoginView;
