import AboutMeSection from './components/AboutMeSection'
import ContactMe from './components/ContactMe'
import EducationSection from './components/EducationSection'
import ExperienceSection from './components/ExperienceSection'
import HeroSection from './components/HeroSection'
import PostsSection from './components/PostsSection'

export default function Home() {
  return (
    <main>
      <section id="home">
        <HeroSection />
      </section>

      <section id="experience">
        <ExperienceSection />
      </section>

      <section id="projects">
        <PostsSection />
      </section>

      <section id="about-me">
        <AboutMeSection />
      </section>

      <section id="education">
        <EducationSection />
      </section>

      <section id="contact-me">
        <ContactMe />
      </section>
    </main>
  )
}
