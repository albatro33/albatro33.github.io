import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  // GitHub Pages 배포를 위한 Static Export 설정
  output: 'export',
  
  // 이미지 최적화 비활성화 (Static Export 필요)
  images: {
    unoptimized: true,
  },
  
  // Trailing slash 추가
  trailingSlash: true,
};

export default nextConfig;
