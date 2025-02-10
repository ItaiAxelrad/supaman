import { Anchor, Button, Text, TextInput, Title } from "@mantine/core";
import { forgotPasswordAction } from "../actions";
import { FormMessage, type Message } from "../components/form-message";
import { SmtpMessage } from "../components/smtp-message";

export default async function ForgotPassword(props: {
  searchParams: Promise<Message>;
}) {
  const searchParams = await props.searchParams;
  return (
    <>
      <form>
        <Title>Reset Password</Title>
        <Text>
          Already have an account? <Anchor href="/sign-in">Sign in</Anchor>
        </Text>
        <TextInput
          label="Email"
          name="email"
          placeholder="you@example.com"
          required
        />
        <Button type="submit" formAction={forgotPasswordAction}>
          Reset Password
        </Button>
        <FormMessage message={searchParams} />
      </form>
      <SmtpMessage />
    </>
  );
}
