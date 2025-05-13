export const submitContactMe = async (formData: {
  name: string
  email: string
  message: string
}) => {
  const res = await fetch('/api/contactme', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(formData),
  })

  if (!res.ok) {
    const err = await res.json()
    throw new Error('Failed to send message')
  }

  return res.json()
}
