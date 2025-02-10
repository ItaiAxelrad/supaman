"use client";

import { Button, Kbd, rem } from "@mantine/core";
import {
  Spotlight,
  type SpotlightActionData,
  spotlight,
} from "@mantine/spotlight";
import {
  IconDashboard,
  IconFileText,
  IconHome,
  IconSearch,
} from "@tabler/icons-react";

const actions: SpotlightActionData[] = [
  {
    id: "home",
    label: "Home",
    description: "Get to home page",
    onClick: () => console.log("Home"),
    leftSection: <IconHome size={24} stroke={1.5} />,
  },
  {
    id: "dashboard",
    label: "Dashboard",
    description: "Get full information about current system status",
    onClick: () => console.log("Dashboard"),
    leftSection: <IconDashboard size={24} stroke={1.5} />,
  },
  {
    id: "documentation",
    label: "Documentation",
    description: "Visit documentation to lean more about all features",
    onClick: () => console.log("Documentation"),
    leftSection: <IconFileText size={24} stroke={1.5} />,
  },
];

export default function SearchBar() {
  return (
    <>
      <Button
        variant="default"
        color="gray"
        visibleFrom="xs"
        onClick={spotlight.open}
        leftSection={
          <IconSearch size={16} color="var(--mantine-color-dimmed)" />
        }
        rightSection={
          <Kbd ml={5} size="xs">
            /
          </Kbd>
        }
        styles={{
          label: {
            fontWeight: "400",
            color: "var(--mantine-color-dimmed)",
            marginRight: "3rem",
          },
        }}
      >
        Search
      </Button>
      <Spotlight
        actions={actions}
        scrollable
        maxHeight={350}
        shortcut={["mod + P", "mod + K", "/"]}
        nothingFound="Nothing found..."
        highlightQuery
        searchProps={{
          leftSection: (
            <IconSearch
              style={{ width: rem(20), height: rem(20) }}
              stroke={1.5}
            />
          ),
          placeholder: "Search...",
        }}
      />
    </>
  );
}
