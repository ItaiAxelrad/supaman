import { Button, Menu, MenuDropdown, MenuItem, MenuTarget } from '@mantine/core';
import type { Session } from '@supabase/auth-helpers-nextjs';
import Link from 'next/link';

export default async function UserAccountMenu({ session }: { session: Session | null }) {
  if (!session) return null;
  const user = session.user;

  return (
    <Menu
      width={260}
      zIndex={10000}
      position="bottom-end"
      transitionProps={{ transition: 'pop-top-right' }}
      withinPortal
    >
      <MenuTarget>
        <Button variant="subtle" color="gray" radius="xl">
          {user.email}
        </Button>
      </MenuTarget>

      <MenuDropdown>
        <MenuItem component={Link} href={`/account`}>
          Profile
        </MenuItem>
      </MenuDropdown>
    </Menu>
  );
}
