import type { NextPage } from 'next';
import { useUser, useSupabaseClient } from '@supabase/auth-helpers-react';
import TodoList from '@/components/PostList';

const Home: NextPage = () => {
  const supabase = useSupabaseClient();
  const user = useUser();
  return (
    <div className='w-full text-center py-2 mx-auto max-w-md'>
      <div className='w-full h-full flex flex-col justify-start items-start p-4'>
        <TodoList user={user} />
      </div>
    </div>
  );
};

export default Home;
