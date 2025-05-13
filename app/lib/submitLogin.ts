export const submitLogin = async (formData: {
    email: string
    password: string
  }) => {
    const res = await fetch('/api/authenticate', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(formData),
      credentials: 'include',
    })
  
    if (!res.ok) {
      throw new Error('Failed to authenticate user')
    }
  
    return res.json()
  }
  