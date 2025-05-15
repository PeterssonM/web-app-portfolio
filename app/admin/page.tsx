'use client'

import { useState } from 'react'
import { submitLogin } from '../lib/submitLogin'

export default function Login() {
  const [formData, setFormData] = useState({
    email: '',
    password: '',
  })

  const [status, setStatus] = useState<string | null>(null)
  const [isLoading, setIsLoading] = useState<boolean>(false)

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    })
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setStatus(null)
    setIsLoading(true)

    try {
      await submitLogin(formData)
      setStatus('Logged in successfully!')
      setFormData({ email: '', password: '' })
    } catch (error: any) {
      setStatus('Login failed. Please try again.')
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <section className="max-w-md mx-auto px-4 py-16">
      <h2 className="text-3xl font-bold text-center text-blue-600 mb-8">
        Login
      </h2>
      <p className="text-center text-sm text-gray-600 mb-6">
        This is an admin only page.
      </p>
      <form onSubmit={handleSubmit} className="space-y-6 bg-white p-6 rounded-2xl shadow-lg">
        <input
          type="email"
          name="email"
          placeholder="Your Email"
          value={formData.email}
          onChange={handleChange}
          required
          className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-300"
        />
        <input
          type="password"
          name="password"
          placeholder="Your Password"
          value={formData.password}
          onChange={handleChange}
          required
          className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-300"
        />
        <button
          type="submit"
          className="w-full py-3 bg-blue-600 text-white font-semibold rounded-xl hover:bg-blue-700 transition"
        >
          {isLoading ? 'Logging in...' : 'Log In'}
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
