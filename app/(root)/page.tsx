import { Badge, Container, Text } from "@mantine/core";

export default function Home() {
  return (
    <Container size="md" mt="xs">
      <Badge variant="light" size="lg">
        Fast, simple, secure.
      </Badge>
      <Text
        my="xs"
        fz={48}
        lh={1}
        fw={900}
        variant="gradient"
        gradient={{ from: "teal.6", to: "teal.1", deg: 90 }}
      >
        Supa-Man
      </Text>
      <Text fz="xl">
        Experience our Auth 🔒 and Storage through a simple profile management
        example. Create a user profile and upload an avatar image.
      </Text>
    </Container>
  );
}
