"use client";

import Link from "next/link";

export default function LandingPage() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900">
      {/* 헤더 */}
      <header className="relative z-10">
        <nav className="container mx-auto px-6 py-6">
          <div className="flex items-center justify-between">
            {/* 로고 */}
            <div className="flex items-center space-x-2">
              <div className="w-10 h-10 bg-gradient-to-r from-blue-500 to-purple-600 rounded-lg flex items-center justify-center">
                <span className="text-white font-bold text-xl">B</span>
              </div>
              <span className="text-white text-xl font-bold">Better Auth</span>
            </div>
            
            {/* 오른쪽 버튼들 */}
            <div className="flex items-center space-x-4">
              <Link
                href="/auth"
                className="text-gray-300 hover:text-white transition-colors font-medium"
              >
                로그인
              </Link>
              <Link
                href="/auth"
                className="bg-gradient-to-r from-blue-500 to-purple-600 text-white px-6 py-2 rounded-lg hover:from-blue-600 hover:to-purple-700 transition-all transform hover:scale-105 font-medium"
              >
                회원가입
              </Link>
            </div>
          </div>
        </nav>
      </header>

      {/* 메인 콘텐츠 */}
      <main className="container mx-auto px-6 py-20">
        <div className="text-center max-w-4xl mx-auto">
          {/* 타이틀 */}
          <h1 className="text-5xl md:text-7xl font-bold text-white mb-6">
            <span className="bg-gradient-to-r from-blue-400 via-purple-400 to-pink-400 bg-clip-text text-transparent">
              Better Auth
            </span>
            <br />
            <span className="text-3xl md:text-5xl text-gray-300">테스트 페이지</span>
          </h1>
          
          {/* 설명 */}
          <p className="text-xl text-gray-300 mb-12 max-w-2xl mx-auto leading-relaxed">
            현대적인 인증 시스템과 간편한 결제 경험을 제공하는 
            <span className="text-blue-400 font-semibold"> 차세대 인증 솔루션</span>을 만나보세요
          </p>

          {/* CTA 버튼 */}
          <div className="flex flex-col sm:flex-row gap-4 justify-center mb-20">
            <Link
              href="/auth"
              className="bg-gradient-to-r from-blue-500 to-purple-600 text-white px-8 py-4 rounded-xl text-lg font-semibold hover:from-blue-600 hover:to-purple-700 transition-all transform hover:scale-105 shadow-xl"
            >
              지금 시작하기
            </Link>
            <Link
              href="/payment"
              className="bg-white/10 backdrop-blur-lg text-white px-8 py-4 rounded-xl text-lg font-semibold hover:bg-white/20 transition-all border border-white/20"
            >
              결제 테스트
            </Link>
          </div>

          {/* 기능 카드들 */}
          <div className="grid md:grid-cols-3 gap-8 mb-20">
            <div className="bg-white/10 backdrop-blur-lg rounded-xl p-6 border border-white/20 hover:bg-white/15 transition-all">
              <div className="w-12 h-12 bg-gradient-to-r from-blue-500 to-blue-600 rounded-lg flex items-center justify-center mb-4 mx-auto">
                <span className="text-white text-2xl">🔐</span>
              </div>
              <h3 className="text-xl font-semibold text-white mb-3">안전한 인증</h3>
              <p className="text-gray-300">
                이메일, 소셜 로그인 등 다양한 인증 방식을 지원하여 
                사용자에게 최적의 로그인 경험을 제공합니다
              </p>
            </div>
            
            <div className="bg-white/10 backdrop-blur-lg rounded-xl p-6 border border-white/20 hover:bg-white/15 transition-all">
              <div className="w-12 h-12 bg-gradient-to-r from-purple-500 to-purple-600 rounded-lg flex items-center justify-center mb-4 mx-auto">
                <span className="text-white text-2xl">💳</span>
              </div>
              <h3 className="text-xl font-semibold text-white mb-3">간편 결제</h3>
              <p className="text-gray-300">
                토스페이먼츠 브랜드페이 통합으로 
                빠르고 안전한 결제 기능을 손쉽게 구현할 수 있습니다
              </p>
            </div>
            
            <div className="bg-white/10 backdrop-blur-lg rounded-xl p-6 border border-white/20 hover:bg-white/15 transition-all">
              <div className="w-12 h-12 bg-gradient-to-r from-pink-500 to-pink-600 rounded-lg flex items-center justify-center mb-4 mx-auto">
                <span className="text-white text-2xl">🚀</span>
              </div>
              <h3 className="text-xl font-semibold text-white mb-3">최신 기술</h3>
              <p className="text-gray-300">
                Next.js, TypeScript, Tailwind CSS 등 
                최신 기술 스택으로 구축된 최적화된 솔루션
              </p>
            </div>
          </div>

          {/* 통계 */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8 mb-20">
            <div className="text-center">
              <div className="text-3xl font-bold text-white mb-2">99.9%</div>
              <div className="text-gray-400">업타임</div>
            </div>
            <div className="text-center">
              <div className="text-3xl font-bold text-white mb-2">&lt;100ms</div>
              <div className="text-gray-400">응답 시간</div>
            </div>
            <div className="text-center">
              <div className="text-3xl font-bold text-white mb-2">256-bit</div>
              <div className="text-gray-400">암호화</div>
            </div>
            <div className="text-center">
              <div className="text-3xl font-bold text-white mb-2">24/7</div>
              <div className="text-gray-400">지원</div>
            </div>
          </div>
        </div>
      </main>

      {/* 푸터 */}
      <footer className="border-t border-white/20">
        <div className="container mx-auto px-6 py-8">
          <div className="flex flex-col md:flex-row justify-between items-center">
            <div className="text-gray-400 text-sm mb-4 md:mb-0">
              © 2024 Better Auth. All rights reserved.
            </div>
            <div className="flex space-x-6 text-gray-400 text-sm">
              <a href="#" className="hover:text-white transition-colors">개인정보처리방침</a>
              <a href="#" className="hover:text-white transition-colors">서비스약관</a>
              <a href="#" className="hover:text-white transition-colors">문의하기</a>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
}
