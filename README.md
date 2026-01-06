# albatro33 blog

Next.js, TypeScript, Tailwind CSS, Redux Toolkit, Zod를 사용한 정적 블로그입니다.
Markdown으로 포스트를 작성하고 GitHub Pages에 배포됩니다.

**GitHub 저장소**: [https://github.com/albatro33/albatro33.github.io](https://github.com/albatro33/albatro33.github.io)  
**배포 URL**: [https://albatro33.github.io](https://albatro33.github.io)

## 🚀 주요 기능

### 📝 콘텐츠 관리
- ✍️ **글쓰기 페이지** - 로컬에서 포스트 작성/수정/삭제
- 📝 **포스트 관리** - 기존 포스트 목록 확인 및 관리
- 📅 **날짜 관리** - 최초 발행일 + 최종 수정일 자동 관리
- 🔍 **검색 및 필터링** - 제목, 설명, 태그로 실시간 검색
- 🏷️ **태그 시스템** - 태그별 포스트 분류
- 📁 **카테고리 필터** - 카테고리별 포스트 조회 (자동 생성)

### 🎨 UI/UX
- 💻 **코드 하이라이팅** - 10가지 테마로 코드 블록 표시
- 🎨 **코드블럭별 테마** - 각 코드블럭마다 다른 테마 설정 가능
- 📋 **코드 복사** - 클립보드로 코드 복사 버튼
- 📖 **Markdown 가이드** - 모달로 문법 쉽게 확인
- 📱 **반응형 디자인** - 모든 기기에서 최적화
- ⚡ **정적 사이트 생성** - 빠른 로딩 속도

### 🔍 SEO 최적화
- 🎯 **메타데이터** - Open Graph, Twitter Card
- 🗺️ **자동 사이트맵** - 모든 포스트 자동 포함
- 🤖 **Robots.txt** - 검색 엔진 크롤링 최적화
- 📊 **구조화된 데이터** - Schema.org JSON-LD
- 🔗 **Canonical URL** - 중복 콘텐츠 방지
- 📈 **Google AdSense** - 광고 준비 완료

### 🛡️ 기타
- 🔐 **Zod 검증** - 타입 안전한 메타데이터
- 🚀 **GitHub Actions** - 자동 배포

## 📚 기술 스택

- **Next.js 15** - React 프레임워크 (Static Export)
- **TypeScript** - 타입 안정성
- **Tailwind CSS** - 유틸리티 기반 CSS
- **Redux Toolkit** - 상태 관리 (검색, 필터)
- **Zod** - 스키마 검증
- **gray-matter** - Markdown front matter 파싱
- **remark** - Markdown을 HTML로 변환
- **date-fns** - 날짜 포맷팅

## 📁 프로젝트 구조

```
blog/
├── app/                          # Next.js App Router
│   ├── posts/[slug]/            # 포스트 상세 페이지
│   ├── about/                   # 소개 페이지
│   ├── layout.tsx               # 루트 레이아웃
│   └── page.tsx                 # 홈 페이지
├── components/blog/             # 블로그 컴포넌트
│   ├── PostCard.tsx            # 포스트 카드
│   ├── PostList.tsx            # 포스트 목록 (검색/필터)
│   ├── Header.tsx              # 헤더
│   └── Footer.tsx              # 푸터
├── lib/
│   ├── blog/
│   │   └── markdown.ts         # Markdown 파싱 유틸리티
│   ├── features/
│   │   └── blogSlice.ts        # Redux 상태 관리
│   ├── store.ts                # Redux store
│   └── providers.tsx           # Redux Provider
├── posts/                       # 블로그 포스트 (Markdown)
│   ├── welcome-to-my-blog.md
│   ├── nextjs-static-export.md
│   └── ...
├── types/
│   └── post.ts                 # 포스트 타입 정의 (Zod)
├── .github/workflows/
│   └── deploy.yml              # GitHub Actions 배포
└── next.config.ts              # Next.js 설정 (Static Export)
```

## 🎯 시작하기

### 1. 저장소 클론

```bash
git clone https://github.com/albatro33/albatro33.github.io.git
cd albatro33.github.io
```

### 2. 의존성 설치

```bash
npm install
```

### 3. 개발 서버 실행

```bash
npm run dev
```

브라우저에서 [http://localhost:3000](http://localhost:3000) 열기

### 4. 빌드

```bash
npm run build
```

빌드된 파일은 `out/` 디렉터리에 생성됩니다.

## ✍️ 블로그 포스트 작성 및 관리

### Admin 페이지 (로컬 전용)

1. **로컬 개발 서버 실행**
```bash
npm run dev
```

2. **Admin 페이지 접속**
   - 브라우저에서 `http://localhost:3000/admin` 접속
   - 또는 헤더의 "✍️ 글쓰기" 클릭

### 📝 새 포스트 작성

1. **기본 정보 입력**
   - 제목, 설명, 카테고리, 태그 등
   
2. **내용 작성**
   - Markdown으로 작성
   - ⓘ 아이콘 클릭 → Markdown 문법 가이드
   - 코드 블럭 테마 버튼 클릭 → 자동 삽입
   
3. **저장**
   - "📄 .md 파일로 저장" 클릭
   - `posts/` 폴더에 `.md` 파일 생성
   - 즉시 블로그에 표시!

### ✏️ 기존 포스트 수정

1. **Admin 페이지 스크롤 다운**
   - "📚 기존 포스트 관리" 섹션 확인
   
2. **수정할 포스트 선택**
   - "✏️ 수정" 버튼 클릭
   - 에디터에 기존 내용 로드됨
   
3. **내용 수정 후 저장**
   - "💾 수정사항 저장" 클릭
   - **최종 수정일 자동 추가**
   - 기존 `.md` 파일 업데이트

### 🗑️ 포스트 삭제

1. **Admin 페이지**에서 삭제할 포스트 찾기
2. **"🗑️ 삭제"** 버튼 클릭
3. 확인 후 `.md` 파일 삭제

### 방법 2: 수동으로 Markdown 파일 생성

`posts/my-new-post.md` 파일을 생성하고 다음 형식으로 작성:

```markdown
---
title: "포스트 제목"
date: "2026-01-06"
description: "포스트 설명"
author: "albatro33"
tags: ["Next.js", "TypeScript"]
category: "개발"
published: true
---

# 포스트 내용

여기에 Markdown 내용을 작성합니다...

## 코드 블럭 (테마 지정)

\```typescript theme="dracula"
const hello = "world";
\```
```

### 3. Front Matter 필드 설명

| 필드 | 타입 | 필수 | 설명 |
|------|------|------|------|
| `title` | string | ✅ | 포스트 제목 |
| `date` | string | ✅ | 최초 발행일 (YYYY-MM-DD) |
| `updatedAt` | string | | 최종 수정일 (YYYY-MM-DD) - 자동 생성 |
| `description` | string | ✅ | 포스트 설명 |
| `author` | string | | 작성자 (기본값: "albatro33") |
| `tags` | string[] | | 태그 배열 |
| `category` | string | | 카테고리 (자동으로 필터에 추가) |
| `coverImage` | string | | 커버 이미지 URL |
| `published` | boolean | | 공개 여부 (기본값: true) |

### 4. 날짜 관리 방식

- **최초 발행일 (`date`)**: 포스트 작성 시 자동 생성, 수정 시에도 유지
- **최종 수정일 (`updatedAt`)**: 포스트 수정 시 자동 생성/업데이트
- **표시 방식**:
  - 메인 페이지 카드: 수정일이 있으면 수정일 표시 (✏️), 없으면 발행일
  - 포스트 상세: 발행일 + 수정일 (있는 경우만)

### 4. 자동 반영

포스트를 작성하면 자동으로 블로그에 표시됩니다!

## 💻 코드 하이라이팅

### 사용 가능한 테마

- One Dark (기본)
- One Light  
- VS Code Dark+
- Dracula
- Atom Dark
- Tomorrow
- GitHub
- Night Owl
- Material Dark
- Nord

### 코드 블럭 작성법

#### Admin 페이지에서 작성

코드 테마 버튼을 클릭하면 자동으로 삽입됩니다:

```markdown
\```typescript theme="dracula"
const hello = "world";
\```
```

#### 수동으로 작성

코드 블럭에 `theme="테마명"` 속성을 추가:

```markdown
\```javascript theme="vscDarkPlus"
console.log('Hello, World!');
\```

\```python theme="nightOwl"
print("Hello, World!")
\```
```

### 복사 기능

모든 코드 블럭에 "복사" 버튼이 자동으로 표시됩니다.  
클릭하면 코드가 클립보드에 복사됩니다!

## 🚀 GitHub Pages 배포

### 1. GitHub Pages 설정

1. 저장소: [https://github.com/albatro33/albatro33.github.io](https://github.com/albatro33/albatro33.github.io)
2. Settings → Pages
3. Source: **GitHub Actions** 선택

### 2. 코드 푸시

```bash
git add .
git commit -m "Update blog"
git push
```

### 3. 자동 배포

- `main` 브랜치에 push하면 자동으로 배포됩니다
- GitHub Actions에서 배포 진행 상황 확인 가능
- 배포 완료 후 [https://albatro33.github.io](https://albatro33.github.io)에서 확인

## 🎨 커스터마이징

### 블로그 정보 수정

1. **사이트 제목**: `app/layout.tsx`의 metadata 수정
2. **헤더**: `components/blog/Header.tsx` 수정
3. **푸터**: `components/blog/Footer.tsx` 수정
4. **소개 페이지**: `app/about/page.tsx` 수정

### 스타일 커스터마이징

Tailwind CSS를 사용하므로 `tailwind.config.js`에서 테마를 커스터마이징할 수 있습니다.

```javascript
module.exports = {
  theme: {
    extend: {
      colors: {
        primary: '#your-color',
      },
    },
  },
};
```

## 📖 주요 기능 설명

### Markdown 파싱

`lib/blog/markdown.ts`에서 Markdown 파일을 읽고 파싱합니다:

- `getAllPosts()` - 모든 포스트 목록
- `getPostBySlug(slug)` - 특정 포스트 내용
- `getAllTags()` - 모든 태그 목록
- `getPostsByTag(tag)` - 태그별 포스트 필터링

### Zod 검증

`types/post.ts`에서 포스트 메타데이터를 검증합니다:

```typescript
const PostMetadataSchema = z.object({
  title: z.string().min(1),
  date: z.string(),
  description: z.string().min(1),
  // ...
});
```

### Redux 상태 관리

`lib/features/blogSlice.ts`에서 검색 및 필터 상태를 관리합니다.

## 🔧 개발 팁

### 로컬에서 정적 빌드 테스트

```bash
npm run build
npx serve out
```

### Linting

```bash
npm run lint
```

### 타입 체크

```bash
npx tsc --noEmit
```

## 📝 TODO

- [ ] 댓글 시스템 추가 (utterances, giscus)
- [ ] RSS 피드 생성
- [ ] 포스트 검색 개선 (Algolia, Fuse.js)
- [ ] 다크 모드 토글
- [ ] 조회수 추적
- [ ] SEO 최적화 (sitemap, robots.txt)
- [ ] 소셜 공유 버튼

## 🤝 기여

버그 리포트, 기능 제안, Pull Request는 언제나 환영합니다!

## 📄 라이선스

MIT License

## 📚 참고 자료

- [Next.js 공식 문서](https://nextjs.org/docs)
- [Next.js Static Exports](https://nextjs.org/docs/app/building-your-application/deploying/static-exports)
- [GitHub Pages 문서](https://docs.github.com/pages)
- [Tailwind CSS 문서](https://tailwindcss.com/docs)
- [Redux Toolkit 문서](https://redux-toolkit.js.org/)
- [Zod 문서](https://zod.dev/)

---

Made with ❤️ using Next.js and TypeScript
