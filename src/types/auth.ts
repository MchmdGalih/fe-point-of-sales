export type UserRole = "ADMIN" | "CASHIER";

export interface LoginPayload {
  email: string;
  password: string;
}

export interface RegisterPayload {
  username: string;
  email: string;
  password: string;
}

export interface LoginResponse extends Users {
  accessToken: string;
  refreshToken: string;
}

export type RegisterResponse = Users;

export interface Users {
  id: string;
  username: string;
  email: string;
  password: string;
  role: UserRole;
}
