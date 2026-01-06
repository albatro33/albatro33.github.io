'use client';

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import CodeBlock, { CODE_THEMES, CodeTheme } from './CodeBlock';
import MarkdownGuideModal from './MarkdownGuideModal';

interface PostEditorProps {
  editSlug?: string;
  onSaveComplete?: () => void;
}

export default function PostEditor({ editSlug, onSaveComplete }: PostEditorProps) {
  const router = useRouter();
  const [isGuideOpen, setIsGuideOpen] = useState(false);
  const [isEditMode, setIsEditMode] = useState(false);
  const [formData, setFormData] = useState({
    title: '',
    slug: '',
    description: '',
    author: 'albatro33',
    tags: '',
    category: '',
    published: true,
    content: '',
  });
  const [isPreview, setIsPreview] = useState(false);
  const [isSaving, setIsSaving] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  // 수정 모드일 때 기존 포스트 데이터 로드
  useEffect(() => {
    if (editSlug) {
      loadPost(editSlug);
    }
  }, [editSlug]);

  const loadPost = async (slug: string) => {
    setIsLoading(true);
    try {
      const response = await fetch(`/api/posts/${slug}`);
      const data = await response.json();

      if (response.ok) {
        setFormData({
          title: data.metadata.title,
          slug: slug,
          description: data.metadata.description,
          author: data.metadata.author || 'albatro33',
          tags: data.metadata.tags?.join(', ') || '',
          category: data.metadata.category || '',
          published: data.metadata.published ?? true,
          content: data.content,
        });
        setIsEditMode(true);
      } else {
        alert('포스트를 불러올 수 없습니다.');
      }
    } catch (error) {
      console.error('포스트 로드 오류:', error);
      alert('포스트를 불러오는데 실패했습니다.');
    } finally {
      setIsLoading(false);
    }
  };

  // 코드 블럭 삽입 (테마 선택 포함)
  const insertCodeBlock = (theme: CodeTheme = 'oneDark') => {
    const codeTemplate = `\n\`\`\`typescript theme="${theme}"\n// 여기에 코드를 작성하세요\nconst example = "Hello, World!";\n\`\`\`\n`;
    setFormData({
      ...formData,
      content: formData.content + codeTemplate,
    });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSaving(true);

    try {
      const tags = formData.tags
        .split(',')
        .map((tag) => tag.trim())
        .filter((tag) => tag.length > 0);

      const url = isEditMode ? `/api/posts/${editSlug}` : '/api/posts';
      const method = isEditMode ? 'PUT' : 'POST';

      const response = await fetch(url, {
        method,
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          title: formData.title,
          slug: formData.slug,
          newSlug: formData.slug !== editSlug ? formData.slug : undefined,
          content: formData.content,
          metadata: {
            description: formData.description,
            author: formData.author,
            tags,
            category: formData.category || undefined,
            published: formData.published,
          },
        }),
      });

      const result = await response.json();

      if (response.ok) {
        alert(
          isEditMode
            ? `포스트가 수정되었습니다!\n파일: posts/${result.slug}.md`
            : `포스트가 생성되었습니다!\n파일: posts/${result.slug}.md`
        );
        
        if (!isEditMode) {
          // 새 포스트 생성 시에만 폼 초기화
          setFormData({
            title: '',
            slug: '',
            description: '',
            author: 'albatro33',
            tags: '',
            category: '',
            published: true,
            content: '',
          });
        }
        
        router.refresh();
        onSaveComplete?.();
      } else {
        alert(`오류: ${result.error}`);
      }
    } catch (error) {
      console.error('포스트 저장 오류:', error);
      alert('포스트 저장에 실패했습니다.');
    } finally {
      setIsSaving(false);
    }
  };

  if (isLoading) {
    return (
      <div className="max-w-7xl mx-auto px-4 py-8">
        <div className="bg-white rounded-lg shadow-lg p-8 text-center">
          <p className="text-gray-600">포스트 불러오는 중...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="max-w-7xl mx-auto px-4 py-8">
      <div className="bg-white rounded-lg shadow-lg p-8">
        <div className="flex items-center justify-between mb-6">
          <h1 className="text-3xl font-bold text-gray-900">
            {isEditMode ? '✏️ 포스트 수정' : '📝 새 포스트 작성'}
          </h1>
          {isEditMode && (
            <button
              onClick={() => {
                setIsEditMode(false);
                setFormData({
                  title: '',
                  slug: '',
                  description: '',
                  author: 'albatro33',
                  tags: '',
                  category: '',
                  published: true,
                  content: '',
                });
                onSaveComplete?.();
              }}
              className="text-sm text-gray-600 hover:text-gray-800"
            >
              ← 새 포스트 작성으로
            </button>
          )}
        </div>

        <form onSubmit={handleSubmit} className="space-y-6">
          {/* 기본 정보 */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                제목 *
              </label>
              <input
                type="text"
                required
                value={formData.title}
                onChange={(e) => setFormData({ ...formData, title: e.target.value })}
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                placeholder="포스트 제목"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                슬러그 (URL)
              </label>
              <input
                type="text"
                value={formData.slug}
                onChange={(e) => setFormData({ ...formData, slug: e.target.value })}
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                placeholder="자동 생성 (비워두면 제목에서 생성)"
              />
            </div>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              설명 *
            </label>
            <input
              type="text"
              required
              value={formData.description}
              onChange={(e) => setFormData({ ...formData, description: e.target.value })}
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              placeholder="포스트 설명"
            />
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                작성자
              </label>
              <input
                type="text"
                value={formData.author}
                onChange={(e) => setFormData({ ...formData, author: e.target.value })}
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                카테고리
              </label>
              <input
                type="text"
                value={formData.category}
                onChange={(e) => setFormData({ ...formData, category: e.target.value })}
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                placeholder="예: 개발, 튜토리얼"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                공개 여부
              </label>
              <select
                value={formData.published ? 'true' : 'false'}
                onChange={(e) =>
                  setFormData({ ...formData, published: e.target.value === 'true' })
                }
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              >
                <option value="true">공개</option>
                <option value="false">비공개</option>
              </select>
            </div>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              태그 (쉼표로 구분)
            </label>
            <input
              type="text"
              value={formData.tags}
              onChange={(e) => setFormData({ ...formData, tags: e.target.value })}
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              placeholder="예: Next.js, TypeScript, 블로그"
            />
          </div>

          {/* 코드 블럭 삽입 도구 */}
          <div className="bg-gray-50 rounded-lg p-4">
            <label className="block text-sm font-medium text-gray-700 mb-2">
              🎨 코드 블럭 삽입 (테마 선택)
            </label>
            <div className="flex flex-wrap gap-2">
              {Object.entries(CODE_THEMES).map(([key, { name }]) => (
                <button
                  key={key}
                  type="button"
                  onClick={() => insertCodeBlock(key as CodeTheme)}
                  className="px-3 py-1 bg-blue-500 hover:bg-blue-600 text-white text-sm rounded-md transition-colors"
                >
                  + {name}
                </button>
              ))}
            </div>
          </div>

          {/* 내용 편집 */}
          <div>
            <div className="flex justify-between items-center mb-2">
              <div className="flex items-center gap-2">
                <label className="block text-sm font-medium text-gray-700">
                  내용 (Markdown) *
                </label>
                <button
                  type="button"
                  onClick={() => setIsGuideOpen(true)}
                  className="text-blue-600 hover:text-blue-800 transition-colors"
                  title="Markdown 문법 가이드"
                >
                  <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                  </svg>
                </button>
              </div>
              <button
                type="button"
                onClick={() => setIsPreview(!isPreview)}
                className="text-sm text-blue-600 hover:text-blue-800"
              >
                {isPreview ? '편집 모드' : '미리보기'}
              </button>
            </div>

            {isPreview ? (
              <div className="w-full min-h-[400px] p-4 border border-gray-300 rounded-md prose max-w-none">
                <div dangerouslySetInnerHTML={{ __html: formData.content }} />
              </div>
            ) : (
              <textarea
                required
                value={formData.content}
                onChange={(e) => setFormData({ ...formData, content: e.target.value })}
                className="w-full min-h-[400px] px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 font-mono text-sm"
                placeholder="# 포스트 내용을 Markdown으로 작성하세요..."
              />
            )}
          </div>

          {/* 제출 버튼 */}
          <div className="flex gap-4">
            <button
              type="submit"
              disabled={isSaving}
              className="flex-1 bg-blue-600 hover:bg-blue-700 text-white font-semibold py-3 px-6 rounded-md transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {isSaving 
                ? '저장 중...' 
                : isEditMode 
                  ? '💾 수정사항 저장' 
                  : '📄 .md 파일로 저장'}
            </button>
            <button
              type="button"
              onClick={() => {
                if (confirm('작성 중인 내용이 초기화됩니다. 계속하시겠습니까?')) {
                  setFormData({
                    title: '',
                    slug: '',
                    description: '',
                    author: 'albatro33',
                    tags: '',
                    category: '',
                    published: true,
                    content: '',
                  });
                }
              }}
              className="px-6 py-3 border border-gray-300 rounded-md hover:bg-gray-50 transition-colors"
            >
              초기화
            </button>
          </div>
        </form>

        <div className="mt-8 p-4 bg-blue-50 rounded-lg">
          <h3 className="text-sm font-semibold text-blue-900 mb-2">💡 사용 팁</h3>
          <ul className="text-sm text-blue-800 space-y-1">
            <li>• 코드 블럭에 테마를 지정하려면: <code className="bg-blue-100 px-1 rounded">`theme="dracula"`</code></li>
            <li>• 저장하면 <code className="bg-blue-100 px-1 rounded">posts/</code> 폴더에 .md 파일이 생성됩니다</li>
            <li>• 빌드 시 자동으로 포함되어 배포됩니다</li>
            <li>• Markdown 문법이 헷갈리면 "내용" 옆의 ⓘ 아이콘을 클릭하세요!</li>
          </ul>
        </div>
      </div>

      {/* Markdown 가이드 모달 */}
      <MarkdownGuideModal isOpen={isGuideOpen} onClose={() => setIsGuideOpen(false)} />
    </div>
  );
}

