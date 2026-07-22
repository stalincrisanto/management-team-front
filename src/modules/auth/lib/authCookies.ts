import { AUTH_TOKEN_KEY } from './authConstants';

const AUTH_COOKIE_MAX_AGE_SECONDS = 24 * 60 * 60;

const canUseDocumentCookie = (): boolean => typeof document !== 'undefined';

const isHttps = (): boolean =>
  typeof window !== 'undefined' && window.location.protocol === 'https:';

export const setAuthCookie = (token: string): void => {
  if (!canUseDocumentCookie()) {
    return;
  }

  const attributes = [
    `${AUTH_TOKEN_KEY}=${encodeURIComponent(token)}`,
    'Path=/',
    `Max-Age=${AUTH_COOKIE_MAX_AGE_SECONDS}`,
    'SameSite=Lax',
  ];

  if (isHttps()) {
    attributes.push('Secure');
  }

  document.cookie = attributes.join('; ');
};

export const removeAuthCookie = (): void => {
  if (!canUseDocumentCookie()) {
    return;
  }

  const attributes = [
    `${AUTH_TOKEN_KEY}=`,
    'Path=/',
    'Max-Age=0',
    'Expires=Thu, 01 Jan 1970 00:00:00 GMT',
    'SameSite=Lax',
  ];

  if (isHttps()) {
    attributes.push('Secure');
  }

  document.cookie = attributes.join('; ');
};
