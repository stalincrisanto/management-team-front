import { paths } from '@/paths';

export const resolveSafeRedirect = (redirectTo: string | null): string => {
  if (!redirectTo) {
    return paths.dashboard;
  }

  if (!redirectTo.startsWith('/')) {
    return paths.dashboard;
  }

  if (redirectTo.startsWith('//')) {
    return paths.dashboard;
  }

  return redirectTo;
};
