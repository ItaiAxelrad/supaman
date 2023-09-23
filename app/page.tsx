import { Container, Text, Title } from '@mantine/core';
import AuthForm from './auth-form';

export default function Home() {
  return (
    <Container size='sm'>
        <Title>Supabase Auth + Storage</Title>
        <Text>
          Experience our Auth and Storage through a simple profile management
          example. Create a user profile and upload an avatar image. Fast,
          simple, secure.
        </Text>
        <AuthForm />
    </Container>
  );
}
