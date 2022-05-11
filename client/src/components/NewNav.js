import React from "react";
import styled from "styled-components";
import { Link, NavLink } from "react-router-dom";
import { useSelector } from "react-redux";

// Logo
import { ReactComponent as LogoWhite } from "../assets/images/logo-white.svg";
import { ReactComponent as LogoColor } from "../assets/images/logo.svg";
import User from "../assets/icons/user.svg";

const NavWrapper = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 17px 40px;
  background-color: ${(props) => props.theme.accentColor};
  border-bottom: 1px solid #e6e6e6;
  color: white;

  /* Check if transperant props is true */
  ${(props) =>
    props.transperant &&
    `
    background-color: transparent;
    border-bottom: none;
  `}

  .logo-container {
    display: flex;
    justify-content: space-between;
    align-items: center;
    gap: 15px;
  }
  .logo-container svg {
    width: 40px;
    height: 40px;
  }
  .logo-container span {
    font-family: Montserrat;
    font-style: normal;
    font-weight: bold;
    font-size: 19.3143px;
    line-height: 24px;
    color: #ffffff;
  }

  .right-container {
    display: flex;
    align-items: center;
    justify-content: space-between;
    gap: 15px;
  }

  .user-icon {
    width: 42px;
    height: 42px;
    overflow: hidden;
    background-size: cover;
    border-radius: 50%;
    display: flex;
    align-items: center;
    justify-content: center;
    background-color: white;
    color: ${(props) => props.theme.accentColor};
    font-weight: 600;
    cursor: pointer;
  }
  .user-icon img {
    width: 100%;
    height: 100%;
  }

  nav {
    display: flex;
    align-items: center;
    justify-content: space-between;
    gap: 20px;
    font-weight: 500;
  }

  nav a {
    color: white;
    transition: all 0.3s ease-in-out;
    &:last-child {
      display: flex;
      justify-content: center;
      align-items: center;
    }
  }

  nav a:hover {
    box-shadow: 0 2px 0 white;
    &:last-child {
      box-shadow: none;
    }
  }

  nav a.active {
    font-weight: 600;
    /* Add line below text */
    box-shadow: 0 2px 0 white;
  }
`;

const ButtonLink = styled(Link)`
  padding: 8px 30px;
  background: ${(props) =>
    props.overDark ? props.theme.accentColor : "white"};
  border-radius: 12px;
  color: ${(props) =>
    props.overDark ? "white" : props.theme.accentColor} !important;
  font: inherit;
  font-weight: 600;
  height: 40px;
  cursor: pointer;
  text-decoration: none;
  position: relative;
  border: none;
  gap: 10px;
  display: inline-block;
`;

const NewNav = ({ overDark = true, transperant = false }) => {
  const isLoggedIn = useSelector((state) => state.auth.loggedIn);
  // Add menu state for mobile

  return (
    <NavWrapper transperant={transperant} overDark>
      <Link className="logo-container" to="/">
        {overDark ? <LogoWhite /> : <LogoColor />}
        <span>Pckd</span>
      </Link>
      <div className="right-container">
        <nav>
          <NavLink activeClassName="active" to="/">
            Create Pckd
          </NavLink>
          <NavLink activeClassName="active" to="/dash">
            Dashboard
          </NavLink>
          {/* Create user avatar form name */}
          {isLoggedIn ? (
            <Link to="/dash/profile" className="user-icon">
              <img src={User} alt="Account" />
            </Link>
          ) : (
            <ButtonLink to="/auth">Login</ButtonLink>
          )}
        </nav>
      </div>
    </NavWrapper>
  );
};

export default NewNav;
