import { client } from '../sanity/client'

export interface Post {
  _id: string
  slug: {
    current: string
  }
  title?: string
  subtitle?: string
  label?: string[]
  description?: any[]
  image?: {
    asset: {
      _id: string
      url: string
    }
  }
  video?: string
  links?: {
    title: string
    url: string
  }[]
  priority?: number
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
    },
    priority
  }`

  const post = await client.fetch(query, { slug })
  return post
}

export async function getPosts(): Promise<Post[]> {
  const query = `*[_type == "post"] | order(priority asc) {
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
    },
    priority
  }`

  const posts = await client.fetch(query)
  return posts
}
