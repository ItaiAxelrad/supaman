import React from 'react';
import type { NextPage } from 'next';
import { Auth } from '@supabase/auth-ui-react';
import { useSession, useSupabaseClient } from '@supabase/auth-helpers-react';

const SignIn: NextPage = () => {
  const supabase = useSupabaseClient();

  return (
    <div className='relative bg-white px-6 pt-10 pb-8 shadow-xl ring-1 ring-gray-900/5 sm:mx-auto sm:max-w-lg sm:rounded-lg sm:px-10'>
      <Auth supabaseClient={supabase} />
    </div>
  );
};

export default SignIn;
