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
  onPostCountChange?: (count: number) => void;
}

export default function PostManager({ onEdit, onPostCountChange }: PostManagerProps) {
  const router = useRouter();
  const [posts, setPosts] = useState<Post[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    fetchPosts();
  }, []);

  const fetchPosts = async () => {
    try {
      const response = await fetch('/api/posts');
      
      // 응답이 JSON인지 확인
      const contentType = response.headers.get('content-type');
      if (!contentType || !contentType.includes('application/json')) {
        console.error('API 응답이 JSON이 아닙니다:', contentType);
        alert('⚠️ API 연결 오류\n\n개발 서버를 재시작해주세요:\n1. Ctrl + C로 서버 중지\n2. npm run dev 실행');
        setIsLoading(false);
        return;
      }

      if (!response.ok) {
        throw new Error(`API 호출 실패: ${response.status}`);
      }

      const data = await response.json();
      
      if (!data.slugs || !Array.isArray(data.slugs)) {
        console.error('잘못된 API 응답:', data);
        setIsLoading(false);
        return;
      }

      // 각 슬러그의 메타데이터 가져오기
      const postsData = await Promise.all(
        data.slugs.map(async (slug: string) => {
          try {
            const res = await fetch(`/api/posts/${slug}`);
            
            if (!res.ok) {
              console.error(`포스트 ${slug} 가져오기 실패:`, res.status);
              return null;
            }

            const postData = await res.json();
            return {
              slug,
              title: postData.metadata.title,
              date: postData.metadata.date,
              updatedAt: postData.metadata.updatedAt,
              category: postData.metadata.category,
              published: postData.metadata.published,
            };
          } catch (error) {
            console.error(`포스트 ${slug} 처리 중 오류:`, error);
            return null;
          }
        })
      );

      // null 제거 및 날짜 기준 내림차순 정렬
      const validPosts = postsData.filter((post): post is Post => post !== null);
      validPosts.sort((a, b) => 
        new Date(b.updatedAt || b.date).getTime() - new Date(a.updatedAt || a.date).getTime()
      );

      setPosts(validPosts);
      onPostCountChange?.(validPosts.length);
    } catch (error) {
      console.error('포스트 목록 가져오기 실패:', error);
      alert('⚠️ 포스트 목록을 불러올 수 없습니다.\n\n개발 서버를 재시작해주세요.');
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
      {posts.length === 0 ? (
        <div className="text-center py-12 text-gray-500">
          <p className="text-lg mb-2">📝 아직 작성된 포스트가 없습니다.</p>
          <p className="text-sm">위의 "📝 새 글 작성" 탭에서 첫 포스트를 작성해보세요!</p>
        </div>
      ) : (
        <div className="space-y-4">
          <div className="text-sm text-gray-500 mb-4">
            총 <span className="font-bold text-gray-900">{posts.length}</span>개의 포스트
          </div>
          {posts.map((post) => (
            <div
              key={post.slug}
              className="border-2 border-gray-200 rounded-lg p-5 hover:border-blue-300 hover:shadow-lg transition-all"
            >
              <div className="flex justify-between items-start gap-4">
                <div className="flex-1 min-w-0">
                  <div className="flex items-center gap-2 mb-3 flex-wrap">
                    <h3 className="text-lg font-bold text-gray-900 break-words">
                      {post.title}
                    </h3>
                    {!post.published && (
                      <span className="text-xs bg-yellow-100 text-yellow-700 px-2 py-1 rounded font-medium">
                        🔒 비공개
                      </span>
                    )}
                    {post.category && (
                      <span className="text-xs bg-purple-100 text-purple-700 px-2 py-1 rounded font-medium">
                        📁 {post.category}
                      </span>
                    )}
                  </div>
                  
                  <div className="text-sm text-gray-600 space-y-1.5">
                    <div className="flex items-center gap-2">
                      📅 <span className="font-medium">발행:</span> {new Date(post.date).toLocaleDateString('ko-KR', { year: 'numeric', month: 'long', day: 'numeric' })}
                    </div>
                    {post.updatedAt && (
                      <div className="flex items-center gap-2 text-orange-600">
                        ✏️ <span className="font-medium">수정:</span> {new Date(post.updatedAt).toLocaleDateString('ko-KR', { year: 'numeric', month: 'long', day: 'numeric' })}
                      </div>
                    )}
                    <div className="flex items-center gap-2 text-gray-400 text-xs">
                      🔗 <code className="bg-gray-100 px-2 py-0.5 rounded">{post.slug}</code>
                    </div>
                  </div>
                </div>

                <div className="flex flex-col gap-2 min-w-max">
                  <button
                    onClick={() => onEdit(post.slug)}
                    className="px-4 py-2 bg-blue-500 hover:bg-blue-600 text-white text-sm rounded-lg transition-colors font-medium shadow-sm hover:shadow-md"
                  >
                    ✏️ 수정
                  </button>
                  <button
                    onClick={() => handleDelete(post.slug, post.title)}
                    className="px-4 py-2 bg-red-500 hover:bg-red-600 text-white text-sm rounded-lg transition-colors font-medium shadow-sm hover:shadow-md"
                  >
                    🗑️ 삭제
                  </button>
                  <a
                    href={`/posts/${post.slug}`}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="px-4 py-2 bg-gray-100 hover:bg-gray-200 text-gray-700 text-sm rounded-lg transition-colors font-medium text-center shadow-sm hover:shadow-md"
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

