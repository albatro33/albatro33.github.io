---
title: "Tailwind CSS 시작 가이드"
date: "2026-01-03"
description: "Tailwind CSS의 기본 개념과 실전 활용법을 알아봅니다."
author: "개발자"
tags: ["Tailwind CSS", "CSS", "스타일링"]
category: "개발"
published: true
---

# Tailwind CSS 시작 가이드

Tailwind CSS는 유틸리티 우선(Utility-First) CSS 프레임워크입니다.
전통적인 CSS 작성 방식과는 다른 접근 방식을 제공합니다.

## Tailwind CSS란?

미리 정의된 클래스를 조합하여 디자인을 구현하는 CSS 프레임워크입니다.

### 장점

1. **빠른 개발 속도** - 클래스만으로 스타일링
2. **일관성** - 디자인 시스템 자동 적용
3. **작은 번들 크기** - 사용한 클래스만 포함
4. **커스터마이징** - 쉬운 테마 설정

## 기본 사용법

### 레이아웃

```html
<div class="flex items-center justify-between">
  <div class="w-1/2">왼쪽</div>
  <div class="w-1/2">오른쪽</div>
</div>
```

### 스타일링

```html
<button class="bg-blue-500 hover:bg-blue-600 text-white px-4 py-2 rounded-lg">
  버튼
</button>
```

### 반응형 디자인

```html
<div class="text-sm md:text-base lg:text-lg">
  반응형 텍스트
</div>
```

## 실전 팁

### 1. @apply 사용

반복되는 스타일을 컴포넌트로 추출합니다.

```css
.btn-primary {
  @apply bg-blue-500 hover:bg-blue-600 text-white px-4 py-2 rounded-lg;
}
```

### 2. 커스텀 색상

```javascript
// tailwind.config.js
module.exports = {
  theme: {
    extend: {
      colors: {
        primary: '#3B82F6',
        secondary: '#8B5CF6',
      },
    },
  },
};
```

### 3. 다크 모드

```html
<div class="bg-white dark:bg-gray-900 text-black dark:text-white">
  다크 모드 지원
</div>
```

## 자주 사용하는 클래스

### Spacing
- `p-4` - padding: 1rem
- `m-4` - margin: 1rem
- `space-x-4` - 자식 요소 간격

### Colors
- `bg-blue-500` - 배경색
- `text-gray-700` - 텍스트 색
- `border-red-500` - 테두리 색

### Typography
- `text-lg` - 큰 텍스트
- `font-bold` - 굵은 글씨
- `leading-relaxed` - 줄 간격

### Layout
- `flex` - Flexbox
- `grid` - Grid
- `container` - 중앙 정렬 컨테이너

## 베스트 프랙티스

1. **일관된 간격 사용** - Tailwind의 spacing scale 활용
2. **반응형 우선** - 모바일 먼저 디자인
3. **컴포넌트 추출** - 반복되는 스타일은 컴포넌트로
4. **테마 활용** - config에서 색상과 간격 정의

## 결론

Tailwind CSS는 처음엔 낯설 수 있지만, 익숙해지면 매우 빠르고 효율적으로 개발할 수 있습니다.
특히 Next.js와 함께 사용하면 최고의 개발 경험을 제공합니다!

