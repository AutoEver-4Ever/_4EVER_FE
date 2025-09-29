import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  reactStrictMode: true, // 리액트 스트릭트 모드 (개발 시 문제 탐지)
  compiler: {
    styledComponents: true,
  },
  // images: {
  //   domains: ["example.com"], // 외부 이미지 도메인 허용
  // },
};

export default nextConfig;
