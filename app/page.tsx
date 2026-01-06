import PostList from '@/components/blog/PostList';
import { getAllPosts, getAllTags, getAllCategories } from '@/lib/blog/markdown';

export default function Home() {
  const posts = getAllPosts();
  const tags = getAllTags();
  const categories = getAllCategories();

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
      {/* Hero Section */}
      <div className="text-center mb-16">
        <h1 className="text-5xl font-bold mb-4 bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
          albatro33 blog
        </h1>
        <p className="text-xl text-gray-600 max-w-2xl mx-auto">
          개발, 기술, 그리고 일상에 대한 이야기를 공유합니다.
        </p>
      </div>

      {/* Blog Posts */}
      <PostList posts={posts} tags={tags} categories={categories} />
    </div>
  );
}
