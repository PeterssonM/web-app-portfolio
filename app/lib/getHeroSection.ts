import { client } from '../sanity/client'

export interface HeroLabels {
  _id: string
  labels: string[]
}

export async function getHeroSection(): Promise<HeroLabels> {
  const query = `*[_type == "hero"][0]{
    _id,
    labels
  }`

  const hero = await client.fetch(query)
  return hero
}
