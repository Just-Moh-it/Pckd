import React from "react";
import styled from "styled-components";
import { Outlet } from "react-router-dom";
import { useSelector } from "react-redux";

import LoginBg from "../../assets/images/login-bg.png";
import LoadingBar from "../../components/Loading/LoadingBar";

const AuthWrapperContainer = styled.div`
  display: flex;
  justify-content: center;
  /* Fill elements with full height */
  align-items: stretch;
  height: 100%;
  overflow: hidden;
  position: relative;

  & a {
    color: ${(props) => props.theme.accentColor};
  }

  & .left-container {
    flex-grow: 1;
  }

  & .left-container img {
    /* make image fill container */
    width: 100%;
    height: 100%;
    object-fit: cover;
  }
`;

const RightContainer = styled.div`
  flex-grow: 1;
  min-width: 100px;
  max-width: 480px;
  display: flex;
  justify-content: center;
  align-items: center;
  text-align: center;
  color: black;
  position: relative;
  font-weight: 500;

  & .content {
    max-width: 400px;
    width: 100%;
    text-align: center;

    /* downscale to 0.8 */
    transform: scale(0.8);
  }

  & .title {
    margin: 20px 0px 50px;
    font-style: normal;
    font-weight: 600;
    font-size: 38.532px;
    line-height: 47px;
    color: #000000;
  }

  & form {
    max-width: 400px;
  }

  & .logo img {
    width: 85px;
  }
`;

const Custom = styled(LoadingBar)`
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  z-index: 1;
  background-color: ${(props) => props.theme.accentColor};
`;

const AuthWrapper = ({ children }) => {
  const { signupStatus, loginStatus } = useSelector((state) => state.auth);

  return (
    <AuthWrapperContainer>
      <div className="left-container">
        <img src={LoginBg} alt="Background" />
      </div>
      <RightContainer>
        {(loginStatus === "loading" || signupStatus === "loading") && (
          <Custom />
        )}
        <div className="content">
          <Outlet />
        </div>
      </RightContainer>
    </AuthWrapperContainer>
  );
};

export default AuthWrapper;
