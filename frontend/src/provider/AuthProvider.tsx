/* eslint-disable react-hooks/rules-of-hooks */
/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable @typescript-eslint/no-unused-vars */
import { createContext, useEffect, useState } from "react";
import {
  JwtPayload,
  LoginDetails,
  RegistrationDetails,
  Token,
  User,
} from "../types";
import { isAuthenticateApi, loginApi, registrationApi } from "../apis/AuthApi";
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
  register: () => {
    throw new Error("register function not implemented");
  },
  user: {
    userId: 0,
    role: "",
  },
  setIsAuthenticated: function (): void {
    throw new Error("Function not implemented.");
  },
  setToken: function (): void {
    throw new Error("Function not implemented.");
  }
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
          setIsAuthenticated(true);
          extractTokenPayload(availableToken);
        } else {
          navigate("/home");
        }
      } catch (error) {
        if (error instanceof Error) {
          if (error.message === "403" || error.message === "Invalid token") {
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

  function extractTokenPayload(token: string): void {
    const payload: string = token.split(".")[1];
    const payloadJson: JwtPayload = JSON.parse(atob(payload));
    setUser({
      userId: payloadJson.user,
      role: payloadJson.role,
    });
  }

  const login = async (email: string, password: string): Promise<void> => {
    try {
      const loginDetails: LoginDetails = { email, password };
      const response: Token = await loginApi(loginDetails);
      setToken(response.token);
      localStorage.setItem("token", response.token);
      navigate("/dashboard");
      toast({
        title: "Login successful",
        position: "top-right",
        status: "success",
        isClosable: true,
      });
      setIsAuthenticated(true);
      extractTokenPayload(response.token);
    } catch (error) {
      console.log(`Error in login function : ${error}`);
      throw error;
    }
  };

  const logout = async (): Promise<void> => {
    try {
      console.log("Reached code")
      setToken("");
      localStorage.removeItem("token");
      setIsAuthenticated(false);
      toast({
        title: "Logout successful",
        position: "top-right",
        status: "success",
        isClosable: true,
      });
    } catch (error) {
      console.log(`Error in login function : ${error}`);
    }
  };

  const register = async (
    name: string,
    email: string,
    password: string,
    address: string
  ) => {
    try {
      const role: string = "customer";
      const registrationDetails: RegistrationDetails = {
        name,
        email,
        password,
        address,
        role,
      };
      const response: Token = await registrationApi(registrationDetails);
      setToken(response.token);
      localStorage.setItem("token", response.token);
      navigate("/dashboard");
      toast({
        title: "Registration complete",
        position: "top-right",
        status: "success",
        isClosable: true,
      });
      setIsAuthenticated(true);
      extractTokenPayload(response.token);
    } catch (error) {
      console.log(`Error in login function : ${error}`);
      throw error;
    }
  };

  const value: AuthContextInterface = {
    token,
    login,
    logout,
    isAuthenticated,
    register,
    user,
    setIsAuthenticated,
    setToken
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};
