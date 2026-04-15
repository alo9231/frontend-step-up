import "./globals.css";
import { Navbar } from "../components/layout/Navbar";


export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="ko">
      <body>
        <Navbar /> {/* 👈 여기에 Navbar가 있어야 메인, 메모장 모두에 나타남 */}
        {/* 공통 레이아웃 적용 */}
        <main className="min-h-screen bg-gray-50 py-10 px-4">
          {children}
        </main>
      </body>
    </html>
  );
}
