import { getExperienceSection } from '../lib/getExperienceSection'
import ExperienceClient from './ExperienceClient'

export default async function ExperienceSection() {
  const experience = await getExperienceSection()

  return (
    <section id="experience" className="py-12 px-6 max-w-6xl mx-auto">
      <h2 className="text-3xl font-bold mb-6">Experience</h2>
      <ExperienceClient initialExperience={experience} />
    </section>
  )
}


