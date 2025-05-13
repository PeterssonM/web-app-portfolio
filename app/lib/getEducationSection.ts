import { client } from '../sanity/client'

export interface Education {
  _id: string
  programName: string
  schoolName: string
  period: string
  highlightedCourses?: string[]
}

export async function getEducationSection(): Promise<Education[]> {
  const query = `*[_type == "education"]{
    _id,
    programName,
    schoolName,
    period,
    highlightedCourses
  }`

  const education = await client.fetch(query)
  return education
}
