'use client'

import { useState } from 'react'
import type { Experience } from '../lib/getExperienceSection'

export default function ExperienceClient({ initialExperience }: { initialExperience: Experience[] }) {
  const [showMore, setShowMore] = useState(false)
  const visibleExperience = showMore ? initialExperience : initialExperience.slice(0, 1)

  return (
    <div className="flex flex-col gap-8">
      {visibleExperience.map((exp) => (
        <div key={exp._id} className="flex flex-col md:flex-row items-start gap-8 mb-8">
          <div className="flex-1">
            <h3 className="text-xl font-semibold">{exp.title}</h3>
            <h4 className="text-lg text-gray-600">{exp.company}</h4>
            <p className="text-sm text-gray-700">{exp.period}</p>
            <p className="text-sm text-gray-700 mt-2">{exp.description}</p>

            {exp.label && exp.label.length > 0 && (
              <div className="mt-4">
                <div className="flex flex-wrap gap-2 mt-2">
                  {exp.label.map((skill, idx) => (
                    <span key={idx} className="bg-blue-100 text-blue-700 text-xs px-2 py-1 rounded-full">
                      {skill}
                    </span>
                  ))}
                </div>
              </div>
            )}
          </div>
        </div>
      ))}

      {initialExperience.length > 1 && (
        <div className="flex justify-center mt-4">
            <button
                onClick={() => setShowMore((prev) => !prev)}
                className="text-blue-600 hover:underline font-medium"
            >
            {showMore ? 'Show Less' : 'Show More'}
            </button>
        </div>
  
      )}
    </div>
  )
}
