import type { Metadata } from 'next';
import { Geist, Geist_Mono, Pacifico } from 'next/font/google';
import './globals.css';
import Script from 'next/script';

const pacifico = Pacifico({
  weight: '400',
  subsets: ['latin'],
  display: 'swap',
  variable: '--font-pacifico',
});

const geistSans = Geist({
  variable: '--font-geist-sans',
  subsets: ['latin'],
});

const geistMono = Geist_Mono({
  variable: '--font-geist-mono',
  subsets: ['latin'],
});

const navigation = [
  { name: '대시보드', href: '/dashboard', icon: 'ri-dashboard-line' },
  { name: '영업관리', href: '/sales', icon: 'ri-line-chart-line' },
  { name: '구매관리', href: '/purchase', icon: 'ri-shopping-cart-line' },
  { name: '재고관리', href: '/inventory', icon: 'ri-archive-line' },
  { name: '재무관리', href: '/finance', icon: 'ri-money-dollar-circle-line' },
  { name: '인적자원관리', href: '/hrm', icon: 'ri-team-line' },
  { name: '회사관리', href: '/companies', icon: 'ri-building-line' },
];

export const metadata: Metadata = {
  title: 'ERP 시스템',
  description: '기업 자원 관리 통합 시스템',
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="ko" suppressHydrationWarning={true}>
      <body
        className={`${geistSans.variable} ${geistMono.variable} ${pacifico.variable} antialiased`}
      >
        {children}
        <Script
          src="https://readdy.ai/api/public/assistant/widget?projectId=676b8b8b8b8b8b8b8b8b8b8b"
          strategy="afterInteractive"
          // mode="hybrid"
          voice-show-transcript="true"
          // theme="light"
          // size="compact"
          accent-color="#4F46E5"
          button-base-color="#1F2937"
          button-accent-color="#FFFFFF"
        />
      </body>
    </html>
  );
}
