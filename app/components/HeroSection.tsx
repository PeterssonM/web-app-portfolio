import { getHeroSection } from '../lib/getHeroSection'
import HeroClientTypewriter from './HeroClientTypewriter'
import HeroClientLabels from './HeroClientLabels'

export default async function HeroSection() {
  const heroLabels = await getHeroSection()

  return (
    <section className="relative py-24 px-4 overflow-hidden">
      <div className="relative z-10 text-center">
        <h1 className="text-4xl md:text-5xl font-bold text-gray-800">
          Hi, I'm Maximilian
        </h1>
        <HeroClientTypewriter />
        <HeroClientLabels labels = {heroLabels.labels}/>
      </div>
    </section>
  )
}
