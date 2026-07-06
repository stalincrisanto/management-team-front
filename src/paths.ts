export const paths = {
  dashboard2: '/dashboard2',
  treasury: {
    root: '/treasury',
    seasons: '/treasury/seasons',
    periods: '/treasury/periods',
    periodDetail: (id: string) => `/treasury/periods/${id}`,
    reports: '/treasury/reports',
  },
  home: '/',
  auth: { signIn: '/auth/sign-in', signUp: '/auth/sign-up', resetPassword: '/auth/reset-password' },
  dashboard: {
    overview: '/dashboard',
    account: '/dashboard/account',
    customers: '/dashboard/customers',
    integrations: '/dashboard/integrations',
    settings: '/dashboard/settings',
  },
  errors: { notFound: '/errors/not-found' },
} as const;
