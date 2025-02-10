import { sharedMetadata, sharedViewport } from "@/utils/metadata";
import type { MetadataRoute } from "next";

type ManifestIcon = {
  src: string;
  type?: string;
  sizes?: string;
  purpose?: "any" | "maskable" | "monochrome" | "badge";
};

export default function manifest(): MetadataRoute.Manifest {
  return {
    name: sharedMetadata.applicationName!,
    short_name: sharedMetadata.applicationName!,
    description: sharedMetadata?.description!,
    start_url: sharedMetadata.metadataBase!.toString(),
    background_color: sharedViewport.themeColor!.toString(),
    theme_color: sharedViewport.themeColor!.toString(),
    icons: sharedMetadata.icons as ManifestIcon[],
    display: "standalone",
  };
}
