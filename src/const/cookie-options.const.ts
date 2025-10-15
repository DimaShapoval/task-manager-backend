import { CookieTime } from "./global.const";

export const cookieTokenOptions = {
  httpOnly: true,
  sameSite: 'lax',
  secure: process.env.NODE_ENV === 'production',
  maxAge: CookieTime.REFRESH_TOKEN_TIME, // 7 days
} as const;

export const accessTokenTime = 3600 * 1000;