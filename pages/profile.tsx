import React from 'react';
import type { NextPage } from 'next';
import { Auth } from '@supabase/auth-ui-react';
import { useSession, useSupabaseClient } from '@supabase/auth-helpers-react';
import Account from '@/components/Account';

const User: NextPage = () => {
  const session = useSession();
  const supabase = useSupabaseClient();

  return (
    <>
      {!session ? (
        <div className='col-6 auth-widget'>
          <Auth supabaseClient={supabase} />
        </div>
      ) : (
        <div className='w-full max-w-sm m-auto'>
          <h3 className='text-xl font-medium text-slate-800'>Account</h3>
          <Account session={session} />
        </div>
      )}
    </>
  );
};

export default User;
