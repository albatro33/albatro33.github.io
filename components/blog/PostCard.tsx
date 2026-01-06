import Link from 'next/link';
import { PostMetadata } from '@/types/post';
import { format } from 'date-fns';
import { ko } from 'date-fns/locale';

interface PostCardProps {
  post: PostMetadata & { slug: string };
}

export default function PostCard({ post }: PostCardProps) {
  return (
    <Link href={`/posts/${post.slug}`}>
      <article className="bg-white rounded-lg shadow-md hover:shadow-xl transition-shadow duration-300 overflow-hidden h-full">
        {post.coverImage && (
          <div className="w-full h-48 bg-gradient-to-br from-blue-400 to-purple-500 relative">
            <img
              src={post.coverImage}
              alt={post.title}
              className="w-full h-full object-cover"
            />
          </div>
        )}
        {!post.coverImage && (
          <div className="w-full h-48 bg-gradient-to-br from-blue-400 to-purple-500 flex items-center justify-center">
            <h3 className="text-white text-2xl font-bold px-4 text-center line-clamp-2">
              {post.title}
            </h3>
          </div>
        )}
        
          <div className="p-6">
            <div className="flex items-center gap-2 text-sm text-gray-500 mb-2">
              {post.updatedAt ? (
                <div className="flex items-center gap-1 text-orange-600">
                  <span>✏️</span>
                  <time dateTime={post.updatedAt}>
                    {format(new Date(post.updatedAt), 'PPP', { locale: ko })}
                  </time>
                </div>
              ) : (
                <time dateTime={post.date}>
                  {format(new Date(post.date), 'PPP', { locale: ko })}
                </time>
              )}
              {post.category && (
                <>
                  <span>•</span>
                  <span className="text-blue-600 font-medium">{post.category}</span>
                </>
              )}
            </div>
          
          <h2 className="text-xl font-bold text-gray-800 mb-2 line-clamp-2">
            {post.title}
          </h2>
          
          <p className="text-gray-600 mb-4 line-clamp-3">
            {post.description}
          </p>
          
          {post.tags.length > 0 && (
            <div className="flex flex-wrap gap-2">
              {post.tags.map((tag) => (
                <span
                  key={tag}
                  className="text-xs bg-gray-100 text-gray-700 px-2 py-1 rounded-full"
                >
                  #{tag}
                </span>
              ))}
            </div>
          )}
        </div>
      </article>
    </Link>
  );
}

