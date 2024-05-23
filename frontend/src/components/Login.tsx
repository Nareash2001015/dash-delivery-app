/* eslint-disable @typescript-eslint/no-var-requires */
/* eslint-disable prefer-const */
/* eslint-disable @typescript-eslint/no-unused-vars */
import React, { useState, useContext } from "react";
import {
  FormControl,
  FormLabel,
  Input,
  Button,
  useToast,
} from "@chakra-ui/react";
import validator from "validator";
import { AuthContext } from "../provider/AuthProvider";
import { LoginProps } from "../types";

const Login: React.FC<LoginProps> = ({ setIsLoginPage }) => {
  const [email, setEmail] = useState<string>("");
  const [password, setPassword] = useState<string>("");
  const [emailError, setEmailError] = useState<string>("Email is required");
  const [passwordError, setPasswordError] = useState<string>(
    "Password is required"
  );
  const [emailErrorFlag, setEmailErrorFlag] = useState<boolean>(true);
  const [passwordErrorFlag, setPasswordErrorFlag] = useState<boolean>(true);

  const authContext = useContext(AuthContext);
  const toast = useToast();

  const login = authContext.login;

  const handleLogin = async () => {
    try {
      await login(email, password);
    } catch (error) {
      let errorMessage: string;
      if (error instanceof Error) {
        errorMessage = error.message;
      } else {
        errorMessage = String(error);
      }
      toast({
        title: errorMessage,
        position: "top-right",
        status: "error",
        isClosable: true,
      });
    }
  };

  const handleEmailChange = (e: {
    target: { value: React.SetStateAction<string> };
  }) => {
    setEmail(e.target.value);
    if (validator.isEmail(email)) {
      setEmailError("");
      setEmailErrorFlag(false);
    } else {
      setEmailErrorFlag(true);
      setEmailError("Enter valid Email!");
    }
  };

  const handlePasswordChange = (e: {
    target: { value: React.SetStateAction<string> };
  }) => {
    setPassword(e.target.value);
    if (password.length < 8) {
      setPasswordError("Password should be at least 8 characters long");
    }
    if (!/\d/.test(password)) {
      setPasswordError("Add at least one number");
    }
    if (!/[A-Z]/.test(password) || !/[a-z]/.test(password)) {
      setPasswordError("Include both upper and lower case letters");
    }
    if (!/[^A-Za-z0-9]/.test(password)) {
      setPasswordError("Include at least one special character");
    }
    if (
      password.length > 8 &&
      /\d/.test(password) &&
      (/[A-Z]/.test(password) || /[a-z]/.test(password)) &&
      /[^A-Za-z0-9]/.test(password)
    ) {
      setPasswordError("");
      setPasswordErrorFlag(false);
    } else {
      setPasswordErrorFlag(true);
    }
  };
  return (
    <div className="flex justify-center items-center h-screen bg-delivery-image bg-cover bg-no-repeat">
      <div className="flex w-2/3 flex-row rounded-3xl bg-gray-100 bg-opacity-45">
        <div className="flex flex-col items-center rounded-3xl w-2/5">
          <div className="bg-dash-delivery-logo rounded-2x bg-cover mt-20 h-32 w-40"></div>
        </div>
        <div className=" p-5  w-3/5 ">
          <div>
            <p className="font-semibold text-3xl my-5">Login</p>
            <p className="font-medium text-md my-5">
              Enter your email address and password to login to your account
            </p>
          </div>
          <div>
            <FormControl>
              <FormLabel>Email</FormLabel>
              <Input type="email" value={email} onChange={handleEmailChange} />
              <p className="text-red-600">{emailError}</p>
              <FormLabel>Password</FormLabel>
              <Input
                type="password"
                value={password}
                onChange={handlePasswordChange}
              />
              <p className="text-red-600">{passwordError}</p>
              <Button
                size="md"
                className="w-full my-10"
                colorScheme="blue"
                isDisabled={emailErrorFlag || passwordErrorFlag}
                onClick={handleLogin}
              >
                Login
              </Button>
            </FormControl>
            <p>
              Don't have an account ?{" "}
              <label
                className="text-blue-600 font-bold"
                onClick={() => setIsLoginPage(false)}
              >
                Sign up
              </label>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Login;
