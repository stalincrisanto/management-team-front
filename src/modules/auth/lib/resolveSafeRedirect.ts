export const resolveSafeRedirect = (redirectTo: string | null): string => {
  if (!redirectTo) {
    return '/dashboard';
  }

  if (!redirectTo.startsWith('/') || redirectTo.startsWith('//') || redirectTo.includes('\\')) {
    return '/dashboard';
  }

  return redirectTo;
};
