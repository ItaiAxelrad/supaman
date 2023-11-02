import { Badge, Container, Text } from '@mantine/core';

export default function Home() {
  return (
    <Container size="xs">
      <Badge variant="light" size="xl">
        Fast, simple, secure.
      </Badge>
      <Text
        fz={48}
        lh="1"
        my="xs"
        fw={900}
        // variant="gradient"
        // gradient={{ from: 'teal', to: 'cyan', deg: 90 }}
      >
        Next ➕<br /> Supabase ➕<br /> Mantine
      </Text>
      <Text fz="xl">
        Experience our Auth 🔒 and Storage through a simple profile management example. Create a user
        profile and upload an avatar image.
      </Text>
    </Container>
  );
}
