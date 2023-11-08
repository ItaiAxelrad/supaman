'use client';

import { Button, Menu } from '@mantine/core';
import type { Session } from '@supabase/auth-helpers-nextjs';
import { IconLogout, IconUser } from '@tabler/icons-react';
import Link from 'next/link';
import SignOut from './SignOut';

export default function UserAccountMenu({ session }: { session: Session | null }) {
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
      <Menu.Target>
        <Button variant="subtle" color="text" radius="xl">
          {user.email}
        </Button>
      </Menu.Target>
      <Menu.Dropdown>
        <Menu.Item
          component={Link}
          href="/account"
          leftSection={<IconUser size={16} stroke={1.5} />}
        >
          Account
        </Menu.Item>
        <Menu.Item leftSection={<IconLogout size={16} stroke={1.5} />}>
          <SignOut />
        </Menu.Item>
      </Menu.Dropdown>
    </Menu>
  );
}
