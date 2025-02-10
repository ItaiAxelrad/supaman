import {
  Anchor,
  Button,
  PasswordInput,
  Text,
  TextInput,
  Title,
} from "@mantine/core";
import { IconLock, IconMail } from "@tabler/icons-react";
import { signInAction } from "../actions";
import { FormMessage, Message } from "../components/form-message";

export default async function Login({
  searchParams,
}: {
  searchParams: Promise<Message>;
}) {
  const message = await searchParams;
  return (
    <form>
      <Title>Sign in</Title>
      <Text>
        Don't have an account? <Anchor href="/sign-up">Sign up</Anchor>
      </Text>
      <TextInput
        label="Email"
        name="email"
        placeholder="you@example.com"
        leftSection={<IconMail size={18} color="var(--mantine-color-dimmed" />}
        required
      />
      <PasswordInput
        leftSection={<IconLock size={18} color="var(--mantine-color-dimmed" />}
        label="Password"
        name="password"
        placeholder="••••••••"
        required
      />
      <Button type="submit" formAction={signInAction} my="xs">
        Sign in
      </Button>
      <Text>
        Forgot your password?{" "}
        <Anchor href="/forgot-password">Reset Password</Anchor>
      </Text>
      <FormMessage message={message} />
    </form>
  );
}
