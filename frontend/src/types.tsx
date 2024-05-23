import { ReactNode } from "react";

/* eslint-disable @typescript-eslint/no-unused-vars */
export interface LoginDetails {
  email: string;
  password: string;
}

export interface AuthContextInterface{
  token: string,
  logout: () => void;
  login: (email: string, password: string) => Promise<void>;
  isAuthenticated: boolean;
}

export interface Props {
    children?: ReactNode;
}

export interface Token {
  token: string;
}

export interface AuthenticatedStatus {
  authenticated: boolean;
}

export interface LoginProps {
  setIsLoginPage: React.Dispatch<React.SetStateAction<boolean>>;
}

export interface ToastProps {
  title: string;
}

export interface User {
  userId: number;
  role: string;
}

export interface JwtPayload {
  user: number,
  role: string;
  iat: string;
  exp: number;
}