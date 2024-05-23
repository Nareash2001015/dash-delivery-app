import axios from "axios";
import { UserInfo } from "../types";
import ApiManager from "./ApiManager";

export const getUserInfoApi = async (userId: number, token: string): Promise<UserInfo> => {
    try {
      const response = await ApiManager.get(`/users/${userId}`, {
        headers: {
          Authorization: "Bearer " + token,
        },
      });
      return response.data;
    } catch (error) {
      if (axios.isAxiosError(error) && error.response) {
        console.error(`Error in getUserInfoApi: ${error.response.data.message}`);
        throw new Error(error.response.data.message);
      } else {
        console.error(`Error in getUserInfoApi: ${error}`);
        throw error;
      }
    }
  };