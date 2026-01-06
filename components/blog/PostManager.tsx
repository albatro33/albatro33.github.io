'use client';

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';

interface Post {
  slug: string;
  title: string;
  date: string;
  updatedAt?: string;
  category?: string;
  published: boolean;
}

interface PostManagerProps {
  onEdit: (slug: string) => void;
}

export default function PostManager({ onEdit }: PostManagerProps) {
  const router = useRouter();
  const [posts, setPosts] = useState<Post[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    fetchPosts();
  }, []);

  const fetchPosts = async () => {
    try {
      const response = await fetch('/api/posts');
      const data = await response.json();
      
      // 각 슬러그의 메타데이터 가져오기
      const postsData = await Promise.all(
        data.slugs.map(async (slug: string) => {
          const res = await fetch(`/api/posts/${slug}`);
          const postData = await res.json();
          return {
            slug,
            title: postData.metadata.title,
            date: postData.metadata.date,
            updatedAt: postData.metadata.updatedAt,
            category: postData.metadata.category,
            published: postData.metadata.published,
          };
        })
      );

      // 날짜 기준 내림차순 정렬
      postsData.sort((a, b) => 
        new Date(b.updatedAt || b.date).getTime() - new Date(a.updatedAt || a.date).getTime()
      );

      setPosts(postsData);
    } catch (error) {
      console.error('포스트 목록 가져오기 실패:', error);
    } finally {
      setIsLoading(false);
    }
  };

  const handleDelete = async (slug: string, title: string) => {
    if (!confirm(`"${title}" 포스트를 삭제하시겠습니까?\n\n⚠️ 이 작업은 되돌릴 수 없습니다!`)) {
      return;
    }

    try {
      const response = await fetch(`/api/posts/${slug}`, {
        method: 'DELETE',
      });

      const result = await response.json();

      if (response.ok) {
        alert('포스트가 삭제되었습니다!');
        fetchPosts(); // 목록 새로고침
        router.refresh();
      } else {
        alert(`삭제 실패: ${result.error}`);
      }
    } catch (error) {
      console.error('포스트 삭제 오류:', error);
      alert('포스트 삭제에 실패했습니다.');
    }
  };

  if (isLoading) {
    return (
      <div className="flex justify-center items-center py-12">
        <div className="text-gray-600">포스트 목록 불러오는 중...</div>
      </div>
    );
  }

  return (
    <div className="bg-white rounded-lg shadow-md p-6">
      <h2 className="text-2xl font-bold text-gray-900 mb-4">📚 기존 포스트 관리</h2>
      
      {posts.length === 0 ? (
        <div className="text-center py-8 text-gray-500">
          아직 포스트가 없습니다.
        </div>
      ) : (
        <div className="space-y-3">
          {posts.map((post) => (
            <div
              key={post.slug}
              className="border border-gray-200 rounded-lg p-4 hover:shadow-md transition-shadow"
            >
              <div className="flex justify-between items-start">
                <div className="flex-1">
                  <div className="flex items-center gap-2 mb-2">
                    <h3 className="text-lg font-semibold text-gray-900">
                      {post.title}
                    </h3>
                    {!post.published && (
                      <span className="text-xs bg-gray-200 text-gray-700 px-2 py-1 rounded">
                        비공개
                      </span>
                    )}
                    {post.category && (
                      <span className="text-xs bg-purple-100 text-purple-700 px-2 py-1 rounded">
                        📁 {post.category}
                      </span>
                    )}
                  </div>
                  
                  <div className="text-sm text-gray-600 space-y-1">
                    <div>
                      📅 발행일: {new Date(post.date).toLocaleDateString('ko-KR')}
                    </div>
                    {post.updatedAt && (
                      <div className="text-orange-600">
                        ✏️ 수정일: {new Date(post.updatedAt).toLocaleDateString('ko-KR')}
                      </div>
                    )}
                    <div className="text-gray-400">
                      🔗 {post.slug}
                    </div>
                  </div>
                </div>

                <div className="flex gap-2 ml-4">
                  <button
                    onClick={() => onEdit(post.slug)}
                    className="px-3 py-1 bg-blue-500 hover:bg-blue-600 text-white text-sm rounded transition-colors"
                  >
                    ✏️ 수정
                  </button>
                  <button
                    onClick={() => handleDelete(post.slug, post.title)}
                    className="px-3 py-1 bg-red-500 hover:bg-red-600 text-white text-sm rounded transition-colors"
                  >
                    🗑️ 삭제
                  </button>
                  <a
                    href={`/posts/${post.slug}`}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="px-3 py-1 bg-gray-200 hover:bg-gray-300 text-gray-700 text-sm rounded transition-colors"
                  >
                    👁️ 보기
                  </a>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

