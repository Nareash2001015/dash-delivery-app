import React, { useContext } from "react";
import {
  Menu,
  MenuButton,
  MenuList,
  MenuItem,
  Avatar,
  Button,
} from "@chakra-ui/react";
import { AuthContext } from "../provider/AuthProvider";

function NavBar() {
  const authContext = useContext(AuthContext);
  // const token = authContext.token;
  const logout = authContext.logout;
  return (
    <div className="flex bg-white h-20 shadow-2xl flex-row justify-between">
      <div className="h-full flex justify-end items-center">
        <div className="h-16 w-24 bg-dash-delivery-logo bg-cover mx-10"></div>
      </div>
      <div className="flex justify-end items-center h-full mx-10">
        <Menu>
          {({ isOpen }) => (
            <>
              <MenuButton
                isActive={isOpen}
                as={Button}
                backgroundColor={"white"}
                _hover={{ bg: "white" }}
                _active={{ bg: "white" }}
              >
                <Avatar src="https://bit.ly/broken-link" />
              </MenuButton>
              <MenuList>
                <MenuItem onClick={() => logout}>Logout</MenuItem>
              </MenuList>
            </>
          )}
        </Menu>
      </div>
    </div>
  );
}

export default NavBar;
