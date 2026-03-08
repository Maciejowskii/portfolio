import { cookies } from "next/headers";

const SESSION_COOKIE = "admin_session";
const SESSION_VALUE = "authenticated";
const MAX_AGE = 60 * 60 * 24 * 7; // 7 days

export function verifyPassword(password: string): boolean {
  return password === process.env.ADMIN_PASSWORD;
}

export async function createSession() {
  const cookieStore = await cookies();
  cookieStore.set(SESSION_COOKIE, SESSION_VALUE, {
    httpOnly: true,
    secure: process.env.NODE_ENV === "production",
    sameSite: "lax",
    maxAge: MAX_AGE,
    path: "/",
  });
}

export async function destroySession() {
  const cookieStore = await cookies();
  cookieStore.delete(SESSION_COOKIE);
}

export async function isAuthenticated(): Promise<boolean> {
  const cookieStore = await cookies();
  return cookieStore.get(SESSION_COOKIE)?.value === SESSION_VALUE;
}
