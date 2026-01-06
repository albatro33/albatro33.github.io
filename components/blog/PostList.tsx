'use client';

import { useMemo } from 'react';
import PostCard from './PostCard';
import { PostMetadata } from '@/types/post';
import { useAppDispatch, useAppSelector } from '@/lib/hooks';
import { setSearchQuery, setSelectedTag, setSelectedCategory, clearFilters } from '@/lib/features/blogSlice';

interface PostListProps {
  posts: (PostMetadata & { slug: string })[];
  tags: string[];
  categories: string[];
}

export default function PostList({ posts, tags, categories }: PostListProps) {
  // Redux 상태 사용
  const dispatch = useAppDispatch();
  const searchQuery = useAppSelector((state) => state.blog.searchQuery);
  const selectedTag = useAppSelector((state) => state.blog.selectedTag);
  const selectedCategory = useAppSelector((state) => state.blog.selectedCategory);

  // 필터링된 포스트
  const filteredPosts = useMemo(() => {
    let filtered = posts;

    // 검색어 필터링
    if (searchQuery) {
      filtered = filtered.filter(
        (post) =>
          post.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
          post.description.toLowerCase().includes(searchQuery.toLowerCase()) ||
          post.tags.some((tag) =>
            tag.toLowerCase().includes(searchQuery.toLowerCase())
          )
      );
    }

    // 태그 필터링
    if (selectedTag) {
      filtered = filtered.filter((post) => post.tags.includes(selectedTag));
    }

    // 카테고리 필터링
    if (selectedCategory) {
      filtered = filtered.filter((post) => post.category === selectedCategory);
    }

    return filtered;
  }, [posts, searchQuery, selectedTag, selectedCategory]);

  return (
    <div className="space-y-8">
      {/* 검색 및 필터 */}
      <div className="space-y-4">
        {/* 검색창 */}
        <input
          type="text"
          placeholder="포스트 검색..."
          value={searchQuery}
          onChange={(e) => dispatch(setSearchQuery(e.target.value))}
          className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
        />

        {/* 카테고리 필터 */}
        {categories.length > 0 && (
          <div>
            <h3 className="text-sm font-semibold text-gray-700 mb-2">카테고리</h3>
            <div className="flex flex-wrap gap-2">
              <button
                onClick={() => dispatch(setSelectedCategory(null))}
                className={`px-4 py-2 rounded-lg text-sm font-medium transition-colors ${
                  selectedCategory === null
                    ? 'bg-purple-600 text-white'
                    : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                }`}
              >
                전체
              </button>
              {categories.map((category) => (
                <button
                  key={category}
                  onClick={() => dispatch(setSelectedCategory(category))}
                  className={`px-4 py-2 rounded-lg text-sm font-medium transition-colors ${
                    selectedCategory === category
                      ? 'bg-purple-600 text-white'
                      : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                  }`}
                >
                  📁 {category}
                </button>
              ))}
            </div>
          </div>
        )}

        {/* 태그 필터 */}
        {tags.length > 0 && (
          <div>
            <h3 className="text-sm font-semibold text-gray-700 mb-2">태그</h3>
            <div className="flex flex-wrap gap-2">
              <button
                onClick={() => dispatch(setSelectedTag(null))}
                className={`px-4 py-2 rounded-full text-sm font-medium transition-colors ${
                  selectedTag === null
                    ? 'bg-blue-600 text-white'
                    : 'bg-gray-200 text-gray-700 hover:bg-gray-300'
                }`}
              >
                전체
              </button>
              {tags.map((tag) => (
                <button
                  key={tag}
                  onClick={() => dispatch(setSelectedTag(tag))}
                  className={`px-4 py-2 rounded-full text-sm font-medium transition-colors ${
                    selectedTag === tag
                      ? 'bg-blue-600 text-white'
                      : 'bg-gray-200 text-gray-700 hover:bg-gray-300'
                  }`}
                >
                  #{tag}
                </button>
              ))}
            </div>
          </div>
        )}

        {/* 필터 초기화 버튼 */}
        {(searchQuery || selectedTag || selectedCategory) && (
          <button
            onClick={() => dispatch(clearFilters())}
            className="text-sm text-gray-600 hover:text-gray-800 underline"
          >
            모든 필터 초기화
          </button>
        )}
      </div>

      {/* 포스트 목록 */}
      {filteredPosts.length > 0 ? (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredPosts.map((post) => (
            <PostCard key={post.slug} post={post} />
          ))}
        </div>
      ) : (
        <div className="text-center py-12">
          <p className="text-gray-500 text-lg">포스트가 없습니다.</p>
        </div>
      )}

      {/* 결과 개수 */}
      <div className="text-center text-gray-600">
        {filteredPosts.length}개의 포스트
      </div>
    </div>
  );
}

