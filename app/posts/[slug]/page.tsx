import { notFound } from 'next/navigation';
import { getAllPostSlugs, getPostBySlug } from '@/lib/blog/markdown';
import { format } from 'date-fns';
import { ko } from 'date-fns/locale';
import Link from 'next/link';
import PostContent from '@/components/blog/PostContent';

// 정적 경로 생성
export async function generateStaticParams() {
  const slugs = getAllPostSlugs();
  return slugs.map((slug) => ({ slug }));
}

// 메타데이터 생성
export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const post = await getPostBySlug(slug);
  
  if (!post) {
    return {
      title: 'Post Not Found',
    };
  }

  return {
    title: `${post.title} | albatro33 blog`,
    description: post.description,
  };
}

export default async function PostPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const post = await getPostBySlug(slug);

  if (!post) {
    notFound();
  }

  return (
    <article className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
      {/* Back Button */}
      <Link
        href="/"
        className="inline-flex items-center text-blue-600 hover:text-blue-800 mb-8 font-medium"
      >
        ← 목록으로 돌아가기
      </Link>

      {/* Cover Image */}
      {post.coverImage && (
        <div className="w-full h-96 rounded-lg overflow-hidden mb-8">
          <img
            src={post.coverImage}
            alt={post.title}
            className="w-full h-full object-cover"
          />
        </div>
      )}

      {/* Header */}
      <header className="mb-8">
        <h1 className="text-4xl md:text-5xl font-bold text-gray-900 mb-4">
          {post.title}
        </h1>

        <div className="flex flex-wrap items-center gap-4 text-gray-600 mb-4">
          <div className="flex items-center gap-2">
            <span className="text-sm">📅 발행:</span>
            <time dateTime={post.date}>
              {format(new Date(post.date), 'PPP', { locale: ko })}
            </time>
          </div>
          {post.updatedAt && (
            <>
              <span>•</span>
              <div className="flex items-center gap-2 text-orange-600">
                <span className="text-sm">✏️ 수정:</span>
                <time dateTime={post.updatedAt}>
                  {format(new Date(post.updatedAt), 'PPP', { locale: ko })}
                </time>
              </div>
            </>
          )}
          <span>•</span>
          <span>{post.author}</span>
          {post.category && (
            <>
              <span>•</span>
              <span className="text-purple-600 font-medium">📁 {post.category}</span>
            </>
          )}
        </div>

        <p className="text-xl text-gray-600 mb-6">{post.description}</p>

        {post.tags.length > 0 && (
          <div className="flex flex-wrap gap-2">
            {post.tags.map((tag) => (
              <span
                key={tag}
                className="bg-gray-100 text-gray-700 px-3 py-1 rounded-full text-sm"
              >
                #{tag}
              </span>
            ))}
          </div>
        )}
      </header>

      {/* Content with Code Highlighting */}
      <PostContent content={post.content} />

      {/* Footer */}
      <footer className="mt-12 pt-8 border-t border-gray-200">
        <Link
          href="/"
          className="inline-flex items-center text-blue-600 hover:text-blue-800 font-medium"
        >
          ← 목록으로 돌아가기
        </Link>
      </footer>
    </article>
  );
}
