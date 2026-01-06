---
title: "TypeScript 실전 팁 모음"
date: "2026-01-04"
description: "TypeScript를 더 효과적으로 사용하기 위한 실용적인 팁들을 소개합니다."
author: "개발자"
tags: ["TypeScript", "JavaScript", "팁"]
category: "개발"
published: true
---

# TypeScript 실전 팁 모음

TypeScript를 사용하면서 알아두면 유용한 팁들을 정리했습니다.

## 1. Utility Types 활용

TypeScript는 많은 내장 유틸리티 타입을 제공합니다.

### Partial
```typescript theme="vscDarkPlus"
interface User {
  name: string;
  email: string;
  age: number;
}

// 모든 속성을 선택적으로 만듦
type PartialUser = Partial<User>;
```

### Pick과 Omit
```typescript theme="dracula"
// 특정 속성만 선택
type UserName = Pick<User, 'name' | 'email'>;

// 특정 속성 제외
type UserWithoutAge = Omit<User, 'age'>;
```

## 2. Type Guards

Type Guard를 사용하여 타입을 안전하게 좁힐 수 있습니다.

```typescript theme="nightOwl"
function isString(value: unknown): value is string {
  return typeof value === 'string';
}

function processValue(value: unknown) {
  if (isString(value)) {
    // 여기서 value는 string 타입
    console.log(value.toUpperCase());
  }
}
```

## 3. as const 활용

```typescript
const colors = ['red', 'green', 'blue'] as const;
type Color = typeof colors[number]; // 'red' | 'green' | 'blue'
```

## 4. Generic Constraints

제네릭에 제약 조건을 추가할 수 있습니다.

```typescript
function getProperty<T, K extends keyof T>(obj: T, key: K) {
  return obj[key];
}

const user = { name: 'John', age: 30 };
getProperty(user, 'name'); // OK
getProperty(user, 'invalid'); // 에러!
```

## 5. Discriminated Unions

태그된 유니온으로 타입을 명확하게 구분합니다.

```typescript
type Success = { status: 'success'; data: string };
type Error = { status: 'error'; error: string };
type Result = Success | Error;

function handleResult(result: Result) {
  if (result.status === 'success') {
    console.log(result.data); // data 접근 가능
  } else {
    console.log(result.error); // error 접근 가능
  }
}
```

## 6. Index Signatures

동적 속성을 가진 객체 타입을 정의합니다.

```typescript
interface Dictionary {
  [key: string]: number;
}

const scores: Dictionary = {
  math: 95,
  english: 88,
};
```

## 7. Template Literal Types

문자열 리터럴 타입을 조합합니다.

```typescript
type Size = 'small' | 'medium' | 'large';
type Color = 'red' | 'blue';
type Style = `${Size}-${Color}`; // 'small-red' | 'small-blue' | ...
```

## 결론

TypeScript의 고급 기능들을 잘 활용하면 더 안전하고 유지보수하기 좋은 코드를 작성할 수 있습니다.
이 팁들이 도움이 되길 바랍니다!

