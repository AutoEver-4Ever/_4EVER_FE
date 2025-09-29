// next.config.js
/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true, // 리액트 스트릭트 모드 (개발 시 문제 탐지)
  swcMinify: true, // 코드 최소화 (빌드 최적화)
  compiler: {
    styledComponents: true, // styled-components SSR 지원
  },
  images: {
    domains: ["example.com"], // 외부 이미지 도메인 허용
  },
};

export default nextConfig;
