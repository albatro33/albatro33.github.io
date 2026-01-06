# 🚀 SEO 최적화 가이드

## ✅ 적용된 SEO 최적화 항목

### 1️⃣ 메타데이터 최적화 (Metadata)

#### 전역 메타데이터 (`app/layout.tsx`)
- ✅ **Title Template**: 모든 페이지 제목에 "| albatro33 blog" 자동 추가
- ✅ **Description**: 사이트 설명
- ✅ **Keywords**: 관련 키워드 추가
- ✅ **Author**: 작성자 정보
- ✅ **Robots**: 검색 엔진 크롤링 설정
- ✅ **Open Graph**: Facebook/LinkedIn 공유 최적화
- ✅ **Twitter Card**: Twitter 공유 최적화
- ✅ **Canonical URL**: 중복 콘텐츠 방지
- ✅ **Google AdSense**: 광고 계정 메타 태그

#### 포스트별 메타데이터 (`app/posts/[slug]/page.tsx`)
- ✅ 각 포스트마다 고유한 제목, 설명, 키워드
- ✅ Open Graph 이미지 (커버 이미지 또는 기본 이미지)
- ✅ 작성일/수정일 정보
- ✅ 작성자 정보
- ✅ 태그 정보

---

### 2️⃣ 사이트맵 (Sitemap)

#### 정적 파일 (`public/sitemap.xml`)
- ✅ 모든 포스트 포함
- ✅ 정적 페이지 (홈, 소개) 포함
- ✅ 우선순위(priority) 설정
- ✅ 변경 빈도(changeFrequency) 설정

**접근**: `https://albatro33.github.io/sitemap.xml`

#### Sitemap 업데이트 방법

새 포스트를 작성할 때마다 `public/sitemap.xml`을 수동으로 업데이트하거나, 빌드 스크립트를 사용하세요:

```bash
# 자동 생성 (빌드 시)
npm run build  # prebuild 스크립트가 자동으로 sitemap 생성

# 수동 생성
node scripts/generate-sitemap.js
```

---

### 3️⃣ Robots.txt

#### 크롤링 규칙 (`app/robots.ts` + `public/robots.txt`)
- ✅ 모든 페이지 크롤링 허용
- ✅ `/write`, `/api/` 크롤링 제외
- ✅ 사이트맵 위치 명시

**접근**: `https://albatro33.github.io/robots.txt`

---

### 4️⃣ 구조화된 데이터 (Structured Data / JSON-LD)

#### Schema.org 마크업 (`components/blog/StructuredData.tsx`)
- ✅ **Blog** 스키마: 전체 블로그 정보
- ✅ **BlogPosting** 스키마: 각 포스트 정보
- ✅ 작성자, 발행일, 수정일, 이미지 등 포함

Google이 블로그 포스트를 더 정확히 이해하고 **리치 스니펫**으로 표시할 수 있습니다.

---

### 5️⃣ 시맨틱 HTML

- ✅ `<article>` 태그로 포스트 마크업
- ✅ `<header>`, `<footer>`, `<main>` 태그 사용
- ✅ `<time>` 태그로 날짜 표시
- ✅ Heading 계층 구조 (`h1` → `h2` → `h3`)

---

### 6️⃣ 성능 최적화

- ✅ Next.js Static Export (빠른 로딩)
- ✅ 이미지 최적화 (`unoptimized: true` - GitHub Pages 필수)
- ✅ Tailwind CSS (경량화된 CSS)
- ✅ Code Splitting (자동)

---

## 📋 추가 설정 필요

### 1. Open Graph 이미지 생성

블로그 대표 이미지를 생성하여 `public/og-image.png`에 저장하세요:

- **크기**: 1200x630px (권장)
- **형식**: PNG 또는 JPG
- **내용**: 블로그 로고 또는 대표 이미지

