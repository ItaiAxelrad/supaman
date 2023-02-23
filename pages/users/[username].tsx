import type { NextPage } from 'next';
import { useSupabaseClient } from '@supabase/auth-helpers-react';
import { createServerSupabaseClient } from '@supabase/auth-helpers-nextjs';
import { Database } from '@/utils/database.types';

export async function getServerSideProps(context) {
  // Create authenticated Supabase Client
  const supabase = createServerSupabaseClient(context);
  const { username } = context.query;

  const {
    data: user,
    error,
    status,
  } = await supabase
    .from('profiles')
    .select(`full_name, username, website, avatar_url`)
    .eq('username', username)
    .single();

  const { data: url } = await supabase.storage
    .from('avatars')
    .getPublicUrl(user?.avatar_url);

  return {
    props: {
      user: JSON.parse(JSON.stringify(user)),
      url: url.publicUrl,
    },
  };
}

const Username: NextPage = ({ user, url }) => {
  return (
    <div className='w-full max-w-sm mx-auto my-4'>
      {user ? (
        <div className='relative bg-white px-6 pt-10 pb-8 shadow-lg ring-1 ring-gray-900/5 sm:mx-auto sm:max-w-lg sm:rounded-lg sm:px-10'>
          <div className='flex gap-4'>
            <img src={url} alt={user.username} className='h-12 rounded-full' />
            <div>
              <h1 className='text-lg text-slate-800'>{user.full_name}</h1>
              <h2 className='text-sm text-slate-500'>@{user.username}</h2>
            </div>
          </div>
          <p className='pt-6'>
            <a href={user.website} className='text-sky-500 hover:text-sky-600'>
              {user.website}
            </a>
          </p>
        </div>
      ) : (
        <p>No user with that username</p>
      )}
    </div>
  );
};

export default Username;
