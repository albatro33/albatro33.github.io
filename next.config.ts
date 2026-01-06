import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  // GitHub Pages 배포를 위한 Static Export 설정
  output: 'export',
  
  // 이미지 최적화 비활성화 (Static Export 필요)
  images: {
    unoptimized: true,
  },
  
  // GitHub Pages subpath를 사용하는 경우 설정
  // 예: https://username.github.io/blog
  // basePath: '/blog',
  
  // Trailing slash 추가
  trailingSlash: true,
  
  // Admin 페이지와 API 라우트를 빌드에서 제외 (로컬 개발용)
  ...(process.env.NODE_ENV === 'production' && {
    experimental: {
      // @ts-ignore
      outputFileTracingExcludes: {
        '/api/*': ['**/*'],
        '/admin': ['**/*'],
      },
    },
  }),
};

export default nextConfig;
