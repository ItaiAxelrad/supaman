import { FunctionComponent } from 'react';
import Link from 'next/link';
import { useSession, useSupabaseClient } from '@supabase/auth-helpers-react';
const Header: FunctionComponent = () => {
  const supabase = useSupabaseClient();
  const session = useSession();

  return (
    <header className='flex justify-between items-center py-2 px-6 ring-1 ring-gray-900/5'>
      <Link href='/'>
        <h1 className='text-3xl font-bold text-green-500'>SupaNext</h1>
      </Link>

      <div className='flex gap-2'>
        {session ? (
          <button
            className='btn'
            onClick={async () => {
              const { error } = await supabase.auth.signOut();
              if (error) console.log('Error logging out:', error.message);
            }}
          >
            Sign out
          </button>
        ) : (
          <Link
            href='/auth/signin'
            className='btn text-sky-500 hover:text-sky-600'
          >
            Sign in
          </Link>
        )}
        <Link href='/profile' className='btn text-sky-500 hover:text-sky-600'>
          Profile &rarr;
        </Link>
      </div>
    </header>
  );
};

export default Header;
