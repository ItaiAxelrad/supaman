'use client';
import { Database } from '@/types/database.types';
import { Button, Container, TextInput } from '@mantine/core';
import {
  Session,
  createClientComponentClient,
} from '@supabase/auth-helpers-nextjs';
import { useCallback, useEffect, useState } from 'react';
import Avatar from './avatar';

export default function AccountForm({ session }: { session: Session | null }) {
  const supabase = createClientComponentClient<Database>();
  const [loading, setLoading] = useState(true);
  const [fullname, setFullname] = useState<string | null>(null);
  const [username, setUsername] = useState<string | null>(null);
  const [website, setWebsite] = useState<string | null>(null);
  const [avatar_url, setAvatarUrl] = useState<string | null>(null);
  const user = session?.user;

  const getProfile = useCallback(async () => {
    try {
      setLoading(true);

      let { data, error, status } = await supabase
        .from('profiles')
        .select(`full_name, username, website, avatar_url`)
        .eq('id', user?.id!)
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
    } finally {
      setLoading(false);
    }
  }, [user, supabase]);

  useEffect(() => {
    getProfile();
  }, [user, getProfile]);

  async function updateProfile({
    username,
    website,
    avatar_url,
  }: {
    username: string | null;
    fullname: string | null;
    website: string | null;
    avatar_url: string | null;
  }) {
    try {
      setLoading(true);

      let { error } = await supabase.from('profiles').upsert({
        id: user?.id as string,
        full_name: fullname,
        username,
        website,
        avatar_url,
        updated_at: new Date().toISOString(),
      });
      if (error) throw error;
      alert('Profile updated!');
    } catch (error) {
      alert('Error updating the data!');
    } finally {
      setLoading(false);
    }
  }

  return (
    <Container size='xs'>
       <TextInput label='Email' value={session?.user.email} disabled/>
       <TextInput label='Full Name'         value={fullname || ''}
          onChange={(e) => setFullname(e.target.value)}/>
             <TextInput label='Username'                  value={username || ''}
          onChange={(e) => setUsername(e.target.value)} />
      
                  <TextInput label='Website'   type='url'                         value={website || ''}
          onChange={(e) => setWebsite(e.target.value)} />
      <Avatar
        uid={user?.id!}
        url={avatar_url}
        size={150}
        onUpload={(url) => {
          setAvatarUrl(url);
          updateProfile({ fullname, username, website, avatar_url: url });
        }}
      />
      <Button
        my='xs'
          onClick={() =>
            updateProfile({ fullname, username, website, avatar_url })
          }
          loading={loading}
        >
          Update
        </Button>
        <form action='/auth/signout' method='post'>
          <Button type='submit'>
            Sign out
          </Button>
        </form>
    </Container>
  );
}
