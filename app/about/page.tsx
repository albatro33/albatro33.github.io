import { Metadata } from 'next';

export const metadata: Metadata = {
  title: '소개',
  description: 'albatro33 블로그에 대한 소개 페이지',
  openGraph: {
    title: '소개 | albatro33 blog',
    description: 'albatro33 블로그에 대한 소개 페이지',
    url: 'https://albatro33.github.io/about',
  },
  alternates: {
    canonical: 'https://albatro33.github.io/about',
  },
};

export default function AboutPage() {
  return (
    <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
      <div className="bg-white rounded-lg shadow-md p-8 md:p-12">
        <h1 className="text-4xl font-bold text-gray-900 mb-6">소개</h1>

        <div className="prose prose-lg max-w-none">
          <p className="text-xl text-gray-600 mb-8">
            안녕하세요! 이 블로그에 오신 것을 환영합니다.
          </p>

          <h2 className="text-2xl font-bold text-gray-900 mt-8 mb-4">블로그 소개</h2>
          <p className="text-gray-700 mb-4">
            이 블로그는 Next.js, TypeScript, Tailwind CSS를 사용하여 만들어졌으며,
            GitHub Pages를 통해 호스팅됩니다.
          </p>

          <h2 className="text-2xl font-bold text-gray-900 mt-8 mb-4">기술 스택</h2>
          <ul className="space-y-2 text-gray-700">
            <li>
              <strong>Next.js 15</strong> - React 기반 프레임워크 (Static Export)
            </li>
            <li>
              <strong>TypeScript</strong> - 타입 안정성
            </li>
            <li>
              <strong>Tailwind CSS</strong> - 유틸리티 기반 스타일링
            </li>
            <li>
              <strong>Redux Toolkit</strong> - 상태 관리
            </li>
            <li>
              <strong>Zod</strong> - 스키마 검증
            </li>
            <li>
              <strong>Markdown</strong> - 포스트 작성 (gray-matter, remark)
            </li>
          </ul>

          <h2 className="text-2xl font-bold text-gray-900 mt-8 mb-4">주요 기능</h2>
          <ul className="space-y-2 text-gray-700">
            <li>📝 Markdown 기반 블로그 포스트 작성</li>
            <li>🔍 포스트 검색 및 태그 필터링</li>
            <li>🎨 반응형 디자인</li>
            <li>⚡ 정적 사이트 생성 (Static Site Generation)</li>
            <li>🚀 GitHub Pages 배포</li>
          </ul>

          <h2 className="text-2xl font-bold text-gray-900 mt-8 mb-4">연락처</h2>
          <p className="text-gray-700">
            궁금한 점이나 협업 제안이 있으시면 언제든 연락 주세요!
          </p>
          <ul className="space-y-2 text-gray-700 mt-4">
            <li>
              <strong>GitHub:</strong>{' '}
              <a
                href="https://github.com/albatro33"
                target="_blank"
                rel="noopener noreferrer"
                className="text-blue-600 hover:underline"
              >
                github.com/albatro33
              </a>
            </li>
            <li>
              <strong>Email:</strong>{' '}
              <a
                href="mailto:example@email.com"
                className="text-blue-600 hover:underline"
              >
                example@email.com
              </a>
            </li>
          </ul>
        </div>
      </div>
    </div>
  );
}

