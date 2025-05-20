import { client } from '../sanity/client'

export interface Education {
  _id: string
  programName: string
  schoolName: string
  period: string
  highlightedCourses?: string[]
  priority?: number
}

export async function getEducationSection(): Promise<Education[]> {
  const query = `*[_type == "education"] | order(priority asc) {
    _id,
    programName,
    schoolName,
    period,
    highlightedCourses,
    priority
  }`

  const education = await client.fetch(query)
  return education
}
