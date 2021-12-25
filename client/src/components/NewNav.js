import React from "react";
import styled from "styled-components";
import { Link } from "react-router-dom";

// Logo
import { ReactComponent as LogoWhite } from "../assets/images/logo-white.svg";

const NavWrapper = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 17px 40px;
  background-color: ${(props) => props.theme.accentColor};
  border-bottom: 1px solid #e6e6e6;
  color: white;

  .logo-container {
    display: flex;
    justify-content: space-between;
    align-items: center;
    gap: 15px;
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
  }
`;

const NewNav = () => {
  return (
    <NavWrapper>
      <Link className="logo-container" to="/">
        <LogoWhite />
        <span>Pckd</span>
      </Link>
      <div className="right-container">
        <nav>
          <Link to="/">Create Pckd</Link>
          <Link to="/manage">Dashboard</Link>
          <div className="user-icon">
            <img src="https://randomuser.me/api/portraits/men/75.jpg" alt="" />
          </div>
        </nav>
      </div>
    </NavWrapper>
  );
};

export default NewNav;
