'use client';

import { useState } from 'react';
import PostEditor from '@/components/blog/PostEditor';
import PostManager from '@/components/blog/PostManager';
import Link from 'next/link';

export default function AdminPage() {
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

