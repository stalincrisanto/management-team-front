import type { NavItemConfig } from '@/types/nav';
import { paths } from '@/paths';

export const navItems = [
  {
    key: 'dashboard',
    title: 'Dashboard',
    href: paths.dashboard,
    icon: 'dashboard',
    allowedRoles: ['ADMIN'],
  },
  {
    key: 'treasury',
    title: 'Tesorería',
    icon: 'money',
    items: [
      {
        key: 'treasury-seasons',
        title: 'Temporadas',
        href: paths.treasury.seasons,
        icon: 'soccer',
        allowedRoles: ['ADMIN'],
      },
      {
        key: 'treasury-periods',
        title: 'Jornadas',
        href: paths.treasury.periods,
        icon: 'calendar',
        allowedRoles: ['ADMIN'],
      },
      {
        key: 'treasury-reports',
        title: 'Reportes',
        href: paths.treasury.reports,
        icon: 'chart-pie',
        allowedRoles: ['ADMIN', 'VIEWER'],
      },
    ],
  },
] satisfies NavItemConfig[];

// { key: 'overview', title: 'Overview', href: paths.oldDashboard.overview, icon: 'chart-pie' },
// { key: 'customers', title: 'Customers', href: paths.oldDashboard.customers, icon: 'users' },
// {
//   key: 'integrations',
//   title: 'Integrations',
//   href: paths.oldDashboard.integrations,
//   icon: 'plugs-connected',
// },
// { key: 'settings', title: 'Settings', href: paths.oldDashboard.settings, icon: 'gear-six' },
// { key: 'account', title: 'Account', href: paths.oldDashboard.account, icon: 'user' },
// { key: 'error', title: 'Error', href: paths.errors.notFound, icon: 'x-square' },
