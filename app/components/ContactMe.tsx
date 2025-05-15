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

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    })
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setStatus(null)

    try {
      await submitContactMe(formData)
      setStatus('Message sent successfully!')
      setFormData({ name: '', email: '', message: '' })
    } catch (error: any) {
      setStatus('Something went wrong. Please try again.')
    }
  }

  return (
    <section id="contact-me" className="max-w-xl mx-auto px-4 py-16">
      <h2 className="text-3xl font-bold text-center text-blue-600 mb-8">
        Contact Me
      </h2>
      <p className="text-center text-sm text-gray-600 mb-6">
        The information you submit is not stored by this website. It may be stored by the email provider Resend and in my inbox.
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
        <button
          type="submit"
          className="w-full py-3 bg-blue-600 text-white font-semibold rounded-xl hover:bg-blue-700 transition"
        >
          Send Message
        </button>
        {status && (
          <p className="text-center mt-4 text-sm text-blue-700">
            {status}
          </p>
        )}
      </form>
    </section>
  )
}
