'use client';

import { useState } from 'react';
import { Prism as SyntaxHighlighter } from 'react-syntax-highlighter';
import {
  oneDark,
  oneLight,
  vscDarkPlus,
  dracula,
  atomDark,
  tomorrow,
  ghcolors,
  nightOwl,
  materialDark,
  nord,
} from 'react-syntax-highlighter/dist/esm/styles/prism';

// 사용 가능한 테마 목록
export const CODE_THEMES = {
  oneDark: { name: 'One Dark', style: oneDark },
  oneLight: { name: 'One Light', style: oneLight },
  vscDarkPlus: { name: 'VS Code Dark+', style: vscDarkPlus },
  dracula: { name: 'Dracula', style: dracula },
  atomDark: { name: 'Atom Dark', style: atomDark },
  tomorrow: { name: 'Tomorrow', style: tomorrow },
  ghcolors: { name: 'GitHub', style: ghcolors },
  nightOwl: { name: 'Night Owl', style: nightOwl },
  materialDark: { name: 'Material Dark', style: materialDark },
  nord: { name: 'Nord', style: nord },
} as const;

export type CodeTheme = keyof typeof CODE_THEMES;

interface CodeBlockProps {
  code: string;
  language: string;
  theme?: CodeTheme;
  showLineNumbers?: boolean;
}

export default function CodeBlock({
  code,
  language,
  theme = 'oneDark',
  showLineNumbers = true,
}: CodeBlockProps) {
  const [copied, setCopied] = useState(false);
  const selectedTheme = CODE_THEMES[theme]?.style || oneDark;

  const handleCopy = async () => {
    try {
      await navigator.clipboard.writeText(code);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch (err) {
      console.error('복사 실패:', err);
    }
  };

  return (
    <div className="relative group my-4">
      {/* 상단 바 - 언어 표시 & 복사 버튼 */}
      <div className="absolute top-0 left-0 right-0 flex justify-between items-center px-4 py-2 bg-gray-800 rounded-t-lg z-10">
        <span className="text-xs font-semibold text-gray-300">
          {language}
        </span>
        <button
          onClick={handleCopy}
          className="flex items-center gap-1 px-2 py-1 text-xs bg-gray-700 hover:bg-gray-600 text-gray-200 rounded transition-colors"
          title="코드 복사"
        >
          {copied ? (
            <>
              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
              </svg>
              복사됨!
            </>
          ) : (
            <>
              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 16H6a2 2 0 01-2-2V6a2 2 0 012-2h8a2 2 0 012 2v2m-6 12h8a2 2 0 002-2v-8a2 2 0 00-2-2h-8a2 2 0 00-2 2v8a2 2 0 002 2z" />
              </svg>
              복사
            </>
          )}
        </button>
      </div>

      {/* 코드 블록 */}
      <SyntaxHighlighter
        language={language}
        style={selectedTheme}
        showLineNumbers={showLineNumbers}
        wrapLines={true}
        customStyle={{
          margin: 0,
          borderRadius: '0.5rem',
          fontSize: '0.9rem',
          padding: '1.5rem',
          paddingTop: '3rem', // 상단 바를 위한 공간
        }}
        lineNumberStyle={{
          minWidth: '3em',
          paddingRight: '1em',
          color: '#6b7280',
          userSelect: 'none',
        }}
      >
        {code}
      </SyntaxHighlighter>

      {/* 테마 표시 (우측 하단) */}
      <div className="absolute bottom-2 right-2 px-2 py-1 text-xs text-gray-400 bg-gray-900 bg-opacity-70 rounded">
        {CODE_THEMES[theme]?.name || theme}
      </div>
    </div>
  );
}

