import {
  Anchor,
  Button,
  PasswordInput,
  Text,
  TextInput,
  Title,
} from "@mantine/core";
import { IconBrandGithub, IconLock, IconMail } from "@tabler/icons-react";
import { signInWithGithub, signUpAction } from "../actions";
import { FormMessage, Message } from "../components/form-message";

export default async function Signup(props: {
  searchParams: Promise<Message>;
}) {
  const searchParams = await props.searchParams;
  if ("message" in searchParams) {
    return <FormMessage message={searchParams} />;
  }

  return (
    <>
      <form className="flex flex-col min-w-64 max-w-64 mx-auto">
        <Title>Sign up</Title>
        <Text>
          Already have an account? <Anchor href="/sign-in">Sign in</Anchor>
        </Text>
        <TextInput
          label="Email"
          name="email"
          placeholder="you@example.com"
          required
          leftSection={
            <IconMail size={18} color="var(--mantine-color-dimmed" />
          }
        />
        <PasswordInput
          leftSection={
            <IconLock size={18} color="var(--mantine-color-dimmed" />
          }
          label="Password"
          name="password"
          placeholder="••••••••"
          required
          minLength={6}
        />
        <Button type="submit" formAction={signUpAction} mt="xs">
          Sign up
        </Button>
        <FormMessage message={searchParams} />
        <Button
          onClick={signInWithGithub}
          leftSection={<IconBrandGithub size="1rem" stroke={1.5} />}
          variant="default"
        >
          Continue with GitHub
        </Button>
      </form>
    </>
  );
}
