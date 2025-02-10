"use client";

import {
  ActionIcon,
  Tooltip,
  useComputedColorScheme,
  useMantineColorScheme,
} from "@mantine/core";
import { IconMoon, IconSun } from "@tabler/icons-react";

export default function ColorSchemeToggle() {
  const { setColorScheme } = useMantineColorScheme();
  const computedColorScheme = useComputedColorScheme("light", {
    getInitialValueInEffect: true,
  });

  return (
    <ActionIcon
      onClick={() =>
        setColorScheme(computedColorScheme === "light" ? "dark" : "light")
      }
      variant="default"
      size="lg"
      aria-label="Toggle color scheme"
    >
      {computedColorScheme === "dark" ? (
        <Tooltip label="Light mode" offset={4}>
          <IconSun
            color="var(--mantine-color-yellow-6)"
            fill="var(--mantine-color-yellow-light)"
            stroke={1.5}
          />
        </Tooltip>
      ) : (
        <Tooltip label="Dark mode" offset={4}>
          <IconMoon
            color="var(--mantine-color-indigo-6)"
            fill="var(--mantine-color-indigo-light)"
            stroke={1.5}
          />
        </Tooltip>
      )}
    </ActionIcon>
  );
}
