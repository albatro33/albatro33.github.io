# 🚀 배포 가이드

## ⚠️ 중요: Admin 기능은 로컬 전용입니다

**GitHub Pages**는 정적 사이트만 지원하므로, Admin 페이지와 API Routes는 배포 후 작동하지 않습니다.

### 작동 방식

| 기능 | 로컬 개발 (`npm run dev`) | 배포된 사이트 (GitHub Pages) |
|------|--------------------------|----------------------------|
| 포스트 읽기 | ✅ 작동 | ✅ 작동 |
| 검색/필터 | ✅ 작동 | ✅ 작동 |
| Admin 페이지 | ✅ 작동 | ❌ 작동 안 함 |
| 포스트 작성/수정/삭제 | ✅ 작동 | ❌ 작동 안 함 |

---

## 📝 포스트 작성 워크플로우

### 1️⃣ 로컬에서 포스트 작성

```bash
# 로컬 개발 서버 시작
npm run dev
```

1. 브라우저에서 `http://localhost:3000/admin` 접속
2. Admin 페이지에서 포스트 작성/수정
3. Markdown 파일이 `posts/` 폴더에 자동 생성됨

### 2️⃣ GitHub에 업로드

```bash
# 변경사항 확인
git status

# 새 포스트 추가
git add posts/*.md

# 커밋
git commit -m "Add new post: [포스트 제목]"

# GitHub에 푸시
git push origin main
```

### 3️⃣ 자동 배포

GitHub Actions가 자동으로:
1. 코드를 빌드
2. 정적 파일 생성
3. GitHub Pages에 배포

약 2-3분 후 `https://albatro33.github.io`에서 확인 가능!

---

## 🔧 GitHub Pages 설정

Repository Settings에서:

1. **Settings** → **Pages**
2. **Source**: GitHub Actions 선택
3. 완료!

---

## 📂 디렉터리 구조

```
blog/
├── posts/              # Markdown 포스트 파일 (Git 추적)
│   ├── hello-world.md
│   └── ...
├── app/
│   ├── admin/         # Admin 페이지 (로컬 전용, 빌드 제외)
│   └── api/           # API Routes (로컬 전용, 빌드 제외)
└── out/               # 빌드 결과 (자동 생성, Git 무시)
```

---

## ⚡ 빌드 에러 해결

### "export const dynamic = "force-static" not configured"

이 에러는 `output: 'export'` 모드에서 API Routes를 사용할 때 발생합니다.

**해결책**: API Routes는 로컬 개발에서만 사용하고, 빌드 시에는 무시됩니다.

```typescript
// next.config.ts
export default {
  output: 'export',  // 정적 사이트 생성
  // ...
};
```

---

## 🎯 배포 체크리스트

- [ ] 로컬에서 `npm run dev`로 Admin 기능 테스트
- [ ] `posts/` 폴더에 Markdown 파일 생성 확인
- [ ] `git add posts/*.md`로 새 포스트 추가
- [ ] `git commit -m "메시지"`로 커밋
- [ ] `git push origin main`으로 푸시
- [ ] GitHub Actions 워크플로우 확인 (Actions 탭)
- [ ] 2-3분 후 배포된 사이트 확인

---

## 💡 팁

### Markdown 파일 직접 편집

Admin 페이지를 사용하지 않고 직접 편집도 가능합니다:

```bash
# 텍스트 에디터로 직접 편집
code posts/my-new-post.md
```

**Markdown 파일 형식**:

```markdown
---
title: 포스트 제목
date: 2026-01-06
description: 포스트 설명
author: albatro33
tags: [Next.js, React]
category: Development
published: true
---

여기에 본문 내용을 작성합니다.

\`\`\`javascript theme="oneDark"
console.log('Hello, World!');
\`\`\`
```

### 이미지 추가

```markdown
![이미지 설명](/images/my-image.png)
```

이미지 파일은 `public/images/` 폴더에 저장하세요.

---

## 🐛 문제 해결

### 빌드가 실패할 때

```bash
# 로컬에서 빌드 테스트
npm run build

# 빌드 결과 확인
npm run start
```

### 배포가 안 될 때

1. GitHub Actions 탭에서 워크플로우 로그 확인
2. Repository Settings → Pages에서 Source 설정 확인
3. `.github/workflows/deploy.yml` 파일 확인

---

## 📚 참고 자료

- [Next.js Static Exports](https://nextjs.org/docs/app/building-your-application/deploying/static-exports)
- [GitHub Pages 문서](https://docs.github.com/en/pages)
- [GitHub Actions 문서](https://docs.github.com/en/actions)

