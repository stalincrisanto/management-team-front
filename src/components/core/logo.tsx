// 'use client';

// import * as React from 'react';
// import Box from '@mui/material/Box';
// import { useColorScheme } from '@mui/material/styles';

// import { NoSsr } from '@/components/core/no-ssr';

// const HEIGHT = 60;
// const WIDTH = 60;

// type Color = 'dark' | 'light';

// export interface LogoProps {
//   color?: Color;
//   emblem?: boolean;
//   height?: number;
//   width?: number;
// }

// export function Logo({ color = 'dark', emblem, height = HEIGHT, width = WIDTH }: LogoProps): React.JSX.Element {
//   let url: string;

//   if (emblem) {
//     url = color === 'light' ? '/assets/logo-canarias.svg' : '/assets/logo-canarias.svg';
//   } else {
//     url = color === 'light' ? '/assets/logo-canarias.svg' : '/assets/logo-canarias.svg';
//   }

//   return <Box alt="logo" component="img" height={height} src={url} width={width} />;
// }

// export interface DynamicLogoProps {
//   colorDark?: Color;
//   colorLight?: Color;
//   emblem?: boolean;
//   height?: number;
//   width?: number;
// }

// export function DynamicLogo({
//   colorDark = 'light',
//   colorLight = 'dark',
//   height = HEIGHT,
//   width = WIDTH,
//   ...props
// }: DynamicLogoProps): React.JSX.Element {
//   const { colorScheme } = useColorScheme();
//   const color = colorScheme === 'dark' ? colorDark : colorLight;

//   return (
//     <NoSsr fallback={<Box sx={{ height: `${height}px`, width: `${width}px` }} />}>
//       <Logo color={color} height={height} width={width} {...props} />
//     </NoSsr>
//   );
// }

'use client';

import * as React from 'react';
import Box from '@mui/material/Box';
import { useColorScheme } from '@mui/material/styles';

import { NoSsr } from '@/components/core/no-ssr';

const DEFAULT_SIZE = 72;

type Color = 'dark' | 'light';

export interface LogoProps {
  color?: Color;
  emblem?: boolean;
  height?: number;
  width?: number;
}

export function Logo({
  height = DEFAULT_SIZE,
  width = DEFAULT_SIZE,
}: LogoProps): React.JSX.Element {
  return (
    <Box
      sx={{
        alignItems: 'center',
        display: 'flex',
        flexShrink: 0,
        height,
        justifyContent: 'center',
        overflow: 'hidden',
        width,
      }}
    >
      <Box
        alt="Club Deportivo Canarias B Junior"
        component="img"
        draggable={false}
        src="/assets/logo-canarias.svg"
        sx={{
          display: 'block',
          height: '100%',
          objectFit: 'contain',
          width: '100%',
        }}
      />
    </Box>
  );
}

export interface DynamicLogoProps {
  colorDark?: Color;
  colorLight?: Color;
  emblem?: boolean;
  height?: number;
  width?: number;
}

export function DynamicLogo({
  colorDark = 'light',
  colorLight = 'dark',
  height = DEFAULT_SIZE,
  width = DEFAULT_SIZE,
  ...props
}: DynamicLogoProps): React.JSX.Element {
  const { colorScheme } = useColorScheme();

  const color = colorScheme === 'dark' ? colorDark : colorLight;

  return (
    <NoSsr
      fallback={
        <Box
          sx={{
            height,
            width,
          }}
        />
      }
    >
      <Logo
        color={color}
        height={height}
        width={width}
        {...props}
      />
    </NoSsr>
  );
}