**온라인 도구**:
- [Canva](https://www.canva.com)
- [Figma](https://www.figma.com)

---

### 2. Google Search Console 등록

#### 1단계: 소유권 확인

1. [Google Search Console](https://search.google.com/search-console) 접속
2. "속성 추가" → URL: `https://albatro33.github.io`
3. **HTML 태그** 방식 선택
4. 받은 확인 코드를 `app/layout.tsx`의 `verification.google`에 입력:

```typescript
verification: {
  google: "여기에_받은_확인_코드_입력", // 예: abcdefg1234567
},
```

5. "확인" 버튼 클릭

#### 2단계: 사이트맵 제출

1. Google Search Console → "사이트맵"
2. `https://albatro33.github.io/sitemap.xml` 제출
3. 완료!

---

### 3. Naver 검색 등록

#### Naver Search Advisor

1. [Naver Search Advisor](https://searchadvisor.naver.com) 접속
2. 사이트 등록: `https://albatro33.github.io`
3. 소유권 확인 (HTML 태그 또는 파일 업로드)
4. 사이트맵 제출: `https://albatro33.github.io/sitemap.xml`

---

### 4. Bing Webmaster Tools

1. [Bing Webmaster Tools](https://www.bing.com/webmasters) 접속
2. 사이트 추가
3. Google Search Console에서 가져오기 (간편!)

---

## 🎯 SEO 체크리스트

배포 후 확인:

- [ ] `https://albatro33.github.io/sitemap.xml` 접근 가능
- [ ] `https://albatro33.github.io/robots.txt` 접근 가능
- [ ] Open Graph 이미지 생성 및 업로드
- [ ] Google Search Console 등록 및 사이트맵 제출
- [ ] Naver Search Advisor 등록
- [ ] 각 포스트 페이지 소스 보기 → Open Graph 태그 확인
- [ ] 각 포스트 페이지 소스 보기 → JSON-LD 스키마 확인

---

## 🔍 SEO 테스트 도구

### 1. Rich Results Test (Google)

- **URL**: https://search.google.com/test/rich-results
- **사용법**: 블로그 URL 입력 → 구조화된 데이터 확인

### 2. Open Graph Debugger (Facebook)

- **URL**: https://developers.facebook.com/tools/debug/
- **사용법**: 블로그 URL 입력 → Open Graph 태그 확인

### 3. Twitter Card Validator

- **URL**: https://cards-dev.twitter.com/validator
- **사용법**: 블로그 URL 입력 → Twitter Card 확인

### 4. PageSpeed Insights

- **URL**: https://pagespeed.web.dev/
- **사용법**: 블로그 URL 입력 → 성능 점수 확인

### 5. Lighthouse (Chrome DevTools)

1. Chrome 브라우저에서 F12
2. "Lighthouse" 탭
3. "SEO" 체크 → "Analyze page load"
4. 점수 확인 (90점 이상 목표!)

---

## 📈 SEO 모니터링

### Google Search Console에서 확인

- **검색 실적**: 노출수, 클릭수, CTR
- **커버리지**: 색인된 페이지 수
- **사이트맵**: 제출된 페이지 vs 색인된 페이지
- **모바일 사용성**: 모바일 최적화 상태

### 검색 순위 확인

1. Google에서 검색:
   - `site:albatro33.github.io`
   - `"블로그 제목" OR "포스트 제목"`

2. 특정 키워드로 검색:
   - `Next.js 블로그 만들기`
   - 본인이 작성한 포스트 관련 키워드

---

## 💡 추가 SEO 팁

### 1. 양질의 콘텐츠

- ✅ 최소 1000자 이상
- ✅ 고유한 내용 (복붙 금지)
- ✅ 정확한 정보
- ✅ 정기적인 업데이트

### 2. 내부 링크

- ✅ 관련 포스트끼리 링크
- ✅ 카테고리 활용
- ✅ 태그 활용

### 3. 외부 링크

- ✅ 신뢰할 수 있는 사이트 링크
- ✅ 참고 자료 출처 명시

### 4. 이미지 최적화

- ✅ `alt` 속성 추가
- ✅ 파일명 명확하게 (예: `nextjs-tutorial.png`)
- ✅ 적절한 크기 (불필요하게 크지 않게)

### 5. URL 구조

- ✅ 명확하고 짧은 URL
- ✅ 키워드 포함
- ✅ 소문자 사용
- ✅ 하이픈(-) 사용 (언더스코어 X)

---

## 🎉 완료!

모든 SEO 최적화가 완료되었습니다!

배포 후 Google Search Console과 다양한 테스트 도구로 확인해보세요.

**검색 엔진에 색인되는 데는 며칠에서 몇 주가 걸릴 수 있습니다.**
꾸준히 양질의 콘텐츠를 작성하는 것이 가장 중요합니다! 🚀

