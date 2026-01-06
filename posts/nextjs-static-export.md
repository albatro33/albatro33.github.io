---
title: "Next.js Static Export로 GitHub Pages 배포하기"
date: "2026-01-05"
description: "Next.js 앱을 정적 사이트로 빌드하여 GitHub Pages에 배포하는 방법을 알아봅니다."
author: "개발자"
tags: ["Next.js", "GitHub Pages", "배포", "Static Site"]
category: "튜토리얼"
published: true
---

# Next.js Static Export로 GitHub Pages 배포하기

Next.js는 강력한 Static Site Generation (SSG) 기능을 제공합니다. 
이를 활용하면 GitHub Pages와 같은 정적 호스팅 서비스에 배포할 수 있습니다.

## Static Export란?

Static Export는 Next.js 앱을 순수한 HTML, CSS, JavaScript 파일로 변환하는 기능입니다.
서버가 필요 없이 정적 파일만으로 웹사이트를 운영할 수 있습니다.

## 설정 방법

### 1. next.config.ts 수정

```typescript theme="oneDark"
const nextConfig = {
  output: 'export',
  images: {
    unoptimized: true,
  },
};

export default nextConfig;
```

### 2. package.json 스크립트 추가

```json theme="ghcolors"
{
  "scripts": {
    "build": "next build",
    "export": "next build"
  }
}
```

### 3. 빌드 실행

```bash theme="tomorrow"
npm run build
```

## GitHub Pages 배포

### GitHub Actions 사용

`.github/workflows/deploy.yml` 파일을 생성하여 자동 배포를 설정할 수 있습니다.

```yaml theme="materialDark"
name: Deploy to GitHub Pages

on:
  push:
    branches: [main]

jobs:
  deploy:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v3
      - uses: actions/setup-node@v3
      - run: npm ci
      - run: npm run build
      - uses: actions/upload-pages-artifact@v2
        with:
          path: ./out
```

## 장점

1. **빠른 로딩** - 미리 생성된 정적 파일
2. **무료 호스팅** - GitHub Pages 무료 사용
3. **높은 보안** - 서버 없이 운영
4. **쉬운 배포** - Git push만으로 자동 배포

## 주의사항

- `next/image`의 일부 기능 제한
- API Routes 사용 불가
- 동적 라우팅 미리 정의 필요

하지만 블로그와 같은 콘텐츠 중심 사이트에는 완벽한 선택입니다!

## 결론

Next.js Static Export는 블로그, 포트폴리오, 문서 사이트에 이상적입니다.
GitHub Pages와 조합하면 무료로 고품질 웹사이트를 운영할 수 있습니다.

