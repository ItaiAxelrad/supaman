import ColorSchemeToggle from '@/components/ColorSchemeToggle';
import UserAccountMenu from '@/components/UserAccountMenu';
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
import { IconBolt, IconBrandGithub } from '@tabler/icons-react';
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
          <Group gap="xs">
            <ActionIcon href="/" component={Link} radius="xl" size="lg" variant="subtle">
              <IconBolt color="#12b886" fill="#12b886" />
            </ActionIcon>
            <Anchor href="/" c="inherit" fw="bold" fz="xl" underline="never">
              SupaMan
            </Anchor>
          </Group>
          <Group gap="xs">
            {session ? (
              <UserAccountMenu session={session} />
            ) : (
              <Button href="/auth" component={Link}>
                Sign in
              </Button>
            )}
            <ActionIcon
              variant="default"
              size="lg"
              component={Link}
              href="https://github.com/ItaiAxelrad/supanext"
            >
              <IconBrandGithub />
            </ActionIcon>
            <ColorSchemeToggle />
          </Group>
        </Group>
      </AppShellHeader>
      <AppShellMain>{children}</AppShellMain>
    </AppShell>
  );
}
