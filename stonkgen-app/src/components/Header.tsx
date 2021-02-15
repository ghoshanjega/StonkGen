import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
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
} from 'reactstrap';
import { logoutSuccess, selectUser } from "../features/authentication/AuthenticationSlice";
import { Brand } from "./Brand";

export const Header = () => {
  const dispatch = useDispatch();
  const user = useSelector(selectUser);
  
  const [isOpen, setIsOpen] = useState(false);

  const toggle = () => setIsOpen(!isOpen);

  const handleLogout = () => {
    dispatch(logoutSuccess())
  }
  return (
    <div>
      <Navbar color="dark" dark expand="md">
        <div className="container">
        <NavbarBrand href="/"><Brand /></NavbarBrand>
        <NavbarToggler onClick={toggle} />
        <Collapse isOpen={isOpen} navbar>
          <Nav className="mr-auto" navbar>
          <Link to= "/" className="nav-item nav-link" >
                Home 
              </Link>
            <NavItem>
            <Link to= "/orders" className="nav-item nav-link" >
                Orders 
              </Link>
            </NavItem>
            <UncontrolledDropdown nav inNavbar>
              <DropdownToggle nav caret>
                {user?.fullName}
              </DropdownToggle>
              <DropdownMenu right>
                <DropdownItem>
                  profile
                </DropdownItem>
                <DropdownItem divider />
                <DropdownItem onClick={()=>handleLogout()}>
                  logout
                </DropdownItem>
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
