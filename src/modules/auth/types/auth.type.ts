export type UserRole = 'ADMIN' | 'EDITOR' | 'VIEWER';

export type AuthUser = {
  id: string;
  fullName: string;
  username: string;
  role: UserRole;
};

export type LoginRequest = {
  username: string;
  password: string;
};

export type LoginResponse = {
  token: string;
  user: AuthUser;
};

export type UserMeResponse = AuthUser;
