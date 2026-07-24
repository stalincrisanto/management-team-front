import { UserRole } from '@/modules/auth/types/auth.type';

import { NavItemConfig } from '@/types/nav';

const hasRoleAccess = (allowedRoles: readonly UserRole[] | undefined, role: UserRole) => {
  if (!allowedRoles || allowedRoles.length === 0) {
    return true;
  }

  return allowedRoles.includes(role);
};

export const filterNavItems = (items: readonly NavItemConfig[], role: UserRole) => {
  return items.reduce<NavItemConfig[]>((result, item) => {
    const itemAllowed = hasRoleAccess(item.allowedRoles, role);

    if (item.items?.length) {
      const allowedChildren = filterNavItems(item.items, role);

      if (itemAllowed && allowedChildren.length > 0) {
        result.push({
          ...item,
          items: allowedChildren,
        });
      }

      return result;
    }

    if (itemAllowed) {
      result.push(item);
    }

    return result;
  }, []);
};
