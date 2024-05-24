/* eslint-disable @typescript-eslint/no-unused-vars */
import { useContext, useEffect, useState } from "react";
import { FaSave } from "react-icons/fa";
import {
  Table,
  Thead,
  Tbody,
  Tr,
  Th,
  Td,
  TableContainer,
  useToast,
  Select,
} from "@chakra-ui/react";
import { ShipmentInfo, ShipmentStatus, UserInfo } from "../types";
import { getUserInfoApi } from "../apis/UserApi";
import { AuthContext } from "../provider/AuthProvider";
import { useNavigate } from "react-router-dom";
import { getAllShipmentInfoApi, updateShipmentApi } from "../apis/ShipmentApi";

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
  const [shipmentStatus, setShipmentStatus] = useState<ShipmentStatus>({
    id: "",
    status: "",
  });

  const handleUpdateShipment = async () => {
    try {
      if (shipmentStatus.id === "") {
        throw Error("Shipment is empty");
      }
      const response = await updateShipmentApi(
        shipmentStatus.id,
        {
          shipmentStatus: shipmentStatus.status,
        },
        token
      );
      toast({
        title: "Shipment updated sucessfully",
        position: "top-right",
        status: "success",
        isClosable: true,
      });
      setShipmentInfo((prevShipmentInfo) => {
        const updatedShipmentInfo = prevShipmentInfo.filter(
          (item) => item.id !== shipmentStatus.id
        );
        return [response, ...updatedShipmentInfo];
      });
    } catch (error) {
      let errorMessage: string;
      if (error instanceof Error) {
        if (error.message === "Invalid token") {
          localStorage.removeItem("token");
          setToken("");
          setIsAuthenticated(false);
          navigate("/home");
          errorMessage = "Session expired";
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
        const response = await getAllShipmentInfoApi(token);
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
  });
  return (
    <div>
      <div className="mx-20 mt-10 text-xl font-bold">{user.role}</div>
      <div className="mx-20 mb-10 text-3xl font-bold">
        Hello {userInfo.name} :)
      </div>
      <div className="mx-20 my-5">
        <TableContainer>
          <Table variant="simple">
            <Thead>
              <Tr>
                <Th>Track number</Th>
                <Th>Sender Name</Th>
                <Th>Sender Address</Th>
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
                    <Td>{shipment.id}</Td>
                    <Td>{shipment.user?.name}</Td>
                    <Td>{shipment.user?.address}</Td>
                    <Td>{shipment.recipientName}</Td>
                    <Td>{shipment.recipientAddress}</Td>
                    <Td>{shipment.packageDescription}</Td>
                    <Td>{shipment.packageWeight}</Td>
                    <Td>
                      <Select
                        variant="outline"
                        onChange={(e) =>
                          setShipmentStatus({
                            id: shipment.id ?? "",
                            status: e.target.value,
                          })
                        }
                        defaultValue={shipment.shipmentStatus}
                        value={
                          shipmentStatus.id == shipment.id
                            ? shipmentStatus.status
                            : shipment.shipmentStatus
                        }
                      >
                        <option value="pending">pending</option>
                        <option value="in transit">in transit</option>
                        <option value="delivered">delivered</option>
                      </Select>
                    </Td>
                    <Td className="flex flex-row items-center">
                      <FaSave
                        size={"35"}
                        className="m-5 text-blue-950"
                        onClick={handleUpdateShipment}
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
