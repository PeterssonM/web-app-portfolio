import { client } from '../sanity/client'

export interface isOpenToWork {
  _id: string
  isOpenToWork: boolean
}

export async function getOpenToWorkStatus(): Promise<isOpenToWork> {
  const query = `*[_type == "hero"][0]{
    _id,
    isOpenToWork
  }`

  const isOpenToWork = await client.fetch(query)
  return isOpenToWork
}
