'use client';

import { useState } from 'react';

interface MarkdownGuideModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export default function MarkdownGuideModal({ isOpen, onClose }: MarkdownGuideModalProps) {
  const [activeTab, setActiveTab] = useState<'basic' | 'advanced'>('basic');

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
      <div className="bg-white rounded-lg shadow-2xl max-w-4xl w-full max-h-[90vh] overflow-hidden">
        {/* 헤더 */}
        <div className="bg-gradient-to-r from-blue-600 to-purple-600 text-white p-6">
          <div className="flex justify-between items-center">
            <h2 className="text-2xl font-bold">📖 Markdown 문법 가이드</h2>
            <button
              onClick={onClose}
              className="text-white hover:text-gray-200 transition-colors"
            >
              <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
              </svg>
            </button>
          </div>
          <p className="text-blue-100 mt-2">빠르게 참고할 수 있는 Markdown 문법 모음</p>
        </div>

        {/* 탭 */}
        <div className="border-b border-gray-200">
          <div className="flex">
            <button
              onClick={() => setActiveTab('basic')}
              className={`px-6 py-3 font-medium transition-colors ${
                activeTab === 'basic'
                  ? 'text-blue-600 border-b-2 border-blue-600'
                  : 'text-gray-500 hover:text-gray-700'
              }`}
            >
              기본 문법
            </button>
            <button
              onClick={() => setActiveTab('advanced')}
              className={`px-6 py-3 font-medium transition-colors ${
                activeTab === 'advanced'
                  ? 'text-blue-600 border-b-2 border-blue-600'
                  : 'text-gray-500 hover:text-gray-700'
              }`}
            >
              고급 문법
            </button>
          </div>
        </div>

