"use client";

import { createClient } from "@/utils/supabase/client";
import { Box, Button, FileInput, Group, Text } from "@mantine/core";
import Image from "next/image";
import React, { useEffect, useState } from "react";

export default function Avatar({
  uid,
  url,
  size,
  onUpload,
}: {
  uid: string;
  url: string;
  size: number;
  onUpload: (url: string) => void;
}) {
  const supabase = createClient();
  const [avatarUrl, setAvatarUrl] = useState(url);
  const [file, setFile] = useState<File | null>(null);
  const [uploading, setUploading] = useState(false);

  useEffect(() => {
    async function downloadImage(path: string) {
      try {
        const { data, error } = await supabase.storage
          .from("avatars")
          .download(path);
        if (error) {
          throw error;
        }

        const url = URL.createObjectURL(data);
        setAvatarUrl(url);
      } catch (error) {
        console.log("Error downloading image: ", error);
      }
    }

    if (url) downloadImage(url);
  }, [url, supabase]);

  const uploadAvatar: React.ChangeEventHandler<HTMLInputElement> = async () => {
    try {
      setUploading(true);

      if (!file) {
        throw new Error("You must select an image to upload.");
      }

      const fileExt = file?.name.split(".").pop();
      const filePath = `${uid}-${Math.random()}.${fileExt}`;

      let { error: uploadError } = await supabase.storage
        .from("avatars")
        .upload(filePath, file);

      if (uploadError) {
        throw uploadError;
      }

      onUpload(filePath);
    } catch (error) {
      alert("Error uploading avatar!");
    } finally {
      setUploading(false);
    }
  };

  return (
    <Box>
      <Group grow>
        <FileInput
          label="Avatar"
          placeholder="Select a file"
          value={file}
          onChange={setFile}
          mb="xs"
        />
        <Button mt="md" onClick={() => uploadAvatar} loading={uploading}>
          Upload
        </Button>
      </Group>

      <Group>
        {file ? (
          <Image
            width={size}
            height={size}
            src={URL.createObjectURL(file)}
            alt="Avatar"
            className="avatar image"
            style={{ height: size, width: size }}
          />
        ) : (
          <Text
            className="avatar no-image"
            style={{ height: size, width: size }}
          />
        )}
        {avatarUrl ? (
          <Image
            width={size}
            height={size}
            src={avatarUrl}
            alt="Avatar"
            className="avatar image"
            style={{ height: size, width: size }}
          />
        ) : (
          <Text
            className="avatar no-image"
            style={{ height: size, width: size }}
          />
        )}
      </Group>
    </Box>
  );
}
