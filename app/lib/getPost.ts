import { client } from '../sanity/client'

export interface Post {
  _id: string
  slug: any
  title?: string
  subtitle?: string
  label?: string[]
  description?: string
  image?: {
    asset: {
      _ref: string
      _type: string
      url: string
    }
  }
  video?: string
  links?: {
    title: string
    url: string
  }[]
}

export async function getPostBySlug(slug: string): Promise<Post | null> {
  const query = `*[_type == "post" && slug.current == $slug][0]{
    _id,
    slug,
    title,
    subtitle,
    label,
    description,
    image {
      asset->{
        _id,
        url
      }
    },
    video,
    links[] {
      title,
      url
    }
  }`

  const post = await client.fetch(query, { slug })
  return post
}
