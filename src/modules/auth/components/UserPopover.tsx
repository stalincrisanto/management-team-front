'use client';

import * as React from 'react';
import { useAuthMe } from '@/modules/auth/hooks/useAuthMe';
import { useLogout } from '@/modules/auth/hooks/useLogout';
import Box from '@mui/material/Box';
import Divider from '@mui/material/Divider';
import ListItemIcon from '@mui/material/ListItemIcon';
import MenuItem from '@mui/material/MenuItem';
import MenuList from '@mui/material/MenuList';
import Popover from '@mui/material/Popover';
import Typography from '@mui/material/Typography';
import { SignOutIcon } from '@phosphor-icons/react/dist/ssr/SignOut';
import { UserIcon } from '@phosphor-icons/react/dist/ssr/User';

export interface UserPopoverProps {
  anchorEl: Element | null;
  onClose: () => void;
  open: boolean;
}

export function UserPopover({ anchorEl, onClose, open }: UserPopoverProps): React.JSX.Element {
  const { user } = useAuthMe();
  const { logout } = useLogout();

  const handleLogout = () => {
    onClose();
    logout();
  };

  return (
    <Popover
      anchorEl={anchorEl}
      anchorOrigin={{ horizontal: 'left', vertical: 'bottom' }}
      onClose={onClose}
      open={open}
      slotProps={{ paper: { sx: { width: '260px' } } }}
    >
      <Box sx={{ p: '16px 20px' }}>
        <Typography variant="subtitle1">{user?.fullName ?? 'Usuario'}</Typography>
        <Typography color="text.secondary" variant="body2">
          {user?.username ?? ''}
        </Typography>
        <Typography color="text.secondary" variant="caption">
          Rol: {user?.role ?? ''}
        </Typography>
      </Box>

      <Divider />

      <MenuList disablePadding sx={{ p: '8px', '& .MuiMenuItem-root': { borderRadius: 1 } }}>
        <MenuItem disabled>
          <ListItemIcon>
            <UserIcon fontSize="var(--icon-fontSize-md)" />
          </ListItemIcon>
          Mi perfil
        </MenuItem>

        <MenuItem onClick={handleLogout}>
          <ListItemIcon>
            <SignOutIcon fontSize="var(--icon-fontSize-md)" />
          </ListItemIcon>
          Cerrar sesión
        </MenuItem>
      </MenuList>
    </Popover>
  );
}
