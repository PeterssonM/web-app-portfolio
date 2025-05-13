import Link from 'next/link'
import { getPostsSection } from '../lib/getPostsSection'

export default async function PostsSection() {
  const posts = await getPostsSection()

  return (
    <section id="projects" className="py-10 px-4 max-w-6xl mx-auto">
      <h2 className="text-3xl font-bold mb-6">Projects</h2>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {posts.map((post) => (
          <Link
            key={post._id}
            href={`/post/${post.slug.current}`}
            className="bg-white rounded-2xl shadow-md p-4 hover:shadow-lg transition-shadow"
          >
            <div>
              <h3 className="text-xl font-semibold">{post.title}</h3>
              {post.subtitle && <h4 className="text-gray-600">{post.subtitle}</h4>}
              <div className="mt-2 mb-2 text-sm text-gray-700 line-clamp-3">
                {post.description}
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
    </section>
  )
}
