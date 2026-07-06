import { AUTH_TOKEN_KEY } from "./authConstants";

const canUseDocumentCookie = (): boolean => {
  return typeof document !== 'undefined';
};

const getCookieSecureAttribute = (): string => {
  if (typeof window === 'undefined') {
    return '';
  }

  return window.location.protocol === 'https:' ? '; Secure' : '';
};

export const setAuthCookie = (token: string): void => {
  if (!canUseDocumentCookie()) {
    return;
  }

  const secure = getCookieSecureAttribute();

  document.cookie = [
    `${AUTH_TOKEN_KEY}=${encodeURIComponent(token)}`,
    'Path=/',
    'SameSite=Lax',
    secure,
  ]
    .filter(Boolean)
    .join('; ');
}

export const removeAuthCookie = (): void => {
  if (!canUseDocumentCookie()) {
    return;
  }

  document.cookie = [
    `${AUTH_TOKEN_KEY}=`,
    'Path=/',
    'Max-Age=0',
    'SameSite=Lax',
  ].join('; ');
}