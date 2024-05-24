/* eslint-disable @typescript-eslint/no-unused-vars */
import {
  Button,
  FormControl,
  FormLabel,
  Input,
  useToast,
} from "@chakra-ui/react";
import React, { useState } from "react";
import { getShipmentByIdApi } from "../apis/ShipmentApi";
import { TrackShipmentInfo } from "../types";
import TrackShipmentModal from "../components/TrackShipmentModal";
import { FaChevronCircleLeft } from "react-icons/fa";
import { useNavigate } from "react-router-dom";

function TrackShipment() {
  const toast = useToast();
  const navigate = useNavigate();
  const [trackId, setTrackId] = useState<string>("");
  const [trackIdError, setTrackIdError] = useState<string>("Value required");
  const [trackIdErrorFlag, setTrackIdErrorFlag] = useState<boolean>(true);
  const [shipmentInfo, setshipmentInfo] = useState<TrackShipmentInfo>({
    id: "",
    recipientAddress: "",
    packageDescription: "",
    packageWeight: "",
    shipmentStatus: "",
    user: {
      address: "",
    },
  });
  const [isOpenModel, setIsOpenModel] = useState<boolean>(false);

  const handleTrackIdChange = (e: {
    target: { value: React.SetStateAction<string> };
  }) => {
    setTrackId(e.target.value);
    if (trackId.length > 0) {
      setTrackIdError("");
      setTrackIdErrorFlag(false);
    } else {
      setTrackIdError("Value required");
      setTrackIdErrorFlag(true);
    }
  };

  const handleTrackShipmeant = async () => {
    try {
      const response = await getShipmentByIdApi(trackId);
      setshipmentInfo(response);
      setIsOpenModel(true);
    } catch (error) {
      let errorMessage: string;
      if (error instanceof Error) {
        errorMessage = error.message;
        toast({
          title: errorMessage,
          position: "top-right",
          status: "error",
          isClosable: true,
        });
      }
      console.log(error);
    }
  };

  return (
    <div className="flex justify-center items-center h-screen bg-delivery-image bg-cover bg-no-repeat">
      <div className="flex w-2/3 flex-row rounded-3xl bg-gray-100 bg-opacity-45">
        <div className="flex flex-col items-center rounded-3xl w-2/5">
          <div className=" w-full">
            <FaChevronCircleLeft size={40} className=" m-5 text-blue-500" onClick={() => navigate("/home")} />
          </div>
          <div className="bg-dash-delivery-logo bg-cover  h-32 w-40"></div>
        </div>
        <div className="flex flex-col justify-center mx-20">
          <TrackShipmentModal
            isOpen={isOpenModel}
            setIsOpen={setIsOpenModel}
            shipmentInfo={shipmentInfo}
          />
          <div className="my-10 text-2xl">Dash delivery shipment tracking</div>
          <FormControl>
            <FormLabel>Enter your tracking ID</FormLabel>
            <Input
              value={trackId}
              onChange={handleTrackIdChange}
              placeholder="Enter your tracking ID"
            />
            <p className="text-red-600">{trackIdError}</p>
            <div className="flex justify-center">
              <Button
                colorScheme="blue"
                variant="solid"
                className="my-6"
                isDisabled={trackIdErrorFlag}
                onClick={handleTrackShipmeant}
              >
                Track shipment
              </Button>
            </div>
          </FormControl>
        </div>
      </div>
    </div>
  );
}

export default TrackShipment;
