/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable @typescript-eslint/no-unused-vars */
import ApiManager from "./ApiManager";
import { AuthenticatedStatus, LoginDetails, RegistrationDetails, Token } from "../types";
import axios from "axios";

export const loginApi = async (loginDetails: LoginDetails): Promise<Token> => {
  try {
    const response = await ApiManager.post('/auth/login', loginDetails);
    return response.data;
  } catch (error) {
    if (axios.isAxiosError(error) && error.response) {
      console.error(`Error in loginApi: ${error.response.data.message}`);
      throw new Error(error.response.data.message);
    } else {
      console.error(`Error in loginApi: ${error}`);
      throw error;
    }
  }
};

export const registrationApi = async (registrationDetails: RegistrationDetails): Promise<Token> => {
  try {
    const response = await ApiManager.post('/auth/register', registrationDetails);
    return response.data;
  } catch (error) {
    if (axios.isAxiosError(error) && error.response) {
      console.error(`Error in loginApi: ${error.response.data.message}`);
      throw new Error(error.response.data.message);
    } else {
      console.error(`Error in loginApi: ${error}`);
      throw error;
    }
  }
};

export const isAuthenticateApi = async (token: string): Promise<AuthenticatedStatus> => {
  try {
    const response = await ApiManager.get("/auth/is-verify", {
      headers: {
        Authorization: "Bearer " + token,
      },
    });
    return response.data;
  } catch (error) {
    if (axios.isAxiosError(error) && error.response) {
      console.error(`Error in isAuthenticatedApi: ${error.response.status}`);
      throw new Error(String(error.response.status));
    } else {
      console.error(`Error in isAuthenticatedApi: ${error}`);
      throw error;
    }
  }
};
