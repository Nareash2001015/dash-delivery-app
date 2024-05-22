/* eslint-disable @typescript-eslint/no-unused-vars */
import ApiManager from "./ApiManager";
import { LoginDetails } from "../types";

export const loginApi = async (loginDetails: LoginDetails) => {
  try {
    const response = await ApiManager.post("/auth/login", loginDetails, {
      headers: {
        "Content-Type": "application/json",
      },
    });
    console.log(response);
  } catch (error) {
    console.log(`Error in loginApi : ${error}`);
  }
};

export const isAuthenticateApi = async (token: string) => {
  try {
    const response = await ApiManager.get("/auth/is-verify", {
      headers: {
        "Content-Type": "application/json",
        Authorization: "Bearer " + token,
      },
    });
    console.log(response);
  } catch (error) {
    console.log(`Error in isAuthenticatedApi : ${error}`);
  }
};
