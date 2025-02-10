"use client";

import { createClient } from "@/utils/supabase/client";
import { Button, Loader, TextInput } from "@mantine/core";
import { isEmail, isNotEmpty, useForm } from "@mantine/form";
import { notifications } from "@mantine/notifications";
import { User } from "@supabase/supabase-js";
import { useCallback, useEffect, useState } from "react";
import Avatar from "./avatar";

interface FormValues {
  email: string | null;
  full_name: string | null;
  user_name: string | null;
  website: string | null;
  avatar_url: string | null;
}

export default function AccountForm({ user }: { user: User }) {
  const supabase = createClient();
  const [loading, setLoading] = useState(true);

  const form = useForm<FormValues>({
    initialValues: {
      email: user?.email ?? "",
      full_name: user.user_metadata.full_name ?? "",
      user_name: user.user_metadata.user_name ?? "",
      avatar_url: user.user_metadata.avatar_url ?? "",
      website: "",
    },

    validate: {
      email: isEmail("Please enter a valid email address"),
      full_name: isNotEmpty("Please enter your full name"),
      user_name: isNotEmpty("Please enter your user_name"),
    },
  });

  const getProfile = useCallback(async () => {
    try {
      setLoading(true);

      let { data, error, status } = await supabase
        .from("profiles")
        .select(`full_name, user_name, website, avatar_url`)
        .eq("id", user?.id!)
        .single();

      if (error && status !== 406) {
        throw error;
      }

      if (data) {
        form.setValues(data);
      }
    } catch (error) {
      notifications.show({
        title: "Error",
        message: "Error loading user data!",
        color: "red",
      });
    } finally {
      setLoading(false);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [user, supabase]);

  useEffect(() => {
    getProfile();
  }, [user, getProfile]);

  async function updateProfile({
    full_name,
    user_name,
    website,
    avatar_url,
  }: FormValues) {
    try {
      setLoading(true);

      let { error } = await supabase
        .from("profiles")
        .upsert({
          id: user?.id as string,
          full_name,
          user_name,
          website,
          avatar_url,
          updated_at: new Date().toISOString(),
        });
      if (error) throw error;
      notifications.show({
        title: "Success",
        message: "Profile updated!",
        color: "red",
      });
    } catch (error) {
      notifications.show({
        title: "Error",
        message: "Error loading user data!",
        color: "red",
      });
    } finally {
      setLoading(false);
    }
  }

  return (
    <form onSubmit={form.onSubmit((values) => updateProfile(values))}>
      <TextInput label="Email" {...form.getInputProps("email")} disabled />
      <TextInput
        label="Full Name"
        {...form.getInputProps("full_name")}
        rightSection={loading && <Loader size="xs" />}
      />
      <TextInput
        label="User_name"
        {...form.getInputProps("user_name")}
        rightSection={loading && <Loader size="xs" />}
      />
      <TextInput
        label="Website"
        type="url"
        {...form.getInputProps("website")}
        rightSection={loading && <Loader size="xs" />}
      />
      <Avatar
        uid={user?.id!}
        url={form.values.avatar_url ?? ""}
        size={150}
        onUpload={(url) => {
          // setAvatarUrl(url);
          // updateProfile({ fullname, user_name, website, avatar_url: url });
        }}
      />
      <Button my="xs" type="submit" loading={loading}>
        Update
      </Button>
    </form>
  );
}
