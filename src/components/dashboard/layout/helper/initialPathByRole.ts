import { UserRole } from '@/modules/auth/types/auth.type';

import { paths } from '@/paths';

export const getInitialPathByRole = (role: UserRole) => {
  switch (role) {
    case 'VIEWER':
      return paths.treasury.reports;

    case 'ADMIN':
    case 'EDITOR':
      return paths.dashboard;

    default:
      return paths.dashboard;
  }
};
