'use client'

import { useState } from 'react'
import { submitContactMe } from '../lib/submitContactMe'

export default function ContactMe() {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    message: '',
  })

  const [status, setStatus] = useState<string | null>(null)
  const [isSubmitting, setIsSubmitting] = useState(false)

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    })
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setStatus(null)
    setIsSubmitting(true)

    try {
      await submitContactMe(formData)
      setStatus('Successfully sent')
      setFormData({ name: '', email: '', message: '' })
    } catch (error: any) {
      setStatus('Something went wrong. Please try again.')
    } finally {
      setIsSubmitting(false)
    }
  }

  return (
    <section id="contact-me" className="max-w-xl mx-auto px-4 py-16">
      <h2 className="text-3xl font-bold text-center text-blue-600 mb-4">
        Contact Me
      </h2>

      {status && (
        <p className={`text-center mb-6 text-sm ${status === 'Successfully sent' ? 'text-blue-700' : 'text-red-600'}`}>
          {status}
        </p>
      )}

      <p className="text-center text-sm text-gray-600 mb-6">
        The information you submit is not stored by this website.
      </p>

      <form onSubmit={handleSubmit} className="space-y-6 bg-white p-6 rounded-2xl shadow-lg">
        <input
          type="text"
          name="name"
          placeholder="Your Name"
          value={formData.name}
          onChange={handleChange}
          required
          className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-300"
        />
        <input
          type="email"
          name="email"
          placeholder="Your Email"
          value={formData.email}
          onChange={handleChange}
          required
          className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-300"
        />
        <textarea
          name="message"
          placeholder="Your Message"
          value={formData.message}
          onChange={handleChange}
          required
          className="w-full px-4 py-3 border border-gray-300 rounded-xl h-32 resize-none focus:outline-none focus:ring-2 focus:ring-blue-300"
        />

        <div className="relative">
          <button
            type="submit"
            className="relative w-full py-3 bg-blue-600 text-white font-semibold rounded-xl hover:bg-blue-700 transition disabled:opacity-60 disabled:cursor-not-allowed"
            disabled={isSubmitting}
            aria-busy={isSubmitting}
          >
            Send Message

            {isSubmitting && (
              <div className="absolute inset-0 z-10 flex items-center justify-center rounded-xl bg-white/30 backdrop-blur-sm" aria-hidden="true">
                <span className="w-8 h-8 border-4 border-gray-300 border-t-blue-600 rounded-full animate-spin" />
              </div>
            )}
          </button>
        </div>
      </form>
    </section>
  )
}
