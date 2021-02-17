import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link, useHistory } from "react-router-dom";
import {
  Collapse,
  Navbar,
  NavbarToggler,
  NavbarBrand,
  Nav,
  NavItem,
  UncontrolledDropdown,
  DropdownToggle,
  DropdownMenu,
  DropdownItem,
  NavLink,
} from "reactstrap";
import { logoutSuccess, selectUser } from "../features/authentication/AuthenticationSlice";
import { Brand } from "./Brand";

export const Header = () => {
  const dispatch = useDispatch();
  const history = useHistory();
  const user = useSelector(selectUser);

  const [isOpen, setIsOpen] = useState(false);

  const toggle = () => setIsOpen(!isOpen);

  const handleLogout = () => {
    dispatch(logoutSuccess());
  };
  return (
    <div>
      <Navbar color="dark" dark expand="md">
        <div className="container">
          <NavbarBrand href="/">
            <Brand />
          </NavbarBrand>
          <NavbarToggler onClick={toggle} />
          <Collapse isOpen={isOpen} navbar>
            <Nav className="mr-auto" navbar>
              <button className="btn btn-dark" data-test="home" onClick={() => history.push("/")}>
                Home
              </button>
              <NavItem>
                <button className="btn btn-dark" data-test="orders" onClick={() => history.push("/orders")}>
                  Orders
                </button>
              </NavItem>
              <UncontrolledDropdown nav inNavbar>
                <DropdownToggle nav caret>
                  {user?.fullName}
                </DropdownToggle>
                <DropdownMenu right>
                  {user?.admin && <DropdownItem onClick={() => history.push("/admin")}>Admin</DropdownItem>}
                  <DropdownItem onClick={() => history.push("/order-history")}>History</DropdownItem>
                  <DropdownItem divider />
                  <DropdownItem onClick={() => handleLogout()}>Logout</DropdownItem>
                </DropdownMenu>
              </UncontrolledDropdown>
            </Nav>
            {/* <NavbarText>Simple Text</NavbarText> */}
          </Collapse>
        </div>
      </Navbar>
    </div>
  );
};
