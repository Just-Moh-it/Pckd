import React from "react";
import styled from "styled-components";
import config from "../config";

import { ButtonLink, NormalLink, NormalLinkStyles } from "../styles/Buttons";
import logo from "../assets/images/logo.svg";
import { Link, NavLink, useNavigate } from "react-router-dom";

const NavBarParent = styled.div`
  height: 60px;
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin: 56px 86px;
  width: auto;
`;

const Logo = styled.img`
  width: 60px;
  height: 60px;
`;

const LogoContainer = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;

  .logo-text {
    margin-left: 22px;
    font-family: Montserrat;
    font-style: normal;
    font-weight: bold;
    font-size: 28.9714px;
    line-height: 35px;
  }
`;

const NavLinks = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  width: 377px;
`;

// const StyledNavLink = styled(NavLink)`
//   ${NormalLinkStyles}
// `;
const StyledLink = styled(NavLink)`
  &.active {
    color: red;
  }
`;

const Nav = () => {
  const navigate = useNavigate();

  return (
    <NavBarParent>
      <LogoContainer>
        <Logo src={logo} alt="Logo" />
        <p className="logo-text">{config.APP_NAME}</p>
      </LogoContainer>
      <NavLinks>
        <Link as={NormalLink} activeClass="active" to="/">
          Create New Pckd
        </Link>
        <Link as={NormalLink} activeClass="active" to="/dash">
          Dashboard
        </Link>
        <ButtonLink onClick={() => navigate("/auth")} to="/auth">
          Login
        </ButtonLink>
      </NavLinks>
    </NavBarParent>
  );
};

export default Nav;
