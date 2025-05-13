import Image from 'next/image'
import { getAboutMeSection } from '../lib/getAboutMeSection'

export default async function AboutMeSection() {
  const aboutMe = await getAboutMeSection()

  return (
    <section id="about" className="py-12 px-6 max-w-4xl mx-auto">
      <h2 className="text-3xl font-bold mb-6">{aboutMe.title}</h2>

      <div className="flex flex-col md:flex-row items-center gap-8">
        {aboutMe.profileImage?.asset?.url && (
          <div className="w-48 h-48 relative rounded-full overflow-hidden flex-shrink-0 shadow-md">
            <Image
              src={aboutMe.profileImage.asset.url}
              alt="Profile image"
              fill
              className="object-cover"
            />
          </div>
        )}

        <div>
          <p className="text-lg text-gray-800 mb-4">{aboutMe.bio}</p>

          <ul className="text-sm text-gray-600 space-y-1">
            {aboutMe.location && (
              <li>
                <strong>Location:</strong> {aboutMe.location}
              </li>
            )}
            {aboutMe.email && (
              <li>
                <strong>Email:</strong> <a href={`mailto:${aboutMe.email}`} className="text-blue-600 hover:underline">{aboutMe.email}</a>
              </li>
            )}
            {aboutMe.socialLinks && aboutMe.socialLinks.length > 0 && (
              <li>
                <strong>Social:</strong>{' '}
                {aboutMe.socialLinks.map((link, idx) => (
                <span key={idx}>
                  <a
                  href={link.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-blue-600 hover:underline"
                  >
                  {link.platform}
                  </a>
                  {idx < aboutMe.socialLinks!.length - 1 && ' | '}
                </span>
                ))}
              </li>
            )}
          </ul>
        </div>
      </div>
    </section>
  )
}
