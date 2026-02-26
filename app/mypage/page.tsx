"use client";

import React, { useState } from "react";
import { authClient } from "@/app/lib/auth-client";
import { useRouter } from "next/navigation";

export default function MyPage() {
  const router = useRouter();
  const [isEditing, setIsEditing] = useState(false);
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");

  // 현재 세션 상태 가져오기
  const {
    data: session,
    isPending,
    error: sessionError,
  } = authClient.useSession();

  // 세션 데이터가 있으면 폼에 채우기
  React.useEffect(() => {
    if (session?.user) {
      setName(session.user.name || "");
      setEmail(session.user.email || "");
    }
  }, [session]);

  // 프로필 업데이트 함수
  const handleUpdateProfile = async () => {
    const { error } = await authClient.updateUser({
      name,
    });
    if (error) alert("프로필 업데이트 실패: " + error.message);
    else {
      alert("프로필이 업데이트되었습니다!");
      setIsEditing(false);
    }
  };

  // 로그아웃 함수
  const handleSignOut = async () => {
    await authClient.signOut();
    router.push("/");
  };

  if (isPending) return <div className="p-10 text-white">로딩 중...</div>;

  // 로그인하지 않은 경우 메인페이지로 리디렉션
  if (!session) {
    return (
      <div className="p-10 text-white">
        <div className="max-w-md mx-auto">
          <h1 className="text-2xl font-bold mb-4">마이페이지</h1>
          <div className="bg-gray-800 p-6 rounded-lg text-center">
            <p className="mb-4">로그인이 필요한 페이지입니다.</p>
            <button
              className="bg-blue-500 text-white px-4 py-2 rounded"
              onClick={() => router.push("/")}
            >
              로그인 페이지로 이동
            </button>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="p-10 text-white">
      <div className="max-w-md mx-auto">
        <h1 className="text-2xl font-bold mb-6">마이페이지</h1>
        
        <div className="bg-gray-800 p-6 rounded-lg">
          {/* 프로필 이미지 */}
          <div className="flex justify-center mb-6">
            {session.user.image ? (
              <img
                src={session.user.image}
                alt="profile"
                className="w-24 h-24 rounded-full border-4 border-gray-600"
              />
            ) : (
              <div className="w-24 h-24 rounded-full bg-gray-600 flex items-center justify-center text-2xl">
                {session.user.name?.charAt(0) || "U"}
              </div>
            )}
          </div>

          {/* 사용자 정보 */}
          {isEditing ? (
            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium mb-1">이름</label>
                <input
                  type="text"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  className="w-full p-2 rounded bg-gray-700 text-white border border-gray-600 focus:border-blue-500 focus:outline-none"
                />
              </div>
              <div>
                <label className="block text-sm font-medium mb-1">이메일</label>
                <input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="w-full p-2 rounded bg-gray-700 text-white border border-gray-600 focus:border-blue-500 focus:outline-none"
                />
              </div>
              <div className="flex gap-2">
                <button
                  onClick={handleUpdateProfile}
                  className="bg-green-500 text-white px-4 py-2 rounded flex-1"
                >
                  저장
                </button>
                <button
                  onClick={() => setIsEditing(false)}
                  className="bg-gray-600 text-white px-4 py-2 rounded flex-1"
                >
                  취소
                </button>
              </div>
            </div>
          ) : (
            <div className="space-y-4">
              <div>
                <p className="text-sm text-gray-400">이름</p>
                <p className="text-lg">{session.user.name}</p>
              </div>
              <div>
                <p className="text-sm text-gray-400">이메일</p>
                <p className="text-lg">{session.user.email}</p>
              </div>
              <div>
                <p className="text-sm text-gray-400">로그인 방식</p>
                <p className="text-lg">이메일</p>
              </div>
              <div>
                <p className="text-sm text-gray-400">가입일</p>
                <p className="text-lg">
                  {session.user.createdAt 
                    ? new Date(session.user.createdAt).toLocaleDateString("ko-KR")
                    : "알 수 없음"
                  }
                </p>
              </div>
              <div className="flex gap-2 pt-4">
                <button
                  onClick={() => setIsEditing(true)}
                  className="bg-blue-500 text-white px-4 py-2 rounded flex-1"
                >
                  프로필 편집
                </button>
                <button
                  onClick={handleSignOut}
                  className="bg-red-500 text-white px-4 py-2 rounded flex-1"
                >
                  로그아웃
                </button>
              </div>
            </div>
          )}
        </div>

        {/* 추가 정보 */}
        <div className="mt-6 bg-gray-800 p-6 rounded-lg">
          <h2 className="text-lg font-semibold mb-4 text-blue-400">📊 계정 정보</h2>
          <div className="space-y-3 text-sm">
            <div className="flex justify-between">
              <span className="text-gray-400">사용자 ID</span>
              <span>{session.user.id}</span>
            </div>
            <div className="flex justify-between">
              <span className="text-gray-400">계정 상태</span>
              <span className="text-green-400">활성</span>
            </div>
            <div className="flex justify-between">
              <span className="text-gray-400">마지막 로그인</span>
              <span>방금 전</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
