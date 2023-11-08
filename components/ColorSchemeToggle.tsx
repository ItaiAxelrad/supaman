'use client';

import { ActionIcon, useComputedColorScheme, useMantineColorScheme } from '@mantine/core';

export default function ColorSchemeToggle() {
  const { setColorScheme } = useMantineColorScheme();
  const computedColorScheme = useComputedColorScheme('light', { getInitialValueInEffect: true });

  return (
    <ActionIcon
      onClick={() => setColorScheme(computedColorScheme === 'light' ? 'dark' : 'light')}
      variant="default"
      size="lg"
      aria-label="Toggle color scheme"
    >
      {computedColorScheme === 'light' ? <span role="img">☀️</span> : <span role="img">🌙</span>}
    </ActionIcon>
  );
}
