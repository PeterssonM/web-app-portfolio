import { getEducationSection } from '../lib/getEducationSection'

export default async function EducationSection() {
  const education = await getEducationSection()

  return (
    <section id="education" className="py-12 px-6 max-w-4xl mx-auto">
      <h2 className="text-3xl font-bold mb-6">Education</h2>

      <div className="flex flex-col md:flex-row items-center gap-8">
        {education.map((edu) => (
          <div key={edu._id} className="flex flex-col md:flex-row items-center gap-8 mb-8">
            <div className="flex-1">
              <h3 className="text-xl font-semibold">{edu.programName}</h3>
              <h4 className="text-lg text-gray-600">{edu.schoolName}</h4>
              <p className="text-sm text-gray-700">{edu.period}</p>

              {edu.highlightedCourses && edu.highlightedCourses.length > 0 && (
                <div className="mt-4">
                  <strong>Highlighted Courses:</strong>
                  <ul className="list-disc ml-6 text-sm text-gray-700 space-y-1">
                    {edu.highlightedCourses.map((course, idx) => (
                      <li key={idx}>{course}</li>
                    ))}
                  </ul>
                </div>
              )}
            </div>
          </div>
        ))}
      </div>
    </section>
  )
}
