import { UnstyledButton } from '@mantine/core';

export default function SignOut() {
  return (
    <form action="/api/auth/signout" method="post">
      <UnstyledButton type="submit" styles={{ root: { fontSize: 'inherit' } }}>
        Sign out
      </UnstyledButton>
    </form>
  );
}
