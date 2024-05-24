/* eslint-disable @typescript-eslint/no-unused-vars */
import {
  Button,
  ModalCloseButton,
  ModalContent,
  Modal,
  ModalOverlay,
  ModalHeader,
  ModalFooter,
  ModalBody,
} from "@chakra-ui/react";
import { TrackShipmentProps } from "../types";
import ShipmentInfoCard from "./ShipmentInfoCard";

const TrackShipmentModal: React.FC<TrackShipmentProps> = ({
  setIsOpen,
  isOpen,
  shipmentInfo,
}) => {
  return (
    <>
      <Modal
        closeOnOverlayClick={false}
        isOpen={isOpen}
        onClose={() => setIsOpen(false)}
      >
        <ModalOverlay />
        <ModalContent>
          <ModalHeader>Shipment Information</ModalHeader>
          <ModalCloseButton />
          <ModalBody pb={6}>
            <ShipmentInfoCard shipmentInfo={shipmentInfo}/>
          </ModalBody>
          <ModalFooter>
            <Button onClick={() => setIsOpen(false)}>Close</Button>
          </ModalFooter>
        </ModalContent>
      </Modal>
    </>
  );
};

export default TrackShipmentModal;
