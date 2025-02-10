import ColorSchemeToggle from "@/components/ui/ColorSchemeToggle";
import SearchBar from "@/components/ui/SearchBar";
import {
  ActionIcon,
  Anchor,
  AppShell,
  AppShellHeader,
  AppShellMain,
  Button,
  Group,
} from "@mantine/core";
import { IconBolt } from "@tabler/icons-react";
import Link from "next/link";

export default async function BaseLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <AppShell header={{ height: 60 }} padding="md">
      <AppShellHeader style={{ display: "flex" }} px="xl">
        <Group justify="space-between" w="100%">
          <Group gap="xs">
            <ActionIcon
              href="/"
              component={Link}
              radius="xl"
              size="lg"
              variant="subtle"
            >
              <IconBolt
                color="var(--mantine-color-teal-6)"
                fill="var(--mantine-color-teal-6)"
              />
            </ActionIcon>
            <Anchor href="/" c="inherit" fw="bold" fz="xl" underline="never">
              SupaMan
            </Anchor>
          </Group>
          <Group gap="xs">
            <SearchBar />
            <Button variant="default" href="/sign-in" component={Link}>
              Sign in
            </Button>
            <Button href="/sign-up" component={Link}>
              Sign up
            </Button>
            <ColorSchemeToggle />
          </Group>
        </Group>
      </AppShellHeader>
      <AppShellMain>{children}</AppShellMain>
    </AppShell>
  );
}
