"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";

export default function AuthPage() {
  const router = useRouter();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [deviceId, setDeviceId] = useState("");
  const [deviceName, setDeviceName] = useState("");

  // 현재 로그인 상태 확인 (localStorage 기반)
  const [session, setSession] = useState<any>(null);
  const [isPending, setIsPending] = useState(true);

  useEffect(() => {
    const token = localStorage.getItem('token');
    const user = localStorage.getItem('user');
    
    if (token && user) {
      setSession(JSON.parse(user));
    }
    setIsPending(false);
  }, []);

  // 회원가입 함수
  const handleSignUp = async () => {
    if (!deviceId || !deviceName) {
      alert("기기 정보를 모두 입력해주세요.");
      return;
    }
    
    try {
      const response = await fetch('http://localhost:5500/common/auth/signup/local', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          email,
          password,
          deviceId,
          deviceName,
        }),
      });

      const data = await response.json();
      
      if (!response.ok) {
        alert("가입 실패: " + (data.message || '알 수 없는 오류'));
        return;
      }

      // 기기 정보를 localStorage에 저장
      localStorage.setItem('deviceInfo', JSON.stringify({ deviceId, deviceName }));
      localStorage.setItem('token', data.token); // 토큰 저장
      alert("가입 성공!");
      
    } catch (error) {
      alert("가입 실패: " + error);
    }
  };

  // 일반 로그인 함수
  const handleSignIn = async () => {
    if (!deviceId || !deviceName) {
      alert("기기 정보를 모두 입력해주세요.");
      return;
    }
    
    try {
      const response = await fetch('http://localhost:5500/common/auth/login/local', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          email,
          password,
          deviceId,
          deviceName,
        }),
      });

      const data = await response.json();
      
      if (!response.ok) {
        alert("로그인 실패: " + (data.message || '알 수 없는 오류'));
        return;
      }

      // 기기 정보와 토큰을 localStorage에 저장
      localStorage.setItem('deviceInfo', JSON.stringify({ deviceId, deviceName }));
      localStorage.setItem('token', data.token); // 토큰 저장
      localStorage.setItem('user', JSON.stringify(data.user)); // 사용자 정보 저장
      setSession(data.user); // 세션 상태 업데이트
      alert("로그인 성공!");
      
    } catch (error) {
      alert("로그인 실패: " + error);
    }
  };

  // 로그아웃 함수
  const handleSignOut = async () => {
    try {
      const token = localStorage.getItem('token');
      if (token) {
        await fetch('/common/auth/logout', {
          method: 'POST',
          headers: {
            'Authorization': `Bearer ${token}`,
            'Content-Type': 'application/json',
          },
        });
      }
    } catch (error) {
      console.error('로그아웃 오류:', error);
    } finally {
      // localStorage 클리어
      localStorage.removeItem('token');
      localStorage.removeItem('user');
      localStorage.removeItem('deviceInfo');
      setSession(null); // 세션 상태 클리어
      alert("로그아웃 되었습니다.");
    }
  };

  if (isPending) return <div className="p-10 text-white">로딩 중...</div>;

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900 flex items-center justify-center p-4">
      <div className="w-full max-w-md">
        {/* 헤더 */}
        <div className="text-center mb-8">
          <Link href="/" className="inline-flex items-center space-x-2 mb-6">
            <div className="w-10 h-10 bg-gradient-to-r from-blue-500 to-purple-600 rounded-lg flex items-center justify-center">
              <span className="text-white font-bold text-xl">B</span>
            </div>
            <span className="text-white text-xl font-bold">Better Auth</span>
          </Link>
          <h1 className="text-3xl font-bold text-white mb-2">로그인</h1>
          <p className="text-gray-400">계정에 접속하여 모든 기능을 이용하세요</p>
        </div>
        
        {/* 로그인 폼 */}
        <div className="bg-white/10 backdrop-blur-lg rounded-xl p-6 border border-white/20">
          {session ? (
            // 로그인 성공 시 보여줄 화면
            <div className="text-center">
              <div className="w-20 h-20 bg-gradient-to-r from-blue-500 to-purple-600 rounded-full flex items-center justify-center mx-auto mb-4">
                <span className="text-white text-3xl">✓</span>
              </div>
              <h2 className="text-xl font-semibold text-white mb-2">로그인 성공</h2>
              <p className="text-gray-300 mb-4">환영합니다, {session.user?.name || session.user?.email}님!</p>
              
              <div className="space-y-3">
                <Link
                  href="/mypage"
                  className="block w-full bg-gradient-to-r from-blue-500 to-purple-600 text-white py-3 rounded-lg font-semibold hover:from-blue-600 hover:to-purple-700 transition-all"
                >
                  마이페이지
                </Link>
                <Link
                  href="/payment"
                  className="block w-full bg-gradient-to-r from-green-500 to-emerald-600 text-white py-3 rounded-lg font-semibold hover:from-green-600 hover:to-emerald-700 transition-all"
                >
                  결제하기
                </Link>
                <button
                  className="w-full bg-white/10 text-white py-3 rounded-lg font-semibold hover:bg-white/20 transition-all border border-white/20"
                  onClick={handleSignOut}
                >
                  로그아웃
                </button>
              </div>
            </div>
          ) : (
            // 로그인 전 보여줄 화면
            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-300 mb-2">이메일</label>
                <input
                  type="email"
                  className="w-full px-4 py-3 bg-white/10 border border-white/20 rounded-lg text-white placeholder-gray-400 focus:outline-none focus:border-blue-500 focus:bg-white/15 transition-all"
                  placeholder="test@example.com"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                />
              </div>
              
              <div>
                <label className="block text-sm font-medium text-gray-300 mb-2">비밀번호</label>
                <input
                  type="password"
                  className="w-full px-4 py-3 bg-white/10 border border-white/20 rounded-lg text-white placeholder-gray-400 focus:outline-none focus:border-blue-500 focus:bg-white/15 transition-all"
                  placeholder="••••••••"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                />
              </div>
              
              <div>
                <label className="block text-sm font-medium text-gray-300 mb-2">기기 ID</label>
                <input
                  type="text"
                  className="w-full px-4 py-3 bg-white/10 border border-white/20 rounded-lg text-white placeholder-gray-400 focus:outline-none focus:border-blue-500 focus:bg-white/15 transition-all"
                  placeholder="fp_abcdef123456"
                  value={deviceId}
                  onChange={(e) => setDeviceId(e.target.value)}
                />
              </div>
              
              <div>
                <label className="block text-sm font-medium text-gray-300 mb-2">기기 이름</label>
                <input
                  type="text"
                  className="w-full px-4 py-3 bg-white/10 border border-white/20 rounded-lg text-white placeholder-gray-400 focus:outline-none focus:border-blue-500 focus:bg-white/15 transition-all"
                  placeholder="iPhone"
                  value={deviceName}
                  onChange={(e) => setDeviceName(e.target.value)}
                />
              </div>

              <div className="flex gap-3 pt-2">
                <button
                  className="flex-1 bg-gradient-to-r from-blue-500 to-purple-600 text-white py-3 rounded-lg font-semibold hover:from-blue-600 hover:to-purple-700 transition-all transform hover:scale-105"
                  onClick={handleSignIn}
                >
                  로그인
                </button>
                <button
                  className="flex-1 bg-white/10 text-white py-3 rounded-lg font-semibold hover:bg-white/20 transition-all border border-white/20"
                  onClick={handleSignUp}
                >
                  회원가입
                </button>
              </div>

              <div className="relative">
                <div className="absolute inset-0 flex items-center">
                  <div className="w-full border-t border-white/20"></div>
                </div>
                <div className="relative flex justify-center text-sm">
                  <span className="px-2 bg-transparent text-gray-400">또는</span>
                </div>
              </div>

              {/* 소셜 로그인 버튼들 */}
              <div className="space-y-3">
                <button
                  className="w-full bg-zinc-800 border border-zinc-700 text-white py-3 rounded-lg font-medium hover:bg-zinc-700 transition-all flex items-center justify-center gap-3"
                  onClick={() => alert('GitHub 로그인은 준비 중입니다.')}
                >
                  <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z"/>
                  </svg>
                  GitHub로 계속하기
                </button>

                <button
                  className="w-full bg-yellow-500 text-white py-3 rounded-lg font-medium hover:bg-yellow-600 transition-all flex items-center justify-center gap-3"
                  onClick={() => alert('KaKao 로그인은 준비 중입니다.')}
                >
                  <span className="text-xl">💬</span>
                  KaKao로 계속하기
                </button>
              </div>
            </div>
          )}
        </div>

        {/* 하단 링크 */}
        <div className="text-center mt-6">
          <Link
            href="/"
            className="text-gray-400 hover:text-white transition-colors text-sm"
          >
            ← 홈으로 돌아가기
          </Link>
        </div>
      </div>
    </div>
  );
}
