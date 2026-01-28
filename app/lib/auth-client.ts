import { createAuthClient } from "better-auth/react"; // React 전용 클라이언트

export const authClient = createAuthClient({
  baseURL: "http://127.0.0.1:5500", // NestJS 서버 주소 (포트 확인!)
});
