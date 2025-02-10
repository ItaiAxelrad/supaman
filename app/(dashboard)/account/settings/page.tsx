import { resetPasswordAction } from "@/app/(auth)/actions";
import { FormMessage, Message } from "@/app/(auth)/components/form-message";
import { Button, Text, TextInput, Title } from "@mantine/core";
import { useFormStatus } from "react-dom";

export default async function ResetPassword(props: {
  searchParams: Promise<Message>;
}) {
  const { searchParams } = await props;
  // Use Mantine notification system instead
  const { pending } = useFormStatus();
  // Use Mantine use-form instead (uncontrolled)

  return (
    <form>
      <Title>Reset password</Title>
      <Text>Please enter your new password below.</Text>
      <TextInput
        label="New password"
        type="password"
        name="password"
        placeholder="New password"
        required
      />
      <TextInput
        label="Confirm password"
        type="password"
        name="confirmPassword"
        placeholder="Confirm password"
        required
      />
      <Button type="submit" disabled={pending} formAction={resetPasswordAction}>
        Reset password
      </Button>
      <FormMessage message={searchParams} />
    </form>
  );
}
