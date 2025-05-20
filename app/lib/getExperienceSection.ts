import { client } from '../sanity/client'

export interface Experience {
  _id: string
  title: string
  slug: {
    current: string
  }
  company: string
  location: string
  period: string
  description: any[]
  priority?: number
  label?: string[]
}

export async function getExperienceSection(): Promise<Experience[]> {
  const query = `*[_type == "experience"] | order(priority asc) {
    _id,
    title,
    slug {
      current
    },
    company,
    location,
    period,
    description,
    priority,
    label
  }`

  const experience = await client.fetch(query)
  return experience
}
