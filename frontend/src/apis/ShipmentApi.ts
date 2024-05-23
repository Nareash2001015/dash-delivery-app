import axios from "axios";
import { ShipmentInfo } from "../types";
import ApiManager from "./ApiManager";

export const getShipmentInfoApi = async (
  userId: number,
  token: string
): Promise<ShipmentInfo[]> => {
  try {
    const response = await ApiManager.get(`/shipments/user/${userId}`, {
      headers: {
        Authorization: "Bearer " + token,
      },
    });
    return response.data;
  } catch (error) {
    if (axios.isAxiosError(error) && error.response) {
      console.error(
        `Error in getShipmentInfoApi: ${error.response.data.message}`
      );
      throw new Error(error.response.data.message);
    } else {
      console.error(`Error in getShipmentInfoApi: ${error}`);
      throw error;
    }
  }
};

export const createShipmentApi = async (
    shipmentInfo: ShipmentInfo,
    token: string
  ): Promise<ShipmentInfo> => {
    try {
      const response = await ApiManager.post('/shipments', shipmentInfo, {
        headers: {
          Authorization: "Bearer " + token,
        },
      });
      return response.data;
    } catch (error) {
      if (axios.isAxiosError(error) && error.response) {
        console.error(
          `Error in getShipmentInfoApi: ${error.response.data.message}`
        );
        throw new Error(error.response.data.message);
      } else {
        console.error(`Error in getShipmentInfoApi: ${error}`);
        throw error;
      }
    }
  };
