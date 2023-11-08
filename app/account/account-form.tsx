'use client';
import { Database } from '@/types/database.types';
import { Button, Loader, TextInput } from '@mantine/core';
import { isEmail, isNotEmpty, useForm } from '@mantine/form';
import { Session, createClientComponentClient } from '@supabase/auth-helpers-nextjs';
import { useCallback, useEffect, useState } from 'react';
import Avatar from './avatar';

interface FormValues {
  email: string | null;
  full_name: string | null;
  username: string | null;
  website: string | null;
  avatar_url: string | null;
}

export default function AccountForm({ session }: { session: Session | null }) {
  const user = session?.user;
  const supabase = createClientComponentClient<Database>();
  const [loading, setLoading] = useState(true);

  const form = useForm<FormValues>({
    initialValues: {
      email: user?.email ?? '',
      full_name: '',
      username: '',
      website: '',
      avatar_url: '',
    },

    validate: {
      email: isEmail('Please enter a valid email address'),
      full_name: isNotEmpty('Please enter your full name'),
      username: isNotEmpty('Please enter your username'),
    },
  });

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
        form.setValues(data);
      }
    } catch (error) {
      alert('Error loading user data!');
    } finally {
      setLoading(false);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [user, supabase]);

  useEffect(() => {
    getProfile();
  }, [user, getProfile]);

  async function updateProfile({ full_name, username, website, avatar_url }: FormValues) {
    try {
      setLoading(true);

      let { error } = await supabase.from('profiles').upsert({
        id: user?.id as string,
        full_name,
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
    <form onSubmit={form.onSubmit((values) => updateProfile(values))}>
      <TextInput label="Email" {...form.getInputProps('email')} disabled />
      <TextInput
        label="Full Name"
        {...form.getInputProps('full_name')}
        rightSection={loading && <Loader size="xs" />}
      />
      <TextInput
        label="Username"
        {...form.getInputProps('username')}
        rightSection={loading && <Loader size="xs" />}
      />
      <TextInput
        label="Website"
        type="url"
        {...form.getInputProps('website')}
        rightSection={loading && <Loader size="xs" />}
      />
      <Avatar
        uid={user?.id!}
        url={form.values.avatar_url}
        size={150}
        onUpload={(url) => {
          // setAvatarUrl(url);
          // updateProfile({ fullname, username, website, avatar_url: url });
        }}
      />
      <Button my="xs" type="submit" loading={loading}>
        Update
      </Button>
    </form>
  );
}
