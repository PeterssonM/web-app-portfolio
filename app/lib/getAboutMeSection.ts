import { client } from '../sanity/client'

export interface About {
  title?: string
  description?: any[] 
  location?: string
  email?: string
  profileImage?: {
    asset: {
      _id: string
      _type: string
      url: string
    }
  }
  socialLinks?: {
    platform: string
    url: string
  }[]
}

export async function getAboutMeSection(): Promise<About> {
  const query = `*[_type == "about"][0]{
    title,
    description,
    location,
    email,
    profileImage {
      asset->{
        _id,
        _type,
        url
      }
    },
    socialLinks[] {
      platform,
      url
    }
  }`

  const about = await client.fetch(query)
  return about
}
