import { Database } from '@/types/database.types';
import { createServerComponentClient } from '@supabase/auth-helpers-nextjs';
import { cookies } from 'next/headers';
import AccountForm from './account-form';

export default async function Account() {
  const supabase = createServerComponentClient<Database>({ cookies });

  const {
    data: { session },
  } = await supabase.auth.getSession();

  return (<>
    <h1>Account</h1>
    <AccountForm session={session} />
  </>);
}
