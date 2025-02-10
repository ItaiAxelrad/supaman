import { Card, Container } from "@mantine/core";

export default async function Layout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <Container size="xs">
      <Card my="xl">{children}</Card>
    </Container>
  );
}
