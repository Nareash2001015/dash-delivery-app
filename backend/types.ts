import { Request } from "express";

export interface GetUserAuthInfoRequest extends Request {
  user?: string;
}

export interface LoginDetails {
  email: string;
  password: string;
}

export type UserAttributes = {
  id?: number;
  name: string;
  address: string;
  email: string;
  password: string;
  role: string;
};

export type ShipmentAttributes = {
  id?: number;
  senderName: string;
  senderAddress: string;
  recipientName: string;
  recipientAddress: string;
  packageDescription: string;
  packageWeight: string;
  shipmentStatus: string;
  userId?: number;
};