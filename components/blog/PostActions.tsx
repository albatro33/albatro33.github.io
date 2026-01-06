'use client';

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';

interface PostActionsProps {
  slug: string;
  title: string;
}

export default function PostActions({ slug, title }: PostActionsProps) {
  const router = useRouter();
  const [isLocal, setIsLocal] = useState(false);
  const [isDeleting, setIsDeleting] = useState(false);

  useEffect(() => {
    // 로컬 개발 환경인지 확인
    const local = 
      window.location.hostname === 'localhost' || 
      window.location.hostname === '127.0.0.1';
    
    setIsLocal(local);
  }, []);

  const handleDelete = async () => {
    if (!confirm(`"${title}" 포스트를 삭제하시겠습니까?\n\n⚠️ 이 작업은 되돌릴 수 없습니다!`)) {
      return;
    }

    setIsDeleting(true);

    try {
      const response = await fetch(`/api/posts/${slug}`, {
        method: 'DELETE',
      });

      const result = await response.json();

      if (response.ok) {
        alert('✅ 포스트가 삭제되었습니다!');
        router.push('/');
        router.refresh();
      } else {
        alert(`❌ 삭제 실패: ${result.error}`);
        setIsDeleting(false);
      }
    } catch (error) {
      console.error('포스트 삭제 오류:', error);
      alert('❌ 포스트 삭제에 실패했습니다.');
      setIsDeleting(false);
    }
  };

  // 로컬 환경이 아니면 아무것도 렌더링하지 않음
  if (!isLocal) {
    return null;
  }

  return (
    <div className="fixed bottom-8 right-8 flex flex-col gap-3 z-50">
      <Link
        href={`/write?edit=${slug}`}
        className="flex items-center gap-2 bg-blue-600 hover:bg-blue-700 text-white px-6 py-3 rounded-lg shadow-lg transition-colors font-medium"
      >
        ✏️ 수정
      </Link>
      <button
        onClick={handleDelete}
        disabled={isDeleting}
        className="flex items-center gap-2 bg-red-600 hover:bg-red-700 text-white px-6 py-3 rounded-lg shadow-lg transition-colors font-medium disabled:opacity-50 disabled:cursor-not-allowed"
      >
        {isDeleting ? '삭제 중...' : '🗑️ 삭제'}
      </button>
    </div>
  );
}

