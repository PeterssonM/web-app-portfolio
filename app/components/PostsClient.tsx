'use client'

import { useState, useEffect } from 'react'
import Link from 'next/link'
import type { Post } from '../lib/getPostsSection'
import { PortableText } from '@portabletext/react'

export default function PostsClient({ initialPosts }: { initialPosts: Post[] }) {
  const [showMore, setShowMore] = useState(false)
  const [isMobile, setIsMobile] = useState(true)

  useEffect(() => {
    const handleResize = () => {
      setIsMobile(window.innerWidth < 768)
    }

    handleResize()
    window.addEventListener('resize', handleResize)
    return () => window.removeEventListener('resize', handleResize)
  }, [])

  const visiblePosts = showMore ? initialPosts : initialPosts.slice(0, isMobile ? 1 : 6)

  return (
    <>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        {visiblePosts.map((post) => (
          <Link
            key={post._id}
            href={`/post/${post.slug.current}`}
            className="bg-white rounded-2xl shadow-md p-4 hover:shadow-lg transition-shadow"
          >
            <div>
              <h3 className="text-xl font-semibold">{post.title}</h3>
              {post.subtitle && <h4 className="text-gray-600">{post.subtitle}</h4>}
              <div className="mt-2 mb-2 text-sm text-gray-700 line-clamp-3 prose prose-sm max-w-none">
                {post.description && <PortableText value={post.description} />}
              </div>

              {post.label && post.label.length > 0 && (
                <div className="flex flex-wrap gap-2 mt-3">
                  {post.label.map((label, idx) => (
                    <span
                      key={idx}
                      className="bg-blue-100 text-blue-700 text-xs px-2 py-1 rounded-full"
                    >
                      {label}
                    </span>
                  ))}
                </div>
              )}
            </div>
          </Link>
        ))}
      </div>

      {initialPosts.length > 3 && (
        <div className="flex justify-center mt-12">
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
