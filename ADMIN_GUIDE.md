# Admin 페이지 사용 가이드

Admin 페이지를 사용하여 로컬에서 포스트를 작성하고 `.md` 파일로 저장하는 방법을 안내합니다.

## 🎯 Admin 페이지란?

로컬 개발 환경에서만 사용 가능한 포스트 작성 도구입니다.  
작성한 포스트는 `posts/` 폴더에 `.md` 파일로 저장되어 빌드 시 포함됩니다.

**⚠️ 중요**: Admin 페이지는 **로컬 개발 환경**에서만 작동합니다. 빌드된 사이트에는 포함되지 않습니다.

## 🚀 사용 방법

### 1. 개발 서버 실행

```bash
cd c:/codes/blog
npm run dev
```

### 2. Admin 페이지 접속

두 가지 방법:
- 브라우저에서 `http://localhost:3000/admin` 직접 입력
- 블로그 헤더의 **"✍️ 글쓰기"** 메뉴 클릭

### 3. 포스트 작성

#### 기본 정보 입력

- **제목** (필수): 포스트 제목
- **슬러그**: URL에 사용될 이름 (비워두면 제목에서 자동 생성)
- **설명** (필수): 포스트 요약
- **작성자**: 기본값 "albatro33"
- **카테고리**: 예) 개발, 튜토리얼, 일상
- **태그**: 쉼표로 구분 (예: Next.js, TypeScript, 블로그)
- **공개 여부**: 공개/비공개 선택

#### 코드 블럭 삽입

포스트 내용에 코드를 추가하려면:

1. **"🎨 코드 블럭 삽입" 섹션**에서 원하는 테마 버튼 클릭
2. 자동으로 코드 템플릿이 삽입됨:

```typescript theme="dracula"
// 여기에 코드를 작성하세요
const example = "Hello, World!";
```

3. 템플릿의 코드를 원하는 코드로 수정

**사용 가능한 테마**:
- One Dark
- One Light
- VS Code Dark+
- Dracula
- Atom Dark
- Tomorrow
- GitHub
- Night Owl
- Material Dark
- Nord

#### 내용 작성

- **편집 모드**: Markdown 문법으로 작성
- **미리보기**: "미리보기" 버튼으로 렌더링 확인

#### Markdown 문법 예시

```markdown
# 제목 1
## 제목 2

**굵은 글씨**
*기울임*

- 목록 1
- 목록 2

[링크](https://example.com)

![이미지](이미지_URL)
```

### 4. 저장

**"📄 .md 파일로 저장"** 버튼 클릭

성공하면:
- 알림 메시지 표시
- `posts/` 폴더에 `.md` 파일 생성됨
- 폼이 초기화됨

**생성된 파일 위치**:
```
posts/
  ├── your-post-slug.md  ← 새로 생성됨!
  ├── welcome-to-my-blog.md
  └── ...
```

### 5. 확인

1. 홈페이지 (`http://localhost:3000`)로 이동
2. 새 포스트가 목록에 표시됨
3. 클릭하여 상세 페이지 확인

## 💡 사용 팁

### 슬러그 자동 생성

슬러그를 비워두면 제목에서 자동 생성됩니다:

- 제목: "나의 첫 포스트" → 슬러그: `나의-첫-포스트`
- 제목: "TypeScript Tips" → 슬러그: `typescript-tips`

### 코드 테마 조합

한 포스트에 여러 테마를 사용할 수 있습니다:

```markdown
\```typescript theme="dracula"
// Dracula 테마
\```

\```javascript theme="nightOwl"
// Night Owl 테마
\```

\```python theme="vscDarkPlus"
// VS Code Dark+ 테마
\```
```

### 이미지 추가

1. `public/` 폴더에 이미지 저장
2. Markdown에서 참조:

```markdown
![설명](/이미지파일명.jpg)
```

### 초안 작성

공개하기 전에 작성하려면:
- **공개 여부**를 "비공개"로 설정
- 저장 후 나중에 수동으로 `.md` 파일에서 `published: true`로 변경

## 🔧 문제 해결

### 같은 이름 오류

> "같은 이름의 포스트가 이미 존재합니다."

**해결**: 슬러그를 다른 이름으로 변경하거나 기존 파일을 삭제/이름 변경

### 저장 실패

**확인사항**:
1. 로컬 개발 서버가 실행 중인가?
2. `posts/` 폴더에 쓰기 권한이 있는가?
3. 필수 항목(제목, 설명)을 입력했는가?

### 포스트가 표시되지 않음

**확인사항**:
1. `published: true`로 설정되어 있는가?
2. Front Matter 형식이 올바른가?
3. 페이지를 새로고침했는가?

## 📝 예시 워크플로우

### 새 포스트 작성 전체 과정

1. **서버 시작**: `npm run dev`
2. **Admin 접속**: `http://localhost:3000/admin`
3. **정보 입력**:
   - 제목: "Next.js 15 새 기능 소개"
   - 설명: "Next.js 15의 주요 변경사항과 새 기능을 알아봅니다"
   - 카테고리: "튜토리얼"
   - 태그: "Next.js, React, 웹개발"
4. **코드 삽입**: Dracula 테마 버튼 클릭
5. **내용 작성**:
```markdown
# Next.js 15 주요 기능

Next.js 15가 출시되었습니다!

## 새로운 기능

\```typescript theme="dracula"
import { use } from 'react';

async function getData() {
  // 새로운 use() 훅
}
\```
```
6. **저장**: "📄 .md 파일로 저장" 클릭
7. **확인**: 홈페이지에서 새 포스트 확인
8. **Git 커밋**: 
```bash
git add posts/nextjs-15-새-기능-소개.md
git commit -m "Add: Next.js 15 새 기능 소개"
git push
```

## 🚀 배포

Admin 페이지로 작성한 포스트는 Git에 커밋하여 배포:

```bash
# 생성된 .md 파일 확인
ls posts/

# Git에 추가
git add posts/*.md

# 커밋
git commit -m "Add: 새 포스트"

# GitHub에 푸시
git push
```

GitHub Actions가 자동으로 빌드하고 배포합니다!

---

**즐거운 블로깅 되세요!** ✨

