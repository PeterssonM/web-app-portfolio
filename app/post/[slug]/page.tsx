export const dynamic = 'force-dynamic'

import Image from 'next/image'
import Link from 'next/link'
import { notFound } from 'next/navigation'
import { getPostBySlug } from '../../lib/getPost'


export default async function PostPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;

  const post = await getPostBySlug(slug)

  if (!post) {
    notFound() //status: 404
  }

  return (
    <main className="max-w-3xl mx-auto px-4 py-10">
      <Link href="/" className="text-sm text-blue-600 underline mb-4 block">← Back</Link>

      <h1 className="text-3xl font-bold mb-2">{post.title}</h1>
      {post.subtitle && <h2 className="text-xl text-gray-600 mb-4">{post.subtitle}</h2>}

      {post.image?.asset?.url && (
        <div className="mb-6">
          <Image
            src={post.image.asset.url}
            alt={post.title || 'Image title is missing'}
            width={800}
            height={500}
            className="rounded-2xl object-cover w-full"
          />
        </div>
      )}

      {post.label && post.label.length > 0 && (
        <div className="flex flex-wrap gap-2 mb-4">
          {post.label.map((label: string, idx: number) => (
            <span
              key={idx}
              className="bg-blue-100 text-blue-700 text-xs px-2 py-1 rounded-full"
            >
              {label}
            </span>
          ))}
        </div>
      )}

      <div className="text-gray-800 text-base leading-relaxed mb-6 whitespace-pre-line">
        {post.description}
      </div>

      {post.video && (
        <a
          href={post.video}
          target="_blank"
          rel="noopener noreferrer"
          className="inline-block text-blue-600 underline"
        >
          Watch Video
        </a>
      )}

      {post.links && post.links.length > 0 && (
        <div className="mt-6">
          <h3 className="text-lg font-semibold mb-2">Links</h3>
          <ul className="list-disc list-inside space-y-1">
            {post.links.map((link: any, idx: number) => (
              <li key={idx}>
                <a
                  href={link.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-blue-600 underline"
                >
                  {link.title}
                </a>
              </li>
            ))}
          </ul>
        </div>
      )}
    </main>
  )
}
