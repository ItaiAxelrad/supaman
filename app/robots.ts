import { sharedMetadata } from "@/utils/metadata";
import type { MetadataRoute } from "next";

export default function robots(): MetadataRoute.Robots {
  return {
    rules: { userAgent: "*", allow: "/", disallow: "/dashboard/" },
    sitemap: `${sharedMetadata.metadataBase}/sitemap.xml'`,
  };
}
