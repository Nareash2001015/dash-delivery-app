/* eslint-disable prefer-const */
/* eslint-disable @typescript-eslint/no-unused-vars */
import React, { useState, useContext } from "react";
import {
  FormControl,
  FormLabel,
  Input,
  Button,
  Textarea,
  useToast,
} from "@chakra-ui/react";
import validator from "validator";
import { AuthContext } from "../provider/AuthProvider";
import { LoginProps } from "../types";

const Register: React.FC<LoginProps> = ({ setIsLoginPage }) => {
  const [email, setEmail] = useState<string>("");
  const [password, setPassword] = useState<string>("");
  const [address, setAddress] = useState<string>("");
  const [name, setName] = useState<string>("");
  const [confirmPassword, setConfirmPassword] = useState<string>("");

  const [emailError, setEmailError] = useState<string>("Email is required");
  const [passwordError, setPasswordError] = useState<string>(
    "Password is required"
  );
  const [nameError, setNameError] = useState<string>("Name is required");
  const [confirmPasswordError, setConfirmPasswordError] = useState<string>(
    "Password is required"
  );
  const [addressError, setAddressError] = useState<string>(
    "Address is required"
  );

  const [emailErrorFlag, setEmailErrorFlag] = useState<boolean>(true);
  const [passwordErrorFlag, setPasswordErrorFlag] = useState<boolean>(true);
  const [nameErrorFlag, setNameErrorFlag] = useState<boolean>(true);
  const [addressErrorFlag, setAddressErrorFlag] = useState<boolean>(true);
  const [confirmPasswordErrorFlag, setConfirmPasswordErrorFlag] =
    useState<boolean>(true);

  const authContext = useContext(AuthContext);
  const toast = useToast();
  const register = authContext.register;

  const handleRegister = async () => {
    try {
      await register(name, email, password, address);
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

  const handleNameChange = (e: {
    target: { value: React.SetStateAction<string> };
  }) => {
    setName(e.target.value);
    if (name.length < 3) {
      setNameError("Name should be at least 3 characters long");
      setNameErrorFlag(true);
    } else {
      setNameErrorFlag(false);
      setNameError("");
    }
  };

  const handleAddressChange = (e: {
    target: { value: React.SetStateAction<string> };
  }) => {
    setAddress(e.target.value);
    if (address.length < 8) {
      setAddressError("Address should be at least 8 characters long");
      setAddressErrorFlag(true);
    } else {
      setAddressErrorFlag(false);
      setAddressError("");
    }
  };

  const handleConfirmPasswordChange = (e: {
    target: { value: React.SetStateAction<string> };
  }) => {
    setConfirmPassword(e.target.value);
    if (confirmPassword.length < 8) {
      setConfirmPasswordError("Password should be at least 8 characters long");
    }
    if (!/\d/.test(confirmPassword)) {
      setConfirmPasswordError("Add at least one number");
    }
    if (!/[A-Z]/.test(confirmPassword) || !/[a-z]/.test(confirmPassword)) {
      setConfirmPasswordError("Include both upper and lower case letters");
    }
    if (!/[^A-Za-z0-9]/.test(confirmPassword)) {
      setConfirmPasswordError("Include at least one special character");
    }
    if (password === confirmPassword) {
      setConfirmPasswordError("passwords are not matching");
    }
    if (
      confirmPassword.length > 8 &&
      /\d/.test(confirmPassword) &&
      (/[A-Z]/.test(confirmPassword) || /[a-z]/.test(confirmPassword)) &&
      /[^A-Za-z0-9]/.test(confirmPassword) &&
      password !== confirmPassword
    ) {
      setConfirmPasswordError("");
      setConfirmPasswordErrorFlag(false);
    } else {
      setConfirmPasswordErrorFlag(true);
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
      <div className="flex h-2/3 w-2/3 flex-row rounded-3xl bg-gray-100 bg-opacity-45">
        <div className="flex flex-col items-center rounded-3xl w-2/5 ">
          <div className="bg-dash-delivery-logo bg-cover mt-20 h-32  w-40"></div>
        </div>
        <div className=" p-5 overflow-scroll w-3/5 ">
          <div>
            <p className="font-semibold text-3xl my-5">Get started</p>
            <p className="font-medium text-md my-5">
              Enter your email address and password to login to your account
            </p>
          </div>
          <div>
            <FormControl>
              <FormLabel>Name</FormLabel>
              <Input type="text" value={name} onChange={handleNameChange} />
              <p className="text-red-600">{nameError}</p>
              <FormLabel>Address</FormLabel>
              <Textarea
                value={address}
                onChange={handleAddressChange}
                placeholder="Type your address"
                size="sm"
              />
              <p className="text-red-600">{addressError}</p>
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
              <FormLabel>Confirm password</FormLabel>
              <Input
                type="password"
                value={confirmPassword}
                onChange={handleConfirmPasswordChange}
              />
              <p className="text-red-600">{confirmPasswordError}</p>
              <Button
                size="md"
                className="w-full my-10"
                colorScheme="blue"
                isDisabled={
                  emailErrorFlag ||
                  passwordErrorFlag ||
                  nameErrorFlag ||
                  addressErrorFlag ||
                  confirmPasswordErrorFlag
                }
                onClick={handleRegister}
              >
                Register
              </Button>
            </FormControl>
            <p>
              Already have an account?{" "}
              <label
                className="text-blue-600 font-bold"
                onClick={() => setIsLoginPage(true)}
              >
                Login
              </label>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Register;
