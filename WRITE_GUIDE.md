# ✍️ 글쓰기 가이드

## 🎯 글쓰기 페이지 접근 방법

### 로컬 개발 서버 실행

```bash
cd c:\codes\blog
npm run dev
```

### 글쓰기 페이지 진입

1. 브라우저에서 `http://localhost:3000` 접속
2. 헤더 오른쪽의 **"✍️ 글쓰기"** 버튼 클릭
3. 또는 직접 `http://localhost:3000/write` 접속

> ⚠️ **중요**: "✍️ 글쓰기" 버튼은 **로컬에서만** 보입니다!  
> 배포된 사이트(`albatro33.github.io`)에서는 보이지 않습니다.

---

## 📝 새 글 작성하기

### 1. "📝 새 글 작성" 탭 선택

글쓰기 페이지에서 상단 탭 중 **"📝 새 글 작성"** 선택

### 2. 포스트 정보 입력

```
제목: 내 첫 번째 블로그 포스트
슬러그: my-first-post (자동 생성됨)
설명: 첫 포스트에 대한 간단한 설명
작성자: albatro33 (기본값)
태그: Next.js, React, TypeScript (쉼표로 구분)
카테고리: Development
공개 여부: ✅ 공개
```

### 3. 본문 작성 (Markdown)

```markdown
# 제목

여기에 본문 내용을 작성합니다.

## 부제목

- 목록 1
- 목록 2

**굵은 글씨** *기울임*

\`\`\`javascript theme="oneDark"
console.log('Hello, World!');
\`\`\`
```

> 💡 **Markdown 문법**을 모르시나요?  
> "내용 (Markdown)" 라벨 옆의 **❓ 아이콘**을 클릭하면 가이드를 볼 수 있습니다!

### 4. 미리보기

**"미리보기"** 버튼을 클릭하여 작성한 내용을 확인하세요.

### 5. 저장

**"포스트 저장"** 버튼 클릭 → `posts/` 폴더에 `.md` 파일 생성됨!

---

## 📚 기존 글 관리하기

### 1. "📚 글 관리" 탭 선택

글쓰기 페이지에서 상단 탭 중 **"📚 글 관리"** 선택

### 2. 포스트 목록 확인

모든 작성된 포스트가 다음 정보와 함께 표시됩니다:

```
┌─────────────────────────────────────────┐
│ 제목: 내 첫 번째 포스트                    │
│ 🔒 비공개  📁 Development                │
│                                         │
│ 📅 발행: 2026년 1월 6일                  │
│ ✏️ 수정: 2026년 1월 7일                  │
│ 🔗 my-first-post                        │
│                                         │
│         [✏️ 수정] [🗑️ 삭제] [👁️ 보기]    │
└─────────────────────────────────────────┘
```

### 3. 포스트 수정

1. **"✏️ 수정"** 버튼 클릭
2. 자동으로 "📝 새 글 작성" 탭으로 이동
3. 기존 내용이 에디터에 로드됨
4. 수정 후 **"포스트 저장"** 클릭
5. `updatedAt` 필드가 자동으로 업데이트됨

### 4. 포스트 삭제

1. **"🗑️ 삭제"** 버튼 클릭
2. 확인 메시지 확인
3. **"확인"** 클릭 → 포스트 완전 삭제

> ⚠️ **경고**: 삭제된 포스트는 **복구할 수 없습니다**!

### 5. 포스트 미리보기

**"👁️ 보기"** 버튼 클릭 → 새 탭에서 실제 포스트 화면 확인

---

## 🎨 코드 블록 테마 선택

코드 블록에 컬러풀한 테마를 적용할 수 있습니다!

### 사용 가능한 테마

- `oneDark` (기본값)
- `oneLight`
- `vscDarkPlus`
- `dracula`
- `atomDark`
- `tomorrow`
- `ghcolors`
- `nightOwl`
- `materialDark`
- `nord`

### 테마 적용 방법

에디터 하단의 **코드 테마 버튼**을 클릭하면 해당 테마의 코드 블록이 자동으로 삽입됩니다:

```markdown
\`\`\`javascript theme="dracula"
const greeting = "Hello, World!";
console.log(greeting);
\`\`\`
```

### 결과

```javascript theme="dracula"
const greeting = "Hello, World!";
console.log(greeting);
```

오른쪽 상단에 **복사 버튼**이 자동으로 추가됩니다!

---

## 📂 파일 구조

작성한 포스트는 다음 경로에 저장됩니다:

```
blog/
└── posts/
    ├── my-first-post.md
    ├── hello-world.md
    └── tailwind-css-guide.md
```

### Markdown 파일 형식

```markdown
---
title: 포스트 제목
date: 2026-01-06
updatedAt: 2026-01-07  # 수정 시 자동 추가
description: 포스트 설명
author: albatro33
tags:
  - Next.js
  - React
category: Development
published: true
coverImage: /images/cover.png  # 선택사항
---

여기에 본문 내용...
```

---

## 🚀 배포하기

포스트를 작성/수정/삭제한 후 GitHub에 업로드하면 자동으로 배포됩니다!

```bash
# 변경사항 확인
git status

# 새 포스트 추가
git add posts/*.md

# 커밋
git commit -m "Add new post: [포스트 제목]"

# 푸시
git push origin main
```

**2-3분 후** → `https://albatro33.github.io`에서 확인 가능! 🎉

---

## 💡 팁

### 1. 자동 슬러그 생성

제목을 입력하면 슬러그가 자동으로 생성됩니다:
- "나의 첫 포스트" → `나의-첫-포스트`
- "My First Post" → `my-first-post`

### 2. 초안 저장

공개하지 않고 작성만 하고 싶다면:
- **"공개"** 체크박스를 해제하세요
- 포스트가 저장되지만 블로그에는 표시되지 않습니다

### 3. 카테고리 자동 생성

새로운 카테고리를 입력하면 자동으로 메인 페이지에 추가됩니다!

### 4. 이미지 추가

```markdown
![이미지 설명](/images/my-image.png)
```

이미지 파일은 `public/images/` 폴더에 저장하세요.

---

## 🐛 문제 해결

### "✍️ 글쓰기" 버튼이 안 보여요!

1. 로컬 개발 서버가 실행 중인지 확인
   ```bash
   npm run dev
   ```
2. `localhost` 또는 `127.0.0.1`로 접속했는지 확인
3. 브라우저를 새로고침 (Ctrl + F5)

### 포스트 목록이 안 나와요!

1. `posts/` 폴더에 `.md` 파일이 있는지 확인
2. 브라우저 콘솔(F12)에서 에러 확인
3. 개발 서버 재시작:
   ```bash
   # Ctrl + C로 종료
   npm run dev
   ```

### API 에러가 나요!

로컬 개발 서버(`npm run dev`)가 실행 중인지 확인하세요.  
배포된 사이트에서는 API가 작동하지 않습니다 (의도된 동작).

---

## 📚 참고 자료

- [Markdown 문법 가이드](https://www.markdownguide.org/basic-syntax/)
- [Next.js 문서](https://nextjs.org/docs)
- [배포 가이드](./DEPLOYMENT.md)

