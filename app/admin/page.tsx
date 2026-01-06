'use client';

import { useState, useEffect } from 'react';
import PostEditor from '@/components/blog/PostEditor';
import PostManager from '@/components/blog/PostManager';
import Link from 'next/link';

export default function AdminPage() {
  const [isClient, setIsClient] = useState(false);

  useEffect(() => {
    setIsClient(true);
  }, []);

  // 빌드 시에는 간단한 메시지만 표시
  if (!isClient) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <h1 className="text-2xl font-bold text-gray-900 mb-2">⚙️ Admin</h1>
          <p className="text-gray-600">로컬 개발 서버에서만 사용 가능합니다.</p>
          <p className="text-sm text-gray-500 mt-2">npm run dev</p>
        </div>
      </div>
    );
  }
  const [editingSlug, setEditingSlug] = useState<string | undefined>(undefined);
  const [refreshKey, setRefreshKey] = useState(0);

  const handleEdit = (slug: string) => {
    setEditingSlug(slug);
    // 에디터 섹션으로 스크롤
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleSaveComplete = () => {
    setEditingSlug(undefined);
    setRefreshKey((prev) => prev + 1);
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="bg-white shadow-sm border-b sticky top-0 z-10">
        <div className="max-w-7xl mx-auto px-4 py-4">
          <div className="flex justify-between items-center">
            <h1 className="text-2xl font-bold text-gray-900">⚙️ Admin</h1>
            <Link
              href="/"
              className="text-blue-600 hover:text-blue-800 font-medium"
            >
              ← 블로그로 돌아가기
            </Link>
          </div>
        </div>
      </div>
      
      {/* 포스트 작성/수정 에디터 */}
      <PostEditor editSlug={editingSlug} onSaveComplete={handleSaveComplete} />
      
      {/* 기존 포스트 관리 */}
      <div className="max-w-7xl mx-auto px-4 py-8">
        <PostManager key={refreshKey} onEdit={handleEdit} />
      </div>
    </div>
  );
}

