import { removeAuthCookie, setAuthCookie } from './authCookies';
import { removeStoredToken, setStoredToken } from './authStorage';

export const persistAuthSession = (token: string): void => {
  setStoredToken(token);
  setAuthCookie(token);
};

export const clearAuthSession = (): void => {
  removeStoredToken();
  removeAuthCookie();
};
