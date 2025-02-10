"use client";

import { Button, Container, Text, Title } from "@mantine/core";
import { IconChevronLeft } from "@tabler/icons-react";
import { useRouter } from "next/navigation";

export default function NotFound() {
  const router = useRouter();
  return (
    <Container size="xs" my="xl">
      <Title>Page Not Found</Title>
      <Text my="xs">
        The page you are looking for does not exist or you do not have
        permission to view it
      </Text>
      <Button
        onClick={() => router.back()}
        leftSection={<IconChevronLeft size="1rem" />}
        my="md"
      >
        Go back
      </Button>
    </Container>
  );
}
