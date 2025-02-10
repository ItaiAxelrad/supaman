import { createClient } from '@/utils/supabase/server';
import {
  Button,
  Card,
  Container,
  Group,
  Stack,
  Text,
  TextInput,
  Title,
} from '@mantine/core';
import Form from 'next/form';

export const metadata = {
  title: 'Employees',
};

const optionsFilter = (options: any[], search: string) =>
  search
    ? options
        .filter((option) =>
          option?.comment
            ?.toLowerCase()
            .trim()
            .includes(search?.toLowerCase().trim()),
        )
        .sort((a, b) => a.comment?.localeCompare(b.term))
    : options;

interface SearchParams {
  search?: string;
}

export default async function Data({
  searchParams,
}: {
  searchParams: SearchParams;
}) {
  const { search } = await searchParams;
  const supabase = await createClient();
  const { data: employees } = await supabase
    .from('employees')
    .select('*')
    .order('name', { ascending: false });

  return (
    <Container size='xs' my='xl'>
      <Title my='xs'>employees</Title>
      <Form action='/data'>
        <Group my='xs' gap='xs'>
          <TextInput
            placeholder='Search employees'
            name='search'
            style={{ flexGrow: 1 }}
            defaultValue={search ?? ''}
          />
          <Button type='submit' style={{ flexGrow: 0 }}>
            Search
          </Button>
        </Group>
      </Form>
      <Stack gap='xs'>
        {employees &&
          optionsFilter(employees, search ?? '')?.map((employee) => (
            <Card key={employee.id}>
              <Text fw='bold'>{employee.name}</Text>
              <Text>{employee.department}</Text>
              <Text>{employee.email}</Text>
              <Text c='dimmed' fz='sm'>
                {new Date(employee?.created_at ?? '').toLocaleDateString()}
              </Text>
            </Card>
          ))}
      </Stack>
    </Container>
  );
}
