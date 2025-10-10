'use client'

import { useState, useEffect } from 'react'
import { PortableText } from '@portabletext/react'
import type { Experience } from '../lib/getExperienceSection'

export default function ExperienceClient({ initialExperience }: { initialExperience: Experience[] }) {
  const [showMore, setShowMore] = useState(false)
  const [isMobile, setIsMobile] = useState(true)

  useEffect(() => {
    const handleResize = () => setIsMobile(window.innerWidth < 768)
    handleResize()
    window.addEventListener('resize', handleResize)
    return () => window.removeEventListener('resize', handleResize)
  }, [])

  // visa 1 på mobil, annars 2 (layoutbredd matchas av grid-colspan)
  const visibleExperience = showMore ? initialExperience : initialExperience.slice(0, isMobile ? 1 : 2)

  return (
    <>
      <div className="grid grid-cols-1 md:grid-cols-4 lg:grid-cols-6 gap-8">
        {visibleExperience.map((exp) => (
          // varje experience får samma kolumnbredd som vi definierat: md:2, lg:3
          <div key={exp._id} className="col-span-1 md:col-span-2 lg:col-span-3">
            {/* Viktigt: samma horisontella padding som posts (p-4 på posts) -> använd px-4 här */}
            <div className="px-4 py-0 flex flex-col items-start gap-4">
              <div className="flex-1">
                <h3 className="text-xl font-semibold">{exp.title}</h3>
                <h4 className="text-lg text-gray-600">{exp.company}</h4>
                <p className="text-sm text-gray-700">{exp.period}</p>

                <div className="mt-2 text-sm text-gray-700 prose prose-sm max-w-none">
                  {exp.description && <PortableText value={exp.description} />}
                </div>

                {exp.label && exp.label.length > 0 && (
                  <div className="mt-4 flex flex-wrap gap-2">
                    {exp.label.map((skill, idx) => (
                      <span key={idx} className="bg-blue-100 text-blue-700 text-xs px-2 py-1 rounded-full">
                        {skill}
                      </span>
                    ))}
                  </div>
                )}
              </div>
            </div>
          </div>
        ))}
      </div>

      {initialExperience.length > 2 && (
        <div className="flex justify-center mt-8">
          <button
            onClick={() => setShowMore((prev) => !prev)}
            className="text-blue-600 hover:underline font-medium"
          >
            {showMore ? 'Show Less' : 'Show All'}
          </button>
        </div>
      )}
    </>
  )
}
