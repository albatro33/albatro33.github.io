'use client';

import Link from 'next/link';
import { useEffect, useState } from 'react';

export default function Header() {
  const [isClient, setIsClient] = useState(false);
  const [isLocal, setIsLocal] = useState(false);

  useEffect(() => {
    setIsClient(true);
    // 로컬 개발 환경인지 확인 (localhost 또는 127.0.0.1)
    const local = 
      window.location.hostname === 'localhost' || 
      window.location.hostname === '127.0.0.1';
    
    setIsLocal(local);
  }, []);

  return (
    <header className="bg-white shadow-sm sticky top-0 z-50">
      <nav className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          <Link href="/" className="flex items-center">
            <h1 className="text-2xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
              albatro33 blog
            </h1>
          </Link>

          <div className="flex items-center gap-6">
            <Link
              href="/"
              className="text-gray-700 hover:text-blue-600 font-medium transition-colors"
            >
              홈
            </Link>
            <Link
              href="/about"
              className="text-gray-700 hover:text-blue-600 font-medium transition-colors"
            >
              소개
            </Link>
            {/* 글쓰기 버튼 - 클라이언트에서만 렌더링 & 로컬에서만 표시 */}
            {isClient && isLocal && (
              <Link
                href="/write"
                className="text-gray-700 hover:text-purple-600 font-medium transition-colors"
              >
                ✍️ 글쓰기
              </Link>
            )}
            <a
              href="https://github.com/albatro33"
              target="_blank"
              rel="noopener noreferrer"
              className="text-gray-700 hover:text-blue-600 font-medium transition-colors"
            >
              GitHub
            </a>
          </div>
        </div>
      </nav>
    </header>
  );
}

