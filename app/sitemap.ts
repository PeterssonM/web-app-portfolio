import type { MetadataRoute } from "next";
import { client } from "./sanity/client";

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const posts: { slug: string; _updatedAt: string }[] = await client.fetch(
    `*[_type == "post" && defined(slug.current)]{ "slug": slug.current, _updatedAt }`
  );

  return [
    { url: "https://www.maximilianpetersson.com", lastModified: new Date() },
    ...posts.map((p) => ({
      url: `https://www.maximilianpetersson.com/post/${p.slug}`,
      lastModified: new Date(p._updatedAt),
    })),
  ];
}