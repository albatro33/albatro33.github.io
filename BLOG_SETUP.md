# albatro33 blog 설정 가이드

이 문서는 GitHub Pages 블로그를 설정하고 사용하는 방법을 안내합니다.

**저장소**: [https://github.com/albatro33/albatro33.github.io](https://github.com/albatro33/albatro33.github.io)  
**배포 URL**: [https://albatro33.github.io](https://albatro33.github.io)

## 📋 사전 준비

- GitHub 계정 (albatro33)
- Git 설치
- Node.js 20+ 설치

## 🎯 현재 설정

### GitHub 저장소

- **저장소 이름**: `albatro33.github.io`
- **저장소 타입**: 개인 GitHub Pages 사이트
- **URL**: `https://albatro33.github.io`
- **Branch**: `main`

#### 옵션 B: 프로젝트 사이트 (프로젝트별)

1. GitHub에서 새 저장소 생성
2. 저장소 이름: 원하는 이름 (예: `blog`, `my-blog`)
3. Public으로 설정

**URL**: `https://username.github.io/repository-name`

**추가 설정 필요**: `next.config.ts`에서 `basePath` 설정

```typescript
const nextConfig = {
  output: 'export',
  basePath: '/repository-name', // 저장소 이름
  // ...
};
```

### 개발 및 배포

#### 로컬 개발

```bash
cd c:/codes/blog
npm run dev
```

#### Git Push 및 배포

```bash
git add .
git commit -m "Update: 새 포스트 추가"
git push
```

자동으로 GitHub Actions가 빌드 및 배포를 진행합니다.

### 3단계: GitHub Pages 활성화

1. GitHub 저장소 페이지로 이동
2. **Settings** 클릭
3. 왼쪽 메뉴에서 **Pages** 클릭
4. **Source** 섹션에서:
   - **Source**: `GitHub Actions` 선택
5. 저장

### 4단계: 첫 배포 확인

1. 코드를 push하면 자동으로 배포 시작
2. **Actions** 탭에서 배포 진행 상황 확인
3. 배포 완료 후 URL 접속:
   - 옵션 A: `https://username.github.io`
   - 옵션 B: `https://username.github.io/repository-name`

## ✍️ 첫 포스트 작성하기

### 1. posts 디렉터리에 파일 생성

```bash
# 예: posts/my-first-post.md
```

### 2. 포스트 작성

```markdown
---
title: "나의 첫 포스트"
date: "2026-01-06"
description: "첫 블로그 포스트입니다!"
author: "홍길동"
tags: ["일상", "블로그"]
category: "일상"
published: true
---

# 안녕하세요!

나의 첫 블로그 포스트입니다.

## Markdown 문법 사용

- 목록
- **굵은 글씨**
- *기울임*

```javascript
console.log('Hello, World!');
```
\```

### 3. 커밋 및 푸시

```bash
git add posts/my-first-post.md
git commit -m "Add: 나의 첫 포스트"
git push
```

### 4. 배포 완료 후 확인

몇 분 후 블로그에서 새 포스트를 확인할 수 있습니다!

## 🎨 블로그 개인화

### 블로그 제목 변경

`app/layout.tsx` 수정:

```typescript
export const metadata: Metadata = {
  title: "내 블로그 이름",
  description: "내 블로그 설명",
};
```

### 헤더 수정

`components/blog/Header.tsx` 수정:

```tsx
<h1 className="...">
  내 블로그 이름
</h1>
```

### GitHub 링크 변경

`components/blog/Header.tsx`와 `components/blog/Footer.tsx`에서:

```tsx
<a href="https://github.com/your-username" ...>
```

### 소개 페이지 수정

`app/about/page.tsx`에서 자기소개 작성

## 🔧 문제 해결

### 배포가 실패하는 경우

1. **Actions 탭**에서 에러 로그 확인
2. 주요 원인:
   - Node.js 버전 문제
   - 빌드 에러 (TypeScript, ESLint)
   - 패키지 의존성 문제

### 로컬에서 테스트

```bash
# 개발 서버
npm run dev

# 빌드 테스트
npm run build

# 빌드 결과 확인
npx serve out
```

### 페이지가 비어 보이는 경우

1. `basePath` 설정 확인 (프로젝트 사이트인 경우)
2. 브라우저 캐시 삭제
3. 포스트 파일의 `published: true` 확인

## 📱 모바일에서 확인

- 반응형 디자인이므로 모든 기기에서 작동
- 모바일 브라우저에서도 동일한 URL로 접속

## 🚀 다음 단계

1. **커스텀 도메인 연결** (선택사항)
   - GitHub Pages Settings에서 Custom domain 설정
   - DNS 레코드 추가

2. **Google Analytics 추가** (선택사항)
   - `app/layout.tsx`에 Google Analytics 스크립트 추가

3. **댓글 시스템 추가** (선택사항)
   - [utterances](https://utteranc.es/) 또는 [giscus](https://giscus.app/) 사용

4. **RSS 피드 생성** (선택사항)

## 💡 팁

- **정기적인 백업**: 로컬 파일 보관
- **이미지 관리**: `public/` 디렉터리에 이미지 저장
- **Git 커밋 메시지**: 의미 있는 메시지 작성
- **브랜치 사용**: 큰 변경사항은 별도 브랜치에서 작업

## 📞 도움이 필요한 경우

- [Next.js 공식 문서](https://nextjs.org/docs)
- [GitHub Pages 문서](https://docs.github.com/pages)
- GitHub Issues에 질문 올리기

---

즐거운 블로깅 되세요! ✨