        {/* 내용 */}
        <div className="p-6 overflow-y-auto max-h-[calc(90vh-200px)]">
          {activeTab === 'basic' ? (
            <div className="space-y-6">
              {/* 제목 */}
              <div>
                <h3 className="text-lg font-bold text-gray-900 mb-2">📌 제목 (Headings)</h3>
                <div className="bg-gray-50 rounded-lg p-4 space-y-2">
                  <code className="block text-sm"># 제목 1 (가장 큰 제목)</code>
                  <code className="block text-sm">## 제목 2</code>
                  <code className="block text-sm">### 제목 3</code>
                  <code className="block text-sm">#### 제목 4</code>
                </div>
              </div>

              {/* 텍스트 스타일 */}
              <div>
                <h3 className="text-lg font-bold text-gray-900 mb-2">✨ 텍스트 스타일</h3>
                <div className="bg-gray-50 rounded-lg p-4 space-y-2">
                  <code className="block text-sm">**굵은 글씨** 또는 __굵은 글씨__</code>
                  <code className="block text-sm">*기울임* 또는 _기울임_</code>
                  <code className="block text-sm">~~취소선~~</code>
                  <code className="block text-sm">`인라인 코드`</code>
                </div>
              </div>

              {/* 목록 */}
              <div>
                <h3 className="text-lg font-bold text-gray-900 mb-2">📝 목록 (Lists)</h3>
                <div className="bg-gray-50 rounded-lg p-4 space-y-3">
                  <div>
                    <div className="text-sm font-semibold mb-1">순서 없는 목록:</div>
                    <code className="block text-sm">- 항목 1</code>
                    <code className="block text-sm">- 항목 2</code>
                    <code className="block text-sm">  - 하위 항목</code>
                  </div>
                  <div>
                    <div className="text-sm font-semibold mb-1">순서 있는 목록:</div>
                    <code className="block text-sm">1. 첫 번째</code>
                    <code className="block text-sm">2. 두 번째</code>
                    <code className="block text-sm">3. 세 번째</code>
                  </div>
                </div>
              </div>

              {/* 링크 & 이미지 */}
              <div>
                <h3 className="text-lg font-bold text-gray-900 mb-2">🔗 링크 & 이미지</h3>
                <div className="bg-gray-50 rounded-lg p-4 space-y-2">
                  <code className="block text-sm">[링크 텍스트](https://example.com)</code>
                  <code className="block text-sm">![이미지 설명](이미지_URL)</code>
                </div>
              </div>

              {/* 인용구 */}
              <div>
                <h3 className="text-lg font-bold text-gray-900 mb-2">💬 인용구 (Blockquote)</h3>
                <div className="bg-gray-50 rounded-lg p-4">
                  <code className="block text-sm">&gt; 이것은 인용구입니다.</code>
                  <code className="block text-sm">&gt; 두 번째 줄</code>
                </div>
              </div>

              {/* 구분선 */}
              <div>
                <h3 className="text-lg font-bold text-gray-900 mb-2">➖ 구분선 (Horizontal Rule)</h3>
                <div className="bg-gray-50 rounded-lg p-4 space-y-2">
                  <code className="block text-sm">---</code>
                  <code className="block text-sm">또는</code>
                  <code className="block text-sm">***</code>
                </div>
              </div>
            </div>
          ) : (
            <div className="space-y-6">
              {/* 코드 블럭 */}
              <div>
                <h3 className="text-lg font-bold text-gray-900 mb-2">💻 코드 블럭</h3>
                <div className="bg-gray-50 rounded-lg p-4 space-y-3">
                  <div>
                    <div className="text-sm font-semibold mb-1">기본 코드 블럭:</div>
                    <pre className="bg-gray-800 text-gray-100 p-3 rounded text-sm overflow-x-auto">
{`\`\`\`
코드 내용
\`\`\``}
                    </pre>
                  </div>
                  <div>
                    <div className="text-sm font-semibold mb-1">언어 지정 (하이라이팅):</div>
                    <pre className="bg-gray-800 text-gray-100 p-3 rounded text-sm overflow-x-auto">
{`\`\`\`javascript
const hello = "world";
\`\`\``}
                    </pre>
                  </div>
                  <div>
                    <div className="text-sm font-semibold mb-1">테마 지정:</div>
                    <pre className="bg-gray-800 text-gray-100 p-3 rounded text-sm overflow-x-auto">
{`\`\`\`typescript theme="dracula"
const hello = "world";
\`\`\``}
                    </pre>
                  </div>
                </div>
              </div>

              {/* 테이블 */}
              <div>
                <h3 className="text-lg font-bold text-gray-900 mb-2">📊 테이블 (Table)</h3>
                <div className="bg-gray-50 rounded-lg p-4">
                  <pre className="text-sm overflow-x-auto">
{`| 헤더1 | 헤더2 | 헤더3 |
|-------|-------|-------|
| 내용1 | 내용2 | 내용3 |
| 내용4 | 내용5 | 내용6 |`}
                  </pre>
                </div>
              </div>

              {/* 체크박스 */}
              <div>
                <h3 className="text-lg font-bold text-gray-900 mb-2">☑️ 체크박스 (Task List)</h3>
                <div className="bg-gray-50 rounded-lg p-4 space-y-2">
                  <code className="block text-sm">- [ ] 완료 안 됨</code>
                  <code className="block text-sm">- [x] 완료됨</code>
                </div>
              </div>

              {/* 이스케이프 */}
              <div>
                <h3 className="text-lg font-bold text-gray-900 mb-2">🔤 특수 문자 이스케이프</h3>
                <div className="bg-gray-50 rounded-lg p-4">
                  <p className="text-sm mb-2">특수 문자를 그대로 표시하려면 앞에 \ 를 붙입니다:</p>
                  <code className="block text-sm">\* 별표를 그대로 표시</code>
                  <code className="block text-sm">\# 해시를 그대로 표시</code>
                </div>
              </div>

              {/* HTML */}
              <div>
                <h3 className="text-lg font-bold text-gray-900 mb-2">🌐 HTML 태그 사용</h3>
                <div className="bg-gray-50 rounded-lg p-4">
                  <p className="text-sm mb-2">Markdown 내에서 HTML 태그를 직접 사용할 수 있습니다:</p>
                  <code className="block text-sm">&lt;div class="custom"&gt;내용&lt;/div&gt;</code>
                  <code className="block text-sm">&lt;span style="color: red;"&gt;빨간 텍스트&lt;/span&gt;</code>
                </div>
              </div>
            </div>
          )}
        </div>

        {/* 푸터 */}
        <div className="border-t border-gray-200 p-4 bg-gray-50">
          <div className="flex justify-between items-center">
            <p className="text-sm text-gray-600">
              💡 팁: Admin 페이지의 코드 테마 버튼을 클릭하면 코드 블럭이 자동으로 삽입됩니다!
            </p>
            <button
              onClick={onClose}
              className="px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded-md transition-colors"
            >
              닫기
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

