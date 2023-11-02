import { Database } from '@/types/database.types';
import {
  ActionIcon,
  Anchor,
  AppShell,
  AppShellHeader,
  AppShellMain,
  Button,
  Group,
} from '@mantine/core';
import { createServerComponentClient } from '@supabase/auth-helpers-nextjs';
import { cookies } from 'next/headers';
import Link from 'next/link';

export default async function BaseLayout({ children }: { children: React.ReactNode }) {
  const supabase = createServerComponentClient<Database>({ cookies });

  const {
    data: { session },
  } = await supabase.auth.getSession();

  return (
    <AppShell header={{ height: 60 }} padding="md">
      <AppShellHeader style={{ display: 'flex' }} px="xl">
        <Group justify="space-between" w="100%">
          <Group>
            <ActionIcon href="/" component={Link}>
              S
            </ActionIcon>
            <Anchor href="/" c="inherit" fw="bold" fz="xl" underline="never">
              Home
            </Anchor>
          </Group>
          {session ? (
            <form action="/api/auth/signout" method="post">
              <Button type="submit" variant="default">
                Sign out
              </Button>
              <Button ml="xs" href="/account" component={Link}>
                Account
              </Button>
            </form>
          ) : (
            <Button href="/auth" component={Link}>
              Sign in
            </Button>
          )}
        </Group>
      </AppShellHeader>
      <AppShellMain>{children}</AppShellMain>
    </AppShell>
  );
}
