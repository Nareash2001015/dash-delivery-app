import { ReactNode } from "react";

/* eslint-disable @typescript-eslint/no-unused-vars */
export interface LoginDetails {
  email: string;
  password: string;
}

export interface AuthContextInterface {
  token: string;
  logout: () => void;
  login: (email: string, password: string) => Promise<void>;
  isAuthenticated: boolean;
  register: (
    name: string,
    email: string,
    password: string,
    address: string
  ) => Promise<void>;
  user: User;
  setIsAuthenticated: React.Dispatch<React.SetStateAction<boolean>>;
  setToken: React.Dispatch<React.SetStateAction<string>>;
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

export interface UserProps {
  user: User;
  token: string;
}

export interface User {
  userId: number;
  role: string;
}

export interface JwtPayload {
  user: number;
  role: string;
  iat: string;
  exp: number;
}

export interface RegistrationDetails {
  name: string;
  email: string;
  password: string;
  address: string;
  role: string;
}

export interface UserInfo {
  id: number;
  name: string;
  address: string;
}

export interface ShipmentInfo {
  id?: string;
  userId?: number;
  recipientName?: string;
  recipientAddress?: string;
  packageDescription?: string;
  packageWeight?: string;
  shipmentStatus?: string;
  user?: SenderInfo
}

export interface UserShipmentInfo {
  id: string;
  recipientName: string;
  recipientAddress: string;
  packageDescription: string;
  packageWeight: string;
}

export interface CreateShipmentModelProps {
  setIsOpen: React.Dispatch<React.SetStateAction<boolean>>;
  isOpen: boolean;
  userInfo: UserInfo;
  setShipmentInfo: React.Dispatch<React.SetStateAction<ShipmentInfo[]>>;
}

export interface UpdateShipmentModelProps {
  setIsOpen: React.Dispatch<React.SetStateAction<boolean>>;
  isOpen: boolean;
  setShipmentInfo: React.Dispatch<React.SetStateAction<ShipmentInfo[]>>;
  shipment: UserShipmentInfo;
}

export interface SenderInfo{
  name: string;
  address: string;
}

export interface ShipmentStatus {
  id: string,
  status: string
}