/* eslint-disable @typescript-eslint/no-unused-vars */
import React, { useEffect, useState } from "react";
import { FaPlus } from "react-icons/fa";

import {
  Table,
  Thead,
  Tbody,
  Tr,
  Th,
  Td,
  TableContainer,
  Button,
} from "@chakra-ui/react";
import { UserInfo, UserProps } from "../types";
import { getUserInfoApi } from "../apis/UserApi";

const CustomerContent: React.FC<UserProps> = ({ user, token }) => {
  const[userInfo, setUserInfo] = useState<UserInfo>({
    id: 0,
    address: "",
    name: ""
  })
  const[shipmentInfo, setShipmentInfo] = useState<ShipmentInfo[]>([])
  useEffect(() => {
    async function fetchUser() {
        try {
            const response = await getUserInfoApi(user.userId, token);
            setUserInfo(response);
        } catch (error) {
            if(error instanceof Error){
                console.log(error.message)
            } else {
                console.log(error);
            }
        }

    }
    fetchUser();
    // fetchShipments();
  }, []);
  return (
    <div>
      <div className="mx-20 mt-20 flex justify-end">
        <Button colorScheme="blue" variant="solid" rightIcon={<FaPlus />}>
          Button
        </Button>
      </div>
      <div className="mx-20 my-5">
        <TableContainer>
          <Table variant="simple">
            <Thead>
              <Tr>
                <Th>Recipient Name</Th>
                <Th>Recipient Address</Th>
                <Th>Package Description</Th>
                <Th>Package weight</Th>
                <Th>Shipment status</Th>
                <Th>Options</Th>
              </Tr>
            </Thead>
            <Tbody>
              <Tr>
                <Td>inches</Td>
                <Td>millimetres (mm)</Td>
                <Td isNumeric>25.4</Td>
              </Tr>
              <Tr>
                <Td>feet</Td>
                <Td>centimetres (cm)</Td>
                <Td isNumeric>30.48</Td>
              </Tr>
              <Tr>
                <Td>yards</Td>
                <Td>metres (m)</Td>
                <Td isNumeric>0.91444</Td>
              </Tr>
            </Tbody>
          </Table>
        </TableContainer>
      </div>
    </div>
  );
}

export default CustomerContent;
