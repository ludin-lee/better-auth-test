"use client";

import { useState } from "react";
import { authClient } from "@/app/lib/auth-client";
import Link from "next/link";

export default function AuthTest() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [name, setName] = useState("");

  // 현재 세션 상태 가져오기 (로그인 여부 확인용)
  const {
    data: session,
    isPending,
    error: sessionError,
  } = authClient.useSession();

  // 회원가입 함수
  const handleSignUp = async () => {
    const { data, error } = await authClient.signUp.email({
      email,
      password,
      name,
    });
    if (error) alert("가입 실패: " + error.message);
    else alert("가입 성공!");
  };

  // 일반 로그인 함수
  const handleSignIn = async () => {
    const { data, error } = await authClient.signIn.email({
      email,
      password,
    });
    if (error) alert("로그인 실패: " + error.message);
    else alert("로그인 성공!");
  };

  // 🚀 깃허브 로그인 함수
  const handleGitHubSignIn = async () => {
    await authClient.signIn.social({
      provider: "github",
      callbackURL: "/",
    });
  };

  const handleKaKaoSignIn = async () => {
    await authClient.signIn.social({
      provider: "kakao",
      callbackURL: "/",
    });
  };

  // 로그아웃 함수
  const handleSignOut = async () => {
    await authClient.signOut();
  };

  if (isPending) return <div className="p-10 text-white">로딩 중...</div>;

  return (
    <div className="p-10 flex flex-col gap-4 max-w-md text-white">
      <h1 className="text-2xl font-bold">Better Auth 테스트</h1>
      
      <div className="bg-gray-800 p-4 rounded-lg">
        <h2 className="text-lg font-semibold mb-2 text-blue-400">🔐 제공 기능</h2>
        <div className="space-y-2 text-sm">
          <p className="flex items-start gap-2">
            <span className="text-green-400">✓</span>
            <span><strong>이메일 회원가입</strong> - 이름, 이메일, 비밀번호로 간편한 계정 생성</span>
          </p>
          <p className="flex items-start gap-2">
            <span className="text-green-400">✓</span>
            <span><strong>이메일 로그인</strong> - 이메일과 비밀번호로 안전한 인증</span>
          </p>
          <p className="flex items-start gap-2">
            <span className="text-green-400">✓</span>
            <span><strong>소셜 로그인</strong> - GitHub, KaKao 계정으로 빠른 로그인</span>
          </p>
          <p className="flex items-start gap-2">
            <span className="text-green-400">✓</span>
            <span><strong>세션 관리</strong> - 자동 세션 유지 및 상태 관리</span>
          </p>
          <p className="flex items-start gap-2">
            <span className="text-green-400">✓</span>
            <span><strong>프로필 정보</strong> - 사용자 이름, 이메일, 프로필 이미지 표시</span>
          </p>
          <p className="flex items-start gap-2">
            <span className="text-green-400">✓</span>
            <span><strong>안전한 로그아웃</strong> - 세션 안전 종료</span>
          </p>
        </div>
        
        <div className="mt-3 pt-3 border-t border-gray-700">
          <p className="text-xs text-gray-400">
            <strong>Better Auth</strong> 기반의 현대적 인증 시스템 테스트 페이지입니다.
            다양한 로그인 방식을 지원하며 안전하고 빠른 사용자 인증을 제공합니다.
          </p>
        </div>
      </div>

      {session ? (
        // 로그인 성공 시 보여줄 화면
        <div className="border p-4 rounded bg-gray-800 flex flex-col gap-2">
          <p className="text-green-400 font-bold">✅ 로그인 됨</p>
          {session.user.image && (
            <img
              src={session.user.image}
              alt="profile"
              className="w-16 h-16 rounded-full"
            />
          )}
          <p>이름: {session.user.name}</p>
          <p>이메일: {session.user.email}</p>
          <div className="flex gap-2 mt-4">
            <Link
              href="/mypage"
              className="bg-blue-500 text-white p-2 rounded flex-1 text-center hover:bg-blue-600 transition-colors"
            >
              마이페이지
            </Link>
            <button
              className="bg-red-500 text-white p-2 rounded flex-1"
              onClick={handleSignOut}
            >
              로그아웃
            </button>
          </div>
        </div>
      ) : (
        // 로그인 전 보여줄 화면
        <>
          <input
            className="border p-2 text-black"
            placeholder="이름"
            value={name}
            onChange={(e) => setName(e.target.value)}
          />
          <input
            className="border p-2 text-black"
            placeholder="이메일"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
          <input
            className="border p-2 text-black"
            type="password"
            placeholder="비밀번호"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />

          <div className="flex flex-col gap-2">
            <div className="flex gap-2">
              <button
                className="bg-blue-500 p-2 flex-1 rounded"
                onClick={handleSignUp}
              >
                회원가입
              </button>
              <button
                className="bg-green-500 p-2 flex-1 rounded"
                onClick={handleSignIn}
              >
                로그인
              </button>
            </div>

            <hr className="my-2 border-gray-600" />

            {/* 🚀 깃허브 로그인 버튼 */}
            <button
              className="bg-zinc-900 border border-zinc-700 p-2 rounded flex items-center justify-center gap-2 hover:bg-zinc-800 transition-colors"
              onClick={handleGitHubSignIn}
            >
              <svg className="w-5 h-5 fill-current" viewBox="0 0 24 24">
                <path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z" />
              </svg>
              GitHub로 계속하기
            </button>

            <button
              className="bg-zinc-900 border border-zinc-700 p-2 rounded flex items-center justify-center gap-2 hover:bg-zinc-800 transition-colors"
              onClick={handleKaKaoSignIn}
            >
              <svg className="w-5 h-5 fill-current" viewBox="0 0 24 24">
                <path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z" />
              </svg>
              KaKao로 계속하기
            </button>
          </div>
        </>
      )}
    </div>
  );
}
