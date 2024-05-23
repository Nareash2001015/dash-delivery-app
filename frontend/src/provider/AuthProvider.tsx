/* eslint-disable react-hooks/rules-of-hooks */
/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable @typescript-eslint/no-unused-vars */
import { createContext, useEffect, useState } from "react";
import { JwtPayload, LoginDetails, Token, User } from "../types";
import { isAuthenticateApi, loginApi } from "../apis/AuthApi";
import { AuthContextInterface, Props } from "../types";
import { useNavigate } from "react-router-dom";
import { useToast } from "@chakra-ui/react";

const defaultAuthContext: AuthContextInterface = {
  login: async () => {
    throw new Error("login function not implemented");
  },
  logout: () => {
    throw new Error("logout function not implemented");
  },
  token: "",
  isAuthenticated: false,
};

export const AuthContext =
  createContext<AuthContextInterface>(defaultAuthContext);

export const AuthProvider = ({ children }: Props) => {
  const navigate = useNavigate();
  const [token, setToken] = useState<string>("");
  const [user, setUser] = useState<User>({
    userId: 0,
    role: "",
  });
  const [isAuthenticated, setIsAuthenticated] = useState<boolean>(false);
  const toast = useToast();
  useEffect(() => {
    async function fetchAuthenticationInfo() {
      try {
        const availableToken: string | null = localStorage.getItem("token");
        if (availableToken != null) {
          setToken(availableToken);
          await isAuthenticateApi(availableToken);
          extractTokenPayload(availableToken);
        } else {
          navigate("/home");
        }
      } catch (error) {
        if (error instanceof Error) {
          if (error.message === "403") {
            localStorage.removeItem("token");
            setToken("");
            setIsAuthenticated(false);
            navigate("/home");
            toast({
              title: "Session expired",
              position: "top-right",
              status: "error",
              isClosable: true,
            });
          }
        }
      }
    }
    fetchAuthenticationInfo();
  }, []);

  function extractTokenPayload(token: string): User {
    const payload: string = token.split(".")[1];
    const payloadJson: JwtPayload = JSON.parse(atob(payload));
    return {
      userId: payloadJson.user,
      role: payloadJson.role,
    };
  }

  const login = async (email: string, password: string): Promise<void> => {
    try {
      const loginDetails: LoginDetails = { email, password };
      const response: Token = await loginApi(loginDetails);
      setToken(response.token);
      localStorage.setItem("token", response.token);
      navigate("/dashboard");
      setIsAuthenticated(true);
      extractTokenPayload(response.token);
    } catch (error) {
      console.log(`Error in login function : ${error}`);
      throw error;
    }
  };

  const logout = (): void => {
    try {
      setToken("");
      localStorage.removeItem("token");
      setIsAuthenticated(false);
    } catch (error) {
      console.log(`Error in login function : ${error}`);
    }
  };

  const value: AuthContextInterface = {
    token,
    login,
    logout,
    isAuthenticated,
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};
