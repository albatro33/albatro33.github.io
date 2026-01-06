'use client';

import { useState, useEffect } from 'react';
import PostEditor from '@/components/blog/PostEditor';
import PostManager from '@/components/blog/PostManager';
import Link from 'next/link';

export default function WritePage() {
  // ✅ 모든 Hook을 최상단에 선언
  const [isDevelopment, setIsDevelopment] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const [editingSlug, setEditingSlug] = useState<string | undefined>(undefined);
  const [refreshKey, setRefreshKey] = useState(0);
  const [activeTab, setActiveTab] = useState<'write' | 'manage'>('write');
  const [postCount, setPostCount] = useState(0);

  useEffect(() => {
    // 로컬 개발 환경인지 확인
    const isLocalhost = 
      window.location.hostname === 'localhost' || 
      window.location.hostname === '127.0.0.1';
    
    setIsDevelopment(isLocalhost);
    setIsLoading(false);

    // URL 쿼리 파라미터에서 edit 값 확인
    const urlParams = new URLSearchParams(window.location.search);
    const editSlugFromUrl = urlParams.get('edit');
    if (editSlugFromUrl) {
      setEditingSlug(editSlugFromUrl);
      setActiveTab('write');
    }
  }, []);

  // 로딩 중
  if (isLoading) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mx-auto"></div>
          <p className="mt-4 text-gray-600">로딩 중...</p>
        </div>
      </div>
    );
  }

  // Production 환경에서는 접근 불가
  if (!isDevelopment) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center max-w-md px-4">
          <h1 className="text-4xl font-bold text-gray-900 mb-4">🔒</h1>
          <h2 className="text-2xl font-bold text-gray-900 mb-2">접근 제한</h2>
          <p className="text-gray-600 mb-6">
            글쓰기 페이지는 로컬 개발 환경에서만 사용 가능합니다.
          </p>
          <div className="bg-gray-100 rounded-lg p-4 mb-6 text-left">
            <p className="text-sm text-gray-700 mb-2">로컬에서 접속하려면:</p>
            <code className="text-sm bg-white px-2 py-1 rounded block">
              npm run dev
            </code>
            <p className="text-xs text-gray-500 mt-2">
              → http://localhost:3000/write
            </p>
          </div>
          <Link
            href="/"
            className="inline-block bg-blue-600 text-white px-6 py-3 rounded-lg font-medium hover:bg-blue-700 transition-colors"
          >
            홈으로 돌아가기
          </Link>
        </div>
      </div>
    );
  }

  const handleEdit = (slug: string) => {
    setEditingSlug(slug);
    setActiveTab('write');
    // 에디터 섹션으로 스크롤
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleSaveComplete = () => {
    setEditingSlug(undefined);
    setRefreshKey((prev) => prev + 1);
    
    // URL에서 쿼리 파라미터 제거
    window.history.replaceState({}, '', '/write');
    
    // 저장 후 관리 탭으로 전환
    setTimeout(() => {
      setActiveTab('manage');
    }, 500);
  };

  const handleNewPost = () => {
    setEditingSlug(undefined);
    setActiveTab('write');
    
    // URL에서 쿼리 파라미터 제거
    window.history.replaceState({}, '', '/write');
    
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <div className="min-h-screen bg-gray-50">
      {/* 헤더 */}
      <div className="bg-white shadow-sm border-b sticky top-0 z-10">
        <div className="max-w-7xl mx-auto px-4 py-4">
          <div className="flex justify-between items-center">
            <h1 className="text-2xl font-bold text-gray-900">✍️ 글쓰기</h1>
            <Link
              href="/"
              className="text-blue-600 hover:text-blue-800 font-medium"
            >
              ← 블로그로 돌아가기
            </Link>
          </div>
        </div>
      </div>

      {/* 탭 네비게이션 */}
      <div className="bg-white border-b">
        <div className="max-w-7xl mx-auto px-4">
          <div className="flex gap-8">
            <button
              onClick={() => setActiveTab('write')}
              className={`py-4 px-2 font-medium border-b-2 transition-colors ${
                activeTab === 'write'
                  ? 'border-blue-600 text-blue-600'
                  : 'border-transparent text-gray-500 hover:text-gray-700'
              }`}
            >
              📝 {editingSlug ? '글 수정' : '새 글 작성'}
            </button>
            <button
              onClick={() => setActiveTab('manage')}
              className={`py-4 px-2 font-medium border-b-2 transition-colors ${
                activeTab === 'manage'
                  ? 'border-blue-600 text-blue-600'
                  : 'border-transparent text-gray-500 hover:text-gray-700'
              }`}
            >
              📚 글 관리 ({postCount})
            </button>
          </div>
        </div>
      </div>
      
      {/* 콘텐츠 영역 */}
      <div className="max-w-7xl mx-auto px-4 py-8">
        {activeTab === 'write' ? (
          <PostEditor editSlug={editingSlug} onSaveComplete={handleSaveComplete} />
        ) : (
          <div>
            <div className="mb-6 flex justify-between items-center">
              <h2 className="text-xl font-bold text-gray-900">기존 포스트 관리</h2>
              <button
                onClick={handleNewPost}
                className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition-colors font-medium"
              >
                + 새 글 작성
              </button>
            </div>
            <PostManager 
              key={refreshKey} 
              onEdit={handleEdit} 
              onPostCountChange={setPostCount}
            />
          </div>
        )}
      </div>
    </div>
  );
}

