"use client";

import { createClient } from "@/utils/supabase/client";
import { Button, Menu, UnstyledButton } from "@mantine/core";
import { IconLogout, IconUser } from "@tabler/icons-react";
import Link from "next/link";

export default async function UserAccountMenu() {
  const supabase = createClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();

  return (
    <Menu
      width={260}
      zIndex={10000}
      position="bottom-end"
      transitionProps={{ transition: "pop-top-right" }}
      withinPortal
    >
      <Menu.Target>
        <Button variant="subtle" color="text" radius="xl">
          {user?.email}
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
          <form action="/api/auth/signout" method="post">
            <UnstyledButton
              type="submit"
              styles={{ root: { fontSize: "inherit" } }}
            >
              Sign out
            </UnstyledButton>
          </form>
        </Menu.Item>
      </Menu.Dropdown>
    </Menu>
  );
}
