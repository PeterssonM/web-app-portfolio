import { getPostsSection } from '../lib/getPostsSection'
import PostsClient from './PostsClient'

export default async function PostsSection() {
  const posts = await getPostsSection()

  return (
    <section id="projects" className="py-12 px-4 max-w-6xl mx-auto">
      <h2 className="text-3xl font-bold mb-6">Projects</h2>
      <PostsClient initialPosts={posts} />
    </section>
  )
}
