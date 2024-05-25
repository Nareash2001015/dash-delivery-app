/* eslint-disable @typescript-eslint/no-unused-vars */
import React, { useContext, useEffect, useState } from "react";
import { FaPlus, FaEdit, FaTrash } from "react-icons/fa";
import {
  Table,
  Thead,
  Tbody,
  Tr,
  Th,
  Td,
  TableContainer,
  Button,
  useToast,
} from "@chakra-ui/react";
import { ShipmentInfo, UserInfo, UserShipmentInfo } from "../types";
import { getUserInfoApi } from "../apis/UserApi";
import { deleteShipmentApi, getShipmentInfoByUserApi } from "../apis/ShipmentApi";
import { AuthContext } from "../provider/AuthProvider";
import { useNavigate } from "react-router-dom";
import CreateShipmentModel from "./CreateShipmentModel";
import UpdateShipmentModel from "./UpdateShipmentModel";

const CustomerContent = () => {
  const authContext = useContext(AuthContext);
  const navigate = useNavigate();
  const toast = useToast();
  const { user, token, setIsAuthenticated, setToken } = authContext;
  const [userInfo, setUserInfo] = useState<UserInfo>({
    id: user.userId,
    address: "",
    name: "",
  });
  const [shipmentInfo, setShipmentInfo] = useState<ShipmentInfo[]>([]);
  const [isCreateModelOpen, setIsCreateModelOpen] = useState<boolean>(false);
  const [isUpdateModelOpen, setIsUpdateModelOpen] = useState<boolean>(false);
  const [selectedShipment, setSelectedShipment] = useState<UserShipmentInfo>({
    id: "",
    recipientName: "",
    recipientAddress: "",
    packageDescription: "",
    packageWeight: "",
  });

  const handleDeleteShipment = async (id: string) => {
    try {
      await deleteShipmentApi(id, token);
      setShipmentInfo((prevShipments) =>
        prevShipments.filter((shipment) => shipment.id !== id)
      );
      toast({
        title: "Shipment deleted sucessfully",
        position: "top-right",
        status: "success",
        isClosable: true,
      });
    } catch (error) {
      if (error instanceof Error) {
        if (error.message == "Invalid token") {
          localStorage.removeItem("token");
          setToken("");
          setIsAuthenticated(false);
          navigate("/home");
          toast({
            title: "Session expired",
            position: "top-right",
            status: "error",
            isClosable: true,
          });
        } else {
          console.log(error.message);
        }
      } else {
        console.log(error);
      }
    }
  };

  useEffect(() => {
    async function fetchUser() {
      try {
        const response = await getUserInfoApi(user.userId, token);
        setUserInfo(response);
      } catch (error) {
        if (error instanceof Error) {
          if (error.message === "Invalid token") {
            localStorage.removeItem("token");
            setToken("");
            setIsAuthenticated(false);
            navigate("/home");
            toast({
              title: "Session expired",
              position: "top-right",
              status: "error",
              isClosable: true,
            });
          } else {
            console.log(error.message);
          }
        } else {
          console.log(error);
        }
      }
    }
    async function fetchShipments() {
      try {
        const response = await getShipmentInfoByUserApi(user.userId, token);
        setShipmentInfo(response);
      } catch (error) {
        if (error instanceof Error) {
          if (error.message === "Invalid token") {
            localStorage.removeItem("token");
            setToken("");
            setIsAuthenticated(false);
            navigate("/home");
            toast({
              title: "Session expired",
              position: "top-right",
              status: "error",
              isClosable: true,
            });
          } else {
            console.log(error.message);
          }
        } else {
          console.log(error);
        }
      }
    }
    fetchUser();
    fetchShipments();
  }, []);
  return (
    <div>
      <div className="mx-20 mt-10 text-xl font-bold">
        {user.role}
      </div>
      <div className="mx-20 mb-10 text-3xl font-bold">
        Hello {userInfo.name} :)
      </div>
      <div className="mx-20 mt-20 flex justify-end">
        <Button
          colorScheme="blue"
          variant="solid"
          rightIcon={<FaPlus />}
          onClick={() => {
            setIsCreateModelOpen(true);
          }}
        >
          Add shipment
        </Button>
      </div>
      <CreateShipmentModel
        isOpen={isCreateModelOpen}
        setIsOpen={setIsCreateModelOpen}
        userInfo={userInfo}
        setShipmentInfo={setShipmentInfo}
      />
      <UpdateShipmentModel
        isOpen={isUpdateModelOpen}
        setIsOpen={setIsUpdateModelOpen}
        setShipmentInfo={setShipmentInfo}
        shipment={selectedShipment}
      />
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
              {shipmentInfo.map((shipment) => {
                return (
                  <Tr key={shipment.id}>
                    <Td>{shipment.recipientName}</Td>
                    <Td>{shipment.recipientAddress}</Td>
                    <Td>{shipment.packageDescription}</Td>
                    <Td>{shipment.packageWeight}</Td>
                    <Td>{shipment.shipmentStatus}</Td>
                    <Td className="flex flex-row items-center">
                      <FaEdit
                        size={"35"}
                        className="m-5 text-blue-950"
                        onClick={() => {
                          setSelectedShipment({
                            id: shipment.id ?? "",
                            recipientName: shipment.recipientName ?? "",
                            recipientAddress: shipment.recipientAddress ?? "",
                            packageDescription: shipment.packageDescription ?? "",
                            packageWeight: shipment.packageWeight ?? ""
                          });
                          setIsUpdateModelOpen(true);
                        }}
                      />
                      <FaTrash
                        size={"30"}
                        className="m-5 text-red-800"
                        onClick={() => handleDeleteShipment(shipment.id ?? "")}
                      />
                    </Td>
                  </Tr>
                );
              })}
            </Tbody>
          </Table>
        </TableContainer>
      </div>
    </div>
  );
};

export default CustomerContent;
