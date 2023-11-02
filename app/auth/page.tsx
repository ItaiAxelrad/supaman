import { Container, Title } from '@mantine/core';
import AuthForm from './auth-form';

export default function Home() {
  return (
    <Container size="xs">
      <Title>Sign in</Title>
      <AuthForm />
    </Container>
  );
}
