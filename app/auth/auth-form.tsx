'use client';
import { Database } from '@/types/database.types';
import { createClientComponentClient } from '@supabase/auth-helpers-nextjs';
import { Auth } from '@supabase/auth-ui-react';
import { ThemeSupa } from '@supabase/auth-ui-shared';

export default function AuthForm() {
  const supabase = createClientComponentClient<Database>();

  return (
    <Auth
      supabaseClient={supabase}
      view="magic_link"
      appearance={{ theme: ThemeSupa }}
      theme="dark"
      showLinks={true}
      providers={['google', 'facebook']}
      redirectTo={`${process.env.NEXT_PUBLIC_VERCEL_URL}/api/auth/callback`}
    />
  );
}
