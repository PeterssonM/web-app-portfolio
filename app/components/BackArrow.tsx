'use client'

import { useRouter } from 'next/navigation'

export default function BackArrow() {
  const router = useRouter()

  return (
    <button
        type="button"
        onClick={() => {
            if (window.history.length > 1) {
            router.back()
            } else {
            router.push('/')
            }
        }}
        className="text-sm text-blue-600 underline mb-4 block cursor-pointer"
    >
        ← Back
    </button>
  )
}
