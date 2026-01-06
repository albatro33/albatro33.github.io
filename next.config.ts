import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  // 이미지 최적화 비활성화
  images: {
    unoptimized: true,
  },
  
  // Trailing slash 추가
  trailingSlash: true,
  
  // GitHub Pages 배포를 위한 Static Export 설정
  // 로컬 개발 시에는 비활성화 (API Routes 사용)
  // 프로덕션 빌드 시에만 활성화
  ...(process.env.NODE_ENV === 'production' && {
    output: 'export',
  }),
};

export default nextConfig;
