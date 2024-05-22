/* eslint-disable @typescript-eslint/no-unused-vars */
import React, { useState } from "react";
import {
  FormControl,
  FormLabel,
  FormErrorMessage,
  FormHelperText,
  Input,
  Button,
} from "@chakra-ui/react";

interface LoginProps {
  setIsLoginPage: React.Dispatch<React.SetStateAction<boolean>>;
}

const Login: React.FC<LoginProps> = ({ setIsLoginPage }) => {
  const [input, setInput] = useState("");

  const handleInputChange = (e: { target: { value: React.SetStateAction<string>; }; }) => setInput(e.target.value);

  const isError = input === "";
  return (
    <div className="flex justify-center items-center h-screen bg-delivery-image bg-cover bg-no-repeat">
      <div className="flex w-2/3 flex-row rounded-3xl bg-gray-100">
        <div className="flex flex-col items-center rounded-3xl w-2/5  bg-gradient-to-l from-gray-100 to-blue-200">
          <div className="  bg-dash-delivery-logo bg-cover mt-10 h-40 w-60 "></div>
          <div className="m-5 text-sm text-blue-950">
            Track your parcels in real-time and ensure secure delivery every
            time !!!
          </div>
        </div>
        <div className=" p-5  w-3/5 ">
          <div>
            <p className="font-semibold text-3xl my-5">Get Started</p>
            <p className="font-medium text-md my-5">
              Enter your email address and password to login to your account
            </p>
          </div>
          <div>
            <FormControl isInvalid={isError}>
              <FormLabel>Email</FormLabel>
              <Input type="email" value={input} onChange={handleInputChange} />
              {!isError ? (
                <FormHelperText>
                  Enter the email you'd like to receive the newsletter on.
                </FormHelperText>
              ) : (
                <FormErrorMessage>Email is required.</FormErrorMessage>
              )}
              <FormLabel>Password</FormLabel>
              <Input
                type="password"
                value={input}
                onChange={handleInputChange}
              />
              {!isError ? (
                <FormHelperText>
                  Enter the email you'd like to receive the newsletter on.
                </FormHelperText>
              ) : (
                <FormErrorMessage>Email is required.</FormErrorMessage>
              )}
              <Button size="md" className="w-full my-5" colorScheme="blue">
                Login
              </Button>
            </FormControl>
            <p>
              Already have an account?{" "}
              <label className="text-blue-600 font-bold" onClick={() => setIsLoginPage(false)}>Login</label>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Login;
