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

export async function getPostsSection(): Promise<Post[]> {
  const query = `*[_type == "post"]{
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

  const posts = await client.fetch(query)
  return posts
}
