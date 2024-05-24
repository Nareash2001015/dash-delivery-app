import axios from "axios";
import { ShipmentInfo, TrackShipmentInfo } from "../types";
import ApiManager from "./ApiManager";

export const getShipmentInfoByUserApi = async (
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
        `Error in getShipmentInfoByUserApi: ${error.response.data.message}`
      );
      throw new Error(error.response.data.message);
    } else {
      console.error(`Error in getShipmentInfoByUserApi: ${error}`);
      throw error;
    }
  }
};

export const getShipmentByIdApi = async (
  id: string
): Promise<TrackShipmentInfo> => {
  try {
    const response = await ApiManager.get(`/shipments/${id}`);
    return response.data;
  } catch (error) {
    if (axios.isAxiosError(error) && error.response) {
      console.error(
        `Error in getShipmentByIdApi: ${error.response.data.message}`
      );
      throw new Error(error.response.data.message);
    } else {
      console.error(`Error in getShipmentByIdApi: ${error}`);
      throw error;
    }
  }
};

export const getAllShipmentInfoApi = async (
  token: string
): Promise<ShipmentInfo[]> => {
  try {
    const response = await ApiManager.get("/shipments/all", {
      headers: {
        Authorization: "Bearer " + token,
      },
    });
    return response.data;
  } catch (error) {
    if (axios.isAxiosError(error) && error.response) {
      console.error(
        `Error in getAllShipmentInfoApi: ${error.response.data.message}`
      );
      throw new Error(error.response.data.message);
    } else {
      console.error(`Error in getAllShipmentInfoApi: ${error}`);
      throw error;
    }
  }
};

export const createShipmentApi = async (
  shipmentInfo: ShipmentInfo,
  token: string
): Promise<ShipmentInfo> => {
  try {
    const response = await ApiManager.post("/shipments", shipmentInfo, {
      headers: {
        Authorization: "Bearer " + token,
      },
    });
    return response.data;
  } catch (error) {
    if (axios.isAxiosError(error) && error.response) {
      console.error(
        `Error in createShipmentApi: ${error.response.data.message}`
      );
      throw new Error(error.response.data.message);
    } else {
      console.error(`Error in createShipmentApi: ${error}`);
      throw error;
    }
  }
};

export const deleteShipmentApi = async (
  id: string,
  token: string
): Promise<void> => {
  try {
    const response = await ApiManager.delete(`/shipments/${id}`, {
      headers: {
        Authorization: "Bearer " + token,
      },
    });
    return response.data;
  } catch (error) {
    if (axios.isAxiosError(error) && error.response) {
      console.error(
        `Error in deleteShipmentApi: ${error.response.data.message}`
      );
      throw new Error(error.response.data.message);
    } else {
      console.error(`Error in deleteShipmentApi: ${error}`);
      throw error;
    }
  }
};

export const updateShipmentApi = async (
  id: string,
  shipment: ShipmentInfo,
  token: string
): Promise<ShipmentInfo> => {
  try {
    if (id === "") {
      throw Error("The id is empty");
    }
    const response = await ApiManager.put(`/shipments/${id}`, shipment, {
      headers: {
        Authorization: "Bearer " + token,
      },
    });
    return response.data;
  } catch (error) {
    if (axios.isAxiosError(error) && error.response) {
      console.error(
        `Error in updateShipmentApi: ${error.response.data.message}`
      );
      throw new Error(error.response.data.message);
    } else {
      console.error(`Error in updateShipmentApi: ${error}`);
      throw error;
    }
  }
};
