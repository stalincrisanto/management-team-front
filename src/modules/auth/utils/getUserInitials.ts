export const getUserInitials = (fullName?: string | null): string => {
  if (!fullName) return 'U';
  const parts = fullName.trim().split(/\s+/);

  if (parts.length === 1) {
    return parts[0].charAt(0).toUpperCase();
  }

  return `${parts[0].charAt(0)}${parts[1].charAt(0)}`.toUpperCase();
};
