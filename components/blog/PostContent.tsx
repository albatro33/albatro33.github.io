'use client';

import { useEffect, useRef } from 'react';
import CodeBlock, { CodeTheme } from './CodeBlock';
import { createRoot } from 'react-dom/client';

interface PostContentProps {
  content: string;
}

export default function PostContent({ content }: PostContentProps) {
  const contentRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!contentRef.current) return;

    // 모든 <pre><code> 블록 찾기
    const preElements = contentRef.current.querySelectorAll('pre code');

    preElements.forEach((codeElement) => {
      const preElement = codeElement.parentElement;
      if (!preElement) return;

      // 언어 감지 (class="language-javascript" 또는 "language-javascript theme='dracula'" 형식)
      const className = codeElement.className;
      const languageMatch = className.match(/language-(\w+)/);
      const language = languageMatch ? languageMatch[1] : 'text';

      // 테마 감지 (theme="dracula" 형식)
      const themeMatch = className.match(/theme[="'](\w+)[="']/);
      const theme = (themeMatch ? themeMatch[1] : 'oneDark') as CodeTheme;

      // 코드 내용 가져오기
      const code = codeElement.textContent || '';

      // React 컴포넌트로 교체
      const wrapper = document.createElement('div');
      preElement.replaceWith(wrapper);

      const root = createRoot(wrapper);
      root.render(<CodeBlock code={code} language={language} theme={theme} />);
    });

    // Cleanup은 필요 없음 (컴포넌트 언마운트 시 DOM이 제거됨)
  }, [content]);

  return (
    <div
      ref={contentRef}
      className="prose prose-lg max-w-none
        prose-headings:font-bold prose-headings:text-gray-900
        prose-h1:text-4xl prose-h2:text-3xl prose-h3:text-2xl
        prose-p:text-gray-700 prose-p:leading-relaxed
        prose-a:text-blue-600 prose-a:no-underline hover:prose-a:underline
        prose-strong:text-gray-900 prose-strong:font-bold
        prose-code:text-pink-600 prose-code:bg-gray-100 prose-code:px-1 prose-code:py-0.5 prose-code:rounded prose-code:before:content-[''] prose-code:after:content-['']
        prose-img:rounded-lg prose-img:shadow-lg
        prose-blockquote:border-l-4 prose-blockquote:border-blue-500 prose-blockquote:pl-4 prose-blockquote:italic
        prose-ul:list-disc prose-ol:list-decimal
        prose-li:text-gray-700"
      dangerouslySetInnerHTML={{ __html: content }}
    />
  );
}

