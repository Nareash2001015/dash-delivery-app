/* eslint-disable @typescript-eslint/no-unused-vars */
import { createContext, useEffect, useState, ReactNode } from "react";
import { LoginDetails } from "../types";
import { isAuthenticateApi, loginApi } from "../apis/AuthApi";
import { AuthContextInterface, Props } from "../types";

export const AuthContext = createContext<AuthContextInterface | null>(null);
export const AuthProvider = ({ children }: Props) => {
  const [authenticated, setAuthenticated] = useState<boolean>(false);
  const [token, setToken] = useState<string>("");
  useEffect(() => {
    async function callAuthenticatedApi() {
      try {
        const response = await isAuthenticateApi(token);
        console.log(response);
      } catch (error) {
        console.log(`Error in isAuthenticatedApi : ${error}`);
      }
    }
    callAuthenticatedApi();
  }, []);

  const login = async (email: string, password: string) => {
    try {
      const loginDetails: LoginDetails = { email, password };
      const response = await loginApi(loginDetails);
      console.log(response);
    } catch (error) {
      console.log(`Error in login function : ${error}`);
    }
  };

  const logout = () => {
    try {
      setToken("");
      setAuthenticated(false);
    } catch (error) {
      console.log(`Error in login function : ${error}`);
    }
  };

  return <AuthContext.Provider value={token}>{children}</AuthContext.Provider>;
};
