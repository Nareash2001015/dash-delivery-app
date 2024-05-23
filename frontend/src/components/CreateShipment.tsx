/* eslint-disable @typescript-eslint/no-unused-vars */
import {
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalFooter,
  ModalBody,
  ModalCloseButton,
  Button,
  FormLabel,
  FormControl,
  Input,
  Textarea,
  useToast,
} from "@chakra-ui/react";
import { ModelProps, ShipmentInfo } from "../types";
import { useContext, useState } from "react";
import { AuthContext } from "../provider/AuthProvider";
import { createShipmentApi } from "../apis/ShipmentApi";
import { useNavigate } from "react-router-dom";

const CreateShipment: React.FC<ModelProps> = ({
  setIsOpen,
  isOpen,
  userInfo,
}) => {
  const toast = useToast();
  const navigate = useNavigate();
  const authContext = useContext(AuthContext);
  const { token, setIsAuthenticated, setToken }  = authContext;
  const [recipientName, setRecipientName] = useState<string>("");
  const [recipientAddress, setRecipientAddress] = useState<string>("");
  const [packageDescription, setPackageDescription] = useState<string>("");
  const [packageWeight, setPackageWeight] = useState<string>("");

  const [recipientNameError, setRecipientNameError] = useState<string>(
    "Recipient name is required"
  );
  const [recipientAddressError, setRecipientAddressError] = useState<string>(
    "Recipient address is required"
  );
  const [packageDescriptionError, setPackageDescriptionError] =
    useState<string>("Package description is required");
  const [packageWeightError, setPackageWeightError] = useState<string>(
    "package Weight is required"
  );

  const [recipientNameErrorFlag, setRecipientNameErrorFlag] =
    useState<boolean>(true);
  const [recipientAddressErrorFlag, setRecipientAddressErrorFlag] =
    useState<boolean>(true);
  const [packageDescriptionErrorFlag, setPackageDescriptionErrorFlag] =
    useState<boolean>(true);
  const [packageWeightErrorFlag, setpackageWeightErrorFlag] =
    useState<boolean>(true);

  const handleCreateShipment = async () => {
    try {
      const shipment: ShipmentInfo = {
        userId: userInfo.id,
        senderName: userInfo.name,
        senderAddress: userInfo.address,
        recipientName: recipientName,
        recipientAddress: recipientAddress,
        packageDescription: packageDescription,
        packageWeight: String(packageWeight),
      };
      const response = await createShipmentApi(shipment, token);
      console.log(response);
      toast({
        title: "Shipment created",
        position: "top-right",
        status: "success",
        isClosable: true,
      });
      setIsOpen(false);
    } catch (error) {
      let errorMessage: string;
      if (error instanceof Error) {
        if (error.message === "403") {
            localStorage.removeItem("token");
            setToken("");
            setIsAuthenticated(false);
            navigate("/home");
            errorMessage = "Session expired"
          } else {
            errorMessage = error.message;
          }
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

  const handleRecipientNameChange = (e: {
    target: { value: React.SetStateAction<string> };
  }) => {
    setRecipientName(e.target.value);
    if (recipientName.length < 3) {
      setRecipientNameError(
        "Recipient name should be at least 3 characters long"
      );
      setRecipientNameErrorFlag(true);
    } else {
      setRecipientNameErrorFlag(false);
      setRecipientNameError("");
    }
  };
  const handleRecipientAddressChange = (e: {
    target: { value: React.SetStateAction<string> };
  }) => {
    setRecipientAddress(e.target.value);
    if (recipientAddress.length < 8) {
      setRecipientAddressError(
        "Recipient address should be at least 8 characters long"
      );
      setRecipientAddressErrorFlag(true);
    } else {
      setRecipientAddressErrorFlag(false);
      setRecipientAddressError("");
    }
  };
  const handlePackageDescriptionChange = (e: {
    target: { value: React.SetStateAction<string> };
  }) => {
    setPackageDescription(e.target.value);
    if (packageDescription.length < 8) {
      setPackageDescriptionError(
        "Recipient name should be at least 8 characters long"
      );
      setPackageDescriptionErrorFlag(true);
    } else {
      setPackageDescriptionErrorFlag(false);
      setPackageDescriptionError("");
    }
  };
  const handlePackageWeightChange = (e: {
    target: { value: React.SetStateAction<string> };
  }) => {
    setPackageWeight(e.target.value);
    console.log(parseInt(packageWeight));
    if (parseInt(packageWeight) <= 20) {
      setpackageWeightErrorFlag(false);
      setPackageWeightError("");
    } else {
      setPackageWeightError("Package Weight should be less than 20 kg");
      setpackageWeightErrorFlag(true);
    }
  };
  return (
    <Modal
      closeOnOverlayClick={false}
      isOpen={isOpen}
      onClose={() => setIsOpen(false)}
    >
      <ModalOverlay />
      <ModalContent>
        <ModalHeader>Create shipment</ModalHeader>
        <ModalCloseButton />
        <ModalBody pb={6}>
          <FormControl>
            <FormLabel>Recipient name</FormLabel>
            <Input
              type="text"
              onChange={handleRecipientNameChange}
              value={recipientName}
            />
            <p className="text-red-600">{recipientNameError}</p>
            <FormLabel className="my-5">Recipient address</FormLabel>
            <Input
              type="text"
              onChange={handleRecipientAddressChange}
              value={recipientAddress}
            />
            <p className="text-red-600">{recipientAddressError}</p>
            <FormLabel className="my-5">Package Description</FormLabel>
            <Textarea
              placeholder="Type your address"
              size="md"
              onChange={handlePackageDescriptionChange}
              value={packageDescription}
            />
            <p className="text-red-600">{packageDescriptionError}</p>
            <FormLabel className="my-5">Package weight</FormLabel>
            <Input
              type="number"
              onChange={handlePackageWeightChange}
              value={packageWeight}
            />
            <p className="text-red-600">{packageWeightError}</p>
          </FormControl>
        </ModalBody>
        <ModalFooter>
          <Button
            colorScheme="blue"
            mr={3}
            isDisabled={
              recipientAddressErrorFlag ||
              recipientNameErrorFlag ||
              packageDescriptionErrorFlag ||
              packageWeightErrorFlag
            }
            onClick={handleCreateShipment}
          >
            Save
          </Button>
          <Button onClick={() => setIsOpen(false)}>Cancel</Button>
        </ModalFooter>
      </ModalContent>
    </Modal>
  );
};

export default CreateShipment;
