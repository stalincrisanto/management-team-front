import { AUTH_TOKEN_KEY } from './authConstants';

const canUseLocalStorage = (): boolean => {
  return typeof window !== 'undefined' && typeof window.localStorage !== 'undefined';
};

export const getStoredToken = (): string | null => {
  if (!canUseLocalStorage()) {
    return null;
  }

  return window.localStorage.getItem(AUTH_TOKEN_KEY);
};

export const setStoredToken = (token: string): void => {
  if (!canUseLocalStorage()) {
    return;
  }

  window.localStorage.setItem(AUTH_TOKEN_KEY, token);
};

export const removeStoredToken = (): void => {
  if (!canUseLocalStorage()) {
    return;
  }

  window.localStorage.removeItem(AUTH_TOKEN_KEY);
};
