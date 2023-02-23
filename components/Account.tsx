import { useState, useEffect } from 'react';
import Link from 'next/link';
import {
  useUser,
  useSupabaseClient,
  Session,
} from '@supabase/auth-helpers-react';
import { Database } from '../utils/database.types';
type Profiles = Database['public']['Tables']['profiles']['Row'];
import Avatar from '@/components/Avatar';

export default function Account({ session }: { session: Session }) {
  const supabase = useSupabaseClient<Database>();
  const user = useUser();
  const [loading, setLoading] = useState(true);
  const [full_name, setFullname] = useState<Profiles['full_name']>(null);
  const [username, setUsername] = useState<Profiles['username']>(null);
  const [website, setWebsite] = useState<Profiles['website']>(null);
  const [avatar_url, setAvatarUrl] = useState<Profiles['avatar_url']>(null);

  useEffect(() => {
    getProfile();
  }, [session]);

  async function getProfile() {
    try {
      setLoading(true);
      if (!user) throw new Error('No user');

      let { data, error, status } = await supabase
        .from('profiles')
        .select(`full_name, username, website, avatar_url`)
        .eq('id', user.id)
        .single();

      if (error && status !== 406) {
        throw error;
      }

      if (data) {
        setFullname(data.full_name);
        setUsername(data.username);
        setWebsite(data.website);
        setAvatarUrl(data.avatar_url);
      }
    } catch (error) {
      alert('Error loading user data!');
      console.log(error);
    } finally {
      setLoading(false);
    }
  }

  async function updateProfile({
    full_name,
    username,
    website,
    avatar_url,
  }: {
    full_name: Profile['full_name'];
    username: Profiles['username'];
    website: Profiles['website'];
    avatar_url: Profiles['avatar_url'];
  }) {
    try {
      setLoading(true);
      if (!user) throw new Error('No user');

      const updates = {
        id: user.id,
        full_name,
        username,
        website,
        avatar_url,
        updated_at: new Date().toISOString(),
      };

      let { error } = await supabase.from('profiles').upsert(updates);
      if (error) throw error;
      alert('Profile updated!');
    } catch (error) {
      alert('Error updating the data!');
      console.log(error);
    } finally {
      setLoading(false);
    }
  }

  return (
    <form className='relative bg-white px-6 pt-10 pb-8 shadow-xl ring-1 ring-gray-900/5 sm:mx-auto sm:max-w-lg sm:rounded-lg sm:px-10'>
      <div>
        <label
          htmlFor='email'
          className='block text-gray-700 text-sm font-bold my-2'
        >
          Email
        </label>
        <input
          id='email'
          type='text'
          value={session.user.email}
          disabled
          className='form-input rounded w-full'
        />
      </div>
      <div>
        <label
          htmlFor='full_name'
          className='block text-gray-700 text-sm font-bold my-2'
        >
          Name
        </label>
        <input
          id='full_name'
          type='text'
          value={full_name || ''}
          onChange={(e) => setFullname(e.target.value)}
          className='form-input rounded w-full'
        />
      </div>
      <div>
        <label
          htmlFor='username'
          className='block text-gray-700 text-sm font-bold my-2'
        >
          Username
        </label>
        <input
          id='username'
          type='text'
          value={username || ''}
          onChange={(e) => setUsername(e.target.value)}
          className='form-input rounded w-full'
        />
      </div>
      <div>
        <label
          htmlFor='website'
          className='block text-gray-700 text-sm font-bold my-2'
        >
          Website
        </label>
        <input
          id='website'
          type='website'
          value={website || ''}
          onChange={(e) => setWebsite(e.target.value)}
          className='form-input rounded w-full'
        />
      </div>
      <Avatar
        uid={user.id}
        url={avatar_url}
        size={96}
        onUpload={(url) => {
          setAvatarUrl(url);
          updateProfile({ full_name, username, website, avatar_url: url });
        }}
      />
      <div>
        <button
          className='bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline'
          onClick={() =>
            updateProfile({ full_name, username, website, avatar_url })
          }
          disabled={loading}
        >
          {loading ? 'Loading ...' : 'Update'}
        </button>
      </div>
      <div>
        <button
          className='bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline'
          onClick={() => supabase.auth.signOut()}
        >
          Sign Out
        </button>
      </div>
      <Link href={`users/${username}`}>{username}</Link>
    </form>
  );
}
