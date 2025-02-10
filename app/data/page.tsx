import { createClient } from "@/utils/supabase/server";
import { Card, Container, Stack, Text, Title } from "@mantine/core";

export default async function Data() {
  const supabase = await createClient();
  const { data: employees } = await supabase.from("employees").select("*");
  return (
    <Container size="sm" my="xl">
      <Title my="xl">Data</Title>
      <Stack>
        {employees?.map((employee) => (
          <Card key={employee.id}>
            <Text fw="bold">{employee.name}</Text>
            <Text>{employee.email}</Text>
            <Text>{employee.department}</Text>
            <Text>
              {new Date(employee?.created_at ?? "").toLocaleDateString()}
            </Text>
          </Card>
        ))}
      </Stack>
    </Container>
  );
}
