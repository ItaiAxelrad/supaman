'use client';

import { Database } from '@/types/database.types';
import { useMantineColorScheme } from '@mantine/core';
import { createClientComponentClient } from '@supabase/auth-helpers-nextjs';
import { Auth } from '@supabase/auth-ui-react';
import { ThemeSupa } from '@supabase/auth-ui-shared';

export default function AuthForm() {
  const supabase = createClientComponentClient<Database>();
  const { colorScheme } = useMantineColorScheme();

  return (
    <Auth
      supabaseClient={supabase}
      view="magic_link"
      appearance={{
        theme: ThemeSupa,
        variables: {
          default: {
            colors: {
              brand: '#12b886',
            },
          },
        },
      }}
      theme={colorScheme}
      showLinks={true}
      providers={['google', 'facebook']}
      redirectTo={`${process.env.NEXT_PUBLIC_VERCEL_URL}/api/auth/callback`}
    />
  );
}
